# Phase26 plan

1. Add reproduction domain allowlists without changing old prefixes. Add pure
   validateChild, canonical/closed checks, sorted refs, selected replay states,
   common consent proofs, exact integer mean and expected origin comparison.
2. Add store publishChild/loadChild using existing guarded scan/publish. Validate
   before side effects, exact-origin retry, absent sidecar completion, no overwrite;
   load rechecks origin/packet/history. On partial marker/origin stop unavailable.
3. Add exclusive Python fixture generator and root/child/grandchild canonical
   manifest/directories with public seeds. No production signing helper.
4. Add focused tests for one/two/four parents, proof/order/ref/identity/privacy,
   immutable parents and real store duplicate/partial/mismatch failure paths.
5. Run focused/full Node and Python schema checks; inspect cleanup; commit/push PR6.

No complete graph claim or generation formula. Fixes/new commits preserve retained
bytes. No stored derived parent state/cache or new dependencies. Completion is
valid direct contribution evidence and durable packet, not ancestry completeness.
