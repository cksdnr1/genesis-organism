# Observer-dependent phenotype

STATUS: RESEARCH / EXPERIMENTAL. **NORMATIVE:** observer-specific expressions
MUST remain attributable to the same canonical source state they claim to
express. An expression MUST NOT silently redefine canonical truth.

## Three different claims

- **Attribution:** a receipt identifies a state, expression procedure and output.
- **Reproducibility:** a verifier can recompute output under pinned rules and inputs.
- **Semantic validity:** output is an allowed, faithful expression under a specified profile.

A signed receipt or matching hash can support attribution without proving the
other two. Shared source-state references do not prove that two phenotypes are
semantically valid expressions of one organism. That is a central open question.

**DESIGN DECISION — proposed:** explore a deterministic expression profile first.
Pin the state commitment, negotiation/profile version, procedure/dependencies,
request inputs and output commitment. Validate two different observer expressions
against one fixture state, and reject output or state-reference substitutions.
Non-deterministic artistic renderings, if later supported, need separate evidence
and cannot claim bitwise reproducibility by implication.

The [experimental descriptor](../schemas/phenotype.schema.json) makes attribution
fields reviewable; it contains reference strings, not cryptographic proofs.
Reference resolution and commitment validation are deliberately not defined.
Canonical memory and private data are not necessarily exposed through expression.
An output digest can bind a harmful or misleading output just as well as a valid
one; validity needs a profile-specific criterion.
