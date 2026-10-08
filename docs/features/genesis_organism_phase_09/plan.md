# Phase 9 plan

1. Add private ESM package.json with node --test scripts and no dependencies.
2. Implement bounded canonical serialization/parsing and native SHA-256/Ed25519
   proof validation in bytes.mjs, including fixed proof/hash label allow-list.
3. Implement closed origin/event validation and pure classify in admission.mjs;
   trusted historical context is provided only by future replay, never a CLI input.
4. Add test helper for public fixture keys only; tests use committed known answers
   and independent manually derived parent state. Cover D04 order/authority cases.
5. Run Node tests plus existing Python schema/vector checks; repair observed defects,
   keep failure evidence and preserve original byte vectors. No persistence/reducer.

Entry bytes -> strict parse/shape -> historical authority/proof -> classification;
no mutation/callback/storage. Errors fail closed without raw payload disclosure.
Reset only test objects; no history operation. Protected files and dependency-free
runtime are regression checks. Phase 10 will establish the trusted context by replay.
