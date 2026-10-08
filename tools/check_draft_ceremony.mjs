// Read-only PUBLIC TEST contract experiment. This module cannot sign or accept births.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash, createPublicKey, verify } from 'node:crypto';
import { canonical, parseCanonical, requireThat, isKey } from '../src/bytes.mjs';
import { validateOrigin } from '../src/admission.mjs';
import { execFileSync } from 'node:child_process';

const TEST_KEY = 'd75a980182b10ab7d54bfed3c964073a0ee172f3daa62325af021a68f707511a';
const SCOPE = 'draft TEST mechanics only; GENESIS #0001 UNBORN/NO-GO';
const HERE = fileURLToPath(new URL('../', import.meta.url));
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const prefix = kind => Buffer.from(`genesis-organism/ceremony-v1/${kind}\0`);
const ref = (kind, value) => sha(Buffer.concat([prefix(kind), canonical(value)]));
const exact = (value, fields) => requireThat(value && typeof value === 'object' && !Array.isArray(value) && Object.keys(value).sort().join(',') === [...fields].sort().join(','), 'invalid', 'closed record');
const text = (value, maximum = 4096) => typeof value === 'string' && value.length > 0 && Buffer.byteLength(value) <= maximum && value.isWellFormed();
function safePath(name) {
  requireThat(typeof name === 'string' && name.length <= 512 && /^[A-Za-z0-9_.\/-]+$/.test(name) && name.split('/').every(p => p && !['.', '..', '.git'].includes(p)), 'invalid', 'relative normalized TEST path');
}
function realDirectory(directory) {
  const absolute = path.resolve(directory); let current = path.parse(absolute).root;
  for (const part of absolute.slice(current.length).split(path.sep).filter(Boolean)) {
    current = path.join(current, part); const s = fs.lstatSync(current);
    requireThat(s.isDirectory() && !s.isSymbolicLink(), 'invalid', 'real directory required');
  }
  return absolute;
}
function readFile(root, name, maximum = 8 * 1024 * 1024) {
  safePath(name); realDirectory(path.dirname(path.join(root, name)));
  const fd = fs.openSync(path.join(root, name), fs.constants.O_RDONLY | fs.constants.O_NOFOLLOW | fs.constants.O_NONBLOCK);
  try {
    const stat = fs.fstatSync(fd); requireThat(stat.isFile(), 'invalid', 'regular file required');
    requireThat(stat.size <= maximum, 'limit', 'file budget');
    const bytes = Buffer.alloc(stat.size + 1); let count = 0;
    while (count < bytes.length) { const n = fs.readSync(fd, bytes, count, bytes.length - count, null); if (!n) break; count += n; }
    const after = fs.fstatSync(fd);
    requireThat(count === stat.size && after.size === stat.size && after.mtimeMs === stat.mtimeMs, 'invalid', 'file changed while reading');
    return bytes.subarray(0, count);
  } finally { fs.closeSync(fd); }
}
// Readable inventories can exceed D03 array/byte limits; reject duplicate keys explicitly.
function parseReadable(bytes) {
  let source; try { source = new TextDecoder('utf-8', { fatal: true, ignoreBOM: true }).decode(bytes); } catch { requireThat(false, 'invalid', 'UTF8'); }
  let at = 0, nodes = 0;
  const whitespace = () => { while (at < source.length && /[ \t\r\n]/.test(source[at])) at++; };
  function string() {
    const start = at++; let escape = false;
    while (at < source.length) {
      const c = source[at++]; if (!escape && c === '"') { const value = JSON.parse(source.slice(start, at)); requireThat(value.isWellFormed(), 'invalid', 'Unicode'); return value; }
      if (!escape && c === '\\') escape = true; else escape = false;
    }
    requireThat(false, 'invalid', 'unterminated string');
  }
  function value(depth) {
    whitespace(); requireThat(++nodes <= 10000 && depth <= 32, 'limit', 'readable JSON budget');
    if (source[at] === '"') return string();
    if (source[at] === '{') {
      at++; whitespace(); const result = Object.create(null); let count = 0;
      if (source[at] === '}') { at++; return result; }
      while (true) {
        whitespace(); requireThat(source[at] === '"', 'invalid', 'object key'); const key = string();
        requireThat(!Object.hasOwn(result, key) && ++count <= 256, 'invalid', 'duplicate/member key');
        whitespace(); requireThat(source[at++] === ':', 'invalid', 'colon'); result[key] = value(depth + 1); whitespace();
        const end = source[at++]; if (end === '}') return result; requireThat(end === ',', 'invalid', 'object separator');
      }
    }
    if (source[at] === '[') {
      at++; whitespace(); const result = []; if (source[at] === ']') { at++; return result; }
      while (true) { requireThat(result.length < 1024, 'limit', 'array budget'); result.push(value(depth + 1)); whitespace(); const end = source[at++]; if (end === ']') return result; requireThat(end === ',', 'invalid', 'array separator'); }
    }
    const match = /^(true|false|null|-?(?:0|[1-9][0-9]*)(?:\.[0-9]+)?(?:[eE][+-]?[0-9]+)?)/.exec(source.slice(at));
    requireThat(match, 'invalid', 'JSON token');
    requireThat(['true', 'false', 'null'].includes(match[0]) || !/[.eE]/.test(match[0]), 'invalid', 'integer lexical token required');
    at += match[0].length; const result = JSON.parse(match[0]);
    if (typeof result === 'number') requireThat(Number.isSafeInteger(result) && !Object.is(result, -0), 'invalid', 'safe integer'); return result;
  }
  const result = value(0); whitespace(); requireThat(at === source.length, 'invalid', 'trailing JSON'); return result;
}
function readable(bytes) {
  try { return parseReadable(bytes); }
  catch (error) { if (error.code) throw error; requireThat(false, 'invalid', 'malformed readable JSON'); }
}
function gitBlob(revision, name) {
  safePath(name);
  const git = (args, maxBuffer = 8 * 1024 * 1024 + 1) => execFileSync('git', args, { cwd: HERE, maxBuffer, stdio: ['ignore', 'pipe', 'pipe'] });
  requireThat(git(['cat-file', '-t', revision], 128).toString().trim() === 'commit', 'invalid', 'source commit required');
  const record = git(['ls-tree', '-z', revision, '--', name], 4096).toString();
  const match = /^(100644|100755) blob ([0-9a-f]{40})\t([^\0]+)\0$/.exec(record);
  requireThat(match && match[3] === name, 'unavailable', 'regular Git blob required');
  const size = Number(git(['cat-file', '-s', match[2]], 128).toString().trim());
  requireThat(Number.isSafeInteger(size) && size <= 8 * 1024 * 1024, 'limit', 'source blob budget');
  const bytes = git(['cat-file', 'blob', match[2]]);
  requireThat(bytes.length === size, 'invalid', 'source blob size'); return bytes;
}
function entries(value, budget, perFile) {
  requireThat(Array.isArray(value) && value.length > 0 && value.length <= 1024, 'limit', 'inventory count');
  let previous = '', total = 0;
  for (const item of value) {
    exact(item, ['path', 'sha256', 'size']); safePath(item.path);
    requireThat(item.path > previous && isKey(item.sha256) && Number.isSafeInteger(item.size) && item.size >= 0, 'invalid', 'inventory entry');
    requireThat(item.size <= perFile && (total += item.size) <= budget, 'limit', 'inventory bytes'); previous = item.path;
  }
}
function exactMembers(directory, expected) {
  realDirectory(directory); requireThat(fs.readdirSync(directory).sort().join(',') === [...expected].sort().join(','), 'invalid', 'unexpected or missing member');
}
function checkPackage(root, files) {
  const expected = new Map(files.map(item => [item.path, item])), dirs = new Set(['']);
  for (const item of files) { const parts = item.path.split('/'); for (let i = 1; i < parts.length; i++) dirs.add(parts.slice(0, i).join('/')); }
  let found = 0, members = 0;
  function walk(name) {
    const p = path.join(root, name), stat = fs.lstatSync(p);
    requireThat(!stat.isSymbolicLink(), 'invalid', 'package symlink');
    if (stat.isDirectory()) { requireThat(dirs.has(name), 'invalid', 'extra package directory'); for (const child of fs.readdirSync(p)) { requireThat(++members <= 4096, 'limit', 'package members'); safePath(child); walk(name ? `${name}/${child}` : child); } return; }
    requireThat(stat.isFile() && expected.has(name), 'invalid', 'unexpected/nonregular package file');
    const item = expected.get(name); requireThat(stat.size === item.size, 'invalid', 'package size');
    const fd = fs.openSync(p, fs.constants.O_RDONLY | fs.constants.O_NOFOLLOW | fs.constants.O_NONBLOCK), hash = createHash('sha256');
    try {
      const opened = fs.fstatSync(fd); requireThat(opened.isFile() && opened.size === item.size, 'invalid', 'package changed');
      const chunk = Buffer.alloc(65536); let n, total = 0;
      while ((n = fs.readSync(fd, chunk, 0, chunk.length, null))) { total += n; requireThat(total <= item.size, 'invalid', 'package grew'); hash.update(chunk.subarray(0, n)); }
      requireThat(total === item.size && hash.digest('hex') === item.sha256, 'invalid', 'raw package digest');
    } finally { fs.closeSync(fd); }
    found++;
  }
  walk(''); requireThat(found === files.length, 'unavailable', 'missing package file');
}
function proof(kind, envelope, fields, authority) {
  exact(envelope, ['body', 'signature']); exact(envelope.body, fields);
  requireThat(envelope.body.authority === authority, 'unauthorized', 'TEST expected authority');
  requireThat(typeof envelope.signature === 'string' && /^[0-9a-f]{128}$/.test(envelope.signature), 'invalid', 'signature encoding');
  const key = createPublicKey({ key: Buffer.from(`302a300506032b6570032100${authority}`, 'hex'), type: 'spki', format: 'der' });
  requireThat(verify(null, Buffer.concat([prefix(`${kind}-proof`), canonical(envelope.body)]), key, Buffer.from(envelope.signature, 'hex')), 'invalid', 'draft proof');
}
export function checkDraft(root, trusted) {
  root = realDirectory(root); const repository = fs.realpathSync(HERE);
  requireThat(root !== repository && !root.startsWith(repository + path.sep) && !root.split(path.sep).includes('organisms'), 'unauthorized', 'external TEST root required');
  canonical(trusted); // Reject accessors/symbols/nonplain producer objects before field access.
  exact(trusted, ['authority', 'creatorBindingRef', 'nonce', 'revision']);
  requireThat(trusted.authority === TEST_KEY && isKey(trusted.creatorBindingRef) && isKey(trusted.nonce) && /^[0-9a-f]{40}$/.test(trusted.revision), 'unauthorized', 'externally pinned TEST context required');
  exactMembers(root, ['TEST_ONLY', 'journal', 'archive-a', 'archive-b', 'public-package', 'archive-a-retrieval.json', 'archive-b-retrieval.json', 'public-retrieval.json', 'release-retrieval.json']);
  requireThat(readFile(root, 'TEST_ONLY', 128).toString() === 'genesis-organism proposed ceremony TEST ONLY\n', 'unauthorized', 'TEST marker required');
  const j = path.join(root, 'journal'), names = fs.readdirSync(j);
  requireThat(!names.includes('LOCK'), 'conflict', 'writer lock held; verifier cannot recover');
  exactMembers(j, ['CEREMONY', 'creator-binding.json', 'inventory.json', 'manifest.json', 'origin.json', 'freeze.json', 'archive-report.json', 'release.json', 'release-publication.json', 'public-package-inventory.json', 'possession.json', 'birth.json', 'accepted', 'conflicts', 'pending']);
  requireThat(readFile(j, 'CEREMONY', 128).toString() === 'genesis-organism ceremony-v1\n', 'invalid', 'ceremony marker');
  for (const directory of ['pending', 'conflicts']) { realDirectory(path.join(j, directory)); requireThat(fs.readdirSync(path.join(j, directory)).length === 0, 'conflict', 'retained pending/conflict hold'); }
  const raw = name => readFile(j, name), c = name => parseCanonical(readFile(j, name, 65536)), r = name => readable(raw(name));
  const binding = c('creator-binding.json'); exact(binding, ['version', 'creator', 'authority', 'scope', 'rights']);
  requireThat(binding.version === 'creator-binding-v1' && binding.creator === 'PUBLIC TEST ONLY' && binding.authority === trusted.authority && binding.scope === 'public-genesis-origin-history-and-ceremony' && binding.rights === 'creator-approved-disclosure' && ref('creator-binding', binding) === trusted.creatorBindingRef, 'unauthorized', 'TEST binding context');
  const possession = c('possession.json'); proof('possession', possession, ['version', 'purpose', 'creatorBindingRef', 'authority', 'nonce'], trusted.authority);
  requireThat(possession.body.version === 'possession-v1' && possession.body.purpose === 'key-possession-only-no-lifecycle-authorization' && possession.body.creatorBindingRef === trusted.creatorBindingRef && possession.body.nonce === trusted.nonce, 'unauthorized', 'issued TEST challenge mismatch');
  const origin = c('origin.json'), state = validateOrigin(origin);
  requireThat(origin.body.creator === 'PUBLIC TEST ONLY' && origin.body.birth === 'public-test-only-draft-ceremony' && state.authority === trusted.authority && state.rules === 'adaptation-v1' && state.signal === 0, 'unauthorized', 'only provisional TEST origin');
  const inventory = r('inventory.json'); exact(inventory, ['version', 'purpose', 'revision', 'selection', 'artifacts']);
  requireThat(inventory.version === 1 && inventory.purpose === 'PUBLIC TEST ONLY' && inventory.selection === 'TEST ONLY bounded source selection' && inventory.revision === trusted.revision, 'invalid', 'TEST source selection');
  entries(inventory.artifacts, 32 * 1024 * 1024, 8 * 1024 * 1024);
  for (const item of inventory.artifacts) { const bytes = gitBlob(trusted.revision, item.path); requireThat(bytes.length === item.size && sha(bytes) === item.sha256, 'invalid', 'source Git artifact'); }
  const manifest = c('manifest.json'); exact(manifest, ['ceremony', 'profile', 'candidate', 'revision', 'creatorBindingRef', 'originRef', 'originSha256', 'inventorySha256', 'anchor', 'supersedes']);
  requireThat(manifest.supersedes === null, 'unavailable', 'predecessor raw evidence not supplied');
  requireThat(manifest.ceremony === 'ceremony-v1' && manifest.profile === 'synthetic-v1' && manifest.candidate === 'public-test-only-draft-ceremony' && manifest.revision === trusted.revision && manifest.creatorBindingRef === trusted.creatorBindingRef && manifest.originRef === state.organism && manifest.originSha256 === sha(raw('origin.json')) && manifest.inventorySha256 === sha(raw('inventory.json')) && manifest.anchor === 'skip', 'invalid', 'manifest binding');
  const manifestRef = ref('manifest', manifest), freeze = c('freeze.json');
  proof('freeze', freeze, ['ceremony', 'manifestRef', 'authority'], trusted.authority);
  requireThat(freeze.body.ceremony === 'ceremony-v1' && freeze.body.manifestRef === manifestRef, 'invalid', 'freeze binding');
  const freezeRef = ref('freeze', freeze), packageInventory = r('public-package-inventory.json'); exact(packageInventory, ['version', 'files']);
  requireThat(packageInventory.version === 'public-package-v1', 'unsupported', 'package version'); entries(packageInventory.files, 1024 * 1024 * 1024, 256 * 1024 * 1024);
  const selected = new Map(packageInventory.files.map(item => [item.path, item]));
  for (const name of ['creator-binding.json', 'inventory.json', 'manifest.json', 'origin.json', 'freeze.json']) requireThat(selected.has(name) && selected.get(name).sha256 === sha(raw(name)) && selected.get(name).size === raw(name).length, 'invalid', 'required package record');
  for (const item of inventory.artifacts) requireThat(selected.has(`files/${item.path}`) && selected.get(`files/${item.path}`).sha256 === item.sha256 && selected.get(`files/${item.path}`).size === item.size, 'invalid', 'required raw source file');
  const packageHash = sha(raw('public-package-inventory.json'));
  for (const alias of ['archive-a', 'archive-b', 'public-package']) checkPackage(path.join(root, alias), packageInventory.files);
  const report = r('archive-report.json'); exact(report, ['version', 'manifestRef', 'archives', 'publication', 'dependencies', 'verification']);
  requireThat(report.version === 'archive-report-v1' && report.manifestRef === manifestRef && Array.isArray(report.archives) && report.archives.length === 2, 'invalid', 'archive report');
  const archiveAliases = new Set();
  for (const entry of report.archives) {
    exact(entry, ['location', 'custodian', 'retrievalEvidenceSha256', 'restored']); const alias = entry.location;
    requireThat(['archive-a', 'archive-b'].includes(alias) && !archiveAliases.has(alias) && entry.custodian === 'PUBLIC TEST ONLY' && entry.restored === true && entry.retrievalEvidenceSha256 === sha(readFile(root, `${alias}-retrieval.json`)), 'invalid', 'archive retrieval binding');
    archiveAliases.add(alias);
  }
  exact(report.publication, ['location', 'packageInventorySha256', 'retrievalEvidenceSha256']);
  requireThat(report.publication.location === 'public-package' && report.publication.packageInventorySha256 === packageHash && report.publication.retrievalEvidenceSha256 === sha(readFile(root, 'public-retrieval.json')), 'invalid', 'public package binding');
  for (const [name, alias] of [['archive-a-retrieval.json', 'archive-a'], ['archive-b-retrieval.json', 'archive-b'], ['public-retrieval.json', 'public-package']]) {
    const log = readable(readFile(root, name)); exact(log, ['purpose', 'packageInventorySha256', 'revision', 'location']);
    requireThat(log.purpose === 'PUBLIC TEST ONLY' && log.packageInventorySha256 === packageHash && log.revision === trusted.revision && log.location === alias, 'invalid', 'retrieval log graph');
  }
  requireThat(Array.isArray(report.dependencies) && report.dependencies.length <= 256, 'limit', 'dependency count');
  const dependencyNames = new Set();
  for (const dependency of report.dependencies) {
    exact(dependency, ['name', 'version', 'sha256']); safePath(dependency.name);
    requireThat(!dependency.name.includes('/') && dependency.name.length <= 128 && text(dependency.version, 128) && isKey(dependency.sha256) && !dependencyNames.has(dependency.name), 'invalid', 'dependency record'); dependencyNames.add(dependency.name);
    requireThat(selected.has(`dependencies/${dependency.name}`) && selected.get(`dependencies/${dependency.name}`).sha256 === dependency.sha256, 'unavailable', 'dependency bytes missing');
  }
  const allowed = new Set(['creator-binding.json', 'inventory.json', 'manifest.json', 'origin.json', 'freeze.json', ...inventory.artifacts.map(item => `files/${item.path}`), ...report.dependencies.map(item => `dependencies/${item.name}`)]);
  requireThat(packageInventory.files.every(item => allowed.has(item.path)), 'invalid', 'acyclic package selection');
  exact(report.verification, ['sourceRevision', 'node', 'python', 'cryptography', 'commands', 'resultsSha256', 'network']);
  requireThat(report.verification.sourceRevision === trusted.revision && ['node', 'python', 'cryptography'].every(k => text(report.verification[k])) && Array.isArray(report.verification.commands) && report.verification.commands.length > 0 && report.verification.commands.length <= 256 && report.verification.commands.every(s => text(s)) && report.verification.resultsSha256 === sha(readFile(root, 'public-retrieval.json')) && report.verification.network === 'disabled', 'invalid', 'verification claim shape');
  const release = c('release.json'); proof('release', release, ['ceremony', 'manifestRef', 'freezeRef', 'archiveReportRef', 'authority'], trusted.authority);
  requireThat(release.body.ceremony === 'ceremony-v1' && release.body.manifestRef === manifestRef && release.body.freezeRef === freezeRef && release.body.archiveReportRef === sha(raw('archive-report.json')), 'invalid', 'release prerequisites');
  const releaseRef = ref('release', release), publication = r('release-publication.json'); exact(publication, ['version', 'releaseRef', 'location', 'retrievalEvidenceSha256']);
  requireThat(publication.version === 'release-publication-v1' && publication.releaseRef === releaseRef && publication.location === 'public-package' && publication.retrievalEvidenceSha256 === sha(readFile(root, 'release-retrieval.json')) && readFile(root, 'release-retrieval.json').equals(raw('release.json')), 'invalid', 'signed release retrieval');
  const birth = c('birth.json'); proof('birth', birth, ['ceremony', 'manifestRef', 'releaseRef', 'originRef', 'releasePublicationRef', 'authority'], trusted.authority);
  requireThat(birth.body.ceremony === 'ceremony-v1' && birth.body.manifestRef === manifestRef && birth.body.releaseRef === releaseRef && birth.body.originRef === state.organism && birth.body.releasePublicationRef === sha(raw('release-publication.json')), 'invalid', 'birth prerequisites');
  const acceptedDir = realDirectory(path.join(j, 'accepted')), accepted = fs.readdirSync(acceptedDir);
  requireThat(accepted.length <= 1, 'conflict', 'multiple accepted origins');
  if (accepted.length) requireThat(accepted[0] === `${state.organism}.json` && readFile(acceptedDir, accepted[0], 65536).equals(raw('birth.json')), 'conflict', 'contradictory accepted TEST birth');
  return { scope: SCOPE, manifestRef, freezeRef, releaseRef, birthRef: ref('birth', birth), journalStatus: accepted.length ? 'accepted' : 'empty', artifacts: packageInventory.files.length };
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    requireThat(process.argv.length === 4, 'invalid', 'usage: node tools/check_draft_ceremony.mjs TEST_ROOT TRUSTED_CONTEXT');
    const root = path.resolve(process.argv[2]), context = path.resolve(process.argv[3]);
    requireThat(context !== root && !context.startsWith(root + path.sep), 'unauthorized', 'trusted context must be external');
    const trusted = parseCanonical(readFile(path.dirname(context), path.basename(context), 65536));
    process.stdout.write(JSON.stringify(checkDraft(root, trusted)) + '\n');
  } catch (error) { process.stderr.write(`${error.code || 'unavailable'}: ${error.message}\n`); process.exitCode = 1; }
}
