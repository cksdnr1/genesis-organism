// Optional audit, not a runtime or ceremony dependency. Run from repository root:
// node docs/features/genesis_organism_latest_closure/check.mjs > checks.json
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { canonical, digest } from '../../../src/bytes.mjs';
import { classify } from '../../../src/admission.mjs';
import { replay, verifiedHistory } from '../../../src/replay.mjs';
import { initialize, append } from '../../../src/store.mjs';
import { fixture, signed } from '../../../tests/helpers.mjs';

const root = fileURLToPath(new URL('../../../', import.meta.url));
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const json = filename => JSON.parse(fs.readFileSync(filename));
function command(binary, args) {
  const result = spawnSync(binary, args, { cwd: root, encoding: 'utf8' });
  if (result.error) throw result.error;
  assert.equal(result.signal, null, `${binary} terminated by signal`);
  return result;
}
function git(...args) {
  const result = command('git', args);
  assert.equal(result.status, 0, result.stderr);
  return result.stdout.trim();
}
function python(directory) {
  return command(path.join(root, '.venv/bin/python'), ['verifier/verify.py', directory]);
}
function inventory(directory) {
  return fs.readdirSync(directory).sort().map(name => {
    const file = path.join(directory, name);
    assert(fs.lstatSync(file).isFile(), 'unexpected nonregular store member');
    return [name, fs.readFileSync(file).toString('hex')];
  });
}

assert.equal(fs.realpathSync(process.cwd()), fs.realpathSync(root), 'run from repository root');
const sourcePaths = ['src', 'verifier', 'fixtures', 'tests/helpers.mjs', 'package.json',
  'requirements-verifier.txt', 'ORIGIN.md', 'spec', 'schemas', 'docs/decisions',
  'organisms/genesis-0001/README.md',
  'docs/features/genesis_organism/genesis_organism_total_spec.md',
  'docs/features/genesis_organism/genesis_organism_phase_plan.md'];
assert.equal(git('diff', '--name-only', 'HEAD', '--', ...sourcePaths), '', 'dirty audited source; refuse HEAD provenance');
assert.equal(git('ls-files', '--others', '--exclude-standard', '--', ...sourcePaths), '', 'untracked audited source');
const revision = git('rev-parse', 'HEAD');
const historical = 'docs/features/genesis_organism/post-merge-audit/diagnostic-results.json';
assert.equal(sha(fs.readFileSync(historical)), '2cf962da12fb957922fd9f2330e2f33368b3d0eeea86f1e49dae2bd0454dadf2');
const origin = json('fixtures/encounter-v1/origin.json');
const original = json('fixtures/encounter-v1/000001.json');
const { states } = verifiedHistory(origin, []);
const retained = json(historical).results.map(({ name, candidate }) => ({ name, candidate,
  expected: name === 'unsupported-evidence-version' ? 'unsupported' : 'invalid' }));
