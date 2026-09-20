# Perception Handshake

STATUS: EXPERIMENTAL v0.1. **DESIGN DECISION — proposed:** negotiate capabilities
rather than hard-code an expression from an observer class name. A type label is
self-description, not authentication, permission or evidence of intelligence.

Proposed exchange:

1. Observer submits a bounded capability description and supported profiles.
2. Organism evaluates available expressions, consent and access policy against
   a specified canonical state.
3. Negotiation returns an explicit selected profile or unsupported result.
4. An expression receipt identifies its source state, profile, producer procedure
   and output; see [phenotype](phenotype.md).

Step ordering is a review aid. No transport, authority or selection algorithm
is defined. Unknown capabilities need an explicit unsupported/ignored policy;
do not silently claim to satisfy them. Missing capability claims are unknown,
not false. Raw canonical data is a possible fallback only where disclosure is
permitted; private memories are not an automatic fallback for unknown machines.

Exploratory mappings: humans may use visual/sound/narrative expression; language
agents semantic structures; vision systems geometry; robots spatial or motion
representations. These examples neither limit observer classes nor establish
what an observer values. A motion expression is not permission to actuate a body.

The [observer schema](../schemas/observer.schema.json) describes claims only.
Human, LLM and embodied mock observers are Phase 2 fixtures, not real identities.
Selection determinism requires an explicit versioned rule and pinned available
profiles. Reading/negotiating is not automatically a life event; decide separately
which interactions can produce authorized canonical events.

**OPEN QUESTIONS:** capability vocabulary/versioning, accessibility, negotiation
privacy, resource limits, profile authenticity, consent and validity evidence.
