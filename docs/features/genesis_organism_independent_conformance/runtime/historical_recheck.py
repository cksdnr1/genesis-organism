"""Recheck exact retained historical candidates after independent assessment."""
import hashlib,json,subprocess,tempfile
from pathlib import Path
import sys
sys.path.insert(0,str(Path('verifier').resolve()))
from verify import canonical
OUT=Path('docs/features/genesis_organism_independent_conformance/runtime')
origin=Path('fixtures/encounter-v1/origin.json').read_bytes()
results=[]
for source in ['docs/features/genesis_organism/post-merge-audit/diagnostic-results.json','docs/features/genesis_organism/pr8-critical-audit/compound-results.json']:
 raw=Path(source).read_bytes();data=json.loads(raw)
 report=dict(source=source,source_sha256=hashlib.sha256(raw).hexdigest(),results=[])
 for index,item in enumerate(data['results']):
  with tempfile.TemporaryDirectory(prefix='historical-independent-') as tmp:
   d=Path(tmp);(d/'SYNTHETIC').write_bytes(b'genesis-organism synthetic-v1\n');(d/'origin.json').write_bytes(origin);(d/'000001.json').write_bytes(canonical(item['candidate']))
   before={p.name:hashlib.sha256(p.read_bytes()).hexdigest() for p in d.iterdir()}
   outcomes=[]
   for args in [['node','src/cli.mjs','replay',tmp],['.venv/bin/python','verifier/verify.py',tmp]]:
    p=subprocess.run(args,capture_output=True,timeout=5);outcomes.append(dict(command=args,exit=p.returncode,stdout=p.stdout.decode(),stderr=p.stderr.decode(),code=json.loads(p.stderr)['error']))
   unchanged=before=={p.name:hashlib.sha256(p.read_bytes()).hexdigest() for p in d.iterdir()}
   assert unchanged and all(r['exit']==1 for r in outcomes)
   report['results'].append(dict(name=item['name'],outcomes=outcomes,no_write=unchanged,agreement=outcomes[0]['code']==outcomes[1]['code']))
 results.append(report)
(OUT/'historical-recheck-results.json').write_text(json.dumps(dict(head=subprocess.check_output(['git','rev-parse','HEAD']).decode().strip(),reports=results),indent=2)+'\n')
print(json.dumps([dict(source=r['source'],cases=len(r['results']),disagreements=sum(not x['agreement'] for x in r['results'])) for r in results]))
