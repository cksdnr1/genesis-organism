"""Independent TEST-only proposed ceremony checker. Never calls JS or writes inputs."""
from pathlib import Path
import hashlib
import json
import os
import re
import stat
import subprocess
import sys
ROOT=Path(__file__).resolve().parents[4]
sys.path.insert(0,str(ROOT/'verifier'))
from verify import Invalid, canonical, exact, need, origin_state, parse
from cryptography.hazmat.primitives.asymmetric.ed25519 import Ed25519PublicKey
from cryptography.exceptions import InvalidSignature
TEST_KEY='d75a980182b10ab7d54bfed3c964073a0ee172f3daa62325af021a68f707511a'
MIB=1024*1024

def text(v,maximum=4096):
    need(type(v) is str and 0<len(v.encode('utf-8'))<=maximum,'bounded string')
    return v

def hexstr(v,n=64):
    need(type(v) is str and re.fullmatch('[0-9a-f]{'+str(n)+'}',v),'hex encoding')
    return v

def pathname(v):
    text(v,512); need(re.fullmatch('[A-Za-z0-9_./-]+',v) and all(x not in ('','.','..','.git') for x in v.split('/')),'normalized path')
    return v

def real_tree_parent(path):
    path=Path(path).absolute()
    for member in [*reversed(path.parents),path]:
        info=member.lstat();need(stat.S_ISDIR(info.st_mode) and not stat.S_ISLNK(info.st_mode),'real directory ancestors')
    return path

def raw(path,maximum=8*MIB):
    path=Path(path)
    real_tree_parent(path.parent)
    fd=os.open(path,os.O_RDONLY|os.O_NOFOLLOW|os.O_NONBLOCK)
    try:
        before=os.fstat(fd);need(stat.S_ISREG(before.st_mode) and before.st_size<=maximum,'regular bounded file')
        data=bytearray()
        while len(data)<=before.st_size:
            chunk=os.read(fd,min(65536,before.st_size+1-len(data)))
            if not chunk:break
            data.extend(chunk)
        after=os.fstat(fd)
        need(len(data)==before.st_size and (before.st_dev,before.st_ino,before.st_size,before.st_mtime_ns)==(after.st_dev,after.st_ino,after.st_size,after.st_mtime_ns),'stable read')
        return bytes(data)
    finally:os.close(fd)

def sha(data):return hashlib.sha256(data).hexdigest()
def prefix(kind):return ('genesis-organism/ceremony-v1/'+kind+'\0').encode('ascii')
def ref(kind,v):return sha(prefix(kind)+canonical(v))
def same(a,b,label):need(canonical(a)==canonical(b),label)
def pairs(entries):
    out={}
    for k,v in entries:need(k not in out,'duplicate JSON key');out[k]=v
    return out

def readable(data):
    def bad_number(_):raise Invalid('invalid','noninteger JSON number')
    def integer(token):
        need(token!='-0','negative zero JSON token')
        value=int(token);need(abs(value)<=9007199254740991,'safe JSON integer')
        return value
    try:v=json.loads(data.decode('utf-8'),object_pairs_hook=pairs,parse_float=bad_number,parse_constant=bad_number,parse_int=integer)
    except (ValueError,UnicodeError,RecursionError):raise Invalid('invalid','readable JSON') from None
    count=0
    def visit(x,depth):
        nonlocal count
        count+=1;need(depth<=32 and count<=10000,'JSON resource budget','limit')
        if type(x) is str:need(len(x.encode('utf-8'))<=4096,'JSON string budget','limit')
        elif type(x) is list:
            need(len(x)<=1024,'JSON array budget','limit')
            for item in x:visit(item,depth+1)
        elif type(x) is dict:
            need(len(x)<=256,'JSON object budget','limit')
            for k,item in x.items():
                need(len(k.encode('utf-8'))<=4096,'JSON key string budget','limit');visit(item,depth+1)
        else:need(x is None or type(x) in (bool,int),'JSON value')
    visit(v,0);return v

def proof(kind,envelope,fields,authority):
    exact(envelope,('body','signature'));exact(envelope['body'],fields)
    need(envelope['body']['authority']==authority,'expected TEST authority','unauthorized')
    hexstr(envelope['signature'],128)
    try:Ed25519PublicKey.from_public_bytes(bytes.fromhex(authority)).verify(bytes.fromhex(envelope['signature']),prefix(kind+'-proof')+canonical(envelope['body']))
    except (InvalidSignature,ValueError):raise Invalid('invalid','draft proof') from None
    return envelope['body']

