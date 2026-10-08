import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { canonical, parseCanonical } from '../src/bytes.mjs';
import { validateOrigin } from '../src/admission.mjs';
import { initialize, append, load } from '../src/store.mjs';
import { fixture, history, signed } from './helpers.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
function python(...argumentsList) { return spawnSync(path.join(root, '.venv/bin/python'), [path.join(root, 'verifier/verify.py'), ...argumentsList], { encoding: 'utf8' }); }
test('independently authored verifier matches exact state, hash and every prefix', context => {
  const parent = fs.mkdtempSync(path.join(os.tmpdir(), 'genesis-conformance-'));
  context.after(() => fs.rmSync(parent, { recursive: true, force: true }));
  const directory = path.join(parent, 'history');
  initialize(directory, canonical(fixture('origin.json')));
  for (let sequence = 0; sequence <= 3; sequence++) {
    if (sequence) append(directory, canonical(history()[sequence - 1]));
    const result = python(directory);
    assert.equal(result.status, 0, result.stderr);
    assert.deepEqual(JSON.parse(result.stdout), load(directory));
  }
  const expected = fixture('expected.json');
  assert.equal(python(directory, expected.state.head).status, 0);
  assert.equal(python(directory, '0'.repeat(64)).status, 1);
});
test('cross-language literal byte corpus and strict Unicode/number parsing', () => {
  const corpus = fixture('bytes.json');
  for (const vector of corpus.valid) {
    const result = python('--bytes', Buffer.from(vector.utf8).toString('hex'));
    assert.equal(result.status, 0, result.stderr);
    assert.equal(JSON.parse(result.stdout).utf8, vector.utf8);
    assert.equal(canonical(parseCanonical(Buffer.from(vector.utf8))).toString(), vector.utf8);
  }
  for (const hex of corpus.invalidHex) {
    assert.equal(python('--bytes', hex).status, 1, hex);
    assert.throws(() => parseCanonical(Buffer.from(hex, 'hex')));
  }
});
test('cross-language rejection of altered/unsupported/gapped/symlink/fork histories', context => {
  const parent = fs.mkdtempSync(path.join(os.tmpdir(), 'genesis-negative-'));
  context.after(() => fs.rmSync(parent, { recursive: true, force: true }));
  const origin = fixture('origin.json');
  const first = history()[0];
  const sibling = signed('event', { ...first.body, data: { value: 80 } });
  for (const scenario of ['proof', 'unsupported', 'gap', 'symlink', 'fork', 'fake-fork', 'noncanonical', 'oversize', 'birth-newline']) {
    const directory = path.join(parent, scenario);
    initialize(directory, canonical(origin));
    append(directory, canonical(first));
    const target = path.join(directory, '000001.json');
    if (scenario === 'proof') fs.writeFileSync(target, canonical({ ...first, signature: '0'.repeat(128) }));
    if (scenario === 'unsupported') fs.writeFileSync(target, canonical(signed('event', { ...first.body, profile: 'unknown' })));
    if (scenario === 'gap') fs.renameSync(target, path.join(directory, '000002.json'));
    if (scenario === 'symlink') { fs.unlinkSync(target); fs.symlinkSync(path.join(directory, 'origin.json'), target); }
    if (scenario === 'fork') { try { append(directory, canonical(sibling)); } catch {} }
    if (scenario === 'fake-fork') fs.writeFileSync(path.join(directory, 'conflict-bad.json'), canonical(first));
    if (scenario === 'noncanonical') fs.appendFileSync(target, '\n');
    if (scenario === 'oversize') fs.writeFileSync(target, Buffer.alloc(65537));
    if (scenario === 'birth-newline') fs.writeFileSync(path.join(directory, 'origin.json'), canonical(signed('origin', { ...origin.body, birth: origin.body.birth + '\n' })));
    assert.equal(python(directory).status, 1, scenario);
    assert.throws(() => load(directory), scenario);
  }
});
test('strict encodings reject trailing newline, even under otherwise valid signatures', () => {
  const origin = fixture('origin.json');
  for (const update of [{ birth: origin.body.birth + '\n' }, { authority: origin.body.authority + '\n' }]) {
    assert.throws(() => validateOrigin(signed('origin', { ...origin.body, ...update })));
  }
  assert.throws(() => validateOrigin({ ...origin, signature: origin.signature + '\n' }));
});
