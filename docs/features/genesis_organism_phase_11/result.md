# Phase 11 result

Implemented initialized synthetic directories, bounded no-follow reads, complete
canonical history verification and fsynced exclusive-link append. Retry verifies
prior proof and re-syncs the directory before duplicate success. Valid signed
siblings are retained separately and hold load/append without overwriting history.
Unfinished .pending files are ignored. Partial/gapped/oversized/symlinked history
and invalid conflict evidence fail closed. No repair, pruning or checkpoint API.

Verification: Node suite passes eleven test groups, including real subprocess
duplicate/conflict races and injected directory-fsync failure followed by verified
retry. Review found retry should re-sync the directory after uncertain durability;
this was fixed, then the relevant suite rerun. Public fixtures remain unchanged.
Trusted local directory only; no hostile-administrator or global freshness claim.
Safe-refactor review retained direct native filesystem primitives and no new layer.
Existing PR #6 carries the phase; no real birth, keys, actuation or deployment.
