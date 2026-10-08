"""Recheck an already retained/restored synthetic runtime trial; no Git writes."""
import hashlib
import json
import subprocess
from pathlib import Path

ROOT = Path('/private/tmp/genesis-birth-recovery-68f4d39')


def main():
    inventory = json.loads((ROOT / 'runtime-inventory.json').read_text())
    mismatches = []
    for item in inventory['files']:
        file = ROOT / 'restored-runtime' / item['path']
        if 'symlink' in item:
            valid = file.is_symlink() and file.readlink().as_posix() == item['symlink']
        else:
            valid = (file.is_file() and file.stat().st_size == item['size'] and
                     hashlib.sha256(file.read_bytes()).hexdigest() == item['sha256'])
        if not valid:
            mismatches.append(item['path'])
    (ROOT / 'restored-inventory-check.json').write_text(json.dumps({
        'entries': len(inventory['files']), 'mismatches': mismatches}, indent=2) + '\n')
    assert not mismatches
    env = json.loads((ROOT / 'restored-runtime-env.json').read_text())
    env['PYTHONPATH'] = str(ROOT / 'restored-site-verified')
    python = env['PYTHONHOME'] + '/bin/python3.14'
    node = str(ROOT / 'restored-runtime/opt/homebrew/Cellar/node/25.9.0_3/bin/node')
    source = ROOT / 'restored-source'
    assert source.is_dir() and not source.is_symlink()
    # Set DYLD variables AFTER protected sandbox-exec/env programs are loaded.
    base = ['/usr/bin/sandbox-exec', '-p', '(version 1)(allow default)(deny network*)',
            '/usr/bin/env', *[key + '=' + value for key, value in env.items()]]
    commands = [
        ('verified-runtime-imports', [python, '-c',
          'import sys,cryptography,jsonschema,importlib.metadata,json;'
          'print(json.dumps({"prefix":sys.prefix,"crypto":cryptography.__file__,"versions":'
          '{k:importlib.metadata.version(k) for k in ["attrs","cffi","cryptography",'
          '"jsonschema","jsonschema-specifications","pycparser","referencing","rpds-py"]}}))']),
        ('verified-restored-schema', [python, 'tests/schema_vectors.py']),
        ('verified-restored-successor', [python, 'tests/successor_schema_vectors.py']),
        ('verified-restored-causal', [python, 'tools/audit_causal.py']),
    ]
    results = []
    for name, args in commands:
        result = subprocess.run(base + args, cwd=source, env={'PATH': '/usr/bin:/bin'},
                                capture_output=True, text=True)
        (ROOT / (name + '.stdout')).write_text(result.stdout)
        (ROOT / (name + '.stderr')).write_text(result.stderr)
        original = [line for line in result.stderr.splitlines() if ' /opt/homebrew/' in line]
        item = {'name': name, 'command': args, 'exit': result.returncode,
                'originalHomebrewLoads': len(original),
                'loaderLogLines': len(result.stderr.splitlines())}
        results.append(item)
        print(json.dumps(item), flush=True)
        if result.returncode or original:
            raise RuntimeError('restored verification failed or used original Homebrew libraries')
    (ROOT / 'verified-runtime-check-results.json').write_text(json.dumps(results, indent=2) + '\n')


if __name__ == '__main__':
    main()
