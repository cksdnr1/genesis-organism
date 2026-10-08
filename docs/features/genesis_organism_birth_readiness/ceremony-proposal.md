# Exact minimal real-ceremony contract proposal — NOT ACCEPTED

Prepared under existing Phase34–38 birth evidence requirements; no new decision
number or phase. No actual signing, candidate freeze, publication or birth occurs.
Creator must review exact contract and resulting candidate-specific bytes before
separately authorizing any act. Existing fixture ceremony stays synthetic-only.

## Roles, namespaces and canonical bytes

Creator approves applicability, attribution and actions. Initial controller signs
origin/events. Proposed minimal ceremony authority is the same designated creator-
controlled public key; a different ceremony authority requires explicit creator
binding and is not silently accepted. Signature possession cannot prove a human
identity, rights ownership or that approval was given. Creator approval is an
attributable externally reviewed statement identifying exact action and hashes.

Reuse D03 restricted canonical UTF-8 JSON, SHA-256 and Ed25519. Ceremony prefix is
ASCII `genesis-organism/ceremony-v1/` then kind then NUL. Hash kinds are
creator-binding, manifest, freeze, release, birth. Proof kinds are possession-proof,
freeze-proof, release-proof,birth-proof. All fields are closed; unknown fields reject.
Do not add these kinds to src/bytes.mjs organism allowlists. Ceremony is external
acceptance evidence, not an event or lifecycle field in canonical organism state.

Prefix origin not used here: origin must follow separately selected organism
profile's original origin-proof/hash domains. Cross-profile/ceremony signature
reuse is invalid. No signature, origin ref or key in proposal vectors represents
#0001. `ceremony-vectors.json` contains PUBLIC TEST ONLY canonical/message bytes;
all test references/revision zero are placeholders deliberately unavailable in Git.

## Closed records (all fields required)

Each record below is a canonical object. `H` is exactly64 lowercase hex,
`KEY` exactly64 lowercase hex Ed25519 public encoding, `SIG` exactly128 lowercase
hex. Protocol constants/hex/path names are ASCII. Creator claim and operator location/
custodian/log command strings permit valid UTF-8 within stated byte bounds. Key/proof verification is not legal
identity verification. Maximum canonical record65536 bytes; existing depth/node/
string/member restrictions apply. Source inventory32MiB,1024 selected regular artifacts,8MiB per artifact.
Dependency/runtime/public packages instead allow256MiB per retained distribution
and1GiB aggregate,1024regular files: current tested Node libnode.141.dylib alone
is66,399,712bytes, so source-only limits are demonstrably insufficient. This is
a bounded proposal for the measured host, not universal portability/durability.
If complete required evidence exceeds these bounds stop for explicit review,
never omit it. These are preparation/ceremony limits, not event consensus.

| Record | Exact fields and semantics |
| --- | --- |
| creator-binding | `{version:"creator-binding-v1",creator,authority,scope:"public-genesis-origin-history-and-ceremony",rights:"creator-approved-disclosure"}`. creator nonempty UTF-8≤256bytes, authority KEY; externally approved statement associates the claim/key and exact permitted scope; does not licence unrelated records. |
| possession body | `{version:"possession-v1",purpose:"key-possession-only-no-lifecycle-authorization",creatorBindingRef:H,authority:KEY,nonce:H}`. fresh locally generated32byte nonce; verifier records issued nonce and accepts only exact match once. No secret in challenge. |
| manifest | `{ceremony:"ceremony-v1",profile,candidate,revision,creatorBindingRef:H,originRef:H,originSha256:H,inventorySha256:H,anchor:"skip",supersedes}`. profile explicitly accepted synthetic-v1 or genesis-v1; candidate lowercase `[a-z0-9-]{1,64}`, not identity; revision40lowerhex must resolve retained commit; supersedes null or prior failed-manifest H; inventorySha256 binds exact RAW readable inventory.json bytes; inventory closed shape below. originSha256 binds separately retained canonical signed origin bytes, originRef its selected-profile commitment. Source commit and retained package immutable. |
| freeze body | `{ceremony:"ceremony-v1",manifestRef:H,authority:KEY}`. authority equals approved binding; proof only after exact freeze approval. |
| release body | `{ceremony:"ceremony-v1",manifestRef:H,freezeRef:H,archiveReportRef:H,authority:KEY}`. verified freeze, both retrieved/restored raw archives and report required; separate publication approval. |
| birth body | `{ceremony:"ceremony-v1",manifestRef:H,releaseRef:H,originRef:H,releasePublicationRef:H,authority:KEY}`. independently checked complete gates, real signed origin under selected profile, published release and separately approved exact request. |

