# Phase 8 technical specification

## Scope / user outcome
Publish exact closed core-v1 schemas and portable synthetic byte/proof/history
vectors under D02–D06, so later implementations consume a fixed answer corpus.
No reference admission/reducer or independent verifier is implemented in this phase.

## Current implementation / structured evidence
D03: synthetic-v1, integer-only JCS, SHA-256, Ed25519, bounded canonical-only wire.
D04: core-v1 origin/envelope/state shapes; signal-v1/rotate-v1; exact lowercase hex.
D05: 512 events / 4 MiB, public synthetic only. D06: four schemas, fixtures,
tools/build_vectors.py, tests/schema_vectors.py, requirements pins. No code exists.
Original 0.1-experimental schemas remain unrelated byte-identical historical artifacts.

## Paths / direction / state propagation
Create D06 Phase 8 paths only, plus .gitignore entries for .venv/bytecode. Draft
2020-12 schemas have distinct synthetic/core-v1 IDs and closed required fields.
Schema validation proves shape only: UTF-8 byte length, wire lexical/canonical
rules, crypto and state transitions need separate checks. No remote ref resolution.
Builder uses explicit public RFC test seeds, never production credentials. Writes
only fixtures/core-v1; immutable expected results are reviewed and versioned.

## Vector contract / tests
Commit canonical origin and ordered event envelopes (signal, rotation, signal),
expected state/digest, exact canonical byte cases including UTF-16 key ordering,
invalid raw duplicates/number aliases/surrogates/whitespace/oversize declarations.
Negative event cases identify shape versus proof/admission errors; no fake pass.
Use jsonschema Draft202012Validator.check_schema and valid/invalid instance checks,
RFC 8032 known-answer Ed25519 test, independently recomputed SHA-256 domains and
regeneration byte equality. No runtime claims from JSON parsing.

## Risks / reset / minimality
Public test keys are unsafe for real use and explicitly labelled. No actual #0001
input. Fixture regeneration must be deterministic and cannot silently normalize
failed vectors. Bound generator paths; review diff; no deletion of origin/history.
Only D06-approved tools installed isolated; pin transitive versions. Rollback by
attributable correction. Test corpus supports future independent implementation.
