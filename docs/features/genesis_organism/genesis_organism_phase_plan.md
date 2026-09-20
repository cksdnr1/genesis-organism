# Genesis Organism — Detailed Phase Implementation Plan

STATUS: conditional planning baseline, not authorization to execute every phase.
Authoritative total spec: [genesis_organism_total_spec.md](genesis_organism_total_spec.md),
approved for downstream planning by [scoped self-review](total_spec_validation.md).
This approval does not resolve D01–D12 or authorize implementation, licence grant,
release or birth. All H00–H28 requirements and 28 baseline source files are retained.

## How to read and execute this plan

Creator roadmap **Phase 0–8**, execution **Phase 1–32**, and PlaySpec workflow
steps are three distinct numberings. Use only the execution numbers below for
later explicitly requested phase-execution tasks. None is created by this plan.

Phase 1 documentation/research can proceed first. All later work is conditional
on listed predecessors and accepted decisions. Research delivered is different
from decision accepted: an agent recommendation cannot replace creator/rights-holder
acceptance. No implementation may choose an unresolved contract. Concrete runtime
paths and language choices are outputs of D06, not defaults guessed here.

Each phase is a bounded review unit; split any newly discovered independent
contract change through an explicit plan revision. Tests below are future exit
criteria, not executed results. Documentation completed in this task establishes
planning readiness, not implementation, interoperability or birth readiness.

## Phase Summary

| Execution phase | Creator roadmap phase | Deliverable | Predecessors |
| --- | --- | --- | --- |
| 1 | 0 | Origin, prior-art and governance review | none; baseline sources available |
| 2 | 1 | Identity and authority decision | 1 |
| 3 | 1 | Canonical bytes and commitment decision | 2 |
| 4 | 1 | Event admission and transition decision | 2, 3 |
| 5 | 1 | Privacy, replay scope and version decision | 2, 4 |
| 6 | 1 | Minimal implementation and verifier boundary | 2, 3, 4, 5 |
| 7 | 1 | Canonical schemas and byte test vectors | 3, 4, 5, 6 |
| 8 | 1 | Admission and authorization validator | 2, 4, 7 |
| 9 | 1 | Deterministic reducer and replay | 4, 5, 7, 8 |
| 10 | 1 | Durable history and checkpoint recovery | 5, 8, 9 |
| 11 | 1 | Minimal fixture CLI | 6, 7, 8, 9, 10 |
| 12 | 1 | Independent verifier and cross-implementation conformance | 3, 4, 5, 6, 7, 9, 10, 11 |
| 13 | 2 | Perception and expression profile decision | 7, 12 |
| 14 | 2 | Capability negotiation | 8, 12, 13 |
| 15 | 2 | Expressions, attribution and validity verification | 9, 13, 14 |
| 16 | 3 | Memory and causal relationship decision | 5, 12, 15 |
| 17 | 3 | Memory projections and privacy enforcement | 5, 8, 9, 16 |
| 18 | 3 | Causal synapse transitions | 8, 9, 16, 17 |
| 19 | 4 | Evolution and inheritance eligibility decision | 4, 16, 18 |
| 20 | 4 | Deterministic evolution transitions | 8, 9, 18, 19 |
| 21 | 5 | Reproduction and lineage contract decision | 2, 19, 20 |
| 22 | 5 | Synthetic child creation and failure handling | 8, 9, 20, 21 |
| 23 | 5 | Lineage traversal and independent verification | 10, 21, 22 |
| 24 | 6 | Embodiment and attestation policy decision | 5, 8, 15, 18 |
| 25 | 6 | Simulated embodiment adapter | 14, 15, 18, 24 |
| 26 | 7 | Optional anchoring decision | 10, 12, 23 |
| 27 | 7 | Optional isolated anchoring adapter | 26 |
| 28 | 8 | Freeze, release and birth procedure decision | 1, 12, 15, 17, 18, 20, 22, 23, 25, 26, 27 if selected |
| 29 | 8 | Birth evidence and long-term recovery audit | 1, 12, 15, 17, 18, 20, 22, 23, 25, 26, 27 if selected, 28 |
| 30 | 8 | Candidate freeze rehearsal | 29 |
| 31 | 8 | Release and archival ceremony rehearsal | 30 |
| 32 | 8 | Birth ceremony and acceptance rehearsal | 29, 30, 31 |

## Dependencies and acceptance rules

Main path: origin → identity/bytes/events/privacy/layout → schemas → admission/
replay/storage → CLI → independent verifier → perception → memory/synapse →
evolution → reproduction/lineage → ceremony contracts → birth evidence/rehearsal.
Embodiment depends on core and experience. Optional anchoring is evaluated only
after independent core operation; Phase 27 can be deliberately skipped through
Phase 26's explicit decision. Audit 29 records that choice without requiring a token.

D01's evidence/options review can run now; rights and governance choices must be
accepted before relying on them. D12 anchoring is decided in 26 and ceremony
semantics in 28. Accepted D12 is a prerequisite of audit 29 and rehearsals 30–32;
there is no audit/contract cycle. Missing acceptance blocks dependents.

Implementation entry requires predecessor evidence, accepted applicable D records,
a bounded implementation spec, exact paths/contracts/fixtures and fresh worktree
verification. No plan score supplies missing design approval. Phases 30–32 are
synthetic rehearsals; real freeze, publication and birth require separate explicit
authorization and all applicable evidence gates. The full birth outcome remains
a future decision; these rehearsals cannot mark #0001 ALIVE.

## Exact existing schema vocabulary

Reuse `schemaVersion: "0.1-experimental"`; observer fields `observerType`,
`capabilities`, optional `supportedProfiles` and `extensions`; phenotype required
`sourceStateRef`, `negotiationRef`, `expressionProfile`, `expressionProcedureRef`,
`outputRef`, `mediaType`, plus `schemaVersion`, optional `extensions`.
Both roots have `additionalProperties: false`. Preserve IDs, required/optional
sets and bounds in the total-spec evidence table; no replacement enums, canonical
hash inputs or receipt fields are invented here. A successor requires explicit
compatibility mapping. `STATUS: UNBORN` is a Markdown planning designation.

