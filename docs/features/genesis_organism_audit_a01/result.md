# A01 — Verify supersession predecessor evidence

## Outcome

Git-backed JS and Python supersession now verify predecessor selected bytes and hashes. Fabricated revisions, hashes, absent blobs and mismatched artifact lists reject despite a valid successor. Offline supersession refuses unavailable predecessor evidence before any Git call.

## Verification

`node --test tests/rehearsal.test.mjs`: 9/9 groups pass. Four negative predecessor mutations, valid predecessor positive, and no-Git offline refusal are covered.

Shared regression on the corrected working tree based on 2090fcd: `npm test` 52/52 groups pass (135.552 seconds). Independent checks: `tests/schema_vectors.py` 6/6; `tests/successor_schema_vectors.py` 2/2; `tools/audit_causal.py` 12 views including a fresh encounter demonstration; `verifier/lineage.py` four nodes/three edges; retained 195-artifact ceremony independently matches its original commitments. A final Git-pinned regression is recorded in the shared remediation report.

Protected ORIGIN, GENESIS, historical observer/phenotype schemas, #0001 placeholder, Total Spec and Phase Plan match the merged baseline. `git diff --check` passes. Node 25.9.0 / Python 3.14.7; lower supported environments and hosted CI were not exercised.

## Minimality and safe refactor

Reviewed the full task diff against origin/work/synthetic-phases at 2090fcd, plus the individual spec/plan. No additional refactor was justified. Existing verification primitives and contracts are reused; no dependency, service, D-number, execution phase, schema field or runtime framework added. Documentation review metadata was corrected where copied labels referred to another task. Reviews are operator self-reviews, not independent human approval; 95/100 is workflow readiness, not measured protocol conformance.

## Publication and limits

Included in existing draft [PR6](https://github.com/cksdnr1/genesis-organism/pull/6), base work/phase-03-authority, head work/synthetic-phases. Each corrective task has its own artifacts and scoped commit; this is direct local PlaySpec execution, not Novis queue/registry completion. Remaining on the scoped work branch avoids assuming a master branch and preserves the shared PR context. No reusable agent instruction is necessary beyond the retained contract/runbook corrections.

Offline supersession remains unsupported; nonsuperseding offline verification still works without Git. Caller-supplied empty births are local trust context, not global absence proof. No prior freeze-signature contract was invented.

No merge, real freeze/tag/release/deploy/mint/birth performed. GENESIS #0001 remains UNBORN / NO-GO.

Workflow bookkeeping: the initial A01 draft pointer was prematurely advanced, then restored through the supported phase command before drafting/review/implementation. Local logs remain intact.

## Final local task evidence

Final committed implementation b2c2b2f: `npm test`52/52 groups pass, 134.855 seconds.
PR6 publication verified at6a45287; subsequent fresh supported CLI read confirms
this mono-spec completed. See [shared completion evidence](../genesis_organism/audit-remediation-2026-10-08.md).
No merge or real birth authorization follows from this workflow state.
