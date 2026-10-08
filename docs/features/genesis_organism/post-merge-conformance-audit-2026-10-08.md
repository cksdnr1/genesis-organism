# Post-merge Total Spec / Phase Plan audit — 2026-10-08

STATUS: audit evidence, not complete conformance acceptance or birth authorization.
Audited merge: `e6d0e6633fd657216549fd64f1031a6d96fd7b87`.
PR6 merged2026-10-08T02:47:48Z into **work/phase-03-authority**, using a merge commit
with ef41d33 and 0df7207 as parents. Its tree exactly equals tested PR head ef41d33.
This is not a merge into the default branch genesis/protocol-origin. PR3–5 remain
open stacked predecessors; current authorization did not merge them.

Oracle: [Total Spec](genesis_organism_total_spec.md),
[38-phase plan](genesis_organism_phase_plan.md), [accepted contracts](../../../spec/README.md),
[original birth gates](../../../spec/GENESIS.md). Reviewed the source constraints,
all numbered phase entries/exits, H00–H28, R01–R12, existing audit/remediation and
current source/negative tests. Original planning-baseline descriptions are historical,
not present-day runtime claims. No oracle was changed to fit the implementation.

## Verdict

**Complete Total Spec / Phase Plan conformance is NOT established.** The bounded
encounter-centered product milestone and most accepted synthetic contracts have
evidence. Full regression passes, but a broader negative corpus reproduces three
additional independent diagnostic disagreements outside the A02 seven-case corpus.
Phase13/18 rejection-class obligations therefore remain incomplete. Phase38's
original all-birth-gates entry is also not established for actual #0001; a local
completed task and successful public fixture ceremony cannot satisfy it.

All38 local workflows are freshly completed, with228 nonempty versioned artifacts.
These facts are bookkeeping evidence, not38 unconditional protocol acceptance gates.
Actual GENESIS #0001 remains **UNBORN / NO-GO**. No real birth requirements were waived.

## Fresh verification at the merge

| Check | Observed result / scope |
| --- | --- |
| `npm test` |52/52 groups pass; zero failures/skips,134.303 seconds. Includes corrected predecessor verification, seven explicit diagnostic cases, concurrency and six real process-SIGKILL ceremony boundaries. Ceremony fixtures use the merged GitHEAD. |
| `.venv/bin/python tests/schema_vectors.py` |6/6 pass. |
| `.venv/bin/python tests/successor_schema_vectors.py` |2/2 pass. |
| `.venv/bin/python tools/audit_causal.py` |12 views independently match retained report. Fresh `node tools/demo_encounter.mjs` report also matches12 views: grammar [0,64,128,255]→[128,255,0,64], matched no/rejected-experience and ablation controls. |
| `.venv/bin/python verifier/lineage.py fixtures/reproduction-v1/manifest.json` |Exact accepted4-node/3-edge ancestry. |
| Additional byte corpus |17 independent canonical-value cases match, including scalar Unicode, UTF16 supplementary/BMP key order and integer endpoints. |
| Additional history limits |512 signed events: exact JS/Python state/commitment match;513 events: both reject limit. |
| Broader signed encounter diagnostics |12 negative inputs all reject;9 classes match, **3 disagree**. Reproducible audit probe exits1 deliberately to signal disagreement. |
| Historical evidence |Seven protected files byte-identical to baseline0fd529; original38 phase headings and H29/R12 traceability rows intact. No tracked .playspec internals. |
| Workflow inventory |Fresh supported CLI reads: all38 phase tasks completed; all228 expected spec/review/plan/review/result/pr artifacts nonempty.14 accepted D-records retain minimality sections. |
| GitHub |PR6 MERGED; before merge CLEAN/MERGEABLE, no registered CI checks, base verified. No admin bypass, squash, rebase, force-push or branch deletion. |

Observed environment: macOS, Node25.9.0/Python3.14.7 and already installed pinned
dependencies. Lower declared floors and hosted CI untested. Regression success
is not formal proof. Expected negative Git probes emit “not a tree object”; that
diagnostic is not a suite failure. Source claims/rights and prior-art ledgers were
reviewed for scope, not independently re-researched on the public internet or
legally verified during this implementation audit.

## PM-01 — P2: broader encounter rejection classes still disagree

FACT / reproduced with valid fixture-authority signatures over changed bodies.

| Mutation inside evidence-v1 | JS admission | Independent Python directory verifier |
| --- | --- | --- |
| observer.version = future |rejected/invalid |exit1/unsupported |
| observer.capabilities.future = claimed supported descriptor |rejected/invalid |exit1/unsupported |
| policy.disclosure = private |rejected/invalid |exit1/unauthorized |

