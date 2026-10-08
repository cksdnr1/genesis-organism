# Phase 23 — bounded individual adaptation decision

## Scope/use case and verified architecture

FACT: D08 causal grammar demonstration passes; it is not measured adaptation.
Reviewed src/admission.mjs, replay.mjs, expression.mjs, verifier/verify.py and
spec/evolution.md/genome.md. Current signal-v1 directly changes signal without
experience; encounter-v1 only advances history on experience. Neither is evidence
of adaptation. Phase 23 is documentation/decision only, no runtime modifications.

## Proposed contract and evidence table

| Existing contract | Minimum successor decision |
| --- | --- |
| D03/D04 immutable origin and closed state | retain same fields/hash/proof/budgets, new rules literal adaptation-v1 |
| D13 experience-v1 | same evidence/policy/expression-v1; fresh source required for new adaptation |
| Phase24 measured change | signal <- admitted motif; synthetic four-category exact response task |
| D10 later inheritance | current verified signal eligible, memories/relationships not inherited |

Draft D09 precisely specifies admission order, source freshness after duplicate
handling, prohibiting signal-v1 under successor and keeping historical rules intact.
Rotate authority remains allowed. Existing latest signal is sufficient heritable
input; no canonical EvolutionState/HeritableState wrapper is needed.

## File plan and flow

Add docs/decisions/D09-adaptation.md under creator synthetic delegation. Append
bounded accepted scope to evolution.md/genome.md, preserving historical draft
language with time-qualified wording. Define literal transition/control vectors
and Phase24 independent cross-language checks. New/revised records carry Minimality
and Complexity Justification. No child, runtime, schema or fixture changes here.

## Risks/open questions and recovery

Synthetic motif is a signed task-label claim, not reality/sensor evidence. Exact
equality to a fixed supplied target is a justified discrete-task criterion, not
universal fitness. Learning a novel task, generalization and lasting performance
remain unproved. Rule successor cannot upgrade existing origins in place.