Proof envelopes are exactly `{body,signature:SIG}`. Hash references for signed
stages hash domain+canonical FULL envelope; manifest and creator-binding references
hash domain+canonical unsigned object. Possession proof is verified and retained,
not treated as creator-binding approval or reused as a lifecycle reference.

archiveReportRef is RAW SHA-256 of retained readable JSON report with closed shape
`{version:"archive-report-v1",manifestRef:H,archives:[A,A],publication,dependencies,verification}`.
The source inventory has exact closed shape `{version:1,purpose,revision,selection,artifacts}`,
matching preparation inventory conventions: purpose/selection nonempty strings,
revision40lowerhex equals manifest revision, artifacts sorted unique
`{path,sha256:H,size}` regular normalized Git paths, size0..8388608,≤1024 entries,
32MiB aggregate raw. Retain exact inventory raw bytes, not D03 canonical encoding:
D03's256-member/65536byte limits cannot fit arbitrary full selection. No new
canonical grammar is introduced. Independently verify every referenced Git blob.

Publication is exactly `{location,packageInventorySha256:H,retrievalEvidenceSha256:H}`.
The readable public package inventory is closed `{version:"public-package-v1",files}`,
files sorted unique `{path,sha256:H,size}`, normalized paths,1024file count,256MiB per file and1GiB raw aggregate; source
subset still satisfies its stricter source inventory budget. It
selects source raw files/dependency bytes and accepted signed origin, creator
binding, manifest, freeze and source inventory. It excludes itself and all later
archive reports, release and birth envelopes. Retain all those later bytes
alongside with explicit references; never add them retroactively to this package.
A package inventory hash does not prove publication; actually retrieve and verify
all selected bytes at the approved public location before signing release.

Birth's releasePublicationRef binds RAW SHA-256 of readable closed
`{version:"release-publication-v1",releaseRef:H,location,retrievalEvidenceSha256:H}`.
After signing release, publish/retrieve the exact release envelope and record this
report; birth checks matching releaseRef and actual retrieval. No release signature
must exist before its own signing or be inside its preimage. location/custodian
strings are nonempty≤4096UTF8bytes. Published retrieval evidence includes actual
retrieved bytes/logs, retained separately by hashes, with stated trust assumptions.

All readable reports/inventories use strict UTF-8 JSON, reject duplicate keys,
unknown fields, invalid types/numbers and nonregular files. Their RAW SHA-256
preserves exact bytes; they need not fit D03 canonical object budgets. Bound each
readable report/inventory8MiB; validate listed closed shape, count and aggregate
budgets explicitly. No hash-only proof of availability or parser ambiguity allowed.

Each A is `{location,custodian,retrievalEvidenceSha256:H,restored:true}`; location and
custodian nonempty≤4096UTF8bytes and creator-approved; two distinct approved locations
must actually be retrieved. dependencies array of `{name,version,sha256:H}` over
retained distributable bytes; verification `{sourceRevision,node,python,cryptography,
commands:[string],resultsSha256:H,network:"disabled"}` with exact measured versions
and retained logs. Maximum256entries/array; do not assert restored:true without
performed restore. Report describes trust limits; same operator copies do not prove
independent witnessing/durability. No network timestamp/blockchain requirement.

## Ordering and failure contract

Before freeze, real-purpose applicability, public disclosure, exact candidate body,
controller possession and ceremony contract must be accepted, and independently
verified real-purpose mechanics available. Approval identifies signed-origin
creation and freeze as explicit actions; signing provisional template is forbidden.
Manifest references only pre-freeze source inventory/origin/binding; never itself
or subsequent freeze/archiveReport/release/birth. Freeze verifies manifest raw artifacts, Git revision, approved creator binding and
origin signature. Release requires successful actual restore/publication evidence;
birth requires matching release/origin and all original gates. Signed malformed or
incomplete requests reject without state/journal writes.

