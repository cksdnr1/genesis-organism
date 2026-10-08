"""Phase 8 structural and fixed-answer checks; not the independent replay verifier."""
from pathlib import Path
import copy
import hashlib
import json
import unittest
from cryptography.hazmat.primitives.asymmetric.ed25519 import Ed25519PrivateKey, Ed25519PublicKey
from cryptography.exceptions import InvalidSignature
from jsonschema import Draft202012Validator
ROOT=Path(__file__).resolve().parents[1]
FIX=ROOT/'fixtures/core-v1'
def read(n):return json.loads((FIX/n).read_text())
def body_bytes(body):return json.dumps(body,sort_keys=True,separators=(',',':'),ensure_ascii=False).encode() # core keys ASCII only
class Vectors(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.schemas={n:json.loads((ROOT/f'schemas/synthetic/core-v1/{n}.schema.json').read_text()) for n in ['genome','origin','event','state']}
        cls.origin=read('origin.json');cls.events=[read(f'{i:06}.json') for i in range(1,4)];cls.expected=read('expected.json')
    def test_meta_and_positive_shapes(self):
        for d in self.schemas.values():Draft202012Validator.check_schema(d)
        for name,obj in [('origin',self.origin),('genome',self.origin['body']['genome']),('state',self.expected['state']),*[('event',e) for e in self.events]]:
            Draft202012Validator(self.schemas[name]).validate(obj)
    def test_closed_negative_shapes(self):
        bad=[]
        for key,val in [('extra',1),('profile','unknown'),('sequence',True),('sequence',0),('organism','A'*64),('kind','unknown'),('data',{'value':256}),('data',{'value':None})]:
            e=copy.deepcopy(self.events[0]);e['body'][key]=val;bad.append(e)
        e=copy.deepcopy(self.events[0]);del e['signature'];bad.append(e)
        for e in bad:self.assertFalse(Draft202012Validator(self.schemas['event']).is_valid(e))
        for key in self.origin['body']:
            o=copy.deepcopy(self.origin);del o['body'][key]
            self.assertFalse(Draft202012Validator(self.schemas['origin']).is_valid(o))
    def test_rfc8032_test1(self):
        seed=bytes.fromhex('9d61b19deffd5a60ba844af492ec2cc44449c5697b326919703bac031cae7f60')
        signature=bytes.fromhex('e5564300c360ac729086e2cc806e828a84877f1eb8e5d974d873e065224901555fb8821590a33bacc61e39701cf9b46bd25bf5f0595bbe24655141438e7a100b')
        public=bytes.fromhex('d75a980182b10ab7d54bfed3c964073a0ee172f3daa62325af021a68f707511a')
        self.assertEqual(Ed25519PrivateKey.from_private_bytes(seed).sign(b''),signature)
        Ed25519PublicKey.from_public_bytes(public).verify(signature,b'')
        with self.assertRaises(InvalidSignature):Ed25519PublicKey.from_public_bytes(public).verify(signature,b'x')
    def test_fixture_proofs_and_domains(self):
        authority=self.origin['body']['authority']
        for kind,e in [('origin',self.origin),*[('event',e) for e in self.events]]:
            msg=f'genesis-organism/synthetic-v1/{kind}-proof\0'.encode()+body_bytes(e['body'])
            key=Ed25519PublicKey.from_public_bytes(bytes.fromhex(authority));key.verify(bytes.fromhex(e['signature']),msg)
            with self.assertRaises(InvalidSignature):key.verify(bytes.fromhex(e['signature']),b'wrong-domain'+msg)
            if e['body'].get('kind')=='rotate-v1':authority=e['body']['data']['authority']
        for kind,body,expected in [('origin',self.origin['body'],self.expected['originId']),('state',self.expected['state'],self.expected['commitment']),*[('event',e['body'],ref) for e,ref in zip(self.events,self.expected['eventRefs'])]]:
            self.assertEqual(hashlib.sha256(f'genesis-organism/synthetic-v1/{kind}\0'.encode()+body_bytes(body)).hexdigest(),expected)
    def test_literal_canonical_vectors(self):
        data=read('bytes.json')
        for vector in data['valid']:
            self.assertEqual(json.loads(vector['utf8']),vector['value'])
        self.assertEqual(data['valid'][5]['utf8'],'{"😀":2,"\ue000":1}')
        self.assertEqual(data['valid'][6]['utf8'],'{"10":10,"2":2}')
        self.assertEqual(len(data['invalidHex']),14)
        # Invalid wire cases are future parser obligations; do not call JSON parsing conformance.
    def test_declared_state_from_contract(self):
        s=self.expected['state']
        self.assertEqual((s['sequence'],s['signal']),(3,7))
        self.assertEqual(s['authority'],self.events[1]['body']['data']['authority'])
        self.assertEqual(s['head'],self.expected['eventRefs'][-1])
if __name__=='__main__':unittest.main()
