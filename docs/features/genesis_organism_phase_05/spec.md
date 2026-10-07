# Phase 5 technical specification

## Scope and use case
Select D04's minimum meaningful synthetic core event model under accepted D02/D03.
Implementers must decide admission and resulting state without inventing contracts.
This is decision documentation, not executable encounter or organism evidence.

## Current implementation / relevant files / structured facts
D02 accepted by additive delegation; D03 pins synthetic-v1 bytes and origin/event/
state hash domains plus origin-proof/event-proof signature domains. No runtime.
Read spec/event-model.md, spec/genome.md, D02/D03, Total Spec and Phase 5.
Historical JSON descriptors have no canonical event contract and remain unchanged.

## Proposed direction / files / architecture
Create docs/decisions/D04-events.md with exact closed origin, event and state shapes.
Pin rules core-v1 independently of byte suite synthetic-v1. Minimum event kinds:
signal-v1 sets bounded synthetic signal; rotate-v1 changes future authority.
Local sequence/predecessor, signature scope, duplicate idempotence, observed-fork
conflict hold and malformed/unsupported outcomes are explicit. No arbitrary mutation.
Future D13 requires a new accepted rules profile/origin fixture, not retroactive
reinterpretation. No actual state update/callback/API yet; docs feed Phase 8–10.

## Risks / tests / reset / minimality
Review truth table for every malformed/duplicate/stale/forged/cross-organism case;
verify state commitments omit self fields and genesis remains immutable. Distinguish
same retry from conflicting signed sibling and missing dependencies. Correct through
attributed revised decisions, not erased history. Exact schema/vector implementation
remains Phase 8. Two event kinds justify deterministic state and D02 key continuity;
no hierarchy, memory/synapse, reproduction or hidden wall clock.
