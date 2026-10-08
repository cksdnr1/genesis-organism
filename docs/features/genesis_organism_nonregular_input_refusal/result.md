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

Evidence is in evidence/. These runs test corrected uncommitted source; their base GitHEAD is not a claim that corrected files were already committed/archived. At that initial working-tree checkpoint independent implementation review and final combined suite were pending; the completed independent review and exact-candidate results are recorded below.

Limits: observed Node25.9.0/Python3.14.7 on macOS; POSIX no-follow/nonblocking flags and FIFO fixture mechanism, Windows/other systems unverified. O_NONBLOCK does not promise bounded regular/network/device/filesystem IO or hostile-administrator/ancestor-race protection. Existing contextual Node ceremony limit versus Python invalid is retained. Original byte/state contracts, parent audit evidence and GENESIS #0001 UNBORN status remain.

Safe-refactor review: workflow's inherited origin/master target is absent (`git rev-parse --verify origin/master` fails). Current explicit Git-owner/user target is origin/work/phase-03-authority, so reviewed against that actual merge base instead. Diff is exactly five read flags and two focused regression groups; git diff --check passes. No refactor is justified: merging independent readers or introducing generalized file APIs would broaden this small correction. No code changed after green focused verification.

Independent implementation review completed: implementation-review.md and independent-results.json record14 actual refusals across seven surfaces with/without a no-data counterpart, no stdout/no writes, absent init target and regular controls. Reviewer accepted scoped behavior/source/tests; at that source-ready checkpoint final combined full suite remained pending. Child is at pr_prepare; Git publication/final PR link is delegated to requirements_auditor, so no premature task completion or push by source owner. Proceeding sequentially to IC02 specification while IC01 implementation is finished; final draft PR will cover both. Reusable agent guidance is not warranted beyond scoped test/portability records.

## Final exact-source validation

Reviewed source candidate `c4ab35222e00a8a3c0b5441a63c638b134982be9`, branch work/conformance-remediation. Git owner committed source/contracts/tests before this run; no source changes occurred during or after it. `npm test` completed exit0: **56/56 pass**, failures/cancellations/skips0, **139332.061333ms**. Includes current197-artifact freeze/archive and independent rehearsal/SIGKILL checks, both new FIFO groups, compound diagnostics, exact PM-01, concurrency/fsync, ancestry, reproduction, population and simulation. Expected negative Git `not a tree object` output did not affect success. Final schema suite6/6, successor2/2 and independent lineage4nodes/3edges all exit0. Evidence: IC02 evidence/final-suite.log, final-schema.log, final-successor.log, final-lineage.json and final-validation.json.

Independent reviewer verified candidate197 sorted unique selection/supplement, original D04/D06/GENESIS/unborn bytes and specREADME prefix preserved. Its source-ready adversarial reviews are separately attributed; finite tests do not prove universal conformance. Current final updates are evidence/docs only, so a later final document commit SHA must not be mislabeled as the tested source SHA. At the final-test checkpoint actual draft PR creation remained Git-owner work; neither this source owner nor these tests authorize merging the repair PR or actual birth.

## Draft publication and task completion

Git owner published [DRAFT PR10](https://github.com/cksdnr1/genesis-organism/pull/10)
from work/conformance-remediation into work/phase-03-authority. Fresh gh pr view
confirms OPEN/isDraft=true, evidence head e31317cec47d03e21c32361ca88e20308f04decf.
Tested source remains c4ab35222e00a8a3c0b5441a63c638b134982be9; e31317c only adds
reviewed evidence/docs. These subsequent link/status notes are docs only.
Supported `playspec complete --task genesis_organism_nonregular_input_refusal --expected-phase pr_prepare --no-copy --quiet`
completed after real draft publication. Fresh `playspec get-task` confirms status
completed. This records scoped repair deliverables, not original phase/birth acceptance. Current explicit shared-branch
ownership overrides inherited master-switch instructions. Repair PR merge remains
unauthorized; original all-phase/birth gates are not closed. GENESIS #0001 UNBORN.
