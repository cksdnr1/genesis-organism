# Independent runtime assessment before historical-claim review

Revision 656d1a3e65edc19d8349f0d77d1f0d7e7388817e, runtime evidence captured by `probe.py` and `probe-results.json`. No earlier audit conclusions informed these cases. Tested source is unchanged.

## Confirmed cross-implementation diagnostic violation (bounded)

A correctly signed event whose organism is wrong and whose kind is unsupported returns `unsupported` in Node and `invalid` in Python. Exact mutation is retained in probe.py (`wrong-organism-and-unknown-kind`). Both reject; actual append snapshots establish no writes. D04 gives high-level shape/profile-before-semantic stages but does not completely specify priority among all simultaneous faults. Node checks kind/data shape before organism, Python checks organism before kind. D06/Phase13 matching rejection classes therefore does not hold for this compound case; the oracle does not uniquely require Node's or Python's class. This is a diagnostic interoperability defect, not an authorization/privacy failure or canonical-state divergence. Different detailed reason strings within `invalid` are diagnostic and do not establish a second defect.

Remediation boundary: review and explicitly resolve predicate precedence for multiply-invalid records within D04/D06, align independent validator ordering without sharing reducer code, retain this exact compound vector, and assert both rejection class and no-write. Do not globally flatten errors or add a new accepted profile.

## Confirmed nonregular-input blocking; availability robustness limitation

An isolated FIFO at an expected event path blocks both verifiers beyond the one-second harness limit; FIFO append source similarly blocks Node. Open occurs before fstat's regular-file check. The valid file control succeeds before and after. This is reproduced local availability behavior; it does not accept invalid bytes or mutate history. D06 promises regular-file rejection and bounded reads, but explicitly trusts local directories and excludes hostile filesystem administrators. Treat as a documented partial safe-failure/availability boundary or robustness issue, not a remote exploit or proven violation of adversarial-admin guarantees. One-second timeout is harness observation, not a contractual deadline or proof that every nonregular file hangs.

Remediation boundary: bounded/nonblocking open followed by descriptor type validation on supported platforms; preserve symlink rejection, regular-file reads, error classes and TOCTOU limits. Test FIFO without writer and regular-file controls with subprocess timeout. Do not redesign persistence/distributed locking.

## Positive and falsification evidence

All twelve independently constructed malformed/proof/policy/source/compound cases reject and preserve directory hashes. One correctly signed changed-message case succeeds in both implementations and appends once; it validates the control path and shows no hidden comparison to fixture bytes. Both verifiers return exactly matching valid state/commitment, and verifier reads preserve hashes. Private policy, unknown observer capability and policy version in evidence map to invalid expression fidelity in both, consistent with D13 PM-01; unknown evidence version remains unsupported. Different invalid reason strings do not create diagnostic-class disagreement.

Depth boundary 16 is accepted; 17, 100, 1000, 10000 and 30000 produce limit in both byte tools on this interpreter. This finite sweep does not establish universal parser conformance. Existing targeted tests: 23/23; Python schema vectors 6/6 and successor schemas 2/2. Full npm test pending at this assessment's creation.

## Limits

This assessment does not certify all malformed input combinations, physical truth, private confidentiality, distributed progress, power-loss behavior or real birth readiness. Existing fsync/concurrency tests passed; no new crash injection beyond these fixtures was performed. A classify call with arbitrary states is outside its explicitly internal verified-context precondition and is not an independent admission bypass finding. Causal grammar contract is separately cross-reviewed with design reviewer; no sentience/preference/general-learning claim follows.

## Subsequent completion note

Full npm test completed exit0: 53/53, zero failures/cancellations/skips, 138051.393708ms. Subsequent own compound extension yields two class disagreements, all twelve malformed cases reject/no-write; writer-handshake controls confirm regular-file rejection after FIFO open release on all three tested boundaries. Exact historical twelve-case PM-01 corpus now agrees; historical three-case compound corpus reproduces two disagreements. See report.md for final bounded assessment and cross-review.
