# Phase 2 — Encounter requirements and evidence boundary

STATUS: RESEARCH REQUIREMENTS WALKTHROUGH, NOT EXECUTABLE EVIDENCE.
Date: 2026-09-21. All cases below are expected outcomes for synthetic fixtures;
no organism, event, identifier, digest or actual encounter is fabricated.
Source: [encounter](../../spec/encounter.md), [perception](../../spec/perception.md),
[phenotype](../../spec/phenotype.md), existing Phase 2 and Phase 22 acceptance.
D01 research is complete; rights decisions remain open. D13 is not accepted here.

## Three observers, one canonical source

Use one symbolic initial state S and a pinned later request/profile/policy/input
set. A/B are explanatory labels, not identifiers or wire values. No fixed mapping
from observer type to format is implied. D07 must select actual profiles/fidelity
rules; D08 must specify the memory/synapse effect before code.

| Mock | Encounter A expected negotiation/expression | Encounter B after admitted A | Matched control |
| --- | --- | --- | --- |
| Human | Select one supported permitted presentation; reference S and actual procedure/input/output evidence. | A specified observable expression feature changes through the accepted causal rule. | Same initial state and later inputs, A not admitted: defined effect absent. |
| Language | Present permitted machine-readable semantics; no actual LLM service required. | Later semantic/behavior feature reflects only the admitted causal change. | Rejected A has no canonical effect; no preference inferred from text. |
| Embodied | Negotiate bounded spatial/trajectory representation only if supported/permitted; never actuator authority. | Defined spatial/behavior expression can reflect admitted experience under the profile. | No experience means no defined effect; no real robot or sensor truth asserted. |

Integrity checks bind bytes and references; semantic fidelity checks apply D07's
profile constraints; causal checks isolate D08's transition under matched controls
and targeted rule ablation. None follows automatically from a signature/digest.
Counter-, timestamp- or digest-only differences do not satisfy the Phase 22 milestone.
A rejected first encounter need not erase local evidence; it cannot mutate canonical
memory/synapse. Different observer views remain attributable to one canonical state.

## Eight candidate receipt responsibilities

| Exact candidate name | Required question/evidence | Decision consumers |
| --- | --- | --- |
| organismStateRef | Which pre-encounter organism/state is bound? | D02/D03/D13 |
| observerProfileCommitment | Which claimed/attested profile was actually used? | D07/D13 |
| negotiationProtocolVersion | Which negotiation semantics and policy binding apply? | D07/D13 |
| expressionProcedureRef | Which bounded procedure/dependencies generated expression? | D07/D13 |
| expressionInputCommitment | Are selected inputs and historical policy context bound and available to authorized verification? | D03/D05/D13 |
| expressionOutputDigest | Do retained accepted bytes match, separately from fidelity? | D03/D07/D13 |
| interactionDigest | What consented bounded interaction evidence is bound, with what truth limits? | D05/D13 |
| resultingEventRefs | Which events were actually accepted, ordered and resolved? | D04/D13 |

No requirement makes all eight separate canonical fields. D13 chooses the minimal
acyclic evidence/admission/outcome graph. Pending differs from a final empty result;
events cannot hash a receipt that already depends on their hashes. Stable encounter
identity and policy binding options remain unresolved, not additional frozen fields.

## Adversarial and control walkthrough

| Case | Expected observable outcome | What it does not prove |
| --- | --- | --- |
| Read-only or unsupported capability | Explicit permitted fallback/refusal; no automatic experience. Missing capability stays unknown. | Unknown is not false and raw private memory is not fallback. |
| Signed but unauthorized proposal | Reject admission; original canonical state unchanged. | Signature does not grant authority or capability. |
| Timeout after admission, concurrent retry, restart | Recover the same accepted outcome without a second causal application. | No exactly-once network delivery claim. |
| Same identifier with different payload | Reject conflict under the selected identity scope. | D13 identity/key scope is not decided by this table. |
| Distinct encounters with identical bytes | Keep separate visit identities where the accepted contract requires them. | Content equality alone is not encounter equality. |
| Historical policy substitution / changed policy | Verifier detects substitution; admission follows defined policy-change rules. | Commitment integrity alone does not prove enforcement. |
| Missing private policy/input/output bytes | Explicit unavailable/unauthorized verification scope, no invented success. | Digest cannot reconstruct content. |
| Model-generated output | Retain exact admitted bytes; replay consumes them without calling the model. | Model output is not deterministic consensus or real-world truth. |
| Forged event link / receipt-event cycle | Reject invalid attribution or construction. | Display receipt cannot manufacture acceptance. |
| No experience / rejected experience / rule ablation | Defined later-expression effect absent under matched later inputs. | A count increment is not meaningful causal consequence. |

## Minimality / Complexity Justification

Three mocks are required by existing acceptance; they are not three services or
an ontology. Retain controls and evidence boundaries to preserve causal attribution.
Defer algorithms, grammars, IDs, capability descriptors and scores until accepted
contracts need them. One matrix suffices. New failure mode is mistaking expected
outcomes for tests; status and result explicitly distinguish documentary coverage
from executable evidence. Phase 22 remains unimplemented.
