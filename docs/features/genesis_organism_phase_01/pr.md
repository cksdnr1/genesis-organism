## Summary

- Complete execution Phase 1's origin/governance research through mono-spec.
- Present D01 licence options and evidence limits without selecting a licence.

## Why this PR

The creator requested execution of the 38 existing phases with actual validation.
The first phase needs a reviewable rights/governance choice set before downstream work.

## Problem

Origin evidence, licence alternatives and downstream acceptance boundaries existed
in separate planning documents but had no scoped Phase 1 execution result.

## How it was fixed

- `docs/decisions/D01-origin-governance.md` links source facts and separates research
  completion from rights-holder acceptance.
- `docs/features/genesis_organism_phase_01/` records spec, plan, reviews and result.
- Reading evidence leads to a new research artifact and downstream review; no
  organism event, runtime callback, birth or state reset occurs.

## Validation

- `git merge-base --is-ancestor 5f0076280ca4171d54bc9a25a6772d07a10a6d5a 0fd529ee2d8be2db6fa7a8c565ccca776f444527`: passed.
- Python byte comparison of six protected records against baseline: passed.
- Python local-link / D01 authority-marker inspection: passed.
- `git diff --check`: passed. Official licence texts inspected and dated.
- Runtime tests: not applicable to this documentation phase.

## Risks / follow-ups

D01 licensing/freeze authority decisions remain OPEN. Mutable source pages are
not archival evidence; no legal or novelty conclusion. `.playspec/` stays ignored.
Preset origin/master references were resolved to the actual genesis/protocol-origin
base. No automatic merge, new runtime dependency or reusable agent framework.
