# A03 technical specification

## Scope / use case

Readers need to distinguish completed workflow artifacts, a bounded synthetic
rehearsal and actual birth readiness. Clarify current status without changing
the Total Spec, Phase Plan or original birth gates to fit the implementation.

## Current implementation / reviewed files

Read audit A03, execution-status.md, Phase35 birth-evidence.md, Phase38 runbook,
D12-synthetic-ceremony.md and spec/GENESIS.md. Phase35 explicitly states real NO-GO;
the plan's Phase38 entry says all birth gates accepted. Synthetic acceptance alone
does not prove real candidate prerequisites. No runtime behavior changes here.

## Structured evidence

| Artifact / subset | Literal / count | Treatment |
| --- | --- | --- |
| spec/GENESIS.md checklist | 12 original gates, NOT DEMONSTRATED | retain exact bytes; no gate waiver |
| organisms/genesis-0001/README.md | STATUS: UNBORN | retain exact bytes |
| Phase38 birth.json | ceremony-rehearsal-v1 / public TEST1 fixture | evidence for synthetic scope only |
| original plan | execution phases1–38 | retain graph and entry/exit text |

## Active paths / proposed direction

Documentation entry: README/status -> new readiness-scope.md -> original gates
and accepted synthetic evidence. Publish an explicit status table with separate
workflow-deliverable, bounded-capability, candidate-specific readiness and actual
action authorization columns. A completed NO-GO audit remains NO-GO. Rehearsals
cannot be retroactively represented as all-real-gates acceptance.

## File-by-file plan / acceptance

Create docs/features/genesis_organism/readiness-scope.md with exact interpretation,
all twelve candidate-specific obligations and separate authorization requirement.
Append a dated link/qualification to execution-status.md and Phase38 runbook;
retain historical narrative. Do not claim original Phase38 gate universally passed.
Clarify A01's offline predecessor evidence limit and A02's bounded negative corpus
when referencing correction results; do not prematurely assert test completion.

## Reset, risks and Minimality

No callbacks, canonical state, schema, field, phase, D-number or runtime write.
No lifecycle transition; no fake creator key/identity/final genome/acceptance.
Risk: reader conflates table completion with authority. Separate labels and link
the original gate source. Verify local links, twelve gate names, protected bytes
and exact UNBORN status. No implementation-mirroring tests for prose-only change.
