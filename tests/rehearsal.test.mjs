import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync, spawnSync, spawn } from 'node:child_process';
import { canonical } from '../src/bytes.mjs';
import { ROOT, PROFILE, AUTHORITY, REHEARSAL_ORIGIN, manifestFor, reference, fixtureSign, checkFreeze, readArtifacts, gitBlob, initializeRehearsal, publish, readRehearsal, writeArchive, checkArchive, checkRelease, checkBirth, acceptBirth, checkJournal, recoverBirthLock } from '../tools/rehearsal.mjs';

const revision = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
const freezeFor = manifest => fixtureSign('freeze', { profile: PROFILE, manifestRef: reference('manifest', manifest), authority: AUTHORITY });
function python(bundle) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'genesis-freeze-check-'));
  try {
    const file = path.join(root, 'bundle.json'); fs.writeFileSync(file, JSON.stringify(bundle));
    return spawnSync('.venv/bin/python', ['verifier/rehearsal.py', file], { encoding: 'utf8' });
  } finally { fs.rmSync(root, { recursive: true }); }
}

test('synthetic freeze binds exact Git bytes and independently reproduces references', () => {
  const manifest = manifestFor(revision), freeze = freezeFor(manifest);
  assert.ok(manifest.artifacts.some(item => item.path === 'docs/features/genesis_organism_phase_36/freeze.json'), 'retain historical freeze fixture needed by archive/birth tests');
  assert.ok(manifest.artifacts.some(item => item.path === 'docs/features/genesis_organism/post-merge-audit/diagnostic-results.json'), 'retain exact negative inputs required by conformance tests');
  assert.ok(manifest.artifacts.some(item => item.path === 'docs/decisions/2026-10-08-diagnostic-precedence-clarification.md'), 'retain accepted diagnostic precedence required by compound conformance');
  const checked = checkFreeze(manifest, freeze);
  assert.equal(readArtifacts(manifest).size, manifest.artifacts.length);
  const independent = python({ manifest, freeze });
  assert.equal(independent.status, 0, independent.stderr);
  assert.deepEqual(JSON.parse(independent.stdout), { ...checked, artifacts: manifest.artifacts.length });
  assert.deepEqual(freezeFor(manifestFor(revision)), freeze);
  assert.equal(manifest.anchor, 'skip');
});

test('freeze rejects malformed attribution, domains, paths, unavailable and altered bytes', () => {
  const manifest = manifestFor(revision), freeze = freezeFor(manifest);
  const cases = [
    b => { delete b.freeze.body.authority; },
    b => { b.freeze.body.authority = '0'.repeat(64); },
    b => { b.freeze.signature = '0'.repeat(128); },
    b => { b.freeze.body.extra = true; },
    b => { b.manifest.artifacts[0].path = '../escape'; },
    b => { b.manifest.artifacts[0].path = '/absolute'; },
    b => { b.manifest.revision = '--help'; },
    b => { b.manifest.anchor = 'chain'; },
    b => { b.manifest.artifacts = b.manifest.artifacts.filter(x => x.path !== 'spec/GENESIS.md'); },
  ];
  for (const mutate of cases) {
    const bundle = structuredClone({ manifest, freeze }); mutate(bundle);
    assert.throws(() => checkFreeze(bundle.manifest, bundle.freeze));
    assert.equal(python(bundle).status, 1);
  }
  const altered = structuredClone(manifest); altered.artifacts[0].sha256 = '0'.repeat(64);
  assert.throws(() => readArtifacts(altered));
  assert.equal(python({ manifest: altered, freeze: freezeFor(altered) }).status, 1);
  assert.throws(() => gitBlob(revision, 'missing-required-dependency.lock'));
  assert.throws(() => gitBlob(revision, 'src')); // directory, not regular blob
  // Build an unreferenced synthetic Git tree, never edit HEAD/worktree/history.
  const blob = execFileSync('git', ['hash-object', '-w', '--stdin'], { input: 'README.md' }).toString().trim();
  const tree = execFileSync('git', ['mktree'], { input: `120000 blob ${blob}\tlink\n` }).toString().trim();
  const commit = execFileSync('git', ['commit-tree', tree], { input: 'synthetic symlink rejection fixture\n' }).toString().trim();
  assert.throws(() => gitBlob(commit, 'link'));
});

