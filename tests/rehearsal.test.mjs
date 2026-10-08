import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import { canonical } from '../src/bytes.mjs';
import { ROOT, PROFILE, AUTHORITY, manifestFor, reference, fixtureSign, checkFreeze, readArtifacts, gitBlob, initializeRehearsal, publish, readRehearsal, writeArchive, checkArchive, checkRelease } from '../tools/rehearsal.mjs';

const revision = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
const freezeFor = manifest => fixtureSign('freeze', { profile: PROFILE, manifestRef: reference('manifest', manifest), authority: AUTHORITY });
function python(bundle) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'genesis-freeze-check-'));
  try {
    const file = path.join(root, 'bundle.json'); fs.writeFileSync(file, JSON.stringify(bundle));
    return spawnSync('.venv/bin/python', ['verifier/rehearsal.py', file], { encoding: 'utf8' });
  } finally { fs.rmSync(root, { recursive: true }); }
}

test('synthetic freeze binds exact Git bytes and independently reproduces references', () => {
  const manifest = manifestFor(revision), freeze = freezeFor(manifest);
  const checked = checkFreeze(manifest, freeze);
  assert.equal(readArtifacts(manifest).size, manifest.artifacts.length);
  const independent = python({ manifest, freeze });
  assert.equal(independent.status, 0, independent.stderr);
  assert.deepEqual(JSON.parse(independent.stdout), { ...checked, artifacts: manifest.artifacts.length });
  assert.deepEqual(freezeFor(manifestFor(revision)), freeze);
  assert.equal(manifest.anchor, 'skip');
});

test('freeze rejects malformed attribution, domains, paths, unavailable and altered bytes', () => {
  const manifest = manifestFor(revision), freeze = freezeFor(manifest);
  const cases = [
    b => { delete b.freeze.body.authority; },
    b => { b.freeze.body.authority = '0'.repeat(64); },
    b => { b.freeze.signature = '0'.repeat(128); },
    b => { b.freeze.body.extra = true; },
    b => { b.manifest.artifacts[0].path = '../escape'; },
    b => { b.manifest.artifacts[0].path = '/absolute'; },
    b => { b.manifest.revision = '--help'; },
    b => { b.manifest.anchor = 'chain'; },
    b => { b.manifest.artifacts = b.manifest.artifacts.filter(x => x.path !== 'spec/GENESIS.md'); },
  ];
  for (const mutate of cases) {
    const bundle = structuredClone({ manifest, freeze }); mutate(bundle);
    assert.throws(() => checkFreeze(bundle.manifest, bundle.freeze));
    assert.equal(python(bundle).status, 1);
  }
  const altered = structuredClone(manifest); altered.artifacts[0].sha256 = '0'.repeat(64);
  assert.throws(() => readArtifacts(altered));
  assert.equal(python({ manifest: altered, freeze: freezeFor(altered) }).status, 1);
  assert.throws(() => gitBlob(revision, 'missing-required-dependency.lock'));
  assert.throws(() => gitBlob(revision, 'src')); // directory, not regular blob
  // Build an unreferenced synthetic Git tree, never edit HEAD/worktree/history.
  const blob = execFileSync('git', ['hash-object', '-w', '--stdin'], { input: 'README.md' }).toString().trim();
  const tree = execFileSync('git', ['mktree'], { input: `120000 blob ${blob}\tlink\n` }).toString().trim();
  const commit = execFileSync('git', ['commit-tree', tree], { input: 'synthetic symlink rejection fixture\n' }).toString().trim();
  assert.throws(() => gitBlob(commit, 'link'));
});

test('freeze supersession retains failed candidate and refuses accepted or absent evidence', () => {
  const first = manifestFor(revision, 'rehearsal-failed');
  const prior = { manifest: first, failure: { profile: PROFILE, manifestRef: reference('manifest', first), reason: 'fixture-failure' }, births: [] };
  const next = manifestFor(revision, 'rehearsal-successor', prior), freeze = freezeFor(next);
  assert.equal(checkFreeze(next, freeze, prior).manifestRef, reference('manifest', next));
  assert.equal(python({ manifest: next, freeze, prior }).status, 0);
  assert.throws(() => checkFreeze(next, freeze));
  assert.throws(() => checkFreeze(next, freeze, { ...prior, births: [{}] }));
  const wrong = structuredClone(prior); wrong.failure.manifestRef = '0'.repeat(64);
  assert.throws(() => checkFreeze(next, freeze, wrong));
  assert.equal(python({ manifest: next, freeze, prior: wrong }).status, 1);
  assert.equal(python({ manifest: next, freeze, prior: { ...prior, births: [{}] } }).status, 1);
  assert.equal(first.supersedes, null);
});

function scratch(t) {
  const parent = fs.mkdtempSync(path.join(os.tmpdir(), 'genesis-archive-test-'));
  t.after(() => fs.rmSync(parent, { recursive: true, force: true }));
  return initializeRehearsal(path.join(parent, 'trial'));
}
const frozen = () => JSON.parse(fs.readFileSync('docs/features/genesis_organism_phase_36/freeze.json'));
const releaseFor = (manifest, freeze) => fixtureSign('release', { profile: PROFILE, manifestRef: reference('manifest', manifest), freezeRef: reference('freeze', freeze), authority: AUTHORITY });
function offline(bundle, root) {
  const parent = fs.mkdtempSync(path.join(os.tmpdir(), 'genesis-offline-check-'));
  try {
    const file = path.join(parent, 'bundle.json'); fs.writeFileSync(file, JSON.stringify(bundle));
    return spawnSync(path.resolve('.venv/bin/python'), ['verifier/rehearsal.py', file, root], { encoding: 'utf8', env: { ...process.env, PATH: '/no-git-or-model-service' } });
  } finally { fs.rmSync(parent, { recursive: true }); }
}

