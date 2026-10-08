# Phase 21 — directional causal synapse

## Scope and use case

Implement accepted D08's directional relationship projection for the later
encounter-causal demonstration. No scores, mutual consent, relationship database,
new event, private memory or canonical state. GENESIS #0001 remains UNBORN.

## Verified implementation and architecture

Reviewed src/memory.mjs, src/replay.mjs, src/perception.mjs and
tests/memory.test.mjs. memoryFor validates the complete supplied history and returns
the latest admitted subject motif with encounter/event refs. No history means null.
The proposed entry is synapseFor(origin,events,subject,{permitted:true}); callers
must not bypass history validation when suppressing output.

| Evidence | Required behavior |
| --- | --- |
| D08 directional contract | memory fields plus scope=directional-claim and partnerConsent=unverified |
| D08 suppression | permitted=false returns null after verification; no deletion |
| D04 replay | invalid/duplicate history fails; proposals outside history have no effect |

## File plan and observable flow

Add src/synapse.mjs: canonicalize and validate closed options with boolean permitted,
reuse memoryFor, then return null or the specified six-field projection. Add
tests/synapse.test.mjs exercising accepted source refs, absent/other subject,
suppression, malformed options and forged/duplicate history even when suppressed.
Compare inputs before/after. No IO, cache, adapter or new dependency.

## Risks and open questions

Fixture subjects are self-claims. Authority approval proves neither counterpart
existence nor consent. Real mutual relationships/revocation/privacy remain open
and unsupported. This projection's future causal use is Phase 22, not claimed here.
Removing consent/direction labels would overstate evidence; other metadata is omitted.
