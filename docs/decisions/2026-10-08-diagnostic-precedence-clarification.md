# D04/D06 supplement — compound origin/event diagnostics

STATUS: ACCEPTED for bounded public synthetic correction after independent spec/plan review.
Date: 2026-10-08. Supplements [D04](D04-events.md)/[D06](D06-implementation.md),
under [bounded synthetic delegation](2026-10-08-synthetic-delegation.md) and current
creator instruction “머지하고 착수해” following the independent audit. No new
D-number, protocol profile or birth authorization. Original D04/D06 and historical
failed vectors remain unchanged. This record does not pretend its exact tie-breaks
were specified by the old high-level admission stages.

## Problem, alternatives and selected rule

Both independent implementations reject compounds, but wrong organism + unknown
kind and unknown profile + malformed signature encoding return different diagnostic
classes. Phase13/D06 requires comparison of rejection classes. Matching accepted
state and proof semantics alone cannot close this diagnostic gap.

Select structural envelope → profile dispatch → selected structure → history/
authority semantics. Format-valid proof is distinct from cryptographically valid
proof. Reasons independent of either implementation: malformed proof encoding
cannot form this profile's well-formed envelope; unknown supported vocabulary is an
interpreter capability fact, independent of organism; historical authorization
must precede effect/duplicate success. Node's existing ordering happens to match
this refinement; Node implementation behavior is not the source of authority.

Rejected alternatives: context-first could hide unsupported vocabulary based on
organism-specific facts; permitted multi-class sets would weaken reproducibility;
global invalid flattening loses stable unsupported/access/resource diagnostics.
None changes which successful canonical histories are accepted.

## Exact bounded precedence

This supplement governs origin/event admission, not every independent optional
adapter, standalone negotiation or filesystem error. Existing history/conflict/
availability and raw-wire budget/canonical boundaries remain in their existing
entry-point order. Internal classify still requires a verified nonempty context;
it does not accept arbitrary supplied state caches.

For each candidate envelope after those boundaries:

1. Validate canonical JSON; exact envelope `{body,signature}`; signature encoding
   is exactly128 lowercase hex characters. Failure is invalid (or the existing
   resource class). This encoding check is structural, not proof verification.
2. Validate exact common body members, then supported profile/rules. A structurally
   well-formed unsupported profile/rules is unsupported. No unknown version is
   interpreted under a known fallback.
3. Validate selected profile's structure/domains in existing order. Origin checks
   birth, creator, genome shape/signal and authority encoding before initial proof.
   Same-invalid-class structural predicates need not share detailed-reason precedence;
   the version/kind/context boundaries that change classes are fixed.
   Event checks organism/previous encoding, bounded sequence, supported kind and
   kind-selected data shape/domain. Unknown kind is unsupported before context
   organism/parent lookup. `experience-v1` data is closed `{evidence}` here; its
   evidence validation remains later after historical authority.
4. For events check organism equality, historical parent, sequence relation,
   historical authority proof, non-noop rotation/rules and experience semantics;
   only then perform duplicate/conflict/current-head classification. Retain D13
   encounter identity/rebased retry and adaptation restrictions exactly.

This only closes the stated outer envelope/domain/context ordering. It does not
standardize every detailed error message or newly reorder unrelated nested
predicates. D13 PM-01 expression-fidelity mapping still converts submitted
observer/policy/expression failures to invalid; unknown evidence version remains
unsupported. Standalone negotiation retains unsupported/unauthorized. Proof-before-
duplicate remains mandatory even for a same-reference or same-encounter retry.

| Compound | Required class |
| --- | --- |
| Well-encoded signed event, wrong organism + unknown kind | unsupported |
| Unknown event profile + malformed signature encoding | invalid |
| Wrong organism + unknown kind + malformed signature encoding | invalid |
| Unknown origin profile/rules + malformed signature encoding | invalid |
| Supported kind, well-formed envelope, wrong organism | invalid |

## Verification and compatibility

Test literal class expectations independently of both validators, supported
library and actual CLI surfaces, exit/no-success and no-write snapshots; retain
valid original bytes, prefixes/state/commitments, proof-first duplicates and exact
PM-01 corpus/standalone contexts. Extend independent reviewer compounds, not just
matching one implementation to the other. Add this supplement to current ceremony
artifact selection; historical manifests remain unchanged.

Only multiply-invalid diagnostic precedence is refined. No accepted wire bytes,
proof/hash domains, reducer/state semantics, identity, access, retention or historical
profile interpretation changes. No new field or signature algorithm. Actual
GENESIS #0001 remains UNBORN. Finite cases do not establish universal conformance.

## Minimality / Complexity Justification

One attributable clarification plus independent ordering changes and focused
vectors closes a demonstrated Phase13 obligation. Shared validators/frameworks,
a new schema/profile or generalized error engine add no necessary property.
Retain original decision text and failed evidence, D13 contextual diagnostics,
independent code and proof-first safety. Risk: accidentally broadening the exception
mapping or moving proof behind duplicate; explicit retained cases/no-write tests
and independent source review constrain it. Rollback preserves prior evidence and
all successful canonical history semantics.

## Review and acceptance evidence

Independent reviewer design_challenger approved the specification and plan97/100
with no blockers; actual records are
`docs/features/genesis_organism_compound_diagnostic_precedence/validation.md` and
`plan-validation.md`. Source owner recorded both supported PlaySpec approval gates
before accepting this supplement or changing validator code. Same-class reason-order
watchpoint CPV01 was resolved explicitly. This acceptance is bounded delegated technical judgment, not external
human certification, actual birth acceptance or new PR merge permission.
