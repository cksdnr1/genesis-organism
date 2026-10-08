import copy
import json
from pathlib import Path
import sys

from cryptography.hazmat.primitives.asymmetric.ed25519 import Ed25519PrivateKey

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "verifier"))
from verify import canonical, digest, expression_result, origin_state, verify_directory


def closed(properties):
    return {"type": "object", "properties": properties, "required": list(properties), "additionalProperties": False}


def main():
    directory = ROOT / "schemas/synthetic/encounter-v1"
    directory.mkdir(parents=True, exist_ok=True)
    base_id = "https://github.com/cksdnr1/genesis-organism/schemas/synthetic/encounter-v1/"
    schemas = {}
    for name in ("origin", "state", "event"):
        schema = json.loads((ROOT / f"schemas/synthetic/core-v1/{name}.schema.json").read_text())
        schema["$id"] = base_id + name + ".schema.json"
        if name != "event":
            properties = schema["properties"]["body"]["properties"] if name == "origin" else schema["properties"]
            properties["rules"]["const"] = "encounter-v1"
        schemas[name] = schema
    reference = {"type": "string", "pattern": "^[0-9a-f]{64}$", "maxLength": 64}
    selection = closed({"version": {"const": "negotiation-v1"}, "sourceStateRef": reference,
                        "observerProfileCommitment": reference, "accessPolicyCommitment": reference,
                        "profile": {"enum": ["text-v1", "symbols-v1", "path-v1"]},
                        "procedure": {"const": "expression-v1"}})
    signal = {"type": "integer", "minimum": 0, "maximum": 255}
    outputs = [closed({"kind": {"const": "text-v1"}, "signal": signal, "text": {"type": "string", "maxLength": 10}}),
               closed({"kind": {"const": "symbols-v1"}, "signal": signal,
                       "symbols": {"type": "array", "minItems": 2, "maxItems": 2, "items": signal}}),
               closed({"kind": {"const": "path-v1"}, "signal": signal, "frame": {"const": "fixture-plane-v1"},
                       "unit": {"const": "mm"}, "points": {"type": "array", "minItems": 2, "maxItems": 2,
                       "items": {"type": "array", "minItems": 2, "maxItems": 2, "items": signal}}})]
    evidence = closed({"version": {"const": "evidence-v1"},
                       "nonce": {"type": "string", "pattern": "^[a-z0-9-]{1,128}$", "maxLength": 128},
                       "sourceState": {"$ref": "state.schema.json"}, "observer": {"$ref": "observer.schema.json"},
                       "policy": {"$ref": "policy.schema.json"},
                       "expression": closed({"selection": selection, "output": {"oneOf": outputs}}),
                       "interaction": closed({"motif": {"type": "integer", "minimum": 0, "maximum": 3},
                                              "message": {"type": "string", "maxLength": 256}})})
    evidence.update({"$schema": "https://json-schema.org/draft/2020-12/schema", "$id": base_id + "evidence.schema.json"})
    schemas["evidence"] = evidence
    branch = copy.deepcopy(schemas["event"]["properties"]["body"]["oneOf"][0])
    branch["properties"]["kind"] = {"const": "experience-v1"}
    branch["properties"]["data"] = closed({"evidence": {"$ref": "evidence.schema.json"}})
    schemas["event"]["properties"]["body"]["oneOf"].append(branch)
    for name, schema in schemas.items():
        (directory / f"{name}.schema.json").write_text(json.dumps(schema, indent=2) + "\n")

    output = ROOT / "fixtures/encounter-v1"
    output.mkdir(parents=True, exist_ok=True)
    key = Ed25519PrivateKey.from_private_bytes(bytes.fromhex("9d61b19deffd5a60ba844af492ec2cc44449c5697b326919703bac031cae7f60"))

    def signed(kind, body):
        return {"body": body, "signature": key.sign(f"genesis-organism/synthetic-v1/{kind}-proof\0".encode() + canonical(body)).hex()}

    body = json.loads((ROOT / "fixtures/core-v1/origin.json").read_text())["body"]
    body.update({"rules": "encounter-v1", "birth": "fixture-encounter-001"})
    origin = signed("origin", body)
    state = origin_state(origin)
    observer = {"version": "observer-v1", "observerType": "language-mock", "subject": "mock-one",
                "capabilities": {"symbols": {"supported": True, "evidence": "claimed"}}}
    policy = {"version": "policy-v1", "allow": ["text-v1", "symbols-v1", "path-v1"], "disclosure": "public-synthetic"}
    evidence = {"version": "evidence-v1", "nonce": "visit-one", "sourceState": state,
                "observer": observer, "policy": policy, "expression": expression_result(state, observer, policy),
                "interaction": {"motif": 2, "message": "PUBLIC SYNTHETIC CAPTURED INPUT"}}
    event = signed("event", {"profile": "synthetic-v1", "organism": state["organism"], "sequence": 1,
                             "previous": state["head"], "kind": "experience-v1", "data": {"evidence": evidence}})
    (output / "SYNTHETIC").write_text("genesis-organism synthetic-v1\n")
    for name, value in (("origin.json", origin), ("000001.json", event)):
        (output / name).write_bytes(canonical(value))
    (output / "expected.json").write_bytes(canonical(verify_directory(output)))


if __name__ == "__main__":
    main()
