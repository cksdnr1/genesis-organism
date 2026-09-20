# Experimental review schemas v0.1

STATUS: EXPERIMENTAL; JSON Schema draft 2020-12. These describe proposed
observer claims and expression attribution descriptors. They are not protocol
standards, canonical bytes, signed envelopes, or birth schemas.

| Schema | Required fields | Optional fields |
| --- | --- | --- |
| [observer](observer.schema.json) | schemaVersion, observerType, capabilities | supportedProfiles, extensions |
| [phenotype](phenotype.schema.json) | schemaVersion, sourceStateRef, negotiationRef, expressionProfile, expressionProcedureRef, outputRef, mediaType | extensions |

**Proposed decisions for review:** version is exactly `0.1-experimental`;
repository-based `$id` URLs identify this draft revision, without asserting that
they resolve on the network. Freeze would publish immutable versioned resources;
do not overwrite a frozen `$id` with incompatible semantics.
Root fields are closed to catch misspellings, with explicit namespaced extensions.
Extension keys are absolute-URI-like names; the regex is a naming restriction,
not URI validation or trust. Capability names remain open and bounded. Unknown
capabilities remain claims; a consumer cannot assume it supports them.

Capability values mean claimed true/false; absence means unknown. Observer type
is an open label, not an enum or an authorization credential. `supportedProfiles`
contains requested profile identifiers, not evidence of compatibility.
All descriptor references are nonempty bounded opaque strings, not validated
hashes, identifiers, signatures, or guaranteed-resolvable URLs. `mediaType` is
also a label pending an expression-profile policy. Limits are proposed parser
budgets, not organism semantics; total byte/depth limits remain to be defined.
Extension values here are only bounded strings for review; this is not a
canonical serialization rule or an endorsement of encoding hidden consensus
payloads in strings. No extension influences canonical state in this draft.

Deferred deliberately: `organism.schema.json`, `genome.schema.json`, and
`event.schema.json`. Their required fields depend on unresolved identity,
serialization, authority and transition decisions. Creating permissive shells
would imply unsupported validity. These schemas do not instantiate #0001.

Synthetic review example (not a real observer):

```json
{"schemaVersion":"0.1-experimental","observerType":"embodied-ai","capabilities":{"vision":true,"language":true,"spatial":true,"manipulation":true}}
```

A boolean capability is accepted; a string `"yes"` is rejected. Missing version,
unrecognized root fields, and a descriptor without a source-state reference are
rejected. A syntactically valid forged reference is not rejected by these schemas:
semantic validation, integrity and authorization require a later protocol.

Dialect source: [JSON Schema 2020-12](https://json-schema.org/draft/2020-12/json-schema-core).

## Historical status and successor work

Both JSON files above are preserved byte-for-byte as historical experimental
artifacts. Their schemaVersion and $id values retain their original meanings.
Current prose separates PhenotypeState from Observer-Negotiated Expression;
phenotype.schema.json remains the old expression descriptor, not a state schema.

[Successor design](successor-design.md) specifies typed capability requirements,
claim/attestation separation and explicit field-by-field compatibility limits.
[Machine Encounter](../spec/encounter.md) describes candidate receipt fields.
No new version, typed JSON schema or canonical receipt format is frozen here.