## Phase 1 — Origin, prior-art and governance review

- **Roadmap / dependencies:** creator Phase 0; predecessors: none; baseline sources available.
- **Entry / decision gate:** D01 research; rights-holder acceptance needed before licence/freeze authority is treated as settled.
- **Scope and entry points:** Compare origin evidence, source limitations, layered licence options and contribution/freeze authority. Preserve the origin commit and artistic hypothesis.
- **Target artifacts / paths:** ORIGIN.md; LICENSE-DECISION.md; docs/prior-art.md; CONTRIBUTING.md; proposed D01 record.
- **Data and state updates:** Documentation records only; mark unresolved licence choices explicitly.
- **Propagation / callbacks / events:** Propagate accepted policy references to future gate checklists; no organism events or runtime callbacks.
- **Reset / clear / failure recovery:** Supersede a recommendation with an attributed new revision; preserve historical source statements.
- **User-visible outcome:** Creator receives an evidence-backed rights/governance choice set and research ledger.
- **Tests and exit evidence:** Verify every claim has source/scope; distinguish conception date from commit time; check no implied reuse licence or novelty claim.
- **Explicit non-goals:** No legal conclusion, licence selection by agent, implementation, new organism or external publication.

## Phase 2 — Identity and authority decision

- **Roadmap / dependencies:** creator Phase 1; predecessors: 1.
- **Entry / decision gate:** D02 accepted before phases 3–11 consume identity or authority rules.
- **Scope and entry points:** Compare origin identifiers, replica/fork/child semantics, writer models, key delegation/rotation/recovery and custody. Specify conflict and compromise boundaries.
- **Target artifacts / paths:** spec/identity.md; spec/genome.md; docs/threat-model.md; proposed D02 record.
- **Data and state updates:** Decision tables and candidate examples only; no real identifiers, keys or genesis records.
- **Propagation / callbacks / events:** An accepted D02 fixes validation authority inputs for subsequent contracts; it does not accept any organism event.
- **Reset / clear / failure recovery:** Record competing alternatives and supersession; a lost key does not trigger an invented override.
- **User-visible outcome:** Reader can distinguish continuity, custody transfer, replica and new birth without choosing by implementation accident.
- **Tests and exit evidence:** Walk through identical replicas, conflicting signed heads, stolen key, creator/custodian separation, and body loss.
- **Explicit non-goals:** No default wallet, global uniqueness claim, consensus service or recovery implementation.

## Phase 3 — Canonical bytes and commitment decision

- **Roadmap / dependencies:** creator Phase 1; predecessors: 2.
- **Entry / decision gate:** Accepted D02; D03 accepted before committed fixtures/schemas.
- **Scope and entry points:** Compare exact JCS and deterministic CBOR profiles, number/Unicode/duplicate-key behavior, hash/signature domains, algorithm identifiers and non-circular identity commitments.
- **Target artifacts / paths:** spec/canonicalization.md; proposed D03 record.
- **Data and state updates:** Define candidate byte domains and excluded fields; source-index hashes remain unrelated.
- **Propagation / callbacks / events:** Accepted byte rules feed schemas/vectors and independent verification; no files become organism commitments by being hashed for planning.
- **Reset / clear / failure recovery:** Version a revised candidate before freeze; never relabel old committed bytes after birth.
- **User-visible outcome:** Engineer receives unambiguous byte-encoding and commitment acceptance criteria.
- **Tests and exit evidence:** Specify duplicate keys, null/absent, integer boundaries, negative zero, Unicode, domain substitution and self-reference counterexamples.
- **Explicit non-goals:** No arbitrary JSON hashing, protocol algorithm choice without acceptance, or #0001 digest.

## Phase 4 — Event admission and transition decision

- **Roadmap / dependencies:** creator Phase 1; predecessors: 2, 3.
- **Entry / decision gate:** Accepted D02/D03; D04 accepted before implementation.
- **Scope and entry points:** Choose minimal meaningful synthetic event types and state transitions, envelope fields, authority checks, order/conflicts, corrections and input closure.
- **Target artifacts / paths:** spec/event-model.md; spec/genome.md; proposed D04 record.
- **Data and state updates:** Specify proposed versus accepted versus rejected material without inventing wire enum names.
- **Propagation / callbacks / events:** Accepted event drives only the defined transition; raw sensor/model outputs remain inputs or claims under policy.
- **Reset / clear / failure recovery:** Define idempotent retry, correction history and restart behavior; forbid rewriting admitted history.
- **User-visible outcome:** Engineer can decide expected state/error for each fixture without guessing event semantics.
- **Tests and exit evidence:** Truth tables for duplicate, stale predecessor, unauthorized, malformed, unknown-version, cross-organism and conflicting events.
- **Explicit non-goals:** No undeclared event types, consensus via LLM, timestamps as sole order, reproduction or mutation.

## Phase 5 — Privacy, replay scope and version decision

- **Roadmap / dependencies:** creator Phase 1; predecessors: 2, 4.
- **Entry / decision gate:** Accepted D02/D04; D05 accepted before canonical data design.
- **Scope and entry points:** Classify public/private/local/derived inputs; define public projection versus authorized replay, dependency retention, checkpoints, pruning and upgrade/migration authority.
- **Target artifacts / paths:** spec/memory.md; spec/event-model.md; spec/README.md; docs/threat-model.md; proposed D05 record.
- **Data and state updates:** Decision matrix names who can read, verify, replay, retain or erase each proposed data class.
- **Propagation / callbacks / events:** Version-pinned interpreter and evidence availability determine what a verifier can claim; not all readers can replay private state.
- **Reset / clear / failure recovery:** Define cache reset separately from private-data retention/deletion and immutable public history.
- **User-visible outcome:** User can see whether replay is unavailable, unauthorized or invalid and what guarantees remain.
- **Tests and exit evidence:** Cases for missing keys/dependencies, guessed commitments, old snapshots, old interpreter and correction after disclosure.
- **Explicit non-goals:** No encryption library choice, real private input, retention erasure promise or automatic migration.

