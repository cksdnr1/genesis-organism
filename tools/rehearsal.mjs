// Public synthetic ceremony experiment. NEVER use this fixture signer for real data.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { createHash, createPrivateKey, createPublicKey, sign, verify, randomUUID } from 'node:crypto';
import { canonical, parseCanonical, requireThat, digest } from '../src/bytes.mjs';
import { validateOrigin } from '../src/admission.mjs';

export const ROOT = fileURLToPath(new URL('../', import.meta.url));
export const PROFILE = 'ceremony-rehearsal-v1';
export const AUTHORITY = 'd75a980182b10ab7d54bfed3c964073a0ee172f3daa62325af021a68f707511a';
export const LIST = 'fixtures/ceremony-v1/artifacts.json';
export const ORIGIN = 'fixtures/adaptation-v1/origin.json';
export const REHEARSAL_ORIGIN = '37d5a9c4b7163c331b296545a52130cd2c8006cfa010cc5e31353cac8e2061cc';
export const MAX_RAW = 32 * 1024 * 1024;
export const sha = bytes => createHash('sha256').update(bytes).digest('hex');
export const hex = value => typeof value === 'string' && /^[0-9a-f]{64}$/.test(value);
export const exact = (value, keys) => {
  requireThat(value && typeof value === 'object' && !Array.isArray(value), 'invalid', 'object required');
  requireThat(Object.keys(value).sort().join(',') === [...keys].sort().join(','), 'invalid', 'closed shape');
};
const prefix = kind => Buffer.from(`genesis-organism/rehearsal-v1/${kind}\0`, 'ascii');
const kinds = ['manifest', 'freeze', 'release', 'birth'];
export function reference(kind, value) {
  requireThat(kinds.includes(kind), 'unsupported', 'rehearsal hash kind');
  return sha(Buffer.concat([prefix(kind), canonical(value)]));
}
export function fixtureSign(kind, body) {
  requireThat(kinds.includes(kind) && kind !== 'manifest', 'unsupported', 'proof kind');
  const key = createPrivateKey({ key: Buffer.from('302e020100300506032b6570042204209d61b19deffd5a60ba844af492ec2cc44449c5697b326919703bac031cae7f60', 'hex'), format: 'der', type: 'pkcs8' });
  return { body: structuredClone(body), signature: sign(null, Buffer.concat([prefix(`${kind}-proof`), canonical(body)]), key).toString('hex') };
}
export function checkProof(kind, envelope, keys) {
  canonical(envelope); exact(envelope, ['body', 'signature']); exact(envelope.body, keys);
  requireThat(envelope.body.profile === PROFILE, 'unsupported', 'rehearsal profile');
  requireThat(envelope.body.authority === AUTHORITY, 'unauthorized', 'fixture attribution required');
  requireThat(typeof envelope.signature === 'string' && /^[0-9a-f]{128}$/.test(envelope.signature), 'invalid', 'signature encoding');
  const key = createPublicKey({ key: Buffer.from(`302a300506032b6570032100${AUTHORITY}`, 'hex'), format: 'der', type: 'spki' });
  requireThat(verify(null, Buffer.concat([prefix(`${kind}-proof`), canonical(envelope.body)]), key, Buffer.from(envelope.signature, 'hex')), 'invalid', 'fixture proof');
}
export function checkPath(value) {
  requireThat(typeof value === 'string' && value.length <= 240 && /^[A-Za-z0-9_.\/-]+$/.test(value), 'invalid', 'artifact path');
  const parts = value.split('/');
  requireThat(parts.every(part => part !== '' && part !== '.' && part !== '..' && part !== '.git' && part !== '.playspec') && parts[0] !== 'organisms', 'unauthorized', 'protected or nonrelative artifact');
}
export function checkManifest(manifest) {
  canonical(manifest); exact(manifest, ['profile', 'candidate', 'revision', 'anchor', 'supersedes', 'artifacts']);
  requireThat(manifest.profile === PROFILE && manifest.anchor === 'skip', 'unsupported', 'manifest profile/anchor');
  requireThat(typeof manifest.candidate === 'string' && /^rehearsal-[a-z0-9-]{1,48}$/.test(manifest.candidate), 'invalid', 'synthetic candidate');
  requireThat(typeof manifest.revision === 'string' && /^[0-9a-f]{40}$/.test(manifest.revision), 'invalid', 'full Git revision');
  requireThat(manifest.supersedes === null || hex(manifest.supersedes), 'invalid', 'supersedes reference');
  requireThat(Array.isArray(manifest.artifacts) && manifest.artifacts.length > 0 && manifest.artifacts.length <= 256, 'limit', 'artifact count');
  let previous = '';
  for (const item of manifest.artifacts) {
    exact(item, ['path', 'sha256']); checkPath(item.path);
    requireThat(item.path > previous && hex(item.sha256), 'invalid', 'artifact order/hash'); previous = item.path;
  }
  const paths = manifest.artifacts.map(item => item.path);
  for (const required of [LIST, ORIGIN, 'ORIGIN.md', 'spec/GENESIS.md', 'LICENSE.md', 'LICENSES/CC-BY-4.0.txt', 'LICENSES/Apache-2.0.txt', 'THIRD-PARTY-NOTICES.md', 'docs/decisions/D12-synthetic-ceremony.md', 'docs/features/genesis_organism_phase_35/birth-evidence.md']) {
    requireThat(paths.includes(required), 'unavailable', 'required artifact not selected');
  }
}
export function gitBlob(revision, name) {
  requireThat(typeof revision === 'string' && /^[0-9a-f]{40}$/.test(revision), 'invalid', 'full Git revision'); checkPath(name);
  let tree, data;
  try {
    tree = execFileSync('git', ['ls-tree', '-z', revision, '--', name], { cwd: ROOT, maxBuffer: 4096 }).toString();
    requireThat(new RegExp(`^100(?:644|755) blob [0-9a-f]{40}\\t${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\x00$`).test(tree), 'unavailable', 'regular Git blob required');
    data = execFileSync('git', ['show', `${revision}:${name}`], { cwd: ROOT, maxBuffer: MAX_RAW });
  } catch (error) {
    if (error.code && ['invalid', 'unavailable', 'unauthorized'].includes(error.code)) throw error;
    requireThat(false, 'unavailable', 'Git artifact unavailable');
  }
  return data;
}
export function checkSelection(manifest, files) {
  checkManifest(manifest);
  const selected = parseCanonical(files.get(LIST));
  requireThat(Array.isArray(selected) && canonical(selected).equals(canonical(manifest.artifacts.map(item => item.path))), 'invalid', 'explicit selection mismatch');
}
export function readArtifacts(manifest) {
  checkManifest(manifest); let total = 0; const files = new Map();
  for (const item of manifest.artifacts) {
    const bytes = gitBlob(manifest.revision, item.path); total += bytes.length;
    requireThat(total <= MAX_RAW, 'limit', 'raw artifact budget');
    requireThat(sha(bytes) === item.sha256, 'invalid', 'raw artifact mismatch'); files.set(item.path, bytes);
  }
  checkSelection(manifest, files); return files;
}
export function manifestFor(revision, candidate = 'rehearsal-001', prior = null) {
  const paths = parseCanonical(gitBlob(revision, LIST));
  requireThat(Array.isArray(paths), 'invalid', 'explicit artifact list');
  let total = 0;
  const artifacts = paths.map(name => { const bytes = gitBlob(revision, name); total += bytes.length; requireThat(total <= MAX_RAW, 'limit', 'raw budget'); return { path: name, sha256: sha(bytes) }; });
  const manifest = { profile: PROFILE, candidate, revision, anchor: 'skip', supersedes: prior ? reference('manifest', prior.manifest) : null, artifacts };
  checkManifest(manifest); return manifest;
}
export function checkFreeze(manifest, freeze, prior = null) {
  checkManifest(manifest); checkProof('freeze', freeze, ['profile', 'manifestRef', 'authority']);
  requireThat(freeze.body.manifestRef === reference('manifest', manifest), 'invalid', 'freeze manifest binding');
  if (manifest.supersedes === null) requireThat(prior === null, 'invalid', 'unexpected prior evidence');
  else {
    exact(prior, ['manifest', 'failure', 'births']); checkManifest(prior.manifest);
    exact(prior.failure, ['profile', 'manifestRef', 'reason']);
    requireThat(prior.manifest.supersedes === null && prior.manifest.candidate !== manifest.candidate, 'invalid', 'bounded failed-candidate supersession');
    requireThat(manifest.supersedes === reference('manifest', prior.manifest) && prior.failure.profile === PROFILE && prior.failure.manifestRef === manifest.supersedes && prior.failure.reason === 'fixture-failure', 'invalid', 'retained failure evidence');
    requireThat(Array.isArray(prior.births) && prior.births.length === 0, 'conflict', 'accepted prior cannot be superseded');
    // A predecessor reference/shape is not evidence that its selected bytes exist.
    // Supersession requires retained Git artifacts; no digest-only fallback.
    readArtifacts(prior.manifest);
  }
  return { manifestRef: reference('manifest', manifest), freezeRef: reference('freeze', freeze) };
}

