# Phase29 — execute preregistered bounded selection study

## Scope/current facts and files

Reviewed accepted D14, store publication/admission, D09 replay/experience, D10
packet validation and full JS/Python lineage. No population experiment exists yet.
Implement exact six runs with fixed controls; no changed criteria or core code.

## Evidence/contracts

| D14 accepted | Active implementation |
| --- | --- |
| two roots0/2, four slots, schedules | fixed constants in experiments/population.mjs |
| three exact arms | only experience admission and equality gate differ |
| offspring acceptance | publishChild/loadChild -> verifyLineage -> unique ID count |
| retained failures | partial archive/report, failed own store directory preserved |
| independent evidence | Python lineage per accepted child from retained archive |

runStudy(outputDirectory) preflights signed template, rejects existing/protected
output, creates exclusively. Isolated public-key fixture signing is local experiment
code, never core API. Per-run own .work-run-N directory holds stores. Successful
archive fsynced before deleting its own work directory; on failure preserve work
directory plus failed archive/report and stop. No prior output rewritten.

## Files/flow/testing

Add experiments/population.mjs and tests/population.test.mjs; actual committed
results directory contains report and six archives. Counter observations remain
outside canonical states. Every child packet/new state reconstructed by accepted
algorithms; count only after complete validity. Test predicted raw counts/traits,
learning events, unchanged initial origins, duplicate non-counting, independent
every-child graph, deterministic second run bytes, 4-slot exhaustion, protected/
existing/missing input and actual lineage-publication fault retention. Existing
lineage adversarial family covers invalid/cyclic/unavailable ancestry. No statistics
or natural/open-ended ecology claim.

## Risks/recovery/minimality

Fixed engineered task and six deterministic runs are a finite model demonstration.
Failure report includes safe error code and retained stores, never silent drop.
No population service, death, generic scheduler, new schema/adapter/dependency.
Own result stores can be audited; immutable published experiment archives persist.
