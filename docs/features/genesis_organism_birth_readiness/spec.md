# Evidence-backed GENESIS #0001 preparation

STATUS: DRAFT FOR INDEPENDENT SPEC REVIEW. No original birth gate changes.
Source: docs/planning/genesis-organism/birth-readiness-source.md. Baseline c9c12b0.
Oracle: original Total Technical Specification, Encounter Phase Plan, spec/GENESIS.md
and accepted D01–D14 records, respecting their explicitly synthetic scope.

## Problem and concrete result

The implementation only accepts synthetic-v1. Its public rehearsal authority cannot
represent the creator. Existing passing tests establish bounded mechanisms, not a
specific real candidate. Deliver a reviewable unsigned real-purpose profile proposal,
provisional origin template, key/attribution and operational ceremony procedure,
Git-bound raw evidence inventory, and fresh independently checked provisional vectors
and encounter causal controls. Every gate is assessed against that proposed candidate;
unknown facts and unaccepted contracts remain NO-GO. No profile implementation is
admitted until its real-purpose contract is accepted.

Compare explicit real-purpose adoption of existing synthetic-v1 semantics/domains
with a distinct genesis-v1 namespace; neither is presumed required/accepted. Reuse the
restricted canonical/Ed25519/SHA-256 primitives and adaptation-v1 transition semantics,
three existing observer procedures, public-only memory/synapse and bounded lineage
semantics. Initial proposal: genome.signal=0, no events, children, prior experiences
or synapses, discriminator genesis-0001. These are review choices, never assigned
birth input or identity. Existing synthetic-v1 remains byte-identical and supported.
The proposal must enumerate exact per-module profile literals/domain dependencies,
version/history limitations and decisions requiring acceptance. No opaque universal
profile framework or new D-number/roadmap phase.

## Acceptance criteria

1. Concrete real-purpose proposal maps each choice to accepted synthetic source and
   original requirement, including exact domain bytes and unsigned body template.
   Explicitly separate real-purpose acceptance from fixture implementation evidence.
2. A bounded offline preparation tool selects regular Git blobs at an explicit full
   source commit and records raw SHA-256 inventory, exact environment/dependency
   versions and reproducible preparation commands. No wildcard worktree capture,
   private-key input/output, signature/actual identity creation or lifecycle writes.
3. Generate an ephemeral-key synthetic shadow only for additional independent
   canonical/signature/replay checks. Private key remains process-local; retained
   public bytes clearly label provisional synthetic evidence, never actual #0001.
   Independently verify exact bytes/commitments and valid/forged/cross-domain cases.
4. Fresh causal encounter evidence includes three views, no-experience,
   rejected-experience and ablation controls. Cite its actual tested source commit;
   fixture experiment is explicitly not a real candidate's lived history.
5. Twelve-gate matrix and Phase38 entry retain NO-GO for unaccepted real profile,
   missing attribution/key/candidate acceptance and separate concrete authorization.
   Report dependency availability from measurements; actual publication/archive
   evidence is needed at its relevant act, without requiring an optional chain or
   independent timestamp. Separate pre-freeze recommendations from completed
   release/birth evidence; deferred acts cannot be marked completed. No invented passes.
6. Prepared procedure covers controller rotation/loss/conflict, rights scope,
   complete source/dependency retention, two operator-specified archives and verified
   recovery, independent witnessing limits, retry/partial failure/supersession and
   exact freeze/release/birth approval boundaries. Do not execute them.
7. Independent spec and plan approval precede implementation. Independent evidence
   review, focused/full regression and supported PlaySpec CLI precede draft PR.

## Minimality and ownership

One owner mutates source/workflow and parent spec/plan/result/pr. Reviewers own their
separate validation/evidence paths. One preparation tool and relevant negative tests
are justified by candidate/source binding missing from fixture-only reports. Reuse
existing independent verifier and causal audit; introduce no dependency, service,
registry, lifecycle schema, unaccepted real profile runtime or artificial child phase.
Removal of candidate/source binding recreates the current false-readiness risk.
Existing untracked audits were backed up and remain untouched. Feature branch only;
rollback is reverting scoped branch commits, no cleanup/default push/merge.

## Fixed preparation-tool contract

