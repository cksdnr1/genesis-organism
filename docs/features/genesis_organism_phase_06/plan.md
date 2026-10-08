# Phase 6 plan

1. Assign D04 fields to public synthetic canonical scope; classify private external,
   local operational and derived projection data separately.
2. Define full replay prerequisites, missing/denied/invalid outcomes, record retention,
   retained-head limits, byte/event/history budgets and cache-only reset.
3. Bound upgrades/checkpoints/pruning: unsupported in core-v1, negative tests retained.
4. Review privacy/threat cases and original bytes; accept D05 for synthetic scope.

Only docs/decisions/D05-privacy-retention.md and workflow artifacts change. No runtime,
encryption/dependency selection or storage implementation. Correction is attributable
revision, never deletion of history. No old runtime/bypass/migration exists.
Evidence is decision-case review, not a privacy audit or executed replay test.
