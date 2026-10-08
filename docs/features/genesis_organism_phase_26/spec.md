# Phase26 — synthetic child validation/publication

## Scope/current facts/files

Reviewed D10, bytes/admission/replay/store and public fixture generators. No child
runtime currently exists. Implement direct-parent packet verification and durable
publication only; complete ancestry and independent graph verification are Phase27.

## Evidence and exact contracts

| Accepted D10 | Implementation |
| --- | --- |
| closed body/packet/consents | reproduction.mjs validateChild(packet,resolve) |
| distinct consent domain | additive reproduction hash/proof kinds in JS/Python bytes |
| full selected-parent replay | resolve exact record, verify history, select stateRef |
| child retry/failure | store publishChild/loadChild using existing guard/link/fsync |

Validate canonical budgets and closed fields before resolver. Parent IDs sorted
unique1..4; find adaptation state with exact hash; verify each common-body consent
under selected authority; floor mean signal; compare exact signed child origin
body/birth binding/new ID. Resolver null=unavailable. No private signing API.

Existing publication primitive remains internal. store imports pure validateChild;
reproduction imports replay/bytes only, avoiding cycles. Before writing validate
packet. Existing directory retry requires protected marker/exact origin and valid
history; absent lineage can be completed, differing sidecar cannot be overwritten.
loadChild requires exact packet-origin equality plus full store history replay.

## Files/flow and exit

Add reproduction.mjs; extend store APIs and hash/proof kinds; add public Python
fixture generator creating root0/root2/child1/grandchild1 plus canonical manifest.
Generator uses independently authored Python byte/proof/replay primitives; no
runtime algorithm is imported from JS. Add tests/reproduction.test.mjs verifying
known means, one/two/four parent handling, order/duplicate/consent/ref mismatch,
origin mismatch, immutable parents, missing resolver, retry and partial publication.
Core/original fixtures regress; no schemas altered or new consensus field.

## Risks/recovery/minimality

Partial directory is preserved unavailable, not counted as offspring. Existing
valid parent consent proves scoped authorization, not complete ancestry/social
fact. No generic breeding platform, signer discovery, parent writes or distributed
transaction. Only own temporary test directories may be removed. New failures
remain explicit invalid/unavailable/io; historical origin and #0001 unchanged.
