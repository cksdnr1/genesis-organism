import { canonical, digest, requireThat } from './bytes.mjs';

export const profiles = Object.freeze(['text-v1', 'symbols-v1', 'path-v1']);
const capabilities = Object.freeze(['text', 'symbols', 'spatial']);
export function closed(value, names) {
  requireThat(value !== null && typeof value === 'object' && !Array.isArray(value), 'invalid', 'closed object required');
  const keys = Object.keys(value).sort();
  requireThat(keys.length === names.length && keys.every((key, index) => key === [...names].sort()[index]), 'invalid', 'closed shape');
}
export function validateObserver(observer) {
  canonical(observer);
  closed(observer, ['version', 'observerType', 'subject', 'capabilities']);
  requireThat(observer.version === 'observer-v1', 'unsupported', 'observer version');
  requireThat(typeof observer.observerType === 'string' && Buffer.byteLength(observer.observerType) > 0 && Buffer.byteLength(observer.observerType) <= 128, 'invalid', 'observer type');
  requireThat(typeof observer.subject === 'string' && /^[a-z0-9-]{1,64}$/.test(observer.subject), 'invalid', 'fixture subject');
  const claims = observer.capabilities;
  requireThat(claims !== null && typeof claims === 'object' && !Array.isArray(claims), 'invalid', 'capability map');
  for (const name of Object.keys(claims)) {
    requireThat(capabilities.includes(name), 'unsupported', 'capability kind');
    const claim = claims[name];
    closed(claim, name === 'spatial' ? ['supported', 'evidence', 'frame', 'unit'] : ['supported', 'evidence']);
    requireThat(typeof claim.supported === 'boolean', 'invalid', 'support claim');
    requireThat(claim.evidence === 'claimed', 'unsupported', 'capability evidence');
    if (name === 'spatial') requireThat(claim.frame === 'fixture-plane-v1' && claim.unit === 'mm', 'unsupported', 'fixture frame/unit');
  }
  return observer;
}
export function validatePolicy(policy) {
  canonical(policy);
  closed(policy, ['version', 'allow', 'disclosure']);
  requireThat(policy.version === 'policy-v1', 'unsupported', 'policy version');
  requireThat(policy.disclosure === 'public-synthetic', 'unauthorized', 'disclosure scope');
  requireThat(Array.isArray(policy.allow) && policy.allow.length <= 3 && new Set(policy.allow).size === policy.allow.length, 'invalid', 'allowed profiles');
  requireThat(policy.allow.every(profile => profiles.includes(profile)), 'unsupported', 'expression profile');
  return policy;
}
export function negotiate(state, observer, policy) {
  canonical(state);
  validateObserver(observer); validatePolicy(policy);
  const supported = profiles.filter((profile, index) => observer.capabilities[capabilities[index]]?.supported === true);
  if (!supported.length) return { status: 'unsupported' };
  const profile = supported.find(profile => policy.allow.includes(profile));
  if (!profile) return { status: 'denied' };
  return { status: 'selected', selection: { version: 'negotiation-v1', sourceStateRef: digest('state', state), observerProfileCommitment: digest('observer', observer), accessPolicyCommitment: digest('policy', policy), profile, procedure: 'expression-v1' } };
}
