import { canonical, digest, isKey, verifyProof, requireThat } from './bytes.mjs';
import { closed } from './perception.mjs';
import { validateOrigin } from './admission.mjs';
import { verifiedHistory } from './replay.mjs';

export function validateChild(packet, resolve) {
  canonical(packet); closed(packet, ['body', 'consents', 'origin']);
  requireThat(typeof resolve === 'function', 'invalid', 'parent resolver');
  const body = packet.body;
  closed(body, ['version', 'nonce', 'parents', 'authority', 'creator', 'rules', 'signal']);
  requireThat(body.version === 'reproduction-v1' && body.rules === 'adaptation-v1', 'unsupported', 'reproduction version/rules');
  requireThat(typeof body.nonce === 'string' && /^[a-z0-9-]{1,64}$/.test(body.nonce), 'invalid', 'reproduction nonce');
  requireThat(isKey(body.authority), 'invalid', 'child authority');
  requireThat(typeof body.creator === 'string' && Buffer.byteLength(body.creator) > 0 && Buffer.byteLength(body.creator) <= 256, 'invalid', 'creator claim');
  requireThat(Number.isSafeInteger(body.signal) && body.signal >= 0 && body.signal <= 255, 'invalid', 'inherited signal');
  requireThat(Array.isArray(body.parents) && body.parents.length >= 1 && body.parents.length <= 4, 'invalid', 'parent budget');
  requireThat(Array.isArray(packet.consents) && packet.consents.length === body.parents.length, 'invalid', 'parent consent count');
  for (let index = 0; index < body.parents.length; index++) {
    const ref = body.parents[index], consent = packet.consents[index];
    closed(ref, ['organism', 'stateRef']); closed(consent, ['organism', 'signature']);
    requireThat(isKey(ref.organism) && isKey(ref.stateRef), 'invalid', 'parent reference');
    requireThat(index === 0 || body.parents[index - 1].organism < ref.organism, 'invalid', 'sorted unique parents');
    requireThat(consent.organism === ref.organism, 'invalid', 'consent order');
  }
  const parents = body.parents.map((ref, index) => {
    const record = resolve(ref.organism);
    requireThat(record !== null && record !== undefined, 'unavailable', 'parent evidence unavailable');
    closed(record, ['origin', 'events', 'lineage']);
    const { states } = verifiedHistory(record.origin, record.events);
    requireThat(states[0].organism === ref.organism, 'invalid', 'resolved parent identity');
    const state = states.find(value => digest('state', value) === ref.stateRef);
    requireThat(state, 'invalid', 'selected parent state');
    requireThat(state.rules === 'adaptation-v1', 'unsupported', 'parent inheritance rules');
    requireThat(verifyProof('reproduction', body, packet.consents[index].signature, state.authority), 'invalid', 'parent consent proof');
    return state;
  });
  requireThat(body.signal === Math.floor(parents.reduce((sum, state) => sum + state.signal, 0) / parents.length), 'invalid', 'inherited signal mismatch');
  const expected = { profile: 'synthetic-v1', rules: body.rules, birth: `child-${digest('reproduction', body)}`, authority: body.authority, creator: body.creator, genome: { signal: body.signal } };
  requireThat(canonical(packet.origin.body).equals(canonical(expected)), 'invalid', 'child origin binding');
  const state = validateOrigin(packet.origin);
  requireThat(parents.every(parent => parent.organism !== state.organism), 'invalid', 'child equals parent');
  return { organism: state.organism, parents, signal: body.signal };
}
