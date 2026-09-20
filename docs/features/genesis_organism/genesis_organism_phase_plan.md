# Genesis Organism — Encounter-centered Phase Plan (revision 2)

STATUS: conditional planning baseline. Current task:
`genesis_organism_machine_encounter_revision`. Authoritative
[total spec](genesis_organism_total_spec.md) was reviewed for downstream planning
in [revision validation](encounter_total_spec_validation.md), not approved as a
frozen protocol. D01–D14 choices still require their own evidence/acceptance.

## Center and first product milestone

Machine Encounter → Observer-Negotiated Expression → authorized Experience →
Memory/Synapse → a causally changed later expression. Identity, signatures and
replay support this loop. Execution Phase 2 defines encounter requirements before
infrastructure choices; Phase 22 demonstrates the loop and no-experience controls
before later individual-change/reproduction work. No generic identity/log milestone
alone counts as the intended organism encounter demonstration.

## Numbering and historical compatibility

Creator roadmap Phase 0–8 remains recognizable, with **5E Population/Ecology**
added after lineage. These differ from execution **Phase 1–38** and PlaySpec's
workflow steps. Original 32-phase planning artifacts remain in commit
`d5710fe987c0abc206a217a4aa95be61f94a2f3e`; original task completion records and
schema JSON bytes are preserved. This new task succeeds the completed original.
Never interpret an old phase-execution reference using the new numbers silently.

| Previous execution phase | Current execution phase |
| --- | --- |
| 1 | 1 |
| 2 | 3 |
| 3 | 4 |
| 4 | 5 |
| 5 | 6 |
| 6 | 7 |
| 7 | 8 |
| 8 | 9 |
| 9 | 10 |
| 10 | 11 |
| 11 | 12 |
| 12 | 13 |
| 13 | 14 |
| 14 | 16 |
| 15 | 17 |
| 16 | 19 |
| 17 | 20 |
| 18 | 21 |
| 19 | 23 |
| 20 | 24 |
| 21 | 25 |
| 22 | 26 |
| 23 | 27 |
| 24 | 30 |
| 25 | 31 |
| 26 | 32 |
| 27 | 33 |
| 28 | 34 |
| 29 | 35 |
| 30 | 36 |
| 31 | 37 |
| 32 | 38 |

New phases: 2 encounter requirements; 15 D13 receipt contract; 18 receipt/admission
bridge; 22 causal-loop demonstration; 28 ecology decision; 29 controlled experiment.
There are no child execution tasks in this revision. Future task creation must
name this revision task and intended current execution number explicitly.

## Phase Summary

| Execution phase | Creator roadmap phase | Deliverable | Predecessors |
| --- | --- | --- | --- |
| 1 | 0 | Origin, prior-art and governance review | none; baseline sources available |
| 2 | 0 | Machine Encounter requirements and evidence boundary | 1 |
| 3 | 1 | Identity and authority decision | 1, 2 |
| 4 | 1 | Canonical bytes and commitment decision | 3 |
| 5 | 1 | Event admission and transition decision | 3, 4 |
| 6 | 1 | Privacy, replay scope and version decision | 3, 5 |
| 7 | 1 | Minimal implementation and verifier boundary | 3, 4, 5, 6 |
| 8 | 1 | Canonical schemas and byte test vectors | 4, 5, 6, 7 |
| 9 | 1 | Admission and authorization validator | 3, 5, 8 |
| 10 | 1 | Deterministic reducer and replay | 5, 6, 8, 9 |
| 11 | 1 | Durable history and checkpoint recovery | 6, 9, 10 |
| 12 | 1 | Minimal fixture CLI | 7, 8, 9, 10, 11 |
| 13 | 1 | Independent verifier and cross-implementation conformance | 4, 5, 6, 7, 8, 10, 11, 12 |
| 14 | 2 | Phenotype/expression and typed capability profile decision | 8, 13 |
| 15 | 2 | Encounter Receipt and experience-admission contract | 2, 3, 4, 5, 6, 14 |
| 16 | 2 | Capability negotiation | 9, 13, 14, 15 |
| 17 | 2 | Expressions, attribution and validity verification | 10, 14, 16, 15 |
| 18 | 2 | Encounter evidence, receipt outcome and admission bridge | 9, 10, 13, 15, 16, 17 |
| 19 | 3 | Memory and causal relationship decision | 6, 13, 17, 18 |
| 20 | 3 | Memory projections and privacy enforcement | 6, 9, 10, 19 |
| 21 | 3 | Causal synapse transitions | 9, 10, 19, 20 |
| 22 | 3 | Encounter-to-later-expression causal demonstration | 13, 17, 18, 19, 20, 21 |
| 23 | 4 | Within-individual change and adaptation decision | 5, 19, 21, 22 |
| 24 | 4 | Deterministic individual change and adaptation transitions | 9, 10, 21, 23 |
| 25 | 5 | Reproduction and lineage contract decision | 3, 23, 24 |
| 26 | 5 | Synthetic child creation and failure handling | 9, 10, 24, 25 |
| 27 | 5 | Lineage traversal and independent verification | 11, 25, 26 |
| 28 | 5E | Population, ecology and selection study decision | 6, 22, 24, 25, 26, 27 |
| 29 | 5E | Bounded synthetic population experiment | 22, 24, 26, 27, 28 |
| 30 | 6 | Embodiment and attestation policy decision | 6, 9, 17, 21, 22 |
| 31 | 6 | Simulated embodiment adapter | 16, 17, 21, 30 |
| 32 | 7 | Optional anchoring decision | 11, 13, 27 |
| 33 | 7 | Optional isolated anchoring adapter | 32 |
| 34 | 8 | Freeze, release and birth procedure decision | 1, 13, 17, 20, 21, 24, 26, 27, 31, 32, 33 if selected, 22 |
| 35 | 8 | Birth evidence and long-term recovery audit | 1, 13, 17, 20, 21, 24, 26, 27, 31, 32, 33 if selected, 34, 29 if a Darwinian-selection claim is selected |
| 36 | 8 | Candidate freeze rehearsal | 35 |
| 37 | 8 | Release and archival ceremony rehearsal | 36 |
| 38 | 8 | Birth ceremony and acceptance rehearsal | 35, 36, 37 |

## Entry, decision and scope rules

Research recommendations are not accepted architecture. Phase 1 may perform
origin/source/governance review; Phase 2 defines encounter requirements. D02–D06
then supply precise authority, bytes, event, privacy and runtime boundaries.
D07 is finalized in 14; D13 in 15 after its earlier requirements work. No receipt
schema/experience bridge may be implemented before that acyclic contract is accepted.
D08 governs memory/synapse, D09 individual change, D10 reproduction, D14 ecology.

Every implementation phase requires its predecessors, accepted applicable records,
exact paths/contracts and expected test outcomes. All source paths are supplied
by D06 or the later accepted domain contract, not an inferred language/framework.
Original `0.1-experimental` JSON artifacts and their IDs remain unchanged; typed
successors get distinct versions/paths and explicit field-by-field compatibility.

