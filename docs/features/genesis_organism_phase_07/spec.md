# Phase 7 technical specification

## Scope/use case
D06 chooses the smallest concrete implementation/verifier structure satisfying
accepted D02–D05. Another engineer must know exactly which files, API boundaries,
CLI actions and independent tests will prove the synthetic core.

## Evidence/current architecture
No runtime, packages or test runner in repository. Environment inspected: Node
25.9.0, Python 3.14.7, OpenSSL 3.6.3. Python jsonschema/cryptography not installed;
package index reports jsonschema 4.26.0 and cryptography 50.0.2. Official library
schema/Ed25519 docs inspected. These are implementation observations, not hash inputs.

## Proposed direction/files
Create docs/decisions/D06-implementation.md. Native Node ESM reference avoids build
and runtime dependencies. Independently implemented Python replay uses pinned
cryptography for Ed25519 and jsonschema for Phase 8 validation; no shared reducer.
Exact module/test/schema/fixture/CLI paths and atomic no-overwrite per-event-file
storage must be specified. Bounded synthetic fixture directories only.

## Boundary, risks and acceptance
Entry contract -> small modules -> CLI/independent verifier -> evidence. No UI,
network, generic service, signing wallet or real organism. No cyclic module imports.
D03 parsing/canonical budget and D04/D05 replay/durability constraints preserved.
Storage uses exclusive final-name publication; partial temporaries are not history.
Review crash/concurrency/conflict handling and no-overwrite behavior before coding.
Phase 8 adds tools/schemas/vectors, 9 admission, 10 replay, 11 storage, 12 CLI,
13 independent verifier. No implementation or installation in this phase.
