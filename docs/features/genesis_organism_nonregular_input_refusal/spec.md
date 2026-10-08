# IC01 technical specification: nonregular input refusal

## Scope and use case alignment

An engineer/verifier reads an owned synthetic history, proposal or rehearsal archive and receives a reasoned refusal for a FIFO without supplying its writer. Repair the demonstrated local availability failure across five actual bounded regular-only readers. This is a scoped Phase11–13/D06 and synthetic D12 refusal correction, not hostile-administrator protection, remote security certification or a latency SLA. Current user authorization supersedes the audit source seed's earlier no-implementation boundary.

## Current implementation and architecture

The Node store and CLI source reader, independent Python history reader and Node/Python ceremony readers open O_RDONLY|O_NOFOLLOW before checking descriptor type/size. A FIFO can block in open before the regular-only guard. Validated regular bytes still enter the existing canonical/shape/proof/replay pipeline. Directory fsync and exclusive writer opens are distinct and outside this change. No shared helper/framework or dependency is needed.

## Relevant files and active paths

- src/store.mjs readBounded: marker, origin, ordered events, conflict and lineage bytes; load/append/publishChild.
- src/cli.mjs inputBytes: append and init-fixture proposal source; actual CLI error boundary.
- verifier/verify.py read_file: independent history and reused lineage/rehearsal bundle reads.
- tools/rehearsal.mjs readWithin: exported readRehearsal, guardRoot, archive/journal inspection.
- verifier/rehearsal.py read_local: guard_root, archive/journal inspection.
- Existing tests/store.test.mjs, tests/cli.test.mjs, tests/rehearsal.test.mjs; accepted D06/D12 and independent audit reproduction.

## Verified behavior and structured evidence

| Artifact | Exact subset/key | Literal observation | Treatment |
| --- | --- | --- | --- |
| parent runtime/probe-results.json | FIFO history/source, handshake | no-writer wait; writer opens then invalid/empty stdout/no-write | preserve diagnostic/no-write, correct pre-check wait |
| evidence/baseline.json | seven actual entry/helper cases | Node replay/inspect, Python history, Node append/init source, Node/Python ceremony wait through 0.5s | directly reproduced at starting merge before fix |
| fixtures/core-v1/SYNTHETIC | marker | genesis-organism synthetic-v1 newline | unchanged |
| ceremony marker in D12/tools | REHEARSAL | genesis-organism synthetic ceremony rehearsal v1 newline | unchanged |
| D06 errors | nonregular history vs IO | invalid; unrelated filesystem failure io | preserve existing classes |
| tools/rehearsal.mjs readWithin | combined type/size guard | limit for nonregular or oversize | preserve contextual class; do not rename historical outcomes |
| verifier/rehearsal.py read_local | regular/size guard | invalid | preserve contextual class; no blanket ceremony parity claim |

Baseline evidence belongs to this task; audited parent evidence remains historical. Available valid bytes and schema/hash/state/proof contracts are unchanged. Inference: POSIX FIFO open waits for a counterpart; only bounded observations and handshake evidence were measured, not infinite time.

## Proposed direction and file plan

Add O_NONBLOCK to the five O_RDONLY|O_NOFOLLOW byte-reader opens. Immediately fstat and reject nonregular descriptors before read. Existing try/finally closes descriptors; size+1 read/race detection and no-follow remain. Regular disk files ignore O_NONBLOCK under tested POSIX semantics. Directory fsync opens and exclusive publication flags remain unchanged. No pre-open type check replaces descriptor validation.

Extend existing test files rather than adding a runtime abstraction: a subprocess harness creates FIFO via POSIX mkfifo, uses a bounded timeout only to detect regression, and always terminates owned children/cleans scratch. Exercise Node replay+inspect, Python history, Node append+init source and both ceremony readers. Verify nonzero classified refusal/no success stdout, snapshots of actual regular-file bytes and filesystem entry types, no accepted event/target creation, and valid regular controls before/after. Retain writer-connected no-data refusal controls (writer established independently) where stable; no time-based contractual guarantee. Existing symlink/directory/oversize/corruption and persistence tests remain.

## Failure, reset, rollback and risks

No accepted state mutation is introduced. Failure preserves existing histories; clearing test scratch is unrelated to organism reset. Rollback is reverting these scoped flags/tests; no migration or data compensation. POSIX O_NONBLOCK/O_NOFOLLOW and mkfifo are required by this tested profile; Windows and other filesystems remain unverified. O_NONBLOCK is not a universal timeout for regular network/device/filesystem IO. Existing trusted-directory/ancestor race limitations remain; descriptor type checking avoids substituting an unsafe lstat-only guard. Directory FS errors and permission failures retain their old error handling.

## Acceptance and reader aid

Seven baseline no-writer cases must now refuse within the test harness, with no successful output and no filesystem content changes. Regular controls, prior negative coverage and full regression suite pass. Independently reviewed spec/plan precede source edits; independent reviewer falsifies corrected behavior after focused tests. Full suite is run after both sequential child fixes so one expensive ceremony run validates final combined source; IC01 focused evidence remains separately attributable. Final evidence describes tested working tree and later Git commit accurately; no actual birth, deployment or new protocol phase/decision/profile.
