# D09 — bounded label-conditioned individual adaptation

STATUS: ACCEPTED for public synthetic experiment, 2026-10-08 under
[delegation](2026-10-08-synthetic-delegation.md). This does not accept a real birth
profile or claim learning, intelligence, natural selection or generalization.

## Exact successor and state boundary

New origins MAY select rules=adaptation-v1. Origin/state/envelope fields, D03
hash/proof domains, D04 ordering/authority and D05 budgets are unchanged.
Existing core-v1/encounter-v1 origins and their reducers retain exact meaning;
no upgrade/migration event is introduced. No in-place change of genome/origin.

Under adaptation-v1 only rotate-v1 and experience-v1 are admissible. signal-v1
is unsupported even with an otherwise authorized signature. Experience uses the
unchanged D13 evidence-v1/observer-v1/policy-v1/expression-v1 contract. Validate
proof/parent/sequence/evidence and encounter idempotency as D13. Exact prior
encounter retry returns duplicate before freshness checking. Changed nonce reuse
remains invalid. For a new experience require evidence.sourceState to equal the
event's verified parent state by D03 state commitment; otherwise reject invalid.
Normal signed sibling conflict handling remains a hold, never a selected winner.

Reducer: accepted experience sets current state.signal = evidence.interaction.motif
(integer 0..3), alongside ordinary sequence/head advance. Rotation changes authority
only. No direct external mutation hook, new event kind or canonical state fields.
Malformed/disallowed/unauthorized proposals do not change state. Retrying an
accepted experience cannot apply another mutation. Corrections require a fresh
source, new nonce and newly authorized event. Replay never calls models or sensors.

Current verified signal alone is eligible heritable input for D10; original genome
is still birth input. Message, memory, synapse, authority, experience history and
body identity are NOT inherited by this decision. D10 must separately define
parent consent, child creation and verification before reproduction is implemented.

## Task and expected vectors

Environment is a synthetic four-category cue/response task, not an attested
physical environment. A fixed trial supplies target t in {0,1,2,3} as the retained
interaction motif; the response is the signal exposed by expression-v1. Success
is exact signal==t, a direct observable task condition with no arbitrary fitness
score. This rule stores the last label and need not generalize or improve across
changing targets. Report only bounded label-conditioned within-individual fit.

Independent literal expectations, selected before implementation:

| Initial/current signal | Authorized fresh motif | Result | No/rejected experience control |
| --- | --- | --- | --- |
| 0 | 2 | 2 (miss -> hit) | 0 (miss) |
| 2 | 1 | 1 (miss -> hit) | 2 (miss) |
| 1 | 3 | 3 (miss -> hit) | 1 (miss) |
| 3 | 3 | 3 (already hit; no improvement claim) | 3 (hit) |

Phase24 must sign public synthetic vectors with fresh expressions, compare every
prefix through independent JS/Python replay, preserve exact genesis bytes, test
duplicates/rebased retry, stale source, unauthorized proof, unsupported rule and
forbidden signal override, and expose the response task separately from hashes.
Paths: fixtures/adaptation-v1/{origin.json,000001.json..000004.json,expected.json,
SYNTHETIC,README.md}; schemas/synthetic/adaptation-v1/{origin,event,state}.schema.json;
tools/build_adaptation_vectors.py; tests/adaptation.test.mjs. Successor schemas reuse
existing evidence shape/refs explicitly, never edit historical schema bytes.

## Minimality / Complexity Justification

Minimum mechanism is one existing integer updated by one existing experience
event under a new rules literal. Generic mutation engines, random operators,
additional heritable wrappers, model training, reward ledgers and migration systems
are rejected: no accepted experiment requires them. Retained version literal,
fresh-source validation and negative/control/independent vectors preserve
compatibility, causality and verifiability; removing them breaks those requirements.
No dependency added. New failure modes are stale evidence rejection, self-claimed
labels, overfitting/forgetting under changed targets and unsupported successor
versions. Tests show necessary behavior; they cannot establish broad adaptation.
