# D10 — bounded synthetic reproduction and authenticated lineage

STATUS: ACCEPTED for public synthetic fixtures, 2026-10-08 under
[delegation](2026-10-08-synthetic-delegation.md). No external autonomous breeding,
actual organism birth, licence grant or GENESIS #0001 authorization.

## Closed packet and new origin

Add accepted D03 hash kind reproduction and proof kind reproduction. Exact bytes
remain D03: H(reproduction,body); consent signs ASCII
genesis-organism/synthetic-v1/reproduction-proof + NUL + canonical(body).
Domain separation is necessary to prevent an origin/event signature being reused
as reproductive consent. Existing domains and historical hashes do not change.

Packet is closed {body,consents,origin}. Body is closed:
{version:"reproduction-v1",nonce,parents,authority,creator,rules:"adaptation-v1",signal}.
nonce lowercase [a-z0-9-]{1,64}; authority lowercase Ed25519 key; creator same
birth-origin bound (1..256 UTF8 bytes); signal safe integer 0..255. Parents is a
1..4-element array of closed {organism,stateRef}, lowercase 64hex each, strictly
ascending unique organism IDs. This is one bounded experimental profile, not a
universal restriction to one/two/four parents. No AI/environment contributor slot.

Each selected parent state must be found by full verified replay of available
origin/events, have rules=adaptation-v1 and match both organism and stateRef.
History is immutable and may extend beyond the selected state. Parent consent is
by that selected state's authority over the identical complete body, binding all
contributors, their states, nonce and complete child proposal. consents is ordered
same as parents, each closed {organism,signature}; missing/false consent is invalid.
No parent events or histories are changed; no distributed atomicity is promised.

Inherited signal is floor(sum(selected signals)/parent count), exact bounded integer
arithmetic; mutation is absent, not randomly invented. Current signal is D09's sole
eligible inherited value. No memory, synapse, experience, parent authority, body or
creator attribution is implicitly inherited. Child authority/creator are explicit
consented inputs, not forced to equal a parent or owner.

origin is an ordinary signed adaptation-v1 origin with fields exactly:
profile=synthetic-v1, rules=body.rules, birth="child-"+H(reproduction,body),
authority=body.authority, creator=body.creator, genome={signal:body.signal}.
Its own child authority signs origin-proof. Its organism ID must differ from each
parent. Body contains no child ID/signature, avoiding a commitment cycle. Identical
body/proofs gives identical retry packet/identity, never another accepted child.
Changing nonce is a distinct proposed child, subject to bounded experiment admission.

## Verification interfaces and publication

Phase26 src/reproduction.mjs `validateChild(packet,resolve)` returns
closed {organism,parents,signal}, parents being selected verified state objects.
resolve(organism) returns closed {origin,events,lineage}; lineage is null for a
root and the child's packet otherwise. Missing/private evidence returns null ->
unavailable. Resolver errors remain errors, never a successful root. This function
verifies direct contributions only; it does NOT claim complete ancestry. Closed
packets and D03 budgets apply before resolution/signature work.

Phase26 store.mjs adds publishChild(directory,packet,resolve) and
loadChild(directory,resolve). Validate packet before writing. Reuse protected-target,
marker, exclusive-link/fsync publication; write origin/marker normally, then immutable
lineage.json containing canonical complete packet. loadChild requires marker/origin/
lineage, normal replay, exact packet-origin byte equality and validateChild; it returns
{history,lineage}, history=load result and lineage=direct validation result.
Generic core load alone proves canonical history, never offspring/ancestry acceptance.
Successful publishChild returns loadChild result, not a proposed birth count.

Retry existing directory only if protected target/marker and exact origin match;
never replace an existing differing origin or lineage. Valid evolved child history
may exist; retry preserves it. If initialization is partially interrupted, missing
origin/marker remains unavailable and requires operator recovery, not silent overwrite.
If origin/marker complete but lineage absent, retry publishes identical validated
lineage. Incomplete publication is not an accepted offspring; preserve its files.
Different immutable lineage is invalid. Directory sync uncertainty reports IO;
retry verifies retained files and syncs them, never assumes success.

Phase27 src/lineage.mjs `verifyLineage(rootId,resolve)` returns
closed {root,nodes,edges}, nodes sorted organism IDs, edges sorted {child,parent,stateRef}
by child then parent. Full recursive validation: resolver origin ID equals requested
ID; child-* birth requires non-null lineage; roots require null lineage and valid
adaptation-v1 origin/history. Each child direct packet validation then traverses
parents. No generation index/formula. Reject cycles via active path, duplicate
parents by body validation, unknown rules/versions, wrong origin/ref, tampered consent
or mismatched packet. Missing/private ancestor is unavailable, never omitted.
Bound <=32 unique nodes, <=16 ancestor depth (root0), <=128 resolve calls; never
execute ancestor-supplied code. No persisted index; rebuild from retained evidence.

Independent Python verifier/lineage.py receives one JSON file closed {root,records},
records map organism IDs to resolver records, <=32 entries. It implements the
protocol independently (may reuse independent verify.py bytes/replay primitives)
and prints the same result or safe error/nonzero. Input file <=4MiB, no symlinks;
JSON wire is exact D03 canonical <=65536 bytes for this bounded fixture manifest.
No network resolution, private-key discovery or arbitrary path from ancestry.

## Evidence paths and required cases

Phase26 tools/build_reproduction_vectors.py creates new fixtures/reproduction-v1/
manifest.json plus parent/child directories once, refusing existing output. Public
RFC keys only. Two adaptation roots with distinct birth discriminators and signals
0/2, a child with inherited1, and a grandchild with inherited1. Cases include single
parent, sorted two parents, bounded four-parent contract, ordering/duplicate/refusal,
wrong parent state/key/origin, identical retry and partial/mismatched publication.
Phase27 tests/lineage.test.mjs adds independent graph equality and invalid/missing/
private/cycle/resource/version cases. No schema mandated for the manifest: it is a
bounded test transport, validated closed by code rather than a parallel core schema.

## Minimality / Complexity Justification

One shared body, one consent per contributing authority, one child origin and one
immutable sidecar are the minimum evidence for new identity plus verifiable parental
participation/inheritance. Retained domain, exact state refs, signature checks,
durability and traversal limits satisfy accepted invariants/security/experiments.
Removing them breaks provenance, authorization, retry safety or independent evidence.
Reject generic breeding APIs, canonical parent counters, reproduction event families,
generation scores, private ancestry, mutation operators and transactional coordinators.
No dependency is added. New failure modes: unavailable consent/ancestors, correlation
of public lineage, stale selected authority, partial publication, lineage spam and
resolver cycles/resource exhaustion. Bounded fixture admission limits this experiment;
it is not a universal Sybil/spam solution. Necessity is demonstrated by adversarial,
retry/failure and independent-verifier cases before claims of accepted offspring.
