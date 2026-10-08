# A02 implementation plan

1. Change evidence_id's evidence-version need call to code="unsupported" only.
2. Add a signed seven-case table to tests/conformance.test.mjs using the committed
   encounter-v1 origin/first event, helper signed and verifiedHistory context.
3. For each cloned body mutation, assert JS rejected and code equals literal;
   write exact canonical origin/event plus marker in a new owned fixture directory,
   run independent Python CLI and compare nonzero exit and stderr.error literally.
4. Run focused conformance and schema suites, then complete full regression after
   A01 correction. Preserve 9/14 literal byte corpus and historical fixtures.
5. Record results/limits, review small diff, commit on work branch and publish to
   existing draft PR6. No merge or birth; no accepted-state/canonical field change.

Rollback is an additive revert of this scoped code/test commit. Existing audit
and A01 work are preserved. No repair, cache, package or new execution phase.
