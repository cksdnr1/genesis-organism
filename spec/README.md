# Protocol conception draft v0.1

STATUS: RESEARCH / EXPERIMENTAL. This is not a frozen protocol or conformance
claim. The normative invariants below express the creator's established intent;
mechanisms and proposed schema fields remain open. Capitalized MUST, MUST NOT,
SHOULD and MAY express requirements only in explicitly NORMATIVE passages.

## Current center: the encounter/effect loop

Machine Encounter → Observer-Negotiated Expression → admitted Experience →
Memory/Synapse → later expression, adaptation and eligible heritable change.
Identity, authorization and replay support this loop. [Encounter](encounter.md)
and [ecology](ecology.md) define its research boundaries. No generic persistent
AI identity protocol or novelty claim replaces the artistic origin.

## NORMATIVE — Genesis Principles v0.1

1. **Origin:** each born organism MUST have exactly one accepted verifiable origin.
2. **Immutable birth:** the genesis genome and canonical birth record MUST NOT be rewritten.
3. **Continuous existence:** new valid canonical states MUST extend accepted history rather than erase it; history SHOULD be append-only.
4. **Machine-first-class perception:** the protocol MUST treat machine observers as first-class participants rather than only human-rendering tools.
5. **Observer-Negotiated Expression (historically Observer-Dependent Phenotype):** an organism MAY express different phenotypes for different capabilities; each expression MUST be attributable to its canonical source state.
6. **Synapse:** persistent relationships MAY form with organisms, AI, robots, people, or environments, under explicit semantics.
7. **Evolution:** experience and environment MAY affect future state only under explicit rules; original genesis MUST remain unchanged.
8. **Lineage:** reproduction MUST create a new organism and preserve attributable ancestry; parents retain their identities.
9. **Replayability:** canonical state SHOULD eventually be reproducible from genesis plus ordered valid events.
10. **Open lineage:** protocol forks/extensions SHOULD preserve attributable ancestry; software ancestry and organism ancestry MUST be distinguished.
11. **Custody:** a custody change MUST NOT grant permission to fabricate canonical experiences or rewrite genesis/history; creator attribution MUST persist.
12. **Substrate independence:** universal organism identity MUST NOT depend on an Ethereum wallet, NFT, single blockchain, or physical body.

These invariants do not prove global uniqueness, physical truth, availability,
or honest authorities. See [threats](../docs/threat-model.md). A Phase 1 prototype
will test a limited deterministic model; it cannot authorize #0001's birth.

## Layers and reading order

Philosophy → protocol → schemas/test vectors → reference implementation →
adapters → organisms. Implementation behavior does not silently define the spec.

- [Birth and freeze](GENESIS.md), [identity](identity.md), [genome](genome.md).
- [Event model](event-model.md), [canonicalization](canonicalization.md).
- [Machine Encounter](encounter.md), [perception](perception.md), [phenotype/expression](phenotype.md).
- [Memory](memory.md), [synapse](synapse.md), [evolution](evolution.md), [Population/Ecology](ecology.md).
- [Reproduction](reproduction.md), [lineage](lineage.md), [embodiment](embodiment.md).

Protocol version, implementation version, organism evolution and organism history
are separate axes. New protocol versions cannot silently reinterpret old events.
Migration authorization, compatibility, and historical interpreter retention are
open questions. Draft v0.1 is a document revision label, not a born-organism
protocol identifier or a promise of semantic-version compatibility.

## Accepted public synthetic contracts — 2026-10-08

This dated index describes bounded experimental contracts accepted after the
conception text above. It does not freeze a universal organism standard or accept
actual GENESIS #0001 birth gates. Normative invariants above remain authoritative.
Exact mechanics belong to the linked D-records, not this navigation appendix.

Acceptance sources: [bounded D02–D11/D13–D14 delegation](../docs/decisions/2026-10-08-synthetic-delegation.md),
[D01 rights and synthetic D12 acceptance](../docs/decisions/2026-10-08-rights-and-rehearsal-acceptance.md),
and [current-profile anchoring SKIP](../docs/decisions/2026-10-08-anchoring-skip-acceptance.md).
Earlier proposals retain pending wording as historical evidence; these dated
records supply later acceptance for only their stated scope.

