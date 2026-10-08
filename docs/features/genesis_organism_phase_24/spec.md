# Phase 24 — deterministic bounded adaptation

## Scope and verified current behavior

Implement accepted D09 only. Reviewed admission/replay, independent verifier,
encounter vector generator and schema refs. Current code permits experience only
in encounter-v1 and does not update signal from it. New origins choose adaptation-v1;
existing origin/state/envelope fields, rule meanings and committed fixtures remain.

## Contract/evidence and architecture

| D09 requirement | Exact implementation boundary |
| --- | --- |
| new rules literal | JS validateOrigin and Python origin_state |
| fresh evidence after duplicate | JS classify and independent Python classify |
| signal=motif | existing JS/Python reducers under adaptation-v1 only |
| controls and independent vectors | committed fixtures, literal [2,1,3,3], every prefix |

Reject signal-v1 under adaptation-v1 after proof/parent checks. Allow rotation.
Experience accepts adaptation/encounter; validate original evidence, prior identity,
then fresh state digest for adaptation. Existing sibling conflict handling remains.

Schema inspection found evidence.schema.json's sourceState ref carries the old
encounter-v1 rules literal. Reusing it unmodified would incorrectly reject the new
state. Add a successor evidence schema with identical fields but new sourceState
ref; observer/policy refs explicitly target historical encounter-v1 schemas.
This is required compatibility evidence, not a new wire abstraction. Record the
implementation clarification additively in D09. No historical schema changes.

## File plan, flow and failure recovery

Edit src/admission.mjs/replay.mjs and verifier/verify.py. Add independent Python
fixture/schema generator, bounded adaptation fixtures, four successor schemas and
tests/adaptation.test.mjs. Public RFC seed only; generator refuses to overwrite
existing output. State transitions flow through normal store admission/replay;
no special mutation API. Fixes use new commits; genesis and retained bytes persist.

## Acceptance and risks

Every prefix must agree JS/Python and selected literal task outcomes. Store rejects
unauthorized/stale/override/unknown-rule proposals without changing state; retries
do not compound. Genesis bytes remain exact. Controls use same prior state/target
with absent or rejected proposal. Rotation and old fixtures regress. Synthetic
label-conditioned fit does not imply broad adaptation, selection or real sensor
truth. GENESIS #0001 remains UNBORN; no child creation or ecology.
