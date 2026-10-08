import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { memoryFor } from '../src/memory.mjs';
import { replay } from '../src/replay.mjs';
import { digest } from '../src/bytes.mjs';
import { signed } from './helpers.mjs';

test('memory derives only last accepted subject experience with exact provenance', () => {
  const origin = JSON.parse(fs.readFileSync('fixtures/encounter-v1/origin.json'));
  const first = JSON.parse(fs.readFileSync('fixtures/encounter-v1/000001.json'));
  const subject = first.body.data.evidence.observer.subject;
  const before = structuredClone({ origin, first });
  assert.equal(memoryFor(origin, [], subject), null);
  assert.equal(memoryFor(origin, [first], 'other-subject'), null);
  const expected = { subject, motif: 2, encounterId: digest('encounter', first.body.data.evidence), eventRef: digest('event', first.body) };
  assert.deepEqual(memoryFor(origin, [first], subject), expected);
  assert.deepEqual(memoryFor(origin, [first], subject), expected);
  assert.equal(Object.hasOwn(expected, 'message'), false);
  const state = replay(origin, [first]).state;
  const evidence = { ...first.body.data.evidence, nonce: 'correction', interaction: { motif: 3, message: 'synthetic correction' } };
  const second = signed('event', { ...first.body, sequence: 2, previous: state.head, data: { evidence } });
  assert.equal(memoryFor(origin, [first, second], subject).motif, 3);
  assert.equal(memoryFor(origin, [first, second], subject).eventRef, digest('event', second.body));
  assert.throws(() => memoryFor(origin, [first, first], subject));
  assert.throws(() => memoryFor(origin, [{ ...first, signature: '0'.repeat(128) }], subject));
  assert.deepEqual({ origin, first }, before);
});
