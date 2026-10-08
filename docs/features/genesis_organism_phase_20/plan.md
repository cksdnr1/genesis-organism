# Phase 20 plan

Reuse verifiedHistory and fixed D03 digest; implement one last-match projection
with label validation and exact output. Add focused tests for accepted-only/latest/
subject/source refs, invalid history and input immutability. No persisted cache or
message copies. Run focused/full regressions, record evidence and publish via PR #6.
Reset is rebuilding derived output; code fixes never rewrite committed event bytes.
