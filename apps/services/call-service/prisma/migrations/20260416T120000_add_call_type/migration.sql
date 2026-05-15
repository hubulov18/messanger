-- CreateEnum
CREATE TYPE "CallType" AS ENUM ('audio', 'video');

-- AlterTable: add call_type column with default 'audio' so existing rows are backfilled
ALTER TABLE "call_sessions" ADD COLUMN "call_type" "CallType" NOT NULL DEFAULT 'audio';
