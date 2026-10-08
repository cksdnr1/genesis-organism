# Phase 15 — D13 encounter contract

Deliver docs/decisions/D13-encounters.md under bounded delegation, after accepted
D02–D07. No receipt/event implementation yet. Current runtime only core-v1.
Specify exact immutable evidence, acyclic encounter/event references, historical
policy binding, stable scoped nonce and durable idempotent outcome reconstruction.
Receipt is a derived view, never an authority token or cyclic commitment.

Choose separately labelled encounter-v1 rules: same D04 origin/state with changed
rules literal, plus authorized experience-v1 evidence event. Do not alter core-v1
semantics or invent memory/adaptation before D08. Define closed bounded inputs,
exact validation order, pending/refused/accepted receipt status, proof scope and
retry/policy-change behavior. Bind exact retained expression/interaction bytes;
digest-only or unavailable content fails, replay never re-calls model.

Phase 18 paths/APIs and schemas must be explicit. Review timeout/concurrent/restart,
reused nonce with different evidence, distinct same-content visits, source/policy/
output substitution, forbidden disclosure, forged links and cyclic hash attempts.
Minimality retains required responsibilities without duplicate stored receipt/state.
