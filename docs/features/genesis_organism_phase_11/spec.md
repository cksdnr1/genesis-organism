# Phase 11 durable synthetic history

Current implementation: pure replay/admission only, fixed fixture state proven.
Scope: exact D06 initialize(directory,originBytes), load(directory), append(directory,
eventBytes) in src/store.mjs; synchronous native filesystem, no dependency.

Require new empty initialized directory and exact SYNTHETIC marker. Reject target
within organisms/genesis-0001 including symlink-parent resolution. Reject symlinked
directory/history members and nonregular/budget-exceeding reads; O_NOFOLLOW plus
descriptor stat/read avoids member substitution. Each JSON file <=65536 bytes;
512 ordered events and total origin/events <=4 MiB. Missing sequence, invalid wire,
proof or profile fails. Orphan .pending files are ignored, never repaired/promoted.

Write canonical candidate to unique local temp, fsync file, exclusive link to final
six-digit name, fsync directory, remove only own temp and fsync directory. No clobber.
Publication collision reloads verified history and reclassifies: duplicate yields
same state; signed divergent successor is stored as conflict-reference.json and
holds future load/admission. Invalid conflict evidence fails invalid; no forged hold
or success. Preserve evidence and accepted files. Bound directory entries to 2048.
Return {state,commitment} on load, plus status/reference on append success. Exceptions
are ProtocolError; IO errors indicate retry/replay uncertainty, never rollback final
files. Expected-head verification belongs replay/CLI. No hostile-admin protection,
global freshness, distributed lock, checkpoints, pruning or repair-in-place.

Tests/store.test.mjs: initialize/replay/retry, interrupted-temp, malformed/missing
history, symlink, conflicting siblings, invalid evidence, concurrent duplicates/
conflicts and fsync failure. Entry bytes -> replay/admission -> durable publication
-> verified result; no alternate state-write path. Cleanup only test directories.
Minimum retained mechanism is exclusive local files, not a database/service.
