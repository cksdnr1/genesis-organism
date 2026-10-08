# D11 — one bounded simulated embodiment

STATUS: ACCEPTED for public synthetic in-process adapter, 2026-10-08 under
[delegation](2026-10-08-synthetic-delegation.md). No physical/network/hardware actions.

## Packet, authentication and evidence scope

Add proof kind body only, signing D03 prefix body-proof + NUL + canonical(body).
No body hash domain, registry, body ownership or organism identity change.
Packet closed {v,b,h,n,t,sig}; signed body is exactly {v,b,h,n,t}.
v="b1", b="a" or "b", h=lowercase64hex canonical history parent head,
n=safe integer1..1024, t=safe integer0..3, sig=lowercase128hex Ed25519 proof.
Fixed body a key=d75a980182b10ab7d54bfed3c964073a0ee172f3daa62325af021a68f707511a;
body b key=3d4017c3e843895a92b70aa74d1b7ebc9c982ccf2ec4968cc0cd55f12af4660c.
These are public RFC fixtures, not real identities, attested hardware or secrets.
Compact keys keep the entire signed packet within existing D13 interaction.message
256 UTF8 bytes even at n1024. Retain exact canonical packet string, not digest only.

Signature authenticates the fixture claim; does NOT prove claimed environment truth.
No trusted witness/hardware mechanism exists. A request requiring attestation fails
unavailable instead of relabeling a signed claim verified reality. Unknown body/key,
bad proof, range/version/encoding or over-budget packet rejects.

## Pure adapter API and separate authority

Phase31 adapters/simulated.mjs exports simulateEncounter(origin,events,packet,proposal,
options={connected:true,actuation:false,requireAttestation:false}). Options closed with
three booleans. No signing, filesystem, network, hardware or hidden mutable state.
Full replay verifies origin/events; require adaptation-v1. Body packet proof and
normal organism event authorization are independent. Returning data cannot actuate
physical machinery. Caller retains returned accepted history; body is not identity.

proposal is an ordinary separately signed experience-v1 event with previous=packet.h,
nonce="body-"+b+"-"+n, sourceState the verified state whose head=h, observer exactly
{version:"observer-v1",observerType:"simulated-body",subject:"sim-"+b,capabilities:
{spatial:{supported:true,evidence:"claimed",frame:"fixture-plane-v1",unit:"mm"}}},
policy exactly {version:"policy-v1",allow:["path-v1"],disclosure:"public-synthetic"},
expression=unchanged expression-v1 for that source/observer/policy and interaction
{motif:t,message:canonical(packet).toString("utf8")}. No body proof grants event
authority. Validate candidate via normal classify; rejection/conflict fails with
same class, never selects a concurrent winner.

Rebuild per-body last ordinal from admitted experiences with subjects sim-a/sim-b.
Their exact canonical message/proof/body/subject/head/motif and consecutive ordinal
must validate; unrelated subjects remain normal accepted history. A new packet
requires n=last+1 and h=current head. Exact authorized retry is duplicate before
freshness checks, with no appended event AND NO repeated action. Different packet
reuse/stale/gap is invalid. Two bodies may propose against the same source; valid
divergent proposals remain core conflicts, never two simultaneous canonical writers.

Disconnected requests fail unavailable without state changes. Required attestation
fails unavailable. Body replacement/reconnect is a fresh call with the same origin/
accepted events and appropriate next ordinal; no reset of historical identity.
Body-local transient position is caller-local, not canonical or inherited.

## Output and simulated actuation

Return closed {status,events,state,expression,action,evidenceLevel}:
status accepted/duplicate; events copied admitted history (append only if accepted);
state normal replay; expression unchanged path-v1 for resulting state and body profile;
evidenceLevel="signed-synthetic-claim"; action=null unless new accepted event and
explicit actuation=true. Then action is closed {frame:"fixture-plane-v1",unit:"mm",
points:expression.output.points}, exactly two pairs of integers0..3. If out of bounds,
fail before returning any accepted simulation result. No machine actuation API.
Default actuation=false still permits authorized experience but produces no action.

## Phase31 evidence

tests/simulated.test.mjs and tools/demo_simulated.mjs use public fixture signatures
outside the adapter. Demonstrate claim -> normal admission -> D09 signal change ->
spatial expression -> independently permitted bounded action, reconnect/body replacement
preserving ID, duplicate no-action, forged body/organism proof, wrong ordinal/stale/
range/false claim, disconnected and unavailable-witness refusal, concurrent valid
body proposals producing core conflict. Independently replay retained body experiences
with Python (canonical core doesn't infer hardware truth). Read-only expressions
never create event authority. Demo report retained in Phase31 artifacts.

## Minimality / Complexity Justification

One pure function, one existing experience shape, one compact signed claim and
existing canonical replay suffice. A second fixture ID tests simultaneous bodies
without adding a device registry. Retain independent body/organism proof domains,
exact bytes, ordinals, freshness, claim label and actuation bounds: removing them
breaks authorization, replay/evidence or safety tests. No new event type, canonical
body state, hardware/vendor abstraction, witness service or dependency. New risks:
public test keys, simulated claims mistaken for truth, unavailable attestation,
stale proposals and caller loss of transient body position. Explicit labels/limits
and fail-closed tests demonstrate necessity; they do not establish physical safety.

## Implementation ordering clarification — Phase31, 2026-10-08

Normal canonical classification of an otherwise authorized signed divergent
successor remains conflict, taking precedence over local stale-request wording.
Other stale/ordinal misuse is invalid. The adapter never resolves or silently drops
a canonical fork; an outer durable core retains conflict evidence under D04/D06.
