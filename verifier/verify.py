import errno
import hashlib
import json
import os
from pathlib import Path
import re
import stat
import sys

from cryptography.exceptions import InvalidSignature
from cryptography.hazmat.primitives.asymmetric.ed25519 import Ed25519PublicKey


class Invalid(Exception):
    def __init__(self, code, message):
        self.code = code
        super().__init__(message)


def need(condition, message, code="invalid"):
    if not condition:
        raise Invalid(code, message)


def canonical(value):
    nodes = 0

    def text(value):
        try:
            encoded = value.encode("utf-8", errors="strict")
        except UnicodeError:
            raise Invalid("invalid", "invalid Unicode") from None
        need(len(encoded) <= 4096, "string budget", "limit")
        return json.dumps(value, ensure_ascii=False, separators=(",", ":"))

    def emit(value, depth):
        nonlocal nodes
        nodes += 1
        need(depth <= 16 and nodes <= 4096, "depth or node budget", "limit")
        if value is None:
            return "null"
        if type(value) is bool:
            return "true" if value else "false"
        if type(value) is int:
            need(abs(value) <= 9007199254740991, "integer range")
            return str(value)
        if type(value) is str:
            return text(value)
        need(type(value) in (list, dict), "JSON value required")
        need(len(value) <= 256, "member budget", "limit")
        if type(value) is list:
            return "[" + ",".join(emit(item, depth + 1) for item in value) + "]"
        for key in value:
            need(type(key) is str, "string key required")
            text(key)
        keys = sorted(value, key=lambda key: key.encode("utf-16-be"))
        return "{" + ",".join(text(key) + ":" + emit(value[key], depth + 1) for key in keys) + "}"

    result = emit(value, 0).encode("utf-8")
    need(len(result) <= 65536, "byte budget", "limit")
    return result


def parse(data):
    need(len(data) <= 65536, "byte budget", "limit")

    def pairs(items):
        result = {}
        for key, value in items:
            need(key not in result, "duplicate member")
            result[key] = value
        return result

    def reject_number(value):
        raise Invalid("invalid", "integer lexical form required")

    def integer(value):
        need(value != "-0", "negative zero")
        need(len(value) <= 17, "integer range")
        return int(value)

    try:
        value = json.loads(data.decode("utf-8", errors="strict"), object_pairs_hook=pairs,
                           parse_float=reject_number, parse_constant=reject_number,
                           parse_int=integer)
    except (ValueError, UnicodeError, RecursionError):
        raise Invalid("invalid", "invalid UTF-8 or JSON") from None
    need(canonical(value) == data, "noncanonical wire")
    return value


def digest(kind, body):
    need(kind in ("origin", "event", "state", "observer", "policy", "expression-input", "expression-output", "encounter", "interaction"), "hash domain", "unsupported")
    return hashlib.sha256(f"genesis-organism/synthetic-v1/{kind}\0".encode() + canonical(body)).hexdigest()


def hex_value(value, length):
    return type(value) is str and re.fullmatch(r"[0-9a-f]{" + str(length) + r"}", value) is not None


def exact(value, names):
    need(type(value) is dict and set(value) == set(names), "closed shape")


def integer_range(value, minimum, maximum):
    return type(value) is int and minimum <= value <= maximum


def proof(kind, envelope, key):
    need(hex_value(key, 64) and hex_value(envelope["signature"], 128), "proof encoding")
    try:
        Ed25519PublicKey.from_public_bytes(bytes.fromhex(key)).verify(
            bytes.fromhex(envelope["signature"]),
            f"genesis-organism/synthetic-v1/{kind}-proof\0".encode() + canonical(envelope["body"]))
    except (InvalidSignature, ValueError):
        raise Invalid("invalid", "invalid proof") from None


def origin_state(envelope):
    canonical(envelope)
    exact(envelope, ("body", "signature"))
    body = envelope["body"]
    exact(body, ("profile", "rules", "birth", "creator", "authority", "genome"))
    need(body["profile"] == "synthetic-v1" and body["rules"] in ("core-v1", "encounter-v1", "adaptation-v1"), "profile/rules", "unsupported")
    need(type(body["birth"]) is str and re.fullmatch(r"[a-z0-9-]{1,128}", body["birth"]) is not None, "birth discriminator")
    need(type(body["creator"]) is str and 0 < len(body["creator"].encode()) <= 256, "creator claim")
    exact(body["genome"], ("signal",))
    need(integer_range(body["genome"]["signal"], 0, 255), "genome signal")
    proof("origin", envelope, body["authority"])
    organism = digest("origin", body)
    return {"profile": body["profile"], "rules": body["rules"], "organism": organism,
            "authority": body["authority"], "sequence": 0, "head": organism,
            "signal": body["genome"]["signal"]}


