# TEST-only draft ceremony consistency checker

STATUS: DRAFT FOR INDEPENDENT SPEC GATE. Parent genesis_organism_birth_readiness;
existing Phase34–38 contract, not a new roadmap phase. Exact draft oracle:
../genesis_organism_birth_readiness/ceremony-proposal.md. Existing source68f4d39
and its provisional shadow remain historical evidence.

## Bounded interface and purpose

Implement tools/check_draft_ceremony.mjs exporting checkDraft(root,trusted), and
CLI `node tools/check_draft_ceremony.mjs TEST_ROOT TRUSTED_CONTEXT`. Read-only, no
signer/writer/accept/recovery API, no network or real organism input. Trusted context
is canonical closed {authority,creatorBindingRef,nonce,revision}, authority MUST
be existing PUBLIC RFC8032 TEST1 d75a980182b10ab7d54bfed3c964073a0ee172f3daa62325af021a68f707511a;
refs/nonce64lowerhex, revision40lowerhex actual retained Git commit. Context file
must be outside TEST_ROOT. Never derive expected authority/nonce/binding from the
untrusted package. No actual private key input. Public test fixtures alone may
sign in tests; module cannot sign. Root must be real outside repository, no symlink
ancestors or organisms path. Wrapper marker TEST_ONLY bytes
`genesis-organism proposed ceremony TEST ONLY\n` required. Missing marker/other key
refuses. Success means mechanical consistency of supplied TEST evidence ONLY;
no creator approval, restored execution, publication truth, rights or actual gate
is inferred from signatures or report fields. GENESIS #0001 UNBORN/NO-GO always.

## Fixed TEST package (relative root members)

Root exact allowed members TEST_ONLY, journal/,archive-a/,archive-b/,public-package/,
archive-a-retrieval.json,archive-b-retrieval.json,public-retrieval.json,
release-retrieval.json. No extra members/nonregular files/symlinks. Journal required
files CEREMONY,creator-binding.json,inventory.json,manifest.json,origin.json,
freeze.json,archive-report.json,release.json,release-publication.json,
public-package-inventory.json,possession.json,birth.json plus accepted/,conflicts/,
pending/. Optional LOCK refuses conflict. Root marker explicitly limits this test
wrapper; actual journal layout proposal retains independent creator acceptance.

Canonical proof files use existing D03 parser and≤65536bytes, readable reports
use strict UTF8/duplicate-free closed-shape JSON≤8MiB. Readable report
numbers MUST use integer lexical tokens only, no decimal/exponent/-0, within safe
integer bounds; fractions that round to an integer must reject. Archive aliases
are distinct archive-a/archive-b in either array order. Relative archived source
paths may include historical organisms/.playspec names; actual TEST root path
remains forbidden inside organisms or repository. No traversal/.git path allowed. All opens nonblocking+nofollow,
fstat regular-file and byte count stable, bounded. Exact draft ceremony closed
records/domains verify with Ed25519 using existing bytes primitives/Node builtin
crypto, SHA-256 domains separate from synthetic organism allowlist. Source inventory
is draft closed shape but TEST purpose="PUBLIC TEST ONLY", selection="TEST ONLY
bounded source selection"; every listed raw source artifact matches regular Git blob
at trusted revision. Selecting only bounded test artifacts tests mechanism, never
claims complete actual birth source coverage. No core runtime/profile changes.

Signed synthetic origin must validate existing adaptation-v1 profile, creator
PUBLIC TEST ONLY, birth public-test-only-draft-ceremony, initial public TEST authority,
signal0. Manifest candidate public-test-only-draft-ceremony, profile synthetic-v1,
revision trusted revision, creatorBindingRef trusted ref, originRef actual synthetic
origin reference and originSha256 exact bytes, inventorySha256 exact readable source
inventory. Anchor skip. Initial candidate supersedes null; nonnull refuses unavailable
because no predecessor raw evidence was supplied in this bounded first-candidate
experiment. It never treats missing predecessor as a valid empty birth list.

Verify exact possession signature over draft prefix, issued nonce and binding;
freeze over exact manifest; release over manifest/freeze/archive-report; birth over
manifest/release/origin/release-publication. Manifest body/refs and published-source
package are acyclic per parent draft. creator-binding matches trusted authority/ref,
scope public-genesis-origin-history-and-ceremony and disclosed claim PUBLIC TEST ONLY.
Do not interpret rights="creator-approved-disclosure" as proof of human approval.