## Phase 6 — Minimal implementation and verifier boundary

- **Roadmap / dependencies:** creator Phase 1; predecessors: 2, 3, 4, 5.
- **Entry / decision gate:** Accepted D02–D05; D06 accepted before source/schema implementation.
- **Scope and entry points:** Compare reference-language/toolchain options, independent verifier approach, minimal module boundaries, dependency policy and exact proposed source/fixture paths.
- **Target artifacts / paths:** proposed D06 record; future implementation file map and CLI contract.
- **Data and state updates:** Specify inputs/outputs and bounded errors without creating packages or claiming executable APIs.
- **Propagation / callbacks / events:** All adapters enter admission; UI/CLI renders results; storage cannot redefine transition logic.
- **Reset / clear / failure recovery:** Define synthetic workspace isolation, explicit cache cleanup and test-only reset; no production reset switch.
- **User-visible outcome:** Next implementer gets exact file responsibilities and an independent conformance plan.
- **Tests and exit evidence:** Check no circular module dependency, second verifier shares no reducer implementation, offline fixture operation and bounded resource controls.
- **Explicit non-goals:** No framework scaffold, dependency install, runtime or inferred language choice during planning.

## Phase 7 — Canonical schemas and byte test vectors

- **Roadmap / dependencies:** creator Phase 1; predecessors: 3, 4, 5, 6.
- **Entry / decision gate:** Accepted D02–D06; exact profile and paths required.
- **Scope and entry points:** Encode only accepted contracts; create synthetic valid/invalid fixtures with exact canonical input/output bytes and expected semantic scope.
- **Target artifacts / paths:** canonical organism/genome/event schemas and fixture paths from D06; schemas/README.md.
- **Data and state updates:** Schema versions and test vectors are synthetic artifacts, separate from #0001 and draft observer/phenotype IDs.
- **Propagation / callbacks / events:** Validators and independent implementations consume the same pinned vector corpus.
- **Reset / clear / failure recovery:** Version fixtures explicitly; clear generated test caches only; retain accepted vector history.
- **User-visible outcome:** Engineers can validate shape and canonical bytes separately from authority and semantics.
- **Tests and exit evidence:** Use a selected standards validator; exercise required/optional bounds, duplicates at parser level, number/Unicode cases and byte comparisons.
- **Explicit non-goals:** No permissive placeholder genesis/event schema, actual birth, or silent rewrite of current experimental schema IDs.

## Phase 8 — Admission and authorization validator

- **Roadmap / dependencies:** creator Phase 1; predecessors: 2, 4, 7.
- **Entry / decision gate:** Accepted D02–D06 and schema/vector evidence from 7.
- **Scope and entry points:** Implement parsing, structural checks, version selection, authority and duplicate/conflict policy as one bounded admission boundary.
- **Target artifacts / paths:** validator/module/test paths fixed by D06.
- **Data and state updates:** Input proposals yield explicitly specified accepted/rejected/uncertain outcomes; names come from accepted contracts.
- **Propagation / callbacks / events:** Only an accepted result is eligible for later append/reducer; no direct UI/adapter mutation.
- **Reset / clear / failure recovery:** Admission failure has no canonical side effects; repeated proposals follow D04 idempotence.
- **User-visible outcome:** Verifier can explain why a candidate event may or may not advance a synthetic history.
- **Tests and exit evidence:** Reject forged/wrong-actor/cross-organism/repeated/oversized/unknown-profile inputs; distinguish missing evidence from invalid evidence.
- **Explicit non-goals:** No consensus network, implicit new event semantics, state persistence or custody override.

## Phase 9 — Deterministic reducer and replay

- **Roadmap / dependencies:** creator Phase 1; predecessors: 4, 5, 7, 8.
- **Entry / decision gate:** Validated event corpus; fixed transition and input-closure rules.
- **Scope and entry points:** Implement pure transitions and replay from immutable synthetic genesis with pinned dependencies and exact arithmetic.
- **Target artifacts / paths:** reducer/replay modules and tests from D06.
- **Data and state updates:** Produce canonical evolving state according to accepted rules; do not mutate genesis or events.
- **Propagation / callbacks / events:** Replay results feed commitment verification and later projections, not external model/sensor calls.
- **Reset / clear / failure recovery:** Rebuild derived state from original input; failed replay returns specified outcome without partially accepting new history.
- **User-visible outcome:** Same inputs produce same state and commitment locally with explicit unavailable-input diagnostics.
- **Tests and exit evidence:** Compare whole replay and permitted incremental replay; altered genesis/events, no hidden time/randomness, boundary arithmetic.
- **Explicit non-goals:** No private/public scope shortcut, relationship, evolution or reproduction beyond accepted minimal event vocabulary.

## Phase 10 — Durable history and checkpoint recovery

- **Roadmap / dependencies:** creator Phase 1; predecessors: 5, 8, 9.
- **Entry / decision gate:** D05 retention/checkpoint policy and D06 persistence contract accepted.
- **Scope and entry points:** Implement accepted append and crash-recovery policy; checkpoint verification only if included in accepted profile.
- **Target artifacts / paths:** history storage/recovery tests and modules from D06.
- **Data and state updates:** Persistent accepted history stays distinct from rejected-input logs and derived cache; writes obey specified durability boundary.
- **Propagation / callbacks / events:** A successful durable admission updates replay/projections; failed writes cannot masquerade as committed events.
- **Reset / clear / failure recovery:** Crash/retry preserves idempotence; recover from validated history/checkpoint; clear caches without erasing origin.
- **User-visible outcome:** Archivist can inspect integrity, missing content and freshness relative to an independently known head.
- **Tests and exit evidence:** Interrupted writes, duplicate retries, corruption, valid older prefix, missing dependencies and invalid checkpoints; state limits explicitly.
- **Explicit non-goals:** No universal freshness from hashes alone, unapproved pruning, distributed storage service or history deletion.

