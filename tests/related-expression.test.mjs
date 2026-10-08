import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { canonical, digest } from '../src/bytes.mjs';
import { relatedExpression } from '../src/related-expression.mjs';
import { replay } from '../src/replay.mjs';
import { initialize, append, load } from '../src/store.mjs';
import { validateEvidence } from '../src/encounter.mjs';
import { memoryFor } from '../src/memory.mjs';
import { synapseFor } from '../src/synapse.mjs';
import { observer, signed } from './helpers.mjs';

const originBytes = fs.readFileSync('fixtures/encounter-v1/origin.json');
const eventBytes = fs.readFileSync('fixtures/encounter-v1/000001.json');
const origin = JSON.parse(originBytes);
const event = JSON.parse(eventBytes);
const subject = event.body.data.evidence.observer.subject;
const policy = () => ({ version: 'policy-related-v1', allow: ['relationship-text-v1', 'relationship-symbols-v1', 'relationship-path-v1'], disclosure: 'public-synthetic', relationships: true });

test('durable encounter causes later grammar change with matched controls and ablation', () => {
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'genesis-causal-'));
  try {
    const treatmentDir = path.join(temporary, 'treatment');
    const rejectedDir = path.join(temporary, 'rejected');
    initialize(treatmentDir, originBytes); initialize(rejectedDir, originBytes);
    assert.equal(append(treatmentDir, eventBytes).status, 'accepted');
    assert.equal(append(treatmentDir, eventBytes).status, 'duplicate');
    assert.throws(() => append(rejectedDir, canonical({ ...event, signature: '0'.repeat(128) })));
    assert.equal(load(rejectedDir).state.sequence, 0);
    assert.equal(load(treatmentDir).state.sequence, 1);
    const retained = [JSON.parse(fs.readFileSync(path.join(treatmentDir, '000001.json')))];
    const snapshot = structuredClone({ origin, event });
    for (const capability of ['text', 'symbols', 'spatial']) {
      const profile = observer(capability, subject), access = policy();
      const baseline = relatedExpression(origin, [], profile, access);
      const result = relatedExpression(origin, retained, profile, access);
      const rejected = relatedExpression(origin, [], profile, access);
      const ablation = relatedExpression(origin, retained, profile, access, { mode: 'no-memory-control' });
      assert.deepEqual(result.output.grammar, [128, 255, 0, 64]);
      assert.deepEqual(baseline.output.grammar, [0, 64, 128, 255]);
      assert.notDeepEqual(result.output.presentation, baseline.output.presentation);
      assert.deepEqual(rejected.output, baseline.output);
      assert.deepEqual(ablation.output, baseline.output);
      assert.equal(ablation.procedure, 'control-no-memory-v1');
      assert.equal(ablation.memorySource, null);
      assert.deepEqual(relatedExpression(origin, retained, profile, access), result);
      assert.equal(result.sourceStateRef, digest('state', load(treatmentDir).state));
      assert.equal(result.memorySource, digest('event', event.body));
      assert.equal(result.accessPolicyCommitment, digest('policy', access));
      assert.equal(result.expressionOutputDigest, digest('expression-output', result.output));
      assert.equal(result.expressionInputCommitment, digest('expression-input', {
        procedure: result.procedure, state: replay(origin, retained).state, observer: profile, policy: access,
        memory: memoryFor(origin, retained, subject), synapse: synapseFor(origin, retained, subject),
      }));
      assert.deepEqual(relatedExpression(origin, retained, profile, { ...access, relationships: false }).output, baseline.output);
      assert.deepEqual(relatedExpression(origin, retained, observer(capability, 'other'), access).output, baseline.output);
      if (capability === 'text') assert.equal(result.output.presentation, 'grammar:128,255,0,64');
      if (capability === 'symbols') assert.deepEqual(result.output.presentation, result.output.grammar);
      if (capability === 'spatial') assert.deepEqual(result.output.presentation, { frame: 'fixture-plane-v1', unit: 'mm', points: [[128, 0], [255, 1], [0, 2], [64, 3]] });
    }
    assert.deepEqual({ origin, event }, snapshot);
  } finally { fs.rmSync(temporary, { recursive: true }); }
});

test('head-only change is not consequence; policies, malformed history and procedure mismatch fail closed', () => {
  const profile = observer('symbols', subject), access = policy();
  const evidence = { ...event.body.data.evidence, nonce: 'motif-zero', interaction: { motif: 0, message: 'synthetic zero control' } };
  const zero = signed('event', { ...event.body, data: { evidence } });
  const baseline = relatedExpression(origin, [], profile, access);
  const result = relatedExpression(origin, [zero], profile, access);
  assert.notEqual(result.sourceStateRef, baseline.sourceStateRef);
  assert.deepEqual(result.output, baseline.output);
  for (const invalidPolicy of [undefined, { ...access, relationships: 1 }, { ...access, extra: true }, { ...access, allow: ['future'] }, { ...access, allow: ['relationship-text-v1', 'relationship-text-v1'] }, { ...access, disclosure: 'private' }, { ...access, version: 'policy-v1' }, { ...access, allow: [] }]) {
    assert.throws(() => relatedExpression(origin, [event], profile, invalidPolicy));
  }
  assert.throws(() => relatedExpression(origin, [event], { ...profile, capabilities: {} }, access));
  assert.throws(() => relatedExpression(origin, [event], profile, access, { mode: 'normal', extra: true }));
  assert.throws(() => relatedExpression(origin, [event], profile, access, { mode: 'future' }));
  for (const history of [undefined, [event, event], [{ ...event, signature: '0'.repeat(128) }]]) {
    assert.throws(() => relatedExpression(origin, history, profile, { ...access, relationships: false }));
  }
  // New read-only grammar is not accepted implicitly by historical evidence-v1.
  assert.throws(() => validateEvidence({ ...evidence, expression: result }, [replay(origin, []).state]));
});
