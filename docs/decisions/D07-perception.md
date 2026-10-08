# D07 — minimal synthetic observer negotiation and expression

STATUS: ACCEPTED for bounded synthetic implementation, 2026-10-08, under
[delegation](2026-10-08-synthetic-delegation.md). D03–D06 remain authoritative.
No organism birth, physical capability attestation or universal ontology.

## Exact versioned contracts

PhenotypeState is a derived view of verified canonical `signal` (integer 0..255),
not stored canonical state. Input state is obtained from verified replay, not an
untrusted state cache. Core-v1 and later explicitly accepted encounter-v1 sources
can use these procedures without reinterpreting their history.

Observer is closed `{version,observerType,subject,capabilities}`:
- version = `observer-v1`; observerType is informational scalar string 1..128 UTF-8
  bytes; subject matches `[a-z0-9-]{1,64}` and is a fixture relationship label,
  not an authenticated person/machine identity or Sybil defense.
- capabilities is closed with optional `text`, `symbols`, `spatial`; missing means
  unknown, false means claimed unsupported. Text/symbols descriptor is closed
  `{supported,evidence}`: supported boolean, evidence exactly `claimed`.
- Spatial descriptor is closed `{supported,evidence,frame,unit}` with same claim
  fields, frame=`fixture-plane-v1`, unit=`mm`. These are bounded simulated integer
  coordinates, never a robot's actual physical limits. Other units/frames or
  evidence classifications are unsupported, not converted or attested.

Policy is closed `{version,allow,disclosure}`: version=`policy-v1`, allow is a
unique array of zero to three known profile literals, disclosure=`public-synthetic`.
Policy order is irrelevant to selection but exact canonical policy bytes remain
bound to evidence. Private/encrypted disclosure requests are unauthorized; no raw
memory fallback. The event authority separately decides admission and accepts
the historical policy context; no caller label grants canonical authority.

Negotiation priority is fixed `text-v1`, `symbols-v1`, `path-v1`, associated with
claimed text/symbols/spatial support respectively, independent of observerType.
Choose first supported AND permitted. If none supported -> `{status:"unsupported"}`;
if supported but none permitted -> `{status:"denied"}`. Selected result is closed
`{status:"selected",selection:{version,sourceStateRef,observerProfileCommitment,
accessPolicyCommitment,profile,procedure}}`, version=`negotiation-v1`,
procedure=`expression-v1`, references defined below. Validate input even if denial
would otherwise occur. No token expiry or session persistence in this local pure
profile; clearing a local selection does not alter organism history.

## Faithful expression and attribution

For verified source signal n, expression-v1 returns exactly:
- text-v1: `{kind:"text-v1",signal:n,text:"signal:"+decimal(n)}`.
- symbols-v1: `{kind:"symbols-v1",signal:n,symbols:[n,255-n]}`.
- path-v1: `{kind:"path-v1",signal:n,frame:"fixture-plane-v1",unit:"mm",
  points:[[0,0],[n,0]]}`. Simulated coordinate path only, no actuation permission.

All objects closed. Fidelity requires these exact relations, not merely matching
a digest; a signed output with wrong text/complement/point is invalid. The output
must be selected by recomputing negotiation from the same state, observer and
policy; substitution of any input invalidates attribution. Expressions may differ
legitimately while sharing the same source-state commitment.

D03 H retains the framing and assigns additional hash kinds `observer`, `policy`,
`expression-input`, `expression-output` for these accepted responsibilities.
sourceStateRef=H(state,state), observerProfileCommitment=H(observer,observer),
accessPolicyCommitment=H(policy,policy). Expression input is closed
`{state,observer,policy,selection}` with exact selected selection;
expressionInputCommitment=H(expression-input,input);
expressionOutputDigest=H(expression-output,output). No own digest in its preimage.
Retain exact bytes where needed; digest alone does not recover unavailable data.

## Compatibility, boundaries and paths

Historical `0.1-experimental` observer/phenotype JSON and IDs remain byte-identical.
The successor rejects legacy objects rather than claiming a lossless conversion.
`vision:true` does not imply text/symbols/spatial/frame/evidence. Opaque historical
outputRef is not an output digest; no hidden extension payload is accepted.
Claimed attestation, expired evidence and unsupported descriptor fields all reject
as unsupported/invalid. No issuer verification or hardware truth is implemented.

Phase 16 paths: src/perception.mjs (`validateObserver`, `validatePolicy`, `negotiate`),
schemas/synthetic/encounter-v1/{observer,policy}.schema.json and tests/perception.test.mjs.
Phase 17: src/expression.mjs (`express`, `verifyExpression`),
tests/expression.test.mjs. APIs are pure, bounded by D03, no callbacks/mutation.
`express(state,observer,policy)` returns `{selection,output}` or throws an explicit
unauthorized/unsupported error. `verifyExpression(state,observer,policy,result)`
returns false on fidelity/attribution mismatch and true only on exact recomputation.
D13 defines experience evidence/outcome; these functions do not admit events.

## Alternatives and source comparison

Primary sources inspected 2026-10-08:
[MCP 2025-06-18 lifecycle](https://modelcontextprotocol.io/specification/2025-06-18/basic/lifecycle)
defines client/server initialization and capability negotiation;
[A2A specification](https://a2a-protocol.org/latest/specification/) provides agent
discovery and task/message operations. Their larger transport/task scope is not
needed for three local mocks. Defer adapters; no negotiation novelty is claimed.
Typed RGB-D/force/calibration ontology and canonical PhenotypeState storage are
rejected for this profile: no accepted demonstration needs them.

## Review and Minimality / Complexity Justification

Three explicit mocks are required by acceptance; one pure selection/procedure
contract suffices. Remove network transport, services, scoring and stored phenotype;
retain exact units/frame, policy and fidelity to avoid ambiguous representations.
New failure modes: false capability/subject claims and unsupported future machines.
They produce scoped claims/refusals, never extra authority or fabricated precision.
Review cases: three supported inputs select three views of one signal; missing and
false remain distinct input bytes; request order does not override priority;
unknown version/unit/frame/attestation rejects; denied policy yields no expression;
substituted source/profile/policy/output fails semantic verification. No runtime
success is claimed until Phase 16/17 tests. Complexity grows only through accepted
requirements/history; no hypothetical future field is preloaded.