def expression_result(state, observer, policy):
    exact(observer, ("version", "observerType", "subject", "capabilities"))
    need(observer["version"] == "observer-v1", "observer version", "unsupported")
    need(type(observer["observerType"]) is str and 0 < len(observer["observerType"].encode()) <= 128, "observer type")
    need(type(observer["subject"]) is str and re.fullmatch(r"[a-z0-9-]{1,64}", observer["subject"]) is not None, "subject")
    claims = observer["capabilities"]
    need(type(claims) is dict, "capability map")
    names = ("text", "symbols", "spatial")
    profiles = ("text-v1", "symbols-v1", "path-v1")
    for name, claim in claims.items():
        need(name in names, "capability kind", "unsupported")
        exact(claim, ("supported", "evidence", "frame", "unit") if name == "spatial" else ("supported", "evidence"))
        need(type(claim["supported"]) is bool and claim["evidence"] == "claimed", "capability claim")
        if name == "spatial":
            need(claim["frame"] == "fixture-plane-v1" and claim["unit"] == "mm", "frame/unit")
    exact(policy, ("version", "allow", "disclosure"))
    need(policy["version"] == "policy-v1", "policy version")
    need(policy["disclosure"] == "public-synthetic", "disclosure", "unauthorized")
    allowed = policy["allow"]
    need(type(allowed) is list and len(allowed) <= 3 and all(type(item) is str and item in profiles for item in allowed), "allowed profiles")
    need(len(set(allowed)) == len(allowed), "duplicate allowed profile")
    profile = next((profile for name, profile in zip(names, profiles) if claims.get(name, {}).get("supported") is True and profile in allowed), None)
    need(profile is not None, "no permitted expression")
    selection = {"version": "negotiation-v1", "sourceStateRef": digest("state", state),
                 "observerProfileCommitment": digest("observer", observer),
                 "accessPolicyCommitment": digest("policy", policy), "profile": profile,
                 "procedure": "expression-v1"}
    signal = state["signal"]
    if profile == "text-v1":
        output = {"kind": profile, "signal": signal, "text": f"signal:{signal}"}
    elif profile == "symbols-v1":
        output = {"kind": profile, "signal": signal, "symbols": [signal, 255-signal]}
    else:
        output = {"kind": profile, "signal": signal, "frame": "fixture-plane-v1", "unit": "mm", "points": [[0, 0], [signal, 0]]}
    return {"selection": selection, "output": output}


def evidence_id(evidence, states):
    canonical(evidence)
    exact(evidence, ("version", "nonce", "sourceState", "observer", "policy", "expression", "interaction"))
    need(evidence["version"] == "evidence-v1", "evidence version")
    need(type(evidence["nonce"]) is str and re.fullmatch(r"[a-z0-9-]{1,128}", evidence["nonce"]) is not None, "nonce")
    need(any(canonical(state) == canonical(evidence["sourceState"]) for state in states), "unverified source")
    expected = expression_result(evidence["sourceState"], evidence["observer"], evidence["policy"])
    need(canonical(expected) == canonical(evidence["expression"]), "expression fidelity")
    interaction = evidence["interaction"]
    exact(interaction, ("motif", "message"))
    need(integer_range(interaction["motif"], 0, 3), "motif")
    need(type(interaction["message"]) is str and len(interaction["message"].encode()) <= 256, "retained message")
    return digest("encounter", evidence)


def encounter_key(evidence):
    return evidence["sourceState"]["organism"], evidence["observer"]["subject"], evidence["nonce"]


def classify(states, references, envelope, events):
    canonical(envelope)
    exact(envelope, ("body", "signature"))
    body = envelope["body"]
    exact(body, ("profile", "organism", "sequence", "previous", "kind", "data"))
    need(body["profile"] == "synthetic-v1", "profile", "unsupported")
    need(hex_value(body["organism"], 64) and hex_value(body["previous"], 64), "reference encoding")
    need(body["organism"] == states[0]["organism"], "wrong organism")
    need(integer_range(body["sequence"], 1, 1000000), "sequence")
    if body["kind"] == "signal-v1":
        exact(body["data"], ("value",))
        need(integer_range(body["data"]["value"], 0, 255), "signal")
    elif body["kind"] == "rotate-v1":
        exact(body["data"], ("authority",))
        need(hex_value(body["data"]["authority"], 64), "authority encoding")
    elif body["kind"] == "experience-v1":
        exact(body["data"], ("evidence",))
    else:
        raise Invalid("unsupported", "event kind")
    parent = next((state for state in states if state["head"] == body["previous"]), None)
    need(parent is not None, "unknown parent")
    need(body["sequence"] == parent["sequence"] + 1, "sequence mismatch")
    proof("event", envelope, parent["authority"])
    need(body["kind"] != "rotate-v1" or body["data"]["authority"] != parent["authority"], "noop rotation")
    need(parent["rules"] != "adaptation-v1" or body["kind"] != "signal-v1", "direct adaptation override", "unsupported")
    if body["kind"] == "experience-v1":
        need(parent["rules"] in ("encounter-v1", "adaptation-v1"), "experience rules", "unsupported")
        evidence = body["data"]["evidence"]
        identity = evidence_id(evidence, states[:states.index(parent)+1])
        prior = next((event for event in events if event["body"]["kind"] == "experience-v1" and encounter_key(event["body"]["data"]["evidence"]) == encounter_key(evidence)), None)
        if prior is not None:
            need(digest("encounter", prior["body"]["data"]["evidence"]) == identity, "nonce reuse")
            return "duplicate", digest("event", prior["body"])
        if parent["rules"] == "adaptation-v1":
            need(digest("state", evidence["sourceState"]) == digest("state", parent), "stale adaptation source")
    reference = digest("event", body)
    outcome = "duplicate" if reference in references else "accepted" if parent is states[-1] else "conflict"
    return outcome, reference


