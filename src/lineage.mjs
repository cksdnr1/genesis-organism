import { canonical, isKey, requireThat } from './bytes.mjs';
import { closed } from './perception.mjs';
import { verifiedHistory } from './replay.mjs';
import { validateChild } from './reproduction.mjs';

export function verifyLineage(root, resolve) {
  requireThat(isKey(root) && typeof resolve === 'function', 'invalid', 'lineage query');
  const cache = new Map(), active = new Set(), done = new Set(), edges = [];
  let calls = 0;
  function recordFor(id) {
    requireThat(++calls <= 128, 'limit', 'resolver call budget');
    if (!cache.has(id)) {
      requireThat(cache.size < 32, 'limit', 'lineage node budget');
      const record = resolve(id);
      requireThat(record !== null && record !== undefined, 'unavailable', 'ancestor evidence unavailable');
      canonical(record); closed(record, ['origin', 'events', 'lineage']);
      cache.set(id, structuredClone(record));
    }
    return cache.get(id);
  }
  function visit(id, depth) {
    requireThat(depth <= 16, 'limit', 'lineage depth budget');
    requireThat(!active.has(id), 'invalid', 'lineage cycle');
    if (done.has(id)) return;
    active.add(id);
    const record = recordFor(id);
    const { states } = verifiedHistory(record.origin, record.events);
    requireThat(states[0].organism === id, 'invalid', 'ancestor identity');
    requireThat(states[0].rules === 'adaptation-v1', 'unsupported', 'lineage rules');
    if (record.origin.body.birth.startsWith('child-')) {
      requireThat(record.lineage !== null, 'unavailable', 'child lineage unavailable');
      requireThat(canonical(record.lineage.origin).equals(canonical(record.origin)), 'invalid', 'ancestor packet origin mismatch');
      validateChild(record.lineage, recordFor);
      for (const ref of record.lineage.body.parents) {
        edges.push({ child: id, parent: ref.organism, stateRef: ref.stateRef });
        visit(ref.organism, depth + 1);
      }
    } else requireThat(record.lineage === null, 'invalid', 'root lineage mismatch');
    active.delete(id); done.add(id);
  }
  visit(root, 0);
  const compare = (a, b) => a < b ? -1 : a > b ? 1 : 0;
  return { root, nodes: [...done].sort(), edges: edges.sort((a, b) => compare(a.child, b.child) || compare(a.parent, b.parent)) };
}
