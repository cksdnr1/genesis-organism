# Phase38 plan

1. Add checkBirth using verified archive origin and existing signature/state rules.
2. Add strict single-origin journal scan, exclusive PID lock, atomic publication,
   retained conflicts and explicit no-live-writer recovery in existing tool only.
3. Extend Python independent archive checker to birth/journal/state commitments.
4. Test accepted/repeated/concurrent requests, forged/wrong/missing evidence,
   active/dead/partial locks, unknown/corrupt/conflicting records and six real
   child SIGKILL boundaries with retained pending data and exact retry behavior.
5. Commit source before retained final trial; run full Node/schema/independent
   checks and protected-byte comparison. Record all38 tasks' actual statuses.
6. Update final evidence/runbook/status and PR6, push without automatic merge.

No automatic journal/lock/conflict reset. One private synthetic candidate only;
no canonical state updates or new protocol machinery. Public fixture signer and
exact source revision stay explicit. Rollback new corrective commits; never
discard failure evidence or rewrite origin. Real birth remains unauthorized.
