# Phase 13 plan

1. Author independent Python canonical parser/digest/proof/closed-shape validation
   from D03/D04; no JS logic import or subprocess.
2. Independently reconstruct ordered state and validate retained conflict evidence,
   budgets, no-follow reads and expected-head scope. Add safe CLI diagnostic boundary.
3. Add cross-language tests for fixed fixture results, prefixes, literal byte
   corpus, signed retries/siblings, rotation, tampering, gaps, resource limits,
   symlinks and unknown profiles. Compare exact successful state/commitment.
4. Investigate mismatches, patch the faulty implementation with regression, rerun
   focused/full conformance and schema vectors. Keep expected fixture bytes unchanged.

No code sharing except data. All state is freshly derived; no callback, side-effect,
repair or cache reset. Dependency already pinned in Phase 8. Minimum independent
program; no service or duplicate protocol layer. Publish actual evidence via PR #6.
