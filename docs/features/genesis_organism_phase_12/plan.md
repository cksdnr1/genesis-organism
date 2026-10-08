# Phase 12 plan

1. Implement exact command/arity/head validation, single JSON result/error streams
   and bounded no-follow external fixture reads in src/cli.mjs.
2. Delegate initialization/append exclusively to store; inspect/replay use load
   and optional trusted-head equality. No extra commands or default directories.
3. Spawn CLI in tests/cli.test.mjs, exercising three-event fixture history and
   fixed expected result, retry, usage, invalid input, protected target and head errors.
4. Run relevant CLI tests and full Node suite; record actual results and review
   for accidental secret/stack disclosure. Publish through existing PR #6.

No state reset/repair. On failure, existing store rules determine uncertainty;
fix code and add regression without altering fixtures. Native CLI boundary only.