## Phase 11 — Minimal fixture CLI

- **Roadmap / dependencies:** creator Phase 1; predecessors: 6, 7, 8, 9, 10.
- **Entry / decision gate:** D06 CLI contract accepted; core validation, replay and recovery evidence from phases 8–10 available.
- **Scope and entry points:** Expose only specified synthetic validation/replay/inspection actions through the already implemented core.
- **Target artifacts / paths:** CLI paths and end-to-end tests fixed by D06; README.md usage examples.
- **Data and state updates:** CLI results are derived displays; printing a value cannot authorize an event.
- **Propagation / callbacks / events:** Command entry → admission/replay/storage boundary → specified output/error; no alternate write path.
- **Reset / clear / failure recovery:** Repeated reads do not mutate history; any fixture reset is isolated and explicit.
- **User-visible outcome:** Another engineer can run a documented offline synthetic replay and inspect a reasoned failure.
- **Tests and exit evidence:** End-to-end success, invalid input, missing data, unknown version, interrupted append/retry and read-only behavior.
- **Explicit non-goals:** No independent-verifier construction in this phase, birth/mint/deploy command or claim of independent conformance.

## Phase 12 — Independent verifier and cross-implementation conformance

- **Roadmap / dependencies:** creator Phase 1; predecessors: 3, 4, 5, 6, 7, 9, 10, 11.
- **Entry / decision gate:** Accepted D02–D06, frozen synthetic vector corpus from 7 and reference CLI from 11; no pre-existing independent verifier assumed.
- **Scope and entry points:** Build the independently implemented verifier specified by D06, then compare canonical bytes, admission outcomes, state and commitments.
- **Target artifacts / paths:** Independent verifier, conformance fixture runner and report paths fixed by D06.
- **Data and state updates:** Use identical synthetic inputs; output reports are evidence, not new organism events.
- **Propagation / callbacks / events:** Independent code reads accepted profile/vectors rather than importing the reference reducer; compare results across implementations.
- **Reset / clear / failure recovery:** Clear only test outputs; disagreements preserve input corpus and evidence for diagnosis, not retrospective vector edits.
- **User-visible outcome:** Engineer can independently reproduce canonical results and see exactly which guarantees were tested.
- **Tests and exit evidence:** Byte-for-byte vectors, positive replay, rejection classes, tampering, missing dependency, unsupported version and recovery; document any shared low-level library.
- **Explicit non-goals:** No two wrappers around one reducer presented as independence, new protocol defaults, real organism or automatic vector normalization.

## Phase 13 — Perception and expression profile decision

- **Roadmap / dependencies:** creator Phase 2; predecessors: 7, 12.
- **Entry / decision gate:** Accepted D07 required before negotiation/renderer implementation.
- **Scope and entry points:** Define capability vocabulary, exact selection/tie-break rules, profiles, unsupported behavior, consent and profile-specific semantic validity.
- **Target artifacts / paths:** spec/perception.md; spec/phenotype.md; schemas/README.md; proposed D07 record.
- **Data and state updates:** Preserve current observer/phenotype literals; any successor schema gets explicit compatibility decisions.
- **Propagation / callbacks / events:** Reading state and negotiating do not automatically append events; authenticated interactions use separate admission if defined.
- **Reset / clear / failure recovery:** Expired/cleared negotiation state does not modify organism history; replay needs any recorded selection inputs.
- **User-visible outcome:** Human/LLM/Embodied mock encounters have testable meanings rather than fixed type-to-format assumptions.
- **Tests and exit evidence:** Missing vs false capabilities; unknown observer; unsupported profile; denied private fallback; two attributed but semantically invalid outputs.
- **Explicit non-goals:** No AI preference claim, automatic raw genome disclosure, or schema reference equality as validity proof.

## Phase 14 — Capability negotiation

- **Roadmap / dependencies:** creator Phase 2; predecessors: 8, 12, 13.
- **Entry / decision gate:** Accepted D07 selection and error/consent contracts.
- **Scope and entry points:** Implement deterministic selection against permitted profiles and a specified source state.
- **Target artifacts / paths:** negotiator and schema-version adapters from D06/D07.
- **Data and state updates:** Input observerType/capabilities/supportedProfiles remain claims; any negotiationRef follows D07 exact semantics.
- **Propagation / callbacks / events:** Selection result supplies input to expression procedure; event admission stays separate.
- **Reset / clear / failure recovery:** Clear transient requests safely; same explicit inputs reproduce selection where promised.
- **User-visible outcome:** Observers receive an explicit selected or unsupported result with access constraints.
- **Tests and exit evidence:** Three mocks, empty capabilities, missing/false, reordered requests, unsupported versions, resource limits and no-read mutation.
- **Explicit non-goals:** No observer authentication inferred from type, arbitrary capability scores or external agent orchestration.

## Phase 15 — Expressions, attribution and validity verification

- **Roadmap / dependencies:** creator Phase 2; predecessors: 9, 13, 14.
- **Entry / decision gate:** Accepted D07 and conformance-tested canonical state references.
- **Scope and entry points:** Implement the smallest permitted expressions for the three mocks and verify receipt binding plus profile-specific fidelity.
- **Target artifacts / paths:** expression procedures, verifier and fixtures from D07; spec/phenotype.md.
- **Data and state updates:** Use sourceStateRef, negotiationRef, expressionProfile, expressionProcedureRef, outputRef and mediaType with approved semantics or explicit successor mapping.
- **Propagation / callbacks / events:** Outputs derive from canonical state; verification separates attribution, reproducibility and semantic validity.
- **Reset / clear / failure recovery:** Clear render caches without replacing canonical source; unavailable dependencies produce scoped failure.
- **User-visible outcome:** Different machine/human expressions can be traced and validated against the same synthetic organism state.
- **Tests and exit evidence:** State/output/procedure substitution, deterministic repeat, legitimate divergent views and faithful-versus-attributed-only counterexamples.
- **Explicit non-goals:** No live robots, art marketplace, model-output consensus or observer-specific canonical truth.

