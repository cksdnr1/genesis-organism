"""Independent bounded probes; execute from repository root with .venv/bin/python."""
import hashlib,json,os,platform,shutil,subprocess,tempfile,time
from pathlib import Path
import sys
sys.path.insert(0,str(Path('verifier').resolve()))
import verify as v
from cryptography.hazmat.primitives.asymmetric.ed25519 import Ed25519PrivateKey
OUT=Path('docs/features/genesis_organism_independent_conformance/runtime')
key=Ed25519PrivateKey.from_private_bytes(bytes.fromhex('9d61b19deffd5a60ba844af492ec2cc44449c5697b326919703bac031cae7f60'))
def sign(body):
 return dict(body=body,signature=key.sign(b'genesis-organism/synthetic-v1/event-proof\0'+v.canonical(body)).hex())
def command(args,timeout=5,input=None):
 start=time.monotonic()
 try:
  p=subprocess.run(args,input=input,capture_output=True,timeout=timeout)
  return dict(args=args,exit=p.returncode,stdout=p.stdout.decode(errors='replace'),stderr=p.stderr.decode(errors='replace'),seconds=round(time.monotonic()-start,3))
 except subprocess.TimeoutExpired:
  return dict(args=args,timeout=timeout,seconds=round(time.monotonic()-start,3))
def snapshot(d):
 return {str(p.relative_to(d)):hashlib.sha256(p.read_bytes()).hexdigest() for p in sorted(d.rglob('*')) if p.is_file()}
