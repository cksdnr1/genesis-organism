import { canonical, digest, requireThat } from './bytes.mjs';
import { closed } from './perception.mjs';
import { verifyExpression } from './expression.mjs';

export function validateEvidence(evidence, states) {
  canonical(evidence);
  closed(evidence, ['version', 'nonce', 'sourceState', 'observer', 'policy', 'expression', 'interaction']);
  requireThat(evidence.version === 'evidence-v1', 'unsupported', 'evidence version');
  requireThat(typeof evidence.nonce === 'string' && /^[a-z0-9-]{1,128}$/.test(evidence.nonce), 'invalid', 'encounter nonce');
  const source = canonical(evidence.sourceState);
  requireThat(states.some(state => canonical(state).equals(source)), 'invalid', 'unverified source state');
  requireThat(verifyExpression(evidence.sourceState, evidence.observer, evidence.policy, evidence.expression), 'invalid', 'expression/policy fidelity');
  closed(evidence.interaction, ['motif', 'message']);
  requireThat(Number.isInteger(evidence.interaction.motif) && !Object.is(evidence.interaction.motif, -0) && evidence.interaction.motif >= 0 && evidence.interaction.motif <= 3, 'invalid', 'interaction motif');
  requireThat(typeof evidence.interaction.message === 'string' && Buffer.byteLength(evidence.interaction.message) <= 256, 'invalid', 'retained message bytes');
  return digest('encounter', evidence);
}
export const encounterKey = evidence => JSON.stringify([evidence.sourceState.organism, evidence.observer.subject, evidence.nonce]);