## Phase 16 — Memory and causal relationship decision

- **Roadmap / dependencies:** creator Phase 3; predecessors: 5, 12, 15.
- **Entry / decision gate:** Accepted D08 required before memory/synapse transitions.
- **Scope and entry points:** Define explicit memory projections, relationship formation/consent/revocation, causal influence and bounded storage; no arbitrary affinity/trust score.
- **Target artifacts / paths:** spec/memory.md; spec/synapse.md; proposed D08 record.
- **Data and state updates:** Name canonical versus private/local/derived components under D05; define corrections without erasing past records.
- **Propagation / callbacks / events:** Specify which admitted interactions affect future behavior/expression and which are merely local summaries.
- **Reset / clear / failure recovery:** Define forgetting/projection rebuild and counterparty refusal independently from accepted history retention.
- **User-visible outcome:** Reader can follow one interaction into an authorized persistent effect and see privacy limits.
- **Tests and exit evidence:** Cases for unilateral claim, mutual consent, duplicate interaction, revoked permission, unavailable private content and misleading summary.
- **Explicit non-goals:** No numeric score invented for schema completeness, friend-list substitution or real personal-data ingestion.

## Phase 17 — Memory projections and privacy enforcement

- **Roadmap / dependencies:** creator Phase 3; predecessors: 5, 8, 9, 16.
- **Entry / decision gate:** Accepted D05/D08 data access and transition rules.
- **Scope and entry points:** Implement minimal permitted memory retention/projection and access enforcement on synthetic data.
- **Target artifacts / paths:** memory/projection/privacy tests from accepted D06/D08 layout.
- **Data and state updates:** Canonical records, encrypted/private inputs if supported, local memory and lossy summaries remain distinguishable.
- **Propagation / callbacks / events:** Accepted events update only declared projections; summaries cannot silently rewrite historical authority.
- **Reset / clear / failure recovery:** Rebuild projections or clear local summaries under policy; no promise of deleting already public information.
- **User-visible outcome:** Authorized and public readers receive appropriately scoped views and replay diagnostics.
- **Tests and exit evidence:** Access denied, missing input/key, stale summary, disclosure limits and replay under each specified permission scope.
- **Explicit non-goals:** No undeclared encryption design, production private memory or treating digest possession as access authorization.

## Phase 18 — Causal synapse transitions

- **Roadmap / dependencies:** creator Phase 3; predecessors: 8, 9, 16, 17.
- **Entry / decision gate:** Accepted D08 relationship and causal-effect table.
- **Scope and entry points:** Implement only defined formation/update/revocation and observable causal effects, preserving counterparty evidence.
- **Target artifacts / paths:** synapse transitions and causal fixtures from D08.
- **Data and state updates:** Relationship state derives from admitted interactions; no hidden affinity scoring or fabricated mutual consent.
- **Propagation / callbacks / events:** Demonstrate declared effect on memory/behavior/expression; negotiate views through the existing boundary.
- **Reset / clear / failure recovery:** Permission changes stop future effects as specified without deleting past relationship evidence.
- **User-visible outcome:** Observer can inspect why a relationship affects an expression or behavior.
- **Tests and exit evidence:** Duplicate, unilateral, refused, revoked, Sybil/resource and privacy cases; effect absent when causal prerequisites fail.
- **Explicit non-goals:** No follower graph presented as synapses, arbitrary trust metric or unsupported evolution.

## Phase 19 — Evolution and inheritance eligibility decision

- **Roadmap / dependencies:** creator Phase 4; predecessors: 4, 16, 18.
- **Entry / decision gate:** Accepted D09 before mutation/evolution implementation.
- **Scope and entry points:** Define mutable components, heritable eligibility, transition rules and deterministic randomness policy if any; state rationale for effects.
- **Target artifacts / paths:** spec/evolution.md; spec/genome.md; proposed D09 record.
- **Data and state updates:** Genesis remains immutable; evolved/heritable/transient state boundaries are explicit.
- **Propagation / callbacks / events:** Experience affects only declared transitions and later eligible inheritance inputs.
- **Reset / clear / failure recovery:** Rule changes are versioned decisions; reversal by new allowed events only, never genesis rewrite.
- **User-visible outcome:** Engineer can explain what evolves, why, and which future child inputs can use it.
- **Tests and exit evidence:** Candidate vectors for repeated input, unauthorized changes, disallowed components and pinned randomness/dependencies.
- **Explicit non-goals:** No fitness/biology claim, random aesthetics as evolution, or LLM-generated canonical mutation by default.

## Phase 20 — Deterministic evolution transitions

- **Roadmap / dependencies:** creator Phase 4; predecessors: 8, 9, 18, 19.
- **Entry / decision gate:** Accepted D09 and its expected-result vectors.
- **Scope and entry points:** Implement the accepted bounded rule set through normal admission/replay.
- **Target artifacts / paths:** evolution transition module and vectors from D09.
- **Data and state updates:** Produce new EvolutionState/HeritableState only as defined; preserve original genesis bytes.
- **Propagation / callbacks / events:** Authorized experience triggers specified changes; phenotype remains a view of the resulting state.
- **Reset / clear / failure recovery:** Rebuild by replay; retries do not reapply mutation; unsupported rule versions fail explicitly.
- **User-visible outcome:** Independent replay explains and reproduces each synthetic evolution step.
- **Tests and exit evidence:** Genesis invariant across sequences, rejected unauthorized changes, deterministic randomness if permitted and cross-implementation vectors.
- **Explicit non-goals:** No child creation, additional mutation operators or behavior outside accepted rules.

