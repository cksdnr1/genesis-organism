# Bounded preparation implementation plan

STATUS: DRAFT FOR INDEPENDENT PLAN REVIEW. Implementation waits for separate
spec and plan approvals. Scope is preparation evidence, not real-purpose adoption
or lifecycle execution. Existing synthetic runtime remains unchanged.

1. Implement tools/prepare_birth.mjs exactly per spec's fixed CLI contract. Helpers
   inventoryFor(repository,revision), outputGuard(repository,destination) and
   shadowEvidence() allow focused owned-fixture testing; CLI uses module-derived
   repository only. Git calls use execFileSync arguments, no shell. Commit object
   validation and clean HEAD/tool-blob checks precede output creation. Read every
   selected raw blob with bounded output; skip only .playspec bookkeeping, preserve
   all historical evidence and dependencies already tracked. No claim this inventory
   itself is an archive. Refuse nonregular modes and validate path components.
2. New output directory/file publication follows exclusive creation and marker
   contract. Validate every existing ancestor by lstat/realpath before writing;
   no symlink adoption. Trusted private output parent is the operating assumption;
   fail on changed identity observed before each file write. Retain partial bytes
   and INCOMPLETE on failure; no automatic cleanup or retry. Publish COMPLETE exclusively before removing INCOMPLETE as the last operation;
   an unlink failure retains both and must fail complete-member verification.
   Complete marker states
   PROVISIONAL PREPARATION ONLY; GENESIS #0001 UNBORN; not a gate pass.
3. Build process-local Ed25519 ephemeral shadow origin and one adaptation experience
   with existing express/replay/classify/memory/synapse/relatedExpression. Retain
   only public signed bytes and public vectors. Verify origin canonical hex and
   prefix; forge origin proof and cross-domain sign as explicit negative vectors.
   Classify forged experience against origin state, retain its rejected outcome and
   unchanged history; treatment accepted then duplicate. Use three observer profiles,
   ordinary treatment, omitted/rejected histories and same-treatment-state memory
   ablation. Retain fixed encounter demo separately for historical continuity.
4. Add tests/prepare-birth.test.mjs for inventory blob/raw hashing and tampering at
   revisions, malformed revisions/noncommit, symlink/submodule rejection, external
   new-only output/symlink ancestor/inside repository refusal, public shadow proof
   checks and causal controls. Tests own temporary Git repositories/directories,
   never user data. No lifecycle functions or real profile input are added.
5. Reviewer independently implements/checks retained public shadow evidence in own
   evidence directory with existing Python primitives, not calling JS. Exact
   canonical/signature/replay/state/commitments, negative verdicts and all 12 shadow
   views/provenance must match. Challenge tampered output, source and proof domains.
   Report tested dependency/interpreter versions; system-python failure is not
   presented as venv dependency absence.
6. Update candidate proposal, per-act operations runbook and twelve-gate packet using
   measured facts, reviewer governance audit and original criteria. Retain source
   commit, selection/inventory hashes, independent check commands and exact scopes.
   Rights/key/archive/real applicability remain explicit questions. Distinguish
   conditional pre-freeze recommendation from unperformed release/birth gates.
7. Run focused tests then full npm test and existing schema/lineage/causal checks
   appropriate to accepted historical contracts. Commit source/tool/tests before
   live preparation so inventory binds exact tested source commit; keep subsequent
   report commits separately identifiable. Run output tool on that clean revision,
   independently verify and retain bounded public evidence under evidence/.
8. Separate reviewers challenge implementation and complete packet; resolve actual
   findings, repeat only affected tests. Use supported mono-spec CLI sequentially
   and reviewer report hashes for all gated completions. Draft PR targets current
   default genesis/protocol-origin after fresh remote/head checks. No merge/tag/
   release/birth; do not mark task achieved with missing preparation artifacts.

Rollback: revert scoped feature-branch commits. Existing untracked PR8 audit files
were backed up /tmp/genesis-birth-prework-1791437370 and preserved. Preparation
outputs are owned external scratch with public-only data and explicit provisional
markers; removing them is not needed. No secrets, new dependency, service, cache,
canonical field, protocol event, schema or roadmap phase is introduced.

Minimality: one offline tool is needed to bind concrete provisional bytes and causal
controls to an identified clean source. Existing fixed fixture report cannot test
the proposed adaptation shadow or exclude fixture-key confusion. Reuse existing
runtime and Python primitives instead of a generic candidate/ceremony framework.
Independent evidence is necessary because JS/Python can share incorrect assumptions.
