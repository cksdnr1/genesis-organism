# A01 implementation plan

1. Preserve audit evidence and current dirty prose; apply only the approved scoped
   source/test/docs changes. Existing branch work/synthetic-phases targets draft PR6.
2. Add predecessor readArtifacts in JS checkFreeze after local context validation.
   Add independent git_artifacts in Python check_freeze in the same location.
3. In Python CLI, before check_freeze, reject offline superseding manifests as
   unavailable predecessor artifact evidence. No Git call or remote fallback.
4. Add one regression group. Reuse one valid prior/current manifest, make validly
   signed successors for zero revision, bad prior raw hash, nonexistent selected
   path and omitted selected path; require JS and full Python CLI refusal.
   Run valid predecessor positive, offline supersession refusal with PATH excluding
   Git, and existing nonsuperseding offline success. Tests mutate only cloned data
   and their owned temporary directories.
5. Append dated D12 and runbook scope notes; no historical bytes or wire fields
   changed. Record source pin, focused tests and limitations in result.md.
6. Run focused ceremony suite; inspect diff/module boundaries. Final full suite
   after A02 source changes avoids unnecessary duplicate whole-suite runs.
7. Commit scoped correction and reviewed audit evidence on the work branch; push
   to existing draft PR6, record exact PR link. No merge or actual birth.

Rollback: additive Git correction/revert of scoped source, not history rewrite;
pre-task patch and untracked audit report are backed up outside the repo. Never
delete prior files to recover a failed check. Removing added checks must fail the
new negative tests. No dependency/schema/core event changes or new execution phase.
