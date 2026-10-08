// Public fixture signing only. The optional adapter itself holds no keys.
import fs from 'node:fs';
import { createPrivateKey, sign } from 'node:crypto';
import { canonical } from '../src/bytes.mjs';
import { replay } from '../src/replay.mjs';
import { express } from '../src/expression.mjs';
import { simulateEncounter } from '../adapters/simulated.mjs';

const origin = JSON.parse(fs.readFileSync(new URL('../fixtures/adaptation-v1/origin.json', import.meta.url)));
const seeds = ['9d61b19deffd5a60ba844af492ec2cc44449c5697b326919703bac031cae7f60', '4ccd089b28ff96da9db6c346ec114e0f5b8a319f35aba624da8cf6ed4fb8a6fb'];
function signed(kind, body, index = 0) {
  const key = createPrivateKey({ key: Buffer.concat([Buffer.from('302e020100300506032b657004220420', 'hex'), Buffer.from(seeds[index], 'hex')]), format: 'der', type: 'pkcs8' });
  return { body, signature: sign(null, Buffer.concat([Buffer.from(`genesis-organism/synthetic-v1/${kind}-proof\0`), canonical(body)]), key).toString('hex') };
}
function encounter(events, b, n, t) {
  const state = replay(origin, events).state;
  const body = { v: 'b1', b, h: state.head, n, t };
  const packet = { ...body, sig: signed('body', body, b === 'a' ? 0 : 1).signature };
  const observer = { version: 'observer-v1', observerType: 'simulated-body', subject: `sim-${b}`, capabilities: { spatial: { supported: true, evidence: 'claimed', frame: 'fixture-plane-v1', unit: 'mm' } } };
  const policy = { version: 'policy-v1', allow: ['path-v1'], disclosure: 'public-synthetic' };
  const evidence = { version: 'evidence-v1', nonce: `body-${b}-${n}`, sourceState: state, observer, policy, expression: express(state, observer, policy), interaction: { motif: t, message: canonical(packet).toString('utf8') } };
  const proposal = signed('event', { profile: 'synthetic-v1', organism: state.organism, sequence: state.sequence + 1, previous: state.head, kind: 'experience-v1', data: { evidence } });
  return { packet, proposal };
}
const options = { connected: true, actuation: true, requireAttestation: false };
const firstInput = encounter([], 'a', 1, 2);
const first = simulateEncounter(origin, [], firstInput.packet, firstInput.proposal, options);
const retry = simulateEncounter(origin, first.events, firstInput.packet, firstInput.proposal, options);
const replacementInput = encounter(first.events, 'b', 1, 3);
const replacement = simulateEncounter(origin, first.events, replacementInput.packet, replacementInput.proposal, options);
const reconnectInput = encounter(replacement.events, 'a', 2, 1);
const reconnect = simulateEncounter(origin, replacement.events, reconnectInput.packet, reconnectInput.proposal, options);
const view = result => ({ status: result.status, state: result.state, action: result.action, evidenceLevel: result.evidenceLevel });
process.stdout.write(`${JSON.stringify({ status: 'synthetic simulation only; GENESIS #0001 UNBORN', first: view(first), retry: view(retry), replacement: view(replacement), reconnect: view(reconnect), origin, events: reconnect.events }, null, 2)}\n`);
