# 4. Phase Implementation Plan Create — Genesis Organism — origin-to-birth total planning

Task:
Create a risk-reviewed phase implementation plan from the approved total technical specification.

Variables:
- FEATURE_SLUG=`genesis_organism`
- TASK_TITLE=`Genesis Organism — origin-to-birth total planning`
- STEP_NUMBER=`4`
- STEP_ID=`phase_plan_create`
- STEP_TITLE=`Phase Implementation Plan Create`
- SOURCE_PROBLEM_FILE=`.playspec/tasks/active/genesis_organism_origin_to_birth_total_planning/sources/source_problem.md`
- TOTAL_SPEC_FILE=`docs/features/genesis_organism/genesis_organism_total_spec.md`
- PHASE_PLAN_FILE=`docs/features/genesis_organism/genesis_organism_phase_plan.md`
- RESULT_FILE=`docs/features/genesis_organism/result.md`

Source of truth:
- `docs/features/genesis_organism/genesis_organism_total_spec.md`
- Linked source problem and context files when present.
- Current repository code for feasibility checks.

Scope rules:
- Create planning documentation only.
- Do not implement code, create child tasks, or auto-apply proposals.
- Split work into mono-spec-sized implementation phases that can later be run with phase-execution tasks.
- Each phase must have a clear scope, entry points, data/state updates, propagation/callback/event behavior, reset/clear behavior, user-visible outcome, tests, dependencies, and explicit non-goals.
- Preserve downstream compatibility with `docs/features/genesis_organism/genesis_organism_total_spec.md` and `docs/features/genesis_organism/genesis_organism_phase_plan.md`.
- When the phase plan references structured artifacts or total-spec vocabularies, reuse literal enum/status/classification/schema/field names from the approved total spec and authoritative artifacts. Do not invent or rename them in the plan.
- If the approved total spec conflicts with a current structured artifact or current code, stop and record the inconsistency as a planning risk instead of silently normalizing it.

Output requirements:
- Update `docs/features/genesis_organism/genesis_organism_phase_plan.md`.
- Include a phase summary table, phase-by-phase implementation plans, dependencies, validation gates, risks, and handoff notes for future phase execution.
- Reference `docs/features/genesis_organism/genesis_organism_total_spec.md` as the approved total spec.
- Keep `docs/features/genesis_organism/result.md` untouched unless documenting an unavoidable planning warning.

Approval/gate handling:
- No approval result is required for this step.
- Complete normally after `PHASE_PLAN_FILE` is created or updated.

## Global Rules

- Follow the phase spec exactly.
- Do not implement future phases.
- Keep changes minimal and spec-aligned.

## Compact Context Summary

- `.playspec/tasks/active/genesis_organism_origin_to_birth_total_planning/sources/source_problem.md` (role: source-problem, source: create): # Genesis Organism — master context for total-plan
- `CONTRIBUTING.md` (role: planning-context, source: manual): # Contributing to the conception draft
- `LICENSE-DECISION.md` (role: planning-context, source: manual): # Licence decision record
- `MANIFESTO.md` (role: planning-context, source: manual): # A machine may be an audience
- `ORIGIN.md` (role: planning-context, source: manual): # Origin
- `README.md` (role: planning-context, source: manual): # Genesis Organism
- `docs/draft-review.md` (role: planning-context, source: manual): # Initial draft review and handoff
- `docs/open-questions.md` (role: planning-context, source: manual): # Open questions and research roadmap
- `docs/prior-art.md` (role: planning-context, source: manual): # Prior-art and neighbouring-systems ledger
- `docs/terminology.md` (role: planning-context, source: manual): # Terminology and claim discipline
- `docs/threat-model.md` (role: planning-context, source: manual): # Initial threat model
- `organisms/genesis-0001/README.md` (role: planning-context, source: manual): # GENESIS #0001
- `schemas/README.md` (role: planning-context, source: manual): # Experimental review schemas v0.1
- `schemas/observer.schema.json` (role: planning-context, source: manual): { "$schema": "https://json-schema.org/draft/2020-12/schema", "$id": "https://github.com/cksdnr1/genesis-organism/schemas/experimental/0.1/observer.schema.json", "title": "Observer capability claims — experimental v0.1", "description": "R...
- `schemas/phenotype.schema.json` (role: planning-context, source: manual): { "$schema": "https://json-schema.org/draft/2020-12/schema", "$id": "https://github.com/cksdnr1/genesis-organism/schemas/experimental/0.1/phenotype.schema.json", "title": "Expression attribution descriptor — experimental v0.1", "descript...
- `spec/GENESIS.md` (role: planning-context, source: manual): # Genesis and birth
- `spec/README.md` (role: planning-context, source: manual): # Protocol conception draft v0.1
- `spec/canonicalization.md` (role: planning-context, source: manual): # Canonical representation: decision pending
- `spec/embodiment.md` (role: planning-context, source: manual): # Embodiment and environment
- `spec/event-model.md` (role: planning-context, source: manual): # Events and replay
- `spec/evolution.md` (role: planning-context, source: manual): # Evolution
- `spec/genome.md` (role: planning-context, source: manual): # Genome and evolving state
- `spec/identity.md` (role: planning-context, source: manual): # Identity and continuity
- `spec/lineage.md` (role: planning-context, source: manual): # Lineage and forks
- `spec/memory.md` (role: planning-context, source: manual): # Memory
- `spec/perception.md` (role: planning-context, source: manual): # Perception Handshake
- `spec/phenotype.md` (role: planning-context, source: manual): # Observer-dependent phenotype
- `spec/reproduction.md` (role: planning-context, source: manual): # Reproduction
- `spec/synapse.md` (role: planning-context, source: manual): # Synapse
- `docs/planning/genesis-organism/master-context.md` (role: planning-context, source: manual): # Genesis Organism — master context for total-plan
- `docs/planning/genesis-organism/source-index.md` (role: planning-context, source: manual): # Source index and evidence boundary
