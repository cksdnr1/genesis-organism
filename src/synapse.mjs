import { canonical, requireThat } from './bytes.mjs';
import { closed } from './perception.mjs';
import { memoryFor } from './memory.mjs';

export function synapseFor(origin, events, subject, options = { permitted: true }) {
  canonical(options);
  closed(options, ['permitted']);
  requireThat(typeof options.permitted === 'boolean', 'invalid', 'relationship permission');
  const memory = memoryFor(origin, events, subject);
  if (!options.permitted || memory === null) return null;
  return { ...memory, scope: 'directional-claim', partnerConsent: 'unverified' };
}
