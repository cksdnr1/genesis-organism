# Phase27 plan

1. Implement per-call resolver cache, closed record/full replay/requested identity
   validation, active path and depth/node/resolve limits in lineage.mjs.
2. For child origins require matching packet/validateChild then recurse all parents;
   reject root packet/child-null mismatch. Produce sorted exact stateRef edges.
3. Independently implement Python in-memory verified history, packet consent/mean/
   birth checks and bounded traversal; CLI accepts only local canonical manifest.
4. Add graph literal and cross-language adversarial tests, independently signed
   bounded long-chain fixture in test memory to reach depth limit, recursive aliases,
   missing/private/version/tamper/duplicates, no persisted mutations.
5. Run focused/full checks and standalone verifier, record limits and publish PR6.

No storage migration, dependency, graph database or generation. Rollback derived
queries by rebuilding; immutable evidence never changes. Completion requires
independent exact graph and fail-closed negatives, not schema/diagram existence.
