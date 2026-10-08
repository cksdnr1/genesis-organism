# Phase 5 plan

1. Specify D04 closed origin/envelope/event/state contracts using D03 exact literals.
2. Define two transition kinds and a deterministic admission truth table, including
   historical authority for sibling conflict detection and ordered retry handling.
3. Define rules-profile extension without changing old interpretations; use new
   synthetic origins for later profiles. No encounter field is frozen now.
4. Review invariants and failure cases, verify links/protected bytes and record result.

Artifact: docs/decisions/D04-events.md; task review files. No runtime modules,
callbacks, live storage or old migration. Documentation -> later schema/validator/
reducer boundaries. Corrections append decisions; no accepted history reset.
Tests are contract walkthroughs, not executable conformance. Keep no hidden clock,
model or random inputs; reject unspecified kinds/versions/fields. D02 observed-conflict
hold cannot become a silently preferred head. Accept only bounded synthetic scope.
