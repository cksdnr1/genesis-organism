"""Independent preparation checker: no JS invocation, no archive code execution."""
from pathlib import Path
import copy
import hashlib
import importlib.metadata
import json
import os
import platform
import re
import stat
import subprocess
import sys
ROOT = Path(__file__).resolve().parents[4]
sys.path.insert(0, str(ROOT / 'verifier'))
from verify import Invalid, canonical, classify, digest, exact, need, origin_state, parse
from lineage import history_states
from cryptography.hazmat.primitives.asymmetric.ed25519 import Ed25519PublicKey

def read(root, name):
    fd = os.open(root / name, os.O_RDONLY | os.O_NOFOLLOW | os.O_NONBLOCK)
    try:
        info = os.fstat(fd)
        need(stat.S_ISREG(info.st_mode) and info.st_size <= 8*1024*1024, 'regular bounded evidence')
        data = os.read(fd, info.st_size+1)
        need(len(data) == info.st_size, 'evidence read changed')
    finally: os.close(fd)
    return data

def unique_object(pairs):
    value={}
    for key,item in pairs:
        need(key not in value,'duplicate report key'); value[key]=item
    return value

def load(root, name, wire=False):
    data=read(root,name)
    return parse(data) if wire else json.loads(data.decode('utf-8'),object_pairs_hook=unique_object)

def same(actual, expected, label):
    need(canonical(actual) == canonical(expected), label)

def expected_view(state, cap, subject, memory, synapse, ablation=False):
    observer = {'version':'observer-v1','observerType':'mock-'+cap,'subject':subject,
                'capabilities':{cap:{'supported':True,'evidence':'claimed'}}}
    if cap == 'spatial': observer['capabilities'][cap].update(frame='fixture-plane-v1',unit='mm')
    policy = {'version':'policy-related-v1','allow':['relationship-text-v1','relationship-symbols-v1','relationship-path-v1'],
              'disclosure':'public-synthetic','relationships':True}
    signal=state['signal']; base=[signal,(signal+64)%256,(signal+128)%256,255-signal]
    offset=synapse['motif'] if synapse else 0; grammar=base[offset:]+base[:offset]
    kind={'text':'relationship-text-v1','symbols':'relationship-symbols-v1','spatial':'relationship-path-v1'}[cap]
    presentation='grammar:'+','.join(map(str,grammar)) if cap=='text' else grammar if cap=='symbols' else {
        'frame':'fixture-plane-v1','unit':'mm','points':[[token,i] for i,token in enumerate(grammar)]}
    output={'kind':kind,'signal':signal,'grammar':grammar,'presentation':presentation}
    procedure='control-no-memory-v1' if ablation else 'relationship-expression-v1'
    return {'procedure':procedure,'sourceStateRef':digest('state',state),
            'observerProfileCommitment':digest('observer',observer),'accessPolicyCommitment':digest('policy',policy),
            'memorySource':memory['eventRef'] if memory else None,
            'expressionInputCommitment':digest('expression-input',{'procedure':procedure,'state':state,'observer':observer,
                                                                 'policy':policy,'memory':memory,'synapse':synapse}),
            'expressionOutputDigest':digest('expression-output',output),'output':output}

def check_demo(origin,event,report):
    states=history_states({'origin':origin,'events':[event],'lineage':None})
    initial, treatment=states
    need(initial['signal']==0 and treatment['signal']==2,'adaptation0to2')
    evidence=event['body']['data']['evidence']; subject=evidence['observer']['subject']
    need(subject=='provisional-observer' and evidence['nonce']=='provisional-encounter-one','shadow encounter scope')
    need(evidence['interaction']=={'motif':2,'message':'PROVISIONAL SYNTHETIC INPUT'},'shadow public interaction')
    ref=digest('event',event['body'])
    need(classify(states,{ref},event,[event])==('duplicate',ref),'independent duplicate')
    rejected=copy.deepcopy(event); rejected['signature']='0'*128
    same(report['rejectedEvent'],rejected,'actual rejected event evidence')
    try: classify([initial],set(),rejected,[])
    except Invalid as error: need(error.code=='invalid','forged event invalid')
    else: raise Invalid('invalid','forged experience accepted')
    memory={'subject':subject,'motif':2,'encounterId':digest('encounter',evidence),'eventRef':ref}
    synapse=dict(memory,scope='directional-claim',partnerConsent='unverified')
    same(report['memory'],memory,'memory provenance'); same(report['synapse'],synapse,'synapse provenance')
    same(report['restoredState'],treatment,'treatment state'); same(report['rejectedState'],initial,'rejected state')
    need((report['admission'],report['retry'],report['refusal'])==('accepted','duplicate','invalid'),'reported outcomes')
    need([v['capability'] for v in report['views']]==['text','symbols','spatial'],'three views')
    for view in report['views']:
        cap=view['capability']
        for arm in ('noExperience','rejectedExperience','treatment','ablation'):
            treated=arm in ('treatment','ablation'); effect=arm=='treatment'
            expected=expected_view(treatment if treated else initial,cap,subject,memory if effect else None,synapse if effect else None,arm=='ablation')
            same(view[arm],expected,'independent '+cap+' '+arm)
        need(view['treatment']['output']!=view['ablation']['output'],'within-state memory effect')
        need(view['noExperience']['output']==view['rejectedExperience']['output'],'rejected has no effect')
    return {'views':12,'initialSignal':0,'treatmentSignal':2,'withinTreatmentMemoryEffect':True}

