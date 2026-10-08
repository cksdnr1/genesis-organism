// Audit evidence only. Public fixture inputs; no real organism or runtime changes.
// Run from the repository root. Exit 1 means observed diagnostic disagreement.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { canonical } from '../../../../src/bytes.mjs';
import { classify } from '../../../../src/admission.mjs';
import { verifiedHistory } from '../../../../src/replay.mjs';
import { initialize } from '../../../../src/store.mjs';
import { signed } from '../../../../tests/helpers.mjs';

const origin = JSON.parse(fs.readFileSync('fixtures/encounter-v1/origin.json'));
const original = JSON.parse(fs.readFileSync('fixtures/encounter-v1/000001.json'));
const { states } = verifiedHistory(origin, []);
const cases = [
  ['observer-version', e => { e.observer.version = 'future'; }],
  ['unknown-capability', e => { e.observer.capabilities.future = { supported: true, evidence: 'claimed' }; }],
  ['private-disclosure', e => { e.policy.disclosure = 'private'; }],
  ['attested-capability', e => { Object.values(e.observer.capabilities)[0].evidence = 'attested'; }],
  ['empty-policy', e => { e.policy.allow = []; }],
  ['unsupported-policy-profile', e => { e.policy.allow = ['future']; }],
  ['unsupported-policy-version', e => { e.policy.version = 'future'; }],
  ['unsupported-evidence-version', e => { e.version = 'future'; }],
  ['missing-policy', e => { delete e.policy; }],
  ['invalid-message', e => { e.interaction.message = 17; }],
  ['unsupported-frame', e => { e.observer.capabilities.spatial = { supported: true, evidence: 'claimed', frame: 'future', unit: 'mm' }; }],
  ['unauthenticated-source', e => { e.sourceState.signal = (e.sourceState.signal + 1) % 256; }],
];
const parent = fs.mkdtempSync(path.join(os.tmpdir(), 'genesis-postmerge-audit-'));
const results = [];
try {
  for (const [name, mutate] of cases) {
    const body = structuredClone(original.body);
    mutate(body.data.evidence);
    const candidate = signed('event', body);
    const js = classify(states, [], candidate);
    const directory = path.join(parent, name);
    initialize(directory, canonical(origin));
    fs.writeFileSync(path.join(directory, '000001.json'), canonical(candidate));
    const independent = spawnSync('.venv/bin/python', ['verifier/verify.py', directory], { encoding: 'utf8' });
    if (independent.error) throw independent.error;
    const py = JSON.parse(independent.stderr || independent.stdout);
    const rejected = js.status === 'rejected' && independent.status === 1;
    results.push({ name, candidate, jsStatus: js.status, jsCode: js.code,
      pyStatus: independent.status, pyCode: py.error,
      rejected, match: rejected && js.code === py.error });
  }
  console.log(JSON.stringify({ auditedRevision: 'e6d0e6633fd657216549fd64f1031a6d96fd7b87',
    cases: results.length, disagreements: results.filter(item => !item.match).length,
    results }, null, 2));
  if (results.some(item => !item.match)) process.exitCode = 1;
} finally {
  fs.rmSync(parent, { recursive: true });
}