Phase 33 is optional under Phase 32's anchor-or-skip decision. Phase 29 is a
research experiment; a Darwinian-selection claim requires its evidence, otherwise
leave the claim unproven. This does not waive any existing birth requirement or
force open-endedness proof as a birth gate. No lifecycle death is implemented.
D12 ceremony contracts in 34 precede audit 35. Phases 36–38 are rehearsals, not
authorization for real freeze/publication/birth. #0001 stays UNBORN.

## Exact vocabulary and bindings

The unchanged schema literals remain `schemaVersion: "0.1-experimental"`,
observer `observerType`, `capabilities`, optional `supportedProfiles`, `extensions`;
old expression descriptor `sourceStateRef`, `negotiationRef`, `expressionProfile`,
`expressionProcedureRef`, `outputRef`, `mediaType`, optional `extensions`.
Both roots retain `additionalProperties: false` and exact original required sets.

Candidate EncounterReceipt names: `organismStateRef`, `observerProfileCommitment`,
`negotiationProtocolVersion`, `expressionProcedureRef`, `expressionInputCommitment`,
`expressionOutputDigest`, `interactionDigest`, `resultingEventRefs`. None is a
silent rename of an old field or a canonical wire contract. Refer to
[successor design](../../../schemas/successor-design.md) for mapping limits.
PhenotypeState is conceptually separate from Observer-Negotiated Expression;
D07 decides whether the former is canonical or derived. Replaying captured LLM
inputs requires available accepted bytes, not just digests and never a model rerun.

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

## Phase 2 — Machine Encounter requirements and evidence boundary

- **Roadmap / dependencies:** creator Phase 0; predecessors: 1.
- **Entry / decision gate:** Creator-directed encounter focus and revision R01–R12; exact D13 contract not yet accepted.
- **Scope and entry points:** Define the primary encounter→expression→experience→synapse→later-change scenario and failure/consent cases before infrastructure design.
- **Target artifacts / paths:** spec/encounter.md; spec/perception.md; spec/phenotype.md; candidate D13 requirements; source review.
- **Data and state updates:** Conceptual participants, source state and evidence/outcome responsibilities only; no canonical receipt schema or real encounter ID.
- **Propagation / callbacks / events:** Encounter requirements constrain later D02–D07 choices; viewing/refusal alone does not produce accepted experience.
- **Reset / clear / failure recovery:** Keep historical terms/schema bytes; revise requirements with attributable changes and preserve rejected encounter scenarios.
- **User-visible outcome:** Reader understands the organism’s primary encounter loop and why identity/replay support it.
- **Tests and exit evidence:** Walk three mock observers and a no-experience control; distinguish output integrity, semantic fidelity and causal effect; list eight proposed receipt fields.
- **Explicit non-goals:** No generic AI identity product, new canonical type, invented model preference, source implementation or premature D13 acceptance.

## Phase 3 — Identity and authority decision

- **Roadmap / dependencies:** creator Phase 1; predecessors: 1, 2.
- **Entry / decision gate:** Research starts after Phase 2; accepted D02 gates downstream identity/authority consumers, not entry into this decision phase.
- **Scope and entry points:** Compare origin identifiers, replica/fork/child semantics, writer models, key delegation/rotation/recovery and custody. Specify conflict and compromise boundaries.
- **Target artifacts / paths:** spec/identity.md; spec/genome.md; docs/threat-model.md; proposed D02 record.
- **Data and state updates:** Decision tables and candidate examples only; no real identifiers, keys or genesis records.
- **Propagation / callbacks / events:** An accepted D02 fixes validation authority inputs for subsequent contracts; it does not accept any organism event.
- **Reset / clear / failure recovery:** Record competing alternatives and supersession; a lost key does not trigger an invented override.
- **User-visible outcome:** Reader can distinguish continuity, custody transfer, replica and new birth without choosing by implementation accident.
- **Tests and exit evidence:** Walk through identical replicas, conflicting signed heads, stolen key, creator/custodian separation, and body loss.
- **Explicit non-goals:** No default wallet, global uniqueness claim, consensus service or recovery implementation.

## Phase 4 — Canonical bytes and commitment decision

- **Roadmap / dependencies:** creator Phase 1; predecessors: 3.
- **Entry / decision gate:** Accepted D02; D03 accepted before committed fixtures/schemas.
- **Scope and entry points:** Compare exact JCS and deterministic CBOR profiles, number/Unicode/duplicate-key behavior, hash/signature domains, algorithm identifiers and non-circular identity commitments.
- **Target artifacts / paths:** spec/canonicalization.md; proposed D03 record.
- **Data and state updates:** Define candidate byte domains and excluded fields; source-index hashes remain unrelated.
- **Propagation / callbacks / events:** Accepted byte rules feed schemas/vectors and independent verification; no files become organism commitments by being hashed for planning.
- **Reset / clear / failure recovery:** Version a revised candidate before freeze; never relabel old committed bytes after birth.
- **User-visible outcome:** Engineer receives unambiguous byte-encoding and commitment acceptance criteria.
- **Tests and exit evidence:** Specify duplicate keys, null/absent, integer boundaries, negative zero, Unicode, domain substitution and self-reference counterexamples.
- **Explicit non-goals:** No arbitrary JSON hashing, protocol algorithm choice without acceptance, or #0001 digest.

## Phase 5 — Event admission and transition decision

- **Roadmap / dependencies:** creator Phase 1; predecessors: 3, 4.
- **Entry / decision gate:** Accepted D02/D03; D04 accepted before implementation.
- **Scope and entry points:** Choose minimal meaningful synthetic event types and state transitions, authority/order/correction and input closure; specify how a later accepted D13 experience contract can extend the profile without inventing its fields now.
- **Target artifacts / paths:** spec/event-model.md; spec/genome.md; proposed D04 record.
- **Data and state updates:** Specify proposed versus accepted versus rejected material without inventing wire enum names.
- **Propagation / callbacks / events:** Accepted event drives only the defined transition; raw sensor/model outputs remain inputs or claims under policy.
- **Reset / clear / failure recovery:** Define idempotent retry, correction history and restart behavior; forbid rewriting admitted history.
- **User-visible outcome:** Engineer can decide expected state/error for each fixture without guessing event semantics.
- **Tests and exit evidence:** Truth tables for duplicate, stale predecessor, unauthorized, malformed, unknown-version, cross-organism and conflicting events.
- **Explicit non-goals:** No undeclared event types, consensus via LLM, timestamps as sole order, reproduction or mutation.

## Phase 6 — Privacy, replay scope and version decision

- **Roadmap / dependencies:** creator Phase 1; predecessors: 3, 5.
- **Entry / decision gate:** Accepted D02/D04; D05 accepted before canonical data design.
- **Scope and entry points:** Classify public/private/local/derived inputs; define public projection versus authorized replay, dependency retention, checkpoints, pruning and upgrade/migration authority.
- **Target artifacts / paths:** spec/memory.md; spec/event-model.md; spec/README.md; docs/threat-model.md; proposed D05 record.
- **Data and state updates:** Decision matrix names who can read, verify, replay, retain or erase each proposed data class.
- **Propagation / callbacks / events:** Version-pinned interpreter and evidence availability determine what a verifier can claim; not all readers can replay private state.
- **Reset / clear / failure recovery:** Define cache reset separately from private-data retention/deletion and immutable public history.
- **User-visible outcome:** User can see whether replay is unavailable, unauthorized or invalid and what guarantees remain.
- **Tests and exit evidence:** Cases for missing keys/dependencies, digest-only model inputs, guessed commitments, valid old prefixes, old interpreters, checkpoint/archive retrieval, bounded evidence and correction after disclosure.
- **Explicit non-goals:** No encryption library choice, real private input, retention erasure promise or automatic migration.