## Phase 21 — Reproduction and lineage contract decision

- **Roadmap / dependencies:** creator Phase 5; predecessors: 2, 19, 20.
- **Entry / decision gate:** Accepted D10 before any child-generation code.
- **Scope and entry points:** Define eligible parent states/contributions, parent consent, child identity, inherited bytes, mutation inputs, graph rules and partial/retried birth semantics.
- **Target artifacts / paths:** spec/reproduction.md; spec/lineage.md; proposed D10 record.
- **Data and state updates:** Draft child birth contract uses synthetic examples; generation remains undefined unless D10 explicitly defines it.
- **Propagation / callbacks / events:** Parent evidence and child acceptance interact only through specified causal/transaction boundaries; no assumed distributed atomicity.
- **Reset / clear / failure recovery:** Define failure cleanup/retry without changing accepted parents or creating duplicate accepted origins.
- **User-visible outcome:** Reader can prove what a child inherited and distinguish a child from a replica or conflicting head.
- **Tests and exit evidence:** Multi-parent ordering, absent parent, unauthorized reference, cycle, duplicate child retry, partial publication and contribution refusal.
- **Explicit non-goals:** No implicit two-parent restriction, lineage spam acceptance, organism reproduction before this gate or #0001 birth.

## Phase 22 — Synthetic child creation and failure handling

- **Roadmap / dependencies:** creator Phase 5; predecessors: 8, 9, 20, 21.
- **Entry / decision gate:** Accepted D10, parent-state commitments and synthetic birth fixture contract.
- **Scope and entry points:** Implement accepted inheritance and child-origin creation only in synthetic conformance fixtures.
- **Target artifacts / paths:** child-creation paths and fixture corpus from D10.
- **Data and state updates:** Child is new; parent identities/genesis persist; inherited inputs reference the exact approved parent states.
- **Propagation / callbacks / events:** Admission records only authorized outcomes; parent-side events occur only if D10 requires them.
- **Reset / clear / failure recovery:** Retry/failure follows D10 idempotence and compensation; never erase an accepted parent or child history.
- **User-visible outcome:** Verifier can reproduce a child from documented parent state/rules and observe unchanged parents.
- **Tests and exit evidence:** Invalid parent consent, identical retry, partial failure, wrong state references and deterministic inherited output.
- **Explicit non-goals:** No live #0001, breeding UI, undeclared inheritance or general consensus/transaction coordinator.

## Phase 23 — Lineage traversal and independent verification

- **Roadmap / dependencies:** creator Phase 5; predecessors: 10, 21, 22.
- **Entry / decision gate:** Accepted D10 graph/generation/unavailable-ancestor policy.
- **Scope and entry points:** Traverse authenticated ancestry and distinguish organism lineage from software forks/deployment replicas.
- **Target artifacts / paths:** lineage verifier/query paths from D10; spec/lineage.md.
- **Data and state updates:** Derived graph indexes reference canonical birth evidence; no ancestry edits through index mutation.
- **Propagation / callbacks / events:** Queries expose validated, unavailable or invalid evidence according to exact accepted contracts.
- **Reset / clear / failure recovery:** Rebuild graph indexes from history; missing ancestors cannot be silently dropped to produce a false complete lineage.
- **User-visible outcome:** Independent observer traces child inputs to parent states with explicit gaps.
- **Tests and exit evidence:** Tampered edges, cycles, duplicate references, missing/private ancestors, version boundaries and parent-state mismatch.
- **Explicit non-goals:** No invented generation formula, universal ancestor availability or repository fork equals reproduction.

## Phase 24 — Embodiment and attestation policy decision

- **Roadmap / dependencies:** creator Phase 6; predecessors: 5, 8, 15, 18.
- **Entry / decision gate:** Accepted D11 before simulated-body adapter.
- **Scope and entry points:** Define simulated body identity, simultaneous-body authority, sensor claims, verifier policies, actuation separation and bounded safety behavior.
- **Target artifacts / paths:** spec/embodiment.md; docs/threat-model.md; proposed D11 record.
- **Data and state updates:** Body-local memory and organism records are separated; no real keys/hardware endpoints presumed.
- **Propagation / callbacks / events:** Sensor evidence enters admission as scoped claims; phenotype motion output does not automatically actuate.
- **Reset / clear / failure recovery:** Disconnect/crash/body replacement preserves organism identity; policy defines stale-input rejection and recovery.
- **User-visible outcome:** Operator understands what evidence can support and which commands remain prohibited.
- **Tests and exit evidence:** Forged body, replayed sensor packet, simultaneous bodies, unavailable witness, out-of-range action and body loss.
- **Explicit non-goals:** No physical actuation, network topology choice, hardware purchase or attestation proves reality claim.

## Phase 25 — Simulated embodiment adapter

- **Roadmap / dependencies:** creator Phase 6; predecessors: 14, 15, 18, 24.
- **Entry / decision gate:** Accepted D11 with mock evidence only; core remains independently usable.
- **Scope and entry points:** Connect one bounded simulated body/observer to negotiation and event admission; demonstrate controlled interaction loop.
- **Target artifacts / paths:** simulator adapter and fixtures from D11.
- **Data and state updates:** Simulation state is not automatically canonical; admitted experiences obey evidence and authority rules.
- **Propagation / callbacks / events:** Environment claim → admission → declared state effect → expression → separately permitted simulated action.
- **Reset / clear / failure recovery:** Stop/reset simulation only; replay organism state separately and reject stale sensor retries per policy.
- **User-visible outcome:** A visible synthetic encounter demonstrates body-independent continuity and explicit evidence limits.
- **Tests and exit evidence:** Disconnect/reconnect, unauthorized actuation, multiple mock bodies, false claims and replay of admitted experiences.
- **Explicit non-goals:** No physical hardware, production sensors, vehicle control, autonomous external actions or death semantics.

## Phase 26 — Optional anchoring decision

