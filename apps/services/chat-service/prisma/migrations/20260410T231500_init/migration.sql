-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "ChatType" AS ENUM ('direct', 'group', 'channel');

-- CreateEnum
CREATE TYPE "ChatMemberRole" AS ENUM ('owner', 'admin', 'member');

-- CreateEnum
CREATE TYPE "ChatMemberStatus" AS ENUM ('active', 'invited', 'removed', 'left', 'banned');

-- CreateEnum
CREATE TYPE "OutboxEventStatus" AS ENUM ('pending', 'published', 'failed');

-- CreateTable
CREATE TABLE "chats" (
    "id" TEXT NOT NULL,
    "type" "ChatType" NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "photo_media_id" TEXT,
    "created_by_user_id" TEXT NOT NULL,
    "is_archived" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chat_members" (
    "id" TEXT NOT NULL,
    "chat_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "role" "ChatMemberRole" NOT NULL,
    "status" "ChatMemberStatus" NOT NULL,
    "invited_by_user_id" TEXT,
    "joined_at" TIMESTAMP(3),
    "left_at" TIMESTAMP(3),

    CONSTRAINT "chat_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chat_permissions" (
    "chat_id" TEXT NOT NULL,
    "can_send_messages" BOOLEAN NOT NULL DEFAULT true,
    "can_add_members" BOOLEAN NOT NULL DEFAULT true,
    "can_pin_messages" BOOLEAN NOT NULL DEFAULT true,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chat_permissions_pkey" PRIMARY KEY ("chat_id")
);

-- CreateTable
CREATE TABLE "invite_links" (
    "id" TEXT NOT NULL,
    "chat_id" TEXT NOT NULL,
    "token_hash" TEXT NOT NULL,
    "created_by_user_id" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3),
    "max_uses" INTEGER,
    "used_count" INTEGER NOT NULL DEFAULT 0,
    "revoked_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "invite_links_pkey" PRIMARY KEY ("id")
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

    CONSTRAINT "outbox_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "chats_type_idx" ON "chats"("type");

-- CreateIndex
CREATE INDEX "chats_created_by_user_id_idx" ON "chats"("created_by_user_id");

-- CreateIndex
CREATE INDEX "chat_members_user_id_idx" ON "chat_members"("user_id");

-- CreateIndex
CREATE INDEX "chat_members_chat_id_status_idx" ON "chat_members"("chat_id", "status");

-- CreateIndex
CREATE UNIQUE INDEX "chat_members_chat_id_user_id_key" ON "chat_members"("chat_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "invite_links_token_hash_key" ON "invite_links"("token_hash");

-- CreateIndex
CREATE INDEX "invite_links_chat_id_idx" ON "invite_links"("chat_id");

-- CreateIndex
CREATE INDEX "outbox_events_status_occurred_at_idx" ON "outbox_events"("status", "occurred_at");

-- AddForeignKey
ALTER TABLE "chat_members" ADD CONSTRAINT "chat_members_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "chats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_permissions" ADD CONSTRAINT "chat_permissions_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "chats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invite_links" ADD CONSTRAINT "invite_links_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "chats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