def listing(path,expected):
    need(set(os.listdir(path))==set(expected),'exact directory members')

def filelist(items,per_file,total_max):
    need(type(items) is list and 0<len(items)<=1024,'file list bounds','limit')
    result={};total=0;previous=''
    for item in items:
        exact(item,('path','sha256','size'));name=pathname(item['path']);hexstr(item['sha256'])
        need(name>previous,'sorted unique paths');previous=name
        need(type(item['size']) is int and 0<=item['size']<=per_file,'file size bound','limit')
        total+=item['size'];need(total<=total_max,'aggregate size bound','limit');result[name]=item
    return result

def stream_file(path,item):
    real_tree_parent(path.parent);fd=os.open(path,os.O_RDONLY|os.O_NOFOLLOW|os.O_NONBLOCK)
    try:
        before=os.fstat(fd);need(stat.S_ISREG(before.st_mode) and before.st_size==item['size'],'regular exact-size package file')
        h=hashlib.sha256();count=0
        while True:
            chunk=os.read(fd,65536)
            if not chunk:break
            count+=len(chunk);need(count<=item['size'],'package changed');h.update(chunk)
        after=os.fstat(fd)
        need(count==item['size'] and h.hexdigest()==item['sha256'] and before.st_mtime_ns==after.st_mtime_ns,'package hash/stable bytes')
    finally:os.close(fd)

def package(root,files):
    expected_dirs={''}
    for name in files:
        p=Path(name).parent
        while str(p)!='.':expected_dirs.add(p.as_posix());p=p.parent
    seen_files=set();seen_dirs={''}
    def walk(directory,relative=''):
        for item in directory.iterdir():
            rel=(relative+'/' if relative else '')+item.name;info=item.lstat()
            need(not stat.S_ISLNK(info.st_mode),'symlink package member')
            if stat.S_ISDIR(info.st_mode):
                need(rel in expected_dirs,'unexpected package directory');seen_dirs.add(rel);walk(item,rel)
            else:
                need(stat.S_ISREG(info.st_mode) and rel in files,'unexpected/nonregular package member');seen_files.add(rel);stream_file(item,files[rel])
    walk(root);need(seen_files==set(files) and seen_dirs==expected_dirs,'complete exact package tree')

