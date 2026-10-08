# Phase 2 execution plan

1. Extract exact historical JSON literals and eight candidate receipt names.
2. Write docs/decisions/encounter-requirements.md: one symbolic initial state;
   three mock observer walkthroughs; integrity/fidelity/causal distinctions;
   receipt responsibilities and adversarial/causal control coverage.
3. Compare each row to spec/encounter.md and Phase 2/22 acceptance. Verify no
   concrete expression grammar, authority, wire ID or scoring rule was invented.
4. Validate local links, protected bytes and exact names; record result and PR.

Entry is a reader inspecting requirements; only documentation is stored. Later
D-record authors consume it; no callback or canonical event. Correct by attributed
revision. No old runtime path, bypass or migration. Preserve missing-versus-false
capabilities and outputRef versus expressionOutputDigest distinction.

No code tests added for prose. Walkthrough results are expectations, not runtime
passes. Finish when the matrix covers three mocks, no/rejected experience,
idempotency/policy cases and eight receipt responsibilities. D13 remains open.
Rollback through a new documentation correction; origin and old schemas stay intact.
Minimality: one matrix, no mock runner before accepted implementation contracts.
