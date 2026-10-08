import { createHash, createPublicKey, verify } from 'node:crypto';

export class ProtocolError extends Error {
  constructor(code, message) { super(message); this.name = 'ProtocolError'; this.code = code; }
}
export function requireThat(ok, code, message) { if (!ok) throw new ProtocolError(code, message); }
const MAX_BYTES = 65536;
const HASH_KINDS = new Set(['origin', 'event', 'state', 'observer', 'policy', 'expression-input', 'expression-output', 'encounter', 'interaction', 'reproduction']);
const PROOF_KINDS = new Set(['origin', 'event', 'reproduction']);
const prefix = kind => Buffer.from(`genesis-organism/synthetic-v1/${kind}\0`, 'ascii');

export function canonical(value) {
  let nodes = 0;
  const ancestors = new Set();
  function string(s) {
    requireThat(s.isWellFormed(), 'invalid', 'invalid Unicode');
    requireThat(Buffer.byteLength(s, 'utf8') <= 4096, 'limit', 'string budget');
    return JSON.stringify(s);
  }
  function emit(v, depth) {
    requireThat(depth <= 16 && ++nodes <= 4096, 'limit', 'depth or node budget');
    if (v === null) return 'null';
    if (typeof v === 'boolean') return v ? 'true' : 'false';
    if (typeof v === 'string') return string(v);
    if (typeof v === 'number') {
      requireThat(Number.isSafeInteger(v) && !Object.is(v, -0), 'invalid', 'integer required');
      return String(v);
    }
    requireThat(typeof v === 'object' && v !== null, 'invalid', 'JSON value required');
    requireThat(!ancestors.has(v), 'invalid', 'cyclic value');
    const array = Array.isArray(v);
    requireThat(array || [Object.prototype, null].includes(Object.getPrototypeOf(v)), 'invalid', 'plain object required');
    const keys = Object.keys(v);
    requireThat(keys.length <= 256 && (!array || v.length <= 256), 'limit', 'member budget');
    requireThat(Object.getOwnPropertySymbols(v).length === 0, 'invalid', 'symbol member');
    for (const k of keys) requireThat('value' in Object.getOwnPropertyDescriptor(v, k), 'invalid', 'accessor member');
    ancestors.add(v);
    let out;
    if (array) {
      requireThat(keys.length === v.length && keys.every((k, i) => k === String(i)), 'invalid', 'dense array required');
      out = '[' + v.map(x => emit(x, depth + 1)).join(',') + ']';
    } else {
      // Assemble directly: JSON.stringify(object) would reorder integer-looking keys.
      out = '{' + keys.sort().map(k => string(k) + ':' + emit(v[k], depth + 1)).join(',') + '}';
    }
    ancestors.delete(v);
    return out;
  }
  const out = Buffer.from(emit(value, 0), 'utf8');
  requireThat(out.length <= MAX_BYTES, 'limit', 'byte budget');
  return out;
}

export function parseCanonical(input) {
  requireThat(input instanceof Uint8Array, 'invalid', 'wire bytes required');
  requireThat(input.byteLength <= MAX_BYTES, 'limit', 'byte budget');
  const bytes = Buffer.from(input);
  let value;
  try { value = JSON.parse(new TextDecoder('utf-8', { fatal: true, ignoreBOM: true }).decode(bytes)); }
  catch { throw new ProtocolError('invalid', 'invalid UTF-8 or JSON'); }
  requireThat(canonical(value).equals(bytes), 'invalid', 'noncanonical wire');
  return value;
}

export function digest(kind, value) {
  requireThat(HASH_KINDS.has(kind), 'unsupported', 'hash domain');
  return createHash('sha256').update(prefix(kind)).update(canonical(value)).digest('hex');
}
export const isKey = value => typeof value === 'string' && /^[0-9a-f]{64}$/.test(value);
export const isSignature = value => typeof value === 'string' && /^[0-9a-f]{128}$/.test(value);
export function verifyProof(kind, body, signature, key) {
  if (!PROOF_KINDS.has(kind) || !isKey(key) || !isSignature(signature)) return false;
  try {
    const publicKey = createPublicKey({key: Buffer.concat([Buffer.from('302a300506032b6570032100','hex'), Buffer.from(key,'hex')]), format:'der', type:'spki'});
    return verify(null, Buffer.concat([prefix(kind + '-proof'), canonical(body)]), publicKey, Buffer.from(signature,'hex'));
  } catch { return false; }
}
