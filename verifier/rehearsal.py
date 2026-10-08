"""Independent synthetic D12 checker. Never invokes JS or archived executables."""
import hashlib
import json
import os
from pathlib import Path
import re
import subprocess
import stat
import sys
from cryptography.hazmat.primitives.asymmetric.ed25519 import Ed25519PublicKey
from cryptography.exceptions import InvalidSignature
from verify import Invalid, canonical, exact, hex_value, need, parse, read_file, origin_state, digest

ROOT = Path(__file__).resolve().parents[1]
PROFILE = "ceremony-rehearsal-v1"
AUTHORITY = "d75a980182b10ab7d54bfed3c964073a0ee172f3daa62325af021a68f707511a"
LIST = "fixtures/ceremony-v1/artifacts.json"
ORIGIN = "fixtures/adaptation-v1/origin.json"
REHEARSAL_ORIGIN = "37d5a9c4b7163c331b296545a52130cd2c8006cfa010cc5e31353cac8e2061cc"
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
        git_artifacts(prior["manifest"])
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


MARKER = b"genesis-organism synthetic ceremony rehearsal v1\n"


def guard_root(root):
    root = Path(root).absolute()
    resolved = root.resolve()
    need(resolved != ROOT.resolve() and ROOT.resolve() not in resolved.parents, "rehearsal inside repository")
    need(not root.is_symlink() and root.is_dir(), "rehearsal root")
    need(read_local(root, "REHEARSAL", 128) == MARKER, "synthetic marker")
    return root


def read_local(root, relative, maximum=MAX_RAW):
    check_path(relative)
    target = root
    for segment in relative.split("/")[:-1]:
        target = target / segment
        info = target.lstat()
        need(stat.S_ISDIR(info.st_mode) and not stat.S_ISLNK(info.st_mode), "symlinked ancestor")
    fd = os.open(root / relative, os.O_RDONLY | os.O_NOFOLLOW)
    try:
        info = os.fstat(fd)
        need(stat.S_ISREG(info.st_mode) and info.st_size <= maximum, "regular bounded file")
        chunks, count = [], 0
        while count <= info.st_size:
            chunk = os.read(fd, min(65536, info.st_size + 1 - count))
            if not chunk:
                break
            chunks.append(chunk); count += len(chunk)
        need(count == info.st_size, "file changed during read")
        return b"".join(chunks)
    finally:
        os.close(fd)


def archive_files(root, name, manifest, freeze, prior=None):
    root = guard_root(root); need(name in ("archive-a", "archive-b"), "archive name")
    check_freeze(manifest, freeze, prior)
    expected = {"manifest.json", "freeze.json"} | {"files/" + item["path"] for item in manifest["artifacts"]}
    directories = {""}
    for filename in expected:
        parts = filename.split("/")
        directories.update("/".join(parts[:i]) for i in range(1, len(parts)))
    found, count = set(), 0

    def walk(relative):
        nonlocal count
        current = root / name / relative
        info = current.lstat(); need(not stat.S_ISLNK(info.st_mode), "archive symlink")
        if stat.S_ISDIR(info.st_mode):
            need(relative in directories, "extra archive directory")
            for child in current.iterdir():
                count += 1; need(count <= 1024, "archive entry budget"); check_path(child.name)
                walk((relative + "/" if relative else "") + child.name)
        else:
            need(stat.S_ISREG(info.st_mode) and relative in expected, "extra/nonregular archive member")
            found.add(relative)

    walk(""); need(found == expected, "incomplete archive")
    need(read_local(root, name + "/manifest.json", 65536) == canonical(manifest), "archive manifest")
    need(read_local(root, name + "/freeze.json", 65536) == canonical(freeze), "archive freeze")
    files, total = {}, 0
    for item in manifest["artifacts"]:
        data = read_local(root, name + "/files/" + item["path"])
        total += len(data); need(total <= MAX_RAW, "raw archive budget")
        need(hashlib.sha256(data).hexdigest() == item["sha256"], "archive raw hash")
        files[item["path"]] = data
    need(parse(files[LIST]) == [item["path"] for item in manifest["artifacts"]], "selection mismatch")
    return files


