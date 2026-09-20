# 1. Total Technical Spec Draft — Genesis Organism — Machine Encounter revision

Task:
Create or update the total technical specification for a large feature before it is split into phase execution tasks.

Variables:
- FEATURE_SLUG=`genesis_organism`
- TASK_TITLE=`Genesis Organism — Machine Encounter revision`
- STEP_NUMBER=`1`
- STEP_ID=`total_spec_draft`
- STEP_TITLE=`Total Technical Spec Draft`
- SOURCE_PROBLEM_FILE=`.playspec/tasks/active/genesis_organism_machine_encounter_revision/sources/source_problem.md`
- TOTAL_SPEC_FILE=`docs/features/genesis_organism/genesis_organism_total_spec.md`
- PHASE_PLAN_FILE=`docs/features/genesis_organism/genesis_organism_phase_plan.md`
- RESULT_FILE=`docs/features/genesis_organism/encounter_revision_result.md`

Source of truth:
- Start from the linked source problem file when present, the task title, and current repository code.
- If `SOURCE_PROBLEM_FILE` is `(not provided)` and context is `(none)`, start from `TASK_TITLE` and the current repository code, and explicitly note that no source problem was provided.
- Treat existing docs as context, not proof of implemented behavior.

Evidence-first structured facts:
- Before proposing types, schemas, descriptors, catalogs, fingerprints, migrations, CLI/API contracts, phase boundaries, or acceptance criteria, extract the exact facts from directly relevant structured artifacts when they exist. Structured artifacts include JSON, YAML, OpenAPI, Prisma/schema files, SQL/migration files, package manifests, generated catalogs, baselines, fixtures, and machine-readable reports.
- Record a compact evidence table when structured artifacts influence the total spec. Include artifact path, field/key path, target subset or filter, literal values or value distribution/counts, and whether each value is reused, mapped, deferred, or rejected.
- When a structured artifact contains literal enum, vocabulary, status, classification, or field names, reuse those literals verbatim unless the total spec defines an explicit migration or compatibility mapping. Do not invent, rename, merge, or normalize enum names because they sound cleaner or more canonical.
- If multiple sources disagree, do not choose silently. State the authoritative source, the conflict, the risk, and the validation needed to resolve it.

Scope rules:
- First align the intended user-facing use case and final planning outputs.
- Summarize the current implementation at a high level before deep code reading.
- Use minimal relevant file discovery before reading broadly.
- Do not create implementation code or phase execution tasks.
- Do not implement future phases.
- Separate verified code behavior, inferred behavior, and open questions.
- Verify active entry point -> state/data update -> propagation/callback/event -> reset/clear -> user-visible behavior before claiming behavior exists.
- Explicitly identify old paths, bypass paths, alternate active paths, and partial migrations.
- Before completing, run an internal consistency pass across proposed type names, required fields, phase boundaries, fingerprint/hash inputs, generated artifacts, acceptance criteria, rollback/flag posture, and downstream test gates. Remove parallel vocabularies unless an explicit compatibility mapping is part of the total spec.
- Keep deterministic contract/hash/catalog inputs separate from implementation provenance, runtime observations, timestamps, environment-specific values, and other volatile data.

Output requirements:
- Update `docs/features/genesis_organism/genesis_organism_total_spec.md` with the total technical specification.
- The spec must be reader-friendly and include Scope, Use Case Alignment, Main and Alternative Scenarios, Current Implementation Summary, Relevant Files Reviewed, Active Entry Points and Bypasses, Current Architecture, Verified Behavior and Constraints, Problems, Proposed Direction, File-By-File Plan, Risks and Open Questions, and Reader Aids.
- Include the structured evidence table when structured artifacts drive proposed contracts, schema choices, descriptor metadata, catalog/fingerprint fields, phase boundaries, or acceptance tests.
- Mention that `docs/features/genesis_organism/genesis_organism_phase_plan.md` is the downstream phase plan output, but do not create it in this step.
- Use diagrams only when they improve understanding, and label proposed flow separately from verified flow.

Approval/gate handling:
- No approval result is required for this step.
- Complete normally after `TOTAL_SPEC_FILE` is updated.

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
- `docs/features/genesis_organism/genesis_organism_phase_plan.md` (role: planning-context, source: manual): # Genesis Organism — Detailed Phase Implementation Plan
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
