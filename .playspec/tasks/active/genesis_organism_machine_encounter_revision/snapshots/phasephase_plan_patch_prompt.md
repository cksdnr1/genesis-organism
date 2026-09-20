# 6. Phase Implementation Plan Patch — Genesis Organism — Machine Encounter revision

Task:
Patch the phase implementation plan using the latest validation findings.

Variables:
- FEATURE_SLUG=`genesis_organism`
- TASK_TITLE=`Genesis Organism — Machine Encounter revision`
- STEP_NUMBER=`6`
- STEP_ID=`phase_plan_patch`
- STEP_TITLE=`Phase Implementation Plan Patch`
- TOTAL_SPEC_FILE=`docs/features/genesis_organism/genesis_organism_total_spec.md`
- PHASE_PLAN_FILE=`docs/features/genesis_organism/genesis_organism_phase_plan.md`
- RESULT_FILE=`docs/features/genesis_organism/encounter_revision_result.md`

Source of truth:
- `docs/features/genesis_organism/genesis_organism_total_spec.md`
- `docs/features/genesis_organism/genesis_organism_phase_plan.md`
- The most recent phase plan validation findings.
- Current repository code for any disputed feasibility claim.

Scope rules:
- Patch `docs/features/genesis_organism/genesis_organism_phase_plan.md` in place.
- Keep changes limited to validation findings.
- Preserve phase numbering and dependency clarity unless the validation findings require a correction.
- Do not alter the approved total spec unless validation exposed a direct contradiction; if that happens, document the issue and stop rather than silently changing both files.
- Do not implement code or create child tasks.
- Re-check any patched enum/status/classification/schema/field names against the approved total spec and authoritative structured artifacts.
- After patching, scan for stale invented vocabulary, field-name drift, fingerprint/hash input drift, deterministic artifact input drift, and test coverage gaps introduced by the patch.

Output requirements:
- Update `docs/features/genesis_organism/genesis_organism_phase_plan.md`.
- Keep the plan reader-friendly and ready for later phase-execution task creation.

Approval/gate handling:
- No approval result is required for this step.
- Complete normally after patching; the workflow returns to phase plan validation.

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
