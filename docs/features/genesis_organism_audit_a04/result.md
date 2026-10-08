# A04 — Index current accepted contracts

## Outcome

Appended a dated spec entry index for accepted D01–D14, current synthetic profiles, schemas/vectors, verifier paths and explicit unsupported scope. Historical index bytes remain an exact prefix.

## Verification

Static review: all fourteen D-record rows present, links resolve, historical README prefix and protected schema/origin bytes unchanged.

Shared regression on the corrected working tree based on 2090fcd: `npm test` 52/52 groups pass (135.552 seconds). Independent checks: `tests/schema_vectors.py` 6/6; `tests/successor_schema_vectors.py` 2/2; `tools/audit_causal.py` 12 views including a fresh encounter demonstration; `verifier/lineage.py` four nodes/three edges; retained 195-artifact ceremony independently matches its original commitments. A final Git-pinned regression is recorded in the shared remediation report.

Protected ORIGIN, GENESIS, historical observer/phenotype schemas, #0001 placeholder, Total Spec and Phase Plan match the merged baseline. `git diff --check` passes. Node 25.9.0 / Python 3.14.7; lower supported environments and hosted CI were not exercised.

## Minimality and safe refactor

Reviewed the full task diff against origin/work/synthetic-phases at 2090fcd, plus the individual spec/plan. No additional refactor was justified. Existing verification primitives and contracts are reused; no dependency, service, D-number, execution phase, schema field or runtime framework added. Documentation review metadata was corrected where copied labels referred to another task. Reviews are operator self-reviews, not independent human approval; 95/100 is workflow readiness, not measured protocol conformance.

## Publication and limits

Included in existing draft [PR6](https://github.com/cksdnr1/genesis-organism/pull/6), base work/phase-03-authority, head work/synthetic-phases. Each corrective task has its own artifacts and scoped commit; this is direct local PlaySpec execution, not Novis queue/registry completion. Remaining on the scoped work branch avoids assuming a master branch and preserves the shared PR context. No reusable agent instruction is necessary beyond the retained contract/runbook corrections.

The index is navigation, not a new profile/version or evidence of universal conformance. Historical experimental schemas remain unchanged.

No merge, real freeze/tag/release/deploy/mint/birth performed. GENESIS #0001 remains UNBORN / NO-GO.