Cause: [verifyExpression](../../../src/expression.mjs) catches all validation errors
and returns false; [validateEvidence](../../../src/encounter.mjs) turns that false
into invalid. [Python expression_result](../../../verifier/verify.py) preserves
unsupported observer-version/capability and unauthorized disclosure errors. Both
reject the inputs and neither reports a successful state. This is diagnostic/API
conformance and the privacy/unsupported distinction, **not an observed admission
or disclosure bypass**. D06 stable diagnostic classes and Phase13 rejection-class
comparison require a consistent contract. Accepted state bytes are not affected.

The earlier A02 fix remains correct for evidence.version and its recorded corpus.
It did not establish universal agreement, and its result explicitly limited that
claim. This expanded corpus exposes additional paths rather than rewriting that
historical result as if its tests had failed.

Reproduce from repository root:

```sh
node docs/features/genesis_organism/post-merge-audit/diagnostic-probe.mjs
```

Expected current audit outcome: exit1,12 cases,3 disagreements. The probe records
exact signed candidate envelopes in [diagnostic-results.json](post-merge-audit/diagnostic-results.json).
It creates and removes only owned synthetic temp directories. It is audit evidence,
not part of npm test or a production interface. The first exploratory invocation
assumed a text capability absent from the fixture and failed during probe setup;
that assumption was removed before the complete twelve-case run and preserved corpus.

Closing evidence: make the evidence-envelope diagnostic mapping explicit and
consistent without changing accepted state/byte semantics; retain all12 exact
negatives and literal expected classes, test actual admission plus independent CLI,
and rerun affected/full conformance. Do not blindly flatten every failure or use
one implementation's answer as the oracle. No runtime fix was made in this audit.

## Phase-by-phase assessment

PASS below means **accepted bounded scope only**. PARTIAL leaves a stated obligation
or larger claim open. SKIP is an accepted optional omission. Decision-phase PASS
means the comparison/decision deliverable, not implemented future guarantees.
Every row inherits the original invariants, Minimal Sufficiency and evidence limits.

| Phase | Assessment | Evidence and remaining boundary |
| --- | --- | --- |
|1 |PASS, scoped |D01/origin/prior-art/governance and dated rights acceptance retained; no independent legal/priority certification. |
|2 |PASS |Encounter requirements, candidate receipt responsibilities, mock walkthroughs and causal controls precede infrastructure. |
|3 |PASS, scoped |D02 immutable origin, historical authority and observed fork hold; no universal uniqueness/lost-key override. |
|4 |PASS |D03 restricted JCS/crypto/domain decision and independent literal/extra byte cases; no full JSON/CBOR claim. |
|5 |PASS |D04 minimal events/order/proof-first duplicates/conflict and separate accepted experience extension. |
|6 |PASS, scoped |D05 explicit public-only, retention/permission/version/failure scopes; private encryption/pruning/migration excluded. |
|7 |PASS, scoped |D06 small builtin core and separate Python verifier; tested environment only, common low-level crypto disclosed. |
|8 |PASS, corpus |Schema suites6+2 and canonical literals; structural validation is not signature/semantic validity. |
|9 |PASS, corpus |Admission/proof/authority/stale/cross-organism/resource negatives; internal classify needs verified history context. |
|10 |PASS, corpus |Pure replay, matching prefixes and fresh512/513 limits; no model/clock regeneration. |
|11 |PASS, bounded |Exclusive append, crash/retry, conflict holds/fsync uncertainty; checkpoints unsupported, power-loss not demonstrated. |
|12 |PASS, bounded |Actual CLI subprocess paths/errors/read-only checks; no birth/deploy interface. |
|13 |PARTIAL; diagnostic obligation FAIL |Independent accepted replay/bytes match, but PM-01 rejects with three different diagnostic classes. |
|14 |PASS, scoped |D07 typed claimed capability and derived phenotype decision; old schema compatibility explicitly rejected. |
|15 |PASS, scoped |D13 acyclic evidence→event→outcome, tuple nonce identity and historical policy binding; refusal is local display. |
|16 |PASS, corpus |Three mock profiles, fixed priority, unknown/denied/version/unit/frame bounds; no capability→authority inference. |
|17 |PASS, corpus |Recomputed output/source/profile/policy fidelity; no subjective machine-valued meaning claim. |
|18 |PARTIAL |Admission/receipt/retry/concurrency/policy evidence passes; PM-01 diagnostics remain; private/remote/redacted inputs unsupported. |
|19 |PASS, scoped |D08 explicit later grammar consequence and matched controls; directional claim, mutual consent excluded. |
|20 |PASS, scoped |Replay-derived latest motif/provenance and privacy refusal; no secret-memory confidentiality/deletion guarantee. |
|21 |PASS, scoped |Causal directional relationship/suppression; no affinity scoring or canonical revocation. |
|22 |PASS, bounded product milestone |Fresh independent12-view causal audit, no/rejected-experience/ablation controls; later relationship view is read-only. |
|23 |PASS, scoped |D09 fixed label-response adaptation criterion accepted before transition; no general learning. |
|24 |PASS, corpus |Fresh cue change, immutable genesis, denied overrides/stale inputs and independent prefixes. |
|25 |PASS, scoped |D10 selected parent state/consent/new-origin/floor inheritance; no implicit universal parent model. |
|26 |PASS, bounded |Authenticated child publication/retry/partial failure, parents unchanged; direct packet validity alone is not complete ancestry. |
|27 |PASS, bounded |Independent4-node graph, recursive missing/cycle/forgery/resource negatives; no global ancestor availability. |
|28 |PASS, research |D14 preregistered finite controlled question and uncertainty; niche construction deferred explicitly. |
|29 |PASS, bounded study |Six fixed runs, actual accepted offspring/control counts, failure retained and no incomplete-child counting; no open-ended inference. |
|30 |PASS, scoped |D11 body authority/permission/claim boundaries; no physical reality/safety proof. |
|31 |PASS, bounded |Simulated replacement/reconnect/stale/concurrent/duplicate/no-action tests and independent replay. |
|32 |PASS, decision |D12 anchoring comparison and creator-accepted SKIP; no chain/witness/freshness guarantee. |
|33 |SKIP, accepted |No optional chain adapter necessary; no fabricated reorg/token runtime result. |
|34 |PASS, contract only |Accepted synthetic ceremony roles/domains/archive/retry boundaries; actual creator/key/ceremony not supplied. |
|35 |Audit delivered; actual readiness NO-GO |All12 original real birth gates still unestablished; synthetic audit delivery is not freeze recommendation. |
|36 |PASS, live bounded correction |A01 fabricated predecessor revision/hash/blob/list cases now reject; Git-backed raw evidence required. |
|37 |PARTIAL beyond nonsuperseding restore |Current two-copy/offline archive checks pass; offline supersession explicitly unavailable without prior bytes, no independent witness/indefinite retention. |
|38 |PARTIAL original entry; bounded journal passes |Retry/conflict/SIGKILL fixture evidence passes. Original all-birth-gates entry is not established for actual #0001. |

