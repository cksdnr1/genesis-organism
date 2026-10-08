# D12 — Accepted synthetic ceremony contract

STATUS: ACCEPTED for synthetic rehearsals only,2026-10-08, under
[creator acceptance](2026-10-08-rights-and-rehearsal-acceptance.md).
Phase34 specifies the bounded mechanical choices delegated by the accepted
[proposal](D12-ceremony-proposal.md). No real freeze/release/birth authority.

## Exact bytes and shapes

Use existing D03 restricted canonical JSON and parser limits. SHA256 references
hash `ASCII("genesis-organism/rehearsal-v1/" + kind + "\0") || canonical(value)`.
Kinds are exactly `manifest`, `freeze`, `release`, `birth`. For the manifest value
is the closed manifest object; for other references it is the complete envelope.
Ed25519 signs `ASCII("genesis-organism/rehearsal-v1/" + kind + "-proof\0") ||
canonical(body)` for freeze/release/birth. These domains never enter the organism
core allowlist. Digests/keys are64 lowercase hex characters, signatures128.

Every body has `profile:"ceremony-rehearsal-v1"`. Closed shapes:

| Record | Required keys in addition to profile |
| --- | --- |
| manifest | `candidate`, `revision`, `anchor`, `supersedes`, `artifacts` |
| freeze body | `manifestRef`, `authority` |
| release body | `manifestRef`, `freezeRef`, `authority` |
| birth body | `manifestRef`, `releaseRef`, `originRef`, `authority` |
| signed envelope | exactly `body`, `signature` (no envelope profile) |
| artifact entry | exactly `path`, `sha256` |

Candidate matches `rehearsal-[a-z0-9-]{1,48}`; Git revision is40 lowercase hex.
`anchor` is exactly `skip`. `supersedes` is null or the digest of a retained,
failed earlier manifest. Artifacts are a nonempty ASCII path-sorted unique array,
maximum256 entries. Paths use only letters/digits/dot/underscore/hyphen/slash,
at most240 characters; no empty, `.` or `..` segments, absolute path, backslash,
symlink or `organisms/` member. Retain at most32MiB total selected raw bytes;
apply the canonical65536byte/4096node/16depth budget to each record, not raw files.
The256 cap reuses D03's array bound; raw-byte cap bounds offline test resource use.

Pinned fixture authority:
`d75a980182b10ab7d54bfed3c964073a0ee172f3daa62325af021a68f707511a`.
It is public RFC8032 TEST1 material, never a real creator key. All body authority
fields must equal this pinned value and their signatures verify under it. Missing
attribution, unsupported profiles, extra keys and alternate signers fail closed.

## Selection and acyclic evidence

Read exact regular Git blobs at the pinned revision, using argument-array Git
calls and validated paths/revision, not shell interpolation or current worktree.
Explicit selection must include: Total Spec/Phase Plan, original origin/birth
gates, accepted D01–D14 scope records and acceptance records, licence mapping/texts
and notices, relevant spec/contracts, all synthetic schemas/vectors, core and
independent verifier sources, tests/toolchain requirements, Phase22 controls and
Phase35 audit. A checked-in explicit path-list fixture fixes the selected set;
no glob discovery at runtime. Fail if a required selected blob is unavailable.
No self-referential artifact list, private/untracked files or archived code execution.

Manifest binds raw file SHA256 hashes and immutable source revision. Freeze binds
manifest; release binds manifest plus verified freeze; birth binds manifest plus
verified release and validated synthetic origin. No forward reference or hash cycle.
Replay of existing public adaptation-v1 origin must yield sequence0/signal0 before
any experience: origin bytes are selected in the manifest and unchanged. Existing
memory/synapse projections at that point are empty. No final #0001 genome is chosen.

## Archives, admission and interruption

Two separately created local archives contain exact manifest, freeze and selected
raw paths under `files/`. Verify their complete expected file set and raw hashes,
reject missing/extra files, traversal or symlinks, and bound bytes before reading.
Release creation and birth acceptance require both archives to pass; the archives
are local observations, not independent publication, time or durability evidence.
The offline checker imports Python verifier primitives, never JS or archived code.
Different local filesystem timestamps cannot affect any reference.

