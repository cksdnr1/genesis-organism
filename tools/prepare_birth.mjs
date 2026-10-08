import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { createHash, generateKeyPairSync, sign } from 'node:crypto';
import { canonical, digest, requireThat } from '../src/bytes.mjs';
import { classify, validateOrigin } from '../src/admission.mjs';
import { replay } from '../src/replay.mjs';
import { express } from '../src/expression.mjs';
import { relatedExpression } from '../src/related-expression.mjs';
import { memoryFor } from '../src/memory.mjs';
import { synapseFor } from '../src/synapse.mjs';
import { demonstrate } from './demo_encounter.mjs';

const ROOT = fileURLToPath(new URL('../', import.meta.url));
const MAX = 32 * 1024 * 1024, BLOB = 8 * 1024 * 1024;
const PURPOSE = 'PROVISIONAL SYNTHETIC PREPARATION ONLY; GENESIS #0001 UNBORN; NO-GO';
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const git = (root, args, maxBuffer = MAX) => execFileSync('git', args, { cwd: root, maxBuffer, stdio: ['ignore', 'pipe', 'pipe'] });
function revisionGuard(root, revision) {
  requireThat(typeof revision === 'string' && /^[a-f0-9]{40}$/.test(revision), 'invalid', 'full commit required');
  requireThat(git(root, ['cat-file', '-t', revision]).toString().trim() === 'commit', 'invalid', 'commit object required');
}
function artifactPath(name) {
  requireThat(name.length <= 512 && /^[A-Za-z0-9_.\/-]+$/.test(name) && name.split('/').every(part => part && part !== '.' && part !== '..' && part !== '.git'), 'invalid', 'normalized artifact path required');
}
export function inventoryFor(repository, revision) {
  revisionGuard(repository, revision);
  const records = git(repository, ['ls-tree', '-rz', '--full-tree', revision]).toString().split('\0').filter(Boolean);
  const artifacts = []; let total = 0;
  for (const record of records) {
    const match = /^(\d+) (\w+) ([0-9a-f]{40})\t(.+)$/.exec(record);
    requireThat(match, 'invalid', 'Git tree entry');
    const [, mode, type, object, name] = match;
    if (name.startsWith('.playspec/')) continue;
    artifactPath(name);
    requireThat(type === 'blob' && ['100644', '100755'].includes(mode), 'invalid', 'regular tracked blob required');
    requireThat(artifacts.length < 1024, 'limit', 'artifact count');
    const size = Number(git(repository, ['cat-file', '-s', object], 128).toString().trim());
    requireThat(Number.isSafeInteger(size) && size <= BLOB && total + size <= MAX, 'limit', 'raw artifact budget');
    const bytes = git(repository, ['cat-file', 'blob', object], BLOB + 1);
    requireThat(bytes.length === size, 'invalid', 'blob size'); total += size;
    artifacts.push({ path: name, sha256: sha(bytes), size });
  }
  artifacts.sort((a, b) => a.path < b.path ? -1 : a.path > b.path ? 1 : 0);
  requireThat(artifacts.length > 0, 'unavailable', 'empty selection');
  return { version: 1, purpose: PURPOSE, revision, selection: 'all tracked regular Git blobs except .playspec/; no worktree/untracked inputs', artifacts };
}
function regularAncestors(directory) {
  let current = path.parse(directory).root;
  for (const part of directory.slice(current.length).split(path.sep).filter(Boolean)) {
    current = path.join(current, part);
    const info = fs.lstatSync(current);
    requireThat(info.isDirectory() && !info.isSymbolicLink(), 'invalid', 'real directory ancestors required');
  }
}
export function outputGuard(repository, destination) {
  const absolute = path.resolve(destination), parent = path.dirname(absolute);
  const repo = fs.realpathSync(repository);
  regularAncestors(parent);
  requireThat(absolute !== repo && !absolute.startsWith(repo + path.sep), 'unauthorized', 'output must be outside repository');
  requireThat(!absolute.split(path.sep).includes('organisms'), 'unauthorized', 'organisms output prohibited');
  try { fs.lstatSync(absolute); requireThat(false, 'conflict', 'new output directory required'); }
  catch (error) { if (error.code !== 'ENOENT') throw error; }
  return absolute;
}
export function shadowEvidence() {
  const { privateKey, publicKey } = generateKeyPairSync('ed25519');
  const authority = publicKey.export({ format: 'der', type: 'spki' }).subarray(-32).toString('hex');
  const signed = (kind, body, profile = 'synthetic-v1') => ({ body, signature: sign(null, Buffer.concat([Buffer.from(`genesis-organism/${profile}/${kind}-proof\0`), canonical(body)]), privateKey).toString('hex') });
  const origin = signed('origin', { profile: 'synthetic-v1', rules: 'adaptation-v1', birth: 'provisional-birth-readiness-shadow', creator: 'PROVISIONAL SYNTHETIC TEST ONLY', authority, genome: { signal: 0 } });
  const state = validateOrigin(origin);
  const observer = { version: 'observer-v1', observerType: 'language-mock', subject: 'provisional-observer', capabilities: { symbols: { supported: true, evidence: 'claimed' } } };
  const policy = { version: 'policy-v1', allow: ['text-v1', 'symbols-v1', 'path-v1'], disclosure: 'public-synthetic' };
  const evidence = { version: 'evidence-v1', nonce: 'provisional-encounter-one', sourceState: state, observer, policy, expression: express(state, observer, policy), interaction: { motif: 2, message: 'PROVISIONAL SYNTHETIC INPUT' } };
  const event = signed('event', { profile: 'synthetic-v1', organism: state.organism, sequence: 1, previous: state.head, kind: 'experience-v1', data: { evidence } });
  const rejectedEvent = { ...event, signature: '0'.repeat(128) };
  const admission = classify([state], [], event), refusal = classify([state], [], rejectedEvent);
  requireThat(admission.status === 'accepted' && refusal.status === 'rejected', 'invalid', 'shadow admission controls');
  const restored = replay(origin, [event]);
  const retry = classify([state, restored.state], [event], event);
  const relationshipPolicy = { version: 'policy-related-v1', allow: ['relationship-text-v1', 'relationship-symbols-v1', 'relationship-path-v1'], disclosure: 'public-synthetic', relationships: true };
  const views = ['text', 'symbols', 'spatial'].map(capability => {
    const descriptor = { supported: true, evidence: 'claimed', ...(capability === 'spatial' ? { frame: 'fixture-plane-v1', unit: 'mm' } : {}) };
    const viewer = { version: 'observer-v1', observerType: `mock-${capability}`, subject: observer.subject, capabilities: { [capability]: descriptor } };
    return { capability, noExperience: relatedExpression(origin, [], viewer, relationshipPolicy), treatment: relatedExpression(origin, [event], viewer, relationshipPolicy), rejectedExperience: relatedExpression(origin, [], viewer, relationshipPolicy), ablation: relatedExpression(origin, [event], viewer, relationshipPolicy, { mode: 'no-memory-control' }) };
  });
  return { origin, event, result: { purpose: PURPOSE, ...replay(origin, []), canonicalBodyHex: canonical(origin.body).toString('hex'), originProofPrefixHex: Buffer.from('genesis-organism/synthetic-v1/origin-proof\0').toString('hex') },
    negative: [{ case: 'forged-origin-proof', origin: { ...origin, signature: '0'.repeat(128) }, expectedCode: 'invalid' }, { case: 'cross-purpose-proof', origin: signed('origin', origin.body, 'genesis-v1'), expectedCode: 'invalid' }],
    demo: { status: PURPOSE, admission: admission.status, retry: retry.status, refusal: refusal.code, rejectedEvent, rejectedState: replay(origin, []).state, restoredState: restored.state, memory: memoryFor(origin, [event], observer.subject), synapse: synapseFor(origin, [event], observer.subject), views } };
}
export function prepareBirth(revision, destination) {
  revisionGuard(ROOT, revision);
  requireThat(git(ROOT, ['rev-parse', 'HEAD']).toString().trim() === revision, 'invalid', 'HEAD must equal source revision');
  requireThat(git(ROOT, ['status', '--porcelain', '--untracked-files=no']).length === 0, 'conflict', 'tracked source/index must be clean');
  requireThat(git(ROOT, ['show', `${revision}:tools/prepare_birth.mjs`], BLOB).equals(fs.readFileSync(fileURLToPath(import.meta.url))), 'invalid', 'executing tool must equal selected blob');
  const inventory = inventoryFor(ROOT, revision), shadow = shadowEvidence();
  const output = outputGuard(ROOT, destination);
  fs.mkdirSync(output, { mode: 0o700 });
  const identity = fs.lstatSync(output);
  const write = (name, bytes) => {
    regularAncestors(path.dirname(output));
    const now = fs.lstatSync(output);
    requireThat(now.isDirectory() && !now.isSymbolicLink() && now.ino === identity.ino && now.dev === identity.dev, 'conflict', 'output directory changed');
    requireThat(bytes.length <= BLOB, 'limit', 'report byte budget');
    fs.writeFileSync(path.join(output, name), bytes, { flag: 'wx', mode: 0o600 });
  };
  write('INCOMPLETE', Buffer.from(PURPOSE + '\n'));
  const json = value => Buffer.from(JSON.stringify(value, null, 2) + '\n');
  for (const [name, bytes] of [
    ['inventory.json', json(inventory)], ['environment.json', json({ node: process.version, platform: process.platform, arch: process.arch })],
    ['shadow-origin.json', canonical(shadow.origin)], ['shadow-event.json', canonical(shadow.event)],
    ['shadow-result.json', json(shadow.result)], ['shadow-negative.json', json(shadow.negative)], ['shadow-demo.json', json(shadow.demo)], ['demo.json', json(demonstrate())],
  ]) write(name, bytes);
  write('COMPLETE', Buffer.from(PURPOSE + '\nPreparation files complete; no birth gate accepted.\n'));
  fs.unlinkSync(path.join(output, 'INCOMPLETE'));
  return { output, revision, scope: PURPOSE };
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    requireThat(process.argv.length === 4, 'invalid', 'usage: node tools/prepare_birth.mjs FULL_GIT_COMMIT NEW_OUTPUT');
    process.stdout.write(JSON.stringify(prepareBirth(process.argv[2], process.argv[3])) + '\n');
  } catch (error) { process.stderr.write(`${error.code || 'unavailable'}: ${error.message}\n`); process.exitCode = 1; }
}
