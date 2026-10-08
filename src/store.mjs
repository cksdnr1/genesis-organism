import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';
import { canonical, parseCanonical, ProtocolError, requireThat } from './bytes.mjs';
import { classify, validateOrigin } from './admission.mjs';
import { replay, verifiedHistory } from './replay.mjs';
import { validateChild } from './reproduction.mjs';

const marker = 'genesis-organism synthetic-v1\n';
const protectedDirectory = fileURLToPath(new URL('../organisms/genesis-0001', import.meta.url));
function protectedTarget(directory) {
  const absolute = path.resolve(directory);
  const resolved = path.join(fs.realpathSync(path.dirname(absolute)), path.basename(absolute));
  for (const target of [absolute, resolved]) requireThat(target !== protectedDirectory && !target.startsWith(protectedDirectory + path.sep), 'unauthorized', 'protected organism directory');
  return absolute;
}
function guard(directory) {
  const absolute = protectedTarget(directory);
  const stat = fs.lstatSync(absolute);
  requireThat(stat.isDirectory() && !stat.isSymbolicLink(), 'invalid', 'synthetic directory required');
  requireThat(readBounded(path.join(absolute, 'SYNTHETIC')).toString() === marker, 'invalid', 'synthetic marker required');
  return absolute;
}
function readBounded(filename) {
  const descriptor = fs.openSync(filename, fs.constants.O_RDONLY | fs.constants.O_NOFOLLOW | fs.constants.O_NONBLOCK);
  try {
    const stat = fs.fstatSync(descriptor);
    requireThat(stat.isFile(), 'invalid', 'regular history file required');
    requireThat(stat.size <= 65536, 'limit', 'file byte budget');
    const buffer = Buffer.alloc(stat.size + 1);
    let count = 0;
    while (count < buffer.length) {
      const received = fs.readSync(descriptor, buffer, count, buffer.length - count, null);
      if (received === 0) break;
      count += received;
    }
    requireThat(count === stat.size, 'invalid', 'history changed during read');
    return buffer.subarray(0, count);
  } finally { fs.closeSync(descriptor); }
}
function syncDirectory(directory) {
  const descriptor = fs.openSync(directory, fs.constants.O_RDONLY);
  try { fs.fsyncSync(descriptor); } finally { fs.closeSync(descriptor); }
}
function publish(directory, name, bytes) {
  const temporary = path.join(directory, `.pending-${randomUUID()}`);
  const descriptor = fs.openSync(temporary, 'wx', 0o600);
  try { fs.writeFileSync(descriptor, bytes); fs.fsyncSync(descriptor); }
  finally { fs.closeSync(descriptor); }
  let linked = false;
  try {
    fs.linkSync(temporary, path.join(directory, name));
    linked = true;
    syncDirectory(directory);
  } catch (error) {
    if (error.code !== 'EEXIST') throw error;
  } finally {
    fs.unlinkSync(temporary);
    syncDirectory(directory);
  }
  return linked;
}
function operation(action) {
  try { return action(); }
  catch (error) {
    if (error instanceof ProtocolError) throw error;
    if (error.code === 'ENOENT') throw new ProtocolError('unavailable', 'required path unavailable');
    if (error.code === 'ELOOP') throw new ProtocolError('invalid', 'symlinked history member');
    throw new ProtocolError('io', 'filesystem failure; load and retry to determine outcome');
  }
}
function scan(directory) {
  const absolute = guard(directory);
  const names = fs.readdirSync(absolute);
  requireThat(names.length <= 2048, 'limit', 'directory member budget');
  const origin = parseCanonical(readBounded(path.join(absolute, 'origin.json')));
  const eventNames = names.filter(name => /^\d{6}\.json$/.test(name)).sort();
  requireThat(eventNames.length <= 512, 'limit', 'history event budget');
  const events = eventNames.map((name, index) => {
    requireThat(name === `${String(index + 1).padStart(6, '0')}.json`, 'unavailable', 'history sequence gap');
    return parseCanonical(readBounded(path.join(absolute, name)));
  });
  const context = verifiedHistory(origin, events);
  for (const name of names.filter(name => name.startsWith('conflict-'))) {
    const evidence = parseCanonical(readBounded(path.join(absolute, name)));
    const outcome = classify(context.states, context.events, evidence);
    requireThat(outcome.status === 'conflict' && name === `conflict-${outcome.reference}.json`, 'invalid', 'invalid conflict evidence');
    throw new ProtocolError('conflict', 'signed divergent successor retained');
  }
  return { absolute, origin, events, ...context };
}
export function initialize(directory, originBytes) {
  return operation(() => {
    const origin = parseCanonical(originBytes);
    validateOrigin(origin);
    const absolute = protectedTarget(directory);
    fs.mkdirSync(absolute, { mode: 0o700 });
    publish(absolute, 'origin.json', originBytes);
    publish(absolute, 'SYNTHETIC', Buffer.from(marker));
    syncDirectory(path.dirname(absolute));
    return replay(origin, []);
  });
}
export function load(directory) {
  return operation(() => {
    const { origin, events } = scan(directory);
    return replay(origin, events);
  });
}
export function append(directory, eventBytes) {
  return operation(() => {
    const candidate = parseCanonical(eventBytes);
    let context = scan(directory);
    let outcome = classify(context.states, context.events, candidate);
    if (outcome.status === 'accepted') {
      replay(context.origin, [...context.events, candidate]);
      const filename = `${String(candidate.body.sequence).padStart(6, '0')}.json`;
      if (publish(context.absolute, filename, canonical(candidate))) return { ...outcome, ...load(directory) };
      context = scan(directory);
      outcome = classify(context.states, context.events, candidate);
    }
    if (outcome.status === 'duplicate') {
      syncDirectory(context.absolute);
      return { ...outcome, ...replay(context.origin, context.events) };
    }
    if (outcome.status === 'conflict') {
      const filename = `conflict-${outcome.reference}.json`;
      if (!publish(context.absolute, filename, canonical(candidate))) requireThat(readBounded(path.join(context.absolute, filename)).equals(canonical(candidate)), 'invalid', 'conflict evidence mismatch');
      throw new ProtocolError('conflict', 'signed divergent successor retained');
    }
    throw new ProtocolError(outcome.code || 'invalid', outcome.reason || 'candidate rejected');
  });
}

export function loadChild(directory, resolve) {
  return operation(() => {
    const absolute = guard(directory);
    const originBytes = readBounded(path.join(absolute, 'origin.json'));
    const packet = parseCanonical(readBounded(path.join(absolute, 'lineage.json')));
    requireThat(canonical(packet.origin).equals(originBytes), 'invalid', 'lineage origin mismatch');
    const lineage = validateChild(packet, resolve);
    return { history: load(directory), lineage };
  });
}

export function publishChild(directory, packet, resolve) {
  return operation(() => {
    validateChild(packet, resolve);
    const absolute = protectedTarget(directory);
    const originBytes = canonical(packet.origin), lineageBytes = canonical(packet);
    try { fs.lstatSync(absolute); }
    catch (error) {
      if (error.code !== 'ENOENT') throw error;
      initialize(absolute, originBytes);
    }
    guard(absolute);
    requireThat(readBounded(path.join(absolute, 'origin.json')).equals(originBytes), 'invalid', 'different existing child origin');
    load(absolute);
    if (!publish(absolute, 'lineage.json', lineageBytes)) requireThat(readBounded(path.join(absolute, 'lineage.json')).equals(lineageBytes), 'invalid', 'different existing lineage');
    syncDirectory(absolute);
    return loadChild(absolute, resolve);
  });
}
