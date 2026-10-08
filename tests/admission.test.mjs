import test from 'node:test';
import assert from 'node:assert/strict';
import { canonical, parseCanonical, digest, verifyProof } from '../src/bytes.mjs';
import { validateOrigin, classify } from '../src/admission.mjs';
import { fixture, signed, reference, history, seeds } from './helpers.mjs';

test('literal canonical corpus, numeric keys, Unicode and closed byte domains', () => {
  const corpus = fixture('bytes.json');
  for (const vector of corpus.valid) {
    assert.equal(canonical(vector.value).toString(), vector.utf8);
    assert.deepEqual(parseCanonical(Buffer.from(vector.utf8)), vector.value);
  }
  for (const hex of corpus.invalidHex) assert.throws(() => parseCanonical(Buffer.from(hex, 'hex')));
  assert.throws(() => digest('unassigned', {}));
  assert.equal(canonical({ 2: 2, 10: 10 }).toString(), '{"10":10,"2":2}');
  assert.notEqual(digest('state', 'é'), digest('state', 'e\u0301'));
});

test('producer type, Unicode, depth, node, member and byte budgets', () => {
  for (const value of [-0, NaN, Infinity, 1.5, undefined, new Date(), '\ud800', Array(1)]) assert.throws(() => canonical(value));
  const cycle = {}; cycle.self = cycle; assert.throws(() => canonical(cycle));
  assert.throws(() => canonical({ get value() { throw Error('must not execute'); } }));
  assert.throws(() => canonical('x'.repeat(4097)));
  assert.throws(() => canonical(Array(257).fill(0)));
  assert.throws(() => canonical(Array(256).fill(Array(16).fill(0))));
  assert.throws(() => canonical(Array(32).fill('x'.repeat(4096))));
  assert.throws(() => parseCanonical(Buffer.alloc(65537)));
  let nested = 0;
  for (let depth = 0; depth < 17; depth++) nested = [nested];
  assert.throws(() => canonical(nested));
});

test('origin proof, exact shape and reference match fixed independent fixtures', () => {
  const origin = fixture('origin.json');
  const initial = validateOrigin(origin);
  assert.equal(initial.organism, fixture('expected.json').originId);
  assert.equal(initial.signal, origin.body.genome.signal);
  assert.equal(verifyProof('event', origin.body, origin.signature, origin.body.authority), false);
  for (const update of [{ extra: 1 }, { rules: 'unknown' }, { authority: 'A'.repeat(64) }, { genome: { signal: true } }]) {
    assert.throws(() => validateOrigin(signed('origin', { ...origin.body, ...update })));
  }
  const corrupt = structuredClone(origin); corrupt.signature = '0'.repeat(128);
  assert.throws(() => validateOrigin(corrupt));
});

test('admission distinguishes valid retry, invalid proof, sibling conflict and rotation', () => {
  const origin = fixture('origin.json');
  const events = history();
  const initial = validateOrigin(origin);
  const states = [initial];
  const accepted = [];
  for (const event of events) {
    assert.equal(classify(states, accepted, event).status, 'accepted');
    const parent = states.at(-1);
    states.push({ ...parent, sequence: event.body.sequence, head: reference(event), ...(event.body.kind === 'signal-v1' ? { signal: event.body.data.value } : { authority: event.body.data.authority }) });
    accepted.push(event);
  }
  const before = structuredClone({ states, accepted });
  assert.equal(classify(states, accepted, events[0]).status, 'duplicate');
  const invalidRetry = { ...events[0], signature: '0'.repeat(128) };
  assert.equal(classify(states, accepted, invalidRetry).status, 'rejected');
  const sibling = signed('event', { ...events[0].body, data: { value: 99 } });
  assert.equal(classify(states, accepted, sibling).status, 'conflict');
  const next = { ...events[2].body, sequence: 4, previous: states.at(-1).head };
  assert.equal(classify(states, accepted, signed('event', next)).status, 'rejected');
  assert.equal(classify(states, accepted, signed('event', next, seeds[1])).status, 'accepted');
  for (const update of [{ organism: '0'.repeat(64) }, { previous: '0'.repeat(64) }, { sequence: 8 }, { kind: 'unknown' }, { extra: true }, { data: { value: 256 } }]) {
    assert.equal(classify(states, accepted, signed('event', { ...next, ...update }, seeds[1])).status, 'rejected');
  }
  const noop = signed('event', { ...next, kind: 'rotate-v1', data: { authority: states.at(-1).authority } }, seeds[1]);
  assert.equal(classify(states, accepted, noop).status, 'rejected');
  assert.deepEqual({ states, accepted }, before);
});
