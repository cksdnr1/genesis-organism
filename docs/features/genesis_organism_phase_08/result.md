# Phase 8 result

Created four closed synthetic core schemas, nine literal valid byte cases, fourteen
invalid raw-wire cases, signed origin/three-event history and expected state/hash.
Builder uses only published RFC test seeds; no real keys or organism. Original
observer/phenotype JSON remains unchanged. Schema README states UTF-8 and lexical
integer limits outside schema validation.

Installed approved tooling in ignored .venv; requirements.lock records eight resolved
packages (two direct dependencies). Reference runtime has no added package dependency.
Six standards/vector tests pass, including RFC 8032 known answer and wrong-domain
signature rejection. Phase 9 must actually exercise raw parser rejection; this
phase does not claim a reference runtime or independent replay implementation.

Focused exit evidence: six tests pass; fixture regeneration byte-equal; independent
Node SHA-256 origin/state computation matches Python-produced expectations;
protected bytes and whitespace pass. Safe-refactor review preserved distinct
fixture producer versus future verifier and added explicit schema-limit warnings.
No raw-parser test is falsely reported as executed. PR #6; no generic framework.
