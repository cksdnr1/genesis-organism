# Phase36 — Candidate freeze rehearsal

Scope/use case: compute and independently check an explicitly synthetic freeze
from retained raw Git blobs, using accepted D12 and Phase35 audit. No archive,
release/birth runtime until37/38. Existing organism runtime cannot freeze itself.

Facts reviewed: D12-synthetic-ceremony.md exact closed grammar/domains/key/budgets;
src/bytes.mjs canonical/crypto limits, admission.validateOrigin, Python independent
primitives, licence source/rights record and35 birth-evidence matrix.
Source revision entry8c1bdd8; accepted birth/profile prerequisites already audited.

| Structured input | Literal / reuse |
| --- | --- |
| adaptation-v1 origin | synthetic-v1/adaptation-v1, signal0/sequence0 |
| D12 pinned key | d75a980182b10ab7d54bfed3c964073a0ee172f3daa62325af021a68f707511a |
| D12 manifest profile/anchor | ceremony-rehearsal-v1 / skip |
| D03 limits |65536byte,4096node,16depth,256member; unchanged |

Add tools/rehearsal.mjs: manifestFor(revision,candidate), reference(kind,value),
fixtureSign(kind,body), checkFreeze(manifest,freeze,prior=null), readArtifacts(manifest).
Git read uses execFile argument arrays, full validated revision and exact regular
ls-tree blobs; SHA256 raw bytes. fixtureSign is explicitly public TEST1 only.
checkFreeze validates all closed shapes/references/attribution/signature, optionally
prior `{manifest,failure,births}` evidence. Supersession needs failed prior digest
and no supplied accepted birth; no global completeness claim. Nonempty births
reject supersession in this phase. No canonical history changes or private keys.

Independent Python checker reconstructs exact refs/proofs from its own canonical
parser and verifies manifest's selected raw Git bytes without calling JS. These
are live checked-out verifier sources, never execution of archived inputs.
Explicit fixtures/ceremony-v1/artifacts.json fixes selected paths and is itself
included, along with all accepted contracts/schemas/vectors/core/verifier/tests,
toolchain/licences and required control/audit evidence. Max256/32MiB; no globs at
runtime. Do not silently drop evidence to meet limits.

Tests at tests/rehearsal.test.mjs: independent freeze agreement; exact repeated
bytes; alternate key/missing attribution/domain/extra field/path traversal/symlink/
invalid revision/missing required blob/altered hash fail; failed-candidate
supersession references retained prior, missing failure/accepted prior rejected.
Pin a committed implementation revision before producing freeze fixture/result;
do not capture mutable worktree or self-hash new output fixtures.

Output/public entry: CLI `node tools/rehearsal.mjs REVISION` prints only labelled
synthetic manifest/freeze JSON. No disk or #0001 mutation. Rollback new commits;
unknown/error input fails without fallback. Risks: archive retention still pending,
public signer attribution not creator identity, supplied supersession context not
global history. No new dependency/service/profile ontology or extra phase.
