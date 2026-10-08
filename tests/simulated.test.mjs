import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { canonical } from '../src/bytes.mjs';
import { simulateEncounter } from '../adapters/simulated.mjs';
import { replay, verifiedHistory } from '../src/replay.mjs';
import { classify } from '../src/admission.mjs';
import { express } from '../src/expression.mjs';
import { signed, seeds } from './helpers.mjs';

const origin = JSON.parse(fs.readFileSync('fixtures/adaptation-v1/origin.json'));
const permitted = { connected: true, actuation: true, requireAttestation: false };
function request(events, b = 'a', n = 1, t = 2) {
  const state = replay(origin, events).state;
  const body = { v: 'b1', b, h: state.head, n, t };
  const packet = { ...body, sig: signed('body', body, b === 'a' ? seeds[0] : seeds[1]).signature };
  const observer = { version: 'observer-v1', observerType: 'simulated-body', subject: `sim-${b}`, capabilities: { spatial: { supported: true, evidence: 'claimed', frame: 'fixture-plane-v1', unit: 'mm' } } };
  const policy = { version: 'policy-v1', allow: ['path-v1'], disclosure: 'public-synthetic' };
  const evidence = { version: 'evidence-v1', nonce: `body-${b}-${n}`, sourceState: state, observer, policy, expression: express(state, observer, policy), interaction: { motif: t, message: canonical(packet).toString('utf8') } };
  const proposal = signed('event', { profile: 'synthetic-v1', organism: state.organism, sequence: state.sequence + 1, previous: state.head, kind: 'experience-v1', data: { evidence } });
  return { packet, proposal };
}

test('bounded simulated encounter survives body replacement and replay without repeat actuation', () => {
  const first = request([]), before = structuredClone(first);
  assert.ok(canonical(first.packet).length <= 256);
  const deniedActuation = simulateEncounter(origin, [], first.packet, first.proposal);
  assert.equal(deniedActuation.action, null);
  const accepted = simulateEncounter(origin, [], first.packet, first.proposal, permitted);
  assert.equal(accepted.state.signal, 2);
  assert.equal(accepted.evidenceLevel, 'signed-synthetic-claim');
  assert.deepEqual(accepted.action, { frame: 'fixture-plane-v1', unit: 'mm', points: [[0, 0], [2, 0]] });
  const retry = simulateEncounter(origin, accepted.events, first.packet, first.proposal, permitted);
  assert.equal(retry.status, 'duplicate'); assert.equal(retry.action, null);
  assert.equal(retry.events.length, 1);
  assert.throws(() => simulateEncounter(origin, accepted.events, first.packet, first.proposal, { ...permitted, connected: false }));
  const replacement = request(accepted.events, 'b', 1, 3);
  const next = simulateEncounter(origin, accepted.events, replacement.packet, replacement.proposal, permitted);
  assert.equal(next.state.organism, accepted.state.organism);
  assert.equal(next.state.signal, 3);
  const reconnect = request(next.events, 'a', 2, 1);
  const third = simulateEncounter(origin, next.events, reconnect.packet, reconnect.proposal, permitted);
  assert.equal(third.state.organism, next.state.organism);
  assert.equal(third.state.sequence, 3);
  assert.deepEqual(first, before);
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'genesis-body-'));
  try {
    fs.writeFileSync(path.join(temporary, 'SYNTHETIC'), 'genesis-organism synthetic-v1\n');
    fs.writeFileSync(path.join(temporary, 'origin.json'), canonical(origin));
    third.events.forEach((event, i) => fs.writeFileSync(path.join(temporary, `${String(i + 1).padStart(6, '0')}.json`), canonical(event)));
    const independent = spawnSync('.venv/bin/python', ['verifier/verify.py', temporary], { encoding: 'utf8' });
    assert.equal(independent.status, 0, independent.stderr);
    assert.deepEqual(JSON.parse(independent.stdout), replay(origin, third.events));
  } finally { fs.rmSync(temporary, { recursive: true }); }
});

test('body claims never grant organism authority, truth, witness or unbounded action', () => {
  const valid = request([]);
  for (const options of [{ ...permitted, requireAttestation: true }, { ...permitted, connected: false }, { ...permitted, extra: true }, { ...permitted, actuation: 1 }]) {
    assert.throws(() => simulateEncounter(origin, [], valid.packet, valid.proposal, options));
  }
  for (const packet of [{ ...valid.packet, sig: '0'.repeat(128) }, { ...valid.packet, b: 'unknown' }, { ...valid.packet, t: 4 }, { ...valid.packet, n: 1025 }]) {
    assert.throws(() => simulateEncounter(origin, [], packet, valid.proposal));
  }
  assert.throws(() => simulateEncounter(origin, [], valid.packet, signed('event', valid.proposal.body, seeds[1])));
  const gap = request([], 'a', 2, 2);
  assert.throws(() => simulateEncounter(origin, [], gap.packet, gap.proposal));
  const first = simulateEncounter(origin, [], valid.packet, valid.proposal);
  const repeatedOrdinal = request(first.events, 'a', 1, 3);
  assert.throws(() => simulateEncounter(origin, first.events, repeatedOrdinal.packet, repeatedOrdinal.proposal));
  const concurrent = request([], 'b', 1, 3);
  simulateEncounter(origin, [], concurrent.packet, concurrent.proposal); // separately valid at same source
  const context = verifiedHistory(origin, first.events);
  assert.equal(classify(context.states, context.events, concurrent.proposal).status, 'conflict');
  assert.throws(() => simulateEncounter(origin, first.events, concurrent.packet, concurrent.proposal), error => error.code === 'conflict');
  // A signed synthetic cue is still just a claim, even if the issuer lies about it.
  assert.equal(first.evidenceLevel, 'signed-synthetic-claim');
});
