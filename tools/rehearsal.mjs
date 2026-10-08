// Public synthetic ceremony experiment. NEVER use this fixture signer for real data.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { createHash, createPrivateKey, createPublicKey, sign, verify } from 'node:crypto';
import { canonical, parseCanonical, requireThat } from '../src/bytes.mjs';

export const ROOT = fileURLToPath(new URL('../', import.meta.url));
export const PROFILE = 'ceremony-rehearsal-v1';
export const AUTHORITY = 'd75a980182b10ab7d54bfed3c964073a0ee172f3daa62325af021a68f707511a';
export const LIST = 'fixtures/ceremony-v1/artifacts.json';
export const ORIGIN = 'fixtures/adaptation-v1/origin.json';
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
  }
  return { manifestRef: reference('manifest', manifest), freezeRef: reference('freeze', freeze) };
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
