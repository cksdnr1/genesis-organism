## Summary

- Deliver a reviewable Phase 3 D02 synthetic identity/authority recommendation.
- Preserve an explicit creator-acceptance gate before Phase 4.

## Why this PR

The creator requested sequential execution of all existing phases through mono-spec.
Phase 4 requires accepted D02; a broad implementation request cannot be recorded as
a specific trust-model choice when that choice has not been presented and accepted.

## Problem

Origin identifiers, writer authority, replicas and compromise handling remained
unspecified, preventing safe downstream canonical-byte/event contracts.

## How it was fixed

- `docs/decisions/D02-identity-authority.md` compares options and recommends an
  origin-bound, single-authority, locally serialized synthetic profile.
- Twelve adversarial walkthroughs explain replicas, equivocation, rotation,
  stolen/lost keys, custody, body loss and missing history.
- Source -> proposal -> creator review is the implemented documentation path;
  no keys, organism identifiers, events, runtime or implicit recovery exist.

## Validation

- Python comparisons: seven protected file byte sequences, local links and
  proposal/authority boundary markers passed.
- Manual threat/invariant review: twelve cases, with explicit security limits.
- `git diff --check`: passed. Runtime/signature/replay tests: not applicable and not claimed.

## Risks / follow-ups

D02 is PROPOSED, not accepted. Await creator acceptance or explicit delegated
synthetic design authority; Phase 4 and dependent implementation remain gated.
Key loss stalls admission; signatures cannot prevent an authorized compromised
writer from equivocating. No global freshness or uniqueness guarantee.
Stacked on Phase 2 PR #4; do not merge automatically. `.playspec/` stays ignored.
