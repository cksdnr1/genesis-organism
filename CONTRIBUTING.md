# Contributing to the conception draft

STATUS: RESEARCH / EXPERIMENTAL. Licensing is unresolved; see
[the decision record](LICENSE-DECISION.md). Resolve contribution permissions
before accepting external contributed material. Do not assume an implicit
licence or contributor agreement.

Distinguish FACT, PRIOR ART, DESIGN DECISION, HYPOTHESIS, OPEN QUESTION, and
SPECULATION. Cite primary sources, report inaccessible sources, and keep claims
narrow. Use NORMATIVE only for established invariants; proposals are reviewable
and may change. Do not describe this draft as an interoperable standard.

Preserve meaningful origin history and correct it through new attributed
changes. Do not casually squash, rebase away, force-push, or destroy it. Review
protocol changes separately from implementation updates and organism events.
Never manually rewrite a born organism's canonical history to match new code.

Before implementation, settle the Phase 1 questions in
[the research roadmap](docs/open-questions.md). No dependencies, implementation,
reproduction, lifecycle death, deployment, minting, tokenomics, or marketplace
belongs in this initial patch. Keep #0001 UNBORN.

For documentation changes, check local links, claim labels, source attribution,
and consistency with birth gates. For schema changes, check the selected schema
dialect and illustrative accepted/rejected cases; syntactic validation is not
protocol conformance. Future implementation work needs cross-implementation
vectors, malformed-input cases, and replay/authorization tests.

The creator requested that this initial draft stop before commit, push, tag,
release, deployment, or minting. The proposed first commit message is
`genesis: declare the protocol origin`; explicit creator approval is still
required before executing it.
