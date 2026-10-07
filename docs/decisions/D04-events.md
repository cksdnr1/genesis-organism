# D04 — core-v1 origin, event and state contract

STATUS: ACCEPTED for bounded synthetic work, 2026-10-08, under
[delegation](2026-10-08-synthetic-delegation.md). D02/D03 govern identity/bytes.
No real birth; this deliberately small core is not the Phase 22 encounter milestone.

## Exact closed shapes

All objects below are closed: listed members required, other members rejected.
Order in this prose is not serialization order; D03 sorts names. Integers exclude
booleans, floats and negative zero. All references are 64 lowercase hex characters.
All keys are raw Ed25519 public keys in the D03 encoding; signatures use D03 encoding.

Origin envelope: `{body, signature}`. Origin body:
`{profile, rules, birth, creator, authority, genome}`.
- profile = `synthetic-v1`; rules = `core-v1`.
- birth is 1–128 characters matching `[a-z0-9-]+`, explicit fixture discriminator.
- creator is a nonempty Unicode attribution claim of <=256 UTF-8 bytes, not identity proof.
- authority is the initial public key. genome is `{signal}` with integer 0..255.
- Initial authority verifies origin-proof over this body. Origin ID is H(origin,body).
  No ID or signature is part of the body. A schema-valid unproven origin is invalid.

Event envelope: `{body, signature}`. Event body:
`{profile, organism, sequence, previous, kind, data}`.
- profile = `synthetic-v1`; organism is this origin's ID.
- sequence is integer 1..1000000; previous is the prior accepted event reference,
  or origin ID for sequence 1. Events have no wall-clock ordering field.
- kind = `signal-v1`, data = `{value}` with integer 0..255; or
  kind = `rotate-v1`, data = `{authority}` with a new public key unequal to current key.
- Historical current authority at the referenced parent verifies event-proof.
  Reference = H(event,body); proof is required but excluded from reference preimage.

State projection: `{profile, rules, organism, authority, sequence, head, signal}`.
Initially: profile/rules/authority/signal from origin, organism=head=origin ID,
sequence=0. Apply signal-v1 by replacing signal; apply rotate-v1 by replacing
authority. Both advance sequence/head to the event's sequence/reference. No other
state members or hidden effects. State digest H(state,projection) is reported
beside state, not inside it. Genesis body/genome remain unchanged.

## Admission order and outcomes

Names below are diagnostic outcomes, not extra wire fields. Parsing/canonicality,
closed shape and profile checks precede cryptographic/semantic admission. No
failure appends a canonical event. Candidate evaluation never mutates its inputs.

1. Validate origin/current accepted history independently; refuse corrupt or
   unavailable history before considering a candidate. An observed-conflict hold
   forbids new canonical append or successful full-history claim.
2. Check candidate shape/profile/organism and locate its previous reference in
   verified historical states. Missing parent -> `rejected` (`unknown-parent`).
3. Check sequence=parent.sequence+1 and proof under parent's authority, then kind
   semantics including non-noop rotation. Invalid -> `rejected`, explicit reason.
4. If the event reference already occurs with a verified proof in accepted history,
   return `duplicate` with no change (only after candidate proof validation).
5. If a semantically valid new event extends a known non-current parent, return
   `conflict`; retain evidence outside canonical history and hold further admission.
   This includes an equivocation concurrent with a legitimate earlier key rotation.
6. If it extends current head with next sequence, return `accepted`; caller may
   durably append before claiming success. Reducer applies only this validated event.

A same-reference candidate with an invalid signature is not an idempotent success.
A valid old-prefix history alone is not proof of latest head. Retained expected
heads support truncation detection only within their stated trust scope.

## Truth table and recovery

| Case | Outcome / canonical effect |
| --- | --- |
| Valid next signal-v1 or rotate-v1 | accepted; exact transition above |
| Exact verified retry | duplicate; same head/state, no second application |
| Bad signature including duplicate-looking body | rejected; unchanged |
| Wrong organism/profile, extra field, malformed type | rejected; unchanged |
| Unknown kind/rules/profile | rejected/unsupported; no fallback |
| Known parent but wrong next sequence | rejected; unchanged |
| Unknown predecessor | rejected/unknown-parent; no guessed history |
| Valid different signed sibling of accepted event | conflict; preserve accepted history and quarantine evidence; hold |
| Old key signs after rotation at current parent | rejected; historical parent still uses its own key for old-event verification |
| Identical old signal value with a new valid next event | accepted; a new ordered proposal, not a duplicate or meaningful encounter claim |
| Interruption before durable append | no success; retry via exact body/proof |
| Durable append then lost response | replay then duplicate on retry |
| Partial/corrupt log or known conflict evidence | no successful replay/admission; explicit error/hold |

No history editing for correction. A later authorized signal-v1 can set a different
value, preserving the earlier event; no fabricated experience is inferred. Counter-
or digest-only differences are insufficient for later encounter acceptance.

## Extension boundary and input closure

D03 byte suite and transition rules are separate: origin pins rules `core-v1`.
A later D07/D08/D13 accepted rules profile may define encounter semantics and a
state projection, using newly labelled synthetic origin fixtures. Old core-v1
origins/events never gain hidden new effects. Unknown rules/kinds fail closed;
no in-place migration is selected. A new interpretation requires explicit accepted
compatibility rules, not a changed reducer called the same version.

All transition inputs are in origin plus ordered accepted event bodies and proofs.
No environment/model call, wall time, random source, mutable URL or implicit policy
enters replay. External evidence becomes usable only under later accepted contracts.

## Minimality / Complexity Justification and review

Two event kinds suffice to test deterministic state change and D02 authority
continuity. A hierarchy, generic patch operation, executable genome, correction
subsystem or arbitrary experience type is unnecessary. Retain historical parent
lookup to distinguish equivocation from invalid proposals; removing it hides forks.
Key rotation keeps origin stable without a recovery backdoor. New risks: authorized
writer equivocation, loss of only key, parser/sequence mismatch and unbounded history.
D05 bounds retained inputs; negative vectors and independent replay test the contract.

Review: thirteen truth-table cases cover Phase 5 required failures; signature and
semantic checks precede duplicate/conflict classification; no invented fields in
historical schemas. Accepted decision is not a claim these cases have executed.
