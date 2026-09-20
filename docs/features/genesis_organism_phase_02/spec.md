# Phase 2 — Machine Encounter requirements specification

## Scope / use case
Execute existing Phase 2 as a requirements walkthrough, not a runtime experiment.
One historical organism's admitted encounter changes a later permitted expression.
Deliver docs/decisions/encounter-requirements.md; do not accept D13 early.

## Current implementation / relevant files / architecture
Read spec/encounter.md, spec/perception.md, spec/phenotype.md, both total planning
documents, D01 research and historical observer/phenotype JSON. Verified: prose and
schemas only. No negotiator, receipt bridge, reducer or causal behavior exists.
Entry -> read requirements -> new review matrix -> downstream D02–D08/D13 decisions;
no canonical update, callback, runtime bypass or partial migration. Superseding
requirements preserves original evidence. There are no claimed executable results.

## Structured evidence and verified boundaries

| Artifact / subset | Literal | Treatment |
| --- | --- | --- |
| observer.schema.json / schemaVersion.const | 0.1-experimental | unchanged historical schema |
| observer.schema.json / capabilities.additionalProperties | boolean schema | no typed-capability inference |
| observer.schema.json / missing capability | unknown in governing prose | do not convert to false or authorization |
| phenotype.schema.json / required | schemaVersion, sourceStateRef, negotiationRef, expressionProfile, expressionProcedureRef, outputRef, mediaType | unchanged; no receipt renaming |
| spec/encounter.md / receipt table | organismStateRef, observerProfileCommitment, negotiationProtocolVersion, expressionProcedureRef, expressionInputCommitment, expressionOutputDigest, interactionDigest, resultingEventRefs | eight candidate responsibilities, not selected schema |

## Proposed direction / file plan
Write a bounded matrix for human, language and embodied mock encounters sharing
one symbolic source state. Separate integrity, semantic fidelity and causal evidence.
Cover no-experience/rejected controls, retry, policy substitution, missing accepted
bytes, unknown capabilities and non-actuating embodiment. State expected outcomes,
not fabricated test passes. Keep D07/D08 semantics and D13 identity/fields open.

## Problems / risks / acceptance
No exact expression rule exists yet; inventing one now would violate Phase 2.
Use criteria and symbolic outputs, not a concrete wire vocabulary. Compare matrix
coverage to Phase 2 exit evidence and Phase 22's later demonstration requirements.
Check exact schema literals and eight field names, local links, protected bytes
and no premature runtime claim. No source code, extra profiles or external service.

## Minimality / reader aids
One requirements matrix is enough; it preserves the encounter milestone without
new abstractions. Downstream readers can resolve each requirement against a named
D-record. Removing controls would lose causal attribution, so they remain.
