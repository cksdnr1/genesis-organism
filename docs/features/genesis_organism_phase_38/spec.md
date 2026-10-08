# Phase38 — Synthetic birth acceptance rehearsal

Scope/use case: one authorized synthetic origin accepted exactly once, with
complete verified release/freeze/archive references and interruption/retry proof.
No ALIVE field, organism canonical event type or real birth. Entry: existing35
audit and36/37 rehearsals, accepted D12/D01; actual #0001 remains NO-GO.

Current verified paths: tool manifest/freeze/archive/release helpers and independent
Python checker, fixed194artifact selection, public adaptation origin, core origin
validation. There is no birth journal. No CLI/adapter/cached state bypass allowed.
Reviewed D12, origin fixture, admission.validateOrigin, verify.origin_state,
store publication patterns, Phase37 report and protected source invariants.

Structured inputs reused: profile ceremony-rehearsal-v1; birth body closed
profile/manifestRef/releaseRef/originRef/authority; authority pinned TEST1;
archived origin synthetic-v1/adaptation-v1, genome.signal0; no experiences/children.

Extend same tool with checkBirth, acceptBirth, checkJournal, recoverBirthLock.
checkBirth verifies release and both complete archives, fixed signer/body/refs,
and origin from verified archived bytes through existing origin validation.
Return birthRef/originRef/stateCommitment; never write canonical state/ALIVE.

Journal is local to one candidate/origin. Accepted bytes live exclusively at
accepted/<originRef>.json. At most one accepted file; zero is empty. Identical
fully verified retry gives duplicate/same ref; differing existing valid signed
binding retains conflicts/<newBirthRef>.json and fail-closed hold. Corrupt/unknown
journal members fail, never replace them. Conflicts cannot be auto-cleared.
Only root names REHEARSAL,pending,archive-a,archive-b,accepted,conflicts,LOCK;
pending names are UUID diagnostics, max256 bounded regular files. No silent reset.

LOCK is exclusive canonical {profile,pid}; pid is local operator metadata, not
consensus/identity/time. File+root are fsynced. Successful acceptance/duplicate
unlinks its owned lock and fsyncs root. Unexpected error/interruption retains the
hold. No clock/timeout takeover. Recovery requires OS evidence the named process
is absent (EPERM/alive/uncertain means refuse), complete prerequisite validation,
valid retained journal/pending/conflict evidence, then explicit lock removal.
Already-unlocked recovery is read-only/idempotent. Root is private/test-owned;
no privileged filesystem adversary or global uniqueness claim.

Fault boundaries: after-lock, pending after-write, after-fsync, accepted after-link,
after-dir-sync, after-unlock. Child-process SIGKILL trials prove real process-exit
recovery; they do not simulate disk power loss. Live-writer lock cannot be removed.
Two concurrent child requests may produce accepted/duplicate/busy, but verified
retry must leave one origin. Wrong signer/refs/missing release/archive reject before
acceptance. Unknown/partial accepted data and conflicts remain held.

Python independently verifies birth refs/origin state, journal exact canonical
accepted bytes and fixture signature, and rejects active locks/conflicts/unknown
members; no JS/archived code calls. Bundle report carries exact signed records;
local paths/PIDs/timestamps are observations outside commitments.

Files: existing rehearsal JS/Python/tests; phase38 report/runbook/results and
final execution-status update. No new runtime dependency/schema/phase/D-number.
Full Node suite, both schema scripts, independent causal/lineage checks, protected
bytes and all38 CLI task statuses are required before final completion. If a test
fails, preserve evidence, correct additively and rerun affected checks. Real
freeze/release/birth remain separate future authorizations; no actual recommendation.