test('two local archives restore independently offline; timestamps and optional skip do not affect refs', t => {
  const root = scratch(t), { manifest, freeze } = frozen();
  assert.equal(writeArchive(root, 'archive-a', manifest, freeze), manifest.artifacts.length);
  assert.equal(writeArchive(root, 'archive-b', manifest, freeze), manifest.artifacts.length);
  const release = releaseFor(manifest, freeze);
  const checked = checkRelease(root, manifest, freeze, release);
  const result = offline({ manifest, freeze, release }, root);
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(JSON.parse(result.stdout), { ...checked, artifacts: manifest.artifacts.length });
  fs.utimesSync(path.join(root, 'archive-a/manifest.json'), new Date(0), new Date(0));
  fs.utimesSync(path.join(root, 'archive-b/manifest.json'), new Date(999999), new Date(999999));
  assert.deepEqual(checkRelease(root, manifest, freeze, release), checked);
  assert.equal(offline({ manifest, freeze, release }, root).status, 0);
  assert.equal(manifest.anchor, 'skip');
  for (const scenario of ['hash', 'extra', 'empty-directory', 'missing', 'symlink', 'directory-symlink', 'missing-copy']) {
    const target = path.join(root, 'archive-a/files/README.md');
    const original = fs.readFileSync(target);
    if (scenario === 'hash') fs.writeFileSync(target, 'tampered');
    if (scenario === 'extra') fs.writeFileSync(path.join(root, 'archive-a/extra'), 'extra');
    if (scenario === 'empty-directory') fs.mkdirSync(path.join(root, 'archive-a/extra'));
    if (scenario === 'missing') fs.unlinkSync(target);
    if (scenario === 'symlink') { fs.unlinkSync(target); fs.symlinkSync(path.join(ROOT, 'README.md'), target); }
    if (scenario === 'directory-symlink') { fs.renameSync(path.join(root, 'archive-a/files/spec'), path.join(root, 'saved-spec')); fs.symlinkSync(path.join(root, 'saved-spec'), path.join(root, 'archive-a/files/spec')); }
    if (scenario === 'missing-copy') fs.renameSync(path.join(root, 'archive-b'), path.join(root, 'saved-copy'));
    assert.throws(() => checkRelease(root, manifest, freeze, release), scenario);
    assert.equal(offline({ manifest, freeze, release }, root).status, 1, scenario);
    if (['hash', 'missing'].includes(scenario)) fs.writeFileSync(target, original);
    if (scenario === 'extra') fs.unlinkSync(path.join(root, 'archive-a/extra'));
    if (scenario === 'empty-directory') fs.rmdirSync(path.join(root, 'archive-a/extra'));
    if (scenario === 'symlink') { fs.unlinkSync(target); fs.writeFileSync(target, original); }
    if (scenario === 'directory-symlink') { fs.unlinkSync(path.join(root, 'archive-a/files/spec')); fs.renameSync(path.join(root, 'saved-spec'), path.join(root, 'archive-a/files/spec')); }
    if (scenario === 'missing-copy') fs.renameSync(path.join(root, 'saved-copy'), path.join(root, 'archive-b'));
  }
  const bad = structuredClone(release); bad.body.freezeRef = '0'.repeat(64);
  assert.throws(() => checkRelease(root, manifest, freeze, bad));
  assert.equal(offline({ manifest, freeze, release: bad }, root).status, 1);
});

test('archive publication interrupts fail closed, retain evidence and retry without overwriting', t => {
  const root = scratch(t), bytes = canonical({ profile: PROFILE, observation: 'public fixture' });
  assert.throws(() => initializeRehearsal(path.join(ROOT, 'organisms/genesis-0001/never-create')));
  assert.throws(() => initializeRehearsal(root));
  for (const boundary of ['after-write', 'after-fsync', 'after-link', 'after-dir-sync']) {
    const relative = `observations/${boundary}.json`;
    const before = fs.existsSync(path.join(root, 'pending')) ? fs.readdirSync(path.join(root, 'pending')).length : 0;
    assert.throws(() => publish(root, relative, bytes, point => { if (point === boundary) throw Error('interrupted'); }));
    assert.equal(fs.readdirSync(path.join(root, 'pending')).length, before + 1);
    assert.ok(['created', 'duplicate'].includes(publish(root, relative, bytes)));
    assert.deepEqual(readRehearsal(root, relative), bytes);
    assert.equal(publish(root, relative, bytes), 'duplicate');
    assert.throws(() => publish(root, relative, canonical({ changed: true })));
    assert.deepEqual(readRehearsal(root, relative), bytes);
  }
  const { manifest, freeze } = frozen();
  assert.throws(() => writeArchive(root, 'archive-a', manifest, freeze, () => { throw Error('partial'); }));
  assert.throws(() => checkArchive(root, 'archive-a', manifest, freeze));
  assert.equal(writeArchive(root, 'archive-a', manifest, freeze), manifest.artifacts.length);
  assert.throws(() => checkRelease(root, manifest, freeze, releaseFor(manifest, freeze))); // second archive absent
  const marker = fs.readFileSync(path.join(root, 'REHEARSAL'));
  fs.writeFileSync(path.join(root, 'REHEARSAL'), 'partial initialization');
  assert.throws(() => readRehearsal(root, 'archive-a/manifest.json'));
  fs.writeFileSync(path.join(root, 'REHEARSAL'), marker); // test-owned fixture restoration
});
