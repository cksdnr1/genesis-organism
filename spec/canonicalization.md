# Canonical representation: decision pending

STATUS: RESEARCH. No serialization, hash algorithm, signature suite, commitment
layout, or identifier derivation is frozen. Parsing JSON or sorting keys with a
convenient library is not a defined canonicalization profile.

| Candidate | Relevant properties | Decisions still required |
| --- | --- | --- |
| [JCS / RFC 8785](https://www.rfc-editor.org/rfc/rfc8785) | JSON representation with specified primitive serialization and key ordering | Numeric bounds, Unicode handling, rejection of duplicate keys, schema/domain constraints |
| [CBOR / RFC 8949](https://www.rfc-editor.org/rfc/rfc8949) | Binary representation with deterministic encoding requirements | Exact deterministic profile, allowed tags/types, map keys, number representation |

JCS uses ECMAScript-compatible number serialization; choosing JSON alone does
not solve cross-language number behavior. CBOR permits multiple representations
outside a selected deterministic profile. Neither format chooses a history head
or validates a signature's authority.

## Proposed comparison and acceptance work

Evaluate fixtures containing non-ASCII keys, invalid Unicode, duplicate keys,
null versus absent fields, integer limits, negative zero, number alternatives,
and unknown extensions. Avoid floating-point consensus fields unless an exact
normalization and arithmetic model is specified. Choose whether large values
use bounded integers or a defined string encoding; no default is chosen here.

Define exact signed/hashed bytes and domain separation for genesis, events,
state, and expression artifacts; exclude or structure self-referential digest
and signature fields explicitly. Decide algorithm identification and upgrade
behavior without rewriting old commitments.

Compare a hash chain, Merkle structures and content-addressed objects against
ordering, inclusion proofs, audit cost, availability and fork handling. A hash
chain alone cannot prevent deletion or prove freshness to an isolated observer.
Require independently retained heads or another specified witnessing model if
truncation detection is claimed. Content addressing does not ensure retention.

Schema validation is separate from canonicalization, signature verification,
authorization, and semantic validity. Publish byte-for-byte vectors before a
canonical schema or real organism identity is frozen.
