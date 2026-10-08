## Summary

- Phase 5 defines exact core-v1 origin/event/state shapes and two transitions.
- Duplicate retries, invalid proposals and valid conflicting siblings are distinct.

## Why / problem

Downstream validators need exact authority/order/error semantics rather than choices
made inside implementation. D02/D03 are accepted prerequisites.

## Fix

D04's closed bodies and thirteen-case truth table feed Phase 8–10; no runtime yet.
New rules profiles cannot reinterpret core-v1 history. No origin or old schema edits.

## Validation

Literal/byte checks and manual case review passed; git diff --check passed.
Runtime testing remains future work, not claimed by this documentation result.

## Risks / follow-ups

Authorized equivocation and lost-key availability limits remain explicit.
Included in cumulative draft PR #6; no automatic merge or real birth.
