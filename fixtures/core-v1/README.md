# Public synthetic core-v1 test vectors

NEVER use these keys for real identities or confidential material. Test seeds are
public RFC 8032 section 7.1 values, recorded in tools/build_vectors.py. This is not
GENESIS #0001, a token, real birth or private interaction.

origin.json and 000001.json–000003.json are exact canonical envelopes without
newlines. History is signal 42, authority rotation, signal 7; expected.json records
the contract-derived state and domain commitments. bytes.json supplies nine literal
canonical cases and fourteen invalid raw-wire cases as hex. It is a test corpus,
not an organism payload. Later parser tests must reject every invalid case.

Rebuild: `.venv/bin/python tools/build_vectors.py`.
Validate schema/proofs/known answers: `.venv/bin/python tests/schema_vectors.py`.
Producer is not an independent replay verifier; Phase 13 must supply that separately.