Path tools/prepare_birth.mjs; CLI `node tools/prepare_birth.mjs FULL_GIT_COMMIT NEW_OUTPUT`.
No options/key inputs. Require exactly a 40-lowercase-hex existing commit resolving
to a commit object. Require source HEAD equal that commit, tracked worktree/index
clean, and tool's tracked blob byte-identical to executing source; fail before
output creation otherwise. Untracked reviewer/historical audit files are excluded.
Use git ls-tree recursively at that commit; select EVERY tracked regular blob
except .playspec/ bookkeeping, with sorted unique relative normalized paths.
Reject any selected symlink/submodule, traversal or nonregular mode. Bound 1024
selected artifacts, 32MiB aggregate raw and 8MiB per blob. Inventory hash alone
claims provenance, not archive availability. Include exact selection policy.

Output must be a new directory immediately below an existing real directory outside
repository, with no symlink ancestors; mode0700. Refuse repository/organisms inputs,
existing output and symlinks. No overwrite or adoption/reset/retry of existing output.
Owned partial output is retained on error with INCOMPLETE marker; start a different
new directory after inspecting failure. File writes exclusive0600, bounded8MiB.
No cleanup occurs. After all report writes succeed exclusively write COMPLETE, then remove INCOMPLETE
as the last operation. Accept only the exact complete member set with COMPLETE
present and INCOMPLETE absent. After the initial marker is successfully written, later failures retain INCOMPLETE
(possibly alongside COMPLETE). Initial marker creation itself may fail; absence
of the exact complete member set always means incomplete, never accepted. Tool result stdout only output path, source revision and provisional/no-go scope.
Outputs are exactly inventory.json, environment.json, shadow-origin.json,
shadow-result.json, shadow-negative.json, shadow-event.json, shadow-demo.json,
demo.json, COMPLETE (or INCOMPLETE on
failure). Inventory closed shape {version:1,purpose,revision,selection,artifacts},
artifacts sorted {path,sha256,size}. Environment closed shape {node,platform,arch};
Python/dependency versions and independent checks are separate reviewer evidence.
Reports use readable JSON, origin uses existing canonical bytes. COMPLETE is only
preparation completeness, never birth/gate acceptance; text states that explicitly.

Shadow origin uses fresh process-local generated Ed25519 test key, profile
synthetic-v1, rules adaptation-v1, birth provisional-birth-readiness-shadow,
creator PROVISIONAL SYNTHETIC TEST ONLY, genome.signal0. Never export/private-log
key material. shadow-result stores {purpose,state,commitment,canonicalBodyHex,
originProofPrefixHex}; negative array stores {case,origin,expectedCode} for forged
origin signature and signature over genesis-v1/origin-proof NUL with same body.
Both reject invalid under existing synthetic validator. No real #0001 origin or
signature created. Demo is existing demonstrate() output, explicitly fixture-only.
Independent Python reviewer recomputes canonical body bytes, proof/domain, identity,
state/commitment and negative verdicts from retained public bytes, and audits all
causal controls using existing audit_causal.py. Verification never invokes JS.
Tests cover wrong revision, dirty tracked source, existing/inside/symlink output,
selected nonregular Git objects, corrupt shadow bytes and cross-domain refusal;
reuse existing subprocess/temp fixtures. No real runtime/ceremony execution path.

Shadow-event is one authorized experience-v1: fresh initial shadow state, symbols
observer subject provisional-observer, existing public-synthetic policy, expression
computed from that state, nonce provisional-encounter-one, interaction motif2 and
message PROVISIONAL SYNTHETIC INPUT. Sign process-locally with shadow key. Shadow-demo
retains admission/duplicate/rejected outcomes, restored and rejected states,
memory/synapse, and all three relationship views with omitted/rejected experiences
and no-memory-control ablation. Rejected control is a genuinely classified forged
event and its unchanged history, not an asserted control label. Adaptation changes
signal0→2, so ablation shares treatment state2 and removes only memory/synapse;
it is NOT expected equal to omitted/rejected state0. Independently check exact
three-arm state/effect and within-treatment memory ablation, including source and
output commitments. Do not use fixed encounter-v1 audit as the shadow oracle.
