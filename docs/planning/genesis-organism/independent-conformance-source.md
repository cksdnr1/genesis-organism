# Independent conformance audit — creator request

The creator requests a PlaySpec task delegated to independent subagents to
critically determine whether the latest repository satisfies the Total Technical
Specification and Encounter-centered Phase Plan. The orchestrator must not
implement or provide its own conformance verdict.

## Authoritative requirements

- `docs/features/genesis_organism/genesis_organism_total_spec.md`
- `docs/features/genesis_organism/genesis_organism_phase_plan.md`
- `spec/README.md`, `spec/GENESIS.md`, and applicable accepted D01–D14 records
- Original creator constraints and Minimal Sufficiency as preserved in this repo

Resolve dated baseline versus subsequent accepted decisions explicitly. Do not
rewrite requirements to fit implementation. Independently derive requirements
before consulting earlier audit verdicts; those verdicts are claims to test,
not an answer key. No required PASS, score, or minimum defect count.

## Deliverables and evidence

1. Exact revision, branch/default-branch scope, reproducible commands and results.
2. Traceable coverage of all 38 phases, invariants, causal encounter controls,
   decision gates, birth prerequisites, and deferred/optional capabilities.
3. Independent runtime adversarial verification and protocol/scientific review.
4. Distinguish satisfied, violated, partial, deferred, and unverified requirements.
   Passing a finite test corpus does not prove universal conformance.
5. Cross-review disagreements and reproduce or falsify earlier audit claims only
   after the independent first pass. Separate facts, inferences and unknowns.
6. Bounded remediation specifications/tasks for confirmed gaps. Audit completion
   must not be presented as original phase-gate or birth completion.

## Boundaries

Use the supported PlaySpec mono-spec CLI; never manually edit `.playspec`.
Separate contexts and file ownership; one agent owns parent workflow mutations.
Preserve pre-existing untracked work and historical evidence. No runtime source
changes in this audit; optional isolated reproducer scripts are allowed.
No commits, pushes, merges, releases, deployment, minting or birth in this task.
GENESIS #0001 remains UNBORN. Do not introduce D15 or an execution phase.
Subagents are separate review contexts, not external human certification.