test('freeze supersession retains failed candidate and refuses accepted or absent evidence', () => {
  const first = manifestFor(revision, 'rehearsal-failed');
  const prior = { manifest: first, failure: { profile: PROFILE, manifestRef: reference('manifest', first), reason: 'fixture-failure' }, births: [] };
  const next = manifestFor(revision, 'rehearsal-successor', prior), freeze = freezeFor(next);
  assert.equal(checkFreeze(next, freeze, prior).manifestRef, reference('manifest', next));
  assert.equal(python({ manifest: next, freeze, prior }).status, 0);
  assert.throws(() => checkFreeze(next, freeze));
  assert.throws(() => checkFreeze(next, freeze, { ...prior, births: [{}] }));
  const wrong = structuredClone(prior); wrong.failure.manifestRef = '0'.repeat(64);
  assert.throws(() => checkFreeze(next, freeze, wrong));
  assert.equal(python({ manifest: next, freeze, prior: wrong }).status, 1);
  assert.equal(python({ manifest: next, freeze, prior: { ...prior, births: [{}] } }).status, 1);
  assert.equal(first.supersedes, null);
});

function scratch(t) {
  const parent = fs.mkdtempSync(path.join(os.tmpdir(), 'genesis-archive-test-'));
  t.after(() => fs.rmSync(parent, { recursive: true, force: true }));
  return initializeRehearsal(path.join(parent, 'trial'));
}
const frozen = () => JSON.parse(fs.readFileSync('docs/features/genesis_organism_phase_36/freeze.json'));
const releaseFor = (manifest, freeze) => fixtureSign('release', { profile: PROFILE, manifestRef: reference('manifest', manifest), freezeRef: reference('freeze', freeze), authority: AUTHORITY });
function offline(bundle, root) {
  const parent = fs.mkdtempSync(path.join(os.tmpdir(), 'genesis-offline-check-'));
  try {
    const file = path.join(parent, 'bundle.json'); fs.writeFileSync(file, JSON.stringify(bundle));
    return spawnSync(path.resolve('.venv/bin/python'), ['verifier/rehearsal.py', file, root], { encoding: 'utf8', env: { ...process.env, PATH: '/no-git-or-model-service' } });
  } finally { fs.rmSync(parent, { recursive: true }); }
}

test('supersession rejects unverified predecessor bytes even with valid successor proof', t => {
  const first = manifestFor(revision, 'rehearsal-audit-prior');
  const current = manifestFor(revision, 'rehearsal-audit-successor');
  const makeBundle = manifest => {
    const prior = { manifest, failure: { profile: PROFILE, manifestRef: reference('manifest', manifest), reason: 'fixture-failure' }, births: [] };
    const successor = { ...current, supersedes: reference('manifest', manifest) };
    return { manifest: successor, freeze: freezeFor(successor), prior };
  };
  for (const mutate of [
    manifest => { manifest.revision = '0'.repeat(40); },
    manifest => { manifest.artifacts[0].sha256 = '0'.repeat(64); },
    manifest => { manifest.artifacts.push({ path: 'zz-missing-predecessor.json', sha256: '0'.repeat(64) }); },
    manifest => { manifest.artifacts = manifest.artifacts.filter(item => item.path !== 'README.md'); },
  ]) {
    const prior = structuredClone(first); mutate(prior);
    const bundle = makeBundle(prior);
    // The successor proof and current Git artifacts are independently valid.
    assert.equal(readArtifacts(bundle.manifest).size, current.artifacts.length);
    assert.throws(() => checkFreeze(bundle.manifest, bundle.freeze, bundle.prior));
    assert.equal(python(bundle).status, 1);
  }
  const bundle = makeBundle(first);
  assert.equal(checkFreeze(bundle.manifest, bundle.freeze, bundle.prior).manifestRef, reference('manifest', bundle.manifest));
  assert.equal(python(bundle).status, 0);
  const root = scratch(t);
  const missingOfflineEvidence = offline(bundle, root);
  assert.equal(missingOfflineEvidence.status, 1);
  assert.match(missingOfflineEvidence.stderr, /unavailable predecessor artifact evidence/);
  assert.doesNotMatch(missingOfflineEvidence.stderr, /No such file.*git/);
});

