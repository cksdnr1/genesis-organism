import { readFileSync } from 'node:fs';
import { createPrivateKey, sign } from 'node:crypto';
import { canonical, digest } from '../src/bytes.mjs';

export const fixture = name => JSON.parse(readFileSync(new URL(`../fixtures/core-v1/${name}`, import.meta.url)));
export const seeds = [
  '9d61b19deffd5a60ba844af492ec2cc44449c5697b326919703bac031cae7f60',
  '4ccd089b28ff96da9db6c346ec114e0f5b8a319f35aba624da8cf6ed4fb8a6fb',
];
export function signed(kind, body, seed = seeds[0]) {
  const key = createPrivateKey({ key: Buffer.concat([Buffer.from('302e020100300506032b657004220420', 'hex'), Buffer.from(seed, 'hex')]), format: 'der', type: 'pkcs8' });
  const message = Buffer.concat([Buffer.from(`genesis-organism/synthetic-v1/${kind}-proof\0`), canonical(body)]);
  return { body: structuredClone(body), signature: sign(null, message, key).toString('hex') };
}
export const reference = envelope => digest('event', envelope.body);
export const history = () => [1, 2, 3].map(sequence => fixture(`${String(sequence).padStart(6, '0')}.json`));