## Phase 7 — Minimal implementation and verifier boundary

- **Roadmap / dependencies:** creator Phase 1; predecessors: 3, 4, 5, 6.
- **Entry / decision gate:** Accepted D02–D05; D06 accepted before source/schema implementation.
- **Scope and entry points:** Compare reference-language/toolchain options, independent verifier approach, minimal module boundaries, dependency policy and exact proposed source/fixture paths.
- **Target artifacts / paths:** proposed D06 record; future implementation file map and CLI contract.
- **Data and state updates:** Specify inputs/outputs and bounded errors without creating packages or claiming executable APIs.
- **Propagation / callbacks / events:** All adapters enter admission; UI/CLI renders results; storage cannot redefine transition logic.
- **Reset / clear / failure recovery:** Define synthetic workspace isolation, explicit cache cleanup and test-only reset; no production reset switch.
- **User-visible outcome:** Next implementer gets exact file responsibilities and an independent conformance plan.
- **Tests and exit evidence:** Check no circular module dependency, second verifier shares no reducer implementation, offline fixture operation and bounded resource controls.
- **Explicit non-goals:** No framework scaffold, dependency install, runtime or inferred language choice during planning.

## Phase 8 — Canonical schemas and byte test vectors

- **Roadmap / dependencies:** creator Phase 1; predecessors: 4, 5, 6, 7.
- **Entry / decision gate:** Accepted D02–D06; exact profile and paths required.
- **Scope and entry points:** Encode only accepted contracts; create synthetic valid/invalid fixtures with exact canonical input/output bytes and expected semantic scope.
- **Target artifacts / paths:** canonical organism/genome/event schemas and fixture paths from D06; schemas/README.md.
- **Data and state updates:** Schema versions and test vectors are synthetic artifacts, separate from #0001 and draft observer/phenotype IDs.
- **Propagation / callbacks / events:** Validators and independent implementations consume the same pinned vector corpus.
- **Reset / clear / failure recovery:** Version fixtures explicitly; clear generated test caches only; retain accepted vector history.
- **User-visible outcome:** Engineers can validate shape and canonical bytes separately from authority and semantics.
- **Tests and exit evidence:** Use a selected standards validator; exercise required/optional bounds, duplicates at parser level, number/Unicode cases and byte comparisons.
- **Explicit non-goals:** No permissive placeholder genesis/event schema, actual birth, or silent rewrite of current experimental schema IDs.

## Phase 9 — Admission and authorization validator

- **Roadmap / dependencies:** creator Phase 1; predecessors: 3, 5, 8.
- **Entry / decision gate:** Accepted D02–D06 and schema/vector evidence from Phase 8.
- **Scope and entry points:** Implement parsing, structural checks, version selection, authority and duplicate/conflict policy as one bounded admission boundary.
- **Target artifacts / paths:** validator/module/test paths fixed by D06.
- **Data and state updates:** Input proposals yield explicitly specified accepted/rejected/uncertain outcomes; names come from accepted contracts.
- **Propagation / callbacks / events:** Only an accepted result is eligible for later append/reducer; no direct UI/adapter mutation.
- **Reset / clear / failure recovery:** Admission failure has no canonical side effects; repeated proposals follow D04 idempotence.
- **User-visible outcome:** Verifier can explain why a candidate event may or may not advance a synthetic history.
- **Tests and exit evidence:** Reject forged/wrong-actor/cross-organism/repeated/oversized/unknown-profile inputs; distinguish missing evidence from invalid evidence.
- **Explicit non-goals:** No consensus network, implicit new event semantics, state persistence or custody override.

## Phase 10 — Deterministic reducer and replay

- **Roadmap / dependencies:** creator Phase 1; predecessors: 5, 6, 8, 9.
- **Entry / decision gate:** Validated event corpus; fixed transition and input-closure rules.
- **Scope and entry points:** Implement pure transitions and replay from immutable synthetic genesis with pinned dependencies and exact arithmetic.
- **Target artifacts / paths:** reducer/replay modules and tests from D06.
- **Data and state updates:** Produce canonical evolving state according to accepted rules; do not mutate genesis or events.
- **Propagation / callbacks / events:** Replay results feed commitment verification and later projections, not external model/sensor calls.
- **Reset / clear / failure recovery:** Rebuild derived state from original input; failed replay returns specified outcome without partially accepting new history.
- **User-visible outcome:** Same inputs produce same state and commitment locally with explicit unavailable-input diagnostics.
- **Tests and exit evidence:** Compare whole replay and permitted incremental replay; altered genesis/events, no hidden time/randomness, boundary arithmetic.
- **Explicit non-goals:** No private/public scope shortcut, relationship, evolution or reproduction beyond accepted minimal event vocabulary.

## Phase 11 — Durable history and checkpoint recovery

- **Roadmap / dependencies:** creator Phase 1; predecessors: 6, 9, 10.
- **Entry / decision gate:** D05 retention/checkpoint policy and D06 persistence contract accepted.
- **Scope and entry points:** Implement accepted append and crash-recovery policy; checkpoint verification only if included in accepted profile.
- **Target artifacts / paths:** history storage/recovery tests and modules from D06.
- **Data and state updates:** Persistent accepted history stays distinct from rejected-input logs and derived cache; writes obey specified durability boundary.
- **Propagation / callbacks / events:** A successful durable admission updates replay/projections; failed writes cannot masquerade as committed events.
- **Reset / clear / failure recovery:** Crash/retry preserves idempotence; recover from validated history/checkpoint; clear caches without erasing origin.
- **User-visible outcome:** Archivist can inspect integrity, missing content and freshness relative to an independently known head.
- **Tests and exit evidence:** Interrupted writes, duplicate retries, corruption, valid older prefix, missing dependencies and invalid checkpoints; state limits explicitly.
- **Explicit non-goals:** No universal freshness from hashes alone, unapproved pruning, distributed storage service or history deletion.

## Phase 12 — Minimal fixture CLI

- **Roadmap / dependencies:** creator Phase 1; predecessors: 7, 8, 9, 10, 11.
- **Entry / decision gate:** D06 CLI contract accepted; admission/replay/recovery evidence from phases 9–11 available.
- **Scope and entry points:** Expose only specified synthetic validation/replay/inspection actions through the already implemented core.
- **Target artifacts / paths:** CLI paths and end-to-end tests fixed by D06; README.md usage examples.
- **Data and state updates:** CLI results are derived displays; printing a value cannot authorize an event.
- **Propagation / callbacks / events:** Command entry → admission/replay/storage boundary → specified output/error; no alternate write path.
- **Reset / clear / failure recovery:** Repeated reads do not mutate history; any fixture reset is isolated and explicit.
- **User-visible outcome:** Another engineer can run a documented offline synthetic replay and inspect a reasoned failure.
- **Tests and exit evidence:** End-to-end success, invalid input, missing data, unknown version, interrupted append/retry and read-only behavior.
- **Explicit non-goals:** No independent-verifier construction in this phase, birth/mint/deploy command or claim of independent conformance.

