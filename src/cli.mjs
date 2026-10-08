import fs from 'node:fs';
import { isKey, ProtocolError, requireThat } from './bytes.mjs';
import { initialize, load, append } from './store.mjs';

function inputBytes(filename) {
  const descriptor = fs.openSync(filename, fs.constants.O_RDONLY | fs.constants.O_NOFOLLOW);
  try {
    const stat = fs.fstatSync(descriptor);
    requireThat(stat.isFile(), 'invalid', 'regular input file required');
    requireThat(stat.size <= 65536, 'limit', 'input byte budget');
    const buffer = Buffer.alloc(stat.size + 1);
    let count = 0;
    while (count < buffer.length) {
      const received = fs.readSync(descriptor, buffer, count, buffer.length - count, null);
      if (!received) break;
      count += received;
    }
    requireThat(count === stat.size, 'invalid', 'input changed during read');
    return buffer.subarray(0, count);
  } finally { fs.closeSync(descriptor); }
}

let usage = false;
try {
  const [command, ...argumentsList] = process.argv.slice(2);
  const valid = command === 'replay' ? [1, 2].includes(argumentsList.length) : command === 'inspect' ? argumentsList.length === 1 : ['init-fixture', 'append'].includes(command) && argumentsList.length === 2;
  if (!valid || (command === 'replay' && argumentsList.length === 2 && !isKey(argumentsList[1]))) {
    usage = true;
    throw new ProtocolError('invalid', 'usage: replay DIR [HEAD] | inspect DIR | init-fixture DIR ORIGIN | append DIR EVENT');
  }
  const [directory, source] = argumentsList;
  let result;
  if (command === 'init-fixture') result = initialize(directory, inputBytes(source));
  else if (command === 'append') result = append(directory, inputBytes(source));
  else {
    result = load(directory);
    if (command === 'replay' && source !== undefined) requireThat(result.state.head === source, 'invalid', 'expected head mismatch');
  }
  process.stdout.write(JSON.stringify(result) + '\n');
} catch (error) {
  const code = error instanceof ProtocolError ? error.code : error.code === 'ENOENT' ? 'unavailable' : 'io';
  const message = error instanceof ProtocolError ? error.message : 'input/filesystem failure; inspect and retry';
  process.stderr.write(JSON.stringify({ error: code, message }) + '\n');
  process.exitCode = usage ? 2 : 1;
}
