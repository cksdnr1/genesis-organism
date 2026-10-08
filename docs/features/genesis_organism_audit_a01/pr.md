# A01 — Verify supersession predecessor evidence

## Summary

- Git-backed JS and Python supersession now verify predecessor selected bytes and hashes. Fabricated revisions, hashes, absent blobs and mismatched artifact lists reject despite a valid successor. Offline supersession refuses unavailable predecessor evidence before any Git call.
- Retain original protocol history and UNBORN status.

## Why this PR

The 2026-10-08 conformance audit at 2090fcd identified this bounded correction. Included in existing draft [PR6](https://github.com/cksdnr1/genesis-organism/pull/6); not a separate roadmap phase.

## Problem

See the task source/spec for the exact reproduced defect or scope gap. Prior workflow completion did not close this finding.

## How it was fixed

Git-backed JS and Python supersession now verify predecessor selected bytes and hashes. Fabricated revisions, hashes, absent blobs and mismatched artifact lists reject despite a valid successor. Offline supersession refuses unavailable predecessor evidence before any Git call.

## Validation

`node --test tests/rehearsal.test.mjs`: 9/9 groups pass. Four negative predecessor mutations, valid predecessor positive, and no-Git offline refusal are covered. Shared corrected-tree `npm test`: 52/52 pass. Independent schema checks: 6+2 pass; causal audit: 12 views. See result.md and the shared remediation report for exact revision and limits.

## Risks / follow-ups

Offline supersession remains unsupported; nonsuperseding offline verification still works without Git. Caller-supplied empty births are local trust context, not global absence proof. No prior freeze-signature contract was invented. No hosted CI or real birth readiness claim; no merge authorized.
