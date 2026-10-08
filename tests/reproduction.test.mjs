import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { canonical, digest } from '../src/bytes.mjs';
import { validateChild } from '../src/reproduction.mjs';
import { replay } from '../src/replay.mjs';
import { publishChild, loadChild, initialize, load } from '../src/store.mjs';
import { signed, seeds } from './helpers.mjs';

const manifest = JSON.parse(fs.readFileSync('fixtures/reproduction-v1/manifest.json'));
const resolve = id => manifest.records[id] ?? null;
const grandchild = manifest.records[manifest.root].lineage;
const child = resolve(grandchild.body.parents[0].organism).lineage;

test('authenticated one/two/four-parent inheritance yields new children and unchanged parents', () => {
  const before = structuredClone(manifest);
  assert.equal(validateChild(child, resolve).signal, 1);
  assert.equal(validateChild(child, resolve).parents.length, 2);
  assert.equal(validateChild(grandchild, resolve).parents.length, 1);
  const records = {};
  const template = Object.values(manifest.records)[0].origin.body;
  for (let signal = 0; signal < 4; signal++) {
    const origin = signed('origin', { ...template, birth: `four-parent-${signal}`, genome: { signal } });
    const state = replay(origin, []).state;
    records[state.organism] = { origin, events: [], lineage: null };
  }
  const parents = Object.keys(records).sort().map(id => ({ organism: id, stateRef: digest('state', replay(records[id].origin, []).state) }));
  const body = { ...child.body, nonce: 'four-parent-child', parents, signal: 1 };
  const consents = parents.map(ref => ({ organism: ref.organism, signature: signed('reproduction', body).signature }));
  const origin = signed('origin', { ...child.origin.body, birth: `child-${digest('reproduction', body)}` });
  assert.equal(validateChild({ body, consents, origin }, id => records[id]).parents.length, 4);
  assert.deepEqual(manifest, before);
});

test('child validation rejects forged participation, ordering, state/identity and absent evidence', () => {
  const changes = [
    packet => packet.body.parents.reverse(),
    packet => { packet.body.parents[1] = packet.body.parents[0]; },
    packet => { packet.consents[0].signature = '0'.repeat(128); },
    packet => { packet.consents.pop(); },
    packet => { packet.body.parents[0].stateRef = '0'.repeat(64); },
    packet => { packet.body.signal = 255; },
    packet => { packet.origin = signed('origin', { ...packet.origin.body, birth: 'unbound-child' }); },
    packet => { packet.body.version = 'future'; },
    packet => { packet.body.extra = true; },
  ];
  for (const change of changes) {
    const packet = structuredClone(child); change(packet);
    assert.throws(() => validateChild(packet, resolve));
  }
  assert.throws(() => validateChild(child, () => null), error => error.code === 'unavailable');
  assert.throws(() => validateChild(child, () => manifest.records[manifest.root]));
  const unauthorized = structuredClone(child);
  unauthorized.consents[0].signature = signed('reproduction', child.body, seeds[1]).signature;
  assert.throws(() => validateChild(unauthorized, resolve));
});

test('durable identical child retry and partial publication preserve evidence without counting incomplete offspring', () => {
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'genesis-child-'));
  try {
    const directory = path.join(temporary, 'child');
    const result = publishChild(directory, child, resolve);
    assert.equal(result.lineage.signal, 1);
    assert.equal(result.history.state.sequence, 0);
    assert.deepEqual(publishChild(directory, child, resolve), result);
    assert.deepEqual(loadChild(directory, resolve), result);
    const partial = path.join(temporary, 'partial');
    initialize(partial, canonical(child.origin));
    assert.throws(() => loadChild(partial, resolve), error => error.code === 'unavailable');
    assert.equal(load(partial).state.sequence, 0); // core validity alone is not offspring acceptance
    assert.deepEqual(publishChild(partial, child, resolve), result);
    const failure = path.join(temporary, 'failure');
    const link = fs.linkSync;
    fs.linkSync = (from, to) => {
      if (to.endsWith('lineage.json')) throw Object.assign(new Error('injected publication failure'), { code: 'EIO' });
      return link(from, to);
    };
    try { assert.throws(() => publishChild(failure, child, resolve), error => error.code === 'io'); }
    finally { fs.linkSync = link; }
    assert.throws(() => loadChild(failure, resolve), error => error.code === 'unavailable');
    assert.deepEqual(publishChild(failure, child, resolve), result);
    const before = fs.readFileSync(path.join(directory, 'lineage.json'));
    assert.throws(() => publishChild(directory, grandchild, resolve));
    assert.deepEqual(fs.readFileSync(path.join(directory, 'lineage.json')), before);
    fs.writeFileSync(path.join(directory, 'lineage.json'), canonical({ wrong: true }));
    const corrupt = fs.readFileSync(path.join(directory, 'lineage.json'));
    assert.throws(() => publishChild(directory, child, resolve));
    assert.deepEqual(fs.readFileSync(path.join(directory, 'lineage.json')), corrupt);
    const broken = path.join(temporary, 'broken');
    fs.mkdirSync(broken); fs.writeFileSync(path.join(broken, 'origin.json'), canonical(child.origin));
    assert.throws(() => publishChild(broken, child, resolve), error => error.code === 'unavailable');
    assert.equal(fs.existsSync(path.join(broken, 'SYNTHETIC')), false);
  } finally { fs.rmSync(temporary, { recursive: true }); }
});
