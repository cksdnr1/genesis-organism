# Phase 16 specification

Implement accepted D07 pure observer/policy validation and fixed-priority negotiation
in src/perception.mjs plus distinct observer/policy schemas. Current runtime has
no perception code; exact shapes/literals/procedures/domains are in D07. Canonical
state is a trusted replay result, never authenticated by a profile declaration.
Closed bounded claims and fixture unit/frame only; historical/attested/unknown
inputs reject. Selected result binds state/observer/policy, denial causes no event.
Tests cover three mocks, empty/missing/false, order, policy/privacy, units/frame,
version, resource bounds and immutability. No ontology, model, storage or authority.
