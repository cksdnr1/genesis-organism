// Isolated public synthetic experiment. This test seed is never real authority.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createPrivateKey, sign } from 'node:crypto';
import { canonical, digest, requireThat } from '../src/bytes.mjs';
import { validateOrigin } from '../src/admission.mjs';
import { replay } from '../src/replay.mjs';
import { express } from '../src/expression.mjs';
import { initialize, append, publishChild } from '../src/store.mjs';
import { verifyLineage } from '../src/lineage.mjs';

const key = createPrivateKey({ key: Buffer.concat([Buffer.from('302e020100300506032b657004220420', 'hex'), Buffer.from('9d61b19deffd5a60ba844af492ec2cc44449c5697b326919703bac031cae7f60', 'hex')]), format: 'der', type: 'pkcs8' });
function signed(kind, body) {
  return { body: structuredClone(body), signature: sign(null, Buffer.concat([Buffer.from(`genesis-organism/synthetic-v1/${kind}-proof\0`), canonical(body)]), key).toString('hex') };
}
function artifact(filename, value) {
  const descriptor = fs.openSync(filename, 'wx', 0o600);
  try { fs.writeFileSync(descriptor, canonical(value)); fs.fsyncSync(descriptor); }
  finally { fs.closeSync(descriptor); }
  const directory = fs.openSync(path.dirname(filename), fs.constants.O_RDONLY);
  try { fs.fsyncSync(directory); } finally { fs.closeSync(directory); }
}

export function runStudy(outputDirectory) {
  const template = JSON.parse(fs.readFileSync(new URL('../fixtures/adaptation-v1/origin.json', import.meta.url)));
  validateOrigin(template);
  const output = path.resolve(outputDirectory);
  const resolved = path.join(fs.realpathSync(path.dirname(output)), path.basename(output));
  const organisms = fileURLToPath(new URL('../organisms', import.meta.url));
  for (const target of [output, resolved]) requireThat(target !== organisms && !target.startsWith(organisms + path.sep), 'unauthorized', 'protected organism output');
  fs.mkdirSync(output, { mode: 0o700 }); // Existing results are never overwritten.
  const report = { version: 'population-study-v1', status: 'completed', target: 2, resourceLimit: 4, deterministic: true, runs: [] };
  const arms = ['selection-no-experience', 'neutral-no-experience', 'selection-with-experience'];
  study: for (const arm of arms) for (let replicate = 0; replicate < 2; replicate++) {
    const number = report.runs.length;
    const working = path.join(output, `.work-run-${number}`);
    fs.mkdirSync(working);
    const records = {}, labels = {};
    const run = { arm, replicate, schedule: replicate === 0 ? [0, 2, 0, 2] : [2, 0, 2, 0], status: 'completed', opportunities: 0, acceptedChildren: [], parentOffspringCounts: { 0: 0, 2: 0 }, initialTraitCounts: { 0: 1, 2: 1 }, offspringTraitCounts: { 0: 0, 2: 0 }, learningEvents: 0, archive: `run-${number}.json`, failure: null };
    try {
      for (const label of [0, 2]) {
        const origin = signed('origin', { ...template.body, birth: `population-parent-${label}-${replicate}`, genome: { signal: label } });
        const state = replay(origin, []).state;
        const directory = path.join(working, `parent-${label}`);
        initialize(directory, canonical(origin));
        const record = { origin, events: [], lineage: null };
        records[state.organism] = record; labels[label] = state.organism;
        if (arm === 'selection-with-experience') {
          const observer = { version: 'observer-v1', observerType: 'synthetic-task', subject: 'task-two', capabilities: { symbols: { supported: true, evidence: 'claimed' } } };
          const policy = { version: 'policy-v1', allow: ['symbols-v1'], disclosure: 'public-synthetic' };
          const evidence = { version: 'evidence-v1', nonce: `training-${label}-${replicate}`, sourceState: state, observer, policy, expression: express(state, observer, policy), interaction: { motif: 2, message: 'PUBLIC SYNTHETIC TASK TARGET 2' } };
          const event = signed('event', { profile: 'synthetic-v1', organism: state.organism, sequence: 1, previous: state.head, kind: 'experience-v1', data: { evidence } });
          append(directory, canonical(event)); record.events.push(event); run.learningEvents++;
        }
      }
      for (const [slot, label] of run.schedule.entries()) {
        run.opportunities++;
        requireThat(run.opportunities <= 4, 'limit', 'reproductive opportunity budget');
        const parent = records[labels[label]], state = replay(parent.origin, parent.events).state;
        if (arm !== 'neutral-no-experience' && state.signal !== 2) continue;
        const body = { version: 'reproduction-v1', nonce: `${arm}-${replicate}-${slot}`, parents: [{ organism: state.organism, stateRef: digest('state', state) }], authority: state.authority, creator: 'PUBLIC SYNTHETIC POPULATION CHILD', rules: 'adaptation-v1', signal: state.signal };
        const origin = signed('origin', { profile: 'synthetic-v1', rules: 'adaptation-v1', birth: `child-${digest('reproduction', body)}`, authority: body.authority, creator: body.creator, genome: { signal: body.signal } });
        const packet = { body, consents: [{ organism: state.organism, signature: signed('reproduction', body).signature }], origin };
        const directory = path.join(working, `child-${slot}`);
        const published = publishChild(directory, packet, id => records[id] ?? null);
        const id = published.lineage.organism;
        const childRecord = { origin, events: [], lineage: packet };
        verifyLineage(id, requested => requested === id ? childRecord : records[requested] ?? null);
        if (!run.acceptedChildren.length) requireThat(publishChild(directory, packet, parentId => records[parentId] ?? null).lineage.organism === id, 'invalid', 'retry identity');
        requireThat(!run.acceptedChildren.includes(id), 'invalid', 'duplicate offspring');
        records[id] = childRecord; run.acceptedChildren.push(id);
        run.parentOffspringCounts[label]++; run.offspringTraitCounts[state.signal]++;
      }
    } catch (error) {
      run.status = 'failed'; run.failure = typeof error.code === 'string' ? error.code : 'invalid'; report.status = 'failed';
    }
    artifact(path.join(output, run.archive), { roots: run.acceptedChildren, records });
    report.runs.push(run);
    if (run.status === 'failed') break study; // Preserve this run's incomplete stores.
    fs.rmSync(working, { recursive: true }); // Own disposable copies, after retained archive fsync.
  }
  artifact(path.join(output, 'report.json'), report);
  return report;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    requireThat(process.argv.length === 3, 'usage', 'node experiments/population.mjs NEW_RESULT_DIRECTORY');
    const report = runStudy(process.argv[2]);
    process.stdout.write(`${JSON.stringify(report)}\n`);
    if (report.status !== 'completed') process.exitCode = 1;
  } catch (error) {
    process.stderr.write(`${JSON.stringify({ error: error.code || 'invalid', message: 'study failed; existing results preserved' })}\n`);
    process.exitCode = 1;
  }
}
