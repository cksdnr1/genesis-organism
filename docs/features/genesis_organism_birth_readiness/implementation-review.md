# Independent implementation review

Reviewer: birth_redteam. Original oracle in redteam/oracle.md was derived before
existing conformance verdicts. This reviews engineering preparation, not actual
birth or creator acceptance. Source under test:
`68f4d395f471995c90be58c25b88f592aadf2f96`.

The preparation tool preserves the reviewed scope: immutable commit and clean
tracked-source/tool checks; bounded regular raw Git blob selection; new external
private output; no symlink adoption/overwrite; retained partials; process-local
ephemeral synthetic signer; no supplied private key, actual lifecycle or real
profile activation. An independent review found unsafe final marker order in
the original specification/implementation. R1 corrected the contract through
fresh spec/plan gates: COMPLETE publishes exclusively while INCOMPLETE remains,
and removing INCOMPLETE finalizes the exact output set. Engineer's isolated CLI
ENOSPC trial covers final-marker failure. Missing/extra/nonregular markers cannot
count as complete. No power-loss or privileged adversary guarantee is made.

The actual source-bound public preparation packet at
`/private/tmp/genesis-birth-preparation-68f4d39` passed independent Python checks:
562 exact regular tracked blobs, 2,496,718 raw bytes; canonical origin body,
actual alternate-domain negative proof, authorized origin/event signatures,
origin/state commitments and retry; adaptation signal0→2 and all12 exact later
expressions. Treatment-state ablation removes memory/synapse while retaining
signal2, so it correctly differs from no-experience signal0. Rejected experience
contains a genuinely invalid signature and has no causal effect.

All19 adversarial packet mutations reject: forged origin/event, changed genome/
interaction, false canonical bytes/state digest, missing authentic cross-domain
negative, false treatment/ablation/rejection, forged memory/rejection evidence,
omitted or altered source artifacts, duplicate report keys and incomplete/unknown/
nonregular marker members. Scripts and exact baseline/checker/inventory hashes
are retained in redteam/check_shadow.py, falsify_packet.py and
packet-falsification-results.json. These are independent narrow probes; source
owner owns full regression. They establish the tested provisional packet only.

Exact unsigned ceremony draft review resolved: canonical256-member limit versus
1024 source entries by binding raw inventory; self/later-record cycles; strict raw
JSON parsing; source versus dependency package size bounds (measured Node library
66,399,712bytes); exact local journal membership/lock/one-origin/conflict rules;
and publication-before-release/post-release retrieval bindings. Six unsigned
PUBLIC TEST canonical/domain/message/digest vectors independently match through
redteam/check_ceremony_vectors.py. Draft remains unaccepted and no actual key,
identity, rights, publication, witness or archive retention is fabricated.

Engineering checkpoint: existing preparation implementation is supported by the
independent checks above. Additional bounded read-only proposed-contract TEST
verification is justified to exercise full prerequisite/raw-package/journal rules;
byte vectors alone cannot validate that graph. It requires its own independent
spec/plan gates and excludes actual signing, journal writes/recovery and lifecycle
execution. This is existing Phase34–38 work, not a new roadmap phase or decision.

Actual GENESIS #0001 remains NO-GO: real-purpose profile/genome/attribution,
controller/ceremony key association and possession, public-record rights/scope,
concrete operational archive/retrieval ownership and exact ceremony adoption remain
creator/external facts. Actual freeze, publication and birth have distinct later
authorizations and per-act evidence. No new private memory, physical attestation,
initial offspring, blockchain or open-ended evolution prerequisite is imposed.

The additional finite TEST-only child is now independently source-reviewed with no
remaining mandatory finding. Its separate implementation-review.md and redteam
23-case JS/Python comparison retain the graph/number/path corrections and exact
scope. Final committed source/full combined regression still need recording.
Parent and child result.md accurately distinguish those pending final checks from
actual creator facts. Runtime evidence additionally passed independent verification
of34 retained raw evidence hashes, source68f full61-pass log and four loader checks
with zero original Homebrew loads; see redteam/runtime-evidence-check.json. Same-host
synthetic recovery is not a real external archive, portability or duration guarantee.
