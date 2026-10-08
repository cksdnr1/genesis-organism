# Phase25 plan

1. Specify exact D10 body/packet/signatures, parent ordering/bounds, selected
   adaptation state eligibility, deterministic inheritance and child binding.
2. Define validation/traversal interfaces, resource/cycle/version/private-input
   errors, immutable-parent boundary and identity vs ancestry distinction.
3. Define resumable identical publication using existing exclusive-link primitive;
   partial publication never establishes accepted offspring. No parent writes.
4. Specify Phase26/27 synthetic vectors/adversaries and independent Python path;
   update dated spec links and check invariants/paths. Commit/push existing PR6.

Prose only; runtime tests are deferred until implementation. New domain is
justified by consent replay protection; no arbitrary graph state or generation.
Rollback additive correction, never rewrite origin or claim an incomplete child.