## Invariants, revisions and minimality

Immutable genesis/history/creator claim, new child identity/ancestry, body/custody
separation, first-class machine observers, source-attributable expressions, causal
relationships, explicit adaptation rules and independent accepted replay remain
demonstrated within the accepted public synthetic contracts. Hashes/signatures
are infrastructure, not a substitute for the encounter. Current diagnostic PM-01
does not alter successful state equality but prevents complete error conformance.

All12 creator Minimal Sufficiency validation questions were revisited: no weakened
invariant/security boundary/negative test; no mandatory blockchain/model/population
for a single organism; Phase22 preserved; historical bytes retained; no D15/new
execution phase/birth; future complexity may emerge through valid history; optional
adapters remain outside validation/replay. Core size is a responsibility boundary,
not an invented line-count metric. D01–D14 minimality sections remain present.

Removal review: retain signature domains, exact bytes, policy/nonces, controls/ablation,
independent code, ancestry proofs and no-overwrite/hold/recovery checks because
removal breaks accepted invariants/evidence. Checkpoints/Merkle pruning, DID/MCP/A2A/
PROV/C2PA adapters, private crypto/consent/recovery frameworks and universal robot
ontologies stay deferred. Blockchain is SKIP. LLM/embedding/generic memory services
remain omitted. Population and simulation are separate accepted bounded studies,
not dependencies for Phase22. Full offline supersession requires a future justified
retention contract; no speculative mechanism was added.

## Real birth and remaining verification limits

All original gate categories remain NOT DEMONSTRATED for actual #0001: identity/
authority, genome, canonical bytes, events, replay, perception, experience, lineage,
versioning, commitments, publication and birth act. There is no real candidate,
creator-bound production key, accepted operational archive/release or authorized
actual birth. [Readiness scope](readiness-scope.md) still governs these distinctions.

No lower-floor toolchain, clean-machine installation, hostile-admin filesystem,
disk-power-loss, external witness, global latest-head, long-term availability,
private/encrypted memory, mutual consent, physical capability or open-ended
evolution result is inferred. Local public test keys are not creator identity.
Trusted supplied births=[] is not global absence proof. A valid historical prefix
is not a globally current head. Historical archives are evidence for their selected
source revision, not automatically the newly merged source or a future toolchain.

## Changes made by this audit

Added this report, a separately runnable diagnostic probe and retained exact
negative inputs/results, boundary and static inventories. Appended dated status
clarification; original reports, Total Spec, Phase Plan, origins, schemas, canonical
fixtures and runtime bytes preserved. No defect was silently patched during audit,
no new phase/task hierarchy and no real freeze/release/birth/mint/deploy. Evidence
branch derives from the exact merged revision. Further correction should close
PM-01 within existing Phase13/18 scope and preserve this failed evidence.
