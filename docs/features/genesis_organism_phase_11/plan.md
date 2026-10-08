# Phase 11 implementation plan

1. Implement guarded directory and bounded O_NOFOLLOW descriptor reads in store.mjs.
2. Implement initialize and verified directory scan (contiguous final events,
   retained conflict verification), delegating state reconstruction to replay.
3. Implement fsynced exclusive-link publication and append reclassification;
   preserve final files on any failure and persist valid fork evidence before hold.
4. Add domain tests, including real subprocess writers and mocked fsync failure;
   run full Node suite and existing Python vectors. Record measured limits/risks.

Mutation allow-list: new synthetic directory, origin/marker, exclusive next event,
conflict evidence and this invocation's temp. No overwrite/deletion of history.
Reader -> validated directory/history -> admission -> publication -> replay result.
An IO exception means uncertainty and later load/retry, never a fabricated reset.
Rollback fixes code plus regression; no historical repair or new abstraction.
