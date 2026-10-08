# Measured local runtime/dependency retention and restore

This is an actual owned local **synthetic** recovery experiment, not actual #0001
archive, external publication, independent witnessing or long-term availability.
Source restored by sole Git owner from a verified bundle at full commit
`68f4d395f471995c90be58c25b88f592aadf2f96`. Retained trial root is
`/private/tmp/genesis-birth-recovery-68f4d39`; do not mistake temporary path presence
for a durable retention service. Compact measured records and raw-log digests are
in runtime-restore-results.json; full inventories/logs remain at that trial root.

The reviewer retained25 public Homebrew package roots containing14624 regular
file/symlink entries and318,589,589 raw regular-file bytes, plus8 pinned dependency
wheels. Recursive Mach-O dependency inspection resolved public Homebrew libraries;
system macOS libraries/frameworks were explicitly recorded as external. A second
copy's14624 inventory entries matched original raw hashes/link targets with zero
mismatches. Full package directories retain their supplied notice/licence files.

Copied Node reports25.9.0; copied Python reports3.14.7. Loader logs establish
execution using restored Homebrew libraries, with zero original `/opt/homebrew/`
library loads in the measured commands. PYTHONHOME points to the restored Python
framework; installed cryptography/jsonschema and all8 exact pinned versions load
from the owned restored dependency site. Runtime symlinks retain original link
bytes and may contain original absolute paths; execution needs the recorded
restored PYTHONHOME/DYLD paths and verified loader behavior. No claim of blind
relocation without those settings is made.

Actual network denial used macOS sandbox-exec `(deny network*)`. A socket probe
failed with errno1/Operation not permitted. Offline wheel installation from local
bytes succeeded with `--no-index --no-cache-dir --target` in owned scratch, using
the restored Python and its retained bundled pip wheel. Initial ensurepip failed
because of the distribution's externally-managed policy; failure logs were
preserved, no override or system mutation was used. macOS protected system
executables strip DYLD environment variables: corrected invocation applies env
assignments **after** the sandbox-exec boundary. The final successful offline
installation retained1746 loader-log lines with zero original Homebrew loads.

Using the freshly restored source and the second verified dependency installation,
network-denied Python schema vectors, successor schema vectors and independent
causal audit passed. The causal audit reproduced12 views with before grammar
`[0,64,128,255]` and treatment `[128,255,0,64]`. Each check retained actual loader
logs and zero original Homebrew loads. These prove same-host recovery of the
tested public mechanism; they do not assign candidate history or authority.

The full Node test suite completed under network denial using copied Node/Python
and restored pinned dependencies:61tests passed, zero failed/skipped,246300ms.
Exact commands, full stdout/stderr and their digests are retained. This full-suite
run used the first offline-installed dependency site; the separate schema/causal
checks above used the second installation whose retained-runtime loader was
explicitly verified. Both installations use the same8 pinned retained wheels.

Reproduction support: runtime-retention-experiment.py performs fail-closed new
retention only, without overwriting an existing retained root;
runtime-restore-checks.py checks an already restored root, raw inventory, exact
versions, schemas and causal evidence. Source-bundle cloning/checkouts remain the
sole Git owner's responsibility. No real signing, private-key search, runtime
activation or system package/configuration mutation occurred.

Limits: same macOS arm64 host and its OS loader/frameworks; system Git and
sandbox-exec are host dependencies. This is not another-machine/OS portability,
power-loss/media-failure testing or geographically independent storage. Full
toolchains/OS distributions and ongoing archival responsibility remain separate
reviewed choices. Measured runtime size exceeds the small32MiB source-preparation
budget; runtime/dependency retention therefore needs its own measured inventory
and cannot be silently omitted or claimed to fit that source bound.

## Measured distribution packaging addendum

The already retained public runtime,8 wheels and exact runtime inventory were
packed in owned scratch as `runtime-distribution.tar.gz`:99,283,976bytes,
SHA256 `131fb2233ce7ea200e5ef492fd31a1a0daa173f3929089fb2f9ffd0ad2be641d`.
This is one selected distribution artifact, below the proposed256MiB per-file and
1GiB aggregate distribution budgets; the inner expanded14,624runtime entries are
not misrepresented as fitting a1,024-file outer inventory. The archive contains
15,805inner members including directories, inventory and wheels.

Actual extraction into fresh owned `runtime-bundle-extracted` completed after
checking member paths, kinds and absence of symlink-ancestor writes/hardlinks.
All14,624runtime entries match known raw hashes/link targets, all8 wheels match,
and extracted inventory raw bytes match. Absolute symlink target bytes remain
preserved and were not traversed during extraction. No new test suite, actual
candidate operation or portability claim follows from packaging. Exact measured
facts are retained in runtime-packaging-results.json and runtime-restore-results.json.
