# Genome and evolving state

STATUS: RESEARCH. **NORMATIVE:** the original genesis genome MUST NOT be mutated
in place. Evolution and inheritance MUST preserve the birth input and its history.

The working decomposition separates immutable GenesisGenome, current
EvolutionState, potentially inheritable HeritableState, expression, and memory.
These are conceptual boundaries; no byte representation or biological mechanism
is implied. No final genome for #0001 exists in this draft.

**OPEN QUESTIONS:** is the genome declarative configuration, executable rules,
or references to content? Which components are canonical, private, derived or
heritable? How are referenced dependencies made available over decades? Can
private inputs permit public replay of only a projection? How are executable
components sandboxed and version-pinned?

Before schema freeze, define each field's meaning, bounds and validation;
separate content digests from retrieval hints. Do not accept opaque executable
payloads as a substitute for defined transition semantics.

## Bounded synthetic state boundary — 2026-10-08

[D09](../docs/decisions/D09-adaptation.md) distinguishes the immutable birth
genome.signal from the replay-derived current signal. Only current verified signal
is an eligible inheritance input, pending D10's separate consent/birth contract.
No additional HeritableState wrapper, copied memory or private-data semantics are
required by this experiment. This defines no final genome for GENESIS #0001.
