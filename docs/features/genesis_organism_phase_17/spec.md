# Phase 17 specification

Implement exact accepted D07 express(state,observer,policy) and verifyExpression
in src/expression.mjs. Current Phase 16 only negotiates. Use pure fixed signal
relations for text/symbol/path; selection binds the same source/profile/policy.
Denied/unsupported throws explicit error. Verification recomputes exact result,
separating semantic fidelity from a digest. Test all three, repeat, mutation and
binding/output substitutions in tests/expression.test.mjs. No event/IO/model.
One function pair suffices; reset is recomputation, no stored phenotype or cache.
