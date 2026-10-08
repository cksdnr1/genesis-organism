# D08 — minimal causal memory and directional relationship

STATUS: ACCEPTED for bounded public synthetic experiment, 2026-10-08, under
[delegation](2026-10-08-synthetic-delegation.md). Requires D07/D13 and valid replay.
No changes to accepted canonical event/state semantics or historical expression-v1.

## Projection and retention

Phase 20 src/memory.mjs `memoryFor(origin,events,subject)` first verifies whole
history, then returns null or the LAST accepted experience for that subject as
closed `{subject,motif,encounterId,eventRef}`. subject is the D07 fixture label;
motif is the D13 interaction integer, provenance refs are computed from exact bytes.
Other-subject experience never updates this view. Pending/refused proposals and
signed-but-unadmitted input are not in history and cannot become memory. Duplicate
in canonical history is invalid, not a second memory. No cached/external summary
can replace replay; retained canonical bytes preserve all earlier experiences.

Only public synthetic inputs are supported. No real private-data authorization,
encryption or memory confidentiality is inferred. Private/denied requests fail
under the selected policy; unavailable history reports unavailable. Projection
loss/forgetting means discarding derived results, never accepted evidence. No
message content is copied into this minimal memory projection.

## Directional causal synapse and suppression

Phase 21 src/synapse.mjs `synapseFor(origin,events,subject,{permitted:true})` uses
verified memory, returns null when absent or permitted=false, otherwise closed
`{subject,motif,encounterId,eventRef,scope:"directional-claim",partnerConsent:"unverified"}`.
Validate closed boolean options and history even for suppressed output. A local
policy/fixture refusal may suppress relationship use in later expression; it is
not canonical deletion/revocation or a recovery override. No consensus revocation
event is selected. Authority-admitted evidence supports organism-side attribution,
not proof the counterpart consented, actually exists, trusts or likes the organism.
Actual mutual/private relationships require separate accepted evidence/access rules.

This is more than a list: an admitted interaction's motif causally selects a
later expression grammar. No arbitrary strength, affinity, trust or score. A
unilateral unadmitted relationship claim has no effect. No data beyond needed
motif/provenance is retained in the projection; no general CRM/database.

## Meaningful consequence and versioned later expression

Phase 22 src/related-expression.mjs exports
`relatedExpression(origin,events,observer,policy,options={mode:"normal"})`.
Full replay plus D07 observer validation occurs first. Policy is separately closed
`{version:"policy-related-v1",allow,disclosure:"public-synthetic",relationships}`:
relationships boolean; allow unique zero-to-three literals `relationship-text-v1`,
`relationship-symbols-v1`, `relationship-path-v1`. Reuse text/symbols/spatial
capabilities and priority in that order. Missing/false or denied profiles fail
explicitly. This new policy does NOT change policy-v1, expression-v1 or D13 evidence;
a read-only later encounter may expose the new procedure without admitting it as
evidence-v1. A future evidence successor needs an explicit compatibility decision.

Let base grammar be `[signal,(signal+64)%256,(signal+128)%256,255-signal]`.
Rotate left by motif m from permitted synapse; otherwise m=0. This changes token
order/initial token while preserving the known four-token content, a defined
observable expression consequence rather than a count/hash/timestamp difference.
No subjective meaning, preference or performance improvement is claimed.

Output closed `{kind,signal,grammar,presentation}`: kind is the selected relationship
profile, grammar is the exact four integers, presentation is respectively
`"grammar:"+comma-joined decimal tokens`, the grammar array, or four `[token,index]`
points in the declared fixture-plane-v1/mm mock frame (frame/unit included in path
presentation as `{frame,unit,points}`). No actuation authority.
Result closed `{procedure,sourceStateRef,observerProfileCommitment,
accessPolicyCommitment,memorySource,expressionInputCommitment,expressionOutputDigest,output}`.
procedure=`relationship-expression-v1`; memorySource=source eventRef or null.
Source/profile/policy hashes use existing D03 accepted kinds. Input commitment is
H(expression-input,{procedure,state,observer,policy,memory,synapse}); output uses
H(expression-output,output). No new hash scheme/state or mutable external input.

Options mode normal or no-memory-control only, closed shape. The experimental
ablation ignores memory/synapse and reports procedure=`control-no-memory-v1`,
memorySource=null; this distinct procedure is not a canonical/admitted life event.
Policy relationships=false also suppresses memory use without erasing evidence.
All inputs affecting result are bound, no hidden flag or clock. Expose exact
memory/synapse inputs in a test report, not as claims of private consciousness.

## Controls and acceptance

Use the same synthetic origin, signal, later observer/policy and external inputs.
Treatment admits motif 2; no-experience and rejected-experience histories lack it;
ablation disables only this rule. Compare actual grammar/presentation, ignoring
head/digest differences. Replaying retained input reproduces treatment exactly.
Other-subject experience and suppressed relationship do not affect this subject.
Motif 0 is a counterexample: head changes alone do not establish the milestone.
Test duplicate/refused/invalid history, source refs, privacy refusal, corrupted input,
bounded resources and no mutated originals. D07 three mocks remain required.

## Alternatives and Minimality / Complexity Justification

Latest motif plus source refs is sufficient for a testable causal effect. Reject
all-message copies, scoring, embeddings, generic memory stores, independent stored
relationship graphs and canonical memory duplication. Keep relationship direction,
unverified consent label, suppression and controls to avoid fabricated social facts.
New risks: simplistic finite grammar, self-claimed subject, public relationship
correlation, unsupported private/mutual consent. These explicit limits prevent
the demonstration from being mistaken for sentience, adaptation or full synapse
semantics. Sophistication can later arise under accepted rules and valid history;
no preloaded personality, experience or extra canonical birth state is required.
