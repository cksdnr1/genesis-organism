import test from 'node:test';
import assert from 'node:assert/strict';
import { express, verifyExpression } from '../src/expression.mjs';
import { validateOrigin } from '../src/admission.mjs';
import { digest } from '../src/bytes.mjs';
import { fixture, observer, policy } from './helpers.mjs';

test('three faithful views bind one state and repeat without mutation', () => {
  const state = validateOrigin(fixture('origin.json'));
  const before = structuredClone(state);
  for (const capability of ['text', 'symbols', 'spatial']) {
    const profile = observer(capability);
    const expression = express(state, profile, policy());
    assert.equal(expression.selection.sourceStateRef, digest('state', state));
    assert.equal(verifyExpression(state, profile, policy(), expression), true);
    assert.deepEqual(express(state, profile, policy()), expression);
    if (capability === 'text') assert.equal(expression.output.text, `signal:${state.signal}`);
    if (capability === 'symbols') assert.equal(expression.output.symbols[0] + expression.output.symbols[1], 255);
    if (capability === 'spatial') assert.deepEqual(expression.output.points, [[0, 0], [state.signal, 0]]);
    const wrong = structuredClone(expression); wrong.output.signal = (state.signal + 1) % 256;
    assert.equal(typeof digest('expression-output', wrong.output), 'string');
    assert.equal(verifyExpression(state, profile, policy(), wrong), false);
    assert.equal(verifyExpression({ ...state, signal: (state.signal + 1) % 256 }, profile, policy(), expression), false);
    assert.equal(verifyExpression(state, { ...profile, subject: 'substituted' }, policy(), expression), false);
    assert.equal(verifyExpression(state, profile, { ...policy(), allow: [...policy().allow].reverse() }, expression), false);
    const forged = structuredClone(expression); forged.selection.procedure = 'unknown';
    assert.equal(verifyExpression(state, profile, policy(), forged), false);
  }
  assert.deepEqual(state, before);
  assert.throws(() => express(state, observer(), { ...policy(), allow: [] }), { code: 'unauthorized' });
  assert.throws(() => express(state, { ...observer(), capabilities: {} }, policy()), { code: 'unsupported' });
});