def check(root):
    root=Path(root)
    expected={'inventory.json','environment.json','shadow-origin.json','shadow-result.json','shadow-negative.json','shadow-event.json','shadow-demo.json','demo.json','COMPLETE'}
    need(set(p.name for p in root.iterdir())==expected,'complete exact preparation member set')
    marker=read(root,'COMPLETE').decode('utf-8')
    need('PROVISIONAL' in marker and 'UNBORN' in marker,'provisional completion scope')
    origin=load(root,'shadow-origin.json',True); event=load(root,'shadow-event.json',True)
    state=origin_state(origin)
    body=origin['body']
    need(body['profile']=='synthetic-v1' and body['rules']=='adaptation-v1' and body['birth']=='provisional-birth-readiness-shadow','shadow origin scope')
    need(body['creator']=='PROVISIONAL SYNTHETIC TEST ONLY' and body['genome']=={'signal':0},'shadow not real origin')
    need(body['authority'] not in {'d75a980182b10ab7d54bfed3c964073a0ee172f3daa62325af021a68f707511a'},'not public rehearsal key')
    result=load(root,'shadow-result.json')
    exact(result,('purpose','state','commitment','canonicalBodyHex','originProofPrefixHex'))
    same(result['state'],state,'origin state'); need(result['commitment']==digest('state',state),'origin commitment')
    need(result['canonicalBodyHex']==canonical(body).hex(),'literal canonical bytes')
    need(result['originProofPrefixHex']==b'genesis-organism/synthetic-v1/origin-proof\0'.hex(),'exact proof prefix')
    negatives=load(root,'shadow-negative.json'); need(len(negatives)==2,'negative case count')
    forged_count=0; alternate_count=0
    for case in negatives:
        exact(case,('case','origin','expectedCode')); need(case['expectedCode']=='invalid','negative expected class')
        same(case['origin']['body'],body,'negative exact same preimage')
        if case['origin']['signature']=='0'*128: forged_count+=1
        else:
            Ed25519PublicKey.from_public_bytes(bytes.fromhex(body['authority'])).verify(bytes.fromhex(case['origin']['signature']),b'genesis-organism/genesis-v1/origin-proof\0'+canonical(body))
            alternate_count+=1
        try: origin_state(case['origin'])
        except Invalid as error: need(error.code==case['expectedCode'],'negative actual class')
        else: raise Invalid('invalid','negative origin accepted')
    need((forged_count,alternate_count)==(1,1),'one forged and one real alternate-domain proof')
    environment=load(root,'environment.json'); exact(environment,('node','platform','arch'))
    causal=check_demo(origin,event,load(root,'shadow-demo.json'))
    inventory=load(root,'inventory.json'); exact(inventory,('version','purpose','revision','selection','artifacts'))
    revision=inventory['revision']; need(type(revision) is str and re.fullmatch('[0-9a-f]{40}',revision),'full revision')
    need(subprocess.check_output(['git','cat-file','-t',revision],cwd=ROOT).strip()==b'commit','commit revision')
    tree=subprocess.check_output(['git','ls-tree','-rz',revision],cwd=ROOT).split(b'\0')
    blobs={}
    for entry in filter(None,tree):
        meta,name=entry.split(b'\t',1); mode,kind,oid=meta.split(b' ')
        path=name.decode()
        if path.startswith('.playspec/'): continue
        need(mode in (b'100644',b'100755') and kind==b'blob','regular selected Git blob')
        blobs[path]=oid.decode()
    need(0<len(blobs)<=1024,'artifact budget')
    need([x['path'] for x in inventory['artifacts']]==sorted(blobs),'complete tracked selection')
    total=0
    for item in inventory['artifacts']:
        exact(item,('path','sha256','size')); need(type(item['size']) is int,'inventory integer size')
        size=int(subprocess.check_output(['git','cat-file','-s',blobs[item['path']]],cwd=ROOT))
        need(size<=8*1024*1024,'per-blob budget'); total+=size
        need(total<=32*1024*1024,'aggregate raw budget')
        raw=subprocess.check_output(['git','cat-file','blob',blobs[item['path']]],cwd=ROOT)
        need(len(raw)==item['size'] and hashlib.sha256(raw).hexdigest()==item['sha256'],'raw Git inventory binding')
    return {'scope':'independent provisional synthetic preparation only; actual #0001 NO-GO',
            'revision':revision,'artifacts':len(blobs),'rawBytes':total,'originCommitment':state['organism'],
            'causal':causal,'python':platform.python_version(),
            'dependencies':{name:importlib.metadata.version(name) for name in ('cryptography','jsonschema')}}

if __name__=='__main__':
    try: print(json.dumps(check(sys.argv[1]),indent=2))
    except (Invalid,ValueError,KeyError,TypeError,OSError,subprocess.SubprocessError) as error:
        print(type(error).__name__+': '+str(error),file=sys.stderr); sys.exit(1)
