import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { initialize, append, load } from '../src/store.mjs';
import { relatedExpression } from '../src/related-expression.mjs';
import { memoryFor } from '../src/memory.mjs';
import { synapseFor } from '../src/synapse.mjs';
import { receipt } from '../src/receipt.mjs';
import { canonical } from '../src/bytes.mjs';

export function demonstrate() {
  const originBytes = fs.readFileSync(new URL('../fixtures/encounter-v1/origin.json', import.meta.url));
  const eventBytes = fs.readFileSync(new URL('../fixtures/encounter-v1/000001.json', import.meta.url));
  const origin = JSON.parse(originBytes), event = JSON.parse(eventBytes);
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'genesis-demo-'));
  try {
    const treatment = path.join(temporary, 'treatment'), rejected = path.join(temporary, 'rejected');
    initialize(treatment, originBytes); initialize(rejected, originBytes);
    const admission = append(treatment, eventBytes).status;
    const retry = append(treatment, eventBytes).status;
    let refusal;
    try { append(rejected, canonical({ ...event, signature: '0'.repeat(128) })); }
    catch (error) { refusal = error.code; }
    const restored = [JSON.parse(fs.readFileSync(path.join(treatment, '000001.json')))];
    const subject = event.body.data.evidence.observer.subject;
    const policy = { version: 'policy-related-v1', allow: ['relationship-text-v1', 'relationship-symbols-v1', 'relationship-path-v1'], disclosure: 'public-synthetic', relationships: true };
    const views = ['text', 'symbols', 'spatial'].map(capability => {
      const observer = { version: 'observer-v1', observerType: `mock-${capability}`, subject, capabilities: { [capability]: { supported: true, evidence: 'claimed', ...(capability === 'spatial' ? { frame: 'fixture-plane-v1', unit: 'mm' } : {}) } } };
      return { capability, noExperience: relatedExpression(origin, [], observer, policy), treatment: relatedExpression(origin, restored, observer, policy), rejectedExperience: relatedExpression(origin, [], observer, policy), ablation: relatedExpression(origin, restored, observer, policy, { mode: 'no-memory-control' }) };
    });
    return { status: 'synthetic-only; GENESIS #0001 UNBORN', admission, retry, refusal, rejectedState: load(rejected).state, restoredState: load(treatment).state, receipt: receipt(origin, restored, event.body.data.evidence), memory: memoryFor(origin, restored, subject), synapse: synapseFor(origin, restored, subject), views };
  } finally { fs.rmSync(temporary, { recursive: true }); }
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  process.stdout.write(`${JSON.stringify(demonstrate(), null, 2)}\n`);
}
