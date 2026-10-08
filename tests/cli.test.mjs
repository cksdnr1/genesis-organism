import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { fixture } from './helpers.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
function cli(...args) { return spawnSync(process.execPath, [path.join(root, 'src/cli.mjs'), ...args], { encoding: 'utf8' }); }
test('actual CLI initializes, appends, deduplicates, inspects and verifies expected head', context => {
  const parent = fs.mkdtempSync(path.join(os.tmpdir(), 'genesis-cli-'));
  context.after(() => fs.rmSync(parent, { recursive: true, force: true }));
  const directory = path.join(parent, 'history');
  const origin = path.join(root, 'fixtures/core-v1/origin.json');
  assert.equal(cli('init-fixture', directory, origin).status, 0);
  for (let sequence = 1; sequence <= 3; sequence++) assert.equal(cli('append', directory, path.join(root, `fixtures/core-v1/${String(sequence).padStart(6, '0')}.json`)).status, 0);
  const expected = fixture('expected.json');
  for (const command of ['inspect', 'replay']) {
    const result = cli(command, directory);
    assert.equal(result.status, 0); assert.equal(result.stderr, '');
    assert.deepEqual(JSON.parse(result.stdout), { state: expected.state, commitment: expected.commitment });
  }
  assert.equal(cli('replay', directory, expected.state.head).status, 0);
  assert.equal(cli('replay', directory, '0'.repeat(64)).status, 1);
  assert.equal(JSON.parse(cli('append', directory, path.join(root, 'fixtures/core-v1/000001.json')).stdout).status, 'duplicate');
  for (const args of [[], ['birth'], ['inspect', directory, 'extra'], ['replay', directory, 'not-a-head'], ['append', directory]]) {
    const result = cli(...args); assert.equal(result.status, 2); assert.equal(result.stdout, '');
    assert.equal(JSON.parse(result.stderr).error, 'invalid');
  }
  const protectedResult = cli('init-fixture', path.join(root, 'organisms/genesis-0001/candidate'), origin);
  assert.equal(protectedResult.status, 1); assert.equal(JSON.parse(protectedResult.stderr).error, 'unauthorized');
  const malformed = path.join(parent, 'malformed'); fs.writeFileSync(malformed, '{"private":"DO-NOT-ECHO"');
  const failed = cli('append', directory, malformed);
  assert.equal(failed.status, 1); assert.equal(failed.stdout, '');
  assert.ok(!failed.stderr.includes('DO-NOT-ECHO')); assert.ok(!failed.stderr.includes('at file:'));
});
