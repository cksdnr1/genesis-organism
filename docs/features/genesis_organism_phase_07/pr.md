## Summary / why

Phase 7 fixes implementation boundaries before source work: dependency-free Node
reference, independent Python verifier and exact synthetic CLI/storage contracts.

## Problem / fix

D06 supplies file responsibilities, errors, atomic publication and recovery cases;
later phases no longer need to invent a framework or persistence mechanism.

## Validation

Environment/package-index and official API inspection, module graph/crash-case
review, protected-byte checks and git diff --check passed. No source or install yet.

## Risks / follow-ups

Local filesystem scope, crypto-library overlap and unimplemented recovery evidence
are explicit. Cumulative draft PR #6; no real organism or deployment.
