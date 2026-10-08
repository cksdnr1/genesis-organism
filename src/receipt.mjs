import { digest, requireThat } from './bytes.mjs';
import { closed } from './perception.mjs';
import { verifiedHistory } from './replay.mjs';
import { validateEvidence } from './encounter.mjs';

export function receipt(origin, events, evidence, options = { resolution: 'pending' }) {
  closed(options, ['resolution']);
  requireThat(['pending', 'refused'].includes(options.resolution), 'invalid', 'receipt resolution');
  const { states } = verifiedHistory(origin, events);
  const encounterId = validateEvidence(evidence, states);
  const accepted = events.find(event => event.body.kind === 'experience-v1' && digest('encounter', event.body.data.evidence) === encounterId);
  const status = accepted ? 'accepted' : options.resolution;
  return { encounterId, status, organismStateRef: digest('state', evidence.sourceState), observerProfileCommitment: digest('observer', evidence.observer), accessPolicyCommitment: digest('policy', evidence.policy), negotiationProtocolVersion: 'negotiation-v1', expressionProcedureRef: 'expression-v1', expressionInputCommitment: digest('expression-input', { state: evidence.sourceState, observer: evidence.observer, policy: evidence.policy, selection: evidence.expression.selection }), expressionOutputDigest: digest('expression-output', evidence.expression.output), interactionDigest: digest('interaction', evidence.interaction), resultingEventRefs: accepted ? [digest('event', accepted.body)] : status === 'pending' ? null : [] };
}
