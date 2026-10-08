"""Independent unsigned proposal byte checks; not ceremony acceptance or signing."""
import hashlib
import json
from pathlib import Path
import sys
ROOT=Path(__file__).resolve().parents[4]
sys.path.insert(0,str(ROOT/'verifier'))
from verify import canonical, exact, need

def check():
    path=ROOT/'docs/features/genesis_organism_birth_readiness/ceremony-vectors.json'
    raw=path.read_bytes(); data=json.loads(raw)
    exact(data,('purpose','vectors'))
    need(data['purpose']=='UNSIGNED PUBLIC TEST VECTORS; NO ACTUAL KEY/ORIGIN/AUTHORIZATION','test-only scope')
    need([v['kind'] for v in data['vectors']]==['creator-binding','manifest','possession','freeze','release','birth'],'exact vector set')
    results=[]
    for vector in data['vectors']:
        exact(vector,('kind','body','canonicalHex','prefixHex','messageHex','messageSha256'))
        suffix='-proof' if vector['kind'] in ('possession','freeze','release','birth') else ''
        prefix=('genesis-organism/ceremony-v1/'+vector['kind']+suffix+'\0').encode('ascii')
        body=canonical(vector['body']); message=prefix+body
        need(body.hex()==vector['canonicalHex'],'canonical bytes')
        need(prefix.hex()==vector['prefixHex'],'domain bytes')
        need(message.hex()==vector['messageHex'],'message bytes')
        need(hashlib.sha256(message).hexdigest()==vector['messageSha256'],'message digest')
        results.append({'kind':vector['kind'],'canonicalBytes':len(body),'messageSha256':vector['messageSha256']})
    return {'scope':'unsigned PUBLIC TEST byte mechanics only; no actual key, origin, approval or runtime acceptance',
            'vectorFileSha256':hashlib.sha256(raw).hexdigest(),'vectors':results}
if __name__=='__main__': print(json.dumps(check(),indent=2))
