-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "VisibilityLevel" AS ENUM ('everyone', 'contacts', 'nobody');

-- CreateEnum
CREATE TYPE "OutboxEventStatus" AS ENUM ('pending', 'published', 'failed');

-- CreateTable
CREATE TABLE "user_profiles" (
    "user_id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "bio" TEXT,
    "avatar_media_id" TEXT,
    "last_seen_visibility" "VisibilityLevel" NOT NULL DEFAULT 'contacts',
    "phone_visibility" "VisibilityLevel" NOT NULL DEFAULT 'nobody',
    "profile_photo_visibility" "VisibilityLevel" NOT NULL DEFAULT 'everyone',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_profiles_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "block_relations" (
    "id" TEXT NOT NULL,
    "owner_user_id" TEXT NOT NULL,
    "blocked_user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "block_relations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
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

-- CreateIndex
CREATE UNIQUE INDEX "user_profiles_username_key" ON "user_profiles"("username");

-- CreateIndex
CREATE INDEX "user_profiles_display_name_idx" ON "user_profiles"("display_name");

-- CreateIndex
CREATE INDEX "block_relations_blocked_user_id_idx" ON "block_relations"("blocked_user_id");

-- CreateIndex
CREATE UNIQUE INDEX "block_relations_owner_user_id_blocked_user_id_key" ON "block_relations"("owner_user_id", "blocked_user_id");

-- CreateIndex
CREATE INDEX "outbox_events_status_locked_at_occurred_at_idx" ON "outbox_events"("status", "locked_at", "occurred_at");

-- CreateIndex
CREATE INDEX "outbox_events_locked_by_idx" ON "outbox_events"("locked_by");

