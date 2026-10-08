# A04 — Index current accepted contracts

## Summary

- Appended a dated spec entry index for accepted D01–D14, current synthetic profiles, schemas/vectors, verifier paths and explicit unsupported scope. Historical index bytes remain an exact prefix.
- Retain original protocol history and UNBORN status.

## Why this PR

The 2026-10-08 conformance audit at 2090fcd identified this bounded correction. Included in existing draft [PR6](https://github.com/cksdnr1/genesis-organism/pull/6); not a separate roadmap phase.

## Problem

See the task source/spec for the exact reproduced defect or scope gap. Prior workflow completion did not close this finding.

## How it was fixed

Appended a dated spec entry index for accepted D01–D14, current synthetic profiles, schemas/vectors, verifier paths and explicit unsupported scope. Historical index bytes remain an exact prefix.

## Validation

Static review: all fourteen D-record rows present, links resolve, historical README prefix and protected schema/origin bytes unchanged. Shared corrected-tree `npm test`: 52/52 pass. Independent schema checks: 6+2 pass; causal audit: 12 views. See result.md and the shared remediation report for exact revision and limits.

## Risks / follow-ups

The index is navigation, not a new profile/version or evidence of universal conformance. Historical experimental schemas remain unchanged. No hosted CI or real birth readiness claim; no merge authorized.