Birth acceptance publishes canonical request bytes exclusively under
`accepted/<originRef>.json` in a guarded synthetic journal. Identical verified
retry returns duplicate/same birth reference, never a second origin. Different
bytes for an already bound origin fail conflict and retain separate conflict
evidence. One candidate cannot bind multiple accepted origins; the candidate's
manifest includes exactly the selected adaptation origin and the request must
match it. No global uniqueness claim across isolated journals.

Each archive/journal is in a fresh owned scratch root with explicit synthetic
marker. Protect the real organism directory, including resolved ancestors. Use
no-follow bounded regular-file reads and exclusive writes. Write/fsync a pending
file, link without replacement, fsync parent; interrupted pending bytes remain
evidence. Retry re-verifies before deciding duplicate/completion. Unknown files,
corrupt markers, partial canonical records or accepted conflicting history never
become success. A per-journal exclusive lock prevents concurrent bindings; an
interrupted lock is a fail-closed hold, removed only by an explicit recovery test
after verifying no writer and all retained evidence. No timeout-based authority.

Supersession requires a retained failed manifest plus failure record in the test
evidence and no accepted birth for that prior candidate. The successor explicitly
references it; missing evidence or superseding accepted history fails. Failure
records are local diagnostics, not canonical organism events. No deletion/rewrite
of accepted data or automatic cleanup of another process's directory.

Exact failure diagnostic: canonical closed
`{profile:"ceremony-rehearsal-v1",manifestRef,reason:"fixture-failure"}` retained
with the failed manifest. This records a local test observation, not an attested
external failure. Supersession never trusts an unverified prior manifest. The
explicit artifact path list is `fixtures/ceremony-v1/artifacts.json`; it contains
only path strings (no manifest/hash cycle) and is fixed before the freeze run.

## Evidence gates and real-world limits

Phase35 audits every original gate without modifying `spec/GENESIS.md`. Synthetic
GO is only permission to test this bounded fixture procedure, never real-birth
readiness. Missing original gate evidence for the tested profile is NO-GO. Actual
#0001 remains NO-GO until its real candidate, key attribution, operational archive,
rights and ceremony authorization are independently reviewed; rehearse those
boundaries with fixtures rather than invent real evidence.

Phase36 tests freeze/negative bytes/signatures/unavailability/supersession;37 tests
offline two-archive restore/partial writes/timestamps/skip;38 tests birth replay,
retry/conflict/unauthorized/missingrelease and interruption. These records retain
failed attempts. No public Git release/tag, real signature, chain, ALIVE or mint.

## Minimality / Complexity Justification

Minimum manifest and three signed stages preserve the roadmap's distinct actions.
Reuse D03/D04 verification and filesystem publication techniques; no canonical
state/event changes, services, dependencies or universal ceremony framework.
The local lock is retained because two origins must not race to one candidate;
it introduces stale-lock recovery, tested as a fail-closed hold. Explicit artifact
selection and two local archives are required by freeze/restore experiments.
Removal of raw bytes, independent/negative checks or evidence boundaries breaks
those requirements. Arbitrary future fields, timestamp ordering, witness/chain
adapters and real credentials are omitted. The trials must justify every retained
mechanism; finite rehearsal does not prove real durability or legal identity.

## Bounded mechanical realization — Phases36–38

The existing public adaptation origin is pinned to organism commitment
`37d5a9c4b7163c331b296545a52130cd2c8006cfa010cc5e31353cac8e2061cc`,
not a #0001 identifier. Rehearsal acceptance cannot bind a different origin.
One accepted file suffices for the one-candidate experiment; no registry/index.
Private owned roots are outside the entire resolved repository. Exact root names
are REHEARSAL,pending,archive-a,archive-b,accepted,conflicts,LOCK. Pending UUID
diagnostics are bounded to256 entries/32MiB; they cannot count as acceptance.
LOCK has canonical profile/pid, a local operational record outside signed organism
history. Six process-interruption boundaries and explicit OS-proven dead-writer
recovery are defined in Phase38 spec. No timeout takeover or conflict deletion.
These are delegated mechanical choices for the accepted experiment, not new
canonical fields, lifecycle semantics, phases or real ceremony authorization.