Source inventory1024entries/32MiB aggregate/8MiB per source blob. Package inventory
closed {version:"public-package-v1",files}, sorted normalized relative regular paths,
1024entries/1GiB aggregate/256MiB per file (C4 measured host rationale), raw SHA-256
and size streaming verification. Require package contains creator-binding.json,
inventory.json,manifest.json,origin.json,freeze.json and files/<every source path>,
and dependencies/<each declared test dependency>. No report/release/birth/self member.
Every actual member must equal selection; all three package roots must match selected
raw bytes. Required ceremony records copied into each must byte-match journal.
Package inventory retained alongside, never self-selected.

archive-report exact parent grammar: two archives distinct location aliases
archive-a/archive-b; custodian PUBLIC TEST ONLY; restored true syntactically but
not physical-proof claim. publication location public-package; packageInventorySha256
matches exact readable inventory; each retrievalEvidenceSha256 matches appropriate
root retrieval raw file. Each archive/public retrieval log has exact closed readable shape
{purpose:"PUBLIC TEST ONLY",packageInventorySha256,revision,location}; refs and
revision match trusted package inventory/revision, location matches its root alias.
release-retrieval.json is the exact canonical signed release envelope, byte-identical
to journal/release.json; arbitrary unrelated log bytes cannot satisfy this binding.
Dependencies closed {name,version,sha256} (≤256), require
matching package dependencies/<name> raw bytes, name normalized basename≤128ASCII,
version nonempty≤128UTF8. Verification record exact parent shape/sourceRevision,
nonempty measured-version/commands strings, network disabled, resultsSha256 matches
root public-retrieval.json test log bytes. Reports are assertions validated for
shape/reference consistency only. release-publication location public-package,
releaseRef matches signed release; retrievalEvidenceSha256 binds release-retrieval
raw bytes. This fake local package never demonstrates actual publication/restore.

Journal CEREMONY marker exact parent bytes. Empty pending/conflicts required; any
entry holds/conflict, no cleanup. Zero-or-one accepted/<originRef>.json; exact canonical
birth envelope or empty. Any different/multiple/extra/nonregular member holds. LOCK
always refuses; never recover or infer writer absence. Repeated check is read-only
and yields same result/reference; duplicate semantics means same retained envelope,
not performing acceptance. Superseded manifest refuses unavailable (no guessing).
All traversal checks reject absolute/.., escaping/symlink/FIFO/member excess before
reading bytes. Readable report unknown fields/duplicate keys reject.

## Required evidence and completion

Success closed result {scope:"draft TEST mechanics only; GENESIS #0001 UNBORN/NO-GO",
manifestRef,freezeRef,releaseRef,birthRef,journalStatus:"empty"|"accepted",artifacts}.
artifacts is an integer equal to the public package inventory file count.
Errors categorized invalid/unsupported/unauthorized/unavailable/conflict/limit;
no writes on success/failure. Independent Python checker must derive same hashes,
proofs, raw artifact set/prerequisite/journal status from same fixtures without JS
calls. Tests and independent mutations cover forged/cross-domain proof, untrusted
context, omitted/changed raw artifact, mismatch source revision/origin/ref/report,
duplicate JSON, extra field/file/symlink/FIFO, missing publication/dependency,
supersession without raw predecessor, held lock/conflict/multiple/contradictory
accepted journal and identical repeated checks with directory hashes unchanged.
Separate independent spec/plan approval precedes source. Appropriate focused/full
regression and evidence review precede returning to parent and draft PR. This child
can complete as a TEST mechanism even while real adoption and actions remain NO-GO.

## Minimality

One small verifier, one synthetic package builder in tests and one independent
Python reproducer. Existing rehearsal pins a different fixture contract; byte-only
vectors cannot challenge prerequisites. No generic ceremony framework, storage
engine, signer, acceptance writer, actual key, new dependency/D-number/phase. Remove
it and solvable prerequisite-validation uncertainty remains. Recovery execution,
predecessor supersession success and real interoperability remain unsupported.
