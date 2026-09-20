# Memory

STATUS: RESEARCH. Memory may retain or derive representations of experience;
an event log and a memory model are not interchangeable. Summaries can be lossy
and model-dependent even when event replay is deterministic.

**Proposed separation:** public canonical records, private/encrypted content,
local operational memory, and derived summaries. Classification is not yet
assigned to fields. Derived summaries must not silently become authoritative
accounts of past events.

**OPEN QUESTIONS:** consent, encryption/key rotation, retention and deletion,
commitment leakage, data availability, and which observers can access which
projection. A commitment can bind private bytes without permitting public
replay of state that depends on those bytes. Decide whether replay is public,
authorized-only, or of a defined public projection before claiming conformance.

Avoid publishing personal data into permanent history by default. Erasing a
private key may reduce accessibility but does not erase already disclosed data
or public commitments. No private-memory mechanism is implemented here.

## Encounter provenance

Admitted [encounter](encounter.md) experience can update defined projections;
private interaction evidence need not be publicly disclosed. Receipt links bind
the causal input without making its contents true or globally replayable. D08
must demonstrate a later expression effect against a no-experience control and
distinguish lossy summaries from accepted canonical input bytes.
