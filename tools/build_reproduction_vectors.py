"""One-time public synthetic D10 evidence, not a runtime breeding/signing API."""
import copy
import json
from pathlib import Path
import sys
from cryptography.hazmat.primitives.asymmetric.ed25519 import Ed25519PrivateKey

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "verifier"))
from verify import canonical, digest, origin_state


def main():
    directory = ROOT / "fixtures/reproduction-v1"
    if directory.exists():
        raise SystemExit("refusing to overwrite lineage evidence")
    directory.mkdir()
    key = Ed25519PrivateKey.from_private_bytes(bytes.fromhex("9d61b19deffd5a60ba844af492ec2cc44449c5697b326919703bac031cae7f60"))

    def signature(kind, body):
        return key.sign(f"genesis-organism/synthetic-v1/{kind}-proof\0".encode() + canonical(body)).hex()

    def origin_for(body):
        return {"body": copy.deepcopy(body), "signature": signature("origin", body)}

    template = json.loads((ROOT / "fixtures/adaptation-v1/origin.json").read_text())["body"]
    records = {}

    def put(name, origin, lineage):
        organism = digest("origin", origin["body"])
        records[organism] = {"origin": origin, "events": [], "lineage": lineage}
        target = directory / name
        target.mkdir()
        (target / "SYNTHETIC").write_text("genesis-organism synthetic-v1\n")
        (target / "origin.json").write_bytes(canonical(origin))
        if lineage is not None:
            (target / "lineage.json").write_bytes(canonical(lineage))
        return organism

    roots = []
    for signal in (0, 2):
        body = dict(template, birth=f"fixture-parent-{signal}", genome={"signal": signal})
        roots.append(put(f"parent-{signal}", origin_for(body), None))

    def child(name, ids):
        states = [origin_state(records[organism]["origin"]) for organism in sorted(ids)]
        signal = sum(state["signal"] for state in states) // len(states)
        assert signal == 1
        body = {"version": "reproduction-v1", "nonce": name,
                "parents": [{"organism": state["organism"], "stateRef": digest("state", state)} for state in states],
                "authority": template["authority"], "creator": "PUBLIC SYNTHETIC CHILD FIXTURE",
                "rules": "adaptation-v1", "signal": signal}
        consents = [{"organism": state["organism"], "signature": signature("reproduction", body)} for state in states]
        origin = origin_for({"profile": "synthetic-v1", "rules": "adaptation-v1", "birth": "child-" + digest("reproduction", body),
                             "authority": body["authority"], "creator": body["creator"], "genome": {"signal": signal}})
        packet = {"body": body, "consents": consents, "origin": origin}
        return put(name, origin, packet)

    first = child("child", roots)
    root = child("grandchild", [first])
    (directory / "manifest.json").write_bytes(canonical({"root": root, "records": records}))


if __name__ == "__main__":
    main()