## Phase 13 — Independent verifier and cross-implementation conformance

- **Roadmap / dependencies:** creator Phase 1; predecessors: 4, 5, 6, 7, 8, 10, 11, 12.
- **Entry / decision gate:** Accepted D02–D06, synthetic vectors from 8 and reference CLI from 12; no pre-existing independent verifier assumed.
- **Scope and entry points:** Build the independently implemented verifier specified by D06, then compare canonical bytes, admission outcomes, state and commitments.
- **Target artifacts / paths:** Independent verifier, conformance fixture runner and report paths fixed by D06.
- **Data and state updates:** Use identical synthetic inputs; output reports are evidence, not new organism events.
- **Propagation / callbacks / events:** Independent code reads accepted profile/vectors rather than importing the reference reducer; compare results across implementations.
- **Reset / clear / failure recovery:** Clear only test outputs; disagreements preserve input corpus and evidence for diagnosis, not retrospective vector edits.
- **User-visible outcome:** Engineer can independently reproduce canonical results and see exactly which guarantees were tested.
- **Tests and exit evidence:** Byte-for-byte vectors, positive replay, rejection classes, tampering, missing dependency, unsupported version and recovery; document any shared low-level library.
- **Explicit non-goals:** No two wrappers around one reducer presented as independence, new protocol defaults, real organism or automatic vector normalization.

## Phase 14 — Phenotype/expression and typed capability profile decision

- **Roadmap / dependencies:** creator Phase 2; predecessors: 8, 13.
- **Entry / decision gate:** Accepted D07 required before negotiation/renderer implementation.
- **Scope and entry points:** Close D07: choose PhenotypeState canonical-versus-derived representation, typed profile/version/units/frames/evidence, selection/policy and semantic expression validity; compare MCP/A2A reuse.
- **Target artifacts / paths:** spec/phenotype.md; spec/perception.md; schemas/successor-design.md; accepted D07 record and exact successor file paths.
- **Data and state updates:** Leave original observer/phenotype JSON and IDs historical; define explicit migration/rejection from boolean claims and opaque references without manufacturing precision or evidence.
- **Propagation / callbacks / events:** Reading state and negotiating do not automatically append events; authenticated interactions use separate admission if defined.
- **Reset / clear / failure recovery:** Expired/cleared negotiation state does not modify organism history; replay needs any recorded selection inputs.
- **User-visible outcome:** Human/LLM/Embodied mock encounters have testable meanings rather than fixed type-to-format assumptions.
- **Tests and exit evidence:** Old true/false/unknown conversion, units/reference-frame mismatch, expired/forged attestation, unsupported capability kind, denied fallback, claimed capacity without actuation authority and semantic counterexamples.
- **Explicit non-goals:** No AI preference claim, automatic raw genome disclosure, or schema reference equality as validity proof.

## Phase 15 — Encounter Receipt and experience-admission contract

- **Roadmap / dependencies:** creator Phase 2; predecessors: 2, 3, 4, 5, 6, 14.
- **Entry / decision gate:** Accepted D02–D05/D07; finalize D13 before receipt/event schemas or adapter code.
- **Scope and entry points:** Resolve Encounter Idempotency and Policy Binding alongside the eight candidate receipt responsibilities, evidence/outcome separation, result terminality and admitted experience contract. Compare encounterId/deterministic commitment and policyRef/accessPolicyCommitment/existing input binding without treating them as selected fields; define identity/payload scope, historical policy inputs and policy changes before admission.
- **Target artifacts / paths:** spec/encounter.md; spec/event-model.md; schemas/successor-design.md; D13 record with concrete successor paths and vectors.
- **Data and state updates:** Immutable encounter evidence and separately bound accepted-event outcome; display receipt is not an unapproved canonical object or authority token.
- **Propagation / callbacks / events:** Fix an acyclic commitment graph: events never require the hash of a receipt that already needs those event hashes. Bind actual pre-state, profile and policy.
- **Reset / clear / failure recovery:** Pending, refused, failed and resolved-with-no-event outcomes differ explicitly; retries/corrections preserve prior evidence and cannot fabricate acceptance.
- **User-visible outcome:** An implementer can trace expression and interaction bytes into either an authorized experience or an explicit non-acceptance without guessing hashes.
- **Tests and exit evidence:** Digest-cycle construction, forged event refs, timeout/concurrent/restart retries, conflicting identifier reuse versus distinct same-content visits, pending versus empty final result, historical policy substitution/change/unavailability, unauthorized disclosure, unavailable accepted LLM bytes and redacted evidence. Specify at-most-once admission/effect without promising exactly-once delivery.
- **Explicit non-goals:** No model regeneration for replay, receipt signature equals authority assumption, schema created before acceptance, or real #0001 records.

## Phase 16 — Capability negotiation

- **Roadmap / dependencies:** creator Phase 2; predecessors: 9, 13, 14, 15.
- **Entry / decision gate:** Accepted D07 selection and error/consent contracts.
- **Scope and entry points:** Implement deterministic selection against permitted profiles and a specified source state.
- **Target artifacts / paths:** negotiator and schema-version adapters from D06/D07.
- **Data and state updates:** Typed successor inputs follow accepted D07/D13 versions and explicit historical mappings; claimed capability is not attested truth, permission or organism event authority.
- **Propagation / callbacks / events:** Selection result supplies input to expression procedure; event admission stays separate.
- **Reset / clear / failure recovery:** Clear bounded negotiation-local state without changing history; denied/pending/expired profile outcomes remain explicit and do not become experience.
- **User-visible outcome:** Observers receive an explicit selected or unsupported result with access constraints.
- **Tests and exit evidence:** Three mocks, empty capabilities, missing/false, reordered requests, unsupported versions, resource limits and no-read mutation.
- **Explicit non-goals:** No observer authentication inferred from type, arbitrary capability scores or external agent orchestration.

## Phase 17 — Expressions, attribution and validity verification

- **Roadmap / dependencies:** creator Phase 2; predecessors: 10, 14, 16, 15.
- **Entry / decision gate:** Accepted D07 and conformance-tested canonical state references.
- **Scope and entry points:** Implement the smallest permitted expressions for the three mocks and verify receipt binding plus profile-specific fidelity.
- **Target artifacts / paths:** expression procedures, verifier and fixtures from D07; spec/phenotype.md.
- **Data and state updates:** Use accepted D07/D13 successor expression/state references and exact input/output bytes; do not reinterpret historical outputRef as expressionOutputDigest or old phenotype.schema.json as PhenotypeState.
- **Propagation / callbacks / events:** Outputs derive from canonical state; verification separates attribution, reproducibility and semantic validity.
- **Reset / clear / failure recovery:** Clear render caches without replacing canonical source; unavailable dependencies produce scoped failure.
- **User-visible outcome:** Different machine/human expressions can be traced and validated against the same synthetic organism state.
- **Tests and exit evidence:** Three mocks against one source state; output/profile/policy substitution, legitimate divergent views, semantic counterexamples, deterministic procedure repeat and recorded model-byte integrity without regenerating the model.
- **Explicit non-goals:** No live robots, art marketplace, model-output consensus or observer-specific canonical truth.

