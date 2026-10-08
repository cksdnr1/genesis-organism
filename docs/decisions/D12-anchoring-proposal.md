# D12 — anchoring subset proposal

STATUS: PROPOSED / CREATOR ACCEPTANCE PENDING, 2026-10-08.
Phase32 research artifact, not accepted decision or passed execution gate.
[Delegation](2026-10-08-synthetic-delegation.md) explicitly excludes D12.
No actual freeze/release/birth, licence choice, transaction or external action.

## Concrete recommendation

Select **SKIP external anchoring for the current bounded public synthetic profile**.
If the creator accepts this subset, record Phase33 as deliberately skipped, with
no adapter/module/dependency/schema/event/phase introduced. Retain all canonical
bytes, commitments, negative tests and independent verification. Do not claim an
external timestamp, global latest head or durable independent witness.

This is not permanent rejection of anchoring. A later accepted requirement may
justify a separate optional adapter/profile, with exact trust/recovery/version
contract before code. D12 ceremony and D01 rights/licensing remain separately open.

## Facts, prior art and limits

FACT: existing JS/Python verifiers reproduce canonical states and commitments;
retained public fixtures/experiment archives contain needed replay bytes. Local
store tests detect alteration/conflict and preserve evidence, with expected-head
checks when the verifier knows a head. No independent head publication/witness or
real long-term archival infrastructure has been demonstrated by these tests.

PRIOR ART: [RFC9162 CTv2](https://www.rfc-editor.org/rfc/rfc9162.html), an
Experimental RFC, specifies Merkle inclusion/consistency and signed tree-head
mechanisms for certificate transparency. This is a reference for proof/trust
separation, not a selected Genesis CT integration.
[IPFS persistence documentation](https://docs.ipfs.tech/concepts/persistence/) distinguishes content addressing
from retention/pinning. A digest/address does not by itself retain replay bytes.
Sources reviewed2026-10-08, not evidence of a deployed Genesis service or a complete
2026-09-20 historical survey. No blockchain standard or adapter is selected.

## Placement and alternatives

| Option | Property considered | Current disposition / limits |
| --- | --- | --- |
| Existing local signed history | exact byte integrity, historical authority, deterministic replay | sufficient for accepted synthetic experiments; known-head verification required for truncation detection |
| Replicated/content-addressed archive | retain/retrieve bytes and check integrity | future operational retention choice; no service/deployment or durability claim selected |
| Independent witness/transparency | additional observation of history heads/consistency under named trust policy | deferred until accepted external-publication experiment; no universal latest-head guarantee inferred |
| Optional blockchain commitment | potential additional head-publication evidence under a selected chain/finality/availability policy | deferred; no current requirement justifies wallet/node/contracts/reorg/fee/custody dependencies |

Current public scope: synthetic origins/events/consent packets/experiment archives.
No real private memory or encrypted data is supported. Local scratch simulation
state is derived/transient. No NFT/token custody is universal identity or authority.
No on-chain payload, chain, gas cost or finality number is invented.

## Adversarial comparison (tabletop, not adapter tests)

| Scenario | Existing evidence / remaining limit | Optional anchoring cannot silently change |
| --- | --- | --- |
| Required archive unavailable | explicit unavailable; retained hash cannot replay missing bytes | an anchor doesn't restore bytes by itself |
| Valid but stale prefix/head | known expected head detects mismatch; an isolated unknown-head verifier cannot infer newer history | witness/chain needs an accepted latest-head trust/finality policy |
| Hypothetical chain reorg/outage | core has no chain dependency, so replay/authority unaffected | any future adapter must report/recover external observation separately; never rewrite canonical history |
| Hypothetical token transfer/burn | no current token exists | neither operation rewrites creator/genesis or automatically grants authority/death |
| Signed unverifiable sensor claim | scoped claim, not attested reality | immutable publication is not proof the sensed fact occurred |
| Compromised authorized key | signatures may validate malicious authorized claims | anchoring alone does not repair truth/authorization or erase prior valid evidence |

No claim of empirical reorg/token testing is made: there is no adapter/token.
Existing tested core-only behavior supports the skip recommendation.

## Minimality / Complexity Justification

Minimum is current local commitments plus retained bytes and independent verifier.
No new mechanism required for the accepted experiment. Reject speculative chain,
NFT, witness/Merkle/archive service abstractions as future needs, not present
requirements. Retain original history and all security/negative/causal evidence.
Removal of those would break verifiability; removal of a nonexistent anchoring
adapter breaks no accepted capability. New dependency/failure modes avoided:
external availability, finality/reorg policy, credentials, fees and privacy linkage.
No numeric complexity score. Necessity can be revisited only against a concrete
accepted publication/interoperability/security experiment, with evidence.

## Exact unresolved creator gates

1. Accept or reject this SKIP anchoring subset. Until accepted, Phase32 execution
   exit remains pending and Phase33 skip is merely proposed.
2. D01 remains RESEARCH COMPLETE / RIGHTS-HOLDER DECISIONS OPEN. Its original
   path/layer licence and rights/authority choices are not delegated or inferred
   from public Git visibility. Phase34 requires accepted D01 for the tested profile.
3. D12 ceremony is not specified/accepted by this anchoring subset. Phase34 must
   obtain explicit creator acceptance before audit/rehearsals35–38. Actual actions
   would still require separately scoped authorization; all rehearsal objects must
   stay synthetic and GENESIS #0001 UNBORN.

Completing a mono-spec research workflow, passing code tests or merging a PR does
not close any of these gates. No original birth requirement is waived.

## Subsequent creator acceptance — 2026-10-08

The creator has now accepted this proposal's current synthetic-profile SKIP subset;
see [dated acceptance](2026-10-08-anchoring-skip-acceptance.md). The pending language
above preserves the proposal's pre-acceptance state. D01 rights/licence and D12
ceremony remain open; no actual freeze/release/birth is authorized.
