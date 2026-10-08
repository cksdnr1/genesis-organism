## Summary / why

Phase 6 makes replay/privacy/retention limits explicit before implementation.

## Problem / fix

D05 classifies canonical public fixtures, unsupported private input, local evidence
and derived views. It bounds history and preserves missing/denied/invalid/conflict
outcomes without encryption, pruning or freshness claims.

## Validation

Ten case review, protected-byte/literal checks and git diff --check passed.
No runtime/private-memory implementation or test is claimed.

## Risks / follow-ups

Full replay needs retained authorized bytes; disclosure cannot be undone. Included
in cumulative PR #6. Actual licensing/release/birth remain separate approval gates.
