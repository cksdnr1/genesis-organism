# Phase36 result

Implemented freeze-only D12 helpers and independent Python checker. Source pinned
at `b9c29728baa29ad0bac533690a6e75d334a4f6b2`; freeze.json retains exact synthetic
manifest/proof/references for194 explicitly selected raw Git blobs. Sources,
contracts, vectors, licence texts, requirements and control/audit evidence are
included; mutable worktree/output evidence is not self-hashed.

Focused three groups pass: independent raw-hash/proof/reference agreement,
deterministic repeat, malformed/missing attribution, signature/domain/extra field,
unsafe paths, invalid revision, removed required evidence, altered raw hash,
unavailable blob and nonregular tree/symlink rejection; failed candidate
supersession requires retained correct failure and rejects accepted/absent prior.
Synthetic symlink test creates unreferenced Git objects, never changes HEAD/refs
or rewrites history. CLI intentionally rejects abbreviated revisions; generation
uses the full40character revision. No source workaround changed that rule.

Python independently checks194 raw blobs and the same manifest/freeze references.
Public fixture signer, supplied local supersession context and bounded resource
limits are explicit. No real key attribution, archive durability, release or birth
is inferred. No core/schema/dependency change. Safe cleanup preserves independent
checker, negatives and explicit selection; no service/framework added. #0001 UNBORN.