## Phase 18 — Encounter evidence, receipt outcome and admission bridge

- **Roadmap / dependencies:** creator Phase 2; predecessors: 9, 10, 13, 15, 16, 17.
- **Entry / decision gate:** Accepted D13 schema/byte/authority contract and D07 typed profile; existing core extension rules from D04.
- **Scope and entry points:** Implement only the accepted successor evidence/receipt/outcome and experience-event bridge through existing admission; isolate fixtures from #0001.
- **Target artifacts / paths:** Successor schemas, encounter admission adapter, evidence storage and tests at exact D13/D06 paths; original JSON files remain unchanged.
- **Data and state updates:** Retain bounded accepted expression/interaction bytes or available checked references; record actual accepted event refs only under defined terminality.
- **Propagation / callbacks / events:** Negotiated expression → interaction evidence → authorized proposal → accepted event → separately linked outcome; no bypass into memory/reducer.
- **Reset / clear / failure recovery:** Crash/retry/rejection produces no duplicate canonical effect; pending and terminal no-event are distinguishable; missing private bytes limit replay explicitly.
- **User-visible outcome:** Observer can inspect why an encounter did or did not become experience and verify its links without a cyclic hash dependency.
- **Tests and exit evidence:** Receipt/event cycle rejection, forged links, source-state/historical-policy substitution, policy changes before admission, denied disclosure, duplicate/reordered outcomes and exact captured LLM-byte replay. Exercise timeout after acceptance, concurrent retries and restart: recover the same outcome without duplicate experience/effect; reject conflicting identifier reuse and preserve distinct same-content visits.
- **Explicit non-goals:** No arbitrary new event semantics, public disclosure by default, model re-query, real sensor truth or organism birth.

## Phase 19 — Memory and causal relationship decision

- **Roadmap / dependencies:** creator Phase 3; predecessors: 6, 13, 17, 18.
- **Entry / decision gate:** Accepted D08 required before memory/synapse transitions.
- **Scope and entry points:** Close D08 memory/synapse rules for admitted encounter experience: classification, consent, relationship formation/revocation and D13 Meaningful Consequence. Define an observable later-expression/behavior feature and justified deterministic rule before implementation; counter/timestamp/digest-only changes do not suffice and arbitrary scores remain excluded.
- **Target artifacts / paths:** spec/memory.md; spec/synapse.md; proposed D08 record.
- **Data and state updates:** Name canonical versus private/local/derived components under D05; define corrections without erasing past records.
- **Propagation / callbacks / events:** Specify which admitted interactions affect future behavior/expression and which are merely local summaries.
- **Reset / clear / failure recovery:** Define forgetting/projection rebuild and counterparty refusal independently from accepted history retention.
- **User-visible outcome:** Reader can follow one interaction into an authorized persistent effect and see privacy limits.
- **Tests and exit evidence:** Cases for unilateral claim, mutual consent, duplicate interaction, revoked permission, unavailable private content and misleading summary.
- **Explicit non-goals:** No numeric score invented for schema completeness, friend-list substitution or real personal-data ingestion.

## Phase 20 — Memory projections and privacy enforcement

- **Roadmap / dependencies:** creator Phase 3; predecessors: 6, 9, 10, 19.
- **Entry / decision gate:** Accepted D05/D08 data access and transition rules.
- **Scope and entry points:** Implement minimal permitted memory retention/projection and access enforcement on synthetic data.
- **Target artifacts / paths:** memory/projection/privacy tests from accepted D06/D08 layout.
- **Data and state updates:** Canonical records, encrypted/private inputs if supported, local memory and lossy summaries remain distinguishable.
- **Propagation / callbacks / events:** Only authorized encounter experience updates declared projections; receipt links preserve causal attribution, and lossy summaries cannot replace accepted input bytes.
- **Reset / clear / failure recovery:** Rebuild projections or clear local summaries under policy; no promise of deleting already public information.
- **User-visible outcome:** Authorized and public readers receive appropriately scoped views and replay diagnostics.
- **Tests and exit evidence:** Access denied, missing input/key, stale summary, disclosure limits and replay under each specified permission scope.
- **Explicit non-goals:** No undeclared encryption design, production private memory or treating digest possession as access authorization.

## Phase 21 — Causal synapse transitions

- **Roadmap / dependencies:** creator Phase 3; predecessors: 9, 10, 19, 20.
- **Entry / decision gate:** Accepted D08 relationship and causal-effect table.
- **Scope and entry points:** Implement only defined formation/update/revocation and observable causal effects, preserving counterparty evidence.
- **Target artifacts / paths:** synapse transitions and causal fixtures from D08.
- **Data and state updates:** Relationship state derives from admitted interactions; no hidden affinity scoring or fabricated mutual consent.
- **Propagation / callbacks / events:** Demonstrate declared effect on memory/behavior/expression; negotiate views through the existing boundary.
- **Reset / clear / failure recovery:** Permission changes stop future effects as specified without deleting past relationship evidence.
- **User-visible outcome:** Observer can inspect why a relationship affects an expression or behavior.
- **Tests and exit evidence:** Duplicate/refused encounter, unilateral or revoked consent, privacy/resource cases and causal-effect trace; no effect from a merely signed or pending receipt.
- **Explicit non-goals:** No follower graph presented as synapses, arbitrary trust metric or unsupported evolution.

## Phase 22 — Encounter-to-later-expression causal demonstration

- **Roadmap / dependencies:** creator Phase 3; predecessors: 13, 17, 18, 19, 20, 21.
- **Entry / decision gate:** Accepted D07/D08/D13 and validated core, expression, receipt, memory and synapse fixtures.
- **Scope and entry points:** Demonstrate the full encounter loop with human, language and embodied mocks; make the accepted experience’s effect visible in a later negotiated expression.
- **Target artifacts / paths:** Integration fixture/report paths agreed in D06/D08/D13; README.md demonstrated-status update only after tests pass.
- **Data and state updates:** Use one synthetic initial state and pinned inputs; accepted history and derived effects are separate from observer-specific presentations.
- **Propagation / callbacks / events:** Encounter A → accepted experience → memory/synapse rule → Encounter B expression; no-experience and rejected-experience controls omit the defined effect.
- **Reset / clear / failure recovery:** Replay the same accepted bytes to the same later result; clear only derived caches; repeated encounter cannot compound an idempotent event.
- **User-visible outcome:** An engineer observes why this organism behaves differently after an encounter; this is the first primary product milestone, beyond identity/log infrastructure.
- **Tests and exit evidence:** Positive causal loop with a specified observable expression/behavior feature, no-event and rejected-event controls, and targeted causal-rule ablation. Match initial state, later request, observer profile, policy and external inputs; vary only admitted experience and its consequences. Replay reproduces the effect; counter/timestamp/digest-only differences fail. Also verify private-input unavailable, cross-observer fidelity and mutation-free read-only encounter.
- **Explicit non-goals:** No claim of AI appreciation, adaptation without a criterion, Darwinian selection, open-ended evolution or live #0001.

## Phase 23 — Within-individual change and adaptation decision

