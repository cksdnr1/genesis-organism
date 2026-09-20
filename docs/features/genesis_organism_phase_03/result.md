# Phase 3 research result

Delivered a concrete D02 recommendation in docs/decisions/D02-identity-authority.md.
STATUS: research ready for review; CREATOR ACCEPTANCE PENDING. Phase 3 decision
exit and Phase 4 entry are not complete merely because this document exists.

Compared origin-bound versus assigned identity, single versus multiple writers,
replicas/children, actor roles, rotation/recovery and compromise. Twelve adversarial
walkthroughs state expected outcomes only. P03-L01 addressed by observed-conflict
halt and explicit no-global-finality/no-compromise-prevention limits.

No keys, real identifiers, schema, runtime, ownership default, licence or birth was
created. Source -> proposal -> creator review is the only implemented path. The
existing spec/plan is the acceptance oracle; D03/D04 are downstream, not silently
chosen. Awaiting the user's synthetic-decision delegation/acceptance answer.

Focused verification: Python byte comparisons for seven protected files, local
links and proposal/authority boundary markers passed. Manual review confirmed all
twelve threat cases distinguish expected outcomes from execution and retain source
invariants. git diff --check passed. No signature/replay runtime tests were run;
no runtime exists and this task does not establish security conformance.

Safe-refactor review against origin/work/phase-02-encounter: Phase 3 proposal and
workflow artifacts only. No local refactor was necessary; no security/negative
case was dropped. Keep research completion separate from decision acceptance.
