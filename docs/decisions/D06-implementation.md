# D06 — minimal synthetic reference and independent verifier

STATUS: ACCEPTED under [delegation](2026-10-08-synthetic-delegation.md), 2026-10-08.
D02–D05 are prerequisites. This chooses implementation boundaries, not protocol
semantics by implementation accident. No code or dependency installed in Phase 7.

## Toolchain and alternatives

Use native Node ESM, node:crypto, node:fs and node:test for reference code. No npm
runtime packages or build. Use Python for an independently authored verifier and
schema/vector tools. One-language-only wrappers fail independent-implementation
intent; a larger framework adds no accepted capability. Node >=22 and Python >=3.11
are intended tool floors, but only tested versions may be claimed in results.
Observed environment: Node 25.9.0, Python 3.14.7. Never hash those observations.

Python tool dependencies: `jsonschema==4.26.0` for Draft 2020-12 validation and
`cryptography==50.0.2` for Ed25519, isolated in `.venv`. Resolve/pin transitive
versions in requirements.lock during Phase 8, retain dependency provenance in that
result. Reference runtime requires neither Python nor these packages. Verify
fixtures offline after installation. No custom cryptographic primitive.
Sources inspected 2026-10-08: [jsonschema](https://python-jsonschema.readthedocs.io/en/stable/validate/),
[Ed25519 API](https://cryptography.io/en/latest/hazmat/primitives/asymmetric/ed25519/).
Node/Python crypto may both use OpenSSL; independence is parser/state/admission
code, not a claim of independent low-level cryptographic implementations.

## Exact file responsibilities and dependencies

| Path | Phase / contract |
| --- | --- |
| schemas/synthetic/core-v1/{genome,origin,event,state}.schema.json | 8: closed D04 shapes, Draft 2020-12; distinct IDs under synthetic/core-v1 |
| fixtures/core-v1/ | 8: canonical byte/proof vectors, accepted history and negative-case descriptions, explicit public test keys |
| tools/build_vectors.py | 8: reproducible synthetic fixture production only; no reference imports; literal expected byte cases |
| tests/schema_vectors.py | 8: schema meta/instance and independent known-answer checks |
| requirements.txt, requirements.lock | 8: Python tool pins; .venv ignored |
| src/bytes.mjs | 9: bounded C/parse, hash, Ed25519 verify, exact key/signature encoding |
| src/admission.mjs | 9: closed shape checks, origin validation, event classification against verified historical parent states |
| src/replay.mjs | 10: pure replay and D04 state commitment; calls bytes/admission, no filesystem |
| src/store.mjs | 11: synthetic fixture directory, bounded reads, atomic publication; depends on replay/admission, no reverse imports |
| src/cli.mjs | 12: exact commands below; delegates to core/store, no parallel mutation path |
| verifier/verify.py | 13: independently implements bytes/shape/proofs/replay; never imports/calls JS reference or its reducer |
| tests/{admission,replay,store,cli,conformance}.test.mjs | 9–13: domain-specific positive/negative/recovery/equivalence tests |
| package.json | 9: private ESM package, test scripts, no npm dependencies |

Later phase paths are assigned in their own accepted contracts, not scaffolded now.
No empty files to satisfy the map. Byte vectors are portable data shared between
implementations; implementation logic is not shared. No service/registry/interface
framework or runtime-config state hidden from replay.

## APIs and errors

bytes: `canonical(value)->Buffer`, `parseCanonical(bytes)->value`,
`digest(kind,value)->hex`, `verifyProof(kind,body,signature,key)->boolean`.
Admission: `validateOrigin(envelope)->initialState`,
`classify(states,events,candidate)->{status,reason?,reference?}`; caller supplies
verified ordered states/events. Only `accepted` permits transition.
Replay: `replay(origin,events,{expectedHead?})->{state,commitment}`; immutable inputs.
Store: `initialize(directory,originBytes)`, `load(directory)`,
`append(directory,eventBytes)`. No secret-key or production signing API.

Stable diagnostic classes: invalid, unsupported, unavailable, unauthorized,
conflict, limit, io; admission statuses accepted, duplicate, rejected, conflict.
Detailed reasons are diagnostic, not consensus state. Errors never publish success
state. No swallowed exception becomes an empty valid history.

## Durable directory and concurrency contract

Synthetic directories are explicitly initialized, new and empty: mkdir must fail
if target already exists. Marker `SYNTHETIC` contains `genesis-organism synthetic-v1\n`.
`origin.json` contains exact origin envelope; `000001.json` etc contain event
canonical envelopes in sequence, max 512. No newline in these JSON files.
Only complete final names count as history; missing sequence, malformed canonical
bytes, invalid proof or unsupported content fails replay. Reject symlinked history
members; bound bytes before reading. This is a local trusted-directory contract,
not protection against a hostile filesystem administrator.

Publish an event by writing a uniquely named `.pending-*` file in the same directory,
fsync its descriptor, then link it to its exclusive six-digit final name without
overwrite, fsync directory, remove temporary and fsync directory. On final-name
collision, verify the now-current history: identical verified event -> duplicate;
valid different sibling -> conflict. No clobber or numeric tie-break. Operational
temporary names are not canonical inputs. Recheck all candidate/parent semantics.

Valid conflict evidence is published similarly as `conflict-<eventReference>.json`;
loading verifies it against the appropriate historical parent and holds if it
proves a signed divergent successor. Invalid conflict files fail closed as invalid
storage, not a valid fork claim. An interrupted loser before conflict persistence
cannot guarantee discovery; retry can record it, and no global non-equivocation
claim is made. Preserve accepted files and evidence after conflict.

Before final publication a crash leaves no accepted event (temporary ignored).
After publication, retry loads the committed event and returns duplicate. Durability
success requires fsync completion; IO error reports uncertainty and retry/replay,
never silently rewrites files. Reads during concurrent publication may observe a
valid prefix; expected head bounds the claim. Hardware/filesystem durability limits
remain explicit. No persistent lock service, checkpoint, pruning or repair-in-place.

## CLI and independent verifier contract

`node src/cli.mjs replay DIR [EXPECTED_HEAD]` and `inspect DIR` are read-only.
`init-fixture DIR ORIGIN_FILE` creates only the synthetic directory above;
`append DIR EVENT_FILE` uses admission then durable store, never direct edits.
Reject path targets inside organisms/genesis-0001; no mint/birth/deploy command.
Reject extra arguments/unknown commands; no auto-discovery of private data.

Success stdout is one JSON diagnostic result (not canonical stored input), exit 0.
Failure stderr is one JSON `{error,message}`, exit 1; usage errors exit 2.
No stack trace or secret input in default errors. Expected-head mismatch is invalid
within the caller's supplied trust scope, not proof of global freshness.
`python verifier/verify.py DIR [EXPECTED_HEAD]` independently returns matching state/
commitment or explicit failure. It shares fixture schemas/values, not implementation.

## Minimality / Complexity Justification and verification

Two Python tools support required standards validation and independent Ed25519
verification; no reference runtime dependencies. Atomic exclusive event files avoid
a database and lock daemon while retaining append-only evidence. Required failure
modes: duplicate writers, conflicting siblings, partial files, orphan temporaries,
missing events, invalid conflict evidence, fsync failure, budget overflow and symlinks.
Do not claim support for distributed storage, hostile local administration or
all power-loss scenarios. Removing negative tests or the second reducer would
break accepted verification requirements. Module graph has no reverse/cyclic imports.
