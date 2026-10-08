# Phase30 — bounded simulated body/evidence decision

## Scope/current facts/files

Reviewed embodiment/threat model, experience/replay/perception and D09. Spatial
expression is data only; no current actuation/body authority. Decide D11 before
Phase31 adapter. One bounded in-process simulator, two fixture body IDs for conflict
tests; no real hardware, sockets, vendor, secret or attestation claim.

## Proposed minimum contract

| Required boundary | Mechanism |
| --- | --- |
| body authentication vs truth | distinct body-proof and fixed public fixture keys; claim-only |
| replay/continuity | full compact signed packet retained in existing experience message |
| organism authorization | separately supplied normal signed experience proposal |
| stale/retry/simultaneous | head and per-body ordinal; core conflict rules, duplicate no action |
| actuation | explicit local boolean plus 0..3 coordinate bounds, no automatic machinery |

Compact flat packet keys are justified solely by D13's256-byte retained message
bound, not a universal sensor format. Fixed D11 defines exact fields/keys/proof and
adapter return. No new canonical event/state or body ownership equivalence.

## Files/flow and future implementation

Write D11-simulated-embodiment.md; update dated embodiment/threat-model links.
Phase31 adapters/simulated.mjs pure simulateEncounter(origin,events,packet,proposal,
options) validates -> normal admission/replay -> spatial expression -> independently
permitted simulated action. Caller retains returned history; reconnect/replacement
uses same origin/events. No module/toolchain dependency or device framework.

## Risks/tests/recovery

Signed false claim remains false/unknown; body key is public fixture material.
Required hardware/witness attestation fails unavailable. Forged body/proof, ordinal,
stale packet, actuation=false, disconnect, bad range and simultaneous authorized
successors need explicit tests. Body loss never equals organism death/history loss.
