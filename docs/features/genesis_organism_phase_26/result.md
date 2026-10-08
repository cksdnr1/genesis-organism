# Phase26 result

Added direct child packet validation, additive consent/hash domain and guarded
publishChild/loadChild using existing durable exclusive-link/fsync primitive.
One/two/four selected parents consent over the exact child body; floor inheritance
and new origin binding are verified. Public fixtures retain unchanged roots and
child/grandchild signals1. No runtime signer or parent mutation.

Focused three groups passed; full npm test33 groups and Python schema checks8
passed. Actual file-publication fault injection leaves an incomplete child
unavailable; identical retry completes it. Wrong origin/sidecar preserves existing
files, partial marker remains unavailable. Invalid consent/order/ref/proof/version
and missing resolver evidence reject. No incomplete child is counted as offspring.

Cleanup retained one pure validator and existing store primitive; no extra storage
framework. Full ancestry/independent graph validity is not claimed until Phase27.
Historical schemas/fixtures, origin records and #0001 UNBORN unchanged.
