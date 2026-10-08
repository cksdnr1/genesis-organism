# Phase 1 execution plan

1. Verify merged baseline and origin ancestry using git log/merge-base; inspect
   ORIGIN, licensing, contribution and prior-art records without rewriting them.
2. Read official licence sources; write docs/decisions/D01-origin-governance.md
   distinguishing source facts, recommendations, open decisions and evidence limits.
3. Validate all new source/claim pairs, licence non-selection, creator/custody
   separation, historical dates and Minimality / Complexity Justification.
4. Save result.md with exact checks, unresolved rights-holder actions and the
   distinction between phase research completion and D01 acceptance.

Entry -> read Markdown -> add research file -> later reviewers consume it ->
corrections append/supersede research -> creator sees choices and unresolved gates.
No events, callbacks, stored organism state, API, old runtime or migration exist.
Historical initial-patch constraints remain historical; do not edit them to imply
that earlier approval existed. No alternative bypass around rights acceptance.

No tests are added for prose. Checks: git diff --check, relative links, origin
ancestry and protected-file byte equality. Sources must be dated current retrievals,
not falsely inception-time evidence. Rollback uses a new attributable correction;
never rewrite published origin history. Finish when D01 options are reviewable;
licence/freeze acceptance may remain OPEN and cannot be marked completed by tooling.
