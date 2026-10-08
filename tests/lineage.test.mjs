import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { canonical, digest } from '../src/bytes.mjs';
import { verifyLineage } from '../src/lineage.mjs';
import { replay } from '../src/replay.mjs';
import { signed } from './helpers.mjs';

const fixture = JSON.parse(fs.readFileSync('fixtures/reproduction-v1/manifest.json'));
function python(manifest) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'genesis-lineage-'));
  try {
    const filename = path.join(directory, 'manifest.json');
    fs.writeFileSync(filename, canonical(manifest));
    return spawnSync('.venv/bin/python', ['verifier/lineage.py', filename], { encoding: 'utf8' });
  } finally { fs.rmSync(directory, { recursive: true }); }
}
const run = manifest => verifyLineage(manifest.root, id => manifest.records[id] ?? null);

test('independent full ancestry equals selected graph, rebuilds and preserves evidence', () => {
  const before = structuredClone(fixture);
  const result = run(fixture);
  const child = fixture.records[fixture.root].lineage.body.parents[0].organism;
  const refs = fixture.records[child].lineage.body.parents;
  const expected = { root: fixture.root, nodes: [fixture.root, child, ...refs.map(ref => ref.organism)].sort(), edges: [
    { child: fixture.root, ...fixture.records[fixture.root].lineage.body.parents[0] },
    ...refs.map(ref => ({ child, ...ref })),
  ].map(({ child, organism, stateRef }) => ({ child, parent: organism, stateRef })).sort((a, b) => a.child < b.child ? -1 : a.child > b.child ? 1 : a.parent < b.parent ? -1 : 1) };
  assert.equal(expected.nodes.length, 4); assert.equal(expected.edges.length, 3);
  assert.deepEqual(result, expected);
  const independent = python(fixture);
  assert.equal(independent.status, 0, independent.stderr);
  assert.deepEqual(JSON.parse(independent.stdout), expected);
  assert.deepEqual(run(fixture), result);
  assert.deepEqual(fixture, before);
});

test('missing/private/altered ancestry and recursive aliases fail in both implementations', () => {
  const childId = fixture.records[fixture.root].lineage.body.parents[0].organism;
  const ancestorId = fixture.records[childId].lineage.body.parents[0].organism;
  const mutations = [
    m => { delete m.records[ancestorId]; },
    m => { m.records[ancestorId] = null; },
    m => { m.records[childId].lineage = null; },
    m => { m.records[childId].lineage.consents[0].signature = '0'.repeat(128); },
    m => { m.records[childId].lineage.body.parents[0].stateRef = '0'.repeat(64); },
    m => { m.records[childId].lineage.body.parents[1] = m.records[childId].lineage.body.parents[0]; },
    m => { m.records[childId].lineage.body.version = 'future'; },
    m => { m.records[ancestorId] = m.records[m.root]; }, // malicious recursive alias
    m => { m.records[ancestorId].lineage = m.records[childId].lineage; },
    m => { m.records[m.root].origin = m.records[childId].origin; },
  ];
  for (const mutate of mutations) {
    const manifest = structuredClone(fixture); mutate(manifest);
    assert.throws(() => run(manifest));
    assert.notEqual(python(manifest).status, 0);
  }
});

test('signed long ancestry is bounded, not a recursion escape', () => {
  const records = {};
  const original = Object.values(fixture.records).find(record => record.lineage === null).origin;
  let origin = signed('origin', { ...original.body, birth: 'depth-root' });
  let root = digest('origin', origin.body);
  records[root] = { origin, events: [], lineage: null };
  for (let depth = 1; depth <= 17; depth++) {
    const state = replay(origin, []).state;
    const body = { version: 'reproduction-v1', nonce: `depth-${depth}`, parents: [{ organism: root, stateRef: digest('state', state) }], authority: state.authority, creator: original.body.creator, rules: 'adaptation-v1', signal: state.signal };
    origin = signed('origin', { ...original.body, birth: `child-${digest('reproduction', body)}`, genome: { signal: state.signal } });
    const packet = { body, consents: [{ organism: root, signature: signed('reproduction', body).signature }], origin };
    root = digest('origin', origin.body);
    records[root] = { origin, events: [], lineage: packet };
    if (depth === 16) assert.equal(run({ root, records }).nodes.length, 17);
  }
  assert.throws(() => run({ root, records }), error => error.code === 'limit');
  assert.notEqual(python({ root, records }).status, 0);
});

test('broad authenticated ancestry enforces node budgets in both verification surfaces', () => {
  const records = {};
  const template = Object.values(fixture.records).find(record => record.lineage === null).origin.body;
  let counter = 0;
  function make(parents = []) {
    const nonce = `width-${counter++}`;
    let body = { ...template, birth: nonce }, packet = null;
    if (parents.length) {
      const refs = parents.sort().map(id => ({ organism: id, stateRef: digest('state', replay(records[id].origin, []).state) }));
      const proposal = { version: 'reproduction-v1', nonce, parents: refs, authority: template.authority, creator: template.creator, rules: 'adaptation-v1', signal: template.genome.signal };
      body = { ...body, birth: `child-${digest('reproduction', proposal)}` };
      const origin = signed('origin', body);
      packet = { body: proposal, consents: refs.map(ref => ({ organism: ref.organism, signature: signed('reproduction', proposal).signature })), origin };
    }
    const origin = packet?.origin ?? signed('origin', body);
    const id = digest('origin', body);
    records[id] = { origin, events: [], lineage: packet };
    return id;
  }
  let level = Array.from({ length: 32 }, () => make());
  while (level.length > 1) {
    const next = [];
    for (let i = 0; i < level.length; i += 4) next.push(make(level.slice(i, i + 4)));
    level = next;
  }
  const manifest = { root: level[0], records };
  assert.throws(() => run(manifest), error => error.code === 'limit');
  assert.notEqual(python(manifest).status, 0);
});