- **Roadmap / dependencies:** creator Phase 7; predecessors: 10, 12, 23.
- **Entry / decision gate:** D12 anchoring subset accepted; skipping is an explicit valid outcome.
- **Scope and entry points:** Evaluate whether independent witnesses/content-addressed archives suffice and whether any blockchain adds a justified property; review standard versions before selection.
- **Target artifacts / paths:** proposed D12 record; storage/chain placement comparison.
- **Data and state updates:** Specify what is public, committed, encrypted or local; separate organism identity from token custody.
- **Propagation / callbacks / events:** An anchor records evidence about a history head; no chain event bypasses core authority rules.
- **Reset / clear / failure recovery:** Define outage/reorganization/transfer and archival recovery assumptions; skipped anchoring leaves core unchanged.
- **User-visible outcome:** Creator receives evidence-based anchor-or-skip options, costs and trust limits without token economics.
- **Tests and exit evidence:** Compare claims under unavailable storage, reorg, stale head, token transfer/burn and unverifiable sensor input.
- **Explicit non-goals:** No chain deployment, wallet setup, minted token, marketplace or forced blockchain dependency.

## Phase 27 — Optional isolated anchoring adapter

- **Roadmap / dependencies:** creator Phase 7; predecessors: 26.
- **Entry / decision gate:** Execute only if D12 chooses an adapter and its exact profile is accepted; otherwise record deliberate skip.
- **Scope and entry points:** Implement only the selected adapter boundary in isolated fixtures after core independence is demonstrated.
- **Target artifacts / paths:** adapter/mock contract fixtures chosen by D12.
- **Data and state updates:** External references bind specified core commitments without changing universal identity or private-data scope.
- **Propagation / callbacks / events:** Observe/submit mock anchors via adapter; canonical transitions still require normal admission.
- **Reset / clear / failure recovery:** Adapter reset/reorg does not rewrite core history; retry external submission under accepted policy.
- **User-visible outcome:** Verifier can compare local history evidence with adapter evidence, or read an explicit skip result.
- **Tests and exit evidence:** Wrong head, stale anchor, reorg, inaccessible storage and token ownership changes; replay core with adapter disabled.
- **Explicit non-goals:** No live transaction, deployment, mint, credentials or mandatory NFT dependency.

## Phase 28 — Freeze, release and birth procedure decision

- **Roadmap / dependencies:** creator Phase 8; predecessors: 1, 12, 15, 17, 18, 20, 22, 23, 25, 26, 27 if selected.
- **Entry / decision gate:** D01–D11 accepted for the tested profile; D12 anchoring choice known. This phase closes D12 ceremony semantics before the birth audit.
- **Scope and entry points:** Define exact candidate selection, freeze authority, signature/key attribution, publication evidence and birth acceptance/retry rules; compare unresolved alternatives and obtain creator acceptance.
- **Target artifacts / paths:** Proposed D12 ceremony record; spec/GENESIS.md clarifications and procedure specification, preserving existing invariants.
- **Data and state updates:** Contracts and acceptance tables only; no final genome, organism identifier, real signature or born-state record.
- **Propagation / callbacks / events:** Accepted D12 supplies criteria to audit 29 and rehearsals 30–32. A recommendation without creator acceptance blocks those dependents.
- **Reset / clear / failure recovery:** Specify failed/partially published candidate supersession, repeat authorization and idempotent birth acceptance without deleting evidence.
- **User-visible outcome:** Creator can decide exactly what actions constitute freeze, release and birth before testing readiness to perform them.
- **Tests and exit evidence:** Tabletop unauthorized signer, absent archive, partial release, optional-anchor skip, duplicate birth request and contradictory candidate evidence.
- **Explicit non-goals:** No actual freeze/signature/release/birth, implicit architecture acceptance, lowered birth gate or modification of past origin records.

## Phase 29 — Birth evidence and long-term recovery audit

- **Roadmap / dependencies:** creator Phase 8; predecessors: 1, 12, 15, 17, 18, 20, 22, 23, 25, 26, 27 if selected, 28.
- **Entry / decision gate:** D01–D12 accepted, including ceremony contract from 28; every gate in spec/GENESIS.md has evidence or remains a blocker.
- **Scope and entry points:** Audit identity, genome, bytes, event authority/order, replay, perception, memory/synapse/evolution, reproduction, versions, commitments, release and birth semantics.
- **Target artifacts / paths:** spec/GENESIS.md; proposed birth-readiness report; D12 birth subset.
- **Data and state updates:** Evidence matrix references exact tested artifact revisions; no candidate or ALIVE state assigned.
- **Propagation / callbacks / events:** Only complete verified gates permit a recommendation for a separate freeze decision; no gate auto-waived.
- **Reset / clear / failure recovery:** Failed audit remains UNBORN; new evidence is appended and old failures remain attributable.
- **User-visible outcome:** Creator sees go/no-go evidence and recovery/archive feasibility without premature birth.
- **Tests and exit evidence:** Independent full replay and expression/lineage checks; adversarial corpus, recovery exercise, licence scope and all minimum gates.
- **Explicit non-goals:** No claiming implementation success from docs, lowering birth requirements silently, freeze or release action.

## Phase 30 — Candidate freeze rehearsal

- **Roadmap / dependencies:** creator Phase 8; predecessors: 29.
- **Entry / decision gate:** D12 accepted candidate/freeze procedure; real freeze requires separate current authorization.
- **Scope and entry points:** Rehearse exact artifact selection, version pinning, digest/signature domains, key attribution and candidate supersession on synthetic data.
- **Target artifacts / paths:** proposed freeze manifest/procedure and synthetic candidate fixtures.
- **Data and state updates:** Use clearly synthetic candidate labels; never assign #0001 a final genome or real birth identity during rehearsal.
- **Propagation / callbacks / events:** A manifest ties spec, vectors and implementation evidence; computed practice commitments are not a real birth.
- **Reset / clear / failure recovery:** Failed candidate supersession is explicit and attributable; no rewrite of meaningful origin commits.
- **User-visible outcome:** Creator can review an exact freeze procedure and identify missing evidence before authorizing real freeze.
- **Tests and exit evidence:** Reproduce bytes on independent tools; tampered artifact, unavailable dependency, missing signature attribution and repeated rehearsal.
- **Explicit non-goals:** No final #0001 genome/identity, signed release, tag, force-push or implied birth from a candidate hash.

