# D01 — Layered licensing and rights proposal

STATUS: PROPOSED / RIGHTS-HOLDER ACCEPTANCE REQUIRED, 2026-10-08.
This is a reviewable recommendation, not a licence grant or completed Phase34.
It supplements [D01 research](D01-origin-governance.md), without rewriting it.

## Proposed decision and scope

DESIGN PROPOSAL: use CC BY 4.0 for project-authored prose and Apache-2.0 for
project-authored software and synthetic conformance material. Apply only after
the creator confirms authority to license the covered contributions. Git author
names and public repository access do not establish that authority.

| Covered project-authored material | Proposed licence | Boundary |
| --- | --- | --- |
| Root Markdown documentation; `spec/**/*.md`; `docs/**/*.md`; Markdown documentation under schemas, fixtures and experiments | CC BY 4.0 | Copyright in authored prose only; embedded third-party material retains its own rights/notices. |
| `src/**/*.mjs`, `adapters/**/*.mjs`, `verifier/**/*.py`, executable files under `tools/`, `tests/`, `experiments/`; `schemas/**/*.schema.json` | Apache-2.0 | Reference implementation, verification tools and machine-readable contracts; no endorsement or universal organism identity rights. |
| `package.json`, `requirements.txt`, `requirements.lock`, `.gitignore` | Apache-2.0 | Project-authored configuration only; dependency licences remain independent. |
| Non-Markdown synthetic test data under `fixtures/` and `experiments/results/`, and synthetic demonstration JSON under phase evidence directories | Apache-2.0 | Public software conformance material only; no real organism/private data permission inferred. Preserve external vector attribution and original terms. |
| `organisms/**`, real identity/provenance or private records, artworks/media, project name and marks | No new grant in this proposal | Decide separately when actual material/use exists. Exclusion creates no new exclusive rights over facts, ideas or statutory exceptions. |

This mapping covers only the listed material, not every possible future extension.
New kinds of assets/data require a scoped rights decision rather than automatic
coverage. Official licence texts retain their own terms. Third-party code, vectors,
quotations, dependencies and generated content of uncertain rights are not
relicensed by this mapping. Audit existing source references before activation;
hold any disputed material outside the grant until resolved.

## Basis and alternatives

PRIOR ART / SOURCE FACTS: [CC BY 4.0 legal text](https://creativecommons.org/licenses/by/4.0/legalcode.en)
permits reuse/adaptation with attribution and other stated conditions; patent and
trademark rights are excluded. Its permissions cannot simply be revoked for a
compliant recipient. [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0)
includes copyright and express contributory patent provisions, redistribution
conditions and trademark limits. These are legal instruments, not guarantees of
rights ownership or patent clearance. Official live texts reviewed2026-10-08;
this is not an archived inception-date legal review.

DESIGN RECOMMENDATION: attribution fits the stated origin philosophy for prose;
Apache's explicit contribution/patent terms fit reusable executable contracts.
The shorter [MIT licence](https://opensource.org/license/mit) is a reasonable
software alternative. [CC0](https://creativecommons.org/publicdomain/zero/1.0/legalcode.en)
is a reasonable prose/data alternative when mandatory attribution is unwanted.
Neither is rejected as technically invalid. The recommendation is a maintenance
choice, not legal advice or a claim that open source replaces a patent.

Authenticity, permission to disclose, event authority and copyright are distinct.
A CC/Apache grant cannot make a forged history authentic, authorize private-memory
disclosure, grant organism control, or erase creator attribution from valid history.
No extra custom lineage restriction is appended to either standard licence.

## Activation after rights-holder acceptance

The creator must confirm authority over the covered authored contributions, choose
this mapping (or specify a different one), and authorize its prospective application.
The next change then installs exact official texts at `LICENSES/CC-BY-4.0.txt` and
`LICENSES/Apache-2.0.txt`, records the accepted path mapping in `LICENSE.md`, and
adds an acceptance link to `LICENSE-DECISION.md` and D01. Do not change historical
origin/schema bytes to add headers. Retain notices; add a third-party notice record
where the source inventory requires one. Ambiguous material remains excluded.

Prospective external contributions require a rights statement for the applicable
layer and explicit review; this proposal retroactively licenses no external work.
No CLA service, governance platform or additional execution phase is proposed.
Rights-holder acceptance does not authorize a signed public release or real birth.
D02 authority remains separate. D01 closes for the tested profile only after the
accepted mapping, rights scope and notices have been recorded and checked.

## Minimality / Complexity Justification

Minimum considered: a single standard licence. Rejected because documentation,
software, art and organism records have materially different reuse boundaries.
Retained complexity: two existing standard texts and one explicit scope mapping;
this satisfies the accepted layered-rights requirement without bespoke terms.
Removal test: eliminating a text/mapping loses clear applicable permissions;
adding a licence server, asset registry or custom provenance clause is unnecessary.
New failure modes: overlapping paths, unowned contributions and mistaken data
coverage; explicit exclusions, source inventory and rights-holder confirmation
address them. Demonstrate necessity by checking every tracked covered file against
the mapping and retained third-party notices before activation. No numeric score.

## Requested decision

Accept the proposed scope/texts and confirm authority to license the covered
project-authored contributions, or choose narrower/different terms. Until then,
D01 rights decisions remain OPEN and no licence is applied by this document.
