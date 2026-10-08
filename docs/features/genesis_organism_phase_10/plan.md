# Phase 10 implementation plan

1. Add verifiedHistory in src/replay.mjs to enforce D05 budgets, validate origin
   and classify each event against verified parents; create new state objects.
2. Export replay with exact D06 result, closed options and expected-head check.
3. Add tests/replay.test.mjs for literal state/digest, prefixes, immutable replay,
   duplicate/reordered/sibling/corrupt history, unknown options and limits.
4. Run Node suite and Python schema/vector suite; record actual outcome. Publish
   through existing synthetic PR #6, preserving all prior event/fixture bytes.

No persistence or CLI. A failed call throws ProtocolError without changing caller
inputs. Repair code using regression evidence, never expected bytes. No refactor
outside this boundary; removing the new replay function would remove required
deterministic execution. Existing bytes/admission contracts remain source of truth.
