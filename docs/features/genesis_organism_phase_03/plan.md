# Phase 3 execution plan

1. Compare identity derivations and writer models against current encounter,
   provenance and minimality requirements; do not borrow wallet/body identity.
2. Write docs/decisions/D02-identity-authority.md with a proposed single-authority
   synthetic profile, birth/copy distinctions, custody/creator/key boundaries,
   observed-conflict halt, rotation and loss/compromise limits.
3. Walk identical replicas, conflicting signed successors, stolen/lost key,
   custody transfer, body loss and unauthorized creation/correction. Specify
   expected behavior, not actual signature test results.
4. Validate source consistency, no invented keys/IDs or acceptance, protected
   bytes and local links. Publish the concrete proposal for creator review;
   explicitly hold Phase 4 until accepted D02 or actual delegated authority.

Reader -> source-backed proposal -> review -> eventual accepted contract; only
Markdown changes. No hidden runtime path, callback, stored canonical state or
migration. Preserve historical no-selected-ID statement as historical draft;
new proposal does not retroactively select it. Correct through attributed revisions.

Tests: manual threat-case/option review, protected-file and Markdown checks;
no runtime test files. Finish research when reviewable, not when D02 is silently
accepted. No additional planning phase, protocol abstraction, key service or score.
