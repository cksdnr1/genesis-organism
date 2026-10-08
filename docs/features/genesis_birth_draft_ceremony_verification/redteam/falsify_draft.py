"""Independent attacks on owned PUBLIC TEST fixture copies; no real keys/actions."""
from pathlib import Path
import hashlib
import importlib.util
import json
import os
import shutil
import stat
import subprocess
import sys
import tempfile
HERE=Path(__file__).resolve().parent
spec=importlib.util.spec_from_file_location('draft_checker',HERE/'check_draft.py')
c=importlib.util.module_from_spec(spec);spec.loader.exec_module(c)
from cryptography.hazmat.primitives.asymmetric.ed25519 import Ed25519PrivateKey
# RFC8032 TEST1 public test seed, already published in tests/helpers.mjs. Never real.
KEY=Ed25519PrivateKey.from_private_bytes(bytes.fromhex('9d61b19deffd5a60ba844af492ec2cc44449c5697b326919703bac031cae7f60'))
def signed(kind,body,domain='ceremony-v1'):
    msg=('genesis-organism/'+domain+'/'+kind+'-proof\0').encode()+c.canonical(body)
    return {'body':body,'signature':KEY.sign(msg).hex()}
def pretty(v):return (json.dumps(v,indent=2)+'\n').encode()
def get(path):return json.loads(path.read_bytes())
def save(path,v,wire=False):path.write_bytes(c.canonical(v) if wire else pretty(v))
def mutate(root,name,fn,wire=False):
    p=root/name;v=get(p);fn(v);save(p,v,wire)
def snapshot(root):
    out=[]
    for p in sorted(root.rglob('*')):
        s=p.lstat();mode=stat.S_IFMT(s.st_mode)
        detail=os.readlink(p) if stat.S_ISLNK(s.st_mode) else c.sha(p.read_bytes()) if stat.S_ISREG(s.st_mode) else ''
        out.append([str(p.relative_to(root)),mode,detail])
    return out

def repair_graph(root):
    """Re-sign only public TEST records to isolate semantic checks from bad hashes."""
    j=root/'journal';m=get(j/'manifest.json');m['inventorySha256']=c.sha((j/'inventory.json').read_bytes());save(j/'manifest.json',m,True)
    manifest_ref=c.ref('manifest',m)
    freeze=signed('freeze',{'ceremony':'ceremony-v1','manifestRef':manifest_ref,'authority':c.TEST_KEY});save(j/'freeze.json',freeze,True)
    inv=get(j/'public-package-inventory.json')
    for item in inv['files']:
        p=j/item['path']
        if p.is_file():
            data=p.read_bytes();item.update(sha256=c.sha(data),size=len(data))
            for alias in ('archive-a','archive-b','public-package'):(root/alias/item['path']).write_bytes(data)
    save(j/'public-package-inventory.json',inv);inv_hash=c.sha((j/'public-package-inventory.json').read_bytes())
    for alias,filename in [('archive-a','archive-a-retrieval.json'),('archive-b','archive-b-retrieval.json'),('public-package','public-retrieval.json')]:
        log=get(root/filename);log['packageInventorySha256']=inv_hash;save(root/filename,log)
    report=get(j/'archive-report.json');report['manifestRef']=manifest_ref;report['publication']['packageInventorySha256']=inv_hash
    for a in report['archives']:a['retrievalEvidenceSha256']=c.sha((root/(a['location']+'-retrieval.json')).read_bytes())
    report['publication']['retrievalEvidenceSha256']=c.sha((root/'public-retrieval.json').read_bytes());report['verification']['resultsSha256']=c.sha((root/'public-retrieval.json').read_bytes())
    save(j/'archive-report.json',report)
    release=signed('release',{'ceremony':'ceremony-v1','manifestRef':manifest_ref,'freezeRef':c.ref('freeze',freeze),'archiveReportRef':c.sha((j/'archive-report.json').read_bytes()),'authority':c.TEST_KEY})
    save(j/'release.json',release,True);save(root/'release-retrieval.json',release,True);release_ref=c.ref('release',release)
    pub=get(j/'release-publication.json');pub.update(releaseRef=release_ref,retrievalEvidenceSha256=c.sha((root/'release-retrieval.json').read_bytes()));save(j/'release-publication.json',pub)
    body=get(j/'birth.json')['body'];body.update(manifestRef=manifest_ref,releaseRef=release_ref,releasePublicationRef=c.sha((j/'release-publication.json').read_bytes()))
    birth=signed('birth',body);save(j/'birth.json',birth,True)
    for p in (j/'accepted').iterdir():save(p,birth,True)

