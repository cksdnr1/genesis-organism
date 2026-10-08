# PM-01 technical specification

## Scope and verified baseline

Baseline4640cea (PR7, base work/phase-03-authority) retains the post-merge audit
of e6d0e66. All52 regression groups pass, but three of twelve additional validly
signed negatives have diagnostic disagreement. Read src/expression.mjs,
src/encounter.mjs, verifier/verify.py, tests/conformance.test.mjs, D05/D06/D07/D13,
A02 spec/result and the exact retained audit corpus. No second live repo owner
or dirty changes were found before this task. Existing work is committed/pushed.
Rollback is an additive revert of the scoped correction, preserving audit history.

## Contract boundary and architectural decision

D06 diagnostics remain invalid/unsupported/unavailable/unauthorized/conflict/limit/io.
A02 already specifies policy-version/frame failure as invalid at the evidence-level
expression-fidelity boundary. D13 admission validates a complete public-synthetic
expression against its retained observer/policy; JS verifyExpression is a boolean
fidelity predicate. Invalid expressions cannot become authorized experience.

Normalize only Python expression_result Invalid exceptions INSIDE evidence_id
into invalid/expression-policy-fidelity. Keep canonical(evidence), closed shape,
evidence.version, nonce, source validation and interaction validation outside
that catch. Unknown evidence.version stays unsupported; raw byte/resource limits
remain invalid/limit as established. Do not catch Exception, IO or parser errors.
Standalone negotiation/expression validation retains unsupported/unauthorized;
no denied/private/unknown-capability input becomes selected or accepted. A diagnostic
class is not an authorization grant. No public/private permission model changes.

This is a boundary-consistency correction, not choosing JS as the universal oracle.
Existing accepted A02 mapping plus the boolean D07 fidelity interface determine
this contextual result. Alternative: propagating all JS negotiation errors would
change existing A02 policy/frame outcomes and larger callers/tests unnecessarily.
Alternative: flattening Python globally would erase useful standalone diagnostics.
No change to accepted wire/state/proof/version domains or successful outputs.
Append a dated D13 clarification with this context and minimality evidence.

## Structured literal cases

Input: docs/features/genesis_organism/post-merge-audit/diagnostic-results.json.
Subset: all12 results[].candidate; each is an exact signed event envelope.
Expect rejected in JS, Python exit1, failed store append without final event, and
literal classes below (not classes derived from either implementation's output):

| Case name | Expected evidence-admission code |
| --- | --- |
| observer-version | invalid |
| unknown-capability | invalid |
| private-disclosure | invalid |
| attested-capability | invalid |
| empty-policy | invalid |
| unsupported-policy-profile | invalid |
| unsupported-policy-version | invalid |
| unsupported-evidence-version | unsupported |
| missing-policy | invalid |
| invalid-message | invalid |
| unsupported-frame | invalid |
| unauthenticated-source | invalid |

## Active path, state propagation and reset

Python CLI reads owned synthetic history -> parse/proof/source checks -> evidence_id
-> expression_result -> contextual Invalid conversion -> JSON stderr.error and
exit1. Reference classify and store.append retain their existing refusal. Verify
store byte inventory unchanged after rejection. Deliberately inject candidate only
into a separate independent-verifier test directory to exercise its stored-wire
entry; never edit canonical production or retained fixture history. Temporary
directories are test-owned and removed after checks. No callbacks/repair/reset API.

## Exact file and validation plan

- verifier/verify.py: wrap ONLY expression_result invocation with except Invalid.
- tests/conformance.test.mjs: add retained12-case literal-expected test. Compare
  JS classify, store append refusal/no mutation, independent directory CLI, and
  preserve standalone JS negotiation/private/unknown diagnostics explicitly.
- docs/decisions/D13-encounters.md: append contextual diagnostic/minimality note.
- Current execution status and task result/pr: append dated closure evidence.
  Historical audit reports/raw failing results remain unmodified.

Focused node conformance/perception/encounter tests must pass. Demonstrate the new
regression FAILS before the fix for the three cases. Run the standalone audit
probe after the fix: twelve reject, zero mismatches, exit0; retain new evidence
separately with actual implementation revision (its static auditedRevision denotes
the original source corpus, not new runtime provenance). Full npm test plus Python
schema6+2 and independent causal12-view verification must pass. Run the final full
suite on a committed implementation so ceremony artifact hashes cover fixed code.

## Minimality and remaining limits

One existing boundary and one specific exception handler, no new API, dependency,
field, module, state, event, D-number or execution phase. Removing normalization
restores reproduced disagreement; removing negatives loses evidence. New risk:
masking useful reason categories; scoped Invalid-only catch and standalone tests
bound it. No universal error agreement proof, lower-floor/hosted CI claim or birth
gate closure. Original Total Spec/Phase Plan/origin/schema bytes remain unchanged.

## Pre-implementation amendment — archive input closure

Regression-first inspection found the retained diagnostic JSON is a new test
input absent from the current195-file ceremony selection. Add exactly
docs/features/genesis_organism/post-merge-audit/diagnostic-results.json to the
canonical sorted fixtures/ceremony-v1/artifacts.json list (196 files). The list is
a versioned rehearsal selection, not organism canonical state. This is the sole
exception to the earlier fixture-file exclusion; no historical manifest, audit
input, origin/event/schema/proof bytes are rewritten. Historical manifests resolve
their OLD selection blob at their pinned Gitrevision. Add a current-manifest
inclusion assertion so missing archived test inputs cannot recur unnoticed.
Required by D12 archive/test-input closure, not future-proofing. Minimum one
existing list entry; removal breaks archived conformance tests. New risk: treating
old195 archives as new196 evidence; retain their original scope and label the
new selection explicitly. Rerun full Git-pinned rehearsal after commit. No new
canonical mechanism, D-number or roadmap phase. Both reviews reapproved this
amendment through supported CLI routing before the production correction.