const marker = Buffer.from('genesis-organism synthetic ceremony rehearsal v1\n');
function outsideRepository(directory) {
  const absolute = path.resolve(directory);
  const repository = fs.realpathSync(ROOT);
  const parent = fs.realpathSync(path.dirname(absolute));
  const resolved = path.join(parent, path.basename(absolute));
  requireThat(resolved !== repository && !resolved.startsWith(repository + path.sep), 'unauthorized', 'rehearsal must be outside repository');
  return absolute;
}
function directory(root, relative) {
  checkPath(relative); let current = root;
  for (const part of relative.split('/')) {
    current = path.join(current, part);
    try { fs.mkdirSync(current, { mode: 0o700 }); sync(path.dirname(current)); } catch (error) { if (error.code !== 'EEXIST') throw error; }
    const info = fs.lstatSync(current);
    requireThat(info.isDirectory() && !info.isSymbolicLink(), 'invalid', 'regular directory required');
  }
}
function readWithin(root, relative, maximum = MAX_RAW) {
  checkPath(relative);
  const parts = relative.split('/'); let current = root;
  for (const part of parts.slice(0, -1)) {
    current = path.join(current, part); const info = fs.lstatSync(current);
    requireThat(info.isDirectory() && !info.isSymbolicLink(), 'invalid', 'symlinked ancestor');
  }
  const fd = fs.openSync(path.join(root, relative), fs.constants.O_RDONLY | fs.constants.O_NOFOLLOW);
  try {
    const info = fs.fstatSync(fd);
    requireThat(info.isFile() && info.size <= maximum, 'limit', 'regular bounded file required');
    const bytes = Buffer.alloc(info.size + 1); let count = 0;
    while (count < bytes.length) { const n = fs.readSync(fd, bytes, count, bytes.length - count, null); if (!n) break; count += n; }
    requireThat(count === info.size, 'invalid', 'file changed during read'); return bytes.subarray(0, count);
  } finally { fs.closeSync(fd); }
}
function sync(directoryName) {
  const fd = fs.openSync(directoryName, fs.constants.O_RDONLY);
  try { fs.fsyncSync(fd); } finally { fs.closeSync(fd); }
}
export function initializeRehearsal(root) {
  root = outsideRepository(root);
  fs.mkdirSync(root, { mode: 0o700 }); // Never adopt an existing directory.
  const fd = fs.openSync(path.join(root, 'REHEARSAL'), 'wx', 0o600);
  try { fs.writeFileSync(fd, marker); fs.fsyncSync(fd); } finally { fs.closeSync(fd); }
  sync(root); sync(path.dirname(root)); return root;
}
export function guardRoot(root) {
  root = outsideRepository(root);
  const info = fs.lstatSync(root);
  requireThat(info.isDirectory() && !info.isSymbolicLink(), 'invalid', 'rehearsal root');
  requireThat(readWithin(root, 'REHEARSAL', 128).equals(marker), 'invalid', 'synthetic marker required');
  return root;
}
export function readRehearsal(root, relative, maximum = MAX_RAW) {
  return readWithin(guardRoot(root), relative, maximum);
}
export function publish(root, relative, bytes, fault = () => {}) {
  root = guardRoot(root); checkPath(relative);
  requireThat(bytes instanceof Uint8Array && bytes.length <= MAX_RAW, 'limit', 'publication byte budget');
  const parent = path.posix.dirname(relative);
  if (parent !== '.') directory(root, parent);
  directory(root, 'pending');
  const pending = path.join(root, 'pending', randomUUID());
  const fd = fs.openSync(pending, 'wx', 0o600);
  try {
    fs.writeFileSync(fd, bytes); fault('after-write', relative);
    fs.fsyncSync(fd); fault('after-fsync', relative);
  } finally { fs.closeSync(fd); }
  let status = 'created';
  try { fs.linkSync(pending, path.join(root, relative)); }
  catch (error) {
    if (error.code !== 'EEXIST') throw error;
    requireThat(readWithin(root, relative).equals(Buffer.from(bytes)), 'conflict', 'existing evidence differs'); status = 'duplicate';
  }
  fault('after-link', relative);
  sync(path.dirname(path.join(root, relative))); fault('after-dir-sync', relative);
  fs.unlinkSync(pending); sync(path.join(root, 'pending'));
  return status;
}
const archiveName = name => requireThat(['archive-a', 'archive-b'].includes(name), 'invalid', 'archive name');
export function writeArchive(root, name, manifest, freeze, fault, prior = null) {
  root = guardRoot(root); archiveName(name); checkFreeze(manifest, freeze, prior);
  const files = readArtifacts(manifest);
  publish(root, `${name}/manifest.json`, canonical(manifest), fault);
  publish(root, `${name}/freeze.json`, canonical(freeze), fault);
  for (const [file, bytes] of files) publish(root, `${name}/files/${file}`, bytes, fault);
  return checkArchive(root, name, manifest, freeze, prior).size;
}
export function checkArchive(root, name, manifest, freeze, prior = null) {
  root = guardRoot(root); archiveName(name); checkFreeze(manifest, freeze, prior);
  const expected = new Set(['manifest.json', 'freeze.json', ...manifest.artifacts.map(item => `files/${item.path}`)]);
  const directories = new Set(['']);
  for (const file of expected) { const parts = file.split('/'); for (let i = 1; i < parts.length; i++) directories.add(parts.slice(0, i).join('/')); }
  let entries = 0; const found = new Set();
  function walk(relative) {
    const info = fs.lstatSync(path.join(root, name, relative));
    requireThat(!info.isSymbolicLink(), 'invalid', 'archive symlink');
    if (info.isDirectory()) {
      requireThat(directories.has(relative), 'invalid', 'extra archive directory');
      for (const child of fs.readdirSync(path.join(root, name, relative))) {
        requireThat(++entries <= 1024, 'limit', 'archive member budget'); checkPath(child);
        walk(relative ? `${relative}/${child}` : child);
      }
    } else { requireThat(info.isFile() && expected.has(relative), 'invalid', 'extra/nonregular archive member'); found.add(relative); }
  }
  walk(''); requireThat(found.size === expected.size, 'unavailable', 'incomplete archive');
  requireThat(readWithin(root, `${name}/manifest.json`, 65536).equals(canonical(manifest)) && readWithin(root, `${name}/freeze.json`, 65536).equals(canonical(freeze)), 'invalid', 'archive record mismatch');
  const files = new Map(); let total = 0;
  for (const item of manifest.artifacts) {
    const bytes = readWithin(root, `${name}/files/${item.path}`); total += bytes.length;
    requireThat(total <= MAX_RAW, 'limit', 'raw archive budget');
    requireThat(sha(bytes) === item.sha256, 'invalid', 'archive raw hash'); files.set(item.path, bytes);
  }
  checkSelection(manifest, files); return files;
}
export function checkRelease(root, manifest, freeze, release, prior = null) {
  const checked = checkFreeze(manifest, freeze, prior);
  checkProof('release', release, ['profile', 'manifestRef', 'freezeRef', 'authority']);
  requireThat(release.body.manifestRef === checked.manifestRef && release.body.freezeRef === checked.freezeRef, 'invalid', 'release bindings');
  checkArchive(root, 'archive-a', manifest, freeze, prior); checkArchive(root, 'archive-b', manifest, freeze, prior);
  return { ...checked, releaseRef: reference('release', release) };
}

