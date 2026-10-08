# D14 — preregistered bounded synthetic selection study

STATUS: ACCEPTED for isolated public synthetic experiment, 2026-10-08 under
[delegation](2026-10-08-synthetic-delegation.md). Registered before Phase29 code/run.
One generation only. No real population, lifecycle death, price or open-ended claim.

## Research question and accepted arms

Does a fixed response-dependent reproductive opportunity produce different
accepted offspring counts and inherited signals than a neutral opportunity,
and how does D09's admitted cue experience alter that bounded outcome?

Two matched adaptation-v1 roots begin with immutable signal0 and signal2 (one each).
Each has the same public fixture authority. The environment supplies target2;
four opportunities are a finite resource, never replenished within a run.
Replicate0 schedule [0,2,0,2]; replicate1 [2,0,2,0]. Schedule labels identify initial
parents, even if current signal changes. Both are deterministic order checks,
not independent random samples; no RNG, confidence interval or significance test.
Identical root birth inputs per replicate are reused across arms for matching.

Arms (six runs total, two schedules each):

1. selection-no-experience: allow reproduction only when current signal==2;
   parents receive no training event. Predicted counts parent0=0,parent2=2;
   two children, all inherited2.
2. neutral-no-experience: allow all scheduled opportunities; no training.
   Predicted counts parent0=2,parent2=2; four children, two0/two2.
3. selection-with-experience: each parent admits one fresh experience with motif2
   under D09 before opportunities, then apply the same exact-match gate.
   Predicted counts parent0=2,parent2=2; four children, all inherited2.

Comparison1 vs2 tests imposed selection of heritable variation. Comparison3 vs1
is the no-experience ablation separating individual label response from selection
on initial variation. No inheritance-disabled fake child is permitted: D10 remains
unchanged. All children use one-parent floor inheritance, no new mutation operator.
No second generation or emergent/niche dynamics is included.

## Actual acceptance, resource and retention contract

An opportunity consumes one of four slots regardless of gate result. A permitted
proposal is counted only after store.publishChild/loadChild and verifyLineage
succeed, and only once per child organism ID. Repeating the first permitted packet
must return the same accepted identity and not increase count. A refused/invalid/
partial proposal is never an offspring. Unique nonce binds arm/replicate/slot.
No parent histories are erased; no organism becomes extinct/dead at resource end.

Use public RFC8032 test seed in experiments/population.mjs only; no core signer,
external reproduction, network/model service or private/real data. Parent experience
uses unchanged evidence-v1/expression-v1 and D09 fresh-state rule. Child packets use
D10, no alternative breeding API. Parent snapshots are canonical replay inputs.

API runStudy(outputDirectory) creates a new exclusive result directory, refuses
existing output and any path inside organisms/ (lexical and resolved-parent checks).
Preflight required fixture origin before output creation. Per-run temporary store
directories are owned by this experiment; retain evidence snapshots before cleanup.
Six archives run-0.json..run-5.json, each closed {roots,records}: roots are accepted
child IDs; records are closed D10 resolver records for all parents/accepted children.
This is research transport, not organism canonical state. Canonical each archive
under D03 65536-byte/node limits; no historic artifacts regenerated.

report.json contains version=population-study-v1, status=completed/failed, target2,
resourceLimit4, deterministic=true, and runs. Each run reports arm, replicate,
schedule, status, opportunities, acceptedChildren, parentOffspringCounts (initial
labels0/2), initialTraitCounts, offspringTraitCounts, learningEvents, archive and
failure (null or safe error code). Offspring IDs unique. Any failure halts the study,
retains partial archive/report with failed status and completed previous runs;
it is not excluded, retried with new criteria or counted as a successful study.
CLI exits nonzero if failed. Only own temporary store directories are cleaned.

## Measures, uncertainty and validation

Primary: actual accepted child count per parent and inherited trait count by arm.
Initial trait proportion2=1/2; selected no-experience children proportion2=1,
neutral proportion2=1/2. Report raw integers, not a fitness/affinity score.
Learning-events counts distinguish zero vs two admitted experiences. Repeated
fixed runs must reproduce exact archives/report bytes; order checks must agree on
counts. No estimates about unknown ecology are inferred from scripted equality.

Phase29 tests/population.test.mjs verifies predictions without changing them,
every child's immutable packet/inherited signal/full lineage, independent Python
graph per accepted child, controls, duplicate non-counting, four-slot exhaustion,
wrong/cyclic/unavailable lineage refusal (reusing Phase27 family) and actual injected
publication failure producing a failed retained report, with incomplete offspring
uncounted. Missing input preflight and existing/protected output fail before writes.
No silent censorship. Finite experiments do not establish open-ended evolution.

## Niche Construction and limits

Can organisms create new ecological niches that alter the future selection
pressures of other organisms? Remains a future research question. The current
environment is fixed by experimenter; there is no organism-driven environmental
feedback, indefinite novelty, natural ecology or machine-valued objective.

## Minimality / Complexity Justification

Two roots, one trait, one exact cue/task gate, four opportunities, three arms and
two order schedules are sufficient for variation/differential reproduction and
experience controls. No artificial universe, generic simulator, population consensus,
reward score, lifecycle death or random selection is required. Retain accepted
offspring proof, independent verification, replay archives and failures: removing
them breaks the accepted experiment and provenance. No dependency is added.
New risks: engineered criterion, tiny deterministic sample, public test authority,
fixed schedules and absent long-term dynamics. Narrow reporting and selected
literal predictions demonstrate necessity without pretending empirical generality.
