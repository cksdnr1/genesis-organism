import { canonical, digest, requireThat } from './bytes.mjs';
import { replay } from './replay.mjs';
import { closed, validateObserver } from './perception.mjs';
import { memoryFor } from './memory.mjs';
import { synapseFor } from './synapse.mjs';

const profiles = ['relationship-text-v1', 'relationship-symbols-v1', 'relationship-path-v1'];
const capabilities = ['text', 'symbols', 'spatial'];

export function relatedExpression(origin, events, observer, policy, options = { mode: 'normal' }) {
  const { state } = replay(origin, events);
  validateObserver(observer);
  canonical(options); closed(options, ['mode']);
  requireThat(['normal', 'no-memory-control'].includes(options.mode), 'unsupported', 'expression mode');
  canonical(policy); closed(policy, ['version', 'allow', 'disclosure', 'relationships']);
  requireThat(policy.version === 'policy-related-v1', 'unsupported', 'related policy version');
  requireThat(policy.disclosure === 'public-synthetic', 'unauthorized', 'disclosure scope');
  requireThat(typeof policy.relationships === 'boolean', 'invalid', 'relationship permission');
  requireThat(Array.isArray(policy.allow) && policy.allow.length <= 3 && new Set(policy.allow).size === policy.allow.length, 'invalid', 'allowed profiles');
  requireThat(policy.allow.every(name => profiles.includes(name)), 'unsupported', 'related profile');
  const supported = profiles.filter((name, index) => observer.capabilities[capabilities[index]]?.supported === true);
  requireThat(supported.length > 0, 'unsupported', 'no supported expression');
  const kind = supported.find(name => policy.allow.includes(name));
  requireThat(kind, 'unauthorized', 'no permitted expression');
  const effective = options.mode === 'normal' && policy.relationships;
  const memory = effective ? memoryFor(origin, events, observer.subject) : null;
  const synapse = effective ? synapseFor(origin, events, observer.subject) : null;
  const procedure = options.mode === 'normal' ? 'relationship-expression-v1' : 'control-no-memory-v1';
  const signal = state.signal;
  const base = [signal, (signal + 64) % 256, (signal + 128) % 256, 255 - signal];
  const offset = synapse?.motif ?? 0;
  const grammar = [...base.slice(offset), ...base.slice(0, offset)];
  const presentation = kind === profiles[0] ? `grammar:${grammar.join(',')}`
    : kind === profiles[1] ? [...grammar]
      : { frame: 'fixture-plane-v1', unit: 'mm', points: grammar.map((token, index) => [token, index]) };
  const output = { kind, signal, grammar, presentation };
  return {
    procedure,
    sourceStateRef: digest('state', state),
    observerProfileCommitment: digest('observer', observer),
    accessPolicyCommitment: digest('policy', policy),
    memorySource: memory?.eventRef ?? null,
    expressionInputCommitment: digest('expression-input', { procedure, state, observer, policy, memory, synapse }),
    expressionOutputDigest: digest('expression-output', output),
    output,
  };
}
