# Phase 18 specification

Implement exact accepted D13 evidence/admission/derived receipt under encounter-v1.
Current runtime negotiates/expresses but admits only core-v1. Add encounter.mjs
pure validation and receipt.mjs replay view to avoid reverse dependency cycles.
Extend fixed hash domains, origin rules, experience shape, proof-first nonce
deduplication and replay head-only transition; old core never accepts experience.
Store remains the only durable append path. Nonce tuple/evidence equality returns
original accepted ref on exact/rebased retries; reuse with changed evidence rejects.

Source state must be verified before candidate parent; policy/expression recompute;
retained message is mandatory, never fetched/regenerated. Receipt pending=null,
refused=[], accepted=actual refs, no caller-supplied refs. Publish distinct schemas
and public fixture history; independently extend Python verification. Tests include
nonce/source/policy/proof/output/missing bytes, actual store retry/conflict/concurrency,
core-v1 isolation and cross-language matching. No memory/adaptation effect before D08.
