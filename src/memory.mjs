import { digest, requireThat } from './bytes.mjs';
import { verifiedHistory } from './replay.mjs';

export function memoryFor(origin, events, subject) {
  requireThat(typeof subject === 'string' && /^[a-z0-9-]{1,64}$/.test(subject), 'invalid', 'fixture subject');
  verifiedHistory(origin, events);
  const event = events.findLast(event => event.body.kind === 'experience-v1' && event.body.data.evidence.observer.subject === subject);
  if (!event) return null;
  const evidence = event.body.data.evidence;
  return { subject, motif: evidence.interaction.motif, encounterId: digest('encounter', evidence), eventRef: digest('event', event.body) };
}
