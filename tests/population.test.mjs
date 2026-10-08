import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { canonical } from '../src/bytes.mjs';
import { runStudy } from '../experiments/population.mjs';
import { verifyLineage } from '../src/lineage.mjs';

test('preregistered six-run selection controls count only accepted independently verified offspring', () => {
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'genesis-study-'));
  try {
    const first = path.join(temporary, 'first'), second = path.join(temporary, 'second');
    const report = runStudy(first);
    assert.equal(report.status, 'completed'); assert.equal(report.runs.length, 6);
    for (const [i, run] of report.runs.entries()) {
      const selection = run.arm === 'selection-no-experience', learning = run.arm === 'selection-with-experience';
      assert.equal(run.opportunities, 4);
      assert.equal(run.acceptedChildren.length, selection ? 2 : 4);
      assert.equal(new Set(run.acceptedChildren).size, run.acceptedChildren.length);
      assert.deepEqual(run.parentOffspringCounts, selection ? { 0: 0, 2: 2 } : { 0: 2, 2: 2 });
      assert.deepEqual(run.offspringTraitCounts, selection ? { 0: 0, 2: 2 } : learning ? { 0: 0, 2: 4 } : { 0: 2, 2: 2 });
      assert.equal(run.learningEvents, learning ? 2 : 0);
      const archive = JSON.parse(fs.readFileSync(path.join(first, run.archive)));
      assert.deepEqual(archive.roots, run.acceptedChildren);
      for (const id of archive.roots) {
        const graph = verifyLineage(id, ancestor => archive.records[ancestor] ?? null);
        const filename = path.join(temporary, 'verify.json');
        fs.writeFileSync(filename, canonical({ root: id, records: archive.records }));
        const independent = spawnSync('.venv/bin/python', ['verifier/lineage.py', filename], { encoding: 'utf8' });
        assert.equal(independent.status, 0, independent.stderr);
        assert.deepEqual(JSON.parse(independent.stdout), graph);
      }
      assert.equal(fs.existsSync(path.join(first, `.work-run-${i}`)), false);
    }
    assert.deepEqual(runStudy(second), report);
    for (const filename of ['report.json', ...report.runs.map(run => run.archive)]) {
      assert.deepEqual(fs.readFileSync(path.join(first, filename)), fs.readFileSync(path.join(second, filename)));
    }
    assert.throws(() => runStudy(first));
    assert.throws(() => runStudy('organisms/genesis-0001'), error => error.code === 'unauthorized');
  } finally { fs.rmSync(temporary, { recursive: true }); }
});

test('publication failure retains partial evidence, stops study and never counts incomplete child', () => {
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'genesis-study-fail-'));
  try {
    const link = fs.linkSync;
    fs.linkSync = (from, to) => {
      if (to.endsWith('lineage.json')) throw Object.assign(new Error('injected'), { code: 'EIO' });
      return link(from, to);
    };
    let report;
    const directory = path.join(temporary, 'failure');
    try { report = runStudy(directory); } finally { fs.linkSync = link; }
    assert.equal(report.status, 'failed'); assert.equal(report.runs.length, 1);
    assert.equal(report.runs[0].failure, 'io');
    assert.equal(report.runs[0].acceptedChildren.length, 0);
    assert.equal(fs.existsSync(path.join(directory, '.work-run-0/child-1/origin.json')), true);
    assert.equal(fs.existsSync(path.join(directory, 'run-0.json')), true);
    assert.equal(JSON.parse(fs.readFileSync(path.join(directory, 'report.json'))).status, 'failed');
    const read = fs.readFileSync;
    fs.readFileSync = (filename, ...args) => {
      if (String(filename).endsWith('/fixtures/adaptation-v1/origin.json')) throw Object.assign(new Error('missing'), { code: 'ENOENT' });
      return read(filename, ...args);
    };
    const missing = path.join(temporary, 'missing');
    try { assert.throws(() => runStudy(missing)); } finally { fs.readFileSync = read; }
    assert.equal(fs.existsSync(missing), false);
  } finally { fs.rmSync(temporary, { recursive: true }); }
});
