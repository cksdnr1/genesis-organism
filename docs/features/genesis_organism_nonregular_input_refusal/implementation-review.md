# Independent IC01 implementation review

Verdict: scoped implementation accepted, pending final combined full-suite validation before draft PR. Reviewed working tree on work/conformance-remediation based on2cb27d0; no commit or universal-conformance claim. Reviewer owns this review/evidence only.

Source diff inspected: exactly five O_NONBLOCK additions in src/store.mjs readBounded, src/cli.mjs inputBytes, tools/rehearsal.mjs readWithin, verifier/verify.py read_file and verifier/rehearsal.py read_local. Each retains O_NOFOLLOW, fstat regular/size guard, bounded reads, race check and finally close. Directory fsync and exclusive writer opens are unchanged. No protocol/hash/schema/event/data-layout or dependency change.

Existing test extensions inspect actual entry points, assert no successful stdout, contextual code, no signal/timeout, retained marker/regular bytes and entry types. Red-before-fix timeout evidence is independently meaningful: these tests fail because the actual FIFO reader blocks, not because they mirror flags. Connected no-data controls use a test-only O_RDWR|O_NONBLOCK holder and close in finally. Windows skip and observed POSIX limitations are explicit. Ceremony limit/invalid distinction is retained; IC01 does not imply broader ceremony diagnostic parity.

## Reviewer-authored falsification

Independently executed a Python subprocess harness, separate from the implementation test groups and runtime owner's baseline script. Retained results: independent-results.json.

- Created fresh private scratch; initialized two core-v1 histories using actual Node init-fixture and a ceremony root using exported initializeRehearsal.
- Placed named FIFOs at history/000001.json, proposal source and ceremony/payload. No writer existed in first pass.
- Executed actual Node replay/inspect, Python verifier/verify.py, Node append source/init-fixture source, exported readRehearsal and Python guard_root/read_local. A3s subprocess bound detected regression only.
- Repeated all seven surfaces while test-owned O_RDWR|O_NONBLOCK descriptors held each FIFO with no data, closing all descriptors in finally.
- All14 calls returned exit1, empty stdout and expected contextual class: invalid for history/proposal/Python ceremony, limit for Node ceremony. Recursive lstat/type and SHA256 regular-byte snapshots stayed identical before/after each call. Init target remained absent.
- Valid regular history control before refusal succeeded. After refusal, actual Node append succeeded and JS/Python replay JSON matched exactly. Replaced owned ceremony payload FIFO with regular literal bytes `independent regular control`; both readers returned the exact hex bytes.

Reproduce surfaces from repository root with owned synthetic directories: `node src/cli.mjs replay DIR`, `inspect DIR`, `.venv/bin/python verifier/verify.py DIR`, `node src/cli.mjs append VALID_DIR FIFO`, `init-fixture ABSENT_DIR FIFO`; use `readRehearsal(ROOT,'payload')` and `rehearsal.read_local(rehearsal.guard_root(ROOT),'payload')` for ceremony. Fixture origin/event are fixtures/core-v1/origin.json and000001.json. Snapshots deliberately never read FIFO content. No real organism directory was used or modified.

These checks close the demonstrated no-writer refusal mechanism on the observed host. They do not promise a universal regular-filesystem timeout, Windows support, hostile-admin safety, arbitrary device behavior, physical power-loss durability or production readiness. Existing full regression run remains required after IC02 on final combined source. No new D-number, phase, runtime abstraction or ceremony authority is needed. No revision request remains for this bounded source diff.

## Final combined evidence review

Final recommendation: validated scoped repair ready for draft PR; no unresolved implementation/review blocker. Actual draft-PR publication remains Git-owner work, and merge is not authorized.

Independently reviewed both updated child result/pr documents and exact-source evidence for `c4ab35222e00a8a3c0b5441a63c638b134982be9`. Runtime owner confirmed actual tool exit0; final-suite.log records56/56 pass,0 fail/cancel/skip,139332.061333ms. Reviewer checked the log summary and all4 log SHA256 values against final-validation.json, all11 selected source/test/contract hashes against both live files and committed Git blobs, and all6 preserved original decision/spec/unborn paths against audit merge2cb27d0. No source drift occurred. Schema6/6, successor2/2 and independent lineage4nodes/3edges evidence agree. Full suite was peer-executed, not redundantly rerun by reviewer.

Independently confirmed current ceremony selection has197 unique sorted paths and includes the accepted dated supplement. Original D04/D06/GENESIS/unborn bytes are unchanged; specREADME preserves its original prefix. Thus the exact-HEAD full rehearsal suite tests the intended corrected code/governing supplement. Prior working-tree/pending statements are clearly labeled historical checkpoints; final source SHA is distinguished from later evidence-only documentation commits. Metadata-only system-Python package lookup failure and successful .venv metadata retry are disclosed without misreporting test failure or rerun.

This closes the two observed bounded repair obligations on tested source/host. It does not certify every malformed input, every platform/regular filesystem availability, all original38 phases or actual birth readiness. Original Phase38 entry and #0001 UNBORN/NO-GO remain. No new D-number, execution phase, profile, dependency, runtime framework or automatic repair merge is justified.
