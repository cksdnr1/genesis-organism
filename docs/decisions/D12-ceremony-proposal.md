# D12 — Synthetic ceremony contract proposal

STATUS: PROPOSED / CREATOR ACCEPTANCE REQUIRED, 2026-10-08.
Documentation prepared ahead of Phase34 entry; not an accepted D12 ceremony,
executed Phase34, freeze, release or birth. Current anchoring SKIP is already
[accepted](2026-10-08-anchoring-skip-acceptance.md) and is not reopened here.

## Purpose and authority boundary

DESIGN PROPOSAL: accept the following bounded contract for Phases34–38 synthetic
rehearsals only, after D01 tested-profile rights acceptance. The creator accepts
the procedure; an explicitly pinned public fixture key represents ceremony
authority in tests. It never represents the real creator or GENESIS #0001.
No actual ceremony authority/key, final genome, release or birth is assigned.

Freeze, publication and birth acceptance are distinct test steps. They are
test evidence outside canonical organism events, not new runtime event types.
Actual freeze/release/birth would need independently scoped authorization,
real key attribution, the original complete birth audit and operational recovery
evidence. Synthetic success alone supplies none of those permissions.

## Smallest proposed mechanism

Use one offline rehearsal tool, one independent Python checker and fixtures/tests.
Reuse accepted restricted canonical bytes, SHA-256 and Ed25519 primitives. Do not
introduce a ceremony service, registry, capability ontology or distributed system.
Implementation remains deferred until the existing phase gates admit it.

The accepted Phase34 record must pin the exact fixture public key, grammar,
limits and artifact selection before implementation; creator acceptance of this
proposal permits those bounded mechanical choices, not expanding its authority.
Suggested implementation paths: `tools/rehearsal.mjs`,
`verifier/rehearsal.py`, `tests/rehearsal.test.mjs`, and public fixture/report
directories scoped to the existing phases. No optional adapter enters the core.

### Candidate and freeze evidence

Select explicit tracked paths at a full immutable Git revision. The manifest
contains a synthetic purpose/profile label, source revision, synthetic candidate
label, anchoring=`skip`, and sorted unique `{path, sha256}` entries over exact
raw artifact bytes. Include governing specification, accepted decision records,
applicable licences/notices, schemas, vectors, implementation/independent verifier
and evidence needed to reproduce the selected tests. No wildcard worktree capture,
self-referential manifest, untracked secret, real organism data or implicit latest
dependency. Version and dependency requirements are retained with the artifacts.

Manifest paths must be relative, normalized, unique and free of traversal/symlinks;
required unavailable blobs fail closed. Limit to256 artifacts,32MiB aggregate raw
bytes and existing canonical parser budgets for the small manifest/records.
These are bounded rehearsal implementation limits, not organism consensus fields.
If required evidence cannot fit, stop for a justified contract revision rather than
silently omit it. The archive must retain selected raw bytes, not only hashes.

Use a distinct `genesis-organism/rehearsal-v1/` signature/hash namespace with
separate `manifest`, `freeze`, `release`, `birth` domains and canonical bodies.
Exact domain separator bytes and closed record shapes belong in Phase34 vectors;
they must not alter the D03 organism domain allowlist. Signed freeze evidence
binds the manifest digest and pinned fixture authority. A candidate digest or
signature alone is neither a release nor a real birth.

### Release/archive evidence

The release rehearsal binds the accepted freeze record and manifest and records
successful restoration from two separately written local archive directories.
Both are owned by the same test operator: this tests copying/recovery, not
independent witnessing, geographic redundancy or decades of retention. No network
publication, Git tag/release, external message, blockchain or licence grant occurs.
Missing, partial or mismatched archives prohibit successful acceptance.

Archive verification uses retained raw bytes and pinned signatures without a
network, model service or execution of untrusted archived code. The independent
checker cannot invoke the JS implementation. Exact available dependency versions
and offline restoration limits are reported; an unavailable dependency is a
failure, not assumed reproducibility. Local timestamps are descriptive only and
cannot affect commitments, event order or apparent external chronology.

