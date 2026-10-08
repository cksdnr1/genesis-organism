# Phase 18 plan

1. Add pure evidence validation and fixed D13 hash kinds; use existing expression
   verifier against exactly known parent-prefix states.
2. Extend closed event/origin validation, proof-first nonce retry/reuse checks and
   replay transition for explicit encounter-v1 only; keep existing store semantics.
3. Implement derived verified receipt with closed pending/refused options and no
   accepted-ref input. Add distinct schema/fixture data, no real keys.
4. Independently extend Python rules and write tests/encounter.test.mjs for actual
   store/receipt/retry/policy/fidelity failures and cross-language replay. Run full
   regressions/schema checks, repair defects without rewriting historical vectors.

Mutation remains durable exclusive store publication; no model, callback, stored
receipt or canonical memory. Reset only disposable test directories. PR #6.
