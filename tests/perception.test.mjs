import test from 'node:test';
import assert from 'node:assert/strict';
import { negotiate, validateObserver, validatePolicy, profiles } from '../src/perception.mjs';
import { validateOrigin } from '../src/admission.mjs';
import { fixture, observer, policy } from './helpers.mjs';
test('three mocks, fixed priority, policy order and non-mutating negotiation', () => {
  const state = validateOrigin(fixture('origin.json'));
  for (const [index, capability] of ['text', 'symbols', 'spatial'].entries()) assert.equal(negotiate(state, observer(capability), policy()).selection.profile, ['text-v1', 'symbols-v1', 'path-v1'][index]);
  assert.throws(() => profiles.reverse());
  const input = observer(); input.capabilities.symbols = { supported: true, evidence: 'claimed' };
  const before = structuredClone(input);
  assert.equal(negotiate(state, input, { ...policy(), allow: [...profiles].reverse() }).selection.profile, 'text-v1');
  assert.deepEqual(input, before);
  assert.deepEqual(negotiate(state, { ...input, capabilities: {} }, policy()), { status: 'unsupported' });
  assert.deepEqual(negotiate(state, { ...observer(), capabilities: { text: { supported: false, evidence: 'claimed' } } }, policy()), { status: 'unsupported' });
  assert.deepEqual(negotiate(state, input, { ...policy(), allow: [] }), { status: 'denied' });
});
test('unsupported/legacy/attestation/frame/units/private/bounds fail closed', () => {
  for (const input of [{ ...observer(), version: 'unknown' }, { ...observer(), schemaVersion: '0.1-experimental' }, { ...observer(), capabilities: { vision: true } }, { ...observer(), capabilities: { text: { supported: true, evidence: 'attested' } } }, { ...observer(), observerType: 'x'.repeat(129) }]) assert.throws(() => validateObserver(input));
  for (const field of ['frame', 'unit']) {
    const input = observer('spatial'); input.capabilities.spatial[field] = 'unknown'; assert.throws(() => validateObserver(input));
  }
  assert.throws(() => validatePolicy({ ...policy(), disclosure: 'private' }), { code: 'unauthorized' });
  assert.throws(() => validatePolicy({ ...policy(), allow: ['text-v1', 'text-v1'] }));
  assert.throws(() => validatePolicy({ ...policy(), allow: ['unknown'] }));
});
