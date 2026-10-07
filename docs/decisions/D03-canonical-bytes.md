# D03 — synthetic-v1 canonical bytes and commitments

STATUS: ACCEPTED FOR BOUNDED SYNTHETIC IMPLEMENTATION, 2026-10-08, under
[creator delegation](2026-10-08-synthetic-delegation.md). Not a frozen birth protocol.
D02 is accepted; D04 supplies exact body shapes. This decision selects byte/crypto
rules only. No #0001 identity, key or commitment is created.

## Source comparison

Primary texts inspected 2026-10-08: [RFC 8785](https://www.rfc-editor.org/rfc/rfc8785),
[RFC 8949](https://www.rfc-editor.org/rfc/rfc8949),
[RFC 8032](https://www.rfc-editor.org/rfc/rfc8032).
JCS supplies deterministic JSON representation and UTF-16 property ordering;
CBOR requires selecting deterministic encoding and type/tag policies. Select a
restricted JCS subset for inspectable fixtures and cross-language verification.
Do not claim support for all JCS numbers or CBOR. Ed25519 is the selected signature
algorithm; cryptographic operations use established libraries, not custom curve code.

## Exact profile and wire boundary

Profile literal: `synthetic-v1`. SHA-256 and Ed25519 are pinned by that profile;
no per-record algorithm negotiation or inferred fallback. Unsupported profile fails.
Let C(v) be RFC 8785 bytes restricted as follows (project DESIGN DECISIONS):

- Values: null, booleans, scalar-Unicode strings, arrays, objects and integers
  in [-9007199254740991, 9007199254740991]. Reject floating values, negative zero,
  NaN/infinity, non-JSON types and invalid Unicode. A schema can narrow these types.
- UTF-8, no BOM, whitespace or trailing newline. Preserve string code points;
  never normalize Unicode. Object names sorted by unsigned UTF-16 code units;
  array order retained. JSON string escaping follows JCS.
- Absent and null are distinct. No duplicate object names. No unknown fields
  where a contract declares a closed object; canonicalization alone is not shape validation.
- Canonical input byte length <= 65536; depth <= 16 with root at depth 0;
  <= 4096 total value nodes including root; each string/key <= 4096 UTF-8 bytes;
  each object/array <= 256 members. Keys do not count as value nodes.
- Wire input must already equal C(parsed input) byte for byte, after strict UTF-8
  decoding and bounded parsing. Reject duplicate names even if the host parser
  collapses them: their raw bytes cannot equal the duplicate-free reserialization.
  A parser may also reject duplicates directly. Precheck total bytes before parsing;
  parsing must not execute content and must fail safely on nesting/resource errors.

Producer-side objects undergo the same type/Unicode/budget validation. Cycles and
non-plain objects are not JSON values. Wire lexical aliases such as `1.0`, `1e0`,
`-0`, escaped ordinary letters and leading/trailing whitespace are rejected,
not repaired. A diagnostic CLI may emit readable JSON, but that is not committed wire.

## Commitments, proofs and acyclic preimages

For a contract-assigned kind k, prefix P(k) is exact ASCII
`genesis-organism/synthetic-v1/` + k + one zero byte (0x00).
H(k,v) = lowercase hex SHA-256(P(k) || C(v)).
Initial assigned kinds: `origin`, `event`, `state`. Later accepted contracts may
assign new distinct kinds using the same framing; they must not repurpose old kinds.
No arbitrary user-supplied kind enters a canonical validator.

- Origin identifier = H(origin, origin body). The body includes profile, birth
  discriminator and initial authority under D04. It excludes its own identifier
  and signature; no self-reference or resolver is required.
- Event reference = H(event, event body). The body binds organism identity,
  predecessor and order under D04. It excludes its own reference and signature.
- State commitment = H(state, exact state projection fixed by D04). No stored
  self-digest field; derived output may report this digest beside the state.
- An origin envelope contains `body` and `signature`; sign P(origin-proof) || C(body).
  An event envelope has the same two fields; sign P(event-proof) || C(body).
  These proof labels are signature domains, not interchangeable hash kinds.
- Authority key is 32 raw Ed25519 public-key bytes encoded as 64 lowercase hex
  characters. A signature is 64 bytes encoded as 128 lowercase hex characters.
  Reject alternate casing, length, encoding, unsupported keys and invalid proofs.
  Secret keys are fixture-only/test-local and never canonical organism state.
- Hashing a body does not validate its proof, authority, semantic transition,
  retention or truth. Validate those separately. Changing signature bytes alone
  does not create a new event reference or bypass duplicate admission checks.

No wall time, host path, Git commit, random live service output or runtime version
is an implicit hash input. A birth discriminator is explicit origin input, not a
hidden clock/random call. Once recorded, replay never regenerates it.

## Counterexamples and vector obligations

| Input/case | Expected result |
| --- | --- |
| Duplicate key, including identical values | Reject raw wire; never accept parser's last-wins interpretation. |
| Empty object versus object containing null | Different canonical bytes; schema decides whether either is allowed. |
| Integer limits and just outside them | Endpoints accepted by byte layer; outside rejected. |
| -0, fractions, exponent aliases, nonfinite | Reject wire; no silent numeric normalization. |
| Lone surrogate or invalid UTF-8 | Reject; no replacement character repair. |
| Composed versus decomposed Unicode strings | Both retained distinctly if otherwise permitted. |
| Supplementary-plane versus BMP object keys | Sort by UTF-16, not scalar code point order. |
| Key order, whitespace, escaped-letter alias | Reject noncanonical wire; producer C(v) gives one representation. |
| Changed kind/profile/organism | Different commitment or invalid proof/admission; no domain substitution. |
| Included identifier/signature in body | Closed D04 body rejects self fields. |
| Oversized/deep/value-heavy input | Reject at bounded boundary, no downstream mutation. |
| Unsupported version or algorithm | Reject, never fall back or reinterpret historical bytes. |

Review: all requested Phase 4 cases covered, including canonical equality's
role alongside parser/type checks. Phase 8 must supply literal independent byte
vectors and RFC signature known-answer coverage; this prose is not executable proof.
Historical schema literals and source-index hashes remain unchanged/noncanonical.

## Minimality / Complexity Justification

One inspectable format and crypto suite suffice for independent replay and proof
verification. Reject alternative formats and algorithm agility for now; retain
bounds, domains and Unicode rules because removing them introduces ambiguity,
DoS risk or cross-context proof reuse. Existing body/envelope separation avoids
parallel signed-object types and circular hashes. New failure modes: rejecting
otherwise valid general JSON, interpreter sorting mistakes and dependency crypto
bugs. Literal cross-language vectors and malformed/domain tests address them.
Profile upgrades require new explicit decisions; no automatic migration.
