import { canonical, digest, isKey, isSignature, verifyProof, requireThat, ProtocolError } from './bytes.mjs';
import { validateEvidence, encounterKey } from './encounter.mjs';
const exact = (v, names) => {
  requireThat(v !== null && typeof v === 'object' && !Array.isArray(v), 'invalid', 'object required');
  requireThat(Object.keys(v).sort().join(',') === [...names].sort().join(','), 'invalid', 'closed shape');
};
const integer = (v, lo, hi) => Number.isSafeInteger(v) && !Object.is(v,-0) && v >= lo && v <= hi;
function envelope(e) {
  canonical(e); exact(e,['body','signature']);
  requireThat(isSignature(e.signature), 'invalid', 'signature encoding');
}
export function validateOrigin(origin) {
  envelope(origin); const b = origin.body;
  exact(b,['profile','rules','birth','creator','authority','genome']);
  requireThat(b.profile === 'synthetic-v1' && ['core-v1', 'encounter-v1'].includes(b.rules), 'unsupported', 'profile or rules');
  requireThat(typeof b.birth === 'string' && /^[a-z0-9-]{1,128}$/.test(b.birth), 'invalid', 'birth discriminator');
  requireThat(typeof b.creator === 'string' && Buffer.byteLength(b.creator) > 0 && Buffer.byteLength(b.creator) <= 256, 'invalid', 'creator claim');
  requireThat(isKey(b.authority), 'invalid', 'authority encoding');
  exact(b.genome,['signal']); requireThat(integer(b.genome.signal,0,255),'invalid','genome signal');
  requireThat(verifyProof('origin',b,origin.signature,b.authority),'invalid','origin proof');
  const organism=digest('origin',b);
  return {profile:b.profile,rules:b.rules,organism,authority:b.authority,sequence:0,head:organism,signal:b.genome.signal};
}
export function validateEventShape(candidate) {
  envelope(candidate); const b=candidate.body;
  exact(b,['profile','organism','sequence','previous','kind','data']);
  requireThat(b.profile === 'synthetic-v1','unsupported','profile');
  requireThat(isKey(b.organism) && isKey(b.previous),'invalid','reference encoding');
  requireThat(integer(b.sequence,1,1000000),'invalid','sequence');
  if (b.kind === 'signal-v1') {
    exact(b.data,['value']); requireThat(integer(b.data.value,0,255),'invalid','signal');
  } else if (b.kind === 'rotate-v1') {
    exact(b.data,['authority']); requireThat(isKey(b.data.authority),'invalid','authority encoding');
  } else if (b.kind === 'experience-v1') {
    exact(b.data,['evidence']);
  } else throw new ProtocolError('unsupported','event kind');
}

// Internal API: states/events must come from verified replay, never an external state cache.
export function classify(states, events, candidate) {
  try {
    validateEventShape(candidate); const b=candidate.body;
    requireThat(states.length > 0 && states.length === events.length+1,'invalid','verified context required');
    requireThat(b.organism === states[0].organism,'invalid','wrong organism');
    const parent=states.find(s => s.head === b.previous);
    requireThat(parent,'invalid','unknown-parent');
    requireThat(b.sequence === parent.sequence+1,'invalid','sequence mismatch');
    requireThat(verifyProof('event',b,candidate.signature,parent.authority),'invalid','event proof');
    requireThat(b.kind !== 'rotate-v1' || b.data.authority !== parent.authority,'invalid','noop rotation');
    if (b.kind === 'experience-v1') {
      requireThat(parent.rules === 'encounter-v1', 'unsupported', 'experience rules');
      const evidence = b.data.evidence;
      const identity = validateEvidence(evidence, states.slice(0, states.indexOf(parent) + 1));
      const prior = events.find(event => event.body.kind === 'experience-v1' && encounterKey(event.body.data.evidence) === encounterKey(evidence));
      if (prior) {
        requireThat(digest('encounter', prior.body.data.evidence) === identity, 'invalid', 'encounter nonce reuse');
        return { status: 'duplicate', reference: digest('event', prior.body) };
      }
    }
    const reference=digest('event',b);
    if (events.some(e => digest('event',e.body) === reference)) return {status:'duplicate',reference};
    if (parent !== states.at(-1)) return {status:'conflict',reference,reason:'signed divergent successor'};
    return {status:'accepted',reference};
  } catch (error) {
    if (error instanceof ProtocolError) return {status:'rejected',reason:error.message,code:error.code};
    throw error;
  }
}
