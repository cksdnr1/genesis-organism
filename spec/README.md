# Protocol conception draft v0.1

STATUS: RESEARCH / EXPERIMENTAL. This is not a frozen protocol or conformance
claim. The normative invariants below express the creator's established intent;
mechanisms and proposed schema fields remain open. Capitalized MUST, MUST NOT,
SHOULD and MAY express requirements only in explicitly NORMATIVE passages.

## NORMATIVE — Genesis Principles v0.1

1. **Origin:** each born organism MUST have exactly one accepted verifiable origin.
2. **Immutable birth:** the genesis genome and canonical birth record MUST NOT be rewritten.
3. **Continuous existence:** new valid canonical states MUST extend accepted history rather than erase it; history SHOULD be append-only.
4. **Machine-first-class perception:** the protocol MUST treat machine observers as first-class participants rather than only human-rendering tools.
5. **Observer-dependent phenotype:** an organism MAY express different phenotypes for different capabilities; each expression MUST be attributable to its canonical source state.
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
- [Perception](perception.md), [phenotype](phenotype.md).
- [Memory](memory.md), [synapse](synapse.md), [evolution](evolution.md).
- [Reproduction](reproduction.md), [lineage](lineage.md), [embodiment](embodiment.md).

Protocol version, implementation version, organism evolution and organism history
are separate axes. New protocol versions cannot silently reinterpret old events.
Migration authorization, compatibility, and historical interpreter retention are
open questions. Draft v0.1 is a document revision label, not a born-organism
protocol identifier or a promise of semantic-version compatibility.