Proposed real journal is creator-designated private directory outside repository,
marker bytes `genesis-organism ceremony-v1\n`, one local writer, exclusive lock with
PID and reviewed recovery (same local trust/absence checks as D12). Paths are
manifest.json,freeze.json,release.json,archive-report.json,origin.json plus selected
raw files in archives; accepted/<originRef>.json holds complete birth envelope;
conflicts/<birthRef>.json retains contradictory request. Exact same birth bytes
return duplicate and same ref; different reuse holds and retains evidence. This
is local uniqueness only. Conflict never becomes a second birth automatically.

Two separately approved archive roots are explicit operator inputs, never discovered
from HOME/network guesses. Partial files retain diagnostics; write-complete files
publish without overwrite. Recovery verifies source/archives/signatures plus writer
absence and unchanged lock; no age-based lock removal. Failed-candidate supersession
retains prior manifest/raw files/failure and checks designated journal; never trusts
invented births=[] as proof of global absence or supersedes accepted birth. Without
retained predecessor evidence refuse. Retry uses unchanged authorized bytes; new
candidate requires new review and separate action authorization. No timestamp can
order events or repair invalid earlier proof.

## Concrete future interface for review, NOT a callable implementation

The current callable preparation command is `node tools/prepare_birth.mjs FULL_COMMIT NEW_OUTPUT`.
There is deliberately no actual freeze/release/birth command in this branch. After
contract acceptance and bounded implementation review, proposed interfaces are:
`ceremony verify-freeze MANIFEST FREEZE CREATOR_BINDING ARCHIVE_ROOT`,
`ceremony verify-release MANIFEST FREEZE RELEASE ARCHIVE_REPORT ARCHIVE_A ARCHIVE_B`,
`ceremony verify-birth MANIFEST FREEZE RELEASE BIRTH CREATOR_BINDING JOURNAL_ROOT`.
These are read-only verifiers; no command receives private keys. Actual local signer
and journal acceptance interfaces must be explicitly reviewed before execution.
An unsigned proposal alone cannot justify claiming the real ceremony executable.

Unknown actual key, accepted creator string, source/package/origin commitments,
archive destinations/reports and signatures remain UNKNOWN. Final bytes cannot be
computed truthfully without those values. The closed proposed grammars/domain/test
vectors are complete enough to review their mechanical choices now; accepting the
proposal does not authorize substituting unknown facts or executing any act.

## Exact proposed journal surface

Root allowed members: CEREMONY, LOCK (only while writer held), pending/, accepted/,
conflicts/, creator-binding.json, inventory.json, manifest.json, origin.json,
freeze.json, archive-report.json, release.json, release-publication.json,
public-package-inventory.json. Roots must be new/private/real outside repository;
required regular files and archive locations are explicit verified operator inputs.
CEREMONY equals marker above. No unknown/extra member, symlink, device or incomplete
required proof may pass verify-birth. All canonical proof files≤65536bytes; readable
reports≤8MiB; source inventory/package constraints as above. Missing prerequisite
returns unavailable; mismatched bytes/shape invalid; unknown profile unsupported;
unapproved authority unauthorized; equivocation/held lock conflict; budget limit.
Diagnostics do not manufacture distributed truth or retroactive authorization.

LOCK canonical exact `{ceremony:"ceremony-v1",pid}` pid integer1..2147483647.
pending names UUID lowercase RFC4122-style hex `8-4-4-4-12`, each regular file
≤8MiB,≤256members/32MiB aggregate. Pending entries are retained diagnostics, never
accepted proof; a pending entry for current action prohibits claiming completed
publication until exact complete bytes and accepted journal are verified. Accepted
allows zero-or-one regular `<originRef>.json`, no directories/extra members. Its
body originRef/manifestRef must equal supplied verified candidate, filename must
match, signature and all release/publication/archive prerequisites independently
checked. Empty journal means not accepted. Different origin/candidate or multiple
accepted files holds conflict; never silently choose one. Conflicts allows≤256
regular `<birthRef>.json` canonical signed birth envelopes, filename/full-envelope
hash agreement; any member holds. Unknown invalid conflict evidence also refuses,
not discarded. A verify-only call never writes or recovers a lock.

All verifier interfaces read the listed required files from verified journal root
or explicitly supplied exact files; archive-report and release-publication raw
bytes must be available before their references can validate. Archive locations
are obtained from the creator-reviewed report, not filesystem discovery. Verify
public package/source inventory references against actual retained raw bytes.
The future actual write operation remains separately authorized; its exact local
interfaces/tests will be reviewed before implementation under this contract.