origin=json.loads(Path('fixtures/encounter-v1/origin.json').read_bytes())
event=json.loads(Path('fixtures/encounter-v1/000001.json').read_bytes())
results={'head':command(['git','rev-parse','HEAD']),'node':command(['node','--version']),'python':sys.version,'platform':platform.platform(),'cases':[]}
with tempfile.TemporaryDirectory(prefix='independent-runtime-') as tmp:
 root=Path(tmp)
 def history(name,candidate=None):
  d=root/name;d.mkdir();(d/'SYNTHETIC').write_bytes(b'genesis-organism synthetic-v1\n');(d/'origin.json').write_bytes(v.canonical(origin))
  if candidate is not None:(d/'000001.json').write_bytes(v.canonical(candidate))
  return d
 good=history('control',event)
 results['valid_control']=[command(['node','src/cli.mjs','replay',str(good)]),command(['.venv/bin/python','verifier/verify.py',str(good)])]
 assert all(r['exit']==0 for r in results['valid_control'])
 assert json.loads(results['valid_control'][0]['stdout'])==json.loads(results['valid_control'][1]['stdout'])
 variants={}
 def variant(name,fn):
  b=json.loads(json.dumps(event['body']));fn(b);variants[name]=sign(b)
 variant('wrong-organism-and-unknown-kind',lambda b:b.update(organism='0'*64,kind='unknown-v1'))
 variant('wrong-organism-and-wrong-data',lambda b:b.update(organism='0'*64,data={'unknown':0}))
 variant('unknown-parent-and-unknown-kind',lambda b:b.update(previous='0'*64,kind='unknown-v1'))
 variant('unknown-evidence-version',lambda b:b['data']['evidence'].update(version='evidence-v999'))
 variant('private-policy-and-unknown-evidence-version',lambda b:(b['data']['evidence']['policy'].update(disclosure='private'),b['data']['evidence'].update(version='evidence-v999')))
 variant('private-policy',lambda b:b['data']['evidence']['policy'].update(disclosure='private'))
 variant('policy-version',lambda b:b['data']['evidence']['policy'].update(version='policy-v999'))
 variant('unknown-capability',lambda b:b['data']['evidence']['observer']['capabilities'].update(unknown={'supported':True,'evidence':'claimed'}))
 variant('changed-policy-output-binding',lambda b:b['data']['evidence']['policy'].update(allow=['symbols-v1']))
 variant('changed-message-valid',lambda b:b['data']['evidence']['interaction'].update(message='a new captured synthetic message'))
 variant('invalid-source-and-private-policy',lambda b:(b['data']['evidence']['sourceState'].update(signal=999),b['data']['evidence']['policy'].update(disclosure='private')))
 variants['invalid-proof']=dict(event,signature='0'*128)
 variants['unknown-profile-malformed-signature']=dict(body=dict(event['body'],profile='synthetic-v999'),signature='broken')
 for name,candidate in variants.items():
  d=history(name,candidate);before=snapshot(d)
  outcomes=[command(['node','src/cli.mjs','replay',str(d)]),command(['.venv/bin/python','verifier/verify.py',str(d)])]
  assert snapshot(d)==before
  case=dict(name=name,verification=outcomes,read_only=True)
  clean=history(name+'-append'); source=root/(name+'.json');source.write_bytes(v.canonical(candidate)); before=snapshot(clean)
  case['append']=command(['node','src/cli.mjs','append',str(clean),str(source)])
  case['no_write']=snapshot(clean)==before
  if name!='changed-message-valid':assert case['append']['exit']==1 and case['no_write']
  else:assert case['append']['exit']==0 and not case['no_write']
  results['cases'].append(case)
 results['depth']=[]
 for n in [16,17,100,1000,10000,30000]:
  raw=b'['*n+b'0'+b']'*n
  js="import{parseCanonical}from'./src/bytes.mjs';try{parseCanonical(Buffer.from(process.argv[1],'hex'));console.log('accepted')}catch(e){console.log(JSON.stringify({error:e.code,message:e.message}))}"
  results['depth'].append(dict(depth=n,bytes=len(raw),node=command(['node','--input-type=module','-e',js,raw.hex()]),python=command(['.venv/bin/python','verifier/verify.py','--bytes',raw.hex()])))
 # Existing trusted-directory files can be malformed. Both tools promise regular-file rejection.
 fifo=history('fifo');(fifo/'000001.json').unlink(missing_ok=True);os.mkfifo(fifo/'000001.json')
 results['fifo']=[command(['node','src/cli.mjs','replay',str(fifo)],timeout=1),command(['.venv/bin/python','verifier/verify.py',str(fifo)],timeout=1)]
 # Local input-file boundary, independent of history-directory promise.
 fi=root/'input-fifo';os.mkfifo(fi)
 results['input_fifo']=command(['node','src/cli.mjs','append',str(good),str(fi)],timeout=1)
 def handshake(args,pipe,watched):
  before=snapshot(watched);p=subprocess.Popen(args,stdout=subprocess.PIPE,stderr=subprocess.PIPE);time.sleep(0.3)
  blocked=p.poll() is None
  # Nonblocking writer open succeeds only when the waiting read side exists.
  fd=os.open(pipe,os.O_WRONLY|os.O_NONBLOCK);os.close(fd)
  out,err=p.communicate(timeout=3)
  return dict(args=args,waiting_after_seconds=0.3,waiting=blocked,writer_open_succeeded=True,exit=p.returncode,stdout=out.decode(),stderr=err.decode(),no_write=snapshot(watched)==before)
 results['fifo_handshake']=[handshake(['node','src/cli.mjs','replay',str(fifo)],fifo/'000001.json',fifo),handshake(['.venv/bin/python','verifier/verify.py',str(fifo)],fifo/'000001.json',fifo)]
 results['input_fifo_handshake']=handshake(['node','src/cli.mjs','append',str(good),str(fi)],fi,good)
 for r in results['fifo_handshake']+[results['input_fifo_handshake']]:
  assert r['waiting'] and r['exit']==1 and not r['stdout'] and json.loads(r['stderr'])['error']=='invalid' and r['no_write']
 results['control_after_fifo']=[command(['node','src/cli.mjs','replay',str(good)]),command(['.venv/bin/python','verifier/verify.py',str(good)])]
 assert all(r['exit']==0 for r in results['control_after_fifo'])
(OUT/'probe-results.json').write_text(json.dumps(results,indent=2)+'\n')
print(json.dumps({'cases':len(results['cases']),'no_write_failures':sum(not c['no_write'] for c in results['cases'] if c['name']!='changed-message-valid'),'fifo':results['fifo'],'input_fifo':results['input_fifo']},indent=2))
