# Phase 4 plan

1. Write D03 exact synthetic-v1 byte/crypto contract after comparing official JCS,
   deterministic CBOR and Ed25519 sources; distinguish profile restrictions.
2. Document wire canonicality, type/range/depth/byte budgets, strict UTF-8 and
   UTF-16 key ordering, signing/hash domains and noncircular envelopes.
3. Review edge-case expected rejection/output matrix and ambiguity risks; no
   implementation or generated real genesis digest. Accept under recorded delegation
   only after this review, leaving executable conformance for Phase 8 onward.
4. Verify links and protected bytes; result records tests and limits; publish PR.

Files: docs/decisions/D03-canonical-bytes.md and this task's artifacts only.
Entry research -> exact decision document -> downstream schema/vector consumers;
no canonical runtime update, callbacks or migration. Revised protocol requires a
new profile, not relabelled old bytes. Rollback via attributed correction.
No code tests for prose; check matrix covers null/absent, lexical integers, duplicate
keys, surrogate/normalization, nesting bounds, domain substitution and self-reference.
One format/suite; no extra abstraction justified. Historical schemas stay unchanged.
