"""Try to falsify the preparation checker using only owned public packet copies."""
import copy
import hashlib
import importlib.util
import json
from pathlib import Path
import shutil
import tempfile
import sys
HERE=Path(__file__).resolve().parent
spec=importlib.util.spec_from_file_location('shadow_checker',HERE/'check_shadow.py')
checker=importlib.util.module_from_spec(spec);spec.loader.exec_module(checker)

def edit(root,name,change):
    target=root/name; data=json.loads(target.read_bytes()); change(data)
    target.write_bytes(json.dumps(data,separators=(',',':')).encode())

def mutations():
    return [
      ('forged-origin',lambda r:edit(r,'shadow-origin.json',lambda d:d.__setitem__('signature','0'*128))),
      ('changed-genome',lambda r:edit(r,'shadow-origin.json',lambda d:d['body']['genome'].__setitem__('signal',1))),
      ('forged-experience',lambda r:edit(r,'shadow-event.json',lambda d:d.__setitem__('signature','0'*128))),
      ('changed-interaction',lambda r:edit(r,'shadow-event.json',lambda d:d['body']['data']['evidence']['interaction'].__setitem__('motif',3))),
      ('fake-canonical-vector',lambda r:edit(r,'shadow-result.json',lambda d:d.__setitem__('canonicalBodyHex','00'))),
      ('fake-state-commitment',lambda r:edit(r,'shadow-result.json',lambda d:d.__setitem__('commitment','0'*64))),
      ('missing-cross-domain-proof',lambda r:edit(r,'shadow-negative.json',lambda d:d[1]['origin'].__setitem__('signature','0'*128))),
      ('treatment-is-omission',lambda r:edit(r,'shadow-demo.json',lambda d:d['views'][0].__setitem__('treatment',d['views'][0]['noExperience']))),
      ('ablation-keeps-memory',lambda r:edit(r,'shadow-demo.json',lambda d:d['views'][0].__setitem__('ablation',d['views'][0]['treatment']))),
      ('rejection-causes-change',lambda r:edit(r,'shadow-demo.json',lambda d:d['views'][0].__setitem__('rejectedExperience',d['views'][0]['treatment']))),
      ('forged-memory-source',lambda r:edit(r,'shadow-demo.json',lambda d:d['memory'].__setitem__('eventRef','0'*64))),
      ('asserted-refusal-no-evidence',lambda r:edit(r,'shadow-demo.json',lambda d:d.__setitem__('rejectedEvent',d['rejectedEvent']|{'signature':'1'*128}))),
      ('omitted-source-artifact',lambda r:edit(r,'inventory.json',lambda d:d['artifacts'].pop())),
      ('changed-source-blob-hash',lambda r:edit(r,'inventory.json',lambda d:d['artifacts'][0].__setitem__('sha256','0'*64))),
      ('duplicate-report-key',lambda r:(r/'shadow-result.json').write_bytes((r/'shadow-result.json').read_bytes().replace(b'{',b'{"commitment":"0",',1))),
      ('incomplete-marker-also-present',lambda r:(r/'INCOMPLETE').write_text('retained failure')),
      ('no-complete-marker',lambda r:(r/'COMPLETE').unlink()),
      ('unrecognized-output-member',lambda r:(r/'extra').write_text('not admitted')),
      ('nonregular-complete-marker',lambda r:((r/'COMPLETE').unlink(),(r/'COMPLETE').symlink_to('shadow-origin.json'))),
    ]

def run(source):
    source=Path(source); baseline=checker.check(source)
    results=[]
    with tempfile.TemporaryDirectory(prefix='genesis-redteam-packet-') as scratch:
        for name,mutate in mutations():
            root=Path(scratch)/name;shutil.copytree(source,root);mutate(root)
            try: checker.check(root)
            except Exception as error:
                results.append({'case':name,'outcome':'rejected','exception':type(error).__name__,'detail':str(error)})
            else: results.append({'case':name,'outcome':'UNEXPECTED ACCEPTANCE'})
    out={'scope':'provisional synthetic packet adversarial checks only; no real candidate/birth',
         'sourcePacket':str(source),'baseline':baseline,
         'checkerSha256':hashlib.sha256((HERE/'check_shadow.py').read_bytes()).hexdigest(),
         'inventoryRawSha256':hashlib.sha256((source/'inventory.json').read_bytes()).hexdigest(),
         'mutations':results}
    (HERE/'packet-falsification-results.json').write_text(json.dumps(out,indent=2)+'\n')
    print(json.dumps(out,indent=2))
    return all(r['outcome']=='rejected' for r in results)
if __name__=='__main__': sys.exit(0 if run(sys.argv[1]) else 1)