export function checkBirth(root, manifest, freeze, release, birth, prior = null) {
  const checked = checkRelease(root, manifest, freeze, release, prior);
  checkProof('birth', birth, ['profile', 'manifestRef', 'releaseRef', 'originRef', 'authority']);
  const state = validateOrigin(parseCanonical(checkArchive(root, 'archive-a', manifest, freeze, prior).get(ORIGIN)));
  requireThat(state.organism === REHEARSAL_ORIGIN && state.authority === AUTHORITY && state.sequence === 0 && state.signal === 0 && state.rules === 'adaptation-v1', 'unauthorized', 'only pinned public synthetic origin');
  requireThat(birth.body.manifestRef === checked.manifestRef && birth.body.releaseRef === checked.releaseRef && birth.body.originRef === state.organism, 'invalid', 'birth bindings');
  return { ...checked, birthRef: reference('birth', birth), originRef: state.organism, stateCommitment: digest('state', state) };
}
function journalRecord(root) {
  root = guardRoot(root);
  const allowed = ['REHEARSAL', 'pending', 'archive-a', 'archive-b', 'accepted', 'conflicts', 'LOCK'];
  for (const name of fs.readdirSync(root)) {
    requireThat(allowed.includes(name), 'invalid', 'unknown rehearsal root member');
    const info = fs.lstatSync(path.join(root, name));
    requireThat(!info.isSymbolicLink() && (['REHEARSAL', 'LOCK'].includes(name) ? info.isFile() : info.isDirectory()), 'invalid', 'root member type');
  }
  const members = name => {
    try {
      const names = fs.readdirSync(path.join(root, name));
      requireThat(names.length <= (name === 'accepted' ? 1 : 256), 'limit', 'journal member budget'); return names;
    } catch (error) { if (error.code === 'ENOENT') return []; throw error; }
  };
  let pendingTotal = 0;
  for (const name of members('pending')) {
    requireThat(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(name), 'invalid', 'unknown pending diagnostic');
    const info = fs.lstatSync(path.join(root, 'pending', name)); pendingTotal += info.size;
    requireThat(info.isFile() && !info.isSymbolicLink() && pendingTotal <= MAX_RAW, 'limit', 'pending evidence budget');
  }
  const conflicts = members('conflicts');
  for (const name of conflicts) {
    requireThat(/^[0-9a-f]{64}\.json$/.test(name), 'invalid', 'conflict name');
    const envelope = parseCanonical(readWithin(root, `conflicts/${name}`, 65536));
    checkProof('birth', envelope, ['profile', 'manifestRef', 'releaseRef', 'originRef', 'authority']);
    requireThat(name === `${reference('birth', envelope)}.json`, 'invalid', 'conflict reference');
  }
  requireThat(conflicts.length === 0, 'conflict', 'retained birth conflict hold');
  const names = members('accepted');
  if (names.length === 0) return null;
  requireThat(/^[0-9a-f]{64}\.json$/.test(names[0]), 'invalid', 'accepted origin name');
  const envelope = parseCanonical(readWithin(root, `accepted/${names[0]}`, 65536));
  checkProof('birth', envelope, ['profile', 'manifestRef', 'releaseRef', 'originRef', 'authority']);
  requireThat(hex(envelope.body.originRef) && names[0] === `${envelope.body.originRef}.json`, 'invalid', 'accepted origin binding');
  return envelope;
}
function lockRecord(root) {
  const lock = parseCanonical(readWithin(root, 'LOCK', 65536)); exact(lock, ['profile', 'pid']);
  requireThat(lock.profile === PROFILE && Number.isSafeInteger(lock.pid) && lock.pid > 0 && lock.pid <= 2147483647, 'invalid', 'lock owner evidence');
  return lock;
}
function acquireLock(root) {
  const bytes = canonical({ profile: PROFILE, pid: process.pid });
  let fd;
  try { fd = fs.openSync(path.join(root, 'LOCK'), 'wx', 0o600); }
  catch (error) { if (error.code === 'EEXIST') requireThat(false, 'conflict', 'writer lock held; explicit recovery required'); throw error; }
  try { fs.writeFileSync(fd, bytes); fs.fsyncSync(fd); } finally { fs.closeSync(fd); }
  sync(root); return bytes;
}
export function acceptBirth(root, manifest, freeze, release, birth, fault = () => {}, prior = null) {
  root = guardRoot(root); const checked = checkBirth(root, manifest, freeze, release, birth, prior);
  const ownedLock = acquireLock(root); fault('after-lock', 'LOCK');
  // Any exception after acquisition preserves the lock; never infer safe takeover.
  const existing = journalRecord(root);
  let status = 'accepted';
  if (existing) {
    if (!canonical(existing).equals(canonical(birth))) {
      publish(root, `conflicts/${checked.birthRef}.json`, canonical(birth), fault);
      requireThat(false, 'conflict', 'origin/candidate already bound; conflict retained');
    }
    status = 'duplicate';
  } else publish(root, `accepted/${checked.originRef}.json`, canonical(birth), fault);
  requireThat(readWithin(root, 'LOCK', 65536).equals(ownedLock), 'conflict', 'lock ownership changed');
  fs.unlinkSync(path.join(root, 'LOCK')); sync(root); fault('after-unlock', 'LOCK');
  return { status, ...checked };
}
export function checkJournal(root, manifest, freeze, release, birth, prior = null) {
  root = guardRoot(root);
  requireThat(!fs.existsSync(path.join(root, 'LOCK')), 'conflict', 'writer lock held');
  const checked = checkBirth(root, manifest, freeze, release, birth, prior), existing = journalRecord(root);
  if (!existing) return { status: 'empty', ...checked };
  requireThat(canonical(existing).equals(canonical(birth)), 'conflict', 'different accepted binding');
  return { status: 'accepted', ...checked };
}
export function recoverBirthLock(root, manifest, freeze, release, birth, prior = null) {
  root = guardRoot(root);
  if (!fs.existsSync(path.join(root, 'LOCK'))) { checkJournal(root, manifest, freeze, release, birth, prior); return 'not-held'; }
  const lock = lockRecord(root); let absent = false;
  try { process.kill(lock.pid, 0); } catch (error) { absent = error.code === 'ESRCH'; }
  requireThat(absent, 'conflict', 'writer alive or absence not proven');
  checkBirth(root, manifest, freeze, release, birth, prior); const existing = journalRecord(root);
  requireThat(!existing || canonical(existing).equals(canonical(birth)), 'conflict', 'cannot recover inconsistent journal');
  requireThat(canonical(lockRecord(root)).equals(canonical(lock)), 'conflict', 'lock changed during recovery');
  fs.unlinkSync(path.join(root, 'LOCK')); sync(root); return 'recovered';
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    requireThat(process.argv.length === 3, 'invalid', 'usage: node tools/rehearsal.mjs FULL_GIT_REVISION');
    const manifest = manifestFor(process.argv[2]);
    const freeze = fixtureSign('freeze', { profile: PROFILE, manifestRef: reference('manifest', manifest), authority: AUTHORITY });
    const checked = checkFreeze(manifest, freeze);
    process.stdout.write(JSON.stringify({ status: 'synthetic rehearsal only; GENESIS #0001 UNBORN', manifest, freeze, ...checked }, null, 2) + '\n');
  } catch (error) { process.stderr.write(error.message + '\n'); process.exitCode = 1; }
}
