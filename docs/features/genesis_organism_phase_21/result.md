# Phase 21 result

Added src/synapse.mjs and tests/synapse.test.mjs. The replay-derived directional
projection exposes exact motif/provenance plus unverified consent labels. Local
suppression returns null only after verifying history; no history is deleted.

`node --test tests/synapse.test.mjs` passed (one focused group); `npm test` passed
(26 groups). Cases include absence, other subject, repetition, suppression, closed
options, duplicate/forged history under both permission values and input immutability.
Pending/refused input has no effect because only admitted history is accepted.
Actual partner consent/private relationships remain unsupported.

Cleanup review: reuse of memoryFor is sufficient. No cache, graph, score, canonical
field, dependency or storage adapter is needed; no refactor was justified.
