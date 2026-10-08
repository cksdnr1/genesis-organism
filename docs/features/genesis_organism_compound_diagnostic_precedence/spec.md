# IC02 technical specification: compound diagnostic precedence

## Scope and use case alignment

An independent verifier must classify the same malformed synthetic origin/event consistently while continuing to refuse it without effects. Repair confirmed Phase13/D06 class disagreement through an additive, independently reviewed D04/D06 clarification and minimal independent validator ordering. This is diagnostic interoperability, not a proven unsafe admission or canonical-state fix. Current user explicitly authorizes correction; no new D-number/phase/profile/state/schema.

## Current implementation and architecture

Node validates canonical envelope/closed shape/signature encoding before body version and event vocabulary; Python validates body version/context before signature encoding and checks organism before kind. Both reject the retained compounds but two classes differ. Runtime/proof/hash/reducer inputs and single-fault evidence diagnostics are already accepted. Independent code stays independent; shared fixture values are allowed, shared admission/reducer logic is not.

## Relevant files, entry paths and bypass boundaries

Read D03/D04/D06/D13 PM-01, independent source/problem/evidence, src/admission.mjs, src/bytes.mjs, src/replay.mjs, verifier/verify.py and tests/conformance.test.mjs. Node classify is internal verified-history only; store/CLI reconstruct context first. Python directory verifier reconstructs history and calls origin_state/classify. Python proof is reused by other verifiers; its own encoding checks remain defense in depth. Standalone negotiation differs intentionally from evidence fidelity. No receipt/memory/adapter alternate acceptance path is introduced.

## Structured verified evidence

| Source | Exact subset | Observation | Disposition |
| --- | --- | --- | --- |
| parent runtime/probe-results.json | wrong-organism-and-unknown-kind | Node unsupported / Python invalid, reject/no-write | close class parity |
| parent runtime/probe-results.json | unknown-profile-malformed-signature | Node invalid / Python unsupported, reject/no-write | close class parity |
| parent runtime/historical-recheck-results.json | exact three historical compounds | two disagreements, all reject/read-only | preserve original evidence, add regression |
| retained post-merge-audit/diagnostic-results.json | twelve PM-01 candidates | current invalid except evidence-version unsupported | preserve exact bytes/classes |
| D06 stable classes | invalid/unsupported/unavailable/unauthorized/conflict/limit/io | exact diagnostic vocabulary | reuse, no flattened class |
| D13 fidelity and D07 standalone | policy/version/frame failure inside evidence invalid; standalone unsupported/unauthorized | intentional context mapping | preserve |

D04 high-level order does not uniquely close every compound; neither implementation is the oracle. The following explicit proposal requires independent acceptance before code. Historical D04/D06 source bytes remain untouched; a dated separate decision supplement records current clarification, rationale and acceptance provenance.

## Proposed clarification and independent rationale

Scope only origin/event envelope admission. Order:

1. Existing required history/conflict/availability and raw input resource/canonical parsing boundaries remain. Internal classify still requires verified context; no change to that precondition.
2. Canonical JSON and envelope exact body/signature membership. Signature *encoding* is structural: 128 lowercase hex, before interpreting a body profile. This is not cryptographic proof verification and establishes a well-formed proof-bearing envelope regardless of claimed protocol.
3. Exact common body member set, then supported profile/rules dispatch. Version dispatch precedes profile-specific domain checks, preventing an unknown protocol from being interpreted as known-kind content.
4. Profile-selected structural/domain validation. Origin: birth/creator, genome shape+signal and authority encoding before proof as existing D04. Same-invalid-class structural predicates need not share detailed-reason precedence; the version/kind/context boundaries that change classes are fixed. Event: reference encodings, bounded sequence, supported kind and that kind's data shape/domain; experience evidence remains opaque until historical authority checks.
5. Context/proof/transition semantics. Origin verifies authority proof then derives state. Event checks organism→known historical parent→sequence relation→historical proof→non-noop rotation/rule restriction→evidence source/fidelity/nonce/adaptation semantics. Then duplicate/conflict/current append decisions, always proof-before-duplicate.

Reasons independent of implementation: structural wire/proof-format errors are invalid without attempting unsupported protocol interpretation; a structurally valid unknown profile/kind gets unsupported before organism-specific facts, so context does not determine whether the local interpreter knows the vocabulary; historical authorization precedes experience evaluation or duplicate success. This chooses one permitted refinement of D04 stages; it does not claim the old text already required every proposed tie-break or that Node was authoritative.

Literal outputs: wrong-organism+unknown-kind→unsupported; unknown-profile+malformed-signature→invalid; their triple-fault control→invalid. Supported kind with wrong organism remains invalid; structurally valid unknown profile alone stays unsupported; bad proof alone invalid. Origin unknown profile/rules+malformed-signature also invalid by common envelope rule. Detail reason strings are non-consensus and need not match. Existing D13 contextual mappings remain untouched.

## File-by-file plan

- New docs/decisions/2026-10-08-diagnostic-precedence-clarification.md: additive reviewed supplement to D04/D06, synthetic delegation/current authorization and independent reviewer acceptance; mark proposed until review accepts. Do not alter original decisions/TotalSpec/PhasePlan or historical vectors.
- spec/README.md: append dated navigation to accepted clarification after approval; preserve original prefix.
- verifier/verify.py: independently add structural envelope encoding validation used by origin_state/classify, retaining proof defense; move only event organism context check after event kind/data structure. No JS reducer/admission change expected because reviewed ordering already matches proposal; verify rather than assume.
- tests/conformance.test.mjs: literal expected-class compound origins/events, signed cases, actual Node/Python CLI rejection and Node append/init no-write, valid controls, proof-first duplicate and original PM-01/standalone assertions retained. New supplement is not imported to compute expected outputs.
- fixtures/ceremony-v1/artifacts.json: add accepted supplement path, sorted, plus selection-inclusion assertion in existing rehearsal test so candidate archives retain the governing rule. Never update historical freeze manifests.

## Risks, alternatives and rollback

Alternative context-first precedence is possible but may classify unsupported vocabulary differently based on organism and malformed proof as unsupported; reject it for this explicit reviewed choice, not because changing Node is inconvenient. An allowed-class set would weaken reproducibility and is unnecessary for this bounded interpreter. Global invalid flattening destroys useful version/access outcomes and is rejected. Supplement is diagnostic only; successful byte/proof/state meaning is unchanged.

No hidden new key authority/field, private access, universal malformed-input proof or birth claim. Any new single-fault class change is a blocker. Rollback reverts scoped code/supplement/index/selection additions, preserving historical evidence and existing accepted bytes. Full suite must be run on final candidate; ceremony uses GitHEAD, so distinguish working-tree tests from committed-source archive evidence. Git owner may create reviewed candidate commit before final exact-commit suite; no new fix merge authorization.

## Acceptance / reader aid

Independent spec+plan approval and accepted additive record precede minimal source edits. Red regression establishes current disagreements without rewriting expected outputs to fit code. Green tests require literal classes, actual exit1/no stdout and directory snapshots unchanged; valid original/event state/commitment, proof-first duplicates and PM-01/standalone maps remain. Independent reviewer tries additional compounds and no-write controls, not just the implementation's chosen corpus. Final combined full npm, schemas and lineage evidence belongs to this repair, not original all-phase/birth completion.