assert.equal(retained.length, 12);
const mutations = [
  ['observer-null', e => { e.observer = null; }],
  ['observer-array', e => { e.observer = []; }],
  ['missing-subject', e => { delete e.observer.subject; }],
  ['null-subject', e => { e.observer.subject = null; }],
  ['capabilities-null', e => { e.observer.capabilities = null; }],
  ['capabilities-array', e => { e.observer.capabilities = []; }],
  ['descriptor-null', e => { Object.keys(e.observer.capabilities).forEach(k => { e.observer.capabilities[k] = null; }); }],
  ['descriptor-boolean', e => { Object.keys(e.observer.capabilities).forEach(k => { e.observer.capabilities[k] = true; }); }],
  ['policy-null', e => { e.policy = null; }],
  ['policy-array', e => { e.policy = []; }],
  ['allow-null', e => { e.policy.allow = null; }],
  ['allow-duplicate', e => { e.policy.allow = ['text-v1', 'text-v1']; }],
  ['expression-null', e => { e.expression = null; }],
  ['expression-output-substitution', e => { e.expression.output = { kind: 'text-v1', signal: 99, text: 'signal:99' }; }],
  ['interaction-null', e => { e.interaction = null; }],
  ['interaction-array', e => { e.interaction = []; }],
  ['motif-negative', e => { e.interaction.motif = -1; }],
  ['motif-boolean', e => { e.interaction.motif = true; }],
  ['message-null', e => { e.interaction.message = null; }],
  ['message-byte-overflow', e => { e.interaction.message = '😀'.repeat(65); }],
  ['nonce-null', e => { e.nonce = null; }],
  ['nonce-empty', e => { e.nonce = ''; }],
  ['nonce-newline', e => { e.nonce = 'retry\n'; }],
  ['source-null', e => { e.sourceState = null; }],
];
const candidates = retained.concat(mutations.map(([name, mutate]) => {
  const body = structuredClone(original.body);
  mutate(body.data.evidence);
  return { name, candidate: signed('event', body), expected: 'invalid' };
}));
assert.equal(candidates.length, 36);
assert.equal(new Set(candidates.map(item => item.name)).size, 36);
const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'genesis-closure-audit-'));
try {
  const results = candidates.map(({ name, candidate, expected }) => {
    const outcome = classify(states, [], candidate);
    assert.equal(outcome.status, 'rejected', name);
    assert.equal(outcome.code, expected, name);
    const store = path.join(temporary, name + '-store');
    initialize(store, canonical(origin));
    const before = inventory(store);
    assert.throws(() => append(store, canonical(candidate)), { code: expected }, name);
    assert.deepEqual(inventory(store), before, name + ' changed store bytes');
    const independent = path.join(temporary, name + '-verifier');
    initialize(independent, canonical(origin));
    fs.writeFileSync(path.join(independent, '000001.json'), canonical(candidate));
    const checked = python(independent);
    assert.equal(checked.status, 1, name + ': ' + checked.stderr);
    assert.equal(JSON.parse(checked.stderr).error, expected, name);
    return { name, expected, candidate, jsStatus: outcome.status, jsCode: outcome.code,
      appendRejectedWithoutMutation: true, pyStatus: checked.status, pyCode: expected };
  });
  const coreOrigin = fixture('origin.json');
  const initial = replay(coreOrigin, []).state;
  const events = [];
  let previous = initial.head;
  for (let sequence = 1; sequence <= 513; sequence++) {
    const event = signed('event', { profile: 'synthetic-v1', organism: initial.organism,
      sequence, previous, kind: 'signal-v1', data: { value: sequence % 256 } });
    previous = digest('event', event.body);
    events.push(event);
  }
  const beforeReplay = JSON.stringify({ coreOrigin, events });
  const accepted = replay(coreOrigin, events.slice(0, 512));
  const history = path.join(temporary, 'history-limit');
  initialize(history, canonical(coreOrigin));
  events.slice(0, 512).forEach((event, index) => {
    fs.writeFileSync(path.join(history, `${String(index + 1).padStart(6, '0')}.json`), canonical(event));
  });
  const checked = python(history);
  assert.equal(checked.status, 0, checked.stderr);
  assert.deepEqual(JSON.parse(checked.stdout), accepted);
  assert.throws(() => replay(coreOrigin, events), { code: 'limit' });
  fs.writeFileSync(path.join(history, '000513.json'), canonical(events[512]));
  const refused = python(history);
  assert.equal(refused.status, 1, refused.stderr);
  assert.equal(JSON.parse(refused.stderr).error, 'limit');
  assert.equal(JSON.stringify({ coreOrigin, events }), beforeReplay, 'replay mutated inputs');
  console.log(JSON.stringify({ testedImplementationRevision: revision,
    probeSha256: sha(fs.readFileSync(fileURLToPath(import.meta.url))),
    sourceCorpusRevision: 'e6d0e6633fd657216549fd64f1031a6d96fd7b87',
    scope: 'finite synthetic audit; no actual birth or unrestricted conformance',
    negativeCases: results.length, results,
    history512: { result: accepted, jsPythonExactMatch: true },
    history513: { jsCode: 'limit', pyCode: 'limit' },
    historyInputSha256: sha(Buffer.from(beforeReplay)) }, null, 2));
} finally {
  fs.rmSync(temporary, { recursive: true });
}