## Phase 31 — Release and archival ceremony rehearsal

- **Roadmap / dependencies:** creator Phase 8; predecessors: 30.
- **Entry / decision gate:** Accepted D01 rights/authority and D12 publication procedure; separate authorization before publication.
- **Scope and entry points:** Specify reviewed release inputs, signature verification, durable archives, independent witnessing and optional anchor ordering.
- **Target artifacts / paths:** proposed release/archive/recovery runbook and rehearsal report.
- **Data and state updates:** Rehearsal retains evidence only; no fabricated timestamp, transaction or publicly released artifact claim.
- **Propagation / callbacks / events:** Publication evidence would support attribution under stated assumptions; it does not itself perform birth.
- **Reset / clear / failure recovery:** Failure/partial publication recovery preserves already observable evidence and distinguishes supersession from erasure.
- **User-visible outcome:** Creator can approve a concrete future release procedure with known retention/trust limits.
- **Tests and exit evidence:** Offline restore, signature/key attribution, missing archive, different local timestamps, partial publication and optional-anchor skip.
- **Explicit non-goals:** No release, deployment, tag, licence grant, external messages or independent timestamp claim without evidence.

## Phase 32 — Birth ceremony and acceptance rehearsal

- **Roadmap / dependencies:** creator Phase 8; predecessors: 29, 30, 31.
- **Entry / decision gate:** All birth gates and D12 exact birth-act semantics accepted; actual birth needs separate explicit task/authorization.
- **Scope and entry points:** Rehearse birth authorization, unique-origin acceptance, retry/partial failure, publication reference checks and transition evidence only on synthetic fixtures.
- **Target artifacts / paths:** proposed birth ceremony/retry runbook and synthetic acceptance evidence.
- **Data and state updates:** No real #0001 records change; STATUS: UNBORN remains until an independently scoped authorized birth actually passes.
- **Propagation / callbacks / events:** Distinguish freeze, commitment, release, optional anchoring and birth acceptance; each has its own evidence.
- **Reset / clear / failure recovery:** Retries cannot create two accepted origins; failures remain recorded without inventing past success.
- **User-visible outcome:** Creator has a reviewable final birth procedure and precise conditions for deciding whether to proceed.
- **Tests and exit evidence:** Replay accepted birth fixture, duplicate retry, unauthorized signer, missing release evidence and interruption at each boundary.
- **Explicit non-goals:** No actual birth/mint, ALIVE marker, lifecycle death, transaction or autonomous launch from completing a planning task.

## Validation gates and risk ledger

| Risk | Phase boundary and required response |
| --- | --- |
| Oversized decision or implementation | Decision work 2–6 precedes code; CLI 11 is now separate from independent verifier 12 |
| Missing runtime entry points | D06 names concrete future paths; later phases cannot start on placeholders |
| Field/hash/vocabulary mismatch | Compare exact schema and accepted D records at 7/13/15; semantic mismatch blocks execution |
| Hidden authority/storage default | D02–D06 acceptance required; convenience libraries cannot close protocol decisions |
| False independent verification | 12 implements a separate verifier, not wrappers around the reference reducer |
| Unclear propagation | Each phase distinguishes docs, proposed inputs, admitted history and derived output |
| Destructive reset | 5/10 define synthetic reset, local clear and durable recovery independently |
| Privacy/freshness overclaim | 5/10/17 define access scope and unavailable evidence; no hash-only freshness claim |
| Relationship has no effect | 16/18 require a trace from admitted interaction to specified causal effect |
| Attribution mistaken for fidelity | 13/15 require profile-specific semantic counterexamples |
| Reproduction before inheritance | Accepted D10 at 21 precedes child fixtures 22 and ancestry 23 |
| Chain becomes identity | 26 may choose skip; 27 cannot change the independent core |
| Birth procedure/audit cycle | D12 ceremony decision 28 precedes audit 29, freeze rehearsal 30, release rehearsal 31 and birth rehearsal 32 |
| Filename incompatibility | Keep workflow totalSpec/phasePlan/result paths unchanged; D06 selects future runtime paths |
| Future-phase leakage | No child/code now; explicit gates forbid speculative implementation and real ceremonies |

## Handoff notes for later execution

Read the selected execution phase, predecessor evidence, accepted decision records,
total spec and directly relevant sources. Recheck actual code and structured
artifacts. If they contradict the plan, record and resolve the conflict before
implementation. Never manually edit PlaySpec task state or invent completion.

Use documented CLI phase-execution creation only after a later instruction requests
a selected phase. Follow applicable delegation/direct-execution rules and preserve
origin history. Git branches/commits are not organism births or mutations. Real
publication, actuation, minting and birth always retain their separate boundaries.

## Revision history and validation status

Initial review: 89/100, needs_revision. PP-01 required a pre-audit ceremony decision;
PP-02 required splitting the old Phase 11 CLI/verifier; PP-03 corrected wording.
Revision 2 adds execution phases 12 and 28, renumbers old phases, updates every
dependency and keeps creator roadmap 0–8 and approved D01–D12 unchanged.
The original finding numbers refer to the first 30-phase draft. See
[validation history](phase_plan_validation.md). Revised plan awaits revalidation.

## Revalidation outcome

Review 2: 96/100 for this conditional plan; PP-01/PP-02/PP-03 resolved. No
planning blocker remains. Detailed evidence and residual execution gates are in
[phase-plan validation](phase_plan_validation.md). Ready to proceed to final
planning review; D01–D12 and all birth evidence gates are still unfulfilled here.
