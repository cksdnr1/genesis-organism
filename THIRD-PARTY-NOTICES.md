# Source and third-party rights inventory

Reviewed2026-10-08 before applying the accepted layered project licence.
This inventory supplies source attribution, not a blanket third-party grant.

- Public Ed25519 TEST1/TEST2 numerical key material originates in
  [RFC8032 section7.1](https://www.rfc-editor.org/rfc/rfc8032.html#section-7.1),
  by Simon Josefsson and Ilari Liusvaara. Existing producers and fixture READMEs
  identify it; those attributions are retained. The RFC's own copyright/legal
  provisions govern its material. No RFC reference implementation code is bundled;
  the project calls cryptography/Node primitives. Test keys are public, never real
  identity credentials. New project-specific signatures/data do not make them
  real identities or relicense the RFC itself.
- Documentation quotes and cited prior work retain their source authorship and
  original rights. The grant covers project-authored prose, not the referenced
  papers, artworks, standards or websites. Full source links remain in the ledger
  and decision records; citation is not a claim of permission to relicense them.
- Node uses built-ins; no npm dependency is bundled. Python dependencies named in
  requirements files are installed separately, not relicensed by this repository.
  Their distributions and notices remain subject to their own terms. Rehearsal
  archives must distinguish project sources from separately acquired dependencies.
- `LICENSES/CC-BY-4.0.txt` and `LICENSES/Apache-2.0.txt` are unmodified copies
  from the official Creative Commons and Apache endpoints listed in D01's
  proposal. These legal instruments are not project-authored prose.

Inspection: tracked paths, executable imports, fixture producer comments/READMEs,
and documentation source references. No bundled third-party implementation was
identified in that inspection. This is not a comprehensive legal provenance audit.
Uncertain external material is excluded from the project grant, pending separate
rights verification. No contributor identity is inferred merely from Git metadata.
