import json,os,subprocess,tempfile
from pathlib import Path
OUT=Path(__file__).parent
results=[]
with tempfile.TemporaryDirectory(prefix='ic01-baseline-') as tmp:
 root=Path(tmp)
 h=root/'history';h.mkdir();(h/'SYNTHETIC').write_bytes(b'genesis-organism synthetic-v1\n');(h/'origin.json').write_bytes(Path('fixtures/core-v1/origin.json').read_bytes());os.mkfifo(h/'000001.json')
 inp=root/'input';os.mkfifo(inp)
 c=root/'ceremony';c.mkdir();(c/'REHEARSAL').write_bytes(b'genesis-organism synthetic ceremony rehearsal v1\n');os.mkfifo(c/'payload')
 js="import {readRehearsal} from './tools/rehearsal.mjs';try { readRehearsal(process.argv[1],'payload'); } catch(e) { console.error(JSON.stringify({error:e.code}));process.exitCode=1;}"
 py="import sys;sys.path.insert(0,'verifier');import rehearsal as r;r.read_local(r.guard_root(sys.argv[1]),'payload')"
 cases=[('node-replay',['node','src/cli.mjs','replay',str(h)]),('node-inspect',['node','src/cli.mjs','inspect',str(h)]),('python-history',['.venv/bin/python','verifier/verify.py',str(h)]),('node-append-source',['node','src/cli.mjs','append',str(h),str(inp)]),('node-init-source',['node','src/cli.mjs','init-fixture',str(root/'new-history'),str(inp)]),('node-ceremony',['node','--input-type=module','-e',js,str(c)]),('python-ceremony',['.venv/bin/python','-c',py,str(c)])]
 for name,args in cases:
  try:
   p=subprocess.run(args,capture_output=True,timeout=0.5);r=dict(name=name,exit=p.returncode,stdout=p.stdout.decode(),stderr=p.stderr.decode())
  except subprocess.TimeoutExpired:r=dict(name=name,timeout_seconds=0.5)
  results.append(r)
OUT.joinpath('baseline.json').write_text(json.dumps(dict(head=subprocess.check_output(['git','rev-parse','HEAD']).decode().strip(),cases=results),indent=2)+'\n')
assert len(results)==7 and all('timeout_seconds' in r for r in results)
