# Phase 21 implementation plan

1. Add src/synapse.mjs with canonical/closed options validation and boolean check.
2. Call existing memoryFor regardless of permitted. Return null on suppression or
   absent memory; otherwise spread the four projection fields and two fixed labels.
3. Add tests/synapse.test.mjs using immutable committed public fixtures. Check exact
   refs and labels, repeated reconstruction, other subject, pending/refused absence,
   malformed options and forged/duplicate history even with permitted=false.
4. Run focused test and npm test. Review cleanup; commit/push via existing PR #6.

Completion requires exact D08 shape and no writes/caches/score/consent assertion.
No old entry is migrated; no bypass API can inject a memory view. The sole risk is
overreading fixture identity/consent, addressed by labels and docs. Rollback code
through a new fix commit; derived state can be rebuilt, never delete evidence.
