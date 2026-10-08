# Phase 22 — an encounter changes a later encounter

## Scope and use case

Prove D08's finite causal expression rule with accepted, replayable experience,
three machine-facing views and matched controls. Infrastructure is supporting
evidence. No appreciation, consciousness, adaptation/selection or birth claim.

## Current implementation and files reviewed

FACT: replay.mjs verifies accepted history; store.mjs durable admission and conflict
holds; encounter.mjs binds evidence to verified state/policy/expression; receipt.mjs
derives accepted refs; memory.mjs and synapse.mjs expose motif/provenance only.
Reviewed these files, perception.mjs and D08-memory-synapse.md. expression-v1
currently depends only on signal and must retain its old meaning.

## Proposed architecture and evidence

| Accepted artifact | Contract |
| --- | --- |
| D08 | relatedExpression API and exact closed result/policy/output shapes |
| D07 | fixture subject/capability validation and fixed text/symbols/spatial priority |
| D13 | evidence-v1 retains expression-v1; no implicit later-procedure acceptance |
| Phase plan 22 | actual grammar change, matched controls, ablation, faithful views |

New read-only entry src/related-expression.mjs takes origin/events/observer/policy
and closed mode normal or no-memory-control. Full replay and observer validation;
separate closed policy-related-v1 with unique <=3 relationship profile literals,
public-synthetic disclosure and required relationships boolean. Unknown/version/
private/unsupported/denied inputs fail explicitly, not fall back.

Normal procedure relationship-expression-v1 uses permitted memory/synapse motif
to rotate [signal,(signal+64)%256,(signal+128)%256,255-signal] left. No memory ->0.
Ablation procedure control-no-memory-v1 ignores memory/synapse and source=null.
Output {kind,signal,grammar,presentation} exactly follows D08. Result binds state,
observer, policy, effective memory/synapse, procedure, input and output using D03.
No caller-injected memory, model, clock, cache or canonical state additions.

## File plan and active flow

Add related-expression module, tests/related-expression.test.mjs and
tools/demo_encounter.mjs. Demo uses committed public fixture and a temporary
synthetic store: initialize -> append -> close/reload -> receipt/memory/synapse ->
later expression. Report controls and source refs as JSON, with no signing or
organism birth. README documents command and demonstrated limits after tests.

Tests compare actual token order/presentation across all three mocks, same later
profile/policy/signal/inputs per comparison. Accepted motif2 treatment differs;
no/rejected admission and rule ablation equal baseline. Other subject/suppression
and accepted motif0 show absence of meaningful effect. Retained bytes replay to
the same result; corrupted/missing/private requests fail; inputs remain unchanged.

## Risks, recovery and removal test

Fixed grammar is a research demonstration, not learned meaning. Subject is a claim;
policy suppression is no historical erasure. Rebuild views from retained history;
no caches to reset. Independent verifier covers canonical admission/replay, not yet
this optional expression algorithm. Negative cases and controls are necessary
evidence; a universal capability ontology, database or new event would be excess.