- **Roadmap / dependencies:** creator Phase 4; predecessors: 5, 19, 21, 22.
- **Entry / decision gate:** Accepted D09 before mutation/evolution implementation.
- **Scope and entry points:** Close D09 on mutable/heritable components and deterministic changes driven by encounter experience; distinguish ontogeny from measured adaptation and reserve population claims for D14.
- **Target artifacts / paths:** spec/evolution.md; spec/genome.md; proposed D09 record.
- **Data and state updates:** Genesis remains immutable; evolved/heritable/transient state boundaries are explicit.
- **Propagation / callbacks / events:** Experience affects only declared transitions and later eligible inheritance inputs.
- **Reset / clear / failure recovery:** Rule changes are versioned decisions; reversal by new allowed events only, never genesis rewrite.
- **User-visible outcome:** Engineer can explain what evolves, why, and which future child inputs can use it.
- **Tests and exit evidence:** Unauthorized/disallowed component changes, control without experience, justified environmental performance criterion, pinned randomness if any and eligible inheritance inputs; no arbitrary fitness score.
- **Explicit non-goals:** No fitness/biology claim, random aesthetics as evolution, or LLM-generated canonical mutation by default.

## Phase 24 — Deterministic individual change and adaptation transitions

- **Roadmap / dependencies:** creator Phase 4; predecessors: 9, 10, 21, 23.
- **Entry / decision gate:** Accepted D09 and its expected-result vectors.
- **Scope and entry points:** Implement the accepted bounded rule set through normal admission/replay.
- **Target artifacts / paths:** evolution transition module and vectors from D09.
- **Data and state updates:** Produce new EvolutionState/HeritableState only as defined; preserve original genesis bytes.
- **Propagation / callbacks / events:** Authorized experience triggers specified changes; phenotype remains a view of the resulting state.
- **Reset / clear / failure recovery:** Rebuild by replay; retries do not reapply mutation; unsupported rule versions fail explicitly.
- **User-visible outcome:** Replay explains each synthetic within-individual change and, only if the accepted criterion is met, reports limited adaptation evidence rather than a Darwinian evolution claim.
- **Tests and exit evidence:** Genesis invariant across sequences, rejected unauthorized changes, deterministic randomness if permitted and cross-implementation vectors.
- **Explicit non-goals:** No child creation, additional mutation operators or behavior outside accepted rules.

## Phase 25 — Reproduction and lineage contract decision

- **Roadmap / dependencies:** creator Phase 5; predecessors: 3, 23, 24.
- **Entry / decision gate:** Accepted D10 before any child-generation code.
- **Scope and entry points:** Define eligible parent states/contributions, parent consent, child identity, inherited bytes, mutation inputs, graph rules and partial/retried birth semantics.
- **Target artifacts / paths:** spec/reproduction.md; spec/lineage.md; proposed D10 record.
- **Data and state updates:** Draft child birth contract uses synthetic examples; generation remains undefined unless D10 explicitly defines it.
- **Propagation / callbacks / events:** Parent evidence and child acceptance interact only through specified causal/transaction boundaries; no assumed distributed atomicity.
- **Reset / clear / failure recovery:** Define failure cleanup/retry without changing accepted parents or creating duplicate accepted origins.
- **User-visible outcome:** Reader can prove what a child inherited and distinguish a child from a replica or conflicting head.
- **Tests and exit evidence:** Multi-parent ordering, absent parent, unauthorized reference, cycle, duplicate child retry, partial publication and contribution refusal.
- **Explicit non-goals:** No implicit two-parent restriction, lineage spam acceptance, organism reproduction before this gate or #0001 birth.

## Phase 26 — Synthetic child creation and failure handling

- **Roadmap / dependencies:** creator Phase 5; predecessors: 9, 10, 24, 25.
- **Entry / decision gate:** Accepted D10, parent-state commitments and synthetic birth fixture contract.
- **Scope and entry points:** Implement accepted inheritance and child-origin creation only in synthetic conformance fixtures.
- **Target artifacts / paths:** child-creation paths and fixture corpus from D10.
- **Data and state updates:** Child is new; parent identities/genesis persist; inherited inputs reference the exact approved parent states.
- **Propagation / callbacks / events:** Admission records only authorized outcomes; parent-side events occur only if D10 requires them.
- **Reset / clear / failure recovery:** Retry/failure follows D10 idempotence and compensation; never erase an accepted parent or child history.
- **User-visible outcome:** Verifier can reproduce a child from documented parent state/rules and observe unchanged parents.
- **Tests and exit evidence:** Invalid parent consent, identical retry, partial failure, wrong state references and deterministic inherited output.
- **Explicit non-goals:** No live #0001, breeding UI, undeclared inheritance or general consensus/transaction coordinator.

## Phase 27 — Lineage traversal and independent verification

- **Roadmap / dependencies:** creator Phase 5; predecessors: 11, 25, 26.
- **Entry / decision gate:** Accepted D10 graph/generation/unavailable-ancestor policy.
- **Scope and entry points:** Traverse authenticated ancestry and distinguish organism lineage from software forks/deployment replicas.
- **Target artifacts / paths:** lineage verifier/query paths from D10; spec/lineage.md.
- **Data and state updates:** Derived graph indexes reference canonical birth evidence; no ancestry edits through index mutation.
- **Propagation / callbacks / events:** Queries expose validated, unavailable or invalid evidence according to exact accepted contracts.
- **Reset / clear / failure recovery:** Rebuild graph indexes from history; missing ancestors cannot be silently dropped to produce a false complete lineage.
- **User-visible outcome:** Independent observer traces child inputs to parent states with explicit gaps.
- **Tests and exit evidence:** Tampered edges, cycles, duplicate references, missing/private ancestors, version boundaries and parent-state mismatch.
- **Explicit non-goals:** No invented generation formula, universal ancestor availability or repository fork equals reproduction.

## Phase 28 — Population, ecology and selection study decision

- **Roadmap / dependencies:** creator Phase 5E; predecessors: 6, 22, 24, 25, 26, 27.
- **Entry / decision gate:** Accepted D09/D10 and synthetic inheritance/lineage evidence; D14 accepted before population experiment implementation.
- **Scope and entry points:** Define justified environment/resources, heritable variables, variation, reproductive opportunity and differential success, controls, replicate/stopping policy and uncertainty reporting. Record the long-term D14 Niche Construction question: Can organisms create new ecological niches that alter the future selection pressures of other organisms? A future study must distinguish organism-caused environmental feedback from scripted changes; no mechanism or additional experiment is selected now.
- **Target artifacts / paths:** spec/ecology.md; spec/evolution.md; proposed D14 record and preregistered experiment/measurement design.
- **Data and state updates:** Population/environment state is distinct from organism canonical histories; selection metrics are observations, not arbitrary canonical fitness fields.
- **Propagation / callbacks / events:** Encounter experiences may affect measured individual and inherited outcomes only through accepted rules; proposed births are not counted as offspring.
- **Reset / clear / failure recovery:** Bound runs/resources, retain all participant histories and report censored/missing observations; no lifecycle death or extinction shortcut.
- **User-visible outcome:** Reviewer can distinguish ontogeny, adaptation, heritable change, Darwinian selection and unproven open-endedness.
- **Tests and exit evidence:** Matched neutral/no-selection treatment, no-experience or inheritance ablations, schedule/seed reproducibility, offspring-count validity and resource-bound scenarios.
- **Explicit non-goals:** No invented market-value objective, self-replication outside fixtures, organism death, empirical claim from a diagram or automatic birth requirement.

