ALTER TABLE "outbox_events"
  ADD COLUMN "attempt_count" INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN "last_error" TEXT,
  ADD COLUMN "locked_at" TIMESTAMP(3),
  ADD COLUMN "locked_by" TEXT;

DROP INDEX IF EXISTS "outbox_events_status_occurred_at_idx";
CREATE INDEX "outbox_events_status_locked_at_occurred_at_idx"
  ON "outbox_events"("status", "locked_at", "occurred_at");
CREATE INDEX "outbox_events_locked_by_idx"
  ON "outbox_events"("locked_by");
