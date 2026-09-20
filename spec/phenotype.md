# Phenotype State and Observer-Negotiated Expression

STATUS: RESEARCH / EXPERIMENTAL. The current interaction term is
**Observer-Negotiated Expression**. The origin draft's **Observer-Dependent
Phenotype** remains attributable historical terminology, not a renamed wire schema.

**NORMATIVE invariant retained:** expressions MUST remain attributable to their
canonical source state and MUST NOT silently redefine canonical truth.

## Conceptual separation

Genome and accepted history → Canonical State → PhenotypeState under an explicit
profile → observer negotiation → Observer-Negotiated Expression.

PhenotypeState describes traits/behavior available for expression. D07 must choose
whether it is a derived deterministic projection or an explicitly canonical
component; this diagram does not impose storage or hashing of an intermediate
object. Different observer presentations cannot become competing canonical truths.
Observer-Negotiated Expression is the permitted presentation selected using
capabilities and access policy during a [Machine Encounter](encounter.md).

## Four different claims

- Attribution binds an expression to source state, inputs and procedure.
- Reproducibility means recomputing output under a specified deterministic profile.
- Semantic validity means satisfying that profile's fidelity/meaning constraints.
- Causal experience links admitted interaction to a specified later state effect.

A signed digest establishes none of the others automatically. Two expressions
sharing a state reference can still be misleading or invalid. Recorded LLM output
bytes may be replayable input without the model itself being reproducible.

A first demonstration should use three mock observers, one source state,
profile-specific validity tests and a later expression changed by accepted
encounter experience. Use a control with that event absent. This demonstrates a
specified causal rule, not subjective appreciation or population evolution.

The existing [phenotype.schema.json](../schemas/phenotype.schema.json) remains
an unchanged historical expression descriptor, not a PhenotypeState schema or
EncounterReceipt. See [successor compatibility](../schemas/successor-design.md).
No intermediate canonical type or new receipt schema is frozen here.
