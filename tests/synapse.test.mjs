import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { synapseFor } from '../src/synapse.mjs';
import { memoryFor } from '../src/memory.mjs';

test('directional synapse derives admitted evidence; suppression never bypasses verification', () => {
  const origin = JSON.parse(fs.readFileSync('fixtures/encounter-v1/origin.json'));
  const event = JSON.parse(fs.readFileSync('fixtures/encounter-v1/000001.json'));
  const subject = event.body.data.evidence.observer.subject;
  const before = structuredClone({ origin, event });
  const expected = { ...memoryFor(origin, [event], subject), scope: 'directional-claim', partnerConsent: 'unverified' };
  assert.deepEqual(synapseFor(origin, [event], subject), expected);
  assert.deepEqual(synapseFor(origin, [event], subject, { permitted: true }), expected);
  assert.equal(synapseFor(origin, [], subject), null); // pending/refused input is not history
  assert.equal(synapseFor(origin, [event], 'another'), null);
  assert.equal(synapseFor(origin, [event], subject, { permitted: false }), null);
  for (const options of [{}, { permitted: 1 }, { permitted: true, consent: true }, null]) {
    assert.throws(() => synapseFor(origin, [event], subject, options));
  }
  for (const events of [[event, event], [{ ...event, signature: '0'.repeat(128) }]]) {
    assert.throws(() => synapseFor(origin, events, subject, { permitted: false }));
    assert.throws(() => synapseFor(origin, events, subject));
  }
  assert.deepEqual({ origin, event }, before);
});