test('two local archives restore independently offline; timestamps and optional skip do not affect refs', t => {
  const root = scratch(t), { manifest, freeze } = frozen();
  assert.equal(writeArchive(root, 'archive-a', manifest, freeze), manifest.artifacts.length);
  assert.equal(writeArchive(root, 'archive-b', manifest, freeze), manifest.artifacts.length);
  const release = releaseFor(manifest, freeze);
  const checked = checkRelease(root, manifest, freeze, release);
  const result = offline({ manifest, freeze, release }, root);
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(JSON.parse(result.stdout), { ...checked, artifacts: manifest.artifacts.length });
  fs.utimesSync(path.join(root, 'archive-a/manifest.json'), new Date(0), new Date(0));
  fs.utimesSync(path.join(root, 'archive-b/manifest.json'), new Date(999999), new Date(999999));
  assert.deepEqual(checkRelease(root, manifest, freeze, release), checked);
  assert.equal(offline({ manifest, freeze, release }, root).status, 0);
  assert.equal(manifest.anchor, 'skip');
  for (const scenario of ['hash', 'extra', 'empty-directory', 'missing', 'symlink', 'directory-symlink', 'missing-copy']) {
    const target = path.join(root, 'archive-a/files/README.md');
    const original = fs.readFileSync(target);
    if (scenario === 'hash') fs.writeFileSync(target, 'tampered');
    if (scenario === 'extra') fs.writeFileSync(path.join(root, 'archive-a/extra'), 'extra');
    if (scenario === 'empty-directory') fs.mkdirSync(path.join(root, 'archive-a/extra'));
    if (scenario === 'missing') fs.unlinkSync(target);
    if (scenario === 'symlink') { fs.unlinkSync(target); fs.symlinkSync(path.join(ROOT, 'README.md'), target); }
    if (scenario === 'directory-symlink') { fs.renameSync(path.join(root, 'archive-a/files/spec'), path.join(root, 'saved-spec')); fs.symlinkSync(path.join(root, 'saved-spec'), path.join(root, 'archive-a/files/spec')); }
    if (scenario === 'missing-copy') fs.renameSync(path.join(root, 'archive-b'), path.join(root, 'saved-copy'));
    assert.throws(() => checkRelease(root, manifest, freeze, release), scenario);
    assert.equal(offline({ manifest, freeze, release }, root).status, 1, scenario);
    if (['hash', 'missing'].includes(scenario)) fs.writeFileSync(target, original);
    if (scenario === 'extra') fs.unlinkSync(path.join(root, 'archive-a/extra'));
    if (scenario === 'empty-directory') fs.rmdirSync(path.join(root, 'archive-a/extra'));
    if (scenario === 'symlink') { fs.unlinkSync(target); fs.writeFileSync(target, original); }
    if (scenario === 'directory-symlink') { fs.unlinkSync(path.join(root, 'archive-a/files/spec')); fs.renameSync(path.join(root, 'saved-spec'), path.join(root, 'archive-a/files/spec')); }
    if (scenario === 'missing-copy') fs.renameSync(path.join(root, 'saved-copy'), path.join(root, 'archive-b'));
  }
  const bad = structuredClone(release); bad.body.freezeRef = '0'.repeat(64);
  assert.throws(() => checkRelease(root, manifest, freeze, bad));
  assert.equal(offline({ manifest, freeze, release: bad }, root).status, 1);
});