def check(root,context_file):
    root=real_tree_parent(root)
    need(root!=ROOT and ROOT not in root.parents and 'organisms' not in root.parts,'external TEST root','unauthorized')
    context_file=Path(context_file).absolute();need(root not in context_file.parents,'external trusted context')
    trusted=parse(raw(context_file,65536));exact(trusted,('authority','creatorBindingRef','nonce','revision'))
    need(trusted['authority']==TEST_KEY,'PUBLIC TEST authority only','unauthorized')
    for name in ('creatorBindingRef','nonce'):hexstr(trusted[name])
    revision=hexstr(trusted['revision'],40)
    need(subprocess.check_output(['git','cat-file','-t',revision],cwd=ROOT).strip()==b'commit','trusted commit')
    roots={'TEST_ONLY','journal','archive-a','archive-b','public-package','archive-a-retrieval.json','archive-b-retrieval.json','public-retrieval.json','release-retrieval.json'}
    listing(root,roots);need(raw(root/'TEST_ONLY')==b'genesis-organism proposed ceremony TEST ONLY\n','TEST marker','unauthorized')
    journal=real_tree_parent(root/'journal')
    names={'CEREMONY','creator-binding.json','inventory.json','manifest.json','origin.json','freeze.json','archive-report.json','release.json','release-publication.json','public-package-inventory.json','possession.json','birth.json','accepted','conflicts','pending'}
    if (journal/'LOCK').exists() or (journal/'LOCK').is_symlink():raise Invalid('conflict','held LOCK')
    listing(journal,names);need(raw(journal/'CEREMONY')==b'genesis-organism ceremony-v1\n','journal marker')
    for name in ('pending','conflicts'):
        real_tree_parent(journal/name);need(not os.listdir(journal/name),'held diagnostic/conflict','conflict')
    def c(name):return parse(raw(journal/name,65536))
    def r(name):return readable(raw(journal/name))
    binding=c('creator-binding.json');exact(binding,('version','creator','authority','scope','rights'))
    same(binding,{'version':'creator-binding-v1','creator':'PUBLIC TEST ONLY','authority':TEST_KEY,'scope':'public-genesis-origin-history-and-ceremony','rights':'creator-approved-disclosure'},'TEST creator binding')
    binding_ref=ref('creator-binding',binding);need(binding_ref==trusted['creatorBindingRef'],'trusted binding ref','unauthorized')
    possession=proof('possession',c('possession.json'),('version','purpose','creatorBindingRef','authority','nonce'),TEST_KEY)
    same(possession,{'version':'possession-v1','purpose':'key-possession-only-no-lifecycle-authorization','creatorBindingRef':binding_ref,'authority':TEST_KEY,'nonce':trusted['nonce']},'issued possession nonce/context')
    origin=c('origin.json');initial=origin_state(origin)
    same(origin['body'],{'profile':'synthetic-v1','rules':'adaptation-v1','birth':'public-test-only-draft-ceremony','creator':'PUBLIC TEST ONLY','authority':TEST_KEY,'genome':{'signal':0}},'TEST origin')
    origin_ref=initial['organism'];inventory=r('inventory.json');exact(inventory,('version','purpose','revision','selection','artifacts'))
    need(type(inventory['version']) is int and inventory['version']==1 and inventory['purpose']=='PUBLIC TEST ONLY' and inventory['selection']=='TEST ONLY bounded source selection' and inventory['revision']==revision,'TEST inventory')
    source_files=filelist(inventory['artifacts'],8*MIB,32*MIB)
    for name,item in source_files.items():
        tree=subprocess.check_output(['git','ls-tree','-z',revision,'--',name],cwd=ROOT)
        need(re.fullmatch(rb'100(?:644|755) blob [0-9a-f]{40}\t'+re.escape(name.encode())+b'\0',tree),'regular retained Git blob')
        size=int(subprocess.check_output(['git','cat-file','-s',revision+':'+name],cwd=ROOT));need(size==item['size'],'Git source size')
        need(sha(subprocess.check_output(['git','show',revision+':'+name],cwd=ROOT))==item['sha256'],'Git source raw hash')
    manifest=c('manifest.json');exact(manifest,('ceremony','profile','candidate','revision','creatorBindingRef','originRef','originSha256','inventorySha256','anchor','supersedes'))
    if manifest['supersedes'] is not None:raise Invalid('unavailable','prior raw artifacts absent')
    same(manifest,{'ceremony':'ceremony-v1','profile':'synthetic-v1','candidate':'public-test-only-draft-ceremony','revision':revision,'creatorBindingRef':binding_ref,'originRef':origin_ref,'originSha256':sha(raw(journal/'origin.json')),'inventorySha256':sha(raw(journal/'inventory.json')),'anchor':'skip','supersedes':None},'manifest exact binding')
    manifest_ref=ref('manifest',manifest)
    freeze=c('freeze.json');b=proof('freeze',freeze,('ceremony','manifestRef','authority'),TEST_KEY)
    same(b,{'ceremony':'ceremony-v1','manifestRef':manifest_ref,'authority':TEST_KEY},'freeze binding');freeze_ref=ref('freeze',freeze)
    inv=r('public-package-inventory.json');exact(inv,('version','files'));need(inv['version']=='public-package-v1','package version')
    files=filelist(inv['files'],256*MIB,1024*MIB);inv_sha=sha(raw(journal/'public-package-inventory.json'))
    records={'creator-binding.json','inventory.json','manifest.json','origin.json','freeze.json'}
    report=r('archive-report.json');exact(report,('version','manifestRef','archives','publication','dependencies','verification'))
    dependencies=report['dependencies'];need(type(dependencies) is list and len(dependencies)<=256,'dependency bounds')
    required=records|{'files/'+name for name in source_files}
    dependency_names=set()
    for d in dependencies:
        exact(d,('name','version','sha256'));text(d['name'],128);need(re.fullmatch('[A-Za-z0-9_.-]+',d['name']) and d['name'] not in ('.','..'),'dependency basename');text(d['version'],128);hexstr(d['sha256'])
        need(d['name'] not in dependency_names,'unique dependencies');dependency_names.add(d['name']);name='dependencies/'+d['name'];required.add(name)
        need(name in files and files[name]['sha256']==d['sha256'],'dependency content binding')
    need(set(files)==required,'exact package selected input closure')
    for name in records:need(files[name]['sha256']==sha(raw(journal/name)) and files[name]['size']==len(raw(journal/name)),'journal/package byte equality')
    for name,item in source_files.items():need(files['files/'+name]['sha256']==item['sha256'] and files['files/'+name]['size']==item['size'],'source package byte equality')
    for alias in ('archive-a','archive-b','public-package'):package(real_tree_parent(root/alias),files)
    retrieval={}
    for alias,filename in [('archive-a','archive-a-retrieval.json'),('archive-b','archive-b-retrieval.json'),('public-package','public-retrieval.json')]:
        data=raw(root/filename);v=readable(data);exact(v,('purpose','packageInventorySha256','revision','location'))
        need(v=={'purpose':'PUBLIC TEST ONLY','packageInventorySha256':inv_sha,'revision':revision,'location':alias},'retrieval log input binding');retrieval[alias]=sha(data)
    need(report['version']=='archive-report-v1' and report['manifestRef']==manifest_ref,'archive report manifest')
    need(type(report['archives']) is list and len(report['archives'])==2,'two archive reports')
    locations=set()
    for a in report['archives']:
        exact(a,('location','custodian','retrievalEvidenceSha256','restored'));need(a['location'] in ('archive-a','archive-b') and a['location'] not in locations,'distinct archive aliases');locations.add(a['location'])
        need(a['custodian']=='PUBLIC TEST ONLY' and a['restored'] is True and a['retrievalEvidenceSha256']==retrieval[a['location']],'archive assertion/hash binding')
    pub=report['publication'];exact(pub,('location','packageInventorySha256','retrievalEvidenceSha256'))
    need(pub=={'location':'public-package','packageInventorySha256':inv_sha,'retrievalEvidenceSha256':retrieval['public-package']},'publication package binding')
    ver=report['verification'];exact(ver,('sourceRevision','node','python','cryptography','commands','resultsSha256','network'))
    need(ver['sourceRevision']==revision and ver['network']=='disabled' and ver['resultsSha256']==retrieval['public-package'],'verification assertion binding')
    for name in ('node','python','cryptography'):text(ver[name])
    need(type(ver['commands']) is list and 0<len(ver['commands'])<=256,'command bounds')
    for command in ver['commands']:text(command)
    release=c('release.json');b=proof('release',release,('ceremony','manifestRef','freezeRef','archiveReportRef','authority'),TEST_KEY)
    same(b,{'ceremony':'ceremony-v1','manifestRef':manifest_ref,'freezeRef':freeze_ref,'archiveReportRef':sha(raw(journal/'archive-report.json')),'authority':TEST_KEY},'release prerequisites');release_ref=ref('release',release)
    need(raw(root/'release-retrieval.json',65536)==raw(journal/'release.json',65536),'retrieved exact signed release')
    publication=r('release-publication.json');exact(publication,('version','releaseRef','location','retrievalEvidenceSha256'))
    need(publication=={'version':'release-publication-v1','releaseRef':release_ref,'location':'public-package','retrievalEvidenceSha256':sha(raw(root/'release-retrieval.json'))},'release publication binding')
    birth=c('birth.json');b=proof('birth',birth,('ceremony','manifestRef','releaseRef','originRef','releasePublicationRef','authority'),TEST_KEY)
    same(b,{'ceremony':'ceremony-v1','manifestRef':manifest_ref,'releaseRef':release_ref,'originRef':origin_ref,'releasePublicationRef':sha(raw(journal/'release-publication.json')),'authority':TEST_KEY},'birth prerequisites');birth_ref=ref('birth',birth)
    accepted=real_tree_parent(journal/'accepted');members=os.listdir(accepted)
    need(len(members)<=1,'multiple accepted origins','conflict')
    if members:
        need(members==[origin_ref+'.json'],'accepted identity mismatch','conflict');need(raw(accepted/members[0],65536)==raw(journal/'birth.json',65536),'accepted exact request','conflict')
    return {'scope':'draft TEST mechanics only; GENESIS #0001 UNBORN/NO-GO','manifestRef':manifest_ref,'freezeRef':freeze_ref,'releaseRef':release_ref,'birthRef':birth_ref,'journalStatus':'accepted' if members else 'empty','artifacts':len(files)}

if __name__=='__main__':
    try:print(json.dumps(check(sys.argv[1],sys.argv[2]),indent=2))
    except (Invalid,InvalidSignature,OSError,ValueError,UnicodeError,KeyError,TypeError,RecursionError,subprocess.SubprocessError) as error:
        print(type(error).__name__+': '+str(error),file=sys.stderr);sys.exit(1)
