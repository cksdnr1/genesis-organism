## Summary

- Resume delegated synthetic phase execution after creator acceptance of D02.
- Complete Phase 4's exact canonical-byte and cryptographic contract.

## Why this PR

The existing plan requires accepted D02/D03 before canonical fixtures and runtime.
Creator acceptance now permits bounded synthetic choices with explicit review.

## Problem

Without an exact byte boundary, duplicate keys, numeric aliases, Unicode ordering
and circular preimages could yield incompatible or unsafe history commitments.

## How it was fixed

D03 selects restricted integer-only JCS, canonical wire equality, strict budgets,
SHA-256 domains and Ed25519 proof envelopes. Existing origin/schema bytes remain
historical. No runtime or real organism state is created by these documents.

## Validation

Official RFC comparison; twelve counterexample classes reviewed; Python protected
byte and link checks passed; git diff --check passed. Executable vectors remain
Phase 8, so this is not a conformance claim.

## Risks / follow-ups

Continue existing phases through individual mono-spec workflows on this branch.
Actual licensing, D12 release/birth authority and real-world effects remain outside
delegation. PR is stacked after #5; no automatic merge. `.playspec/` remains ignored.
