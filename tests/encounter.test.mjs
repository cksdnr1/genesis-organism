import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn, spawnSync } from 'node:child_process';
import { canonical, digest } from '../src/bytes.mjs';
import { validateOrigin, classify } from '../src/admission.mjs';
import { replay, verifiedHistory } from '../src/replay.mjs';
import { initialize, append, load } from '../src/store.mjs';
import { express } from '../src/expression.mjs';
import { receipt } from '../src/receipt.mjs';
import { fixture, signed, observer, policy } from './helpers.mjs';

function encounterFixture(nonce = 'visit-one') {
  const origin = signed('origin', { ...fixture('origin.json').body, rules: 'encounter-v1', birth: 'synthetic-encounter-one' });
  const state = validateOrigin(origin);
  const profile = observer(); const access = policy();
  const evidence = { version: 'evidence-v1', nonce, sourceState: state, observer: profile, policy: access, expression: express(state, profile, access), interaction: { motif: 2, message: 'explicit captured synthetic bytes' } };
  const event = signed('event', { profile: 'synthetic-v1', organism: state.organism, sequence: 1, previous: state.head, kind: 'experience-v1', data: { evidence } });
  return { origin, state, evidence, event };
}
test('encounter evidence is acyclic; actual receipt refs, pending and refusal differ', () => {
  const { origin, evidence, event } = encounterFixture();
  assert.equal(receipt(origin, [], evidence).resultingEventRefs, null);
  assert.deepEqual(receipt(origin, [], evidence, { resolution: 'refused' }).resultingEventRefs, []);
  const accepted = receipt(origin, [event], evidence);
  assert.equal(accepted.status, 'accepted');
  assert.deepEqual(accepted.resultingEventRefs, [digest('event', event.body)]);
  assert.equal(accepted.accessPolicyCommitment, digest('policy', evidence.policy));
  assert.equal(accepted.interactionDigest, digest('interaction', evidence.interaction));
  assert.throws(() => receipt(origin, [], evidence, { resolution: 'accepted', resultingEventRefs: ['forged'] }));
  assert.equal(replay(origin, [event]).state.signal, evidence.sourceState.signal);
});
test('proof-first stable nonce prevents exact/rebased double experience and changed reuse', context => {
  const parent = fs.mkdtempSync(path.join(os.tmpdir(), 'genesis-encounter-'));
  context.after(() => fs.rmSync(parent, { recursive: true, force: true }));
  const directory = path.join(parent, 'history');
  const { origin, evidence, event } = encounterFixture();
  initialize(directory, canonical(origin));
  assert.equal(append(directory, canonical(event)).status, 'accepted');
  assert.equal(append(directory, canonical(event)).status, 'duplicate');
  const current = load(directory).state;
  const rebased = signed('event', { ...event.body, sequence: 2, previous: current.head });
  const retry = append(directory, canonical(rebased));
  assert.equal(retry.status, 'duplicate'); assert.equal(retry.reference, digest('event', event.body));
  assert.equal(load(directory).state.sequence, 1);
  assert.throws(() => append(directory, canonical({ ...rebased, signature: '0'.repeat(128) })));
  const changed = structuredClone(evidence); changed.interaction.motif = 3;
  assert.throws(() => append(directory, canonical(signed('event', { ...rebased.body, data: { evidence: changed } }))));
  const separate = { ...evidence, nonce: 'visit-two' };
  assert.equal(append(directory, canonical(signed('event', { ...rebased.body, data: { evidence: separate } }))).status, 'accepted');
  assert.equal(load(directory).state.sequence, 2);
  const independent = spawnSync('.venv/bin/python', ['verifier/verify.py', directory], { encoding: 'utf8' });
  assert.equal(independent.status, 0, independent.stderr);
  assert.deepEqual(JSON.parse(independent.stdout), load(directory));
});
test('source/policy/expression/missing-message and old-core proposals reject without effect', () => {
  const { origin, evidence, event } = encounterFixture();
  const verified = verifiedHistory(origin, []);
  for (const mutation of ['source', 'policy', 'expression', 'message', 'cycle']) {
    const bad = structuredClone(evidence);
    if (mutation === 'source') bad.sourceState.signal = (bad.sourceState.signal + 1) % 256;
    if (mutation === 'policy') bad.policy.allow = [];
    if (mutation === 'expression') bad.expression.output.text = 'false semantic statement';
    if (mutation === 'message') delete bad.interaction.message;
    if (mutation === 'cycle') bad.resultingEventRefs = [digest('event', event.body)];
    const proposal = signed('event', { ...event.body, data: { evidence: bad } });
    assert.equal(classify(verified.states, [], proposal).status, 'rejected', mutation);
  }
  const coreOrigin = fixture('origin.json'); const coreState = validateOrigin(coreOrigin);
  const coreEvidence = { ...evidence, sourceState: coreState, expression: express(coreState, evidence.observer, evidence.policy) };
  const coreEvent = signed('event', { ...event.body, organism: coreState.organism, previous: coreState.head, data: { evidence: coreEvidence } });
  assert.equal(classify([coreState], [], coreEvent).status, 'rejected');
  assert.equal(replay(origin, []).state.sequence, 0);
});
test('actual concurrent encounter retries admit once; signed separate sibling holds', async context => {
  const parent = fs.mkdtempSync(path.join(os.tmpdir(), 'genesis-encounter-race-'));
  context.after(() => fs.rmSync(parent, { recursive: true, force: true }));
  const directory = path.join(parent, 'history');
  const { origin, evidence, event } = encounterFixture();
  initialize(directory, canonical(origin));
  const input = path.join(parent, 'proposal.json'); fs.writeFileSync(input, canonical(event));
  function writer() {
    const child = spawn(process.execPath, ['src/cli.mjs', 'append', directory, input]);
    let output = ''; child.stdout.on('data', data => output += data);
    return new Promise((resolve, reject) => { child.on('error', reject); child.on('close', code => code === 0 ? resolve(JSON.parse(output)) : reject(Error('encounter writer failed'))); });
  }
  const outcomes = await Promise.all([writer(), writer()]);
  assert.deepEqual(outcomes.map(outcome => outcome.status).sort(), ['accepted', 'duplicate']);
  assert.equal(load(directory).state.sequence, 1);
  const sibling = signed('event', { ...event.body, data: { evidence: { ...evidence, nonce: 'distinct-concurrent-visit' } } });
  assert.throws(() => append(directory, canonical(sibling)), { code: 'conflict' });
  const independent = spawnSync('.venv/bin/python', ['verifier/verify.py', directory], { encoding: 'utf8' });
  assert.equal(independent.status, 1); assert.equal(JSON.parse(independent.stderr).error, 'conflict');
});
test('independent encounter fixture and rejection of a duplicate in stored canonical history', context => {
  const origin = JSON.parse(fs.readFileSync('fixtures/encounter-v1/origin.json'));
  const event = JSON.parse(fs.readFileSync('fixtures/encounter-v1/000001.json'));
  const expected = JSON.parse(fs.readFileSync('fixtures/encounter-v1/expected.json'));
  assert.deepEqual(replay(origin, [event]), expected);
  const parent = fs.mkdtempSync(path.join(os.tmpdir(), 'genesis-encounter-invalid-'));
  context.after(() => fs.rmSync(parent, { recursive: true, force: true }));
  const directory = path.join(parent, 'history'); initialize(directory, canonical(origin)); append(directory, canonical(event));
  const duplicate = signed('event', { ...event.body, sequence: 2, previous: expected.state.head });
  fs.writeFileSync(path.join(directory, '000002.json'), canonical(duplicate));
  assert.throws(() => load(directory));
  assert.equal(spawnSync('.venv/bin/python', ['verifier/verify.py', directory]).status, 1);
});
