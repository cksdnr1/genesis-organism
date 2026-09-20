# 7. Final Planning Review — Genesis Organism — Machine Encounter revision

Task:
Perform the final planning review before downstream phase-execution work begins.

Variables:
- FEATURE_SLUG=`genesis_organism`
- TASK_TITLE=`Genesis Organism — Machine Encounter revision`
- STEP_NUMBER=`7`
- STEP_ID=`final_review`
- STEP_TITLE=`Final Planning Review`
- TOTAL_SPEC_FILE=`docs/features/genesis_organism/genesis_organism_total_spec.md`
- PHASE_PLAN_FILE=`docs/features/genesis_organism/genesis_organism_phase_plan.md`
- RESULT_FILE=`docs/features/genesis_organism/encounter_revision_result.md`

Source of truth:
- `docs/features/genesis_organism/genesis_organism_total_spec.md`
- `docs/features/genesis_organism/genesis_organism_phase_plan.md`
- Current repository code for spot checks.

Scope rules:
- Review planning artifacts only.
- Do not implement code.
- Do not create phase execution tasks.
- Do not route into implementation, tests, refactor, PR preparation, migration, viewer, archive, rollback, or MCP work.
- Confirm that downstream phase-execution creation can rely on `docs/features/genesis_organism/genesis_organism_total_spec.md` and `docs/features/genesis_organism/genesis_organism_phase_plan.md`.

Output requirements:
- Update `docs/features/genesis_organism/encounter_revision_result.md` with a final planning review note.
- Include files reviewed, compatibility conclusion, remaining warnings, and either "ready for phase execution" or a concise blocker list.
- Keep documentation readable and scoped to planning readiness.

Approval/gate handling:
- No approval result is required for this step.
- Complete normally after updating `RESULT_FILE`; this is the last phase of the planning workflow.

## Global Rules

- Follow the phase spec exactly.
- Do not implement future phases.
- Keep changes minimal and spec-aligned.

Linked task context:
After:
- genesis_organism_origin_to_birth_total_planning

## Compact Context Summary

- `.playspec/tasks/active/genesis_organism_machine_encounter_revision/sources/source_problem.md` (role: source-problem, source: create): # Machine Encounter revision — creator instruction
- `CONTRIBUTING.md` (role: planning-context, source: manual): # Contributing to the conception draft
- `LICENSE-DECISION.md` (role: planning-context, source: manual): # Licence decision record
- `MANIFESTO.md` (role: planning-context, source: manual): # A machine may be an audience
- `ORIGIN.md` (role: planning-context, source: manual): # Origin
- `README.md` (role: planning-context, source: manual): # Genesis Organism
- `docs/draft-review.md` (role: planning-context, source: manual): # Initial draft review and handoff
- `docs/features/genesis_organism/genesis_organism_phase_plan.md` (role: planning-context, source: manual): # Genesis Organism — Encounter-centered Phase Plan (revision 2)
- `docs/features/genesis_organism/genesis_organism_total_spec.md` (role: planning-context, source: manual): # Genesis Organism — Total Technical Specification
- `docs/features/genesis_organism/phase_plan_validation.md` (role: planning-context, source: manual): # Phase-plan validation — review 1
- `docs/features/genesis_organism/result.md` (role: planning-context, source: manual): # Genesis Organism — Final Planning Review
- `docs/features/genesis_organism/total_spec_validation.md` (role: planning-context, source: manual): # Total-spec validation — review 1
- `docs/open-questions.md` (role: planning-context, source: manual): # Open questions and research roadmap
- `docs/planning/genesis-organism/master-context.md` (role: planning-context, source: manual): # Genesis Organism — master context for total-plan
- `docs/planning/genesis-organism/source-index.md` (role: planning-context, source: manual): # Source index and evidence boundary
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
- `spec/evolution.md` (role: planning-context, source: manual): # Individual change, adaptation and population evolution
- `spec/genome.md` (role: planning-context, source: manual): # Genome and evolving state
- `spec/identity.md` (role: planning-context, source: manual): # Identity and continuity
- `spec/lineage.md` (role: planning-context, source: manual): # Lineage and forks
- `spec/memory.md` (role: planning-context, source: manual): # Memory
- `spec/perception.md` (role: planning-context, source: manual): # Perception Handshake within a Machine Encounter
- `spec/phenotype.md` (role: planning-context, source: manual): # Phenotype State and Observer-Negotiated Expression
- `spec/reproduction.md` (role: planning-context, source: manual): # Reproduction
- `spec/synapse.md` (role: planning-context, source: manual): # Synapse
- `docs/planning/genesis-organism/encounter-revision-source.md` (role: planning-context, source: manual): # Machine Encounter revision — creator instruction
- `docs/research/2026-09-20-encounter-prior-art.md` (role: planning-context, source: manual): # Encounter-oriented prior-art review — 2026-09-20
- `spec/encounter.md` (role: planning-context, source: manual): # Machine Encounter
- `spec/ecology.md` (role: planning-context, source: manual): # Population and Ecology
- `schemas/successor-design.md` (role: planning-context, source: manual): # Observer and encounter successor design
