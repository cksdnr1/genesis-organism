# Operational archive and recovery proposal

STATUS: DRAFT PROCEDURE / NOT EXECUTED FOR REAL CANDIDATE. Paths, operators and
permissions remain to be selected. Do not invoke synthetic rehearsal signing as
a real ceremony. Commands below are review drafts; no private key is an argument.

## Fresh observation and its limit

The local roots named by Phase37 release.json and Phase38 birth.json currently
exist, with archive-a and archive-b. Fresh read-only execution of:

```sh
.venv/bin/python verifier/rehearsal.py docs/features/genesis_organism_phase_38/birth.json /var/folders/ld/1g67pwms4g13xwzcygsddwlh0000gn/T/genesis-phase38-retained-OGfh6n/accepted-trial
```

verified195 selected artifacts, original fixture origin/state and accepted journal;
birthRef `aa0d5d56ba36431272d63b6418fa12528166931860bcfcc1a329e82c89431263`.
This is real current verification of an existing local **synthetic** archive,
not verification of a real candidate release or external retention. Temporary
directory presence today supplies no durability guarantee. Installed .venv
dependencies make this observation possible; the archive does not bundle a full
Python runtime or Git history. The retained report alone would not replace missing
archive bytes. No external archive, publication or witness has been discovered or
asserted by this review.

## Exact proposed retained set

Retain selected raw source/contracts/schemas/vectors, licence texts/notices,
candidate public origin/history and real ceremony records, full immutable source
commit and its required ancestor evidence, complete explicit selection list,
canonicalizer/domain vectors, JS/Python independent verifier source and results,
all failed/superseded candidates and their references, public attribution/proofs,
trusted expected-head/acceptance references, and replay/access limits.

Retain dependency **bytes**, not merely requirements.lock: compatible Python and
Node distributions or a tested reproducible offline runtime image, Python wheels
for the actual platform/ABI and all transitive pins, package hashes/licence notices,
runtime/OS/architecture versions, acquisition provenance and installation commands.
Current lock pins versions but has no wheel hashes; pinned names alone do not
prove future acquisition or reproducibility. A Git bundle retaining the pinned
commit and required ancestors supplements raw files for Git-backed generators,
tests and provenance. Verify bundle contents before relying on it. No requirement
to archive unrelated private Git objects or every branch is inferred.

Do not put controller/ceremony private keys, access tokens, raw personal inputs or
unreviewed worktree files into the public archive. Protected key backup is separate
and controlled by its owner. Public proofs/history suffice for verification; new
admission needs the current authorized secret key.

## Proposed operations and verification checkpoints

1. Select explicit source commit, accepted real contract, public bytes and rights
   scope. Inventory regular tracked blobs by raw SHA256; reject unavailable,
   extra, symlink, escaping or self-referential selections. Confirm actual runtime
   versions and source dependencies. Retain every failed attempt.
2. Under a separately approved freeze, obtain creator/key attribution and frozen
   proofs with the accepted real-domain signer. Verify them independently before
   copying. Key custody actions happen locally; no secret enters repository/chat.
3. Write two complete archive sets to the operator-selected destinations without
   replacing existing evidence. Verify exact expected members/hashes/proofs at
   each destination. Record actual access/control and shared-host/failure-domain
   limitations, not imaginary independence.
4. Restore each destination into a fresh owned directory; install from retained
   dependency bytes with network disabled; independently verify candidate bytes,
   historical source/profile vectors, known head and complete selected replay.
   Execute only reviewed live verifier code in a controlled environment, never
   unknown archive executables just because their hash matches. Record exact
   commands/results, dependencies, failure evidence and actual operator statement.
5. Under separately approved publication, upload exact verified public bytes to
   the selected destination; retrieve them from that destination through its
   actual access path and compare hashes/proofs. Preserve immutable release URL
   or content reference plus retrieval evidence. A branch push alone, a local copy
   or printed URL cannot establish published content availability.
6. Only after complete prerequisites and separate birth approval, validate the
   exact real birth request and append immutable acceptance once. Identical retry
   returns the same reference; conflict stops acceptance and retains both claims.
   Do not overwrite, backdate or mint an ALIVE record as a substitute.

Draft reproducibility commands supported **today**, fixture scope only:

```sh
node --version
.venv/bin/python --version
.venv/bin/python -m pip freeze
npm test
.venv/bin/python tests/schema_vectors.py
.venv/bin/python tests/successor_schema_vectors.py
.venv/bin/python tools/audit_causal.py
```

Draft future dependency acquisition/restore pattern, after choosing exact
platform and writable owned paths (placeholders are intentionally not executable):

```text
<python> -m pip download --only-binary=:all: -r requirements.lock --dest <owned-wheelhouse>
<restored-python> -m pip install --no-index --find-links <restored-wheelhouse> -r requirements.lock
git bundle verify <retained-source.bundle>
git --git-dir=<restored-owned-git> cat-file -e <full-source-commit>^{commit}
<accepted-real-independent-checker> <frozen-records> <restored-archive>
<accepted-real-checker> <retrieved-public-records> <retrieved-public-bytes>
```

The last two commands are required capability placeholders, not existing CLIs or
evidence of successful real verification. The implementation owner must supply
reviewed exact commands once real-profile adoption authorizes implementation.
If wheels are unavailable for the selected platform, retain/build explicitly
reviewed source/build inputs and test them; do not claim download success.

## Failure, retention and compatibility

Unavailable dependencies/archive bytes -> unavailable, no reconstruction from
hashes. Invalid bytes/signatures -> invalid. Denied access -> unauthorized.
Observed divergent signed history -> conflict hold. Preserve accepted history,
failed manifests, partial publications, rejected requests and diagnostic files.
No timeout may authorize lock takeover; independently establish writer absence
and consistent retained evidence before approved recovery. SIGKILL tests establish
process interruption behavior, not power-loss/filesystem durability guarantees.

Supersession names the exact previous failed candidate and retains its complete
selected bytes, failure and publication context. Never supersede an accepted
origin into nonexistence. Current fixture offline verifier refuses supersession
without predecessor artifacts: this is a retention obligation, not proof that
all historical artifacts are already archived.

Keep immutable historical synthetic interpreters and vectors alongside any new
real profile. New profile/domain must reject cross-domain proofs; original origin
and event bytes never migrate silently. Distinguish replicas from conflicting
forks and child origins. Expected-head evidence scopes freshness; disconnected
copies cannot establish global latest head or absence of unseen births/forks.

Assign an actual archive owner and a concrete periodic read/restore review only
if accepted; no schedule is created here. Two copies on one computer remain one
failure domain. External independently controlled retrieval/witnessing can add
stated publication bounds, but is not invented evidence or mandatory blockchain.
No bounded rehearsal proves fifty-year retention. Specify the achievable recovery
contract and demonstrate it, rather than promising permanent availability.
