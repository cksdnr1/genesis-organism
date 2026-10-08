# Phase34 — Synthetic ceremony decision

Scope: existing Phase34 only; no runtime. D01 activation at210cdd5 satisfies the
rights entry gate; D02–D11/D13 accepted bounded contracts and D12 SKIP are recorded.
Creator accepted D12 proposal and delegated exact mechanical choices in the dated
rights-and-rehearsal record. No actual ceremony authorized.

Use case: review exactly what synthetic freeze, release and birth evidence mean
before auditing readiness. Current code supplies canonical bytes, proofs, replay,
lineage and the controlled encounter loop, but no ceremony entry point. Existing
CLI/adapters cannot perform a ceremony. Public fixture keys confer no real powers.

Reviewed: phase plan34–38, spec/GENESIS.md, D01/D03/D04/D05/D12/D08, src/bytes.mjs,
store.mjs/admission.mjs, verifier/verify.py, tests/helpers.mjs and Phase22 result.

| Structured evidence | Literal / use |
| --- | --- |
| package.json engines.node | >=22; retain existing toolchain |
| fixtures/adaptation-v1/origin.json body | synthetic-v1/adaptation-v1, genome.signal0; reuse exact bytes |
| src/bytes.mjs bounds |65536bytes,4096nodes,16depth,256members; reuse |
| tests/helpers.mjs public seed | RFC8032 TEST1; reuse only as labelled fixture attribution |

Direction/file plan: add accepted D12-synthetic-ceremony.md with exact closed
grammar/domain/pathset/retry/crash/supersession rules. Append current acceptance
links to proposals without replacing historical pending text. Maintain phase
spec/reviews/plan/result/PR evidence. No source/schema/dependency changes.

Flow: manifest→freeze→two verified local archives→release→synthetic birth acceptance.
Acceptance never writes #0001. Recovery preserves failed/pending evidence; unknown
or inconsistent records fail closed. Review unauthorized signer, absent archive,
partial release, skip, duplicate and contradictory candidate table before exit.

Risks: fixture vs real attribution confusion, partial archive success, stale lock,
source revision/worktree confusion and ambiguous retry. Accepted D12's explicit
domains/references/limits/hold rules address them; runtime proof deferred36–38.
Phase35 may still report NO-GO. Local-only retention and public-data limits remain.
