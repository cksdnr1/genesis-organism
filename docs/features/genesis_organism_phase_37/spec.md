# Phase37 — Offline release/archive rehearsal

Scope/use case: two verified local archive copies and fixture release evidence,
independent restoration without Git/network/model or archived-code execution.
Entry: accepted D01/D12, Phase35 audit and Phase36 independent freeze evidence.
Existing194path list, exact manifest/freeze shapes, signatures and raw hashes are
reused. Current rehearsal tool has no disk write/archive/release path; core CLI
and adapters cannot bypass the new fixture-only guard. No birth journal yet.

Reviewed: D12, Phase36 fixture/results, tools/rehearsal.mjs, verifier/rehearsal.py,
src/store.mjs publication technique, existing path/IO/fault tests, requirements.
Structured facts: manifest profile=ceremony-rehearsal-v1, anchor=skip; freeze has
profile/manifestRef/authority;194 selected regular Git blobs; raw cap32MiB.

Extend tools/rehearsal.mjs with initializeRehearsal(root), guardRoot(root),
publish(root,relative,bytes,fault), writeArchive(root,name,manifest,freeze,fault),
checkArchive(root,name,manifest,freeze), checkRelease(root,manifest,freeze,release).
Exact names archive-a/archive-b. Fresh root must be outside the resolved repository
and its .git/organisms paths; existing directories cannot be adopted. Marker
`REHEARSAL` has exact text `genesis-organism synthetic ceremony rehearsal v1\n`.
All ancestors/files are no-follow checked; no untrusted directory traversal.

Archive exact files: manifest.json, freeze.json, and files/<selected paths>.
Reject extra/missing/nonregular files and raw-byte/manifest/proof mismatch. Total
raw<=32MiB, <=1024 walked directory entries, existing canonical-record budgets.
Selection file must exactly match artifact paths. Both archives must pass before
release succeeds. Release body is existing D12 profile/manifestRef/freezeRef/
authority; no timestamp or new field. Signed public fixture key only.

Publication writes exclusive root/pending/<uuid>, fsyncs file, links exclusively
to destination, fsyncs destination parent, then cleans only its own successful
pending file. Pending remains outside archive namespace on interruption. Retry
compares existing exact bytes and syncs before declaring duplicate. Different
existing bytes are conflict, never overwritten. Fault hooks after-write,
after-fsync, after-link, after-dir-sync support boundary tests. Pending files are
recognized diagnostics, not accepted/archive records; preserving them must not
make an incomplete target succeed. No timeout/automatic evidence deletion.

Python extends independent checker with no-follow local archive traversal and
raw hashing, exact two-copy manifest/freeze checks and release refs/signature.
CLI accepts a bundle path plus optional root for offline archives; absent root
retains Phase36 Git-backed check. Live verifier code only, never archived code.

Tests add two groups: exact offline recovery with PATH excluding Git and timestamps
varied; malformed/corrupt/missing/extra/symlink/partial/unattributed data fail;
all four write boundaries fail, retain pending evidence and retry exact bytes.
No dependency additions. Report includes source revision/refs/counts and local
retained scratch evidence paths as observations outside commitment preimages.
No independent witness, geographical redundancy, long-term retention or actual
public release implied. Safe rollback correction commits; #0001 stays UNBORN.
