0. Readiness score
- Score: 95/100
- Why: Exact contextual mapping, exception type, files and negative outcomes fixed; operator self-review only, not measured conformance or independent human approval.

1. Final verdict
- Verdict: approved for PM-01.
- Blockers: none.
- Medium/low risks: narrow corpus does not establish universal diagnostics; explicitly limited.
- Implementation gaps: scoped Python handler and retained-vector regression not yet implemented.
- Open questions: real birth and wider profiles deferred, not needed here.
- Architecture/diagram concerns: existing call chain sufficient; no diagram/new layer.
- One-line conclusion: Correct the independent fidelity boundary without changing acceptance or permissions.

2. Boundary summary
- Goal: consistent rejection code for submitted evidence.
- In/out of scope: Python evidence_id, conformance tests and dated D13/status/task records; no wire/state/schema/runtime architecture change; one explicit archive test-input entry.
- Dependencies/deferred: accepted D05–D07/D13, A02 mapping, retained twelve negatives; real/private profiles deferred.
- Boundary drift: none; existing Phase13/18 correction.
- Layers/dependency direction: CLI -> independent parse/proof/evidence -> expression fidelity -> error; no reverse/cyclic import.
- Cross-boundary interfaces: unchanged stderr.error/status and reference boolean fidelity.
- Layer-local concrete classes: existing Invalid, no new abstraction.
- Architecture migration/build-boundary dependency: no.

3. Solid parts
- Already coherent and safe: canonical/proof inputs unchanged; envelope version and global budget checks remain outside catch; independent raw-directory entry verified.

4. Risks and questions
- Item: Flattening unrelated failures could hide unauthorized/unavailable/limit distinctions.
- Classification: addressed in spec, not unresolved.
- Why: global catches would weaken D05 diagnostics.
- Smallest safe fix/action: except Invalid only around expression_result in evidence_id; test standalone negotiation and envelope version separately.

5. Architecture and E2E review
- Layer legality: independent Python code remains independent.
- Interface/concrete clarity: fidelity invalid differs from direct negotiation unsupported/unauthorized.
- State/persistence clarity: neither failure is accepted; new test checks append leaves bytes unchanged.
- Reset/clear clarity: only owned scratch cleanup, never retained history.
- Mutation boundary clarity: named code/test/prose files; retained failed corpus immutable.
- Build workaround risk: none; installed environment only.
- Diagram result: none needed for one call boundary.
- Missing verification chains: none planned for this bounded correction.
- Required spec statements: no real readiness or universal taxonomy claim.

6. Test and acceptance review
- Existing tests relevant to this spec: conformance/perception/encounter and full ceremony suite.
- Missing required tests: retained12 vectors plus direct negotiation and no-write checks; specified before implementation.
- Acceptance criteria quality: literal expected outcomes independent of implementation agreement.
- User-visible verification: Python CLI rejection matches JS classification, while standalone errors remain useful.
- Regression coverage needed: pre-fix failing test, focused checks, committed-head full suite and schema/causal verification.

7. Patch-ready ledger
- Risk ID: PM01-boundary
- Classification: resolved planning risk.
- Target section: spec contract boundary.
- Problem: diagnostics differ by validation context.
- Patch action: documented Invalid-only fidelity normalization with explicit outcomes.
- Patch intent: preserve acceptance/security and independent error conformance.
- Keep active?: no.

8. Final readiness
- Safe to implement now: yes after implementation-plan gate.
- Minimum remaining spec work: none.
- Must not carry unresolved: no broad catch, private disclosure fallback, mutable failed evidence or universal conformance claim.

9. PlaySpec feedback signal

```playspecFeedback
sourcePhaseId: tech_spec_validate
evaluatedArtifactPhaseId: tech_spec_draft
evolutionTargetPhaseId: tech_spec_draft
score: 95
approval:
  threshold: 95
  result: approved
feedback:
  threshold: 90
  result: positive
cause:
  category: artifact_quality_issue
  confidence: high
  summary: Contextual envelope diagnostics and standalone authorization remain distinct.
promptEvolution:
  targetType: workflow_prompt_template
  guidance: State the exact exception boundary and retain literal negative outcomes.
workflowSource:
  kind: bundled_preset
  root: src/preset/assets/workflows/mono-spec
  rootPathKind: package_relative
  packageName: playspec
  presetId: default
  version: 1
target:
  path: tech_spec_draft.md
  pathKind: workflow_relative
  writable: false
targetWritable: false
targetPath: src/preset/assets/workflows/mono-spec/templates/tech_spec_draft.md
summary: Preserve contextual diagnostics and accepted byte behavior.
dedupeFieldValues:
  targetType: workflow_prompt_template
  targetGuidanceSection: evidence-diagnostic-boundary
  causeCategory: artifact_quality_issue
  suspectedCause: nested-error-boundary-ambiguity
  suggestedChangeFingerprint: invalid-only-expression-fidelity-normalization
```

Amendment re-review: the retained corpus is a required new regression dependency.
One sorted selection-list entry plus inclusion assertion is the minimum archive
closure fix, with historical manifests and failed JSON unchanged. List count196
is operational evidence, not a protocol field. Score remains95, no unresolved
blocker; this is operator self-review, not independent human approval.
