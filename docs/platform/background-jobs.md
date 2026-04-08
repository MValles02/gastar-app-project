# Background Jobs and Concurrency

## Architecture Context

The deployment topology (defined in [docs/operations/environments-and-config.md](../operations/environments-and-config.md)) operates with:
- 1 `web` service
- 1 `api` service (Node.js/Express)
- 1 `postgres` service

There is no dedicated task queue (like Redis or BullMQ) or separate worker service.

## In-Process Cron

For the MVP, we use an in-process cron scheduler (e.g., `node-cron` or `node-schedule`) running inside the `api` service.

### The Catch-Up Problem

If the `api` container restarts or is down during a scheduled execution time, the cron tick will be missed.

**Solution:**
- The database schema (e.g., `RecurringRule`) must include a `lastExecutedAt` timestamp.
- The system must interpret recurring schedules using the app-wide `America/Argentina/Buenos_Aires` timezone and date-only calendar boundaries.
- On a regular interval, the cron job queries the database for all active rules where the next expected scheduled date is in the past relative to the rule's pattern and `lastExecutedAt`.
- It generates the missing transactions and updates `lastExecutedAt`.

### The Concurrency Problem (Future-Proofing)

While the MVP only has one `api` container, future deployments might scale to multiple instances. If multiple containers run the same in-process cron job simultaneously, they might generate duplicate transactions.

**Solution:**
- The cron execution must use a database lock or an atomic `UPDATE` operation to claim the execution of a rule.
- Example pattern:
  ```sql
  UPDATE "RecurringRule"
  SET "lastExecutedAt" = NOW()
  WHERE "id" = $1 AND "lastExecutedAt" = $2
  RETURNING id;
  ```
- If the `UPDATE` returns 0 rows, another instance has already processed the rule.

## ORM Relationship

- We use Prisma as the ORM.
- Migration workflow and deploy-time migration rules are defined in [docs/operations/ci-cd-and-deployment.md](../operations/ci-cd-and-deployment.md).
