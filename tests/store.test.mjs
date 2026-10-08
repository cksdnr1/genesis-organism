import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { canonical } from '../src/bytes.mjs';
import { initialize, load, append } from '../src/store.mjs';
import { fixture, history, signed } from './helpers.mjs';

function workspace(context) {
  const parent = fs.mkdtempSync(path.join(os.tmpdir(), 'genesis-store-'));
  context.after(() => fs.rmSync(parent, { recursive: true, force: true }));
  return { parent, directory: path.join(parent, 'history') };
}
test('durable initialize, append, restart, verified duplicate and orphan temp', context => {
  const { directory } = workspace(context);
  initialize(directory, canonical(fixture('origin.json')));
  assert.throws(() => initialize(directory, canonical(fixture('origin.json'))));
  for (const event of history()) assert.equal(append(directory, canonical(event)).status, 'accepted');
  const expected = fixture('expected.json');
  assert.deepEqual(load(directory), { state: expected.state, commitment: expected.commitment });
  assert.equal(append(directory, canonical(history()[0])).status, 'duplicate');
  fs.writeFileSync(path.join(directory, '.pending-interrupted'), 'bad partial bytes');
  assert.equal(load(directory).state.sequence, 3);
  const bad = history()[0]; bad.signature = '0'.repeat(128);
  assert.throws(() => append(directory, canonical(bad)));
  assert.equal(load(directory).state.sequence, 3);
});
test('missing, partial, oversized, symlink and invalid conflict files fail closed', context => {
  const { parent } = workspace(context);
  for (const scenario of ['gap', 'partial', 'oversize', 'symlink', 'conflict']) {
    const directory = path.join(parent, scenario);
    initialize(directory, canonical(fixture('origin.json')));
    const target = path.join(directory, '000001.json');
    if (scenario === 'gap') fs.writeFileSync(path.join(directory, '000002.json'), canonical(history()[1]));
    if (scenario === 'partial') fs.writeFileSync(target, '{');
    if (scenario === 'oversize') fs.writeFileSync(target, Buffer.alloc(65537));
    if (scenario === 'symlink') fs.symlinkSync(path.join(directory, 'origin.json'), target);
    if (scenario === 'conflict') fs.writeFileSync(path.join(directory, 'conflict-fake.json'), canonical(history()[0]));
    assert.throws(() => load(directory));
  }
});
test('valid signed sibling persists evidence and holds load/admission', context => {
  const { directory } = workspace(context);
  initialize(directory, canonical(fixture('origin.json')));
  const first = history()[0];
  append(directory, canonical(first));
  const sibling = signed('event', { ...first.body, data: { value: 99 } });
  assert.throws(() => append(directory, canonical(sibling)), { code: 'conflict' });
  assert.equal(fs.readdirSync(directory).filter(name => name.startsWith('conflict-')).length, 1);
  assert.deepEqual(JSON.parse(fs.readFileSync(path.join(directory, '000001.json'))), first);
  assert.throws(() => load(directory), { code: 'conflict' });
  assert.throws(() => append(directory, canonical(first)), { code: 'conflict' });
});
test('fsync failure reports IO uncertainty and verified retry recovers', context => {
  const { directory } = workspace(context);
  initialize(directory, canonical(fixture('origin.json')));
  const original = fs.fsyncSync;
  const mocked = context.mock.method(fs, 'fsyncSync', descriptor => {
    if (fs.fstatSync(descriptor).isDirectory()) throw Object.assign(Error('fault'), { code: 'EIO' });
    return original(descriptor);
  });
  assert.throws(() => append(directory, canonical(history()[0])), { code: 'io' });
  mocked.mock.restore();
  assert.equal(append(directory, canonical(history()[0])).status, 'duplicate');
});
async function writer(directory, candidate) {
  const moduleUrl = new URL('../src/store.mjs', import.meta.url).href;
  const script = `import {append} from ${JSON.stringify(moduleUrl)}; try { console.log(JSON.stringify(append(process.argv[1],Buffer.from(process.argv[2],'hex')))); } catch(error) { console.log(JSON.stringify({error:error.code})); }`;
  const child = spawn(process.execPath, ['--input-type=module', '-e', script, directory, canonical(candidate).toString('hex')]);
  let output = ''; child.stdout.on('data', data => output += data);
  return new Promise((resolve, reject) => { child.on('error', reject); child.on('close', code => code === 0 ? resolve(JSON.parse(output)) : reject(Error('writer failed'))); });
}
test('real concurrent writers deduplicate or retain conflict without overwrite', async context => {
  const { parent } = workspace(context);
  const first = history()[0];
  const duplicateDirectory = path.join(parent, 'duplicates');
  initialize(duplicateDirectory, canonical(fixture('origin.json')));
  const outcomes = await Promise.all([writer(duplicateDirectory, first), writer(duplicateDirectory, first)]);
  assert.deepEqual(outcomes.map(outcome => outcome.status).sort(), ['accepted', 'duplicate']);
  assert.equal(load(duplicateDirectory).state.sequence, 1);
  const conflictDirectory = path.join(parent, 'conflicts');
  initialize(conflictDirectory, canonical(fixture('origin.json')));
  const sibling = signed('event', { ...first.body, data: { value: 98 } });
  const conflicts = await Promise.all([writer(conflictDirectory, first), writer(conflictDirectory, sibling)]);
  assert.ok(conflicts.some(outcome => outcome.error === 'conflict'));
  assert.throws(() => load(conflictDirectory), { code: 'conflict' });
  assert.equal(fs.readdirSync(conflictDirectory).filter(name => /^\d{6}\.json$/.test(name)).length, 1);
});
