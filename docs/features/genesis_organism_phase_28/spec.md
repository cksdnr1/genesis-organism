# Phase28 — bounded selection experiment decision

## Scope/current facts/files

Reviewed D09/D10, ecology.md, validated reproduction/store/lineage interfaces.
FACT: individual task fit and inherited child signals are verified; population
selection has not been demonstrated. This phase preregisters D14 only, no simulator.

## Proposed experiment and evidence

| Required axis | Minimum accepted mechanism |
| --- | --- |
| heritable variation | two matched synthetic roots, signal0 and signal2 |
| environment/resources | fixed target2, four scheduled reproductive opportunities |
| differential success | selection permits exact signal==2, neutral permits both |
| experience separation | encounter-selection admits motif2 first; no-experience selection does not |
| controls/replicates | two fixed order schedules, six total runs, no random seeds |
| actual counts | count only durable valid child packet + complete verified lineage |

Report exact offspring counts and trait frequencies, not a canonical fitness score.
One generation; no organism death/replacement. Retain all parent event histories and
child packets in bounded per-run archives. Deterministic replicates test order, not
independent statistical samples. Null/failed/missing data reported, never excluded.

## Files/plan/architecture

Write D14-population-study.md and scoped ecology/evolution links. Exact Phase29
experiment path experiments/population.mjs; results experiments/results/population-v1/
report.json plus six run archives; tests/population.test.mjs. Public fixture keys
only in isolated experiment, no core signer. No population canonical fields/service.

## Risks/open questions/recovery

Engineered equality gate predetermines a simple selection pressure; results cannot
establish natural ecology/general fitness/open-endedness. Niche Construction remains
long-term question with no selected dynamics. Missing input/invalid lineage/resource
excess halts and retains partial evidence, not a counted birth or lifecycle death.
