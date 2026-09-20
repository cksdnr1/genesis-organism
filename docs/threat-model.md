# Initial threat model

STATUS: RESEARCH. This records risks and candidate mitigations, not implemented
security controls or a claim that an audit has occurred.

## Assets, actors and boundaries

Protect immutable birth inputs, accepted event history, identity/ancestry,
private memories, signing authority, expression attribution and physical safety.
Potential adversaries include observers, custodians, compromised creators/keys,
body operators, storage providers, network peers and malicious dependencies.
An authorized key may still make false claims or equivocate.

Boundaries: untrusted requests → negotiation; proposals → canonical acceptance;
sensor claims → policy-scoped verification; canonical state → derived expression;
private memory → public commitment; expression → physical actuation. Each needs
explicit authority and validation; a blockchain does not remove these boundaries.

| Threat | Candidate mitigation / test | Residual or unresolved issue |
| --- | --- | --- |
| Forged events / unauthorized mutation | Defined signature domains and authorization at the relevant historical state; reject wrong identity/profile | Signatures do not stop an authorized liar or compromised key |
| Replay / duplicate application | Unique event binding and defined sequence/causality; reject a second application | Exact identity and ordering mechanisms not selected |
| Equivocation / concurrent heads | Detect conflicting authorized successors and define acceptance/finality policy | No global consensus or preferred head assumed |
| History modification / truncation | Validate commitments against independently retained heads; test altered and shortened histories | Valid prefixes hide newer events from isolated verifiers; storage remains necessary |
| Fabricated environmental experience | Preserve claims with evidence/verifier-policy scope; reject unsupported verification assertions | Sensors, witnesses and hardware can be compromised or misleading |
| Fake observers / malicious requests | Treat capabilities as claims; authenticate only where policy requires; bound parsing/rendering | Capability schema does not establish trust or permit actuation |
| Sybil organisms / lineage spam | Resource budgets and verified birth/ancestry references | Admission policy and decentralization tradeoffs unresolved |
| False ancestry / unauthorized reproduction | Verify parent state references, inheritance rules and required consent | Unavailable ancestors or partial transactions may block verification |
| Phenotype substitution / procedure drift | Bind source, negotiation, profile, procedure and output; tamper fixtures | Receipt alone does not prove faithful expression or safe content |
| Key loss / custody theft | Explicit recovery/rotation model; preserve historical key validity rules | Recovery can introduce override authority; no policy selected |
| Private-memory leakage | Minimize public data, access control, encrypted content and scoped commitments | Low-entropy commitments can leak guesses; timing and relationships can leak too |
| Denial of service / unsafe dependencies | Input byte/depth budgets, sandboxing, pinned content, bounded work | Schema field limits alone do not bound total computation |
| Protocol-version confusion | Bind rules to events and refuse unsupported profiles; test downgrade/substitution | Historical interpreters and migration evidence must remain available |
| Unsafe/compromised embodiment | Separate expression from actuation; authenticated bounded commands and independent safety controls | Hardware attestation is not a universal safety or reality proof |

## Verification target

Future security fixtures should include altered genesis, invalid signatures,
wrong authorities, repeated events, competing heads, unknown versions,
unavailable dependencies, false attestation claims and substituted expression
outputs. Assert specified rejection or explicit uncertainty, not invented fixes.
An inability to replay is not automatically proof of tampering; missing data
and authorization restrictions require distinguishable outcomes.

Decide retention and personal-data policy before recording real interactions.
A public digest may still reveal or correlate information. No real private
memory, credentials or sensor traces are included in this conception draft.
