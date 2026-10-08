import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import { canonical } from '../src/bytes.mjs';
import { PROFILE, AUTHORITY, manifestFor, reference, fixtureSign, checkFreeze, readArtifacts, gitBlob } from '../tools/rehearsal.mjs';

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
