# Events and replay

STATUS: RESEARCH. Long-term target:

`state(N) = deterministic_replay(genesis, ordered_valid_events[0...N])`

This is a target, not executable code or evidence of determinism.
**NORMATIVE:** accepted transitions MUST preserve genesis and valid prior
history. An external claim MUST NOT be treated as verified merely because it
was recorded or anchored. Wall-clock timestamps MUST NOT be the sole ordering
mechanism.

## Proposed boundaries

Distinguish received proposals, accepted canonical events, rejected material,
and locally retained evidence. Rejection is not automatic admission into the
organism's canonical history. An allegation can be faithfully recorded as an
allegation; that does not make its content a verified experience.

Candidate envelope responsibilities include protocol/profile identification,
organism binding, predecessor or causal references, event type and version,
authorization, payload and evidence references, and commitments. These are
requirements to resolve, not a chosen wire format. A single-writer ordered log
and a multi-authority causal graph have different assumptions; neither is
silently selected.

Before implementation define duplicate/replay protection, event acceptance,
concurrent histories, gaps, stale writers, finality, and retraction/correction
semantics. Correcting a false claim should preserve the original record rather
than retroactively deleting accepted history. Validity is relative to pinned
rules and authority, not a UI's preferred head.

Replay needs deterministic transitions and all required inputs. External model
outputs, sensors and random values cannot be re-fetched as though stable. Decide
whether to record bounded inputs as claims or verify them under an explicit
attestation model; pin dependencies and deterministic randomness if permitted.
No LLM output is canonical consensus by default.

Snapshots need an authenticated link to a validated history. Pruning must not
masquerade as full replay; a valid older prefix does not prove that no newer
events exist. Retention, checkpoints and recovery remain unresolved.

## Encounter evidence and non-deterministic producers

[Machine Encounter](encounter.md) is the primary experience source under study.
Its receipt/evidence is not admission authority. D13 must specify an acyclic
evidence→event→outcome graph; resultingEventRefs cannot create reciprocal digest
dependencies. Missing, pending and resolved-no-event outcomes need distinct
semantics; none is silently treated as accepted experience.

LLM output bytes may be proposed externally and admitted under deterministic
rules. Replay consumes retained bytes or available integrity-checked content,
never regenerates a model answer. A digest is an integrity check, not a substitute
for the input required by a reducer. Access/retention follow D05; unavailable
content blocks the applicable replay claim. Bound evidence size and archive
costs before scale; checkpoint/Merkle choices remain explicit design decisions.
