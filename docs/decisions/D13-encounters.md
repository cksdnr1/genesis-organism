# D13 — synthetic encounter evidence and experience admission

STATUS: ACCEPTED for bounded synthetic implementation, 2026-10-08, under
[delegation](2026-10-08-synthetic-delegation.md). Requires accepted D02–D07.
No real encounter/birth; memory/synapse consequences remain D08/Phase 19 onward.

## Immutable evidence and references

Evidence is closed `{version,nonce,sourceState,observer,policy,expression,interaction}`.
version=`evidence-v1`; nonce matches `[a-z0-9-]{1,128}` and is supplied explicitly
per genuine visit. sourceState is an exact verified historical D04 state projection;
observer/policy are exact D07 objects; expression is exact D07 `{selection,output}`.
interaction is closed `{motif,message}`: motif integer 0..3, message scalar string
0..256 UTF-8 bytes. All bytes are retained public synthetic fixture input under D05;
no external content URL, encrypted field or omitted message is accepted. An adapter
may capture model-produced text as message; it is recorded input, never regenerated
or treated as deterministic model behavior/truth.

D03 assigns H kinds `encounter` (whole evidence) and `interaction` (interaction).
encounterId=H(encounter,evidence). Evidence contains no encounter/event/receipt
self-reference or resulting event refs. D07 input/output/observer/policy hashes
are computed from the actual retained objects. No ambiguous naked string refs.

## Explicit successor rules and admission

New synthetic origins may pin `rules:"encounter-v1"`; all other D04 origin fields,
proofs, bounds and initial-state rules remain. State has exactly D04 members with
that rules literal. Existing `core-v1` origins never admit experience-v1.
Signal/rotation retain their old semantics in this profile. Additional event kind
`experience-v1` uses the same D04 body/envelope, data closed `{evidence}`. It only
advances canonical sequence/head; no implicit learned trait/counter/affinity state.
Valid ordered experience bytes become the basis of later explicit D08 projections.

Admission retains D04 shape, organism, historical parent, sequence and historical
authority proof checks FIRST. An experience then requires:
1. Parent belongs to encounter-v1, evidence is D03-bounded and closed.
2. sourceState exactly equals one verified state in the candidate parent's history
   (not a later state); it has the same organism. No externally supplied cache.
3. D07 negotiation recomputes selected under retained observer/policy and D07
   output fidelity verifies. Denied/unsupported/read-only observations are not
   canonical experience. message bytes are present; missing data is not filled.
4. Stable idempotency key is the tuple `(organism,observer.subject,nonce)`. Compare
   against experience events in verified history. Same key/evidence -> duplicate
   with the ORIGINAL accepted event reference, including valid rebased retries.
   Same key but changed evidence -> rejected/invalid, no new experience. Different
   nonce with identical interaction is a separate visit, subject to authority/order.
5. Otherwise D04 duplicate/signed-sibling/current-head rules apply. A valid divergent
   successor preserves conflict evidence and holds, never overwrites history.

Even a duplicate-looking candidate needs a valid historical authority proof. Event
ID alone is insufficient for encounter idempotency. Nonce/subject are not proof of
physical observer uniqueness. At-most-once canonical effect does not promise
exactly-once network delivery. Restart derives deduplication from retained history.
Two genuinely different concurrent successors may yield a signed fork/hold; this
is explicit safety behavior, not guaranteed distributed progress.

## Policy binding and evolution of policy

Retain the full historical public-synthetic policy and selection; H(policy,policy)
binds its bytes and the expression input binds all decision inputs. At admission,
the authorized event signature accepts THAT historical context. There is no mutable
latest-policy pointer in this profile. A later caller policy affects a later
negotiation only; it cannot change earlier disclosure semantics or invalidate
earlier accepted evidence retroactively. Access outside public-synthetic is denied.
Commitment integrity is not evidence of correct enforcement or real consent.
Different admission-time revocation models need an accepted successor; no silent
current-policy default or real private data handling is introduced here.

## Receipt / outcome view

`receipt(origin,events,evidence,{resolution?})` verifies complete origin/history
before producing a view. resolution is `pending` by default, or `refused` for a
locally resolved non-admission. Caller cannot mark arbitrary event refs accepted.
If an accepted experience matches the encounter, status is `accepted`, refs are
the actual verified matching event; otherwise status is pending/refused as supplied.
Pending resultingEventRefs=null; refused=[]; accepted=[verified event reference].
Local refusal is a display decision, not a canonical event or immutable finality
promise; later valid admission yields a newly derived accepted view without editing
earlier evidence. No receipt signature grants authority.

View includes exact original candidate names:
organismStateRef=H(state,sourceState), observerProfileCommitment=H(observer,observer),
negotiationProtocolVersion=`negotiation-v1`, expressionProcedureRef=`expression-v1`,
expressionInputCommitment from D07 exact input, expressionOutputDigest from D07,
interactionDigest=H(interaction,interaction), resultingEventRefs as above.
Additional view fields encounterId, accessPolicyCommitment and status bind the two
open questions explicitly. They are derived output, not duplicate stored canonical
fields. Binding graph is evidence -> event body -> accepted ref -> receipt view;
no event hashes a receipt containing itself.

## Exact Phase 18 paths and APIs

src/encounter.mjs: `validateEvidence(evidence,states)`, depending on
expression/perception/bytes. Admission uses this pure helper without a reverse
replay import. src/receipt.mjs: `receipt(origin,events,evidence,options)`, depending
on replay and the evidence helper; this fixed separation avoids a dependency cycle.
Extend admission/replay only for the explicit encounter-v1 rule/kind above; store
reuses exact durable append/retry/conflict behavior. No extra database or writer.
schemas/synthetic/encounter-v1/{evidence,event,origin,state}.schema.json and
tests/encounter.test.mjs; public synthetic fixtures in fixtures/encounter-v1/.
Extend independent verifier under the same explicit rule to preserve conformance.

## Verification and Minimality / Complexity Justification

Required tests: timeout/restart/concurrent duplicate; valid rebased retry returns
original ref; changed evidence under same tuple rejects; new nonce stays distinct;
signed sibling holds; wrong source/profile/policy/output/message/proof rejects;
missing input never regenerates a model; forged receipt refs cannot be supplied;
pending/refused/accepted remain distinguishable; old core-v1 never gains effects.

Minimum: nonce-scoped evidence in the existing authorized append path and a derived
receipt. Alternatives rejected: event-reference-only idempotency, content-only
identity (collapses visits), mutable policy URLs, stored receipt rewrites, parallel
authority/signature schemes and network exactly-once services. Retain public bytes,
historical policy, nonce and proof to preserve causal attribution and security.
New risks: subject/nonce claims, public-message privacy, valid-signer false claims,
finite history budgets and fork liveness loss. Scope to public synthetic fixtures;
no sensor truth, AI preference, private confidentiality or meaningful memory effect
claimed until its separately accepted D08 demonstration. Finite experiments do
not establish open-ended evolution.
