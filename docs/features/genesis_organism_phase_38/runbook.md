# Synthetic ceremony verification and recovery

This runbook exercises only public fixture origin
`37d5a9c4b7163c331b296545a52130cd2c8006cfa010cc5e31353cac8e2061cc` and TEST1
authority. It cannot supply real #0001 authority or turn UNBORN into ALIVE.
Actual freeze, public release and birth still require separately reviewed evidence
and current explicit authorization. See the unchanged original spec/GENESIS.md.

## Reproduce bounded verification

Use Node>=22 and the Python environment from requirements.lock. No npm runtime
dependencies, chain, model, robot vendor or network service is required by the
tests. Dependency acquisition is separate from offline verification; installed
packages and Git history are not promised permanently available.

```
npm test
.venv/bin/python tests/schema_vectors.py
.venv/bin/python tests/successor_schema_vectors.py
.venv/bin/python tools/audit_causal.py
node tools/rehearsal.mjs c3a918fd26d686c7c51ff3cafd1f5be26297362e
```

The last command prints a labelled synthetic manifest/freeze; it does not create
an archive, release or birth. The rehearsal tests exercise the guarded APIs, two
local copies, admitted/duplicate/conflicting requests, concurrent children and six
child SIGKILL boundaries. Tests clean only their own disposable fixtures. The
separate retained trial paths in birth.json are observations, not hash inputs.

Given an available retained trial root, independently restore/check its exact
raw bytes, signature references, synthetic origin/state commitment and journal:

```
.venv/bin/python verifier/rehearsal.py docs/features/genesis_organism_phase_38/birth.json /ABSOLUTE/RETAINED/TRIAL
```

This checker executes live reviewed Python code, never archived scripts or JS.
It needs neither Git commands nor external services in the offline archive mode.
Missing files/archives are failure, not recoverable merely from a digest. Two local
copies do not establish independent witnessing or decades of retention. Raw-source
archives do not include a complete Git object database or bundled Python runtime;
Git-backed generators/tests additionally need retained source history/toolchain.
Do not call raw archive verification a self-contained future development system.

## Interpret interruption evidence

| Process killed after | Recovery before retry | Expected verified retry |
| --- | --- | --- |
| lock publication | explicitly confirm dead writer and inspect evidence | accepted once |
| pending write | same; retain pending diagnostic | accepted once |
| pending fsync | same; retain pending diagnostic | accepted once |
| accepted file link | same; accepted bytes must verify | duplicate |
| accepted parent fsync | same; accepted bytes must verify | duplicate |
| lock removal/fsync | no held lock; inspect accepted journal | duplicate |

SIGKILL is an actual process interruption, not a disk-power-loss test. References
never use wall-clock ordering. A live, inaccessible or uncertain PID is not proof
of absence and cannot authorize lock recovery. PID reuse conservatively blocks.

## Explicit local recovery

Use only a private test-owned root created by initializeRehearsal. Inspect its
marker, exact root/accepted/pending/conflict members and source bundle first.
Do not remove LOCK manually or rely on a timeout. `recoverBirthLock(root, manifest,
freeze, release, birth)` checks OS-proven writer absence, both archives, signatures,
origin binding and consistent journal before removing a lock. It refuses partial
lock metadata, corrupt/unknown accepted bytes and conflicts; preserve those files
for review instead of clearing evidence. `not-held` recovery is read-only.

After successful recovery, `acceptBirth` re-verifies prerequisites and either
publishes one fixture request or returns duplicate/same reference. `checkJournal`
and the independent checker must then agree. Conflicts are a fail-closed hold;
this profile has no automatic resolution or history-erasing reset. Never reuse a
fixture key or these local test permissions for actual organisms/private data.
