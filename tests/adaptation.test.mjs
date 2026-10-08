import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { canonical } from '../src/bytes.mjs';
import { replay, verifiedHistory } from '../src/replay.mjs';
import { classify } from '../src/admission.mjs';
import { initialize, append, load } from '../src/store.mjs';
import { signed, seeds, fixture, history } from './helpers.mjs';

const read = name => JSON.parse(fs.readFileSync(`fixtures/adaptation-v1/${name}`));
const origin = read('origin.json');
const events = [1, 2, 3, 4].map(i => read(`${String(i).padStart(6, '0')}.json`));
const expected = read('expected.json');
function independent(directory) {
  return spawnSync('.venv/bin/python', ['verifier/verify.py', directory], { encoding: 'utf8' });
}

test('fresh authorized experiences achieve only the fixed task criterion; every prefix independently replays', () => {
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'genesis-adapt-'));
  try {
    const directory = path.join(temporary, 'history');
    const original = fs.readFileSync('fixtures/adaptation-v1/origin.json');
    initialize(directory, original);
    for (let i = 0; i <= 4; i++) {
      if (i) {
        const prior = load(directory).state.signal;
        const target = expected.targets[i - 1];
        const proposal = events[i - 1];
        assert.throws(() => append(directory, canonical({ ...proposal, signature: '0'.repeat(128) })));
        assert.equal(load(directory).state.signal, prior); // rejected and no-event controls
        assert.equal(append(directory, canonical(proposal)).status, 'accepted');
        assert.equal(load(directory).state.signal, target);
        assert.equal(append(directory, canonical(proposal)).status, 'duplicate');
        assert.equal(load(directory).state.sequence, i);
        assert.equal(prior === target, i === 4); // last trial already hit: no improvement claim
      }
      assert.deepEqual(replay(origin, events.slice(0, i)), expected.prefixes[i]);
      const python = independent(directory);
      assert.equal(python.status, 0, python.stderr);
      assert.deepEqual(JSON.parse(python.stdout), expected.prefixes[i]);
      assert.deepEqual(fs.readFileSync(path.join(directory, 'origin.json')), original);
    }
    assert.deepEqual(expected.targets, [2, 1, 3, 3]);
    assert.equal(origin.body.genome.signal, 0);
    assert.equal(replay(fixture('origin.json'), history()).state.signal, 7);
  } finally { fs.rmSync(temporary, { recursive: true }); }
});

test('adaptation rejects override, stale input and bad authority; retries do not compound', () => {
  const { states, events: accepted } = verifiedHistory(origin, events.slice(0, 1));
  const state = states.at(-1);
  const base = { ...events[1].body };
  const override = signed('event', { ...base, kind: 'signal-v1', data: { value: 99 } });
  const stale = signed('event', { ...base, data: { evidence: { ...events[0].body.data.evidence, nonce: 'fresh-nonce-stale-source' } } });
  const unauthorized = signed('event', base, seeds[1]);
  const changedNonce = signed('event', { ...base, data: { evidence: { ...events[0].body.data.evidence, interaction: { motif: 3, message: 'changed prior' } } } });
  const rebase = signed('event', { ...base, data: events[0].body.data });
  assert.equal(classify(states, accepted, rebase).status, 'duplicate');
  for (const invalid of [override, stale, unauthorized, changedNonce]) {
    assert.equal(classify(states, accepted, invalid).status, 'rejected');
    assert.throws(() => replay(origin, [events[0], invalid]));
    const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'genesis-adapt-bad-'));
    try {
      fs.writeFileSync(path.join(temporary, 'SYNTHETIC'), 'genesis-organism synthetic-v1\n');
      fs.writeFileSync(path.join(temporary, 'origin.json'), canonical(origin));
      fs.writeFileSync(path.join(temporary, '000001.json'), canonical(events[0]));
      fs.writeFileSync(path.join(temporary, '000002.json'), canonical(invalid));
      assert.notEqual(independent(temporary).status, 0);
    } finally { fs.rmSync(temporary, { recursive: true }); }
  }
  const rotate = signed('event', { ...base, kind: 'rotate-v1', data: { authority: fixture('000002.json').body.data.authority } });
  assert.equal(replay(origin, [events[0], rotate]).state.signal, state.signal);
  const unknownOrigin = signed('origin', { ...origin.body, rules: 'future-v999' });
  assert.throws(() => replay(unknownOrigin, []));
});
