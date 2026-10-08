# Phase27 — complete bounded lineage verification

## Scope/current architecture/files

FACT: reproduction.mjs validates direct contributions and store publishes immutable
packets. Neither proves complete ancestry. Reviewed D10, reproduction/replay/bytes
and independent verify.py. Implement full read-only traversal, no new state/index.

## Contract/evidence

| D10 | Required behavior |
| --- | --- |
| verifyLineage(rootId,resolve) | sorted root/nodes/edges, exact closed shapes |
| child discriminator | child-* requires valid packet whose origin equals resolved origin |
| root | null lineage and valid adaptation-v1 history |
| bounds |32 nodes, depth16 root0,128 resolver calls; active path detects cycle |
| unavailable/private | null evidence fails unavailable; no omitted ancestors |

Cache only per-call resolver records to avoid changing inputs during traversal;
no persisted derived graph. Verify every resolved origin/history and requested ID;
validateChild checks each selected state/consent/inherited value. Recurse parents,
retain exact stateRef edges, sort deterministically. No generation formula.

## Files and independent boundary

Add src/lineage.mjs; verifier/lineage.py implements body/proof/inheritance/traversal
independently, reusing only independent Python bytes/replay primitives. CLI reads
one bounded nofollow canonical manifest, validates closed root/records and <=32
entries, no network or executable/path resolution. Add tests/lineage.test.mjs
comparing the selected four-node/three-edge graph and rejection outcomes.

## Risks/tests/recovery

Test altered consent/edge/state/identity, duplicate parent, missing/private ancestor,
version mismatch, malicious recursive alias, explicit depth/node limits and null
lineage for child. A fully valid hash-committed cycle is infeasible under assumed
hash integrity; malformed cycle attempts must fail bounded, not hang. Rebuild each
query; originals unchanged. No ancestor availability guarantee or live birth.
