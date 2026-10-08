// PUBLIC TEST1 fixture construction only; no actual signer or ceremony command.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { createHash, createPrivateKey, sign } from 'node:crypto';
import { canonical, digest } from '../src/bytes.mjs';
import { signed, seeds } from './helpers.mjs';
export const testAuthority = 'd75a980182b10ab7d54bfed3c964073a0ee172f3daa62325af021a68f707511a';
export const hash = bytes => createHash('sha256').update(bytes).digest('hex');
export const reference = (kind, value) => hash(Buffer.concat([Buffer.from(`genesis-organism/ceremony-v1/${kind}\0`), canonical(value)]));
export function testProof(kind, body, domain = 'ceremony-v1') {
  const key = createPrivateKey({ key: Buffer.from(`302e020100300506032b657004220420${seeds[0]}`, 'hex'), type: 'pkcs8', format: 'der' });
  return { body, signature: sign(null, Buffer.concat([Buffer.from(`genesis-organism/${domain}/${kind}-proof\0`), canonical(body)]), key).toString('hex') };
}
const readable = value => Buffer.from(JSON.stringify(value, null, 2) + '\n');
export function draftFixture(root, accepted = true, sourceSizeToken = null) {
  fs.mkdirSync(root, { mode: 0o700 });
  const write = (name, bytes) => { const p = path.join(root, name); fs.mkdirSync(path.dirname(p), { recursive: true, mode: 0o700 }); fs.writeFileSync(p, bytes, { flag: 'wx', mode: 0o600 }); };
  const j = (name, bytes) => write(`journal/${name}`, bytes);
  const revision = execFileSync('git', ['rev-parse', 'HEAD']).toString().trim();
  const binding = { version: 'creator-binding-v1', creator: 'PUBLIC TEST ONLY', authority: testAuthority, scope: 'public-genesis-origin-history-and-ceremony', rights: 'creator-approved-disclosure' };
  const creatorBindingRef = reference('creator-binding', binding), nonce = '1'.repeat(64);
  const trusted = { authority: testAuthority, creatorBindingRef, nonce, revision };
  const origin = signed('origin', { profile: 'synthetic-v1', rules: 'adaptation-v1', birth: 'public-test-only-draft-ceremony', creator: 'PUBLIC TEST ONLY', authority: testAuthority, genome: { signal: 0 } });
  const originRef = digest('origin', origin.body), sourcePath = 'spec/GENESIS.md';
  const source = execFileSync('git', ['show', `${revision}:${sourcePath}`]);
  const inventory = { version: 1, purpose: 'PUBLIC TEST ONLY', revision, selection: 'TEST ONLY bounded source selection', artifacts: [{ path: sourcePath, sha256: hash(source), size: source.length }] };
  const inventoryBytes = sourceSizeToken === null ? readable(inventory) : Buffer.from(readable(inventory).toString().replace(`\"size\": ${source.length}`, `\"size\": ${sourceSizeToken}`));
  const manifest = { ceremony: 'ceremony-v1', profile: 'synthetic-v1', candidate: 'public-test-only-draft-ceremony', revision, creatorBindingRef, originRef, originSha256: hash(canonical(origin)), inventorySha256: hash(inventoryBytes), anchor: 'skip', supersedes: null };
  const manifestRef = reference('manifest', manifest);
  const freeze = testProof('freeze', { ceremony: 'ceremony-v1', manifestRef, authority: testAuthority });
  const freezeRef = reference('freeze', freeze), dependency = Buffer.from('PUBLIC TEST ONLY fake dependency bytes\n');
  const files = new Map([['creator-binding.json', canonical(binding)], ['origin.json', canonical(origin)], ['inventory.json', inventoryBytes], ['manifest.json', canonical(manifest)], ['freeze.json', canonical(freeze)], [`files/${sourcePath}`, source], ['dependencies/test-dependency', dependency]]);
  const packageInventory = { version: 'public-package-v1', files: [...files].map(([name, bytes]) => ({ path: name, sha256: hash(bytes), size: bytes.length })).sort((a, b) => a.path < b.path ? -1 : 1) };
  const packageInventoryBytes = readable(packageInventory), packageInventorySha256 = hash(packageInventoryBytes);
  write('TEST_ONLY', Buffer.from('genesis-organism proposed ceremony TEST ONLY\n'));
  j('CEREMONY', Buffer.from('genesis-organism ceremony-v1\n'));
  for (const name of ['accepted', 'conflicts', 'pending']) fs.mkdirSync(path.join(root, 'journal', name));
  for (const [name, bytes] of files) if (!name.includes('/')) j(name, bytes);
  j('public-package-inventory.json', packageInventoryBytes);
  for (const alias of ['archive-a', 'archive-b', 'public-package']) for (const [name, bytes] of files) write(`${alias}/${name}`, bytes);
  const logs = {};
  for (const [name, location] of [['archive-a-retrieval.json', 'archive-a'], ['archive-b-retrieval.json', 'archive-b'], ['public-retrieval.json', 'public-package']]) {
    logs[name] = readable({ purpose: 'PUBLIC TEST ONLY', packageInventorySha256, revision, location }); write(name, logs[name]);
  }
  const report = { version: 'archive-report-v1', manifestRef,
    archives: ['archive-a', 'archive-b'].map(location => ({ location, custodian: 'PUBLIC TEST ONLY', retrievalEvidenceSha256: hash(logs[`${location}-retrieval.json`]), restored: true })),
    publication: { location: 'public-package', packageInventorySha256, retrievalEvidenceSha256: hash(logs['public-retrieval.json']) },
    dependencies: [{ name: 'test-dependency', version: 'TEST', sha256: hash(dependency) }],
    verification: { sourceRevision: revision, node: 'TEST', python: 'TEST', cryptography: 'TEST', commands: ['TEST ONLY no actual restore claim'], resultsSha256: hash(logs['public-retrieval.json']), network: 'disabled' } };
  j('archive-report.json', readable(report));
  const release = testProof('release', { ceremony: 'ceremony-v1', manifestRef, freezeRef, archiveReportRef: hash(readable(report)), authority: testAuthority });
  const releaseRef = reference('release', release); j('release.json', canonical(release)); write('release-retrieval.json', canonical(release));
  const publication = { version: 'release-publication-v1', releaseRef, location: 'public-package', retrievalEvidenceSha256: hash(canonical(release)) };
  j('release-publication.json', readable(publication));
  const birth = testProof('birth', { ceremony: 'ceremony-v1', manifestRef, releaseRef, originRef, releasePublicationRef: hash(readable(publication)), authority: testAuthority });
  j('birth.json', canonical(birth)); if (accepted) j(`accepted/${originRef}.json`, canonical(birth));
  j('possession.json', canonical(testProof('possession', { version: 'possession-v1', purpose: 'key-possession-only-no-lifecycle-authorization', creatorBindingRef, authority: testAuthority, nonce })));
  return { trusted, originRef, manifestRef, freezeRef, releaseRef, birthRef: reference('birth', birth), files: packageInventory.files.length };
}
