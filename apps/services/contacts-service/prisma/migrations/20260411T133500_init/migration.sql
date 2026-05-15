CREATE TYPE "OutboxEventStatus" AS ENUM ('pending', 'published', 'failed');

CREATE TABLE "contact_books" (
    "owner_user_id" TEXT NOT NULL,
    "last_imported_at" TIMESTAMP(3),
    "version" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "contact_books_pkey" PRIMARY KEY ("owner_user_id")
);

CREATE TABLE "imported_contacts" (
    "id" TEXT NOT NULL,
    "owner_user_id" TEXT NOT NULL,
    "normalized_hash" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "matched_user_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "imported_contacts_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "outbox_events" (
    "id" TEXT NOT NULL,
    "event_type" TEXT NOT NULL,
    "event_version" INTEGER NOT NULL,
    "aggregate_id" TEXT NOT NULL,
    "partition_key" TEXT NOT NULL,
    "payload_json" JSONB NOT NULL,
    "occurred_at" TIMESTAMP(3) NOT NULL,
    "published_at" TIMESTAMP(3),
    "status" "OutboxEventStatus" NOT NULL,
    "attempt_count" INTEGER NOT NULL DEFAULT 0,
    "last_error" TEXT,
    "locked_at" TIMESTAMP(3),
    "locked_by" TEXT,
    CONSTRAINT "outbox_events_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "imported_contacts_owner_user_id_normalized_hash_key" ON "imported_contacts"("owner_user_id", "normalized_hash");
CREATE INDEX "imported_contacts_owner_user_id_idx" ON "imported_contacts"("owner_user_id");
CREATE INDEX "imported_contacts_normalized_hash_idx" ON "imported_contacts"("normalized_hash");
CREATE INDEX "imported_contacts_matched_user_id_idx" ON "imported_contacts"("matched_user_id");
CREATE INDEX "outbox_events_status_locked_at_occurred_at_idx" ON "outbox_events"("status", "locked_at", "occurred_at");
CREATE INDEX "outbox_events_locked_by_idx" ON "outbox_events"("locked_by");

ALTER TABLE "imported_contacts"
ADD CONSTRAINT "imported_contacts_owner_user_id_fkey"
FOREIGN KEY ("owner_user_id") REFERENCES "contact_books"("owner_user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
