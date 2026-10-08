import { canonical, parseCanonical, isKey, verifyProof, requireThat } from '../src/bytes.mjs';
import { closed } from '../src/perception.mjs';
import { verifiedHistory, replay } from '../src/replay.mjs';
import { classify, validateEventShape } from '../src/admission.mjs';
import { express } from '../src/expression.mjs';

const keys = Object.freeze({ a: 'd75a980182b10ab7d54bfed3c964073a0ee172f3daa62325af021a68f707511a', b: '3d4017c3e843895a92b70aa74d1b7ebc9c982ccf2ec4968cc0cd55f12af4660c' });
function packetBody(packet) {
  requireThat(canonical(packet).length <= 256, 'limit', 'retained body packet budget');
  closed(packet, ['v', 'b', 'h', 'n', 't', 'sig']);
  requireThat(packet.v === 'b1' && Object.hasOwn(keys, packet.b), 'unsupported', 'simulated body version/id');
  requireThat(isKey(packet.h) && Number.isSafeInteger(packet.n) && packet.n >= 1 && packet.n <= 1024, 'invalid', 'body head/ordinal');
  requireThat(Number.isSafeInteger(packet.t) && packet.t >= 0 && packet.t <= 3, 'invalid', 'simulated cue range');
  const { sig, ...body } = packet;
  requireThat(verifyProof('body', body, sig, keys[packet.b]), 'invalid', 'body claim proof');
  return body;
}
function requestFor(packet, sourceState) {
  const observer = { version: 'observer-v1', observerType: 'simulated-body', subject: `sim-${packet.b}`, capabilities: { spatial: { supported: true, evidence: 'claimed', frame: 'fixture-plane-v1', unit: 'mm' } } };
  const policy = { version: 'policy-v1', allow: ['path-v1'], disclosure: 'public-synthetic' };
  return { version: 'evidence-v1', nonce: `body-${packet.b}-${packet.n}`, sourceState, observer, policy, expression: express(sourceState, observer, policy), interaction: { motif: packet.t, message: canonical(packet).toString('utf8') } };
}

export function simulateEncounter(origin, events, packet, proposal, options = { connected: true, actuation: false, requireAttestation: false }) {
  const context = verifiedHistory(origin, events), current = context.states.at(-1);
  requireThat(current.rules === 'adaptation-v1', 'unsupported', 'simulator rules');
  packetBody(packet);
  canonical(options); closed(options, ['connected', 'actuation', 'requireAttestation']);
  requireThat(Object.values(options).every(value => typeof value === 'boolean'), 'invalid', 'simulator options');
  requireThat(options.connected, 'unavailable', 'body disconnected');
  requireThat(!options.requireAttestation, 'unavailable', 'hardware/witness attestation unavailable');
  const ordinals = { a: 0, b: 0 };
  for (const event of events) {
    if (event.body.kind !== 'experience-v1') continue;
    const evidence = event.body.data.evidence;
    if (!['sim-a', 'sim-b'].includes(evidence.observer.subject)) continue;
    const retained = parseCanonical(Buffer.from(evidence.interaction.message, 'utf8'));
    packetBody(retained);
    requireThat(evidence.observer.subject === `sim-${retained.b}` && retained.n === ordinals[retained.b] + 1, 'invalid', 'historical body ordinal/subject');
    requireThat(event.body.previous === retained.h && canonical(evidence).equals(canonical(requestFor(retained, evidence.sourceState))), 'invalid', 'historical body claim binding');
    ordinals[retained.b] = retained.n;
  }
  validateEventShape(proposal);
  requireThat(proposal.body.kind === 'experience-v1' && proposal.body.previous === packet.h, 'invalid', 'body proposal kind/head');
  const source = context.states.find(state => state.head === packet.h);
  requireThat(source, 'invalid', 'body source unavailable');
  const evidence = requestFor(packet, source);
  requireThat(canonical(proposal.body.data.evidence).equals(canonical(evidence)), 'invalid', 'body evidence binding');
  const outcome = classify(context.states, context.events, proposal);
  requireThat(['accepted', 'duplicate'].includes(outcome.status), outcome.status === 'conflict' ? 'conflict' : outcome.code || 'invalid', outcome.reason || 'body proposal rejected');
  if (outcome.status === 'accepted') requireThat(packet.n === ordinals[packet.b] + 1 && packet.h === current.head, 'invalid', 'stale body ordinal/head');
  const accepted = structuredClone(outcome.status === 'accepted' ? [...events, proposal] : events);
  const { state } = replay(origin, accepted);
  const expression = express(state, evidence.observer, evidence.policy);
  let action = null;
  if (outcome.status === 'accepted' && options.actuation) {
    const points = expression.output.points;
    requireThat(points.length === 2 && points.every(pair => pair.length === 2 && pair.every(value => Number.isInteger(value) && value >= 0 && value <= 3)), 'invalid', 'simulated action bounds');
    action = { frame: 'fixture-plane-v1', unit: 'mm', points: structuredClone(points) };
  }
  return { status: outcome.status, events: accepted, state, expression, action, evidenceLevel: 'signed-synthetic-claim' };
}
