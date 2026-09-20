# Minimal Sufficiency revision review — 2026-09-21

STATUS: documentation consistency review, not protocol acceptance or runtime evidence.
Baseline: merged commit `8fc4b9fd99c79692fdad9b26127d146334082dd1`.
Source: creator-directed Minimal Sufficiency revision in this session.

## Exact sections changed

Total Technical Specification:
- Added “Minimal Sufficiency — project-wide design principle”, including
  “Removal Test”, “Complexity Budget” and “Simple origin, earned complexity”.
- Updated “Current Architecture and Proposed Direction” with minimal layers and heuristics.
- Updated “Proposed EncounterReceipt and successor evidence” to bound typed descriptors.
- Updated “Problems and Decision Register” with prospective decision-record justification.
- Updated “Scale and standards strategy” to defer integrations and unjustified scale machinery.

Phase Plan:
- Added “Minimal Sufficiency and Complexity Gate” immediately after entry/scope rules,
  including “Application within existing phases” and “Phase expansion rule”.
- Clarified Phase 11 “Tests and exit evidence”: conditional checkpoint support still
  requires either invalid-checkpoint testing or explicit unsupported-input rejection.
- All 38 phase headings, summary rows and dependency declarations are unchanged.

Terminology adds three design-review terms; no biological or canonical fields.

## Speculative complexity audit

Searched both revised documents for future/extension/framework/registry/ontology,
profile/adapter and Merkle/checkpoint/distributed concepts; reviewed their contexts.

| Candidate | Disposition and requirement |
| --- | --- |
| Unused typed robot descriptors / universal ontology | Deferred. Only accepted D07 semantics are encoded; no placeholder fields. |
| MCP/A2A, DID, PROV, C2PA adapter suite | Deferred until an accepted profile needs the specific interoperability/property. Prior-art references remain evidence. |
| Merkle/checkpoint/index/distributed infrastructure | Conditional on justified proof/recovery or measured scale need. Append durability, crash recovery and required negative tests remain. |
| PhenotypeState as extra stored state | Remains unselected under D07; an existing projection suffices unless canonical storage is justified. |
| Receipt as parallel canonical subsystem | Not selected. Retain D13 attribution/idempotency/policy and acyclic evidence/outcome responsibilities; no extra service or frozen field set. |
| Ten profiles / LLM service | Omitted as defaults. Retain three bounded mock observer acceptance cases; deterministic mocks need no external model. |
| CRM/general memory database, mutation library, breeding platform | Excluded. D08–D10 permit only justified causal, adaptation and inheritance semantics. |
| Artificial universe / niche-construction implementation | Deferred. D14 bounded experiments require population evidence only for the selected research claim, not the single-organism milestone. |
| Multi-vendor embodiment / blockchain stack | Deferred; one bounded simulation preferred, anchoring can be skipped entirely. |
| Generic migration/extension framework | Not required. Retain historical schema bytes, version distinctions and explicit compatibility records; build only an accepted needed mapping. |
| New phase / minimality subsystem | Not created. Use existing reviews and D01–D14 records, without numeric scores or orchestration. |

No runtime component existed to delete. Removed overbroad expectations to encode
unused capability descriptors or evaluate a standards suite unconditionally.

## Conflicts and retained complexity

The one-profile heuristic cannot waive the existing three-mock acceptance. The
one-organism heuristic cannot demonstrate population selection; that claim retains
its separate bounded experiment. The no-checkpoint default cannot drop negative
input handling. These tensions are made explicit rather than silently weakening gates.
The repository already lists 12 normative invariants in spec/README.md; this revision
adds no numbered invariant regardless of the informal “11th principle” wording.

## Validation findings

1. Existing normative invariants take precedence and their source bytes are preserved.
2. Security/privacy boundaries and negative coverage are explicitly protected.
3. Blockchain remains optional; local commitments can suffice.
4. No LLM service is required; captured-byte replay rules remain.
5. Population/ecology is not a single-organism demonstration prerequisite.
6. Phase 22 causal expression effect, controls and rule ablation remain intact.
7. Historical JSON schemas, origin/birth records and past review evidence are unchanged.
8. Decision register remains D01–D14; no additional decision ID.
9. Execution phases remain 1–38 with the same dependencies and ten fields each.
10. GENESIS #0001 remains UNBORN; no birth fields or experiences are fabricated.
11. Valid history can produce later complexity; initial minimality is not a growth cap.
12. Small core and external optional integration responsibilities are explicit;
    no artificial line-count or complexity score is introduced.

Checks: phase/register structure, relative links, protected-file byte comparison,
ignored/untracked .playspec and git diff whitespace. No runtime tests apply to this
prose-only revision; no previous PlaySpec completion is claimed to validate it.
