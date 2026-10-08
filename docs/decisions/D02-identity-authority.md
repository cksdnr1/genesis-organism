# D02 — Proposed synthetic identity and authority profile

STATUS: PROPOSED / CREATOR ACCEPTANCE PENDING.
Date: 2026-09-21. Phase 3 research deliverable, not an accepted runtime contract.
Sources: [identity](../../spec/identity.md), [genome](../../spec/genome.md),
[threat model](../threat-model.md), [encounter requirements](encounter-requirements.md).
The proposed scope is isolated synthetic fixtures, never GENESIS #0001.

## Requirement and alternatives

Identity and authority support the attributable encounter-causal loop; they are
not the product. Copies, actor roles and authorized history need unambiguous scope
before D03 bytes and D04 events. No universal organism registry is required.

| Question | Minimum candidate | Alternative / disposition |
| --- | --- | --- |
| Identity derivation | Commitment to an immutable origin payload under D03 domains, including an explicit birth discriminator and initial authority; identifier itself excluded from its preimage. | Assigned opaque ID needs an additional origin-binding rule. Wallet/body IDs violate substrate independence. Prefer origin binding; exact bytes remain D03. |
| Separate otherwise equal births | Distinct birth discriminator in accepted origin input. | Hashing only a genome conflates separate births; random global-uniqueness guarantee is not claimed. D03 defines bounded representation, not this table. |
| History admission | One designated authority at each accepted state, locally serialized append under D04. | Multiple concurrent writers require a conflict/finality contract not needed for first synthetic replay; defer. |
| Copy | Same origin and accepted history is a replica, not a new birth. | Treating every deployment/copy as new organism fabricates ancestry; reject. |
| Retrieval | Caller supplies origin/history and a trusted expected commitment/head where available. | Network resolver/DID/chain registry deferred until accepted interoperability needs one. |
| Authority change | Current authority authorizes a prospective key transition; later events use the new key, earlier events keep historical validation. | Automatic owner/creator/body override rejected. Concrete transition envelope/atomicity is D04. |
| Key loss / compromise | No exceptional recovery authority in the minimal profile; stop new admission if authority cannot be established. | Recovery trustees/admin reset add a new trust model; defer unless separately accepted. |

These are recommended choices to accept together for synthetic scope, not adopted
fields or cryptographic primitives. D03 must finalize commitments/signatures and
D04 must define exact transition/admission contracts before implementation.

## Proposed identity and actor semantics

- Immutable origin contains the initial authority binding and creator attribution
  claim. A valid cryptographic binding does not independently identify a human;
  verifier trust in the creator-key association must be stated externally.
- Identity remains bound to origin across legitimate key/custody/body changes.
  Do not derive it from current model weights, memory, body or mutable public key.
- A replica with identical valid history is the same protocol identity. Different
  deployments are not proof of different lived histories or new organism births.
- Divergent signed histories sharing one origin are conflicting claims about that
  identity. They are not silently new organisms or automatically valid descendants.
- A new child needs its own authorized birth and ancestry under D10. This profile
  has no reproduction operation; copying or changing a discriminator is not enough
  to claim authorized lineage or historical continuity.
- Creator attribution is persistent. Custodian rights never imply mutation authority.
  Only the current authorized event actor may request valid transitions; that actor
  still cannot alter genesis or rewrite accepted history. A body/observer is not
  an authority just because it can express or receive information.

## Proposed writer and conflict boundary

One process serializes local admission against the expected current head. D04
must bind organism, profile/version, predecessor, order and authorized payload
without circular references; signature bytes alone are not semantic validity.
No timestamps select a winner. This is local ordering, not distributed consensus.

When two validly authorized successors conflict, report conflict and stop further
canonical-head claims for the affected identity until an explicitly accepted
resolution contract exists. Retain both pieces of evidence and previously valid
history; never rewrite, silently choose the lexicographically smallest hash, or
pretend one signature proves global finality. A receipt cannot cure equivocation.
An isolated verifier can validate a supplied prefix but cannot establish that it
is latest or that no unseen fork exists. D05 defines retained-head/replay scope.

## Proposed key changes and failure behavior

A key transition must be accepted under the old authority before the successor
key is used. It cannot reauthorize past invalid events. D04 must specify replay,
retry and interrupted-append behavior before an implementation accepts rotation.
No hierarchy of delegated keys is introduced for the initial profile.

A stolen current key may issue syntactically valid proposals; signatures cannot
distinguish theft from the intended actor. Semantic/admission rules still apply,
but this profile does not claim compromise prevention. If valid conflicting
histories are observed, halt as above. Loss of the only key permits historical
verification but no new authorized events; no creator recovery backdoor, lifecycle
death or extinction is inferred. A separately accepted recovery extension would
need explicit trust and compatibility treatment, never retroactive history edits.

## Adversarial walkthrough — expected, not executed

| Case | Expected conclusion under proposed profile |
| --- | --- |
| Byte-identical replica | Same identity/history; no birth or child created. |
| Same genome, separately authorized different birth input | Distinct origins may be derived under D03; genome equality is insufficient for identity. |
| Forged or cross-organism signature | Reject under exact D03/D04 domains; no state change. |
| Two authorized successors of one head | Conflict, preserve evidence, no arbitrary winner or continued finality claim. |
| Stolen authority key | Some valid proposals may be indistinguishable from intended ones; do not claim cryptography prevents this. |
| Lost authority key | Historical verification remains possible; admission stops, no override. |
| Prospective authorized key transition | Identity remains fixed; historical keys validate their own earlier scope. |
| Old-key event after accepted transition | Reject using current-state authority; retain old history. |
| Owner or creator demands history rewrite | Reject regardless of custody/attribution. |
| Body destroyed or changed | Identity/history survive if retained; no implied organism death or new authority. |
| Missing origin/history or private inputs | Explicit unavailable/unauthorized verification scope, not proof of tampering. |
| Copy relabelled as descendant | No valid child claim without D10-authorized birth/inheritance evidence. |

## Minimality / Complexity Justification

Minimum: immutable origin binding, explicit initial authority, one locally
serialized history and an observed-conflict hold. Requirements are verifiable
continuity, causal evidence and authorization. Retain distinct birth inputs so
identical genomes do not force identical origins. Existing commitments and D04
admission express these needs; no parallel registry or organism account object.

Rejected/deferred: multi-writer consensus, recovery hierarchy, universal resolver,
wallet identity, automatic fork recognition and implicit reproduction. Removal of
authority permits forged canonical experience; removal of origin binding loses
attribution; removal of conflict reporting falsely selects history. Prospective
rotation is justified by key change without identity change, but exact event
machinery remains gated and no delegation framework is required.

New failure modes: lost sole key stalls admission; compromised key can equivocate;
missing heads limit freshness; externally asserted creator association can be
false. Demonstrate necessity through the above cases and future independent replay,
not an arbitrary complexity score. No actual keys or identifiers exist in this record.

## Acceptance gate and downstream obligations

Creator decision requested: accept this proposed synthetic trust/identity scope,
or delegate bounded synthetic design decisions after review. General permission
to execute phases has not been recorded as acceptance of these specific choices.
No answer is not acceptance. Phase 4 requires accepted D02 in the existing plan.

If accepted, D03 must fix exact origin/discriminator domains, representations,
hash/signature suite and vectors; D04 fixes authority/order/rotation/conflict
admission; D05 fixes access/retention/version scope. These are already-existing
phases, not added tasks. D02 acceptance alone cannot authorize schema/runtime before
those dependencies, licence selection, release, mint, freeze or #0001's birth.