## Phase 29 — Bounded synthetic population experiment

- **Roadmap / dependencies:** creator Phase 5E; predecessors: 22, 24, 26, 27, 28.
- **Entry / decision gate:** Accepted D14 experimental protocol, exact implementation paths and measurement criteria; use synthetic organisms only.
- **Scope and entry points:** Implement the minimum isolated experiment, run accepted controlled comparisons and report positive, negative or null results without changing the criteria afterward.
- **Target artifacts / paths:** Population simulator/measurement/fixture/report paths fixed by D14; spec/ecology.md evidence update if demonstrated.
- **Data and state updates:** Record environments, accepted offspring, inherited variables, encounter schedules and bounded resources separately from canonical lineage.
- **Propagation / callbacks / events:** Compare heritable variation and reproductive outcomes between treatments; trace any individual-learning versus inherited effect via accepted encounter history.
- **Reset / clear / failure recovery:** Restart only isolated runs using recorded inputs; preserve prior run evidence, stops and failed outcomes; never erase or kill #0001.
- **User-visible outcome:** Limited reproducible evidence can support a specified selection/adaptation claim or show its failure; it cannot prove open-ended evolution.
- **Tests and exit evidence:** Replicates/controls, reproducibility and uncertainty per D14; invalid/cyclic lineage, duplicate offspring, unavailable input, resource exhaustion and no-selection control.
- **Explicit non-goals:** No live population, external infrastructure, economic incentives, arbitrary fitness, death semantics or indefinite novelty claim. Niche-construction dynamics require a separately scoped future study and are not added to this experiment or birth gates. Finite experiments do not establish open-ended evolution.

## Phase 30 — Embodiment and attestation policy decision

- **Roadmap / dependencies:** creator Phase 6; predecessors: 6, 9, 17, 21, 22.
- **Entry / decision gate:** Accepted D11 before simulated-body adapter.
- **Scope and entry points:** Define simulated body identity, simultaneous-body authority, sensor claims, verifier policies, actuation separation and bounded safety behavior.
- **Target artifacts / paths:** spec/embodiment.md; docs/threat-model.md; proposed D11 record.
- **Data and state updates:** Body-local memory and organism records are separated; no real keys/hardware endpoints presumed.
- **Propagation / callbacks / events:** Sensor evidence enters admission as scoped claims; phenotype motion output does not automatically actuate.
- **Reset / clear / failure recovery:** Disconnect/crash/body replacement preserves organism identity; policy defines stale-input rejection and recovery.
- **User-visible outcome:** Operator understands what evidence can support and which commands remain prohibited.
- **Tests and exit evidence:** Forged body, replayed sensor packet, simultaneous bodies, unavailable witness, out-of-range action and body loss.
- **Explicit non-goals:** No physical actuation, network topology choice, hardware purchase or attestation proves reality claim.

## Phase 31 — Simulated embodiment adapter

- **Roadmap / dependencies:** creator Phase 6; predecessors: 16, 17, 21, 30.
- **Entry / decision gate:** Accepted D11 with mock evidence only; core remains independently usable.
- **Scope and entry points:** Connect one bounded simulated body/observer to negotiation and event admission; demonstrate controlled interaction loop.
- **Target artifacts / paths:** simulator adapter and fixtures from D11.
- **Data and state updates:** Simulation state is not automatically canonical; admitted experiences obey evidence and authority rules.
- **Propagation / callbacks / events:** Environment claim → admission → declared state effect → expression → separately permitted simulated action.
- **Reset / clear / failure recovery:** Stop/reset simulation only; replay organism state separately and reject stale sensor retries per policy.
- **User-visible outcome:** A visible synthetic encounter demonstrates body-independent continuity and explicit evidence limits.
- **Tests and exit evidence:** Disconnect/reconnect, unauthorized actuation, multiple mock bodies, false claims and replay of admitted experiences.
- **Explicit non-goals:** No physical hardware, production sensors, vehicle control, autonomous external actions or death semantics.

## Phase 32 — Optional anchoring decision

- **Roadmap / dependencies:** creator Phase 7; predecessors: 11, 13, 27.
- **Entry / decision gate:** D12 anchoring subset accepted; skipping is an explicit valid outcome.
- **Scope and entry points:** Evaluate whether independent witnesses/content-addressed archives suffice and whether any blockchain adds a justified property; review standard versions before selection.
- **Target artifacts / paths:** proposed D12 record; storage/chain placement comparison.
- **Data and state updates:** Specify what is public, committed, encrypted or local; separate organism identity from token custody.
- **Propagation / callbacks / events:** An anchor records evidence about a history head; no chain event bypasses core authority rules.
- **Reset / clear / failure recovery:** Define outage/reorganization/transfer and archival recovery assumptions; skipped anchoring leaves core unchanged.
- **User-visible outcome:** Creator receives evidence-based anchor-or-skip options, costs and trust limits without token economics.
- **Tests and exit evidence:** Compare claims under unavailable storage, reorg, stale head, token transfer/burn and unverifiable sensor input.
- **Explicit non-goals:** No chain deployment, wallet setup, minted token, marketplace or forced blockchain dependency.

## Phase 33 — Optional isolated anchoring adapter

- **Roadmap / dependencies:** creator Phase 7; predecessors: 32.
- **Entry / decision gate:** Execute only if D12 chooses an adapter and its exact profile is accepted; otherwise record deliberate skip.
- **Scope and entry points:** Implement only the selected adapter boundary in isolated fixtures after core independence is demonstrated.
- **Target artifacts / paths:** adapter/mock contract fixtures chosen by D12.
- **Data and state updates:** External references bind specified core commitments without changing universal identity or private-data scope.
- **Propagation / callbacks / events:** Observe/submit mock anchors via adapter; canonical transitions still require normal admission.
- **Reset / clear / failure recovery:** Adapter reset/reorg does not rewrite core history; retry external submission under accepted policy.
- **User-visible outcome:** Verifier can compare local history evidence with adapter evidence, or read an explicit skip result.
- **Tests and exit evidence:** Wrong head, stale anchor, reorg, inaccessible storage and token ownership changes; replay core with adapter disabled.
- **Explicit non-goals:** No live transaction, deployment, mint, credentials or mandatory NFT dependency.

## Phase 34 — Freeze, release and birth procedure decision

- **Roadmap / dependencies:** creator Phase 8; predecessors: 1, 13, 17, 20, 21, 24, 26, 27, 31, 32, 33 if selected, 22.
- **Entry / decision gate:** D01–D11 and D13 accepted for the tested encounter profile; only the D12 anchoring subset is required at entry. Close D12 ceremony semantics before audit. D14 evidence additionally required if a Darwinian-selection claim is selected.
- **Scope and entry points:** Define exact candidate selection, freeze authority, signature/key attribution, publication evidence and birth acceptance/retry rules; compare unresolved alternatives and obtain creator acceptance.
- **Target artifacts / paths:** Proposed D12 ceremony record; spec/GENESIS.md clarifications and procedure specification, preserving existing invariants.
- **Data and state updates:** Contracts and acceptance tables only; no final genome, organism identifier, real signature or born-state record.
- **Propagation / callbacks / events:** Accepted D12 supplies criteria to audit 35 and rehearsals 36–38; recommendation alone cannot replace creator acceptance.
- **Reset / clear / failure recovery:** Specify failed/partially published candidate supersession, repeat authorization and idempotent birth acceptance without deleting evidence.
- **User-visible outcome:** Creator can decide exactly what actions constitute freeze, release and birth before testing readiness to perform them.
- **Tests and exit evidence:** Tabletop unauthorized signer, absent archive, partial release, optional-anchor skip, duplicate birth request and contradictory candidate evidence.
- **Explicit non-goals:** No actual freeze/signature/release/birth, implicit architecture acceptance, lowered birth gate or modification of past origin records.

