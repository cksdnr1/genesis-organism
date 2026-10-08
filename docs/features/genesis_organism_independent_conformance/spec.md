# Independent conformance audit specification

## Scope and use case alignment
The creator needs an independent, falsifiable assessment of the latest implementation against the Total Technical Specification, all 38 Encounter-centered phases, the twelve normative invariants, and unchanged original birth gates. This task delivers audit documents and isolated evidence only; it creates no runtime features, organism, birth authorization, commit, push, merge or release.

## Oracle and dates
Authoritative baseline: docs/features/genesis_organism/{genesis_organism_total_spec.md,genesis_organism_phase_plan.md}, spec/{README.md,GENESIS.md}. Derive requirements before reading prior audit conclusions. Baseline descriptions of absent runtime and pending decisions describe their historical revision, not current reality. Subsequent dated accepted D01–D14 records refine bounded synthetic mechanisms only. The 2026-10-08 delegation, rights/rehearsal and anchoring SKIP records resolve only their explicit scopes. D02 retains historical PROPOSED wording but its dated acceptance controls current synthetic scope. No actual birth gate is thereby accepted.

## Current implementation summary and architecture
Verified inventory: native Node ESM src/ admission/replay/store and expression/encounter/lineage modules, separate Python verifier/, schemas/synthetic/, retained fixture directories and node:test corpus. package.json is private, has no dependencies, requires Node >=22, and defines test as node --test tests/*.test.mjs. Inventory does not establish behavioral conformance. No inspected implementation result is yet marked satisfied.

## Structured facts
| Artifact | Subset/key | Literal | Treatment |
| --- | --- | --- | --- |
| package.json | type/private/scripts.test | module / true / node --test tests/*.test.mjs | reuse exact command |
| D03/D04 | profile/rules | synthetic-v1 / core-v1 | historical pinned rules |
| D13/D09 | successor rules | encounter-v1 / adaptation-v1 | separate accepted interpretation; no migration inference |
| D07 | observer/policy/procedure | observer-v1 / policy-v1 / expression-v1 | inspect fidelity and rejection |
| D08 | later expression/procedure | policy-related-v1 / relationship-expression-v1 | read-only causal demonstration; not evidence-v1 input |
| spec/GENESIS.md | status | UNBORN | preserve; no candidate data assigned |

## Relevant files and entry points
Read all authoritative files and dated decisions; target src/, verifier/, tests/, tools/, schemas/synthetic/, fixtures/ and domain adapters only as each requirement needs. Trace CLI/adapters → verified history/admission → durable accepted events → replay → memory/synapse/expression → cache reset/recovery → visible results. Audit lower-level exported helpers as potential trust-boundary bypasses, conflict holds, mutable cached states, historical interpreter changes, missing bytes, retry/concurrency, lineage resolver and ceremony archive evidence. Pure internal helpers are not public authority unless their caller establishes it.

## Problems, proposed direction and evidence rules
Earlier conformance conclusions may be optimistic. No PASS, score or defect count is prescribed. For each requirement record satisfied (bounded evidenced subset), violated (reproducible contrary behavior), partial (some required evidence missing), deferred (explicitly accepted omission), or unverified (insufficient evidence). Finite test success cannot prove universality. Preserve exact revision, commands, exit results, evidence paths, control conditions and limitations. Scientific review must distinguish scripted label fitting, controlled reproduction and causal grammar effects from learning, natural ecology or open-endedness.

## File-by-file plan
spec.md defines this audit; requirements-matrix.md preserves independent first-pass requirements, all phase gates and final coverage; plan.md sequences independent reviews; result.md synthesizes evidence and disagreements; pr.md records reviewable local change/no-push boundary. Bounded remediation specs may be added here only for confirmed defects. Runtime reviewer owns reproducer evidence; design reviewer owns separate spec/plan validation records and protocol review. Lead auditor alone advances supported PlaySpec CLI, never edits .playspec.

## Risks, unknowns and rollback
Unknown until inspected: complete conformance, adversarial gaps, current birth readiness and equivalence of prior claims. Distinguish branch scope: freshly fetched HEAD is 656d1a3e65edc19d8349f0d77d1f0d7e7388817e, matching origin/work/phase-03-authority; GitHub default is genesis/protocol-origin at 0fd529ee2d8be2db6fa7a8c565ccca776f444527, 68 commits behind this HEAD (0 default-only). Current local branch is work/pr8-critical-conformance. Existing untracked prior audit paths are preserved. Documents and CLI task evidence are the only mutations; rollback is retain/revise audit documents, never delete historical bytes or edit workflow internals.

## Reader aids and acceptance
requirements-matrix.md is the coverage index. Audit completion requires 38 phase rows, invariant/birth/decision/control coverage, separately authored runtime and scientific review, reproduced or explicitly unresolved historical claims after first pass, bounded remediation for confirmed gaps, and consistent UNBORN/no-birth language. Completion of this audit never completes original phases or birth gates. Independent subagents are separate contexts, not external human certification.
