# A02 technical specification

## Scope / use case

An engineer must distinguish unavailable/unsupported input from invalid bytes
consistently across independent verifiers. Fix the reproduced evidence-version
diagnostic in Phase13/18, retaining all accepted-state/hash behavior.

## Current implementation / files reviewed

src/encounter.mjs validateEvidence rejects version != evidence-v1 as unsupported.
verifier/verify.py evidence_id uses need's invalid default. tests/conformance.test.mjs
mostly asserts nonzero rejection; tests/encounter.test.mjs does not compare classes.
Read D05/D06/D13 and audit A02. No canonical schema/fixture changes needed.

## Structured evidence / literal mapping

| Artifact / field | Existing literal | Treatment |
| --- | --- | --- |
| evidence.version | evidence-v1 | unchanged; future -> unsupported |
| D06 diagnostics | invalid, unsupported, unavailable, unauthorized, conflict, limit, io | preserve vocabulary, no new code |
| encounter event signature | Ed25519 event-proof | validly re-sign mutated test bodies so negative reaches semantic boundary |

## Active entry points / proposed architecture

Keep JS authoritative D13 behavior. Change only Python evidence_id need(version)
to explicit code unsupported. A Node conformance test creates owned synthetic
directories with valid origin and signed mutated first event; compare JS classify
code against Python CLI stderr.error and literal expected code. Verify both reject,
so no state/persistence effect occurs. This exercises an independent stored-wire
entry, not a second wrapper around classify. No live LLM/network or repair path.

## File-by-file plan / acceptance

- verifier/verify.py: one explicit error class.
- tests/conformance.test.mjs: signed negative vector table for unsupported evidence
  version, policy version, frame, event profile, event kind, wrong proof and unknown
  predecessor. Expected classes are respectively unsupported, invalid, invalid,
  unsupported, unsupported, invalid, invalid. Policy/frame remain invalid because
  evidence-level expression fidelity rejects them; do not invent a new mapping.
- Task result/pr: exact command and outcome, narrow error agreement claim.

Focused conformance tests plus full regression and schema/independent causal
checks must pass. Prior reproduction would fail the evidence-version assertion.
No origin/event/proof preimage or accepted-state field changes. Tests use public
fixture keys, own temporary directories and safe diagnostics only.

## Risks, reset and Minimality

One agreed negative corpus is bounded evidence, not exhaustive diagnostic proof.
Existing malformed-wire/replay negatives remain. Do not broaden to redesign all
errors. No new module, dependency, D-number or roadmap phase. Temporary test
cleanup does not erase accepted organism evidence; #0001 stays UNBORN.
