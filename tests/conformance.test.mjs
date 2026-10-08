import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { canonical, parseCanonical } from '../src/bytes.mjs';
import { validateOrigin, classify } from '../src/admission.mjs';
import { verifiedHistory } from '../src/replay.mjs';
import { negotiate } from '../src/perception.mjs';
import { express } from '../src/expression.mjs';
import { initialize, append, load } from '../src/store.mjs';
import { fixture, history, signed, observer, policy } from './helpers.mjs';

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

test('signed negative encounter corpus matches explicit independent diagnostic classes', context => {
  const parent = fs.mkdtempSync(path.join(os.tmpdir(), 'genesis-diagnostic-'));
  context.after(() => fs.rmSync(parent, { recursive: true }));
  const origin = JSON.parse(fs.readFileSync('fixtures/encounter-v1/origin.json'));
  const original = JSON.parse(fs.readFileSync('fixtures/encounter-v1/000001.json'));
  const { states } = verifiedHistory(origin, []);
  const cases = [
    ['evidence-version', 'unsupported', body => { body.data.evidence.version = 'future'; }],
    ['policy-version', 'invalid', body => { body.data.evidence.policy.version = 'future'; }],
    ['frame', 'invalid', body => { body.data.evidence.observer.capabilities.spatial = { supported: true, evidence: 'claimed', frame: 'future', unit: 'mm' }; }],
    ['event-profile', 'unsupported', body => { body.profile = 'future'; }],
    ['event-kind', 'unsupported', body => { body.kind = 'future'; }],
    ['bad-proof', 'invalid', () => {}],
    ['unknown-parent', 'invalid', body => { body.previous = '0'.repeat(64); }],
  ];
  for (const [name, expected, mutate] of cases) {
    const body = structuredClone(original.body); mutate(body);
    const candidate = signed('event', body);
    if (name === 'bad-proof') candidate.signature = '0'.repeat(128);
    const result = classify(states, [], candidate);
    assert.equal(result.status, 'rejected', name);
    assert.equal(result.code, expected, name);
    const directory = path.join(parent, name);
    initialize(directory, canonical(origin));
    fs.writeFileSync(path.join(directory, '000001.json'), canonical(candidate));
    const independent = python(directory);
    assert.equal(independent.status, 1, name);
    assert.equal(JSON.parse(independent.stderr).error, expected, name);
  }
});

test('retained PM-01 negatives have literal envelope codes and no admission effects', context => {
  const parent = fs.mkdtempSync(path.join(os.tmpdir(), 'genesis-pm01-'));
  context.after(() => fs.rmSync(parent, { recursive: true }));
  const origin = JSON.parse(fs.readFileSync('fixtures/encounter-v1/origin.json'));
  const corpus = JSON.parse(fs.readFileSync('docs/features/genesis_organism/post-merge-audit/diagnostic-results.json'));
  const expected = {
    'observer-version': 'invalid', 'unknown-capability': 'invalid',
    'private-disclosure': 'invalid', 'attested-capability': 'invalid',
    'empty-policy': 'invalid', 'unsupported-policy-profile': 'invalid',
    'unsupported-policy-version': 'invalid', 'unsupported-evidence-version': 'unsupported',
    'missing-policy': 'invalid', 'invalid-message': 'invalid',
    'unsupported-frame': 'invalid', 'unauthenticated-source': 'invalid',
  };
  assert.deepEqual(corpus.results.map(item => item.name).sort(), Object.keys(expected).sort());
  const { states } = verifiedHistory(origin, []);
  const inventory = directory => fs.readdirSync(directory).sort().map(name => [name, fs.readFileSync(path.join(directory, name)).toString('hex')]);
  for (const { name, candidate } of corpus.results) {
    const outcome = classify(states, [], candidate);
    assert.equal(outcome.status, 'rejected', name);
    assert.equal(outcome.code, expected[name], name);
    const directory = path.join(parent, name);
    initialize(directory, canonical(origin));
    const before = inventory(directory);
    assert.throws(() => append(directory, canonical(candidate)), error => error.code === expected[name], name);
    assert.deepEqual(inventory(directory), before, name);
    // Inject solely into this owned verifier fixture, after no-write assertion.
    fs.writeFileSync(path.join(directory, '000001.json'), canonical(candidate));
    const independent = python(directory);
    assert.equal(independent.status, 1, name);
    assert.equal(JSON.parse(independent.stderr).error, expected[name], name);
  }
  const state = states[0];
  assert.throws(() => negotiate(state, { ...observer(), version: 'future' }, policy()), error => error.code === 'unsupported');
  assert.throws(() => negotiate(state, { ...observer(), capabilities: { future: { supported: true, evidence: 'claimed' } } }, policy()), error => error.code === 'unsupported');
  assert.throws(() => express(state, observer(), { ...policy(), disclosure: 'private' }), error => error.code === 'unauthorized');
});

