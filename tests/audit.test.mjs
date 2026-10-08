import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const run = file => spawnSync('.venv/bin/python', ['tools/audit_causal.py', ...(file ? [file] : [])], { encoding: 'utf8' });
test('independent Phase22 audit binds actual grammar, controls and provenance', t => {
  const good = run();
  assert.equal(good.status, 0, good.stderr);
  assert.equal(JSON.parse(good.stdout).verifiedViews, 12);
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'genesis-audit-'));
  t.after(() => fs.rmSync(root, { recursive: true }));
  const source = JSON.parse(fs.readFileSync('docs/features/genesis_organism_phase_22/demo.json'));
  const changes = [
    report => report.views[0].treatment.output.grammar.reverse(),
    report => { report.views[1].ablation.expressionInputCommitment = '0'.repeat(64); },
    report => { report.memory.eventRef = '0'.repeat(64); },
    report => { report.views[2].noExperience.output.presentation.points[0][0] = 9; },
  ];
  for (const mutate of changes) {
    const value = structuredClone(source); mutate(value);
    const file = path.join(root, 'altered.json'); fs.writeFileSync(file, JSON.stringify(value));
    assert.equal(run(file).status, 1);
  }
});
