# Phase27 result

Complete bounded ancestry traversal and independent Python manifest verifier now
agree on four nodes/three exact selected-state edges for the committed synthetic
grandchild. Rebuilding is deterministic and original evidence is unchanged. Missing,
private, tampered consent/ref/version, duplicate parents, fake root, mismatched
origin and recursive aliases fail in both implementations, rather than omitting gaps.

Focused four groups pass. Signed chain depth16 succeeds, depth17 fails bounded;
broad authenticated graph exceeds32 nodes and rejects. Python manifest entry budget
also rejects the wide transport before traversal. The preceding full regression
passed36 groups; the added fourth group independently passed afterward. No claim
that malformed alias fixtures constitute a cryptographically valid cycle.

Standalone `verifier/lineage.py fixtures/reproduction-v1/manifest.json` emits the
same graph. Python code reuses its own byte/proof/replay primitives, never JS code.
No persisted graph/index/generation or remote resolver. Cleanup removed an unused
import and replaced locale sorting with direct lexical hex comparison for explicit
cross-platform ordering. Origin/history/schema bytes and #0001 UNBORN preserved.
