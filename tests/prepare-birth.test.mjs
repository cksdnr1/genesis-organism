import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { inventoryFor, outputGuard, shadowEvidence } from '../tools/prepare_birth.mjs';
import { validateOrigin } from '../src/admission.mjs';
import { replay } from '../src/replay.mjs';

function repository(root) {
  const git = args => execFileSync('git', args, { cwd: root, stdio: ['ignore', 'pipe', 'pipe'] }).toString().trim();
  git(['init', '-q']); git(['config', 'user.name', 'Preparation Test']); git(['config', 'user.email', 'test@invalid']);
  fs.writeFileSync(path.join(root, 'source.txt'), 'source bytes\n'); git(['add', '.']); git(['commit', '-qm', 'fixture']);
  return git;
}
test('preparation inventory binds exact raw revision and rejects nonregular Git entries', () => {
  const root = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'genesis-prep-test-')));
  try {
    const git = repository(root), revision = git(['rev-parse', 'HEAD']);
    const inventory = inventoryFor(root, revision);
    assert.deepEqual(inventory.artifacts, [{ path: 'source.txt', sha256: createHash('sha256').update('source bytes\n').digest('hex'), size: 13 }]);
    fs.writeFileSync(path.join(root, 'source.txt'), 'changed worktree');
    assert.deepEqual(inventoryFor(root, revision), inventory);
    assert.throws(() => inventoryFor(root, 'HEAD'), /full commit/);
    assert.throws(() => inventoryFor(root, git(['rev-parse', 'HEAD:source.txt'])), /commit object/);
    fs.symlinkSync('source.txt', path.join(root, 'link')); git(['add', '.']); git(['commit', '-qm', 'symlink']);
    assert.throws(() => inventoryFor(root, git(['rev-parse', 'HEAD'])), /regular tracked blob/);
    git(['rm', 'link']); git(['commit', '-qm', 'remove link']);
    git(['update-index', '--add', '--cacheinfo', `160000,${revision},module`]); git(['commit', '-qm', 'submodule']);
    assert.throws(() => inventoryFor(root, git(['rev-parse', 'HEAD'])), /regular tracked blob/);
  } finally { fs.rmSync(root, { recursive: true, force: true }); }
});
test('preparation output is new-only, external and refuses symlink ancestors', () => {
  const root = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'genesis-prep-test-')));
  try {
    const repo = path.join(root, 'repo'); fs.mkdirSync(repo);
    assert.equal(outputGuard(repo, path.join(root, 'new-output')), path.join(root, 'new-output'));
    assert.throws(() => outputGuard(repo, path.join(repo, 'output')), /outside repository/);
    assert.throws(() => outputGuard(repo, root), /new output/);
    fs.symlinkSync(root, path.join(root, 'alias'));
    assert.throws(() => outputGuard(repo, path.join(root, 'alias', 'output')), /real directory ancestors/);
    assert.throws(() => outputGuard(repo, path.join(root, 'organisms')), /organisms output/);
  } finally { fs.rmSync(root, { recursive: true, force: true }); }
});
test('ephemeral provisional adaptation evidence preserves origin, changes signal and separates memory ablation', () => {
  const packet = shadowEvidence();
  assert.equal(validateOrigin(packet.origin).signal, 0);
  assert.equal(packet.origin.body.rules, 'adaptation-v1');
  assert.equal(replay(packet.origin, [packet.event]).state.signal, 2);
  assert.equal(packet.demo.admission, 'accepted'); assert.equal(packet.demo.retry, 'duplicate'); assert.equal(packet.demo.refusal, 'invalid');
  for (const negative of packet.negative) assert.throws(() => validateOrigin(negative.origin), { code: 'invalid' });
  for (const view of packet.demo.views) {
    assert.deepEqual(view.noExperience.output, view.rejectedExperience.output);
    assert.deepEqual(view.noExperience.output.grammar, [0, 64, 128, 255]);
    assert.deepEqual(view.treatment.output.grammar, [130, 253, 2, 66]);
    assert.deepEqual(view.ablation.output.grammar, [2, 66, 130, 253]);
    assert.equal(view.treatment.sourceStateRef, view.ablation.sourceStateRef);
    assert.notEqual(view.treatment.memorySource, null); assert.equal(view.ablation.memorySource, null);
  }
  assert.notEqual(shadowEvidence().origin.body.authority, packet.origin.body.authority);
  assert.equal(JSON.stringify(packet).includes('PRIVATE KEY'), false);
});
test('actual CLI refuses unbound revision before creating output', () => {
  const root = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'genesis-prep-test-')));
  try {
    const output = path.join(root, 'output');
    const result = spawnSync(process.execPath, ['tools/prepare_birth.mjs', '0'.repeat(40), output], { encoding: 'utf8' });
    assert.equal(result.status, 1); assert.equal(fs.existsSync(output), false);
  } finally { fs.rmSync(root, { recursive: true, force: true }); }
});
test('actual isolated CLI refuses dirty source and retains partial output without adoption', () => {
  const root = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'genesis-prep-cli-')));
  try {
    const repo = path.join(root, 'repo'); fs.mkdirSync(repo);
    fs.cpSync('src', path.join(repo, 'src'), { recursive: true });
    fs.mkdirSync(path.join(repo, 'tools'));
    for (const name of ['prepare_birth.mjs', 'demo_encounter.mjs']) fs.copyFileSync(`tools/${name}`, path.join(repo, 'tools', name));
    const git = repository(repo), revision = git(['rev-parse', 'HEAD']);
    const cli = destination => spawnSync(process.execPath, [path.join(repo, 'tools/prepare_birth.mjs'), revision, destination], { cwd: repo, encoding: 'utf8' });
    fs.appendFileSync(path.join(repo, 'src/replay.mjs'), '\n// dirty source\n');
    const dirtyOutput = path.join(root, 'dirty-output');
    assert.equal(cli(dirtyOutput).status, 1); assert.equal(fs.existsSync(dirtyOutput), false);
    git(['restore', 'src/replay.mjs']);
    const partial = path.join(root, 'partial-output');
    assert.equal(cli(partial).status, 1); // fixture demo intentionally unavailable
    assert.equal(fs.existsSync(path.join(partial, 'INCOMPLETE')), true);
    assert.equal(fs.existsSync(path.join(partial, 'COMPLETE')), false);
    const retry = cli(partial); assert.equal(retry.status, 1); assert.match(retry.stderr, /new output directory/);
    fs.mkdirSync(path.join(repo, 'fixtures'));
    fs.cpSync('fixtures/encounter-v1', path.join(repo, 'fixtures/encounter-v1'), { recursive: true });
    const preload = path.join(root, 'marker-fault.mjs');
    fs.writeFileSync(preload, `import fs from 'node:fs'; const original=fs.writeFileSync; fs.writeFileSync=function(file,...args){if(String(file).endsWith('/COMPLETE'))throw Object.assign(new Error('injected marker write failure'),{code:'ENOSPC'});return original.call(this,file,...args);};`);
    const failedMarker = path.join(root, 'failed-marker');
    const fault = spawnSync(process.execPath, ['--import', preload, path.join(repo, 'tools/prepare_birth.mjs'), revision, failedMarker], { cwd: repo, encoding: 'utf8' });
    assert.equal(fault.status, 1); assert.match(fault.stderr, /injected marker/);
    assert.equal(fs.existsSync(path.join(failedMarker, 'INCOMPLETE')), true);
    assert.equal(fs.existsSync(path.join(failedMarker, 'COMPLETE')), false);
    assert.equal(fs.existsSync(path.join(failedMarker, 'shadow-demo.json')), true);
    fs.appendFileSync(path.join(repo, 'tools/prepare_birth.mjs'), '\n// changed executing source\n');
    const changed = path.join(root, 'changed-tool-output');
    assert.equal(cli(changed).status, 1); assert.equal(fs.existsSync(changed), false);
  } finally { fs.rmSync(root, { recursive: true, force: true }); }
});
