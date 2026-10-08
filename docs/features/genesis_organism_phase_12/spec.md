# Phase 12 — fixture CLI

Current state: verified admission/replay/store, eleven passing Node groups.
Implement only D06 commands in src/cli.mjs: replay DIR [EXPECTED_HEAD], inspect
DIR, init-fixture DIR ORIGIN_FILE, append DIR EVENT_FILE. Native ESM, no packages.
Exact arities; expected head is lowercase 64-hex. Success one JSON stdout line,
exit0; failure one {error,message} stderr line exit1, usage exit2. No raw payload,
secret, stack or extra diagnostic stdout. File inputs use bounded regular O_NOFOLLOW
descriptor reads; stored input must be canonical and signed. All writes delegate
to store; replay/inspect call verified load, optional head checked against result.
IO errors remain uncertain, never silently valid empty history. Read-only inspection
is not global freshness. No signing/private-data discovery/birth/deploy command.

tests/cli.test.mjs must spawn actual CLI for init/append/retry/replay/inspect,
unknown/extra/missing arguments, malformed bytes, denied target and head mismatch.
No new protocol state, schema, callback or migration. Only test temp directories
are reset. One thin CLI is sufficient; no router/service framework. Protected
genesis-0001 restriction comes from store and cannot be bypassed by CLI.
