# Reviewer harness correction

The first mutation harness used tempfile's lexical /var/folders path on macOS.
/var is a symlink, so both correct ancestor guards rejected before the intended
mutation predicates. The reversed-archive positive control exposed this harness
error. That attempt is not counted as negative-test evidence. The harness now
resolves its owned scratch root before copying fixtures; the complete23-case
rerun reaches intended validators, accepts the reversed-order positive and rejects
22 attacks with JS/Python agreement and unchanged input snapshots. Original actual
fixture path /private/tmp already passed independently. No source defect or
readiness result was inferred from the invalid harness attempt.