def cases():
    def numeric(root,token):
        p=root/'journal/inventory.json';data=p.read_text();v=get(p)['artifacts'][0]['size']
        p.write_text(data.replace('"size": '+str(v),'"size": '+str(v)+token,1));repair_graph(root)
    return [
      ('positive-reversed-archive-order',True,lambda r,t:(mutate(r,'journal/archive-report.json',lambda d:d['archives'].reverse()),repair_graph(r))),
      ('rounded-fraction-self-consistent',False,lambda r,t:numeric(r,'.0000000000000001')),
      ('decimal-alias-self-consistent',False,lambda r,t:numeric(r,'.0')),
      ('exponent-alias-self-consistent',False,lambda r,t:numeric(r,'e0')),
      ('restored-false-valid-proofs',False,lambda r,t:(mutate(r,'journal/archive-report.json',lambda d:d['archives'][0].__setitem__('restored',False)),repair_graph(r))),
      ('unknown-report-field-valid-proofs',False,lambda r,t:(mutate(r,'journal/archive-report.json',lambda d:d.__setitem__('unknown',True)),repair_graph(r))),
      ('wrong-public-location-valid-proofs',False,lambda r,t:(mutate(r,'journal/archive-report.json',lambda d:d['publication'].__setitem__('location','other')),repair_graph(r))),
      ('wrong-issued-nonce',False,lambda r,t:mutate(r,'journal/possession.json',lambda d:d.update(signed('possession',d['body']|{'nonce':'2'*64})),True)),
      ('cross-domain-birth-proof',False,lambda r,t:mutate(r,'journal/birth.json',lambda d:d.update(signed('birth',d['body'],'synthetic-v1')),True)),
      ('untrusted-authority',False,lambda r,t:t.__setitem__('authority','0'*64)),
      ('untrusted-binding',False,lambda r,t:t.__setitem__('creatorBindingRef','0'*64)),
      ('source-byte-corruption',False,lambda r,t:(r/'archive-a/files/spec/GENESIS.md').write_text('changed')),
      ('missing-dependency',False,lambda r,t:(r/'public-package/dependencies/test-dependency').unlink()),
      ('extra-empty-directory',False,lambda r,t:(r/'archive-b/extra').mkdir()),
      ('source-symlink',False,lambda r,t:((r/'archive-a/origin.json').unlink(),(r/'archive-a/origin.json').symlink_to('../../journal/origin.json'))),
      ('unrelated-release-retrieval',False,lambda r,t:(r/'release-retrieval.json').write_text('{}')),
      ('unknown-prior-supersession',False,lambda r,t:mutate(r,'journal/manifest.json',lambda d:d.__setitem__('supersedes','1'*64),True)),
      ('held-lock',False,lambda r,t:(r/'journal/LOCK').write_text('{}')),
      ('retained-pending',False,lambda r,t:(r/'journal/pending/diagnostic').write_text('partial')),
      ('retained-conflict',False,lambda r,t:(r/'journal/conflicts/diagnostic').write_text('conflict')),
      ('second-accepted-origin',False,lambda r,t:(r/'journal/accepted'/('0'*64+'.json')).write_text('{}')),
      ('duplicate-report-key',False,lambda r,t:(r/'journal/archive-report.json').write_text((r/'journal/archive-report.json').read_text().replace('{','{"version":"archive-report-v1",',1))),
      ('fifo-no-writer',False,lambda r,t:((r/'journal/possession.json').unlink(),os.mkfifo(r/'journal/possession.json'))),
    ]

def run(source,context):
    baseline=c.check(source,context);records=[]
    with tempfile.TemporaryDirectory(prefix='genesis-child-redteam-') as scratch:
        for name,expected,change in cases():
            root=Path(scratch).resolve()/name;shutil.copytree(source,root);trusted=get(Path(context));change(root,trusted)
            ctx=Path(scratch).resolve()/(name+'-context.json');save(ctx,trusted,True);before=snapshot(root)
            try:result=c.check(root,ctx);python_ok=True;python_detail=result
            except Exception as error:python_ok=False;python_detail=type(error).__name__+': '+str(error)
            js=subprocess.run(['node',str(c.ROOT/'tools/check_draft_ceremony.mjs'),str(root),str(ctx)],cwd=c.ROOT,capture_output=True,text=True,timeout=5)
            js_ok=js.returncode==0
            if expected and python_ok and js_ok:matching=json.loads(js.stdout)==python_detail
            else:matching=python_ok==js_ok
            unchanged=before==snapshot(root)
            records.append({'case':name,'expectedAccept':expected,'pythonAccept':python_ok,'jsAccept':js_ok,'agreement':matching,'readOnly':unchanged,'pythonDetail':python_detail,'jsDiagnostic':js.stderr.strip()})
    out={'scope':'independent PUBLIC TEST consistency/failure checks; no actual creator permission or physical operations',
         'baseline':baseline,'checkerSha256':c.sha((HERE/'check_draft.py').read_bytes()),'cases':records}
    (HERE/'falsification-results.json').write_text(json.dumps(out,indent=2)+'\n');print(json.dumps(out,indent=2))
    return all(x['pythonAccept']==x['expectedAccept'] and x['jsAccept']==x['expectedAccept'] and x['agreement'] and x['readOnly'] for x in records)
if __name__=='__main__':sys.exit(0 if run(Path(sys.argv[1]),Path(sys.argv[2])) else 1)
