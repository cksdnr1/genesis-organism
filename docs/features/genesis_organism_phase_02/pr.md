## Summary

- Complete existing Phase 2 requirements walkthrough through mono-spec.
- Bind three mock observers, eight receipt responsibilities and causal controls to later decision owners.

## Why this PR

Execution needs concrete acceptance cases before identity/replay infrastructure can
bury the encounter milestone. This PR depends on Phase 1 research in PR #3.

## Problem

The planning baseline lacked a single scoped walkthrough separating expression
integrity, semantic fidelity and meaningful causal consequence.

## How it was fixed

- `docs/decisions/encounter-requirements.md` adds three observer cases and ten
  adversarial/control cases, explicitly expected rather than executed.
- Task spec/plan/reviews/results preserve the Phase 2 boundary. No runtime event,
  callback, schema migration, authority choice or canonical state is created.

## Validation

- Python comparison: eight candidate names, four protected file byte sequences,
  and local links passed.
- Manual comparison against Phase 2/22 acceptance: covered three mocks, controls,
  policy binding, idempotency, missing-byte replay and acyclic evidence.
- `git diff --check`: passed. Runtime tests: not applicable to requirements prose.

## Risks / follow-ups

D07/D08/D13 contracts and Phase 22 executable demonstration remain unimplemented.
No model preference, real sensor truth or birth claim. `.playspec/` stays ignored.
This is a stacked PR; merge order is Phase 1 before Phase 2, with explicit approval.
