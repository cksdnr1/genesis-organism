# Total Spec / Phase Plan conformance audit — 2026-10-08

STATUS: audit findings, not protocol acceptance, legal verification or birth authorization.
Audited revision: `2090fcd11b1f81d3fb381849913a6ceb3ed11dc0` on `work/synthetic-phases`.
Oracle: [Total Spec](genesis_organism_total_spec.md),
[38-phase plan](genesis_organism_phase_plan.md), [invariants](../../../spec/README.md),
[original birth gates](../../../spec/GENESIS.md), and dated accepted D01–D14 contracts.
These planning documents include historical descriptions of their original empty
runtime baseline; those descriptions are not present-day implementation claims.

## Verdict

**Do not certify complete conformance.** The bounded synthetic encounter milestone
is demonstrated, and the existing regression suite passes. Two additional probes
found defects outside that suite: unverified supersession ancestry and inconsistent
unsupported-evidence diagnostics. The first is shared by both implementations;
independent agreement alone did not detect it.

All 38 phase directories contain the six expected nonempty workflow artifacts
(`spec.md`, `validation.md`, `plan.md`, `plan-validation.md`, `result.md`, `pr.md`).
That establishes artifact presence, not that every entry/exit obligation passed.
Prior workflow completion records remain historical evidence. This audit does not
change their statuses or claim Novis queue/worker completion.

GENESIS #0001 remains UNBORN / NO-GO. No real candidate, creator key attribution,
release, operational archive or birth act has been supplied. This expected boundary
is not itself a runtime bug or a reason to fabricate a birth to close a phase.

## Fresh verification

Environment observed: Node v25.9.0, Python 3.14.7. Lower declared version floors
were not executed. Existing installed dependencies were used; no new dependency.

| Check | Fresh result and evidence scope |
| --- | --- |
| `npm test` | 50/50 test groups pass, 91.198 seconds; includes concurrency, lineage, population controls and six actual SIGKILL ceremony boundaries |
| `.venv/bin/python tests/schema_vectors.py` | 6/6 checks pass; structural validation and fixed-answer checks, not general semantic conformance |
| `.venv/bin/python tests/successor_schema_vectors.py` | 2/2 checks pass across the selected successor corpus |
| `.venv/bin/python tools/audit_causal.py` | Retained report and freshly generated `node tools/demo_encounter.mjs` report both independently match all 12 later-expression views; grammar changes `[0,64,128,255]` → `[128,255,0,64]`, with no/rejected-experience and ablation controls |
| Additional valid 512-event history | JS/Python exact state and commitment agreement; 513-event history rejected as `limit` by both |
| Retained Phase38 archive/journal roots | Main accepted trial and all six retained interruption trial roots independently rechecked: 7/7 accepted, 195 artifacts each |
| Historical bytes | Seven protected files match `0fd529ee2d8be2db6fa7a8c565ccca776f444527` byte-for-byte: ORIGIN, GENESIS, two historical schemas, #0001 placeholder, Total Spec, Phase Plan |
| Workflow files | All 228 expected artifacts exist and are nonempty; not a fresh PlaySpec status certification |
| Licence bytes | CC text SHA256 `9ba9550ad48438d0836ddab3da480b3b69ffa0aac7b7878b5a0039e7ab429411`; Apache text SHA256 `cfc7749b96f63bd31c3c42b5c471bf756814053e847c10f3eb003417bc523d30` |
| GitHub evidence | PR6 freshly OPEN/draft, head is audited revision, base `work/phase-03-authority`; `statusCheckRollup=[]`, so local passing checks are not CI approval |

The retained ceremony roots are temporary local observations, not durable public
archives. This audit verified their availability now. External prior-art pages
and rights ownership were not independently re-investigated in this code audit.
Existing source ledgers and creator acceptance remain the evidence for those claims.

## Findings and required closing evidence

### A01 — P1: supersession accepts an unverified previous manifest

**FACT / reproduced.** [D12](../../decisions/D12-synthetic-ceremony.md) says:
“Supersession never trusts an unverified prior manifest.” However,
`tools/rehearsal.mjs:104` and `verifier/rehearsal.py:76` apply only shape checks
to `prior.manifest`. Neither validates its selected raw artifacts, revision
availability or explicit-selection bytes. Current-manifest artifact checks do
not validate the predecessor.

Reproduction against the audited revision:

1. Obtain a valid current manifest using `manifestFor(auditedRevision)`.
2. Use a copy as the prior manifest, with a different candidate label and
   `revision = "0".repeat(40)` (no such commit in this repository).
