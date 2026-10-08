# Phase 8 plan

1. Add scoped ignore entries and requirements.txt for D06 approved tools; install
   in .venv, pin resolved dependencies in requirements.lock, record versions.
2. Create four standalone closed Draft 2020-12 schemas with exact D04 types/literals.
3. Build fixtures using public RFC keys; commit canonical origin, three-event history,
   expected projection/digest and literal Unicode/numeric/malformed byte cases.
4. Implement tests/schema_vectors.py for standards validation, RFC known-answer,
   fixture signature/hash verification and contract-negative shape cases.
5. Run tests and regeneration equality; independently cross-check SHA-256 via Node;
   preserve failures and repair only proven fixture/code errors, not expected semantics.

Only D06 Phase 8 paths plus task records and synthetic schema README change. No
primary runtime, CLI, storage or independent reducer. Generator produces test
artifacts only; no callbacks or canonical organism state. Fixed fixture paths,
no live input discovery. Dependencies do not enter hash inputs. Safe rollback via
new commit, no published-origin rewrite. Test vector expected state is contract-derived,
not a call into a future reducer. Explicitly disclose shared fixture data.