def read_file(filename):
    descriptor = os.open(filename, os.O_RDONLY | os.O_NOFOLLOW)
    try:
        info = os.fstat(descriptor)
        need(stat.S_ISREG(info.st_mode), "regular file required")
        need(info.st_size <= 65536, "file byte budget", "limit")
        content = b""
        while len(content) <= info.st_size:
            part = os.read(descriptor, info.st_size + 1 - len(content))
            if not part:
                break
            content += part
        need(len(content) == info.st_size, "history changed during read")
        return content
    finally:
        os.close(descriptor)


def verify_directory(directory, expected_head=None):
    directory = Path(directory)
    need(stat.S_ISDIR(directory.lstat().st_mode), "directory required")
    need(read_file(directory / "SYNTHETIC") == b"genesis-organism synthetic-v1\n", "marker required")
    names = os.listdir(directory)
    need(len(names) <= 2048, "directory member budget", "limit")
    origin_bytes = read_file(directory / "origin.json")
    origin = parse(origin_bytes)
    states = [origin_state(origin)]
    references = set()
    events = []
    total_bytes = len(origin_bytes)
    event_names = sorted(name for name in names if re.fullmatch(r"\d{6}\.json", name, flags=re.ASCII))
    need(len(event_names) <= 512, "history event budget", "limit")
    for sequence, name in enumerate(event_names, 1):
        need(name == f"{sequence:06}.json", "history sequence gap", "unavailable")
        event_bytes = read_file(directory / name)
        total_bytes += len(event_bytes)
        need(total_bytes <= 4 * 1024 * 1024, "history byte budget", "limit")
        event = parse(event_bytes)
        outcome, reference = classify(states, references, event, events)
        need(outcome == "accepted", "nonlinear canonical history", "conflict" if outcome == "conflict" else "invalid")
        state = dict(states[-1], sequence=sequence, head=reference)
        if event["body"]["kind"] == "signal-v1":
            state["signal"] = event["body"]["data"]["value"]
        elif event["body"]["kind"] == "rotate-v1":
            state["authority"] = event["body"]["data"]["authority"]
        elif event["body"]["kind"] == "experience-v1" and state["rules"] == "adaptation-v1":
            state["signal"] = event["body"]["data"]["evidence"]["interaction"]["motif"]
        states.append(state)
        references.add(reference)
        events.append(event)
    for name in names:
        if name.startswith("conflict-"):
            outcome, reference = classify(states, references, parse(read_file(directory / name)), events)
            need(outcome == "conflict" and name == f"conflict-{reference}.json", "invalid conflict evidence")
            raise Invalid("conflict", "signed divergent successor retained")
    state = states[-1]
    if expected_head is not None:
        need(expected_head == state["head"], "expected head mismatch")
    return {"state": state, "commitment": digest("state", state)}


def main(arguments):
    if len(arguments) == 2 and arguments[0] == "--bytes":
        need(len(arguments[1]) <= 131072 and re.fullmatch(r"(?:[0-9a-f]{2})*", arguments[1]) is not None, "hex bytes required")
        return {"utf8": canonical(parse(bytes.fromhex(arguments[1]))).decode()}
    if len(arguments) not in (1, 2) or (len(arguments) == 2 and not hex_value(arguments[1], 64)):
        sys.stderr.write(json.dumps({"error": "invalid", "message": "usage: verify.py DIR [HEAD]"}) + "\n")
        return None
    return verify_directory(arguments[0], arguments[1] if len(arguments) == 2 else None)


if __name__ == "__main__":
    try:
        result = main(sys.argv[1:])
        if result is None:
            sys.exit(2)
        print(json.dumps(result, ensure_ascii=False, separators=(",", ":")))
    except Exception as error:
        code = error.code if isinstance(error, Invalid) else "unavailable" if isinstance(error, FileNotFoundError) else "invalid" if isinstance(error, OSError) and error.errno == errno.ELOOP else "io"
        message = str(error) if isinstance(error, Invalid) else "input/filesystem failure"
        sys.stderr.write(json.dumps({"error": code, "message": message}) + "\n")
        sys.exit(1)
