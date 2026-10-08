# Phase 15 result

Accepted D13 for synthetic encounter-v1 only. Immutable retained evidence leads
to signed event then derived receipt; no digest cycle or stored receipt rewrite.
Nonce tuple plus exact evidence governs idempotency independently of event ID.
Historical policy is retained and accepted by event signer, not a mutable URL.
Pending/refused/accepted views and actual event references have explicit semantics.
Experience only advances history; D08 still must define meaningful consequences.

Reviewed all requested retry/policy/availability/forgery/acyclic cases against D13
and fixed a potential module-cycle ambiguity by selecting separate encounter.mjs
validation and receipt.mjs replay view. No blocker/medium issue remains for this
contract. No code/schema or runtime result is claimed in this decision phase.
Existing D03/D04 authority/bytes/store are reused; no exactly-once network, sensor
truth, confidential memory or automatic birth. PR #6 carries this phase.
