# Phase 7 plan

1. Compare Node-only, Python-only and cross-language verifier approaches; select
   Node core and Python independent verifier for the explicit conformance requirement.
2. Pin two Python tool dependencies and exact proposed paths; no install yet.
3. Specify module API/CLI output/error contract and durable no-overwrite directory
   format with ordering, conflict hold, recovery and bounds; no service/deployment.
4. Review graph and each crash/concurrency branch against D04/D05; record limits.

Write docs/decisions/D06-implementation.md and task records. No source modules,
package manifest or lockfile in this phase. Configuration observations are not
canonical input. Corrections preserve prior contracts; no runtime reset/migration.
Exit: explicit paths and evidence plan leave later implementers no architecture
choice. Local docs/byte/link checks, no runtime test claim.
