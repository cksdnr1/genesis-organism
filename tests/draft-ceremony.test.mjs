import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { canonical } from '../src/bytes.mjs';
import { checkDraft } from '../tools/check_draft_ceremony.mjs';
import { draftFixture, hash, testProof, reference } from './draft-ceremony-fixture.mjs';

const json = file => JSON.parse(fs.readFileSync(file));
function snapshot(root) {
  const values = [];
  function walk(p) { const stat = fs.lstatSync(p); if (stat.isDirectory()) for (const n of fs.readdirSync(p).sort()) walk(path.join(p, n)); else values.push([path.relative(root, p), stat.isSymbolicLink() ? fs.readlinkSync(p) : stat.isFile() ? hash(fs.readFileSync(p)) : 'nonregular']); }
  walk(root); return values;
}
function owned(run, accepted = true, sizeToken = null) {
  const scratch = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'genesis-draft-ceremony-')));
  try { const root = path.join(scratch, 'test-packet'), fixture = draftFixture(root, accepted, sizeToken); return run(root, fixture, scratch); }
  finally { fs.rmSync(scratch, { recursive: true, force: true }); }
}
test('draft TEST-only empty/accepted/repeated consistency checks are read-only', () => {
  for (const accepted of [false, true]) owned((root, fixture, scratch) => {
    const before = snapshot(root), result = checkDraft(root, fixture.trusted);
    assert.equal(result.journalStatus, accepted ? 'accepted' : 'empty'); assert.equal(result.artifacts, fixture.files);
    assert.equal(result.birthRef, fixture.birthRef); assert.match(result.scope, /UNBORN\/NO-GO/);
    assert.deepEqual(checkDraft(root, fixture.trusted), result); assert.deepEqual(snapshot(root), before);
    const trustedFile = path.join(scratch, 'trusted.json'); fs.writeFileSync(trustedFile, canonical(fixture.trusted));
    const cli = spawnSync(process.execPath, ['tools/check_draft_ceremony.mjs', root, trustedFile], { encoding: 'utf8' });
    assert.equal(cli.status, 0, cli.stderr); assert.deepEqual(JSON.parse(cli.stdout), result);
  }, accepted);
});
test('draft checker rejects mismatched public trust, proofs, references, raw bytes and journal holds', () => {
  const cases = [
    ['trust-nonce', (root, f) => { f.trusted.nonce = '2'.repeat(64); }],
    ['trust-symbol', (root, f) => { f.trusted[Symbol('unexpected')] = true; }],
    ['trust-authority', (root, f) => { f.trusted.authority = '0'.repeat(64); }],
    ['trust-binding', (root, f) => { f.trusted.creatorBindingRef = '0'.repeat(64); }],
    ['origin-raw', root => fs.appendFileSync(path.join(root, 'journal/origin.json'), ' ')],
    ['wrong-domain', root => { const p = path.join(root, 'journal/birth.json'); fs.writeFileSync(p, canonical(testProof('birth', json(p).body, 'synthetic-v1'))); }],
    ['forged-proof', root => { const p = path.join(root, 'journal/freeze.json'), v = json(p); v.signature = '0'.repeat(128); fs.writeFileSync(p, canonical(v)); }],
    ['wrong-manifest-ref', root => { const p = path.join(root, 'journal/birth.json'), v = json(p); v.body.manifestRef = '0'.repeat(64); fs.writeFileSync(p, canonical(testProof('birth', v.body))); }],
    ['source-missing', root => fs.unlinkSync(path.join(root, 'archive-a/files/spec/GENESIS.md'))],
    ['source-corrupt', root => fs.appendFileSync(path.join(root, 'archive-b/files/spec/GENESIS.md'), 'changed')],
    ['dependency-missing', root => fs.unlinkSync(path.join(root, 'public-package/dependencies/test-dependency'))],
    ['extra-file', root => fs.writeFileSync(path.join(root, 'archive-a/extra.txt'), 'extra')],
    ['extra-field', root => { const p = path.join(root, 'journal/archive-report.json'); fs.writeFileSync(p, JSON.stringify({ ...json(p), extra: true })); }],
    ['duplicate-json', root => { const p = path.join(root, 'journal/archive-report.json'); fs.writeFileSync(p, fs.readFileSync(p).toString().replace('{', '{"version":"archive-report-v1",')); }],
    ['missing-publication', root => fs.unlinkSync(path.join(root, 'public-retrieval.json'))],
    ['wrong-release-copy', root => fs.writeFileSync(path.join(root, 'release-retrieval.json'), '{}')],
    ['supersession-unavailable', root => { const p = path.join(root, 'journal/manifest.json'), v = json(p); v.supersedes = '1'.repeat(64); fs.writeFileSync(p, canonical(v)); }],
    ['lock', root => fs.writeFileSync(path.join(root, 'journal/LOCK'), '{}')],
    ['pending', root => fs.writeFileSync(path.join(root, 'journal/pending/retained'), 'partial')],
    ['conflict', root => fs.writeFileSync(path.join(root, 'journal/conflicts/retained'), 'conflict')],
    ['second-accepted', root => fs.writeFileSync(path.join(root, `journal/accepted/${'0'.repeat(64)}.json`), '{}')],
    ['contradictory-accepted', (root, f) => fs.writeFileSync(path.join(root, `journal/accepted/${f.originRef}.json`), '{}')],
    ['package-symlink', root => { const p = path.join(root, 'archive-a/origin.json'); fs.unlinkSync(p); fs.symlinkSync(path.join(root, 'journal/origin.json'), p); }],
    ['test-marker', root => fs.writeFileSync(path.join(root, 'TEST_ONLY'), 'actual ceremony')],
  ];
  for (const [label, mutate] of cases) owned((root, fixture) => { mutate(root, fixture); const before = snapshot(root); assert.throws(() => checkDraft(root, fixture.trusted), undefined, label); assert.deepEqual(snapshot(root), before, label); });
});
test('draft actual CLI refuses FIFO prerequisite without writer', () => owned((root, fixture, scratch) => {
  const file = path.join(root, 'journal/possession.json'); fs.unlinkSync(file);
  const fifo = spawnSync('mkfifo', [file]); assert.equal(fifo.status, 0);
  const trustedFile = path.join(scratch, 'trusted.json'); fs.writeFileSync(trustedFile, canonical(fixture.trusted));
  const result = spawnSync(process.execPath, ['tools/check_draft_ceremony.mjs', root, trustedFile], { encoding: 'utf8', timeout: 3000 });
  assert.equal(result.status, 1, result.stderr); assert.match(result.stderr, /regular file/); assert.equal(result.error, undefined);
}));

