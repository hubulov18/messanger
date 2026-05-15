-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "MessageType" AS ENUM ('text', 'image', 'video', 'audio', 'file', 'system');

-- CreateEnum
CREATE TYPE "MessageStatus" AS ENUM ('sent', 'edited', 'deleted');

-- CreateEnum
CREATE TYPE "OutboxEventStatus" AS ENUM ('pending', 'published', 'failed');

-- CreateTable
CREATE TABLE "messages" (
    "id" TEXT NOT NULL,
    "chat_id" TEXT NOT NULL,
    "sender_user_id" TEXT NOT NULL,
    "client_message_id" TEXT NOT NULL,
    "type" "MessageType" NOT NULL,
    "text" TEXT,
    "reply_to_message_id" TEXT,
    "forwarded_from_message_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "edited_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),
    "status" "MessageStatus" NOT NULL DEFAULT 'sent',

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "message_attachments" (
    "id" TEXT NOT NULL,
    "message_id" TEXT NOT NULL,
    "media_id" TEXT NOT NULL,
    "attachment_type" TEXT NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "message_attachments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "message_reactions" (
    "id" TEXT NOT NULL,
    "message_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "emoji" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "message_reactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "message_revisions" (
    "id" TEXT NOT NULL,
    "message_id" TEXT NOT NULL,
    "previous_text" TEXT,
    "edited_by_user_id" TEXT NOT NULL,
    "edited_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "message_revisions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "read_receipts" (
    "id" TEXT NOT NULL,
    "chat_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "last_read_message_id" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "read_receipts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "delivery_receipts" (
    "id" TEXT NOT NULL,
    "chat_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "last_delivered_message_id" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "delivery_receipts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chat_message_counters" (
    "chat_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "last_message_id" TEXT,
    "unread_count" INTEGER NOT NULL DEFAULT 0,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chat_message_counters_pkey" PRIMARY KEY ("chat_id","user_id")
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
CREATE INDEX "messages_chat_id_created_at_idx" ON "messages"("chat_id", "created_at" DESC);

-- CreateIndex
CREATE INDEX "messages_sender_user_id_idx" ON "messages"("sender_user_id");

-- CreateIndex
CREATE INDEX "messages_reply_to_message_id_idx" ON "messages"("reply_to_message_id");

-- CreateIndex
CREATE UNIQUE INDEX "messages_chat_id_client_message_id_key" ON "messages"("chat_id", "client_message_id");

-- CreateIndex
CREATE INDEX "message_attachments_message_id_idx" ON "message_attachments"("message_id");

-- CreateIndex
CREATE INDEX "message_reactions_message_id_idx" ON "message_reactions"("message_id");

-- CreateIndex
CREATE UNIQUE INDEX "message_reactions_message_id_user_id_emoji_key" ON "message_reactions"("message_id", "user_id", "emoji");

-- CreateIndex
CREATE INDEX "message_revisions_message_id_idx" ON "message_revisions"("message_id");

-- CreateIndex
CREATE INDEX "read_receipts_user_id_idx" ON "read_receipts"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "read_receipts_chat_id_user_id_key" ON "read_receipts"("chat_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "delivery_receipts_chat_id_user_id_key" ON "delivery_receipts"("chat_id", "user_id");

-- CreateIndex
CREATE INDEX "chat_message_counters_user_id_idx" ON "chat_message_counters"("user_id");

-- CreateIndex
CREATE INDEX "outbox_events_status_occurred_at_idx" ON "outbox_events"("status", "occurred_at");

-- AddForeignKey
ALTER TABLE "message_attachments" ADD CONSTRAINT "message_attachments_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "messages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message_reactions" ADD CONSTRAINT "message_reactions_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "messages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message_revisions" ADD CONSTRAINT "message_revisions_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "messages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

