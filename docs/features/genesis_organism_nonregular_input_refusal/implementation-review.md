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