3. Recompute its manifest reference and matching local `fixture-failure` record;
   supply `births: []`.
4. Create a valid successor referencing that prior manifest and sign its freeze
   with the explicitly public TEST1 fixture key.
5. `checkFreeze(successor, freeze, prior)` returns success. Independently constructed
   equivalent input also succeeds in Python `check_freeze`. A further complete
   Git-backed check verifies all 195 current artifacts in JS, and the Python CLI
   exits 0 with identical manifest/freeze references, without rejecting the prior
   revision. Thus this is not merely a helper called before later rejection.

The signature is valid fixture authority; this is not a forged-signature attack.
It demonstrates that an unavailable/fabricated predecessor can satisfy the
supersession check. The original positive supersession test only supplies a valid
predecessor, so all 50 tests still pass. Non-superseding retained fixtures are
unaffected by this particular reproduction.

**Required fix:** verify retained predecessor bytes against its actual selection
and commitment under a defined Git-backed or offline evidence path before accepting
supersession. Add rejection cases for unavailable revision, altered prior artifact,
selection mismatch and absent prior evidence to both implementations. Do not simply
weaken the D12 requirement. `births: []` is also supplied local context, not proof
of complete/global absence: retain that trust limit or bind it to an explicitly
defined local journal check, without inventing a global registry.

### A02 — P2: unsupported encounter evidence is classified differently

**FACT / reproduced.** Start from `fixtures/encounter-v1/000001.json`, set
`body.data.evidence.version = "future"`, and re-sign the event with the public
fixture authority. JS `classify` rejects with `code:"unsupported"`; Python
`verify.py` rejects the same stored event with `error:"invalid"`.

Cause: `src/encounter.mjs:8` explicitly selects `unsupported`, while
`verifier/verify.py:176` uses `need`'s default `invalid`. Both safely reject;
no divergent accepted state was found. D05/D06 require stable diagnostic scopes,
and Phase13 calls for cross-implementation rejection classes, not only nonzero exits.
The current negative conformance tests mostly compare rejection, so miss this.

**Required fix:** align the accepted error classification and compare explicit
classes in shared negative vectors. Seven fresh signed probes covered evidence
version, policy version, frame, event version, kind, bad proof and unknown parent;
the evidence-version case differed. This sample is not an exhaustive error survey.

### A03 — scope/acceptance gap: rehearsal completion is not all birth-gate acceptance

**FACT:** Phase35's report explicitly leaves every real birth gate NOT DEMONSTRATED.
Phase38's plan entry nevertheless says “All birth gates ... accepted.” D12 accepts
synthetic-only experiments and explicitly forbids a real-readiness interpretation.

**INTERPRETATION:** these records support a completed bounded rehearsal, not a
literal claim that all original real birth prerequisites have passed. A failed
real-readiness audit can itself be a completed audit deliverable. It cannot turn
into a GO recommendation through downstream task completion.

**Closing evidence:** make the status distinction explicit wherever phase completion
is reported; before actual freeze, provide separately accepted candidate-specific
evidence for all twelve original gates. If the creator intends a scoped revision
to an original gate, record it explicitly before freeze. This audit does not
reinterpret or modify those gates, nor infer that UNBORN alone violates the plan.

### A04 — P2 documentation gap: current accepted contracts are not indexed by the spec

The Total Spec's file-by-file plan assigns `spec/README.md` the responsibility to
index accepted profiles and invariant versions. That index still leads readers
through conception research and open migration questions, with no current D02–D14
profile index. Concrete contracts are discoverable through implementation reports
and the delegation record instead. This weakens independent engineer navigation.

**Required fix:** append a dated index of accepted public synthetic contracts and
their compatibility/unsupported limits. Preserve historical research and origin
bytes. Do not rewrite an old proposal's pending status to pretend acceptance was
earlier. This is documentation work within the existing phases, not a new phase.

## Execution-phase acceptance matrix

PASS means evidence for the accepted bounded scope, not production readiness.
PARTIAL means an obligation or wider claim is not closed. FAIL identifies a
reproduced contract defect. SKIP is an explicitly accepted optional omission.
Research-phase PASS refers to documented comparison/decision deliverables.
Every row also inherits the global invariant and complexity checks below.

