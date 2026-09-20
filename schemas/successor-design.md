# Observer and encounter successor design

STATUS: RESEARCH / EXPERIMENTAL proposal; no successor schema/version is frozen.
The existing observer.schema.json and phenotype.schema.json remain byte-identical
historical `0.1-experimental` artifacts with their existing `$id`, required fields,
boolean capability values and string extensions. They are not upgraded in place.

## Vocabulary and compatibility

| Historical term / field | Current role | Successor treatment |
| --- | --- | --- |
| Observer-Dependent Phenotype | Original name for observer-specific presentation | Current prose uses Observer-Negotiated Expression; preserve historical records |
| phenotype.schema.json | Review-only expression attribution descriptor | Not a PhenotypeState schema and not an EncounterReceipt |
| `sourceStateRef` | Old opaque state-reference label | `organismStateRef` is a receipt proposal, not a compatible rename; verify context/binding before mapping |
| `negotiationRef` | Old reference label | Not equivalent to `negotiationProtocolVersion`; successor needs both provenance and semantics |
| `expressionProfile` | Old profile reference | Preserve through explicit versioned mapping; do not collapse into procedure |
| `expressionProcedureRef` | Procedure reference in both proposals | Same spelling does not prove compatible reference/hash semantics |
| `outputRef` | Old opaque output reference | Not interchangeable with `expressionOutputDigest` without resolving and validating bytes |
| `mediaType` | Old unvalidated media label | Retain interpretation where needed; digest is not a content-type declaration |
| `capabilities` boolean map | Self-declared support only | No false precision, invented units or evidence when converting old true/false values |
| `extensions` strings | Historical bounded review extension values | No hidden canonical typed payload smuggled through strings |

## Typed capability descriptor requirements

D07/D13 must choose an explicit version/dialect/profile identifier and backward
compatibility policy before implementation. Proposed descriptor responsibilities:

- A capability kind and typed parameter schema, with declared units, bounds and
  uncertainty where applicable; preserve unknown/missing versus false.
- Vision may declare modality (e.g. RGB-D), resolution, depth/rate and spatial
  reference; manipulation may declare degrees of freedom, force feedback and
  payload limits. These are examples, not frozen enum values or robot assumptions.
- Coordinate frame identity, transforms, time/rate interpretation, numeric scale,
  calibration and reference-frame compatibility cannot be omitted by convenience.
- Separate claimed parameters, attached attestation evidence and a verifier's
  scoped evaluation. Verification policy, issuer, subject, expiry/revocation and
  challenge scope require explicit semantics; they are not a trust score.
- Capability declaration grants no event authority, data access or actuation.
  An adapter can be unable to satisfy a physically claimed capability.
- Bound payload bytes/depth, parameter counts, referenced content and negotiation
  work. Unknown kinds/parameters get explicit unsupported or preserved behavior.
- Consensus-relevant numeric values require exact units/encoding under D03; do
  not inject unconstrained floating point for FPS, force, position or confidence.

An old `vision: true` can at most map to unspecified claimed vision support.
It cannot manufacture RGB-D, resolution, evidence or a hardware identity. Whether
to reject lossy conversion or preserve it as limited support is a D07 decision.
No unconditional backwards-compatible label is attached to a typed successor.

## Receipt schema prerequisites

Use the eight candidate field names in [Machine Encounter](../spec/encounter.md)
as review vocabulary. Resolve the acyclic evidence/outcome graph, result
terminality, policy binding, retained input bytes, reference validation and
privacy before selecting required fields. Raw candidate strings do not constitute
cryptographic validity. A checksum of private low-entropy data may leak guesses;
choose a commitment/privacy construction explicitly rather than asserting secrecy.

Publish a successor at a distinct versioned ID/path only after acceptance,
together with exact mapping/rejection examples and positive/negative test vectors.
Until then, no encounter.schema.json, receipt.schema.json or observer-vNext JSON
file is created merely to make an unfinished contract look implemented.
