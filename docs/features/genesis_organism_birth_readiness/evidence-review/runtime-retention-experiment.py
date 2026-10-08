"""Owned local public-runtime retention trial; never an organism archive."""
import hashlib
import json
import os
import re
import shutil
import subprocess
from pathlib import Path

ROOT = Path('/private/tmp/genesis-birth-recovery-68f4d39')
CELLAR = Path('/opt/homebrew/Cellar')
MAGIC = {bytes.fromhex(v) for v in ('cffaedfe', 'feedfacf', 'cefaedfe', 'feedface', 'cafebabe', 'bebafeca', 'cafebabf', 'bfbafeca')}


def run(args, **kw):
    return subprocess.run(args, check=True, capture_output=True, text=True, **kw)


def package(file):
    resolved = file.resolve(strict=True)
    parts = resolved.relative_to(CELLAR).parts
    return CELLAR / parts[0] / parts[1]


def macho(file):
    try:
        with file.open('rb') as stream:
            return stream.read(4) in MAGIC
    except OSError:
        return False


def main():
    assert ROOT.is_dir() and not ROOT.is_symlink() and ROOT.stat().st_uid == os.getuid()
    retained = ROOT / 'retained-runtime'
    assert not retained.exists()
    retained.mkdir(mode=0o700)
    pending = [package(Path(shutil.which('node'))), package(Path(shutil.which('python3')))]
    seen, external, edges = set(), set(), []
    while pending:
        origin = pending.pop()
        if origin in seen:
            continue
        seen.add(origin)
        for directory, _, names in os.walk(origin, followlinks=False):
            for name in names:
                file = Path(directory) / name
                if file.is_symlink() or not macho(file):
                    continue
                lines = run(['/usr/bin/otool', '-L', str(file)]).stdout.splitlines()[1:]
                for line in lines:
                    dep = line.strip().split(' (compatibility version', 1)[0]
                    if not dep:
                        continue
                    if dep.startswith(('/usr/lib/', '/System/')):
                        external.add(dep)
                        continue
                    if dep.startswith('/opt/homebrew/'):
                        target = Path(dep).resolve(strict=True)
                    elif dep.startswith('@loader_path/'):
                        target = (file.parent / dep[len('@loader_path/'):]).resolve(strict=True)
                    elif dep.startswith('@rpath/'):
                        suffix = dep[len('@rpath/'):]
                        candidates = [origin / 'lib' / suffix, file.parent / suffix]
                        found = [p for p in candidates if p.is_file()]
                        if not found:
                            raise RuntimeError(f'unresolved rpath: {file}: {dep}')
                        target = found[0].resolve(strict=True)
                    elif dep.startswith('@executable_path/'):
                        raise RuntimeError(f'unresolved executable path: {file}: {dep}')
                    else:
                        raise RuntimeError(f'unknown dylib location: {dep}')
                    dep_package = package(target)
                    edges.append({'file': str(file), 'dependency': dep, 'resolved': str(target)})
                    if dep_package not in seen:
                        pending.append(dep_package)
        destination = retained / origin.relative_to('/')
        destination.parent.mkdir(parents=True, exist_ok=True)
        shutil.copytree(origin, destination, symlinks=True)
    entries = []
    for directory, dirs, names in os.walk(retained, followlinks=False):
        for name in sorted(dirs + names):
            file = Path(directory) / name
            relative = str(file.relative_to(retained))
            if file.is_symlink():
                entries.append({'path': relative, 'symlink': os.readlink(file)})
            elif file.is_file():
                data = file.read_bytes()
                entries.append({'path': relative, 'size': len(data), 'sha256': hashlib.sha256(data).hexdigest()})
    report = {'purpose': 'PUBLIC SYNTHETIC LOCAL RETENTION EXPERIMENT ONLY',
              'packages': sorted(map(str, seen)), 'externalOSDependencies': sorted(external),
              'dependencyEdges': edges, 'files': sorted(entries, key=lambda v: v['path']),
              'rawBytes': sum(v.get('size', 0) for v in entries),
              'limits': 'same macOS host/arm64; OS frameworks and loader not retained; no real candidate or external archive'}
    (ROOT / 'runtime-inventory.json').write_text(json.dumps(report, indent=2) + '\n')
    print(json.dumps({'packages': len(seen), 'files': len(entries), 'bytes': report['rawBytes'], 'report': str(ROOT / 'runtime-inventory.json')}))


if __name__ == '__main__':
    main()
