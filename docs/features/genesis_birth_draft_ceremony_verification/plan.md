# TEST-only ceremony checker implementation plan

Implementation waits for independent spec and plan gates. Only tools/check_draft_ceremony.mjs,
tests/draft-ceremony.test.mjs and tests/draft-ceremony-fixture.mjs added. Existing core,
synthetic ceremony and parent tool unchanged. Parent source68f4d39 retained.

1. Fixed checkDraft(root,trusted) and CLI per approved spec. Resolve external real
   TEST wrapper root, check all existing ancestors/root with lstat, exact marker,
   closed externally supplied context and fixed public TEST authority. Use no shell,
   subprocess except bounded execFileSync Git blob retrieval. Context never taken
   from package; CLI outside-root context canonical read. No secret inputs/sign API.
2. Local bounded readers open O_NOFOLLOW|O_NONBLOCK, fstat regular file/size before
   reading, require stable count/stat, validate exact closed shapes. Canonical files
   reuse existing parseCanonical; readable JSON≤8MiB uses fatal UTF8 plus bounded
   recursive token parser (depth32,node10000,array1024,object256) rejecting duplicate
   keys/unknown tokens/decimal or exponent numeric lexemes/-0/unsafe integers, then field-shape validators. No dependency.
   Raw large package files SHA-256 streaming64KiB chunks,256MiB/file and1GiB total;
   no giant in-memory corpus. Reject unexpected files/directories/symlinks via exact
   selected path/directory set before reading; code never repairs/deletes data.
3. Reuse Node Ed25519 crypto and existing canonical primitives for local draft
   domain/hash/proof helper only. Validate parent closed records + trusted authority,
   fresh expected nonce/binding/source, fixed TEST origin with existing validateOrigin,
   source raw inventory Git bytes and origin/manifest refs; no actual admission.
4. Validate small canonical freeze/release/birth chain, strict raw source/package/
   archive/release-publication reports, declared dependency blobs, exact archive-a,
   archive-b, public-package retained sets and raw retrieval logs. Retrieval logs must bind exact package inventory/revision/location; release
   retrieval is canonical byte-identical release envelope, not arbitrary log bytes.
   Reports' restored,
   approval and publication fields are claims; success never certifies physical
   actions or legal/human trust. Reject nonnull supersession unavailable with no
   predecessor, avoiding fabricated absence. All references are acyclic.
5. Scan exact journal members and marker, optional LOCK conflict, empty pending/
   conflicts, zero-or-one accepted exact birth envelope. Multiple/contradictory/
   extra members refuse, identical repeated check same ref/status with no mutation.
6. Tests helper builds one small private TEST wrapper using existing PUBLIC TEST1
   signing fixture. Tiny explicit Git source subset and synthetic fake dependency
   are labelled TEST, never full-source/real-runtime evidence. Capture package JSON
   for independent Python peer checker; signing exists only in test helper, no CLI
   signer/writer. Focus tests positive empty/accepted/repeat and failures required
   by spec, snapshot all regular bytes before/after for no-write. FIFO actual CLI
   subprocess timeout confirms nonblocking refusal without counterpart. Path attacks
   and malformed duplicate JSON exercised through actual check entry.
7. Reviewer independently checks same retained TEST package without calling JS and
   challenges valid signatures/refs/raw omissions/source/package/journal controls.
   Commit reviewed source/tests before running final full suite and actual retained
   fixtures; distinguish tested commit from later evidence report commits. Return
   supported CLI to parent after child validated completion; draft PR no merge.

Rollback scoped feature commits. Trusted private parent/source assumption only;
no claim hostile-admin race resistance, portable offline runtime, actual adoption,
public archive, signing, acceptance, recovery or birth. New failure modes duplicate
parser bugs, reference confusion and report-label trust are addressed by independent
parser/proof checks and falsifications. Remove generic abstractions, services,
new schema/domain additions to organism core, writer/lock recovery API and future
supersession implementation; none needed for this bounded first-candidate experiment.
