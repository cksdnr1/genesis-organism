# D05 — synthetic data, replay and retention

STATUS: ACCEPTED for bounded synthetic work, 2026-10-08, under
[delegation](2026-10-08-synthetic-delegation.md). Applies to D04 core-v1;
future encounter profiles must explicitly inherit or refine this scope.

## Classification and access

| Class | Storage / disclosure / replay |
| --- | --- |
| Origin and accepted core-v1 event bytes | Public synthetic fixture content by explicit fixture author intent; retain exact bytes and original proofs. Full replay requires the complete ordered bytes. |
| Canonical state | Recomputed D04 projection; public for these fixtures. Never silently substitute a cached projection for history verification. |
| Private/external raw interactions, real personal/sensor data | Not accepted as core-v1 canonical input. No private canonical-replay claim; later profiles require accepted consent/access/input-closure contracts. |
| Secret signing keys | Test-local or explicitly documented public test keys only; not canonical/public organism data. Do not use real credentials or production keys. |
| Local rejected/conflict evidence and operational diagnostics | Separate from accepted history; no automatic public export. Synthetic test evidence only. A conflict hold persists and cannot be cleared as a cache. |
| Derived summaries/views/caches | Rebuildable and deletable; cannot replace required canonical bytes or claim authoritative experience. |

D04 has no field for a privacy claim, encrypted payload or remote input URL;
unknown fields fail closed. A caller demanding access outside an accepted scope
gets `unauthorized`, not raw data fallback. The core profile does not implement
identity-based access control for real data. Later adapters must not turn a
caller-supplied role string into proof of authority.

## Replay outcomes and availability

- Complete, valid, authorized inputs -> verified state and commitment, scoped to
  supplied history and any trusted expected head.
- Missing required content, key material for requested operation, or unsupported
  interpreter/profile -> explicit `unavailable` or `unsupported`; do not fabricate bytes.
- Access denied by selected access contract -> `unauthorized`, no secret output.
- Available bytes fail canonical/proof/transition checks -> `invalid`; do not
  label all missing content as malicious modification.
- Known signed fork/conflict evidence -> `conflict`, no unique-head success claim.

Never call an LLM or external service during replay. A digest is not content.
No encrypted/private-memory support is claimed merely because an interface can
report unauthorized/unavailable. Core public replay is a deliberately limited profile.

## Retention, bounds and reset

For core-v1 tests: at most 512 accepted events per history, each bounded by D03;
origin plus whole history <= 4 MiB. Refuse an over-budget append before mutation.
Retention is all accepted bytes and verification rules; no pruning. Derived caches
can be removed and rebuilt. No API clears accepted history or conflict evidence.
Fixture-directory deletion is test cleanup only, never an organism lifecycle act.

No checkpoint/Merkle/index format is selected: core-v1 rejects supplied checkpoints
as unsupported. Crash recovery validates from retained history. Tests retain both
invalid-input handling and explicit unsupported-checkpoint handling; no security
coverage is dropped for minimality. Future measured recovery/proof/scale needs may
justify an accepted successor construction without deleting original evidence.

A supplied expected head can detect a truncated prefix when it differs, subject to
trust in that expected head. No head supplied means only validation of the supplied
prefix; never claim it is globally latest. Missing archives remain missing, not
recoverable from a Merkle root alone. No guaranteed fifty-year availability.

## Versions, correction and privacy limits

Origin pins byte suite and transition rules. Unknown versions fail; no fallback,
silent migration or historical rule replacement. Keep historical interpreters and
source contracts available. New rules use explicit successor fixtures/decisions.
A later correction appends new valid information, never erases old accepted records.

Do not put real private information into synthetic public fixtures. Commitments to
low-entropy private content can permit guesses/correlation; no blanket confidentiality
claim. Deleting a key or local file cannot erase already disclosed data. No legal
retention/deletion promise, encryption suite or rights policy is adopted here.

## Minimality / Complexity Justification and review

Minimum: explicit public synthetic inputs, bounded retained history, rebuildable
views and precise unavailable/invalid/unauthorized/conflict distinctions. Retain
exact bytes, privacy boundaries and negative tests to preserve replay/security.
Defer encryption, secret storage, remote archives, pruning and automatic migration
because the accepted core experiment does not require them. New failure modes:
resource exhaustion at limits, lost history/key, stale expected heads, misleading
cached views. Boundary tests and independent replay must report these honestly.

Review cases: missing dependency, lost key, denied export, digest-only content,
valid old prefix, expected-head mismatch, unsupported interpreter/checkpoint,
cleared cache versus retained history/conflict, and correction after disclosure.
They define obligations, not executed tests or a real private-memory implementation.
