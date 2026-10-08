# Phase 4 technical specification

## Scope and use case
Deliver D03's exact canonical-byte and cryptographic contract for isolated synthetic
fixtures. D02 accepted through 2026-10-08 delegation. An independent implementer
must be able to derive identical bytes and reject ambiguous inputs without guessing.
No runtime, actual genesis or new original-schema field is created in this phase.

## Current implementation / evidence / architecture
Read spec/canonicalization.md, D02 proposal plus additive acceptance, total spec and
Phase 4. Existing JSON schemas are historical 0.1-experimental descriptors, not
canonical protocol inputs. No canonicalizer exists. Git/source-index digests are
not organism IDs. Primary sources inspected: RFC 8785, RFC 8949, RFC 8032.
Proposed path: explicit byte contract -> Phase 8 vectors -> Phase 9 admission.
No callbacks, state update, alternate runtime or migration occurs here.

## Proposed direction / files
Create docs/decisions/D03-canonical-bytes.md: compare JCS and deterministic CBOR,
select a bounded integer-only JCS subset and canonical-byte-only wire boundary,
SHA-256 domain-separated commitments and Ed25519 proofs for synthetic-v1.
Pin exact domains, preimages, excluded self fields, integer/Unicode/null rules,
budgets, profile versioning and negative vector expectations. Source references
support standard behavior; project-specific restrictions are design decisions.

## Risks / acceptance / minimality
Parsing alone is insufficient: duplicate keys and noncanonical lexical forms must
be rejected through canonical byte equality plus strict Unicode/type/budget checks.
Reject unsupported types, lone surrogates, negative zero, floats and oversized input.
Independent implementations need UTF-16 key ordering, not host-default Unicode order.
Compare exact boundary cases before delegated acceptance. Actual byte vectors and
crypto execution belong to Phase 8 onward. One format and suite, no negotiation,
Merkle tree, algorithm registry or blockchain. Protect all historical files.