| Phase | Assessment | Requirement → inspected evidence → remaining boundary |
| --- | --- | --- |
| 1 | PASS, scoped | Origin/governance review → D01 and dated rights acceptance, licence mapping/notices → human rights assertion is not independent legal verification |
| 2 | PASS | Encounter requirements before infrastructure → encounter-requirements record, eight candidate responsibilities, three mocks and controls → not a runtime result by itself |
| 3 | PASS, scoped | Identity/authority choice → D02 plus later dated acceptance → one authority, observed fork hold, no exceptional key-loss recovery or global uniqueness |
| 4 | PASS | Canonicalization decision → D03 restricted JCS, integer/Unicode/domain rules and independent literal corpus → does not claim full JCS/CBOR support |
| 5 | PASS | Minimal ordered event contract → D04 and admission truth table → original two kinds plus separately accepted experience successor; no implicit types |
| 6 | PASS, scoped | Data/replay/retention/version policy → D05 → public fixtures only, no encryption, pruning, checkpoints or automatic migration |
| 7 | PASS, scoped | Exact implementation/verifier boundary → D06, builtins/local module graph → Node22/Python3.11 floor compatibility remains unexecuted |
| 8 | PASS, corpus | Closed schemas and byte/proof vectors → standards validator suites, 9 valid/14 invalid literal wire vectors → schemas alone do not enforce UTF8 bytes, signatures or fidelity |
| 9 | PASS, corpus | Admission/proofs/authority → admission tests, proof-first nonce checks → internal `classify` requires verified context, not arbitrary cached state |
| 10 | PASS, corpus | Pure replay and input closure → replay tests, literal prefixes and fresh 512/513 boundary → no live service/model/time dependency |
| 11 | PASS, bounded | Durable append/recovery → store tests, concurrent processes, orphan/partial files and injected fsync failure → no power-loss test; checkpoints explicitly unsupported |
| 12 | PASS, bounded | Thin offline CLI → real subprocess init/append/replay/inspect/error cases → no signing/birth/deploy interface |
| 13 | PARTIAL | Independent canonical/state verification → separate Python implementation and prefix equality → A02 leaves rejection-class conformance incomplete; shared crypto backend disclosed |
| 14 | PASS, scoped | D07 typed successor/fidelity decision → explicit legacy rejection, units/frame/claim boundaries → no actual attestation or universal ontology |
| 15 | PASS, scoped | D13 acyclic evidence/admission contract → nonce tuple, historical policy and derived receipt → refusal is local display, not immutable canonical terminality |
| 16 | PASS, corpus | Deterministic capability negotiation → three mocks, unknown/false/denied/version/frame tests → claims grant neither authority nor actuation |
| 17 | PASS, corpus | Expression attribution and fidelity → three recomputed signal views and substitution negatives → caller supplies verified source state; not proof of machine preference |
| 18 | PARTIAL | Encounter bridge/retry/policy binding → exact retained bytes, actual refs, concurrent/rebased/restart tests → A02; private/redacted/remote evidence explicitly unsupported |
| 19 | PASS, scoped | Meaningful consequence/consent decision → D08 explicit grammar rule and controls → directional claim only, mutual/private consent excluded |
| 20 | PASS, scoped | Verified memory projection/privacy refusal → memory tests/latest subject motif/provenance → no private-memory implementation or deletion promise |
| 21 | PASS, scoped | Relationship causal state and suppression → synapse tests → local suppression is not a canonical revocation event or mutual relationship |
| 22 | PASS, bounded milestone | Encounter A changes later expression → durable treatment/control/ablation tests and independent 12-view audit → later relationship expression is read-only and cannot silently enter evidence-v1 |
| 23 | PASS, scoped | Adaptation criterion before implementation → D09 fixed label-response task → no general learning/fitness claim |
| 24 | PASS, corpus | Explicit individual transitions → adaptation prefixes `[2,1,3,3]`, rejected/no-event controls, fresh-source and override checks → copying an admitted cue is the entire bounded adaptation rule |
| 25 | PASS, scoped | Reproduction/lineage contract → D10 sorted selected parent states, consent and floor inheritance → no mutation/platform/distributed atomicity |
| 26 | PASS, bounded | New child publication and retry → one/two/four-parent tests, injected partial lineage publication → direct contribution validity does not alone certify full ancestry |
| 27 | PASS, bounded | Full independent ancestry → JS/Python graph and node/depth negatives → missing/private ancestors refuse, max32 nodes/depth16, no generation formula |
| 28 | PASS | Preregistered ecology design → D14 before implementation, neutral/no-experience controls and fixed predictions → niche construction explicitly deferred |
| 29 | PASS, bounded study | Actual accepted offspring and controls → six runs, repeated byte equality, independent child graphs, retained injected failure → one generation/two fixed schedules, no statistical or open-ended inference |
| 30 | PASS, scoped | Embodiment/evidence policy → D11 separate body and event authority, permission/range limits → physical truth and hardware safety unproven |
| 31 | PASS, bounded | Optional simulated body loop → replacement/reconnect/duplicate/no-action tests and independent canonical replay → pure simulation, no real actuation |
| 32 | PASS, decision | Justified anchoring choice → comparison and dated creator SKIP acceptance → no external witness/freshness guarantee |
| 33 | SKIP, accepted | Optional adapter → no chain dependency/adapter required by current profile → no reorg/token runtime tests claimed |
| 34 | PASS, contract only | Exact synthetic ceremony decision → accepted D12 roles/domains/selection/archives/retry semantics → implementation violates predecessor verification in A01 |
| 35 | PARTIAL for readiness; audit delivered | Original twelve gates → birth-evidence report plus independent causal gap check → actual NO-GO remains; A01/A02 now reopen relevant evidence |
| 36 | FAIL for supersession | Exact freeze/artifact/proof checks pass for retained nonsuperseding fixture → A01 accepts an unverified prior candidate |
| 37 | PARTIAL | Two-copy offline raw restoration and timestamp/fault controls pass → inherited A01 for superseding candidates; no independent witness/permanent archive/self-contained toolchain |
| 38 | PARTIAL | Pinned synthetic origin, one accepted file, concurrency and six interruption recoveries pass → inherited A01; A03 forbids all-real-gates interpretation |

