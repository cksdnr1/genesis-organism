## Summary / why

Phase 8 adds four closed schemas and reproducible byte/proof/history answers before
runtime implementation, preserving all historical schemas.

## Problem / fix

Accepted D03–D06 now have concrete synthetic fixtures, explicit public test keys,
nine valid/fourteen invalid wire cases and expected state/hash. Shape versus
canonicality/authority semantics remain separate.

## Validation

Six schema/vector tests passed; regeneration byte-equal; independent Node/Python
SHA-256 cross-check passed; original-byte and whitespace checks passed.

## Risks / follow-ups

Raw parser/admission/replay tests belong to later phases. Pinned isolated Python
validation dependencies add no Node runtime packages. Cumulative PR #6; no birth.
