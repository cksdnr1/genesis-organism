import { canonical, digest, ProtocolError, requireThat } from './bytes.mjs';
import { classify, validateOrigin } from './admission.mjs';

export function verifiedHistory(origin, events) {
  requireThat(Array.isArray(events), 'invalid', 'ordered events required');
  requireThat(events.length <= 512, 'limit', 'history event budget');
  let bytes = canonical(origin).length;
  for (const event of events) bytes += canonical(event).length;
  requireThat(bytes <= 4 * 1024 * 1024, 'limit', 'history byte budget');
  const states = [validateOrigin(origin)];
  const accepted = [];
  for (const event of events) {
    const outcome = classify(states, accepted, event);
    if (outcome.status !== 'accepted') throw new ProtocolError(outcome.status === 'conflict' ? 'conflict' : outcome.code || 'invalid', outcome.reason || 'duplicate in canonical history');
    const previous = states.at(-1);
    const next = { ...previous, sequence: event.body.sequence, head: outcome.reference };
    if (event.body.kind === 'signal-v1') next.signal = event.body.data.value;
    else next.authority = event.body.data.authority;
    states.push(next);
    accepted.push(event);
  }
  return { states, events: accepted };
}

export function replay(origin, events, options = {}) {
  requireThat(options !== null && typeof options === 'object' && !Array.isArray(options), 'invalid', 'replay options');
  requireThat(Object.keys(options).every(key => key === 'expectedHead'), 'unsupported', 'unsupported replay option');
  const { states } = verifiedHistory(origin, events);
  const state = states.at(-1);
  if (Object.hasOwn(options, 'expectedHead')) requireThat(options.expectedHead === state.head, 'invalid', 'expected head mismatch');
  return { state, commitment: digest('state', state) };
}
