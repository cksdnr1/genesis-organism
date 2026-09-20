# Machine Encounter

STATUS: RESEARCH / EXPERIMENTAL. **DESIGN DECISION — creator-directed:** Machine
Encounter is a first-class protocol concept and the project's primary use case.
Identity, authorization and replay support this encounter/effect loop:

Machine Encounter → Observer-Negotiated Expression → Interaction → attributable
experience → Memory / Synapse → later expression or adaptation → eligible
heritable change under separately accepted rules.

“Machine” includes encounters with human observers and unknown future substrates;
it does not require an LLM, network service, robot or blockchain. No actual
encounter involving GENESIS #0001 exists. All proposed demonstrations use
synthetic fixtures. Receipt fields below are a proposal, not a wire standard.

## Participants and state boundaries

Bind an encounter to a particular canonical source state, a versioned observer
profile, access policy, negotiation procedure and expression procedure. Capability
self-description is not authorization. Evidence about a capability is evaluated
under a named verifier/policy and scope; attestation is not universal truth.

PhenotypeState denotes the organism's expressed traits/behavior under a defined
profile, distinct from one observer's presentation. Whether it is a deterministic
projection or a canonical component is an OPEN QUESTION for D07; do not add an
unapproved stored state or a second canonical truth. Observer-Negotiated Expression
is the permitted presentation derived through negotiation. See [phenotype](phenotype.md).

## Proposed sequence and failure behavior

1. Identify source state and negotiate permitted capabilities/profile under access
   policy. Refuse unsupported or disallowed requests explicitly.
2. Derive or obtain the selected expression with pinned inputs and procedure.
   For model-generated content, record the accepted bytes and their evidence;
   canonical replay does not call the model again.
3. Record bounded interaction evidence with consent. Local, private, incomplete
   or denied encounters may have no canonical experience event.
4. Submit an experience proposal through D02/D04 authority and admission rules.
   A receipt is evidence, not permission to bypass those rules.
5. Resolve which events were actually accepted and link them to encounter evidence.
   Derive memory/synapse effects through D08 and state changes through D09.
6. A later encounter can exhibit a causal effect. Compare with a control lacking
   the accepted experience; do not infer preference or adaptation from any change.

Read-only, failed, rejected and interrupted encounters never automatically become
successful canonical experiences. A correction appends attributable evidence;
it does not erase an admitted record. Repeated proposals obey explicit idempotence
rules; encounter-local IDs alone do not prevent replay attacks.

## EncounterReceipt — proposed responsibilities

| Candidate field | Binding / validation responsibility |
| --- | --- |
| `organismStateRef` | Exact pre-encounter canonical state and organism context; reference integrity and authority need verification |
| `observerProfileCommitment` | Bind the profile actually used, including capability claim/evidence scope; commitment does not authenticate the observer |
| `negotiationProtocolVersion` | Pin versioned negotiation semantics and selection inputs, including access-policy reference through a specified binding |
| `expressionProcedureRef` | Pin the expression procedure and required dependencies; not an arbitrary executable URL |
| `expressionInputCommitment` | Bind the exact selected inputs and policy/profile context; required bytes must be retrievable to authorized replay/verifiers |
| `expressionOutputDigest` | Bind accepted output bytes; distinguish output integrity from semantic validity and available content |
| `interactionDigest` | Bind bounded interaction evidence with declared consent/visibility; not proof that a physical claim is true |
| `resultingEventRefs` | References only to actually accepted events, possibly none; ordering/cardinality/finality rules remain to be defined |

D13 must resolve required/optional fields, stable encounter identity, retries,
signature/authorization scope, policy binding, accepted/refused outcomes and
canonical serialization. The table does not silently complete these contracts.
Do not fabricate observer identities, real receipt numbers or commitment values.

## Avoid cyclic commitments

A receipt that contains resulting event hashes cannot also be the exact object
whose hash those events require as input. Proposed design boundary: immutable
pre-admission encounter evidence, followed by a separately attributable admission
outcome linking accepted events. A display receipt may join both. This is a
candidate decomposition, not selected hashing or schema semantics.

D03/D04/D13 must fix an acyclic binding graph before canonical receipt/events are
implemented. Do not mutate an earlier hashed receipt to add resultingEventRefs.
A missing outcome remains unresolved; an empty result list cannot ambiguously
mean both “not yet resolved” and “resolved with no accepted events.” Outcome
classification and terminality need explicit successor contracts. Corrections,
late acceptance and concurrent proposals preserve earlier evidence.

## Replay and data availability

An LLM can produce proposal/expression bytes outside the deterministic core.
Replay consumes the exact admitted input bytes directly or through an integrity-
checked available reference; a digest alone cannot recreate them. A missing or
private input yields an explicit unavailable/unauthorized replay result, not a
fresh model call or invented success. Retain model/procedure context when useful
for provenance without promising model reproducibility. D05 defines retention
and public-projection versus authorized-replay guarantees.

## Acceptance demonstration

Use human, language and embodied mocks against one synthetic source state.
Verify different permitted expressions, exact receipt/evidence/event linkage,
rejection without mutation, duplicate resistance and private-data boundaries.
Show one accepted encounter causes a specified memory/synapse change that alters
a later expression; the same history replays to the same outcome. A no-experience
control must omit that effect. This is evidence of a causal rule, not proof of
AI appreciation, Darwinian evolution or open-ended creativity.

No new receipt schema is frozen here. Current observer/phenotype JSON schemas
remain historical experimental artifacts; [successor design](../schemas/successor-design.md)
defines what must be resolved before any successor is implemented.
