# Phase31 — one pure simulated-body adapter

## Scope/current facts/files

Reviewed D11, bytes/perception/admission/replay/expression and body evidence contract.
No adapter exists yet. Implement only signed synthetic claim -> separately authorized
experience -> D09 response -> spatial expression -> permitted bounded simulated action.

## Exact boundary/evidence

| D11 accepted | Implementation |
| --- | --- |
| compact b1 packet | canonical/closed/range/body-proof validation, fixed key allowlist |
| historical continuity | parse retained sim-a/sim-b messages, verify proof/binding/consecutive ordinals |
| organism authority | normal classify and replay; exact expected observer/policy/interaction |
| no replayed action | duplicate returns unchanged history and action=null |
| local safety | closed boolean options, unavailable disconnect/witness, <=3 point bounds |

Proof kind body is additive; no hash kind/event/state additions. D11's stale invalid
wording does not override D04's authorized signed-fork classification: normal classify
conflict takes precedence; otherwise local stale/ordinal request is invalid. Record
this ordering clarification additively, never hide or select a conflicting head.

## Files/flow/testing

Add adapters/simulated.mjs; test/demo public signing via existing fixture test helper
for tests and explicit public fixture signing in demo only. tools/demo_simulated.mjs
produces visible JSON result sequence with two bodies/reconnect and claim labels.
tests/simulated.test.mjs verifies exact entry-to-output pipeline, false signed cue
stays claim-only, no action without permission, duplicate no action, disconnect/
attestation/range/proof/ordinal/stale refusal, conflict and immutable identity/inputs.
Write temporary retained history and compare Python canonical state/commitment.
No IO/signing/hardware inside adapter. Full regressions and demo before publishing.

## Risks/recovery/minimality

Caller retains immutable returned events; reconnect derives state from those bytes,
not body memory. Losing a body does not end the organism. No physical truth/safety
claim. One function and fixed profiles suffice; no device registry/state service.
