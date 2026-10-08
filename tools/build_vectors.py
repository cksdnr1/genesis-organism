"""Rebuild only public, synthetic core-v1 vectors. NEVER use these RFC keys for real data."""
from pathlib import Path
import hashlib
import json
from cryptography.hazmat.primitives.asymmetric.ed25519 import Ed25519PrivateKey
from cryptography.hazmat.primitives.serialization import Encoding, PublicFormat

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'fixtures' / 'core-v1'
# Public RFC 8032 section 7.1 TEST 1 and TEST 2 seeds; not secret credentials.
SEEDS = ['9d61b19deffd5a60ba844af492ec2cc44449c5697b326919703bac031cae7f60',
         '4ccd089b28ff96da9db6c346ec114e0f5b8a319f35aba624da8cf6ed4fb8a6fb']

def canonical(v):
    """Fixture producer only: inputs are explicit trusted literals, not untrusted wire."""
    if isinstance(v, dict):
        return '{' + ','.join(json.dumps(k, ensure_ascii=False)+':'+canonical(v[k]) for k in sorted(v, key=lambda k:k.encode('utf-16be'))) + '}'
    if isinstance(v, list): return '['+','.join(map(canonical,v))+']'
    return json.dumps(v, ensure_ascii=False, separators=(',',':'), allow_nan=False)

def prefix(kind): return ('genesis-organism/synthetic-v1/'+kind+'\0').encode()
def digest(kind,v): return hashlib.sha256(prefix(kind)+canonical(v).encode()).hexdigest()
def proof(kind,body,key):return {'body':body,'signature':key.sign(prefix(kind+'-proof')+canonical(body).encode()).hex()}
def put(name,v):OUT.joinpath(name).write_bytes(canonical(v).encode())

def main():
    OUT.mkdir(parents=True, exist_ok=True)
    keys=[Ed25519PrivateKey.from_private_bytes(bytes.fromhex(s)) for s in SEEDS]
    pubs=[k.public_key().public_bytes(Encoding.Raw,PublicFormat.Raw).hex() for k in keys]
    origin=proof('origin',{'profile':'synthetic-v1','rules':'core-v1','birth':'fixture-core-001','creator':'PUBLIC SYNTHETIC TEST FIXTURE','authority':pubs[0],'genome':{'signal':0}},keys[0])
    oid=digest('origin',origin['body']); head=oid; events=[]
    for seq,(kind,data,key) in enumerate([('signal-v1',{'value':42},keys[0]),('rotate-v1',{'authority':pubs[1]},keys[0]),('signal-v1',{'value':7},keys[1])],1):
        ev=proof('event',{'profile':'synthetic-v1','organism':oid,'sequence':seq,'previous':head,'kind':kind,'data':data},key)
        events.append(ev);head=digest('event',ev['body']);put(f'{seq:06}.json',ev)
    put('origin.json',origin)
    state={'profile':'synthetic-v1','rules':'core-v1','organism':oid,'authority':pubs[1],'sequence':3,'head':head,'signal':7}
    put('expected.json',{'originId':oid,'eventRefs':[digest('event',e['body']) for e in events],'state':state,'commitment':digest('state',state)})
    # Literal expected encodings: not obtained by calling canonical() on their values.
    vectors=[
      {'name':'null','value':None,'utf8':'null'},
      {'name':'absent','value':{},'utf8':'{}'},
      {'name':'explicit-null','value':{'x':None},'utf8':'{"x":null}'},
      {'name':'safe-max','value':9007199254740991,'utf8':'9007199254740991'},
      {'name':'safe-min','value':-9007199254740991,'utf8':'-9007199254740991'},
      {'name':'utf16-order','value':{'\ue000':1,'\U0001f600':2},'utf8':'{"😀":2,"\ue000":1}'},
      {'name':'numeric-key-order','value':{'2':2,'10':10},'utf8':'{"10":10,"2":2}'},
      {'name':'unicode-no-normalization','value':['é','e\u0301'],'utf8':'["é","é"]'},
      {'name':'escapes','value':'\n\x01"\\','utf8':'"\\n\\u0001\\"\\\\"'},
    ]
    raw_bad=[b'{"x":1,"x":1}',b'{"x":1,"x":2}',b'-0',b'1.0',b'1e0',b'9007199254740992',b'NaN',b'"\\ud800"',b'null\n',b' { }',b'"\\u0061"',b'\xef\xbb\xbfnull',b'"\xff"',b'{"b":1,"a":2}']
    put('bytes.json',{'valid':vectors,'invalidHex':[x.hex() for x in raw_bad]})
    OUT.joinpath('SYNTHETIC').write_bytes(b'genesis-organism synthetic-v1\n')
    print('Built public synthetic core-v1 fixtures (no real organism).')

if __name__=='__main__':main()