test('archive publication interrupts fail closed, retain evidence and retry without overwriting', t => {
  const root = scratch(t), bytes = canonical({ profile: PROFILE, observation: 'public fixture' });
  assert.throws(() => initializeRehearsal(path.join(ROOT, 'organisms/genesis-0001/never-create')));
  assert.throws(() => initializeRehearsal(root));
  for (const boundary of ['after-write', 'after-fsync', 'after-link', 'after-dir-sync']) {
    const relative = `observations/${boundary}.json`;
    const before = fs.existsSync(path.join(root, 'pending')) ? fs.readdirSync(path.join(root, 'pending')).length : 0;
    assert.throws(() => publish(root, relative, bytes, point => { if (point === boundary) throw Error('interrupted'); }));
    assert.equal(fs.readdirSync(path.join(root, 'pending')).length, before + 1);
    assert.ok(['created', 'duplicate'].includes(publish(root, relative, bytes)));
    assert.deepEqual(readRehearsal(root, relative), bytes);
    assert.equal(publish(root, relative, bytes), 'duplicate');
    assert.throws(() => publish(root, relative, canonical({ changed: true })));
    assert.deepEqual(readRehearsal(root, relative), bytes);
  }
  const { manifest, freeze } = frozen();
  assert.throws(() => writeArchive(root, 'archive-a', manifest, freeze, () => { throw Error('partial'); }));
  assert.throws(() => checkArchive(root, 'archive-a', manifest, freeze));
  assert.equal(writeArchive(root, 'archive-a', manifest, freeze), manifest.artifacts.length);
  assert.throws(() => checkRelease(root, manifest, freeze, releaseFor(manifest, freeze))); // second archive absent
  const marker = fs.readFileSync(path.join(root, 'REHEARSAL'));
  fs.writeFileSync(path.join(root, 'REHEARSAL'), 'partial initialization');
  assert.throws(() => readRehearsal(root, 'archive-a/manifest.json'));
  fs.writeFileSync(path.join(root, 'REHEARSAL'), marker); // test-owned fixture restoration
});

const birthFor = (manifest, release) => fixtureSign('birth', { profile: PROFILE, manifestRef: reference('manifest', manifest), releaseRef: reference('release', release), originRef: REHEARSAL_ORIGIN, authority: AUTHORITY });
function prepared(t) {
  const root = scratch(t), { manifest, freeze } = frozen();
  writeArchive(root, 'archive-a', manifest, freeze); writeArchive(root, 'archive-b', manifest, freeze);
  const release = releaseFor(manifest, freeze), birth = birthFor(manifest, release);
  return { root, bundle: { manifest, freeze, release, birth } };
}
const args = (root, b) => [root, b.manifest, b.freeze, b.release, b.birth];
function copyTrial(t, template) {
  const root = scratch(t);
  for (const name of ['archive-a', 'archive-b']) fs.cpSync(path.join(template, name), path.join(root, name), { recursive: true });
  return root;
}
const childScript = `
import fs from 'node:fs';
import { acceptBirth } from './tools/rehearsal.mjs';
const [root,file,boundary] = process.argv.slice(1), b=JSON.parse(fs.readFileSync(file));
try {
  const result=acceptBirth(root,b.manifest,b.freeze,b.release,b.birth,(point,relative)=>{
    if(point===boundary && (point==='after-lock'||point==='after-unlock'||relative.startsWith('accepted/')))process.kill(process.pid,'SIGKILL');
  });
  console.log(JSON.stringify(result));
} catch(error) { console.error(error.message); process.exitCode=1; }
`;
function childInput(t, bundle) {
  const parent = fs.mkdtempSync(path.join(os.tmpdir(), 'genesis-birth-input-'));
  t.after(() => fs.rmSync(parent, { recursive: true }));
  const file = path.join(parent, 'bundle.json'); fs.writeFileSync(file, JSON.stringify(bundle)); return file;
}