test('compound origin and event faults follow reviewed structural dispatch precedence', context => {
  const parent = fs.mkdtempSync(path.join(os.tmpdir(), 'genesis-compound-'));
  context.after(() => fs.rmSync(parent, { recursive: true, force: true }));
  const origin = fixture('origin.json'), original = history()[0];
  const { states } = verifiedHistory(origin, []);
  const inventory = directory => fs.readdirSync(directory).sort().map(name => [name, fs.readFileSync(path.join(directory, name)).toString('hex')]);
  const node = (...args) => spawnSync(process.execPath, [path.join(root, 'src/cli.mjs'), ...args], { encoding: 'utf8', timeout: 3000 });
  function rejected(result, expected, name) {
    assert.ifError(result.error); assert.equal(result.status, 1, name); assert.equal(result.stdout, '', name);
    assert.equal(JSON.parse(result.stderr).error, expected, name);
  }
  const events = [
    ['wrong-organism-unknown-kind', 'unsupported', b => { b.organism = '0'.repeat(64); b.kind = 'future'; }],
    ['unknown-profile-malformed-signature', 'invalid', b => { b.profile = 'future'; }, 'broken'],
    ['triple-fault', 'invalid', b => { b.organism = '0'.repeat(64); b.kind = 'future'; }, 'broken'],
    ['malformed-reference-unknown-kind', 'invalid', b => { b.organism = 'broken'; b.kind = 'future'; }],
    ['invalid-sequence-unknown-kind', 'invalid', b => { b.sequence = 0; b.kind = 'future'; }],
    ['unknown-profile-malformed-reference', 'unsupported', b => { b.profile = 'future'; b.previous = 'broken'; }],
    ['unknown-kind-bad-proof', 'unsupported', b => { b.kind = 'future'; }, '0'.repeat(128)],
    ['known-kind-bad-proof', 'invalid', () => {}, '0'.repeat(128)],
  ];
  for (const [name, expected, mutate, signature] of events) {
    const body = structuredClone(original.body); mutate(body); const candidate = signed('event', body);
    if (signature !== undefined) candidate.signature = signature;
    const outcome = classify(states, [], candidate);
    assert.equal(outcome.status, 'rejected', name); assert.equal(outcome.code, expected, name);
    const directory = path.join(parent, name); initialize(directory, canonical(origin)); const before = inventory(directory);
    assert.throws(() => append(directory, canonical(candidate)), error => error.code === expected, name);
    assert.deepEqual(inventory(directory), before, name);
    const source = path.join(parent, name + '.json'); fs.writeFileSync(source, canonical(candidate));
    rejected(node('append', directory, source), expected, name); assert.deepEqual(inventory(directory), before, name);
    // Deliberate verifier injection is only into this owned fixture after no-write controls.
    fs.writeFileSync(path.join(directory, '000001.json'), canonical(candidate)); const injected = inventory(directory);
    for (const result of [node('inspect', directory), node('replay', directory), python(directory)]) rejected(result, expected, name);
    assert.deepEqual(inventory(directory), injected, name);
  }
  const origins = [
    ['origin-profile-malformed-signature', 'invalid', b => { b.profile = 'future'; }, 'broken'],
    ['origin-rules-malformed-signature', 'invalid', b => { b.rules = 'future'; }, 'broken'],
    ['origin-profile-bad-proof', 'unsupported', b => { b.profile = 'future'; }, '0'.repeat(128)],
    ['origin-profile-bad-genome', 'unsupported', b => { b.profile = 'future'; b.genome = null; }],
  ];
  for (const [name, expected, mutate, signature] of origins) {
    const body = structuredClone(origin.body); mutate(body); const candidate = signed('origin', body);
    if (signature !== undefined) candidate.signature = signature;
    assert.throws(() => validateOrigin(candidate), error => error.code === expected, name);
    const source = path.join(parent, name + '.json'); fs.writeFileSync(source, canonical(candidate));
    const uncreated = path.join(parent, name + '-uncreated'); rejected(node('init-fixture', uncreated, source), expected, name);
    assert.equal(fs.existsSync(uncreated), false, name);
    const directory = path.join(parent, name); fs.mkdirSync(directory);
    fs.writeFileSync(path.join(directory, 'SYNTHETIC'), 'genesis-organism synthetic-v1\n'); fs.writeFileSync(path.join(directory, 'origin.json'), canonical(candidate));
    const before = inventory(directory);
    for (const result of [node('replay', directory), python(directory)]) rejected(result, expected, name);
    assert.deepEqual(inventory(directory), before, name);
  }
  const valid = path.join(parent, 'valid');
  assert.equal(node('init-fixture', valid, path.join(root, 'fixtures/core-v1/origin.json')).status, 0);
  assert.deepEqual(JSON.parse(python(valid).stdout), load(valid));
  assert.equal(node('append', valid, path.join(root, 'fixtures/core-v1/000001.json')).status, 0);
  assert.deepEqual(JSON.parse(python(valid).stdout), load(valid));
  const duplicateWithBadProof = { ...original, signature: '0'.repeat(128) }, before = inventory(valid);
  assert.throws(() => append(valid, canonical(duplicateWithBadProof)), error => error.code === 'invalid');
  assert.deepEqual(inventory(valid), before, 'duplicate-looking invalid proof has no effect');
});