## Phase 35 — Birth evidence and long-term recovery audit

- **Roadmap / dependencies:** creator Phase 8; predecessors: 1, 13, 17, 20, 21, 24, 26, 27, 31, 32, 33 if selected, 34, 29 if a Darwinian-selection claim is selected.
- **Entry / decision gate:** D01–D13 accepted, including ceremony contract from 34; all original birth gates require evidence. A selected Darwinian-selection claim also requires D14 and phase 29; otherwise explicitly leave it unproven.
- **Scope and entry points:** Audit all original birth gates plus the encounter/evidence/admission/causal-loop demonstration; check any claimed population selection against its actual controlled evidence. No requirement is silently waived.
- **Target artifacts / paths:** spec/GENESIS.md; proposed birth-readiness report; D12 birth subset.
- **Data and state updates:** Evidence matrix references exact tested artifact revisions; no candidate or ALIVE state assigned.
- **Propagation / callbacks / events:** Only complete verified gates permit a recommendation for a separate freeze decision; no gate auto-waived.
- **Reset / clear / failure recovery:** Failed audit remains UNBORN; new evidence is appended and old failures remain attributable.
- **User-visible outcome:** Creator sees go/no-go evidence and recovery/archive feasibility without premature birth.
- **Tests and exit evidence:** Independent full replay and expression/lineage checks; adversarial corpus, recovery exercise, licence scope and all minimum gates.
- **Explicit non-goals:** No claiming implementation success from docs, lowering birth requirements silently, freeze or release action.

## Phase 36 — Candidate freeze rehearsal

- **Roadmap / dependencies:** creator Phase 8; predecessors: 35.
- **Entry / decision gate:** D12 accepted candidate/freeze procedure; real freeze requires separate current authorization.
- **Scope and entry points:** Rehearse exact artifact selection, version pinning, digest/signature domains, key attribution and candidate supersession on synthetic data.
- **Target artifacts / paths:** proposed freeze manifest/procedure and synthetic candidate fixtures.
- **Data and state updates:** Use clearly synthetic candidate labels; never assign #0001 a final genome or real birth identity during rehearsal.
- **Propagation / callbacks / events:** A manifest ties spec, vectors and implementation evidence; computed practice commitments are not a real birth.
- **Reset / clear / failure recovery:** Failed candidate supersession is explicit and attributable; no rewrite of meaningful origin commits.
- **User-visible outcome:** Creator can review an exact freeze procedure and identify missing evidence before authorizing real freeze.
- **Tests and exit evidence:** Reproduce bytes on independent tools; tampered artifact, unavailable dependency, missing signature attribution and repeated rehearsal.
- **Explicit non-goals:** No final #0001 genome/identity, signed release, tag, force-push or implied birth from a candidate hash.

## Phase 37 — Release and archival ceremony rehearsal

- **Roadmap / dependencies:** creator Phase 8; predecessors: 36.
- **Entry / decision gate:** Accepted D01 rights/authority and D12 publication procedure; separate authorization before publication.
- **Scope and entry points:** Specify reviewed release inputs, signature verification, durable archives, independent witnessing and optional anchor ordering.
- **Target artifacts / paths:** proposed release/archive/recovery runbook and rehearsal report.
- **Data and state updates:** Rehearsal retains evidence only; no fabricated timestamp, transaction or publicly released artifact claim.
- **Propagation / callbacks / events:** Publication evidence would support attribution under stated assumptions; it does not itself perform birth.
- **Reset / clear / failure recovery:** Failure/partial publication recovery preserves already observable evidence and distinguishes supersession from erasure.
- **User-visible outcome:** Creator can approve a concrete future release procedure with known retention/trust limits.
- **Tests and exit evidence:** Offline restore, signature/key attribution, missing archive, different local timestamps, partial publication and optional-anchor skip.
- **Explicit non-goals:** No release, deployment, tag, licence grant, external messages or independent timestamp claim without evidence.

## Phase 38 — Birth ceremony and acceptance rehearsal

- **Roadmap / dependencies:** creator Phase 8; predecessors: 35, 36, 37.
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

| Risk | Required boundary / evidence |
| --- | --- |
| Identity scope buries the artistic loop | Encounter requirements 2 and causal-loop milestone 22; identity/replay are prerequisites, not the product result |
| Receipt↔event commitment cycle | Accepted D13 graph at 15, adversarial bridge tests at 18 |
| LLM nondeterminism or unavailable bytes | Exact admitted bytes/references and explicit unavailable/unauthorized replay; no model regeneration |
| Capability spoofing and format rigidity | D07 typed units/frames/evidence, bounded work and versioned compatibility at 14; no trust/actuation from claims |
| Phenotype/expression conflation | D07 representation decision; original phenotype.schema.json stays a historical expression descriptor |
| Non-causal synapse or adaptation claim | Experience/no-experience controls at 22; D09 criterion for adaptation |
| Inheritance called natural selection | Distinct D14 decision/experiment at 28–29 with controls and actual accepted reproduction counts |
| Fake open-endedness or death shortcut | Bounded claims, no universal novelty metric, no lifecycle death/EXTINCT transition |
| Private/public replay and long histories | D05/D13/D14 retention/budgets/archive policies; Merkle roots do not store data or prove latest heads |
| Missing paths/oversized implementation | Accepted D06/domain file map and one bounded phase at a time; split on newly discovered independent contracts |
| Output/number compatibility | Same totalSpec/phasePlan paths; new revision result; explicit old→new map, never silent task remapping |
| Birth gate creep or bypass | Original minimum gates remain; selection evidence only for that claim; separate actual ceremony authorization |

## Handoff and review state

Use actual source/decision evidence, not this plan as proof of implemented behavior.
Preserve original task snapshots; new completion gates belong to this revision.
No implementation, child task, external action or real organism is created by
planning completion. PR creation is separately authorized by the current user
request and happens after the planning review, without merge.

Prepared for phase_plan_validate. All tests above are future criteria; only
static documentation/source checks are performed during this revision.

## Revision validation history

Review 1: 90/100, needs_revision. ER-01 corrected stale inline phase references
at 3 and 9; ER-02 corrected Phase 34 entry to require only the already accepted
D12 anchoring subset rather than the ceremony contract it creates. All numbered
dependencies and old→new mappings remain unchanged. Revalidation follows in
[the review record](encounter_phase_plan_validation.md).

Revalidation: 96/100 for conditional planning; ER-01/ER-02 resolved. Original
protocol decisions remain gated. See [review evidence](encounter_phase_plan_validation.md).
