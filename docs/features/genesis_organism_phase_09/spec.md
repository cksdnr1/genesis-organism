# Phase 9 technical specification

## Scope/use case
Implement the D03 bounded byte/proof boundary and D04 closed-shape admission in
src/bytes.mjs and src/admission.mjs. Explain whether a synthetic proposal may advance
history; do not implement replay, persistence, CLI or later encounter semantics.

## Existing facts and contracts
Phase 8 committed four schemas, nine literal valid byte vectors, fourteen invalid
wire values, signed three-event history and expected state. D03/D04/D06 are exact
API source: synthetic-v1/core-v1; signal-v1/rotate-v1; closed bodies; D03 domains.
No primary implementation yet. JSON Schema shape does not enforce wire canonicality.

## Exact implementation path
bytes exports ProtocolError(code,message), canonical, parseCanonical, digest,
verifyProof. Recursively validate plain JSON types, safe integers excluding -0,
scalar strings and D03 budgets; manually serialize sorted keys (JSON.stringify on
sorted objects would reorder numeric-looking keys). Strict UTF-8, JSON parse then
canonical equality reject duplicate/lexical aliases. Node native crypto uses raw
Ed25519 key wrapped in fixed SPKI DER; invalid proofs return false.

admission validates exact own keys/types/profile plus proof; validateOrigin returns
D04 initial state. classify consumes already-verified historical states/events,
validates candidate and historical-parent proof before duplicate/conflict checks,
returns D04 status/reason/reference with no mutation. This trusted internal context
is not an externally supplied serialized state API. Phase 10 constructs it by replay.

## Files, tests, risks and recovery
package.json is private ESM, no dependencies; tests/admission.test.mjs and
 tests/helpers.mjs use explicit public test keys. Execute literal byte corpus,
RFC-signed fixtures, numeric-key ordering, Unicode/depth/nodes/byte limits, forged
and wrong-key signatures, unknown/cross-organism and conflicting siblings.
Freeze/copy inputs to verify no mutation. No callbacks/filesystem writes in modules.
Rollback is code fix plus regression, never rewriting expected vectors to fit errors.
Original schema/origin/UNBORN stays byte-identical. Reference runtime has no LLM,
network, clock or hidden randomness. Independent replay remains Phase 13.
