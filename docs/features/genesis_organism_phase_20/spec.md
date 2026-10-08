# Phase 20 specification

Implement exact D08 memoryFor(origin,events,subject) in src/memory.mjs. Full verified
history first, bounded subject label, then last matching experience -> closed
subject/motif/encounterId/eventRef or null. No messages, cache, canonical memory,
score or private-data claim. Tests use committed encounter fixture and signed
synthetic variations; no/rejected/other subject, correction, corruption, duplicate,
rebuild/provenance and immutability. Entry -> replay -> projection -> caller; no IO.
