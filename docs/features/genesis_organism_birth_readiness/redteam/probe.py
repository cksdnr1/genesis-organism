"""Independent narrow probes. No real key generation, acceptance or Git mutation."""
import hashlib
import importlib.util
import json
from pathlib import Path
import subprocess
import sys
ROOT = Path(__file__).resolve().parents[4]
sys.path.insert(0, str(ROOT / 'verifier'))
from verify import canonical, parse, Invalid, origin_state, digest
spec = importlib.util.spec_from_file_location('causal_audit', ROOT / 'tools/audit_causal.py')
causal = importlib.util.module_from_spec(spec); spec.loader.exec_module(causal)
results = []
def run(name, fn):
    try:
        details = fn()
        results.append({'probe': name, 'result': 'pass', 'detail': details})
    except Exception as error:
        results.append({'probe': name, 'result': 'fail', 'detail': type(error).__name__ + ': ' + str(error)})
def canonical_agreement():
    value = {'\U0001f600': 1, '\ue000': 2, '10': [None, True, 9007199254740991], '2': '\u00e9e\u0301'}
    js = "import {canonical} from './src/bytes.mjs'; process.stdout.write(canonical(JSON.parse(process.argv[1])));"
    data = subprocess.check_output(['node', '--input-type=module', '-e', js, json.dumps(value)], cwd=ROOT)
    assert canonical(value) == data
    return {'sha256': hashlib.sha256(data).hexdigest(), 'utf16Ordering': True}
def malformed():
    values = [b'{"x":1,"x":1}', b'{"x":1.0}', b'{"x":1e0}', b'{"x":-0}', b' {"x":1}', b'{"x":"\\ud800"}', b'{"x":"\xff"}']
    js = "import {parseCanonical} from './src/bytes.mjs'; try {parseCanonical(Buffer.from(process.argv[1],'hex'));process.exit(2)} catch(e) {process.stdout.write(e.code)}"
    for data in values:
        try: parse(data)
        except Invalid: pass
        else: raise AssertionError('Python accepted malformed wire')
        assert subprocess.check_output(['node','--input-type=module','-e',js,data.hex()], cwd=ROOT).decode() == 'invalid'
    return len(values)
def origin_agreement():
    origin = parse((ROOT / 'fixtures/adaptation-v1/origin.json').read_bytes())
    state = origin_state(origin)
    js = "import fs from 'node:fs'; import {validateOrigin} from './src/admission.mjs';import {canonical,digest} from './src/bytes.mjs';let s=validateOrigin(JSON.parse(fs.readFileSync('fixtures/adaptation-v1/origin.json'))); process.stdout.write(JSON.stringify({state:s,commitment:digest('state',s)}));"
    actual = json.loads(subprocess.check_output(['node','--input-type=module','-e',js], cwd=ROOT))
    assert actual['state'] == state and actual['commitment'] == digest('state',state)
    return {'organism':state['organism'],'stateCommitment':actual['commitment'],'scope':'public synthetic baseline, no actual candidate'}
def causal_mutations():
    report = json.loads((ROOT/'docs/features/genesis_organism_phase_22/demo.json').read_bytes())
    base = causal.audit(report)
    mutations = []
    for name, mutate in [
        ('treatment-equals-control', lambda x: x['views'][0].__setitem__('treatment', x['views'][0]['noExperience'])),
        ('ablation-keeps-effect', lambda x: x['views'][0].__setitem__('ablation', x['views'][0]['treatment'])),
        ('rejected-experience-has-effect', lambda x: x['views'][0].__setitem__('rejectedExperience', x['views'][0]['treatment'])),
        ('forged-memory-reference', lambda x: x['memory'].__setitem__('eventRef', '0'*64)),
        ('missing-view', lambda x: x['views'].pop()),
    ]:
        changed = json.loads(json.dumps(report)); mutate(changed)
        try: causal.audit(changed)
        except (Invalid,KeyError,TypeError,IndexError): mutations.append(name)
        else: raise AssertionError('causal audit accepted '+name)
    return {'baseline':base,'rejectedMutations':mutations}
run('canonical-cross-language',canonical_agreement)
run('malformed-wire-rejection',malformed)
run('synthetic-origin-replay',origin_agreement)
run('causal-oracle-falsification',causal_mutations)
output = {'scope':'independent narrow baseline probes only; candidate not reviewed yet','results':results}
(ROOT/'docs/features/genesis_organism_birth_readiness/redteam/probe-results.json').write_text(json.dumps(output,indent=2)+'\n')
print(json.dumps(output,indent=2))
sys.exit(any(item['result']!='pass' for item in results))