def check_release(root, manifest, freeze, release, prior=None):
    result = check_freeze(manifest, freeze, prior)
    check_proof("release", release, ("profile", "manifestRef", "freezeRef", "authority"))
    need(release["body"]["manifestRef"] == result["manifestRef"] and release["body"]["freezeRef"] == result["freezeRef"], "release bindings")
    for name in ("archive-a", "archive-b"):
        archive_files(root, name, manifest, freeze, prior)
    return dict(result, releaseRef=reference("release", release))


def check_birth(root, manifest, freeze, release, birth, prior=None):
    result = check_release(root, manifest, freeze, release, prior)
    check_proof("birth", birth, ("profile", "manifestRef", "releaseRef", "originRef", "authority"))
    state = origin_state(parse(archive_files(root, "archive-a", manifest, freeze, prior)[ORIGIN]))
    need(state["organism"] == REHEARSAL_ORIGIN and state["authority"] == AUTHORITY and state["sequence"] == 0 and state["signal"] == 0 and state["rules"] == "adaptation-v1", "only pinned synthetic origin")
    need(birth["body"]["manifestRef"] == result["manifestRef"] and birth["body"]["releaseRef"] == result["releaseRef"] and birth["body"]["originRef"] == state["organism"], "birth bindings")
    return dict(result, birthRef=reference("birth", birth), originRef=state["organism"], stateCommitment=digest("state", state))


def check_journal(root, manifest, freeze, release, birth, prior=None):
    root = guard_root(root)
    result = check_birth(root, manifest, freeze, release, birth, prior)
    need(not os.path.lexists(root / "LOCK"), "writer lock held")
    allowed = {"REHEARSAL", "pending", "archive-a", "archive-b", "accepted", "conflicts", "LOCK"}
    for entry in root.iterdir():
        need(entry.name in allowed and not entry.is_symlink(), "unknown/symlinked root member")
        need(entry.is_file() if entry.name in ("REHEARSAL", "LOCK") else entry.is_dir(), "root member type")
    pending = list((root / "pending").iterdir()) if (root / "pending").exists() else []
    need(len(pending) <= 256, "pending member budget")
    total = 0
    for entry in pending:
        need(re.fullmatch(r"[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}", entry.name) and entry.is_file() and not entry.is_symlink(), "pending evidence")
        total += entry.stat().st_size; need(total <= MAX_RAW, "pending byte budget")
    conflicts = list((root / "conflicts").iterdir()) if (root / "conflicts").exists() else []
    need(not conflicts, "retained conflict hold")
    accepted = list((root / "accepted").iterdir()) if (root / "accepted").exists() else []
    need(len(accepted) <= 1, "single-origin journal")
    if accepted:
        name = birth["body"]["originRef"] + ".json"
        need(accepted[0].name == name and not accepted[0].is_symlink(), "accepted origin filename")
        existing = parse(read_local(root, "accepted/" + name, 65536))
        need(canonical(existing) == canonical(birth), "accepted birth bytes")
    return dict(result, status="accepted" if accepted else "empty")


if __name__ == "__main__":
    try:
        bundle = json.loads(read_file(Path(sys.argv[1])))
        # Offline archives contain the current candidate only. Never substitute
        # prior hashes for unavailable predecessor bytes or silently invoke Git.
        if len(sys.argv) > 2:
            need(bundle["manifest"]["supersedes"] is None,
                 "unavailable predecessor artifact evidence for offline supersession", "unavailable")
        result = check_freeze(bundle["manifest"], bundle["freeze"], bundle.get("prior"))
        if len(sys.argv) > 2:
            if "birth" in bundle:
                result = check_journal(sys.argv[2], bundle["manifest"], bundle["freeze"], bundle["release"], bundle["birth"], bundle.get("prior"))
            else:
                result = check_release(sys.argv[2], bundle["manifest"], bundle["freeze"], bundle["release"], bundle.get("prior"))
        else:
            git_artifacts(bundle["manifest"])
        print(json.dumps(dict(result, artifacts=len(bundle["manifest"]["artifacts"])), sort_keys=True))
    except (Invalid, OSError, ValueError, KeyError, TypeError, IndexError, subprocess.SubprocessError) as error:
        print(str(error), file=sys.stderr); sys.exit(1)
