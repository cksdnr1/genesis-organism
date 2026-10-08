# Summary

- Refuse FIFO history/proposal/archive input without requiring a writer on the observed POSIX host.
- Preserve descriptor validation, canonical admission and existing contextual errors across five bounded readers.
- Add meaningful no-writer/no-data counterpart, no-write and valid regular-file controls.

## Why this PR / Problem

Independent conformance probes found that read-only open waited on FIFO input before fstat could reject it. The newly added regression groups reproduce this as pre-fix ETIMEDOUT; no canonical admission bypass was found.

## How it was fixed

Add O_NONBLOCK to existing O_RDONLY|O_NOFOLLOW byte reads in src/store.mjs, src/cli.mjs, verifier/verify.py, tools/rehearsal.mjs and verifier/rehearsal.py. Existing type/size guards reject before reading; directory fsync and exclusive publication paths retain their flags. No new API or state migration.

## Validation

- New CLI/rehearsal regression groups: pre-fix exit1; corrected exit0,2/2 pass.
- Store/CLI/lineage focused suites:11/11 pass; schemas6+2; independent lineage4 nodes/3 edges.
- Separate reviewer:14 actual FIFO refusals with no-write/no-stdout plus regular append/replay/ceremony controls; accepted scoped source/test review.
- Full npm test pending final combined repair candidate after IC02. Exact committed-source ceremony evidence remains pending; see result.md.

## Risks / follow-ups

Observed POSIX/macOS only; no general regular/network/device IO timeout, Windows or hostile-administrator guarantee. Node ceremony limit/Python invalid context preserved. GENESIS #0001 remains UNBORN. No reusable general agent guidance justified beyond these task-specific evidence/portability notes. Git publication belongs to requirements_auditor; draft combined PR link pending. No new fix-PR merge authorized.
