# Independent runtime/security/replay review

Target: `656d1a3e65edc19d8349f0d77d1f0d7e7388817e`, local branch `work/pr8-critical-conformance`; HEAD matches remote tracking `origin/work/phase-03-authority`. This is a bounded independent subagent review, not human certification. Original requirements were derived in first-pass.md before historical audits were consulted; independent-assessment.md was persisted before historical-claim review. No tracked source, .playspec, historical evidence, commit, merge, release or birth was changed. GENESIS #0001 remains UNBORN.

## Findings

**RUNTIME-01 — partial cross-implementation diagnostic conformance.** Both historical exact retained inputs and newly constructed encounter-rule variants reproduce two error-class disagreements: wrong organism + unknown kind returns Node unsupported / Python invalid; unknown profile + malformed signature encoding returns Node invalid / Python unsupported. All reject. Actual Node append rejects without changing directory hashes. Actual verifier calls are read-only. No authorization, disclosure, canonical state or commitment divergence is established. D04 sets high-level admission stages but does not fully resolve all simultaneous-fault priorities; do not invent a unique required class or use either implementation as oracle. Phase13/D06 rejection-class comparison is unmet for these inputs. Resolve allowed compound precedence explicitly within the existing contract, then align independent implementations and retain signed vectors/no-write assertions; do not globally flatten classes. Detailed reason-string differences inside one class are not defects.

**RUNTIME-02 — nonregular-input availability robustness limitation.** Both history CLIs and Node append's source-file boundary wait at least the one-second observation window when an expected file is a FIFO with no writer. Independently, after 0.3 seconds the subprocess is still waiting; opening a nonblocking writer without sending bytes succeeds and releases each tool to exit1/invalid, empty stdout and unchanged file hashes. This establishes waiting before descriptor type checking, rather than merely a slow process. Source confirms O_RDONLY open precedes fstat. It does not establish a universal infinite duration or violate an invented latency SLA. D06's regular-file rejection/bounded-read intent is only partially realized for this malformed local input; its trusted-directory and hostile-admin exclusions prevent calling this an established remote/security bypass. Treat as partial safe-failure/availability robustness under Phase11–13. Small remediation: platform-supported nonblocking open then descriptor-type rejection, preserving no-follow, size checks, regular-file behavior, error classes and race limits. Add actual CLI FIFO/no-writer tests with valid controls; no new persistence service is needed.

## Independent adversarial coverage and positive controls

`probe.py` executes thirteen signed/malformed cases. Twelve malformed cases reject and actual append leaves directory hashes unchanged; the valid changed captured-message case verifies identically in both implementations and successfully appends. The control is intentionally different from the committed fixture. Thus results test protocol acceptance rather than accidental fixture-byte matching. Valid control succeeds before and after nonregular-file tests. All replay reads preserve hashes.

Policy-private, policy-version, unknown-capability and substituted expression-policy binding fail expression fidelity in both implementations; unknown evidence version stays unsupported. Invalid source + private policy rejects at source validation. Compound profile/signature, kind/organism and kind/parent cases expose diagnostic ordering without allowing effects. Source inspection and existing tests additionally cover historical proof-first idempotence, valid rebasing to original ref, same tuple changed evidence refusal, distinct nonce visits, concurrent duplicate writers, signed sibling conflict persistence/hold, fsync uncertainty and retry, source/profile/output attribution, receipt acyclicity and pending/refused/accepted separation.

Restricted byte tests: depth16 accepts; depths17/100/1000/10000/30000 reject limit in both observed runtimes. No parser-threshold disagreement was reproduced. These are finite samples, not proof over all malformed or over-budget inputs.

D08 causal meaning is the accepted finite grammar rotation, not general learning or subjective significance. Design reviewer independently derives this contract and verifies literal grammar/control outputs. Whole-replay/provenance checks and named ablation prevent presenting digest/head differences as the effect. No-experience/rejected-experience/other-subject/suppressed-relationship and ablation controls are appropriate; latest-motif memory and unverified directional consent remain narrow. A future claim of general adaptation, machine preference or reciprocal social meaning would require new evidence. This runtime reviewer does not independently certify the design reviewer's seven custom causal checks; attribution remains explicit.

## Historical claims challenged after first pass

- P8-01 FIFO behavior: independently reproduced, extended to append source and writer-handshake/no-write controls. Accept the bounded availability claim; reject expansion to authorization/disclosure bypass or an adversarial-admin guarantee.
- P8-02 compound classes: exact retained three cases independently replayed; two disagree and all reject/read-only. Independently generated encounter-rule candidates reproduce both disagreements. Accept diagnostic interoperability gap; reject a uniquely specified winner class or accepted-state divergence inference.
- Historical PM-01 twelve-input corpus: current exact candidates all reject, zero class disagreements. The old three-disagreement result at historical e6d0e66 is not a current-head finding. The PM-01 fix survives these tests; compound outer-envelope disagreements are separate coverage.
- Deep-parser mismatch hypothesis: not reproduced in own expanded 16..30000 sweep. No defect asserted.
- Cached fabricated classify context: rejected as an admission-bypass claim because classify's documented internal precondition requires independently verified states/events. Public store/replay reconstruct context; arbitrary caller misuse does not prove a supported-entry bypass.
- Earlier finite PASS suites remain valid historical observations. Extending them to universal conformance or all original phase/birth gates is unsupported.

Exact historical source file digests and command stdout/stderr/exits are in historical-recheck-results.json. All tested literal historical candidates remain untouched.

## Commands and validation

Run from repository root; exact commands/environment in toolchain.json. Observed Node25.9.0, Python3.14.7, cryptography50.0.2/jsonschema4.26.0. No lower-floor/clean-machine/hosted-CI guarantee is claimed.

| Command | Result |
| --- | --- |
| Targeted Node admission/replay/store/CLI/encounter/conformance suites | exit0, 23/23 pass, 4213.74625ms |
| `.venv/bin/python tests/schema_vectors.py` | exit0, 6/6 pass |
| `.venv/bin/python tests/successor_schema_vectors.py` | exit0, 2/2 pass |
| Own probe.py | exit0; 13 cases, 12 rejection/no-write, 1 valid acceptance; 6 depth cases; 3 FIFO boundaries |
| Own historical_recheck.py | exit0; 12 old PM-01 cases agree; 3 compound cases yield 2 disagreements; all reject/no-write |
| `.venv/bin/python verifier/lineage.py fixtures/reproduction-v1/manifest.json` | exit0, exact 4 nodes / 3 edges |
| `npm test` | exit0, 53/53 pass, fail/cancelled/skipped0, 138051.393708ms |

Full suite includes independent ancestry, reproductive retry/publication failure, six-run population study, simulation, ceremony archives and SIGKILL boundaries. The expected negative Git `not a tree object` diagnostic alone does not determine suite exit. Captured logs, probes and checksums are review evidence, not canonical organism records.

Remaining unverified scope: all malformed combinations, other runtime/platform versions, clean installations, arbitrary power loss/storage outage, malicious administrators, real private input/confidentiality, distributed progress/latest-head completeness, actual birth prerequisites and original all-phase acceptance. Public synthetic source/proof validation cannot establish honest signers or physical truth.
