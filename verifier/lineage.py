"""Independent bounded D10 lineage verifier. No reference JS imports/processes."""
import copy
import json
import sys
from verify import Invalid, canonical, classify, digest, exact, hex_value, integer_range, need, origin_state, parse, proof, read_file


def history_states(record):
    exact(record, ("origin", "events", "lineage"))
    need(type(record["events"]) is list and len(record["events"]) <= 512, "history event budget", "limit")
    total = len(canonical(record["origin"]))
    states, events, references = [origin_state(record["origin"])], [], set()
    for event in record["events"]:
        total += len(canonical(event))
        need(total <= 4 * 1024 * 1024, "history byte budget", "limit")
        outcome, reference = classify(states, references, event, events)
        need(outcome == "accepted", "nonlinear canonical history", "conflict" if outcome == "conflict" else "invalid")
        state = dict(states[-1], sequence=event["body"]["sequence"], head=reference)
        body = event["body"]
        if body["kind"] == "signal-v1":
            state["signal"] = body["data"]["value"]
        elif body["kind"] == "rotate-v1":
            state["authority"] = body["data"]["authority"]
        elif state["rules"] == "adaptation-v1":
            state["signal"] = body["data"]["evidence"]["interaction"]["motif"]
        states.append(state)
        references.add(reference)
        events.append(event)
    return states


def check_packet(packet, get_record):
    canonical(packet)
    exact(packet, ("body", "consents", "origin"))
    body = packet["body"]
    exact(body, ("version", "nonce", "parents", "authority", "creator", "rules", "signal"))
    need(body["version"] == "reproduction-v1" and body["rules"] == "adaptation-v1", "reproduction version/rules", "unsupported")
    import re
    need(type(body["nonce"]) is str and re.fullmatch(r"[a-z0-9-]{1,64}", body["nonce"]) is not None, "reproduction nonce")
    need(hex_value(body["authority"], 64), "child authority")
    need(type(body["creator"]) is str and 0 < len(body["creator"].encode()) <= 256, "creator claim")
    need(integer_range(body["signal"], 0, 255), "inherited signal")
    refs, consents = body["parents"], packet["consents"]
    need(type(refs) is list and 1 <= len(refs) <= 4, "parent budget")
    need(type(consents) is list and len(consents) == len(refs), "consent count")
    selected = []
    for index, ref in enumerate(refs):
        exact(ref, ("organism", "stateRef"))
        exact(consents[index], ("organism", "signature"))
        need(hex_value(ref["organism"], 64) and hex_value(ref["stateRef"], 64), "parent reference")
        need(index == 0 or refs[index-1]["organism"] < ref["organism"], "sorted unique parents")
        need(consents[index]["organism"] == ref["organism"], "consent order")
        states = history_states(get_record(ref["organism"]))
        need(states[0]["organism"] == ref["organism"], "parent identity")
        state = next((state for state in states if digest("state", state) == ref["stateRef"]), None)
        need(state is not None, "selected state")
        need(state["rules"] == "adaptation-v1", "parent inheritance rules", "unsupported")
        proof("reproduction", {"body": body, "signature": consents[index]["signature"]}, state["authority"])
        selected.append(state)
    need(body["signal"] == sum(state["signal"] for state in selected) // len(selected), "inheritance mismatch")
    expected = {"profile": "synthetic-v1", "rules": body["rules"], "birth": "child-" + digest("reproduction", body),
                "authority": body["authority"], "creator": body["creator"], "genome": {"signal": body["signal"]}}
    need(canonical(packet["origin"]["body"]) == canonical(expected), "child binding")
    child = origin_state(packet["origin"])
    need(all(state["organism"] != child["organism"] for state in selected), "child equals parent")


def verify_lineage(root, resolve):
    need(hex_value(root, 64), "root identity")
    cache, active, done, edges, calls = {}, set(), set(), [], 0

    def record_for(identity):
        nonlocal calls
        calls += 1
        need(calls <= 128, "resolver call budget", "limit")
        if identity not in cache:
            need(len(cache) < 32, "node budget", "limit")
            record = resolve(identity)
            need(record is not None, "ancestor evidence unavailable", "unavailable")
            canonical(record)
            exact(record, ("origin", "events", "lineage"))
            cache[identity] = copy.deepcopy(record)
        return cache[identity]

    def visit(identity, depth):
        need(depth <= 16, "depth budget", "limit")
        need(identity not in active, "lineage cycle")
        if identity in done:
            return
        active.add(identity)
        record = record_for(identity)
        states = history_states(record)
        need(states[0]["organism"] == identity, "ancestor identity")
        need(states[0]["rules"] == "adaptation-v1", "lineage rules", "unsupported")
        if record["origin"]["body"]["birth"].startswith("child-"):
            packet = record["lineage"]
            need(packet is not None, "child lineage unavailable", "unavailable")
            need(canonical(packet["origin"]) == canonical(record["origin"]), "packet origin mismatch")
            check_packet(packet, record_for)
            for ref in packet["body"]["parents"]:
                edges.append({"child": identity, "parent": ref["organism"], "stateRef": ref["stateRef"]})
                visit(ref["organism"], depth + 1)
        else:
            need(record["lineage"] is None, "root lineage mismatch")
        active.remove(identity)
        done.add(identity)

    visit(root, 0)
    return {"root": root, "nodes": sorted(done), "edges": sorted(edges, key=lambda edge: (edge["child"], edge["parent"]))}


def main(arguments):
    need(len(arguments) == 1, "usage: lineage.py MANIFEST", "usage")
    manifest = parse(read_file(arguments[0]))
    exact(manifest, ("root", "records"))
    need(type(manifest["records"]) is dict and len(manifest["records"]) <= 32, "manifest node budget", "limit")
    return verify_lineage(manifest["root"], manifest["records"].get)


if __name__ == "__main__":
    try:
        print(json.dumps(main(sys.argv[1:]), separators=(",", ":")))
    except (Invalid, OSError, KeyError, TypeError, ValueError) as error:
        print(json.dumps({"error": getattr(error, "code", "invalid"), "message": "lineage verification failed"}), file=sys.stderr)
        sys.exit(1)
