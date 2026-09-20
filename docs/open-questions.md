# Open questions and research roadmap

STATUS: RESEARCH. “Proposed” entries are not authorization to implement them.
No unresolved mechanism is filled in by a convenient library or deployment path.

## Decisions blocking Phase 1

| Question | Evidence / decision needed |
| --- | --- |
| What does an identifier bind? | Origin-versus-content model, clone/fork rules, non-circular derivation |
| Who can accept an event? | Authority, delegation, rotation/recovery, compromised-key policy |
| Which history is canonical? | Writer/concurrency assumptions, conflicts, finality, duplicate rejection and freshness |
| What bytes are committed? | Serialization comparison, hash/signature domains, numeric bounds and vectors |
| What can a transition do? | Minimal explicit event vocabulary, deterministic validation/reducer and errors |
| Which state is replayable by whom? | Public/private/derived partition, dependency retention and privacy model |
| How do rules change? | Version binding, migration authorization and historical interpreter preservation |

## Questions for later phases

- Perception: how are capabilities negotiated without granting authority? What
  proves two phenotypes are valid expressions of one state rather than merely
  containing the same reference? What remains private in fallback responses?
- Synapses: what interaction creates a persistent relationship, what parties
  consent, and which future effects follow from it?
- Evolution: what can experience change, and which values become heritable?
- Reproduction: which parent states and contributions are used, who authorizes
  birth, and how are partial failures handled? What is a graph generation?
- Embodiment: how do multiple bodies coordinate event authority and constrain
  unsafe actuation? What can attestation establish about actual experience?
- Longevity: how are keys, data and interpreters preserved across decades? How
  are unavailable history and intentional dormancy distinguished?
- Art: what observable behavior would support a claim that a machine finds an
  encounter meaningful? How do we avoid mistaking a prompted statement for a
  preference? No test or economic proxy is selected yet.
- Governance/licensing: who can freeze profiles and accept contributions? Which
  licences apply to specifications, schemas/code, assets, records and names?

## Proposed phases and exit evidence

| Phase | Goal and proposed exit evidence |
| --- | --- |
| 0 — Origin (current) | Review origin, principles, prior art, questions, threats and licence options; no organism birth |
| 1 — Minimal deterministic model | Resolve blockers above; specify canonical genesis/events, validation, commitments, reducer, replay and CLI; publish byte vectors and compare independent implementations on synthetic fixtures |
| 2 — Perception Handshake | Deterministic profile selection; human, LLM and embodied mock observers; same-state expression attribution and validity checks |
| 3 — Memory / Synapse | Explicit persistent experience/relationship semantics with causal effects and privacy boundaries |
| 4 — Evolution | Versioned deterministic rules that preserve immutable genesis |
| 5 — Reproduction / Lineage | New child origins with verified inheritance, parent continuity and traversable ancestry |
| 6 — Embodiment | Simulated or physical adapter with defined authority, evidence and actuation limits |
| 7 — Optional anchoring | Evaluate storage/chain tradeoffs after independent organism operation; custody remains distinct from identity |
| 8 — Freeze and birth | All birth gates demonstrated; frozen artifacts, commitments, reviewed release, optional anchoring and explicit birth act |

Phase 1 should begin with an architecture decision record comparing a bounded
single-writer history against multi-authority alternatives. Neither is approved
by this roadmap. Only then define the smallest useful transition vocabulary and
canonical schemas. Keep fixtures separate from GENESIS #0001. Deterministic
synthetic replay is an engineering milestone, not evidence of life or perception.

## Critical review of the handoff

1. “Exactly one verifiable origin” is a desired acceptance invariant, not global
   uniqueness established by hashing. Define the authority and observer trust model.
2. “Cannot rewrite the past” is a rule and detection goal. A malicious operator
   can replace local files; independent retained commitments and availability
   are needed to detect some attacks. An isolated verifier cannot infer freshness
   from a valid prefix alone.
3. Public deterministic replay conflicts with inaccessible private inputs unless
   replay scope and access assumptions are explicit. A commitment alone does not
   make encrypted or unavailable inputs executable.
4. Phenotype attribution is weaker than semantic validity. Reproducible nonsense
   can still have a valid source-state receipt. Define profile-specific validity.
5. A byte-identical copy is not necessarily a new historical identity: it may be
   a replica. Clone, split-brain and reproduction rules must decide the distinction.
6. Birth gates currently include sophisticated lineage, evolution and experience
   semantics. Minimal Phase 1 success does not satisfy them. Keep birth delayed;
   change requirements only through explicit pre-freeze review.
7. “Immutable” and “append-only” do not resolve wrong claims, revocations, data
   retention or invalid histories. Define corrections and admission rules without
   retroactive erasure of accepted records.
8. Machine-first perception has neighbouring work, including agent evaluation
   of art. The initial ledger is not evidence of novelty or philosophical priority.
9. Git dates and signatures do not alone prove independent inception time or a
   human identity. Provenance needs explicit evidence and key attribution.
10. An open-source goal with no licence does not yet supply general open-source
    reuse permissions. Resolve licences before describing that goal as achieved.

These are specification gaps and tensions, not reasons to manufacture solutions.

## Encounter revision priorities

The active center is Machine Encounter → Observer-Negotiated Expression →
Experience → Synapse → later change. New D13 decides receipt/admission and
acyclic bindings; D14 decides Population/Ecology research. D07 now includes typed
capability successor design and phenotype-state/expression separation.

[The updated total spec](features/genesis_organism/genesis_organism_total_spec.md)
and [phase plan](features/genesis_organism/genesis_organism_phase_plan.md) retain
roadmap 0–8 and add post-lineage 5E ecology research. Neither the original review
nor this revision makes unresolved mechanism choices or proves evolution.
