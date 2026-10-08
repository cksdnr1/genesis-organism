# Phase 13 — independent conformance

Current state: native Node bytes/admission/replay/store/CLI, twelve passing groups.
D06 requires separately authored Python verifier/verify.py; share only literal
fixtures and published contracts, no reference imports, reducer or JS subprocess.

Implement independent restricted JCS (UTF-16 name order, scalar strings, safe ints,
no negative zero/floats/duplicates), D03 budgets and canonical equality. Use existing
Python cryptography Ed25519 for proof; hash exact domain/body. Validate closed D04
origin/events, historical authority/sequence, rotate/signal semantics and state.
Read bounded regular no-follow files, SYNTHETIC marker, contiguous <=512 history,
<=4MiB, <=2048 entries. Signed divergent evidence holds; forged/misnamed evidence
is invalid. No checkpoints/migrations/model call or head freshness inference.

CLI DIR [EXPECTED_HEAD] returns same {state,commitment} JSON, safe stderr/exit1
or usage exit2. Optional Python --bytes HEX exposes byte-parser conformance only,
never a canonical organism operation. Exact hex argument bounded before decoding.
All initial profile strings, domains and D04 members are reused verbatim. No schema
or wire vocabulary changes. Tests/conformance.test.mjs invokes both actual programs
on shared corpus and mutated directories, comparing rejection and known state.

No independent low-level crypto implementation claim (both may use OpenSSL).
Input availability/fork trust limits remain explicit. Corrections change code and
regression tests, never literal expected vectors. One standalone verifier suffices;
do not import reference logic or build a verification service.
