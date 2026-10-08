# A01 technical specification

## Scope / use case alignment

An engineer verifying failed-candidate supersession must receive failure when
the predecessor's selected source bytes cannot be verified. Correct the existing
D12 implementation in Phases36–38; do not add an execution phase or consensus field.

## Current implementation and files reviewed

tools/rehearsal.mjs checkFreeze validates prior shape/failure/births only;
readArtifacts already verifies Git-backed raw hashes and explicit selection.
verifier/rehearsal.py independently has the same gap and git_artifacts primitive.
Read D12-synthetic-ceremony.md, audit A01 and tests/rehearsal.test.mjs.

## Structured evidence

| Artifact / key | Exact existing value | Treatment |
| --- | --- | --- |
| D12 prior context | manifest, failure, births | retain closed shape, no new wire fields |
| failure.reason | fixture-failure | retain; local observation only |
| manifest.supersedes | null or predecessor manifest digest | unchanged commitment |
| fixtures/ceremony-v1/artifacts.json | 195 explicit paths at2090fcd | preserve bytes and verify predecessor list equality |
| ceremony profile | ceremony-rehearsal-v1 | unchanged, only public TEST1 authority |

## Active entry points and architecture

JS checkFreeze and dependent archive/release/birth APIs verify superseding prior
with existing readArtifacts after closed-shape/failure/empty births checks.
Python check_freeze invokes independent git_artifacts under equivalent conditions.
Both must fail for unknown revision, changed hash, missing selected blob or list
mismatch, even when successor artifacts and signature are valid. No filesystem
mutation, model/network request or canonical state change occurs during verification.

The Python offline CLI path (bundle plus root) must explicitly reject superseding
manifests BEFORE any Git call. Existing offline archives do not retain predecessor
artifact bytes; shape/digest context cannot replace them. Emit a precise unavailable
predecessor-evidence diagnostic and nonzero exit. Nonsuperseding offline restore
remains fully supported without Git. Do not silently add a Git requirement to that
path. A future offline supersession profile needs retained prior byte evidence;
it is not implemented here. JS supersession verification requires retained Git.

## Verified problems / proposed direction

Both implementations currently accept a zero-revision predecessor. Reusing their
existing raw-file verifiers closes that bypass with no new abstraction. A local
caller-supplied births=[] remains a trust input, not proof of global absence;
no registry or new journal contract is implied. No prior freeze proof was required
by the accepted context, so no extra signature type is invented.

## File-by-file plan / propagation / reset

- tools/rehearsal.mjs: add predecessor raw verification at checkFreeze.
- verifier/rehearsal.py: matching raw check; offline CLI refuses absent evidence.
- tests/rehearsal.test.mjs: valid predecessor positive, unknown revision, altered
  prior hash, missing artifact, list mismatch, absent context and accepted births;
  Python rejection plus no-Git offline supersession refusal.
- docs/decisions/D12-synthetic-ceremony.md and Phase38 runbook: append dated scope
  clarification; retain original prose and historical manifests.

No reset or repair action. Failures leave prior/accepted bytes unchanged. Return
values/domains/hash preimages remain identical for valid unchanged inputs.

## Acceptance and risks

Existing nonsuperseding 195-artifact fixture and independent offline checks pass.
Both live implementations reject each fabricated predecessor case. Offline CLI
refuses supersession with a predecessor-evidence message without Git lookup.
Focused ceremony and full regression pass before publication. Potential cost:
additional bounded Git reads for supersession; no speculative cache. Explicit
offline exclusion is an availability limit, not acceptance of unverifiable history.

## Minimality / reader aids

Minimum: one existing verifier call in each implementation plus one offline guard.
Removing checks restores A01. No dependencies, state, core domains, schema changes,
real key, origin rewrite or birth. Original Total Spec/Phase Plan are the oracle.