Historical Phase37 selected 194 files. Phase38's successor selected 195, adding
the historical Phase36 freeze fixture required by later tests. Old reports were
preserved and their limitation appended. This is correct evidence preservation;
it does not make the older archive a complete later test environment.

## Normative invariants and creator revision checks

| Requirement | Assessment / evidence |
| --- | --- |
| Origin | Pinned origin and new-child derivation tested; one acceptance per local ceremony journal. No global uniqueness claim. A01 prevents full supersession certification. |
| Immutable birth | Origin bytes retained across replay/adaptation/reproduction; seven protected historical files unchanged. |
| Continuous existence | Exclusive append and fork hold preserve accepted files; derived caches are not history. Local trusted filesystem assumption remains. |
| Machine-first-class perception | Text/symbol/spatial mocks are independent of observerType and receive expressions from the same verified source. |
| Attributable expression | Recomputed fidelity and state/profile/policy/input/output commitments; independent later-expression audit. |
| Synapse | Explicit directional public claim causes token-order change; no invented affinity score or mutual consent. |
| Explicit evolution rules | D09 fresh admitted cue rule, immutable genesis, no live/random model consensus. |
| Lineage | Parent consent, immutable child packet and independent graph; core history alone is not ancestry validation. |
| Replayability | JS/Python accepted state agreement, retained exact bytes; A02 diagnostic gap remains. |
| Open lineage | Software/Git ancestry distinguished from organism ancestry; no repository-fork-equals-birth behavior. |
| Custody/creator separation | Creator claim remains in immutable origin; key rotation changes authority only. Human attribution and custody registry are not cryptographically proven here. |
| Substrate independence | Core has no blockchain, wallet, vendor, UI or live LLM dependency; simulator is external. |
| Encounter idempotency | Proof-first tuple deduplication, exact/rebased/concurrent/restart retries, changed reuse refusal and distinct nonce visits tested. |
| Policy binding | Complete historical policy retained/bound; signer accepts that context. No mutable policy URL; commitment is not consent/enforcement proof. |
| Meaningful consequence | Actual grammar/presentation change, not counter/digest-only difference; motif0 counterexample and rule ablation retained. |
| Niche construction | Explicit D14 research question; not claimed implemented or required for this single-organism milestone. |
| Evolution honesty | Ontogeny, phylogeny and engineered differential reproduction distinguished. Finite experiments do not establish open-ended evolution. |

## Original birth gates: candidate-specific status

All twelve gates remain NOT DEMONSTRATED for actual #0001. Synthetic evidence is
useful supporting work, not a substitute for an identified/authorized real candidate.

| Original gate | Available synthetic evidence / actual outstanding evidence |
| --- | --- |
| Identity/authority | Tested origin/rotation/conflict rules; no real candidate/controller-key attribution |
| Genome | Immutable signal and inheritance; no final frozen #0001 genome/interpretation |
| Canonical bytes | Restricted profile and cross-language vectors; no candidate-specific freeze |
| Events | Tested envelopes/admission/order; no real candidate event policy acceptance |
| Replay | Independent fixture replay; no real candidate recovery/input-availability proof |
| Perception | Three bounded views; no accepted real candidate expression profile |
| Experience | Public directional memory/synapse and explicit adaptation; real candidate privacy/consent scope not accepted |
| Lineage | Bounded authorized inheritance/ancestry; no real candidate lineage contract freeze |
| Versioning | Pinned synthetic interpreters; no operational long-term dependency/compatibility preservation |
| Commitments | Fixture proofs and raw hashes; A01 open, no real creator-bound commitment |
| Publication | Two local archives presently verifiable; no actual reviewed release/operational archive |
| Birth act | Bounded retry-safe fixture procedure; no actual candidate-specific authorization/accepted act |

