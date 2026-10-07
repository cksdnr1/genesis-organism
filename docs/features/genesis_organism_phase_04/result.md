# Phase 4 result

D03 accepted for bounded synthetic work under creator delegation. Compared JCS and
CBOR and specified one restricted JCS wire format, SHA-256 domains, Ed25519 proofs,
closed preimage responsibilities, budgets and counterexamples. No runtime or #0001
commitment. Official RFC sources linked in D03, retrieved 2026-10-08.

Review found canonical-only admission is necessary to avoid parser-loss ambiguities;
producer validation additionally rejects negative zero/invalid Unicode/non-JSON
objects. Signature/reference separation avoids self-reference and signature replay
as a new event identity. Actual vectors and crypto tests remain Phase 8 work.

Focused checks: protected original bytes and D03 local link checks passed;
12 counterexample rows manually checked against Phase 4 scope. Whitespace passed.
No runtime tests claimed. Safe-refactor review found no necessary cleanup; original
canonicalization research remains historical, new accepted profile is additive.

PR https://github.com/cksdnr1/genesis-organism/pull/6 contains this phase's reviewed
commit and will carry subsequent separately tracked phases. No automatic merge.
The preset's return-to-base step is deferred to preserve the authorized sequential
execution branch; no parallel agent/process is writing it.
