# Initial draft review and handoff

STATUS: PROPOSED PATCH, UNCOMMITTED. This report records preparation of the
initial documentation draft; it does not claim that a commit or release exists.

## 1. Repository state found

Repository: https://github.com/cksdnr1/genesis-organism, creator `cksdnr1`.
GitHub CLI reported `isEmpty: true`, no default branch name and no licence.
`git ls-remote` returned no refs. No local checkout existed at the requested
workspace; it was cloned to `/Users/chanwook.lee/PJ/genesis-organism`.
The clone has an unborn local `main` branch and no commit history. No existing
tracked or user-authored files were overwritten. No operational credentials,
runtime settings or services were changed. Only the clone and listed files were
created. Rollback can remove these new draft files without undoing prior work;
do not remove later user edits without checking first.

## 2–3. Every created file and its purpose

All 28 files below are new. No pre-existing file was changed.

| File | Purpose |
| --- | --- |
| [README.md](../README.md) | Short project introduction, present status, limitations and repository map |
| [ORIGIN.md](../ORIGIN.md) | Creator-supplied inception account, origin philosophy, evidence limits and non-claims |
| [MANIFESTO.md](../MANIFESTO.md) | Concise artistic question about machines as audiences |
| [CONTRIBUTING.md](../CONTRIBUTING.md) | Claim discipline, history preservation, contribution and initial-task constraints |
| [LICENSE-DECISION.md](../LICENSE-DECISION.md) | Layered licensing options with all final choices unresolved |
| [docs/prior-art.md](prior-art.md) | Linked primary-source ledger and explicit research limitations |
| [docs/terminology.md](terminology.md) | Working vocabulary and epistemic/status labels |
| [docs/open-questions.md](open-questions.md) | Phase blockers, full roadmap and critical review of the handoff |
| [docs/threat-model.md](threat-model.md) | Assets, trust boundaries, attack scenarios and candidate mitigations |
| [docs/draft-review.md](draft-review.md) | This complete inventory, review and proposed next step |
| [spec/README.md](../spec/README.md) | Normative principles, layering and specification index |
| [spec/GENESIS.md](../spec/GENESIS.md) | Unmet birth evidence gates and separation of freeze, release and birth |
| [spec/identity.md](../spec/identity.md) | Identity/continuity hypothesis, custody distinction and authority questions |
| [spec/genome.md](../spec/genome.md) | Immutable genesis versus evolving/heritable state |
| [spec/event-model.md](../spec/event-model.md) | Acceptance, ordering, replay, correction and external-input questions |
| [spec/canonicalization.md](../spec/canonicalization.md) | JCS/CBOR comparison and commitment decision criteria |
| [spec/perception.md](../spec/perception.md) | Proposed capability handshake, unsupported requests and privacy boundaries |
| [spec/phenotype.md](../spec/phenotype.md) | Attribution versus reproducibility versus semantic validity |
| [spec/memory.md](../spec/memory.md) | Public/private/local/derived memory and replay tension |
| [spec/synapse.md](../spec/synapse.md) | Persistent causal relationships and consent; no arbitrary scores |
| [spec/evolution.md](../spec/evolution.md) | Rule-bound change and preservation of original genesis |
| [spec/reproduction.md](../spec/reproduction.md) | New child identity and unresolved inheritance/authorization |
| [spec/lineage.md](../spec/lineage.md) | Traversable ancestry and distinction from code forks and replicas |
| [spec/embodiment.md](../spec/embodiment.md) | Body independence, environmental claims and actuation authority |
| [schemas/README.md](../schemas/README.md) | Draft schema scope, proposed constraints, examples and deferred schemas |
| [schemas/observer.schema.json](../schemas/observer.schema.json) | Experimental capability-claim structure with extensible observer types |
| [schemas/phenotype.schema.json](../schemas/phenotype.schema.json) | Experimental expression attribution descriptor; no proof of validity |
| [organisms/genesis-0001/README.md](../organisms/genesis-0001/README.md) | Explicit UNBORN placeholder with no identity or birth data |

## 4. Proposed invariants

Preserve exactly one accepted verifiable origin under a defined authority model;
immutable genesis and birth record; history extension rather than erasure;
first-class machine observers; state-attributable expressions; explicit causal
rules for relationships and evolution; new identities for children; preserved
ancestry; replayability as a demonstrated future target; creator attribution
independent of custody; blockchain/body independence. The detailed normative
wording lives in [the protocol index](../spec/README.md).

## 5. Architectural decisions

Established intent: separate philosophy, protocol, schemas/vectors,
implementation, adapters and organisms. Separate canonical state from expression,
creator from custodian, protocol upgrades from organism evolution, and project
conception from organism birth.

Proposals only: a capability-led handshake; a deterministic expression profile
as the first experiment; versioned JSON Schema 2020-12 observer and phenotype
review artifacts with bounded fields and explicit extensions. Schema `$id`
values are names for this draft, not a claim of publication or frozen identity.
No hash, signature suite, controller, ordering mechanism, storage service,
consensus model, implementation language or blockchain is selected.

The organism, genome and event schemas are deliberately deferred until their
identity, canonicalization and authority semantics are defined. Empty or
permissive stand-ins would not provide a useful validity claim.

## 6. Unresolved questions

Blocking questions: identity derivation; writer/authority model; conflicting
histories and freshness; canonical bytes and commitments; transition vocabulary;
private replay scope; upgrades, key recovery and dependency preservation.
Later questions include phenotype semantic validity, synapse causality,
inheritance and birth failures, simultaneous bodies and environmental evidence.
Every birth gate remains NOT DEMONSTRATED. No licence is selected.

## 7. Assumptions deliberately avoided

No invented origin hash, signature, independent timestamp, genome, token,
transaction, birth event, organism identifier or AI preference. No implicit
Ethereum identity, arbitrary mutation/trust score, preferred history head,
single-writer authority, public-memory default or sensor truth. The inception
date is attributed to the creator's handoff. Partial website access and an
unretrieved research PDF are marked as such. No schema acceptance is treated as
protocol validity, and no software clone is automatically called a new organism.

## 8. Technical concerns with the handoff

Hashing does not establish unique origins, prevent deletion, prove a latest head,
or establish physical truth. Public replay and secret inputs require an explicit
scope. Shared state references do not prove phenotype validity. Copies can be
replicas rather than new identities. Git author dates/signatures need separate
identity/time evidence. Broad birth gates exceed a minimal replay prototype.
Open-source intent is not an already granted licence. Machine audiences also
have prior-art leads; the current investigation is not a novelty conclusion.
See the expanded [critical review](open-questions.md).

## 9. Proposed next phase and validation

Review this origin draft first, including the proposed schema choices and
licensing boundaries. Then prepare a Phase 1 decision record covering identity,
authority/order, serialization and public/private state. Define canonical
schemas and cross-language vectors only after those decisions; implement the
smallest deterministic replay model with synthetic fixtures. This is a proposal,
not a request to begin implementation or authorize birth now.

Validation performed: all draft Markdown local file links resolve; JSON parses;
required-field references match schema properties; no trailing whitespace or
missing final newline was found. JSON Schema draft 2020-12 conformance and
accepted/rejected instance tests were not run: no existing validator was found
in the checked Python/Node environments. No dependency was installed. The schema
examples describe expected behavior, not executed tests. No runtime, security,
replay or organism conformance is claimed. External links are cited research
sources, not a fully audited or archived corpus.

## 10. Exact proposed first commit message

```text
genesis: declare the protocol origin
```

Do not execute until the creator explicitly approves. No files were staged;
no commit, push, tag, release, deployment or mint was performed.