## Minimal Sufficiency / removal review

All D01–D14 mechanism records inspected contain a minimality/complexity justification
(some heading titles include review/verification). No D15, new execution phase,
numeric complexity field or runtime dependency was introduced by this audit.

Retained complexity is justified by existing requirements: two implementations for
independent verification; nonce for retry identity; domains/proofs for attribution;
policy commitments for disclosure context; controls/ablation for causality; selected
parent proofs for lineage; raw bytes for recovery; exclusive publication/holds and
negative tests for correctness. These must not be removed to make the code smaller.

Potential future infrastructure was checked against the accepted scope:

| Mechanism | Disposition |
| --- | --- |
| Checkpoints, pruning, Merkle indexes, distributed consensus | DEFERRED; unsupported checkpoints reject, retained genesis replay works within explicit budgets |
| DID/MCP/A2A/PROV/C2PA adapters and universal capability ontology | DEFERRED; no accepted interoperability experiment needs these implementations |
| Blockchain/token/reorg machinery | SKIPPED for current profile; does not add a required property |
| LLM/embedding/generic memory services | OMITTED; deterministic four-token grammar demonstrates the required causal loop |
| Private encryption, mutual-consent protocol, recovery trustees | DEFERRED, explicitly unsupported; cannot claim their guarantees from public fixtures |
| Population and simulated body | Retained outside the minimal encounter core for separately accepted D14/D11 experiments; unnecessary for running Phase22 |
| Ceremony manifest/stage proofs/local lock/two archives | Retained outside the canonical core for distinct accepted rehearsal experiments; A01 must be fixed without adding a general registry |

## Coverage and limits

The handoff's H00–H28 and revision R01–R12 are traced in the Total Spec. This audit
rechecked their implemented consequences through the phase matrix: origin/nonclaims/
art/licensing (1–2), identity/genome/events/bytes/replay/privacy/versioning (3–13),
machine encounter/expression (14–18), memory/synapse (19–22), adaptation (23–24),
new child/lineage (25–27), ecology (28–29), evidence/body (30–31), optional substrate
(32–33), birth/evidence/history (34–38). Price, machine appreciation, novelty priority,
sentience, private-data confidentiality, physical truth and indefinite evolution
are not established outcomes. The 50 tests are bounded evidence, not formal proof.

Remaining verification limits: one observed OS/toolchain; no Node22/Python3.11 run,
fresh-machine dependency installation, disk power-loss simulation, hostile-admin
filesystem test, external timestamp/witness or decades-long retention experiment.
Offline archive checks validate exact raw files and fixture origin/journal; they do
not run the complete archived development toolchain without retained Git/runtime.
Current GitHub PR has no registered CI checks. Self-review scores in historical
workflow documents are not measured conformance or independent human approval.

## Next work within existing phases

1. Close A01 in the Phase36–38 procedure and independent checker, retaining failed
   repro evidence and adding adversarial predecessor tests.
2. Close A02 in Phase13/18 negative conformance with explicit diagnostic vectors.
3. Add the current accepted-profile index (A04) and retain A03's scope distinction
   in execution summaries. Do not revise the oracle to fit the implementation.
4. Rerun affected tests, full regression and independent archive/causal checks at
   the corrected revision. Record exactly which findings close.
5. Keep actual #0001 NO-GO until separate creator-reviewed candidate evidence.

This audit changes documentation only. No runtime, schema, historical origin,
Total Spec, Phase Plan, ceremony fixture or real-organism record was changed.

## Later corrective evidence — 2026-10-08

The findings above remain the historical audit of2090fcd. Four separate corrective
mono-spec tasks are documented in [the remediation report](audit-remediation-2026-10-08.md).
At b2c2b2f, live predecessor bypass A01 and tested diagnostic disagreement A02 are
fixed; A03/A04 scope/navigation gaps are addressed. Offline supersession explicitly
refuses absent predecessor bytes. All52 regression groups pass, original protected
bytes remain unchanged, and actual candidate birth gates remain unestablished.
This later evidence does not retroactively turn the original audit into a pass
or certify complete protocol conformance or actual #0001 readiness.
