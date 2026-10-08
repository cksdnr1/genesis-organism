import test from 'node:test';
import assert from 'node:assert/strict';
import { replay } from '../src/replay.mjs';
import { fixture, history, signed } from './helpers.mjs';

test('fixed replay known-answer, immutable inputs, repeat and every valid prefix', () => {
  const origin = fixture('origin.json');
  const events = history();
  const before = structuredClone({ origin, events });
  const expected = fixture('expected.json');
  assert.deepEqual(replay(origin, events), { state: expected.state, commitment: expected.commitment });
  assert.deepEqual(replay(origin, events), replay(origin, events, { expectedHead: expected.state.head }));
  for (let length = 0; length <= 3; length++) assert.equal(replay(origin, events.slice(0, length)).state.sequence, length);
  assert.deepEqual({ origin, events }, before);
});

test('replay rejects invalid history without a partial success or option fallback', () => {
  const origin = fixture('origin.json');
  const events = history();
  const corrupt = structuredClone(events); corrupt[2].body.data.value = 99;
  const sibling = signed('event', { ...events[0].body, data: { value: 99 } });
  for (const invalid of [[events[0], events[0]], [events[1]], [events[0], sibling], corrupt]) assert.throws(() => replay(origin, invalid));
  assert.throws(() => replay(origin, events, { expectedHead: origin.body.authority }));
  assert.throws(() => replay(origin, events, { checkpoint: {} }), { code: 'unsupported' });
  assert.throws(() => replay(origin, Array(513).fill(events[0])), { code: 'limit' });
  assert.throws(() => replay(origin, null));
  const unsupported = structuredClone(origin); unsupported.body.rules = 'other';
  assert.throws(() => replay(unsupported, []), { code: 'unsupported' });
});
