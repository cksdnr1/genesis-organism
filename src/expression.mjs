import { canonical, requireThat } from './bytes.mjs';
import { negotiate } from './perception.mjs';

export function express(state, observer, policy) {
  requireThat(Number.isInteger(state.signal) && state.signal >= 0 && state.signal <= 255, 'invalid', 'signal trait');
  const result = negotiate(state, observer, policy);
  requireThat(result.status === 'selected', result.status === 'denied' ? 'unauthorized' : 'unsupported', 'no permitted expression');
  const kind = result.selection.profile;
  const signal = state.signal;
  let output;
  if (kind === 'text-v1') output = { kind, signal, text: `signal:${signal}` };
  else if (kind === 'symbols-v1') output = { kind, signal, symbols: [signal, 255 - signal] };
  else output = { kind, signal, frame: 'fixture-plane-v1', unit: 'mm', points: [[0, 0], [signal, 0]] };
  return { selection: result.selection, output };
}
export function verifyExpression(state, observer, policy, expression) {
  try { return canonical(express(state, observer, policy)).equals(canonical(expression)); }
  catch { return false; }
}
