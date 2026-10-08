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

test('nonregular input refusal covers history and proposal CLIs without FIFO writers', { skip: process.platform === 'win32' }, context => {
  const parent = fs.mkdtempSync(path.join(os.tmpdir(), 'genesis-cli-fifo-'));
  context.after(() => fs.rmSync(parent, { recursive: true, force: true }));
  const directory = path.join(parent, 'history');
  const valid = path.join(parent, 'valid');
  const origin = path.join(root, 'fixtures/core-v1/origin.json');
  const event = path.join(root, 'fixtures/core-v1/000001.json');
  assert.equal(cli('init-fixture', directory, origin).status, 0);
  assert.equal(cli('init-fixture', valid, origin).status, 0);
  assert.equal(cli('replay', valid).status, 0, 'regular control before FIFO reads');
  const historyFifo = path.join(directory, '000001.json');
  const sourceFifo = path.join(parent, 'source');
  for (const fifo of [historyFifo, sourceFifo]) assert.equal(spawnSync('mkfifo', [fifo]).status, 0);
  function snapshot(directoryName) {
    return fs.readdirSync(directoryName).sort().flatMap(name => {
      const filename = path.join(directoryName, name), info = fs.lstatSync(filename);
      if (info.isDirectory()) return [[filename, 'directory'], ...snapshot(filename)];
      return [[filename, info.isFile() ? fs.readFileSync(filename).toString('hex') : info.mode]];
    });
  }
  function refuses(command, args) {
    const before = snapshot(parent);
    const result = spawnSync(command, args, { encoding: 'utf8', timeout: 3000 });
    assert.ifError(result.error);
    assert.equal(result.signal, null);
    assert.equal(result.status, 1);
    assert.equal(result.stdout, '');
    assert.equal(JSON.parse(result.stderr).error, 'invalid');
    assert.deepEqual(snapshot(parent), before, 'refusal must leave all fixture entries/bytes unchanged');
  }
  const nodeHistory = command => [process.execPath, [path.join(root, 'src/cli.mjs'), command, directory]];
  const independent = [path.join(root, '.venv/bin/python'), [path.join(root, 'verifier/verify.py'), directory]];
  const appendSource = [process.execPath, [path.join(root, 'src/cli.mjs'), 'append', valid, sourceFifo]];
  const initSource = [process.execPath, [path.join(root, 'src/cli.mjs'), 'init-fixture', path.join(parent, 'uncreated'), sourceFifo]];
  for (const [command, args] of [nodeHistory('inspect'), nodeHistory('replay'), independent, appendSource, initSource]) refuses(command, args);
  // Test-local no-data counterpart on the observed POSIX hosts; no production O_RDWR dependency.
  const descriptors = [];
  try {
    for (const fifo of [historyFifo, sourceFifo]) descriptors.push(fs.openSync(fifo, fs.constants.O_RDWR | fs.constants.O_NONBLOCK));
    for (const [command, args] of [nodeHistory('inspect'), independent, appendSource]) refuses(command, args);
  }
  finally { for (const descriptor of descriptors) fs.closeSync(descriptor); }
  assert.equal(fs.existsSync(path.join(parent, 'uncreated')), false);
  assert.equal(cli('append', valid, event).status, 0, 'regular append control after FIFO reads');
  const expected = JSON.parse(cli('replay', valid).stdout);
  const python = spawnSync(independent[0], [path.join(root, 'verifier/verify.py'), valid], { encoding: 'utf8', timeout: 3000 });
  assert.ifError(python.error); assert.equal(python.status, 0, python.stderr);
  assert.deepEqual(JSON.parse(python.stdout), expected);
});
