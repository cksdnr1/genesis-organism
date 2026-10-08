# IC01 implementation result

Working-tree correction based on audit merge2cb27d0, branch work/conformance-remediation. Independent spec+plan reviews approved97/no blockers. User authorized scoped fixes; source owner runtime_adversary, reviewer design_challenger, Git owner requirements_auditor. No commit/push/merge by implementer.

Five existing bounded byte-reader opens now include O_NONBLOCK alongside O_RDONLY|O_NOFOLLOW: src/store.mjs, src/cli.mjs, verifier/verify.py, tools/rehearsal.mjs and verifier/rehearsal.py. Descriptor type/size checks, finally close, size+1 reads/race handling, diagnostics and canonical validation remain intact. Directory fsync/exclusive writer flags did not change. No state/schema/wire/history migration.

New existing-file test groups exercise Node history replay+inspect, independent Python history, Node append/init FIFO source, and Node/Python ceremony helpers. No writer is supplied for negative controls; a test-local O_RDWR|O_NONBLOCK holder supplies a deterministic connected/no-data counterpart on observed POSIX hosts. Harness timeouts detect regressions and terminate only owned subprocesses. Snapshots cover regular bytes, names and FIFO entry types; init creates no target; valid regular append/replay and independent agreement succeed after refusals. All owned descriptors/scratch are closed/cleaned.

Fresh commands from repository root:

| Check | Outcome |
| --- | --- |
| baseline.py at starting merge, seven cases | all wait through0.5s; baseline.json retained |
| node --test --test-name-pattern='nonregular input refusal' tests/cli.test.mjs tests/rehearsal.test.mjs before source fix | exit1; both meaningful groups fail ETIMEDOUT |
| same two groups after fix | exit0;2/2 pass;1160.144459ms |
| node --test tests/store.test.mjs tests/cli.test.mjs tests/lineage.test.mjs | exit0;11/11 pass;2761.806875ms |
| .venv/bin/python tests/schema_vectors.py | exit0;6/6 pass |
| .venv/bin/python tests/successor_schema_vectors.py | exit0;2/2 pass |
| .venv/bin/python verifier/lineage.py fixtures/reproduction-v1/manifest.json | exit0;4 nodes/3 edges |

Evidence is in evidence/. These runs test corrected uncommitted source; their base GitHEAD is not a claim that corrected files were already committed/archived. Independent implementation review pending. Full npm regression/ceremony validation remains pending for the final combined repair candidate after IC02; no all-suite claim yet.

Limits: observed Node25.9.0/Python3.14.7 on macOS; POSIX no-follow/nonblocking flags and FIFO fixture mechanism, Windows/other systems unverified. O_NONBLOCK does not promise bounded regular/network/device/filesystem IO or hostile-administrator/ancestor-race protection. Existing contextual Node ceremony limit versus Python invalid is retained. Original byte/state contracts, parent audit evidence and GENESIS #0001 UNBORN status remain.

Safe-refactor review: workflow's inherited origin/master target is absent (`git rev-parse --verify origin/master` fails). Current explicit Git-owner/user target is origin/work/phase-03-authority, so reviewed against that actual merge base instead. Diff is exactly five read flags and two focused regression groups; git diff --check passes. No refactor is justified: merging independent readers or introducing generalized file APIs would broaden this small correction. No code changed after green focused verification.

Independent implementation review completed: implementation-review.md and independent-results.json record14 actual refusals across seven surfaces with/without a no-data counterpart, no stdout/no writes, absent init target and regular controls. Reviewer accepted scoped behavior/source/tests; final combined full suite remains pending. Child is at pr_prepare; Git publication/final PR link is delegated to requirements_auditor, so no premature task completion or push by source owner. Proceeding sequentially to IC02 specification while IC01 implementation is finished; final draft PR will cover both. Reusable agent guidance is not warranted beyond scoped test/portability records.