test('self-consistent TEST inventory rejects rounded numeric lexemes before hash checks', () => {
  const size = fs.readFileSync('spec/GENESIS.md').length;
  for (const token of [`${size}.0`, `${size}e0`, '-0', `${size}.0000000000000001`, '9007199254740992']) owned((root, fixture) => {
    assert.throws(() => checkDraft(root, fixture.trusted), { code: 'invalid' });
  }, true, token);
});
test('distinct archive aliases can appear in either order with valid rebound TEST chain', () => owned((root, fixture) => {
  const j = name => path.join(root, 'journal', name);
  const report = json(j('archive-report.json')); report.archives.reverse();
  fs.writeFileSync(j('archive-report.json'), JSON.stringify(report, null, 2) + '\n');
  const releaseBody = json(j('release.json')).body;
  releaseBody.archiveReportRef = hash(fs.readFileSync(j('archive-report.json')));
  const release = testProof('release', releaseBody);
  fs.writeFileSync(j('release.json'), canonical(release)); fs.writeFileSync(path.join(root, 'release-retrieval.json'), canonical(release));
  const publication = json(j('release-publication.json'));
  publication.releaseRef = reference('release', release); publication.retrievalEvidenceSha256 = hash(canonical(release));
  fs.writeFileSync(j('release-publication.json'), JSON.stringify(publication, null, 2) + '\n');
  const body = json(j('birth.json')).body; body.releaseRef = publication.releaseRef;
  body.releasePublicationRef = hash(fs.readFileSync(j('release-publication.json')));
  const birth = testProof('birth', body);
  fs.writeFileSync(j('birth.json'), canonical(birth)); fs.writeFileSync(j(`accepted/${fixture.originRef}.json`), canonical(birth));
  assert.equal(checkDraft(root, fixture.trusted).birthRef, reference('birth', birth));
}));

test('direct trusted-context API refuses accessor without invoking it', () => owned((root, fixture) => {
  let called = false;
  Object.defineProperty(fixture.trusted, 'authority', { enumerable: true, get() { called = true; return '0'.repeat(64); } });
  assert.throws(() => checkDraft(root, fixture.trusted), { code: 'invalid' });
  assert.equal(called, false);
}));