### Birth acceptance/retry evidence

The synthetic birth request binds the verified release/freeze/manifest references
and exactly one existing, explicitly synthetic origin commitment. Validate the
original origin/signature/replay constraints using existing code and independently
check them. A signed request without complete prerequisite evidence is rejected.
Do not introduce an ALIVE field or change any GENESIS #0001 record.

Record accepted synthetic requests in a bounded local append-only test journal.
An identical authorized retry is a duplicate with the same acceptance reference;
it creates no second accepted origin. Conflicting reuse of a candidate/origin
binding fails closed and retains conflicting evidence. Unknown authority and
modified payloads never pass. Journal uniqueness is scoped to this local test,
not a claim of global uniqueness across disconnected replicas.

At every write boundary rehearse interruption and retry. Publish complete files
without overwriting existing evidence; partial artifacts remain identifiable and
cannot count as success. Supersession explicitly references an earlier failed
candidate and preserves its evidence. It cannot erase or replace an accepted
origin. Use the existing filesystem techniques where sufficient; no new storage
framework. Exact journal/record bytes and crash expectations are fixed in Phase34.

## Audit and phase gates

Phase34: after D01 activation, complete its own mono-spec, record the accepted
D12 contract and exact vectors/authority; compare unauthorized signer, absent
archive, partial release, skip, retry and contradictory-candidate cases. Do not
present this preliminary proposal as the already executed phase.

Phase35: map **every** original `spec/GENESIS.md` gate and the Phase22 causal
encounter controls to exact artifact revisions, tests and unsupported claims.
Distinguish tested synthetic semantics from actual #0001 readiness. Unsupported
requirements fail the relevant audit: no synthetic label waives a gate.
Do not recommend an actual freeze while real creator attribution, candidate,
operational archives or other birth evidence remains missing. Later rehearsals
may proceed only if the full tested-profile contract and its evidence pass;
otherwise stop and retain a no-go report. Do not lower the birth checklist.

Phase36: freeze rehearsal; independent manifest/signature reproduction, tampered
bytes, unavailable dependency, missing key attribution, repeat and explicit
failed-candidate supersession tests. No actual tag/signature/release action.

Phase37: archive rehearsal; offline restore, signer/key checks, missing/partial
archive, altered local timestamp and anchoring-skip tests. Report local-only
retention limits, not invented independent publication or durability.

Phase38: acceptance rehearsal; independent synthetic origin replay, duplicate,
unauthorized request, missing release, conflicting candidate and interruption
tests. Finishing the task cannot cause actual birth or autonomous launch.

No Darwinian or open-ended evolution claim is added. Existing D14 bounded results
retain their scope. No new D-number, phase, runtime schema or canonical event is
introduced by this proposal. GENESIS #0001 remains **UNBORN** throughout.

## Minimality / Complexity Justification

Minimum considered: unsigned checksums and a copied directory. Insufficient for
accepted signer attribution, ordered ceremony evidence and retry/conflict tests.
Retain one manifest and three narrowly separated signed evidence steps because
the existing roadmap explicitly distinguishes freeze, release and birth.
Reuse canonical/signature tooling; reject ceremony frameworks, witness networks,
blockchain, real identity keys, lifecycle machinery and speculative archive APIs.
Removal test preserves raw bytes, negative tests, independent checks and historical
evidence. New failure modes: path escape, ambiguous domain/record shapes, stale
archives, crash duplication and mistaken attribution. Fixed grammar/limits,
exact references and independent adversarial tests must demonstrate the retained
mechanisms' necessity. A digest is not availability, a fixture key is not creator
identity, and two local archives are not independent witnesses.

## Requested decision

Accept this bounded **synthetic-only** ceremony proposal and delegate its exact
mechanical record/vector choices within Phase34, or identify changes. Acceptance
does not close D01 or waive Phase35, and does not authorize an actual ceremony.
