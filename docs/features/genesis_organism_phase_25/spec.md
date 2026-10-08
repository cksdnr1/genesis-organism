# Phase25 — reproduction and lineage contract

## Scope/use case, verified behavior and files

FACT: adaptation-v1 produces verified current signal; there is no child runtime.
Reviewed admission.mjs/replay.mjs/store.mjs/bytes.mjs, D09, reproduction.md and
lineage.md. Phase25 decides exact bounded D10 contract before any child code.

## Proposed contract / structured evidence

| Invariant/gate | Minimum mechanism |
| --- | --- |
| New child, immutable parents | new origin bound to shared reproduction body |
| D09 eligible signal | integer floor of sum / parent count, no copied memory |
| Consent/selected-state evidence | each selected state authority signs identical body |
| Retry and partial failure | identical origin/lineage packet; incomplete publication unavailable |
| Traversable ancestry | bounded verified resolver, cycles/missing/version fail explicitly |

Accept 1..4 sorted unique parents (bounded profile, not universal biological rule),
new hash/proof domain reproduction to avoid ambiguous reuse. Body commits nonce,
all selected parent refs, child authority/creator/rules/signal. Birth discriminator
child-<reproduction hash> binds existing origin fields with no origin schema change.
Packet contains body, ordered parent consents and signed child origin. Generic core
origin verification alone never establishes lineage; child claims require packet.

## Files, entry points and next-phase boundary

Write D10-reproduction.md; dated scoped links in spec/reproduction.md/lineage.md.
Specify Phase26 pure packet validation/create projection, synthetic fixture creation
and resumable publication with existing exclusive durability; Phase27 independent
bounded lineage traversal. No canonical parent event or multi-store transaction.

## Risks, recovery, alternatives

Authority consent is scoped fixture authorization, not biological reality. Public
keys are test-only. Missing/partial ancestor evidence stays unavailable, never
silently becomes root. Cycle/resource bounds precede recursion. No generation
formula, mutation randomness, breeding platform or real #0001 birth. All future
runtime shapes/error/paths/ordering are fixed by D10; no hidden implementation choice.