test('synthetic birth admission is independently replayed once; bad evidence and conflicting binding fail', t => {
  const { root, bundle } = prepared(t), a = args(root, bundle);
  for (const mutate of [
    b => { b.birth.signature = '0'.repeat(128); },
    b => { b.birth.body.authority = '0'.repeat(64); },
    b => { b.birth = fixtureSign('birth', { ...b.birth.body, originRef: '0'.repeat(64) }); },
    b => { b.birth = fixtureSign('birth', { ...b.birth.body, releaseRef: '0'.repeat(64) }); },
    b => { b.release = null; },
  ]) {
    const bad = structuredClone(bundle); mutate(bad);
    assert.throws(() => acceptBirth(...args(root, bad)));
    assert.equal(offline(bad, root).status, 1);
    assert.equal(fs.existsSync(path.join(root, 'accepted')), false);
  }
  assert.equal(checkJournal(...a).status, 'empty');
  const accepted = acceptBirth(...a), duplicate = acceptBirth(...a);
  assert.equal(accepted.status, 'accepted'); assert.equal(duplicate.status, 'duplicate');
  assert.equal(accepted.birthRef, duplicate.birthRef);
  assert.equal(accepted.stateCommitment, '50d6db5f20c01c34bb94634b0acbbe1eac8bc57d5f20d2a0fe79906eb623fed7');
  assert.deepEqual(checkJournal(...a), accepted);
  const independent = offline(bundle, root); assert.equal(independent.status, 0, independent.stderr);
  assert.deepEqual(JSON.parse(independent.stdout), { ...accepted, artifacts: bundle.manifest.artifacts.length });
  assert.equal(fs.readdirSync(path.join(root, 'accepted')).length, 1);
  const corrupt = copyTrial(t, root);
  fs.mkdirSync(path.join(corrupt, 'accepted'));
  fs.writeFileSync(path.join(corrupt, 'accepted', `${REHEARSAL_ORIGIN}.json`), '{partial');
  assert.throws(() => checkJournal(...args(corrupt, bundle)));
  assert.equal(offline(bundle, corrupt).status, 1);
  fs.writeFileSync(path.join(root, 'unknown'), 'unexpected');
  assert.throws(() => checkJournal(...a)); assert.equal(offline(bundle, root).status, 1);
  fs.unlinkSync(path.join(root, 'unknown')); // adversarial fixture only
  const conflict = copyTrial(t, root), changed = structuredClone(bundle);
  changed.manifest.candidate = 'rehearsal-conflicting'; changed.freeze = freezeFor(changed.manifest);
  changed.release = releaseFor(changed.manifest, changed.freeze); changed.birth = birthFor(changed.manifest, changed.release);
  for (const name of ['archive-a', 'archive-b']) {
    fs.writeFileSync(path.join(conflict, name, 'manifest.json'), canonical(changed.manifest));
    fs.writeFileSync(path.join(conflict, name, 'freeze.json'), canonical(changed.freeze));
  }
  fs.mkdirSync(path.join(conflict, 'accepted'));
  fs.writeFileSync(path.join(conflict, 'accepted', `${REHEARSAL_ORIGIN}.json`), canonical(bundle.birth));
  assert.throws(() => acceptBirth(...args(conflict, changed)));
  assert.equal(fs.readdirSync(path.join(conflict, 'conflicts')).length, 1);
  assert.deepEqual(fs.readFileSync(path.join(conflict, 'accepted', `${REHEARSAL_ORIGIN}.json`)), canonical(bundle.birth));
  assert.throws(() => checkJournal(...args(conflict, changed)));
  assert.equal(offline(changed, conflict).status, 1);
});

test('real child termination at six birth boundaries retains evidence and requires dead-writer recovery', t => {
  const { root: template, bundle } = prepared(t), input = childInput(t, bundle);
  const live = copyTrial(t, template);
  fs.writeFileSync(path.join(live, 'LOCK'), canonical({ profile: PROFILE, pid: process.pid }));
  assert.throws(() => recoverBirthLock(...args(live, bundle)));
  assert.throws(() => acceptBirth(...args(live, bundle)));
  assert.equal(offline(bundle, live).status, 1);
  const partial = copyTrial(t, template); fs.writeFileSync(path.join(partial, 'LOCK'), '{partial');
  assert.throws(() => recoverBirthLock(...args(partial, bundle)));
  assert.equal(fs.readFileSync(path.join(partial, 'LOCK')).toString(), '{partial');
  for (const boundary of ['after-lock', 'after-write', 'after-fsync', 'after-link', 'after-dir-sync', 'after-unlock']) {
    const root = copyTrial(t, template);
    const result = spawnSync(process.execPath, ['--input-type=module', '-e', childScript, root, input, boundary], { encoding: 'utf8' });
    assert.equal(result.signal, 'SIGKILL', boundary);
    if (boundary !== 'after-unlock') {
      assert.equal(fs.existsSync(path.join(root, 'LOCK')), true);
      assert.throws(() => checkJournal(...args(root, bundle)));
      assert.equal(offline(bundle, root).status, 1);
    }
    assert.equal(recoverBirthLock(...args(root, bundle)), boundary === 'after-unlock' ? 'not-held' : 'recovered');
    const retry = acceptBirth(...args(root, bundle));
    assert.ok(['accepted', 'duplicate'].includes(retry.status));
    assert.equal(acceptBirth(...args(root, bundle)).status, 'duplicate');
    assert.equal(fs.readdirSync(path.join(root, 'accepted')).length, 1);
    assert.equal(offline(bundle, root).status, 0);
    if (['after-write', 'after-fsync', 'after-link', 'after-dir-sync'].includes(boundary)) assert.ok(fs.readdirSync(path.join(root, 'pending')).length >= 1);
  }
});