| Decision | Exact contract and current scope |
| --- | --- |
| D01 | [Origin/governance](../docs/decisions/D01-origin-governance.md), [licensing proposal](../docs/decisions/D01-licensing-proposal.md) and [active mapping](../LICENSE.md): covered prose CC BY4.0, software/synthetic conformance Apache-2.0; organism/art/name and third-party exclusions remain |
| D02 | [Identity/authority](../docs/decisions/D02-identity-authority.md): immutable origin identity, replicas, prospective rotation and observed fork hold; no exceptional lost-key override/global uniqueness |
| D03 | [Canonical bytes](../docs/decisions/D03-canonical-bytes.md): bounded integer-only restricted JCS, pinned SHA256/Ed25519 and separate commitment/proof domains |
| D04 | [Events](../docs/decisions/D04-events.md): closed origin/event/state, historical authority, order, duplicate/conflict and pure transitions |
| D05 | [Privacy/retention/version](../docs/decisions/D05-privacy-retention.md): public synthetic inputs, exact byte retention, explicit failure scopes; no private encryption/pruning/checkpoint/migration |
| D06 | [Implementation/verifier](../docs/decisions/D06-implementation.md): small Node builtin core, separate Python verifier, trusted local synthetic directories and explicit resource budgets |
| D07 | [Perception](../docs/decisions/D07-perception.md): typed claimed capabilities, three local profiles, historical-schema rejection and recomputed expression fidelity |
| D08 | [Memory/synapse](../docs/decisions/D08-memory-synapse.md): replay-derived latest motif, directional unverified consent, local suppression and causal later-expression controls |
| D09 | [Individual adaptation](../docs/decisions/D09-adaptation.md): fresh admitted cue sets signal under adaptation-v1, fixed task only; no general learning claim |
| D10 | [Reproduction/lineage](../docs/decisions/D10-reproduction.md): selected-parent consent, explicit floor inheritance, new child identity, durable retry and independent bounded full ancestry |
| D11 | [Simulated embodiment](../docs/decisions/D11-simulated-embodiment.md): separate body/event authority, signed claim-only evidence, permission/bounds and duplicate no-action |
| D12 | [Anchoring proposal](../docs/decisions/D12-anchoring-proposal.md) accepted as SKIP; [synthetic ceremony](../docs/decisions/D12-synthetic-ceremony.md): fixture-only freeze/archive/retry procedure, no real authority; A01 correction requires actual predecessor bytes |
| D13 | [Encounter](../docs/decisions/D13-encounters.md): retained source/profile/policy/expression/interaction evidence, nonce-scoped idempotency, acyclic accepted-event and receipt binding |
| D14 | [Population study](../docs/decisions/D14-population-study.md): preregistered one-generation controlled synthetic selection, actual verified child counts; niche construction/open-endedness unproven |

`profile:"synthetic-v1"` has separately pinned `rules:"core-v1"`,
`rules:"encounter-v1"` and `rules:"adaptation-v1"`; no implicit upgrade of an
existing origin. [Canonical schemas](../schemas/synthetic/core-v1/README.md),
[encounter schemas](../schemas/synthetic/encounter-v1/README.md) and
[adaptation schemas](../schemas/synthetic/adaptation-v1/README.md) encode accepted
structural subsets. [Core fixtures](../fixtures/core-v1/README.md),
[encounter fixtures](../fixtures/encounter-v1/README.md),
[adaptation fixtures](../fixtures/adaptation-v1/README.md) and
[reproduction fixtures](../fixtures/reproduction-v1/README.md) retain vectors.
Schema validation alone does not prove canonical bytes, authority or fidelity.

Historical `0.1-experimental` observer/phenotype JSON bytes and IDs remain unchanged.
Typed `observer-v1`/`policy-v1`/`expression-v1` reject incompatible legacy objects;
they do not manufacture frames, units or attestation from boolean capabilities.
`relationship-expression-v1` is a read-only later expression, not an implicitly
valid `evidence-v1` input. Public fixture subjects/capabilities/relationships are
claims, not authenticated counterpart identity, mutual consent or actuation rights.

[Node replay](../src/replay.mjs) and [Python verifier](../verifier/verify.py) implement
canonical history independently; [independent ancestry](../verifier/lineage.py)
and [causal expression audit](../tools/audit_causal.py) add bounded verification.
Internal admission accepts verified history context, never an arbitrary cached
state. Missing data is not regenerated, and replay never re-calls a model.
[Ceremony verifier](../verifier/rehearsal.py) validates nonsuperseding archives
offline; supersession requires retained predecessor Git bytes and offline mode
refuses absent evidence. Local copies are not external witnesses or global finality.

See [execution evidence versus birth readiness](../docs/features/genesis_organism/readiness-scope.md).
These experimental acceptances and local test results do not waive any original
birth requirement. **GENESIS #0001 remains UNBORN / NO-GO.**
