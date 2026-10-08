"""Offline D08/Phase22 evidence audit; no JS invocation or archived code execution."""
from pathlib import Path
import json
import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "verifier"))
from verify import Invalid, canonical, digest, need, parse, read_file
from lineage import history_states


def audit(report):
    origin = parse(read_file(ROOT / "fixtures/encounter-v1/origin.json"))
    event = parse(read_file(ROOT / "fixtures/encounter-v1/000001.json"))
    states = history_states({"origin": origin, "events": [event], "lineage": None})
    evidence = event["body"]["data"]["evidence"]
    subject, motif = evidence["observer"]["subject"], evidence["interaction"]["motif"]
    memory = {"subject": subject, "motif": motif, "encounterId": digest("encounter", evidence),
              "eventRef": digest("event", event["body"])}
    synapse = dict(memory, scope="directional-claim", partnerConsent="unverified")
    need(report["memory"] == memory and report["synapse"] == synapse, "memory/synapse provenance")
    need(report["restoredState"] == states[1] and report["rejectedState"] == states[0], "restored/control state")
    need((report["admission"], report["retry"], report["refusal"]) == ("accepted", "duplicate", "invalid"), "admission controls")
    policy = {"version": "policy-related-v1", "allow": ["relationship-text-v1", "relationship-symbols-v1", "relationship-path-v1"],
              "disclosure": "public-synthetic", "relationships": True}
    need([v["capability"] for v in report["views"]] == ["text", "symbols", "spatial"], "three views")
    count = 0
    for view in report["views"]:
        cap = view["capability"]
        descriptor = {"supported": True, "evidence": "claimed"}
        if cap == "spatial":
            descriptor.update(frame="fixture-plane-v1", unit="mm")
        observer = {"version": "observer-v1", "observerType": "mock-" + cap, "subject": subject, "capabilities": {cap: descriptor}}
        for arm in ("noExperience", "treatment", "rejectedExperience", "ablation"):
            state = states[1] if arm in ("treatment", "ablation") else states[0]
            effective = arm == "treatment"
            m, s = (memory, synapse) if effective else (None, None)
            signal = state["signal"]
            base = [signal, (signal + 64) % 256, (signal + 128) % 256, 255 - signal]
            offset = motif if effective else 0
            grammar = base[offset:] + base[:offset]
            kind = {"text": "relationship-text-v1", "symbols": "relationship-symbols-v1", "spatial": "relationship-path-v1"}[cap]
            presentation = ("grammar:" + ",".join(map(str, grammar))) if cap == "text" else grammar if cap == "symbols" else {
                "frame": "fixture-plane-v1", "unit": "mm", "points": [[token, i] for i, token in enumerate(grammar)]}
            output = {"kind": kind, "signal": signal, "grammar": grammar, "presentation": presentation}
            procedure = "control-no-memory-v1" if arm == "ablation" else "relationship-expression-v1"
            expected = {"procedure": procedure, "sourceStateRef": digest("state", state),
                        "observerProfileCommitment": digest("observer", observer), "accessPolicyCommitment": digest("policy", policy),
                        "memorySource": memory["eventRef"] if effective else None,
                        "expressionInputCommitment": digest("expression-input", {"procedure": procedure, "state": state, "observer": observer,
                                                                                 "policy": policy, "memory": m, "synapse": s}),
                        "expressionOutputDigest": digest("expression-output", output), "output": output}
            need(canonical(view[arm]) == canonical(expected), "later expression fidelity: " + arm)
            count += 1
        need(view["treatment"]["output"] != view["noExperience"]["output"], "causal output difference")
        need(view["ablation"]["output"] == view["rejectedExperience"]["output"] == view["noExperience"]["output"], "matched controls")
    return {"verifiedViews": count, "grammarBefore": [0, 64, 128, 255], "grammarAfter": [128, 255, 0, 64],
            "scope": "independent synthetic D08 evidence; no subjective meaning or real birth"}


if __name__ == "__main__":
    try:
        filename = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "docs/features/genesis_organism_phase_22/demo.json"
        # Reports are pretty JSON evidence, not a new canonical wire format.
        result = audit(json.loads(read_file(filename)))
        print(json.dumps(result, sort_keys=True))
    except (Invalid, ValueError, KeyError, TypeError, OSError) as error:
        print(str(error), file=sys.stderr)
        sys.exit(1)
