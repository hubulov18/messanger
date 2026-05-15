-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('image', 'video', 'audio', 'file', 'avatar');

-- CreateEnum
CREATE TYPE "ProcessingStatus" AS ENUM ('pending', 'uploaded', 'processing', 'ready', 'failed', 'deleted');

-- CreateEnum
CREATE TYPE "UploadSessionStatus" AS ENUM ('pending', 'uploaded', 'expired', 'cancelled');

-- CreateEnum
CREATE TYPE "OutboxEventStatus" AS ENUM ('pending', 'published', 'failed');

-- CreateTable
CREATE TABLE "media_objects" (
    "id" TEXT NOT NULL,
    "owner_user_id" TEXT NOT NULL,
    "storage_key" TEXT NOT NULL,
    "media_type" "MediaType" NOT NULL,
    "mime_type" TEXT NOT NULL,
    "size_bytes" BIGINT NOT NULL,
    "checksum" TEXT,
    "processing_status" "ProcessingStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processed_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "media_objects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media_variants" (
    "id" TEXT NOT NULL,
    "media_id" TEXT NOT NULL,
    "variant_type" TEXT NOT NULL,
    "storage_key" TEXT NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "duration_ms" INTEGER,
    "size_bytes" BIGINT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "media_variants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "upload_sessions" (
    "id" TEXT NOT NULL,
    "media_id" TEXT NOT NULL,
    "owner_user_id" TEXT NOT NULL,
    "status" "UploadSessionStatus" NOT NULL,
    "checksum" TEXT,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "completed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "upload_sessions_pkey" PRIMARY KEY ("id")
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
CREATE UNIQUE INDEX "media_objects_storage_key_key" ON "media_objects"("storage_key");

-- CreateIndex
CREATE INDEX "media_objects_owner_user_id_idx" ON "media_objects"("owner_user_id");

-- CreateIndex
CREATE INDEX "media_objects_processing_status_idx" ON "media_objects"("processing_status");

-- CreateIndex
CREATE INDEX "media_variants_media_id_idx" ON "media_variants"("media_id");

-- CreateIndex
CREATE UNIQUE INDEX "media_variants_media_id_variant_type_key" ON "media_variants"("media_id", "variant_type");

-- CreateIndex
CREATE INDEX "upload_sessions_media_id_idx" ON "upload_sessions"("media_id");

-- CreateIndex
CREATE INDEX "upload_sessions_owner_user_id_idx" ON "upload_sessions"("owner_user_id");

-- CreateIndex
CREATE INDEX "upload_sessions_expires_at_idx" ON "upload_sessions"("expires_at");

-- CreateIndex
CREATE INDEX "outbox_events_status_occurred_at_idx" ON "outbox_events"("status", "occurred_at");

-- AddForeignKey
ALTER TABLE "media_variants" ADD CONSTRAINT "media_variants_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media_objects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "upload_sessions" ADD CONSTRAINT "upload_sessions_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media_objects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

