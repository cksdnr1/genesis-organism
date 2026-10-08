# Phase 3 — Identity and authority decision research specification

## Scope / use case
Deliver a concrete D02 recommendation for the smallest synthetic deterministic
profile. The creator can review authority, copies, conflicts and recovery limits
before Phase 4. This task can finish research but cannot invent creator acceptance.

## Current implementation / relevant files / architecture
Reviewed spec/identity.md, spec/genome.md, docs/threat-model.md, D01 research,
Phase 2 encounter requirements and Total Spec D02 / Phase Plan 3–4. Verified:
identity rules are open research; no identity generator, key store, admission or
reducer exists. Entry: source inspection -> D02 proposal -> creator review ->
accepted contract gates downstream work. No callbacks, state change or runtime.

## Verified constraints / evidence
Creator != custodian; genesis/history immutable; body/wallet not identity;
state != identity remains hypothesis. Exactly one accepted origin is scoped to
an authority model, not universal uniqueness. Current JSON schemas contain no
canonical organism identity/event contract, and neither file changes here.
Git commit IDs are implementation provenance only, never organism identifiers.

## Problems / proposed direction
Compare content-bound birth identity versus assigned opaque ID; single designated
writer versus multiple writers; replicas versus divergent copies versus new births;
rotation/recovery and creator/custodian/body separation. Recommend a locally
serialized single-authority synthetic profile with explicit conflict halt and no
hidden recovery override. All details must be identified as proposal. D03 still
selects bytes/crypto; D04 still selects event envelope and transitions. No schema
or executable choices may be smuggled into later implementation through examples.

## File-by-file plan
Create docs/decisions/D02-identity-authority.md with option table, precise proposed
trust boundaries, adversarial case outcomes, downstream obligations, Minimality /
Complexity Justification and creator acceptance status. Preserve original spec.
Task plan/result/reviews retain research evidence. Phase 4 stays gated until D02
is explicitly accepted or synthetic decision authority is delegated by the user.

## Risks / acceptance / reader aids
No global head choice, identity uniqueness, creator authentication, key recovery
or compromise prevention is promised. Walk identical replicas, competing signed
heads, stolen/lost key, key transition, body loss and custody changes. Distinguish
local serialization from malicious-writer equivocation. Check no proposal is marked
accepted and no new key, identifier, schema, dependency or genesis is created.
One decision record suffices; no consensus/key-management framework.
