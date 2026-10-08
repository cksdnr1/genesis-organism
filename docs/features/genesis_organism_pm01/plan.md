# PM-01 implementation plan

1. Add a focused conformance test loading all12 retained signed audit candidates.
   Hard-code expected name/code mapping, assert twelve unique names; preserve
   original failing JSON. Test JS classify rejected/code, store.append refusal
   with byte-for-byte directory inventory unchanged, and independent Python
   directory CLI exit1/code. Verify standalone negotiate/express diagnostics.
2. Run the new test against unmodified Python and record the expected disagreement
   failure. If it passes before the change, investigate rather than claim coverage.
3. In verifier/verify.py evidence_id wrap only expression_result(...) in try /
   except Invalid: raise Invalid('invalid', 'expression/policy fidelity') from None.
   Keep canonical/envelope version/source/interaction checks outside. No JS change.
4. Append dated D13 clarification of contextual invalid mapping and minimality:
   minimum handler, alternatives rejected, required conformance, removal result,
   new risk and validation. Preserve earlier accepted/proposed text and vectors.
5. Run node conformance/perception/encounter focused tests and existing audit probe.
   Save new probe output in this task directory with a separate actual runtime
   revision field; its auditedRevision is the original corpus source. No rewrite
   of the historical failing report, probe or diagnostic-results.json.
6. Review diff against origin/work/post-merge-conformance-audit; no discretionary
   refactor. Commit scoped implementation/task docs, run full npm test on that
   GitHEAD, independent schema6+2 and causal12 views. Check seven protected bytes
   and historical corpus SHA256 remain unchanged; document environment/CI limits.
7. Append result/status closure without claiming full conformance or birth readiness.
   Update existing draft PR7 title/body around audit plus correction, commit/push
   on work branch, fresh verify head/state and finalize local PlaySpec workflow.
   Do not merge PR7, checkout an assumed master or change PR3–5.

All code decisions and expected values are fixed in the spec. No new API/state,
dependency, event, phase or canonical input. The only test writes outside source
are owned temporary synthetic histories; no reset/repair. Rollback is an additive
revert of the scoped implementation commit. Original failed evidence survives.

Pre-implementation amendment: step4 also adds the retained JSON path to the
sorted canonical ceremony selection (196 files) and an inclusion assertion in
tests/rehearsal.test.mjs. No new freeze/release/manifest fabricated; only final
synthetic tests generate their usual fixture manifests from committed GitHEAD.
The first pre-fix negative test failed at observer-version as expected. Supported
phase recovery returns through spec/plan reviews to accept this discovered test
input dependency. Prior workflow snapshots and baseline failures remain intact.
