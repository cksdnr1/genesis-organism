# Corrective mono-spec evidence — 2026-10-08

STATUS: bounded audit remediation; actual GENESIS #0001 UNBORN / NO-GO.
Original audit revision: `2090fcd11b1f81d3fb381849913a6ceb3ed11dc0`.
Final implementation revision: `b2c2b2f8c8086ea73c62c98f5c8ea4b4865dc939`.
Publication: existing draft [PR6](https://github.com/cksdnr1/genesis-organism/pull/6),
head work/synthetic-phases, base work/phase-03-authority. No merge authorized.

## Separate tasks and closure scope

| Audit item / local mono-spec | Implementation commit | Result and remaining boundary |
| --- | --- | --- |
| [A01](../genesis_organism_audit_a01/result.md), genesis_organism_audit_a01 | ada957d | Reproduced Git-backed predecessor verification bypass closed in JS/Python. Actual predecessor bytes/list/hash required. Offline supersession explicitly unavailable because current archives lack predecessor bytes; this is not full offline supersession conformance. |
| [A02](../genesis_organism_audit_a02/result.md), genesis_organism_audit_a02 | 0437990 | Unsupported evidence-version disagreement closed. Seven explicit signed negative cases match independent diagnostic classes; no universal error-taxonomy proof. |
| [A03](../genesis_organism_audit_a03/result.md), genesis_organism_audit_a03 | 93f28f4 | Documentation gap closed by separate workflow/capability/readiness/authorization scopes. Original Phase38 real-gate entry remains unsatisfied; actual candidate readiness is still NO-GO. |
| [A04](../genesis_organism_audit_a04/result.md), genesis_organism_audit_a04 | b2c2b2f | D01–D14 and accepted-profile navigation added, original index prefix preserved. Index does not redefine wire contracts or freeze a universal standard. |

Original audit retained in separate commit891da27. Each task has its own source,
spec, validation, plan, plan-validation, result and PR artifacts. Spec/plan review
gates used the supported CLI and explicit approved results. Self-review95/100
indicates workflow readiness only; it is not independent human approval or a
measured conformance score. No new roadmap phase or D-number was introduced.

## Revision-pinned verification

`npm test` at b2c2b2f: **52/52 groups pass**, zero failures/skips,
134.855 seconds. Full committed-source run exited0. Previous corrected working-tree
run also passed52/52 (135.552 seconds). Negative Git probes emit expected
“not a tree object” diagnostics; those are asserted rejection cases, not suite failures.

Focused tests before final revision: ceremony9/9 groups; conformance5/5 groups.
A01 includes unknown prior revision, tampered prior hash, missing selected blob,
selection-list mismatch, valid predecessor and no-Git offline refusal. A02 signs
seven exact negative inputs and checks literal expected outcomes against actual
JS admission and Python stored-history CLI, rather than comparing implementations
only with each other. Existing malformed/signature/retry/conflict/SIGKILL tests
remain. Final run reads its GitHEAD as the ceremony artifact source, so it checks
committed corrected runtime bytes rather than binding only the pre-fix revision.

Independent checks at b2c2b2f:

- `.venv/bin/python tests/schema_vectors.py`:6/6 pass.
- `.venv/bin/python tests/successor_schema_vectors.py`:2/2 pass.
- `.venv/bin/python tools/audit_causal.py`:12 later-expression views match, with grammar change and no/rejected-experience/ablation controls preserved. A fresh `node tools/demo_encounter.mjs` report also passed this independent audit before commits.
- `.venv/bin/python verifier/lineage.py fixtures/reproduction-v1/manifest.json`:4 nodes/3 edges match accepted ancestry.
- Retained original accepted Phase38 trial independently rechecked:195 artifacts and original origin/state/ceremony commitments match. Old retained fixtures remain old evidence, not a new corrected-source freeze.
- Static checks: twelve original gate rows, D01–D14 rows, all local navigation links, original spec index exact prefix, and `git diff --check` pass.

Seven protected files match baseline0fd529 byte-for-byte: ORIGIN.md, spec/GENESIS.md,
historical observer/phenotype schemas, #0001 README, Total Spec and Phase Plan.
Historical ceremony manifests, licence mappings and accepted-profile bytes were
not rewritten. The new corrective docs are not retroactively added to retained
195-file manifests; those are explicit runtime/contract selections, not a claim
to archive every repository document. Current selected corrected runtime files
are verified in final Git-pinned regression.

## Minimality and residual risk

A01 reuses raw artifact verifiers; A02 changes one diagnostic class. Additional
negative tests preserve evidence and security. A03/A04 add documentary boundaries
and navigation. No dependency, field, event hierarchy, model, chain, cache, registry,
service, numeric complexity score or framework. Further refactoring was omitted
because it would not demonstrate a required property.

Offline prior retention is deferred until an accepted contract requires it.
Supplied births=[] is trusted local context, not global absence proof. Real
private memory, mutual consent, physical capability attestation, external witness,
global finality, disk power-loss safety and indefinite retention are unestablished.
Node25.9.0/Python3.14.7/macOS were observed; lower declared version floors, clean
fresh-machine installation and hosted CI were not run. Finite synthetic studies
do not establish open-ended evolution or subjective machine appreciation.

The causal encounter milestone remains required and demonstrated within the
public synthetic contract; a signed identity log alone is insufficient. Actual
candidate evidence still needs review under every original birth gate. No real
freeze/tag/release/birth/deploy/mint/on-chain operation or historical rewrite.

## Local workflow completion

Implementation and final validation complete. Publication/CLI finalization is
recorded below after refreshing PR and task states.

These are direct local PlaySpec mono-spec tasks, not Novis queue/registry jobs.
Their completion must not be reported as a background worker/phase-chain merge.
Local tool-owned .playspec state remains ignored; versioned evidence is here and
in each task directory. No master checkout assumed and no automatic merge.
