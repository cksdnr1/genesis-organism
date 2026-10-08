# Phase 10 — pure deterministic replay

Scope: D04 core-v1 replay after Phase 9 admission. Current code verifies bytes,
shapes and proofs; no reducer or persistence exists. Inputs are origin envelope,
ordered event envelopes and optional trusted expectedHead. Exact D06 path/API:
src/replay.mjs replay(origin, events, {expectedHead?}) -> {state,commitment}.

Construct initial state using validateOrigin. Bound events to 512 and total
canonical envelope bytes to 4 MiB, before transitions. Each candidate must classify
accepted against previously verified states/events; reject duplicate history,
conflict, unknown versions, invalid proofs and ordering. Only signal-v1 replaces
signal, rotate-v1 replaces authority; both advance sequence/head. State hash is
D03 H(state, projection). Optional head mismatch is invalid, not global freshness.
Unsupported options (including checkpoints) fail unsupported. No filesystem, model,
clock, randomness, stored cache or callback. Input objects remain unchanged.

Tests/replay.test.mjs uses literal expected fixture state/hash, replay-prefix and
retry distinctions, rotation, tampering, unsupported rules/options, budgets and
immutability. Invalid replay never returns partial success. No privacy claim beyond
public synthetic inputs; unavailable external content cannot be invented.
Minimum: one pure function plus a verified-history helper used by storage later;
no generic transition framework. Existing admission is reused, independent verifier
will not share this reducer. Reset means recompute from original retained bytes.
