# Phase 6 technical specification

## Scope / use case
D05 decides what the first synthetic profile can replay and disclose. Readers must
not mistake missing/private bytes for tampering or integrity for permission.

## Current implementation and evidence
Accepted D02/D03/D04 define identity, exact bytes and core-v1 state/events; no runtime
or private data. Read spec/memory.md, event-model.md, threat model and Phase 6.
Canonical fields are exactly D04's closed shapes; no new field or old-schema mapping.

## Proposed direction / file plan / architecture
Write docs/decisions/D05-privacy-retention.md: core-v1 is explicit public synthetic
fixture data only. No private canonical payload support; reject unsupported privacy
claims instead of pretending encryption. Preserve exact accepted bytes for full
replay; classify off-core private/local/derived material and access failures.
Define bounded history, retained-head trust limits, optional-checkpoint rejection,
cache-only reset and explicit version failure. No live service or module added.
Entry read contract -> D05 document -> later storage/replay/adapter decisions.

## Risks / acceptance / minimality
Private commitments can leak guesses; public disclosure cannot be undone by deleting
keys. No real personal/sensor data. Future private profiles require separate accepted
contracts; core-v1 cannot silently gain them. Review classification and lost-key,
missing-content, old-prefix and checkpoint cases; preserve origin/schema bytes.
No encryption library, archive server, migration framework or generic privacy layer.
