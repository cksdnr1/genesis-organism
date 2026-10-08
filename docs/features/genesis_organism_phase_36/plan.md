# Phase36 plan

1. Fix explicit public artifact path list from reviewed tracked sources, at most256.
2. Implement D12 manifest validation/Git raw-byte retrieval/proof/reference helpers
   only in tools/rehearsal.mjs, with public fixture signing and no core changes.
3. Implement independent Python freeze checker using verify.py primitives, own
   closed shapes/reference/signature checks and bounded Git raw-byte comparison.
4. Add cross-language positive/adversarial/supersession tests. Commit source before
   generating labelled freeze evidence; retain exact source revision and refs.
5. Run focused checks, review limits and historical bytes; publish existing PR6.

Selection output files are not in their own preimages. Missing source/dependency
is failure, no worktree fallback. No mutable storage/API/reset/lifecycle in this
phase. No archive/release/birth implementation. Risks and rollback match spec;
all signed fixtures explicitly attribute public test authority, never creator.
