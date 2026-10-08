"""Independent synthetic D12 checker. Never invokes JS or archived executables."""
import hashlib
import json
from pathlib import Path
import re
import subprocess
import sys
from cryptography.hazmat.primitives.asymmetric.ed25519 import Ed25519PublicKey
from cryptography.exceptions import InvalidSignature
from verify import Invalid, canonical, exact, hex_value, need, parse, read_file

ROOT = Path(__file__).resolve().parents[1]
PROFILE = "ceremony-rehearsal-v1"
AUTHORITY = "d75a980182b10ab7d54bfed3c964073a0ee172f3daa62325af021a68f707511a"
LIST = "fixtures/ceremony-v1/artifacts.json"
ORIGIN = "fixtures/adaptation-v1/origin.json"
MAX_RAW = 32 * 1024 * 1024


def prefix(kind):
    return ("genesis-organism/rehearsal-v1/" + kind + "\0").encode("ascii")


def reference(kind, value):
    need(kind in ("manifest", "freeze", "release", "birth"), "hash kind")
    return hashlib.sha256(prefix(kind) + canonical(value)).hexdigest()


def check_proof(kind, envelope, keys):
    canonical(envelope)
    exact(envelope, ("body", "signature"))
    exact(envelope["body"], keys)
    need(envelope["body"]["profile"] == PROFILE, "profile")
    need(envelope["body"]["authority"] == AUTHORITY, "fixture attribution")
    need(hex_value(envelope["signature"], 128), "signature encoding")
    try:
        Ed25519PublicKey.from_public_bytes(bytes.fromhex(AUTHORITY)).verify(bytes.fromhex(envelope["signature"]), prefix(kind + "-proof") + canonical(envelope["body"]))
    except (ValueError, InvalidSignature):
        raise Invalid("invalid", "fixture proof") from None


def check_path(value):
    need(type(value) is str and len(value) <= 240 and re.fullmatch(r"[A-Za-z0-9_./-]+", value), "artifact path")
    parts = value.split("/")
    need(all(p not in ("", ".", "..", ".git", ".playspec") for p in parts) and parts[0] != "organisms", "protected/nonrelative artifact")


def check_manifest(manifest):
    canonical(manifest)
    exact(manifest, ("profile", "candidate", "revision", "anchor", "supersedes", "artifacts"))
    need(manifest["profile"] == PROFILE and manifest["anchor"] == "skip", "manifest profile/anchor")
    need(type(manifest["candidate"]) is str and re.fullmatch(r"rehearsal-[a-z0-9-]{1,48}", manifest["candidate"]), "candidate")
    need(type(manifest["revision"]) is str and re.fullmatch(r"[0-9a-f]{40}", manifest["revision"]), "revision")
    need(manifest["supersedes"] is None or hex_value(manifest["supersedes"], 64), "supersedes")
    need(type(manifest["artifacts"]) is list and 0 < len(manifest["artifacts"]) <= 256, "artifact count")
    previous = ""
    for item in manifest["artifacts"]:
        exact(item, ("path", "sha256")); check_path(item["path"])
        need(item["path"] > previous and hex_value(item["sha256"], 64), "artifact order/hash")
        previous = item["path"]
    paths = [item["path"] for item in manifest["artifacts"]]
    for name in (LIST, ORIGIN, "ORIGIN.md", "spec/GENESIS.md", "LICENSE.md", "LICENSES/CC-BY-4.0.txt", "LICENSES/Apache-2.0.txt", "THIRD-PARTY-NOTICES.md", "docs/decisions/D12-synthetic-ceremony.md", "docs/features/genesis_organism_phase_35/birth-evidence.md"):
        need(name in paths, "required artifact not selected")


def check_freeze(manifest, freeze, prior=None):
    check_manifest(manifest)
    check_proof("freeze", freeze, ("profile", "manifestRef", "authority"))
    need(freeze["body"]["manifestRef"] == reference("manifest", manifest), "freeze manifest binding")
    if manifest["supersedes"] is None:
        need(prior is None, "unexpected prior evidence")
    else:
        exact(prior, ("manifest", "failure", "births")); check_manifest(prior["manifest"])
        exact(prior["failure"], ("profile", "manifestRef", "reason"))
        need(prior["manifest"]["supersedes"] is None and prior["manifest"]["candidate"] != manifest["candidate"], "bounded supersession")
        need(manifest["supersedes"] == reference("manifest", prior["manifest"]), "supersedes binding")
        need(prior["failure"] == {"profile": PROFILE, "manifestRef": manifest["supersedes"], "reason": "fixture-failure"}, "retained failure evidence")
        need(type(prior["births"]) is list and len(prior["births"]) == 0, "accepted prior cannot be superseded")
    return {"manifestRef": reference("manifest", manifest), "freezeRef": reference("freeze", freeze)}


def git_artifacts(manifest):
    check_manifest(manifest)
    files, total = {}, 0
    for item in manifest["artifacts"]:
        name = item["path"]
        # subprocess args never run a shell; ls-tree excludes symlinks/submodules.
        tree = subprocess.check_output(["git", "ls-tree", "-z", manifest["revision"], "--", name], cwd=ROOT)
        need(re.fullmatch(rb"100(?:644|755) blob [0-9a-f]{40}\t" + re.escape(name.encode()) + b"\x00", tree), "regular Git blob required")
        size = int(subprocess.check_output(["git", "cat-file", "-s", manifest["revision"] + ":" + name], cwd=ROOT))
        total += size; need(total <= MAX_RAW, "raw artifact budget")
        data = subprocess.check_output(["git", "show", manifest["revision"] + ":" + name], cwd=ROOT)
        need(len(data) == size and hashlib.sha256(data).hexdigest() == item["sha256"], "raw artifact hash")
        files[name] = data
    need(parse(files[LIST]) == [item["path"] for item in manifest["artifacts"]], "explicit selection mismatch")
    return files


if __name__ == "__main__":
    try:
        bundle = json.loads(read_file(Path(sys.argv[1])))
        result = check_freeze(bundle["manifest"], bundle["freeze"], bundle.get("prior"))
        files = git_artifacts(bundle["manifest"])
        print(json.dumps(dict(result, artifacts=len(files)), sort_keys=True))
    except (Invalid, OSError, ValueError, KeyError, TypeError, IndexError, subprocess.SubprocessError) as error:
        print(str(error), file=sys.stderr); sys.exit(1)
