# Phase24 plan

1. Extend origin rule allowlists in JS and Python; add adaptation-only signal
   override refusal, experience successor allowlist and fresh-source digest check
   after prior-identity handling. Reducers assign motif only under adaptation-v1.
2. Add build_adaptation_vectors.py with exclusive new directories. Clone historical
   origin/state/event/evidence schema shapes under new IDs; state rules change,
   observer/policy refs stay explicitly historical. Drop signal event branch.
   Sign public test origin and four fresh-source experiences with motifs 2,1,3,3;
   use independent verifier for expected outputs and assert selected literal signals.
3. Add tests/adaptation.test.mjs: store each prefix, Python exact state/commitment,
   task equality and matched controls; exact genesis bytes; duplicate/rebased nonce,
   stale evidence, malformed/unauthorized/direct override/unknown-rule refusal,
   rotation and legacy replay. Independently validate schemas locally, no network.
4. Run focused/full tests, Python vectors, diff checks; publish result in PR6.

No special reducer entry, cached state, random operator or migration. New failure
mode is stale-source rejection; state never partially mutates on refusal. Rollback
by new correction commit and retained old fixtures; never rewrite accepted origin.
Complete when literals, independent prefixes and negative cases all pass.