test('concurrent synthetic birth retries cannot publish a second origin', async t => {
  const { root, bundle } = prepared(t), input = childInput(t, bundle);
  const launch = () => new Promise(resolve => {
    const child = spawn(process.execPath, ['--input-type=module', '-e', childScript, root, input, 'none']);
    let stdout = '', stderr = '';
    child.stdout.on('data', data => { stdout += data; }); child.stderr.on('data', data => { stderr += data; });
    child.on('close', code => resolve({ code, stdout, stderr }));
  });
  const results = await Promise.all([launch(), launch()]);
  assert.equal(results.filter(r => r.code === 0 && JSON.parse(r.stdout).status === 'accepted').length, 1);
  for (const r of results) if (r.code !== 0) assert.match(r.stderr, /writer lock held/);
  assert.equal(acceptBirth(...args(root, bundle)).status, 'duplicate');
  assert.equal(fs.readdirSync(path.join(root, 'accepted')).length, 1);
  assert.equal(offline(bundle, root).status, 0);
});

test('nonregular input refusal covers both ceremony readers without FIFO writers', { skip: process.platform === 'win32' }, t => {
  const root = scratch(t), target = path.join(root, 'payload');
  const marker = fs.readFileSync(path.join(root, 'REHEARSAL'));
  assert.deepEqual(readRehearsal(root, 'REHEARSAL'), marker, 'regular marker control');
  assert.equal(spawnSync('mkfifo', [target]).status, 0);
  const nodeScript = `import {readRehearsal} from './tools/rehearsal.mjs';try { console.log(readRehearsal(process.argv[1],'payload').toString('hex')); } catch(e) { console.error(JSON.stringify({error:e.code}));process.exitCode=1; }`;
  const pythonScript = `import sys,json;sys.path.insert(0,'verifier');import rehearsal as r
try: print(r.read_local(r.guard_root(sys.argv[1]),'payload').hex())
except Exception as e: print(json.dumps({'error':getattr(e,'code','io')}),file=sys.stderr);sys.exit(1)`;
  const readers = [[process.execPath, ['--input-type=module', '-e', nodeScript, root], 'limit'], ['.venv/bin/python', ['-c', pythonScript, root], 'invalid']];
  const before = { names: fs.readdirSync(root).sort(), mode: fs.lstatSync(target).mode, marker: marker.toString('hex') };
  function refuses() {
    for (const [command, args, code] of readers) {
      const result = spawnSync(command, args, { encoding: 'utf8', timeout: 3000 });
      assert.ifError(result.error); assert.equal(result.signal, null); assert.equal(result.status, 1);
      assert.equal(result.stdout, ''); assert.equal(JSON.parse(result.stderr).error, code);
      assert.deepEqual({ names: fs.readdirSync(root).sort(), mode: fs.lstatSync(target).mode, marker: fs.readFileSync(path.join(root, 'REHEARSAL')).toString('hex') }, before);
    }
  }
  refuses();
  const descriptor = fs.openSync(target, fs.constants.O_RDWR | fs.constants.O_NONBLOCK);
  try { refuses(); } finally { fs.closeSync(descriptor); }
  fs.unlinkSync(target); const bytes = Buffer.from('captured synthetic archive bytes'); fs.writeFileSync(target, bytes);
  for (const [command, args] of readers) {
    const result = spawnSync(command, args, { encoding: 'utf8', timeout: 3000 });
    assert.ifError(result.error); assert.equal(result.status, 0, result.stderr);
    assert.equal(result.stdout.trim(), bytes.toString('hex')); assert.equal(result.stderr, '');
  }
});
