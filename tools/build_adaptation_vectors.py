"""Create only new public synthetic D09 vectors; never overwrite committed history."""
import copy
import json
from pathlib import Path
import sys
from cryptography.hazmat.primitives.asymmetric.ed25519 import Ed25519PrivateKey

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "verifier"))
from verify import canonical, digest, expression_result, origin_state, verify_directory


def main():
    schemas = ROOT / "schemas/synthetic/adaptation-v1"
    output = ROOT / "fixtures/adaptation-v1"
    if schemas.exists() or output.exists():
        raise SystemExit("refusing to overwrite existing schema/vector evidence")
    schemas.mkdir(parents=True)
    output.mkdir(parents=True)
    old_id = "https://github.com/cksdnr1/genesis-organism/schemas/synthetic/encounter-v1/"
    base_id = old_id.replace("encounter-v1", "adaptation-v1")
    for name in ("origin", "state", "event", "evidence"):
        schema = json.loads((ROOT / f"schemas/synthetic/encounter-v1/{name}.schema.json").read_text())
        schema["$id"] = base_id + name + ".schema.json"
        if name in ("origin", "state"):
            props = schema["properties"]["body"]["properties"] if name == "origin" else schema["properties"]
            props["rules"]["const"] = "adaptation-v1"
        elif name == "event":
            schema["properties"]["body"]["oneOf"] = [branch for branch in schema["properties"]["body"]["oneOf"] if branch["properties"]["kind"]["const"] != "signal-v1"]
        else:
            for field in ("observer", "policy"):
                schema["properties"][field]["$ref"] = old_id + field + ".schema.json"
        (schemas / f"{name}.schema.json").write_text(json.dumps(schema, indent=2) + "\n")
    key = Ed25519PrivateKey.from_private_bytes(bytes.fromhex("9d61b19deffd5a60ba844af492ec2cc44449c5697b326919703bac031cae7f60"))

    def signed(kind, body):
        return {"body": copy.deepcopy(body), "signature": key.sign(f"genesis-organism/synthetic-v1/{kind}-proof\0".encode() + canonical(body)).hex()}

    body = json.loads((ROOT / "fixtures/encounter-v1/origin.json").read_text())["body"]
    body.update(rules="adaptation-v1", birth="fixture-adaptation-001")
    origin = signed("origin", body)
    (output / "origin.json").write_bytes(canonical(origin))
    (output / "SYNTHETIC").write_text("genesis-organism synthetic-v1\n")
    state = origin_state(origin)
    template = json.loads((ROOT / "fixtures/encounter-v1/000001.json").read_text())["body"]["data"]["evidence"]
    prefixes = [verify_directory(output)]
    for sequence, target in enumerate((2, 1, 3, 3), 1):
        evidence = copy.deepcopy(template)
        evidence.update(nonce=f"trial-{sequence}", sourceState=state,
                        expression=expression_result(state, evidence["observer"], evidence["policy"]),
                        interaction={"motif": target, "message": f"PUBLIC SYNTHETIC TASK TARGET {target}"})
        event = signed("event", {"profile": "synthetic-v1", "organism": state["organism"], "sequence": sequence,
                                 "previous": state["head"], "kind": "experience-v1", "data": {"evidence": evidence}})
        (output / f"{sequence:06}.json").write_bytes(canonical(event))
        result = verify_directory(output)
        assert result["state"]["signal"] == target
        prefixes.append(result)
        state = result["state"]
    (output / "expected.json").write_bytes(canonical({"targets": [2, 1, 3, 3], "prefixes": prefixes}))


if __name__ == "__main__":
    main()
