# Phase 18 result

Implemented D13 evidence validation, explicit encounter-v1 experience admission
and derived receipts with acyclic references. Core-v1 cannot admit experiences.
Historical source/policy/output fidelity and current-parent authority verify before
nonce deduplication; valid rebased retry returns the original ref. Changed nonce
reuse rejects; genuinely separate visit nonce remains distinct. Store is reused.

Independent Python verifier separately supports the same explicit successor.
Public fixture built with RFC test key and independently produced expression/state
matches Node exactly. Six new schema meta/positive/closed-negative checks pass.
Full suite: 24 Node groups and six Python core checks pass. Five encounter groups
include pending/refused/actual receipt refs, source/policy/output/message/cycle
refusal, exact/rebased/restart retries, real concurrent duplicate writers, signed
distinct sibling hold and rejection of duplicate experience placed in stored history.

No model re-call or private input; mandatory message bytes are retained input.
Experience advances only history; no memory/synapse/adaptation claimed before D08.
Safe-refactor review retained separate pure evidence helper and replay receipt view,
with no import cycle, stored receipt or new writer. Historical vectors remain
unchanged. Existing PR #6 carries the phase; GENESIS #0001 remains UNBORN.
