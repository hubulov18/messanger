-- ============================================================
-- Migration: groups_channels_v2
-- Phase 1 — Additive changes only. Zero breaking changes.
-- All new columns have safe defaults; existing data stays valid.
-- ============================================================

-- ── New enums ─────────────────────────────────────────────────────────────────

CREATE TYPE "JoinMode" AS ENUM ('open', 'approval_required', 'invite_only');
CREATE TYPE "HistoryVisibility" AS ENUM ('visible_to_all', 'visible_from_join');
CREATE TYPE "JoinRequestStatus" AS ENUM ('pending', 'approved', 'declined');

-- Add 'requested' value to existing ChatMemberStatus enum
-- PostgreSQL only allows ADD VALUE (never remove), so this is safe.
ALTER TYPE "ChatMemberStatus" ADD VALUE IF NOT EXISTS 'requested';

-- ── chats — new columns ───────────────────────────────────────────────────────

ALTER TABLE "chats"
  ADD COLUMN IF NOT EXISTS "join_mode"           "JoinMode"          NOT NULL DEFAULT 'open',
  ADD COLUMN IF NOT EXISTS "is_public"           BOOLEAN             NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS "history_visibility"  "HistoryVisibility" NOT NULL DEFAULT 'visible_to_all',
  ADD COLUMN IF NOT EXISTS "allow_member_invites" BOOLEAN            NOT NULL DEFAULT true;

-- ── chat_members — new columns ────────────────────────────────────────────────

ALTER TABLE "chat_members"
  -- Admin configurable permissions (JSONB, populated iff role='admin')
  ADD COLUMN IF NOT EXISTS "admin_permissions"    JSONB,

  -- Restriction overlay — NOT a status; only applies when status='active'
  ADD COLUMN IF NOT EXISTS "restriction"          JSONB,
  ADD COLUMN IF NOT EXISTS "restriction_until"    TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS "restricted_by_user_id" TEXT,
  ADD COLUMN IF NOT EXISTS "restricted_at"        TIMESTAMPTZ,

  -- Ban audit trail
  ADD COLUMN IF NOT EXISTS "banned_by_user_id"   TEXT,
  ADD COLUMN IF NOT EXISTS "banned_at"           TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS "banned_reason"       TEXT,

  -- Promotion audit trail
  ADD COLUMN IF NOT EXISTS "promoted_by_user_id" TEXT,
  ADD COLUMN IF NOT EXISTS "promoted_at"         TIMESTAMPTZ;

-- Index for efficient expiry queries (background cleanup or lazy check in engine)
CREATE INDEX IF NOT EXISTS "chat_members_restriction_until_idx"
  ON "chat_members" ("restriction_until")
  WHERE "restriction_until" IS NOT NULL;

-- One owner per chat — hard invariant enforced at DB level
-- ⚠ Only create if no chat already violates it (it won't in a fresh or consistent DB)
CREATE UNIQUE INDEX IF NOT EXISTS "chat_members_one_owner_per_chat"
  ON "chat_members" ("chat_id")
  WHERE "role" = 'owner' AND "status" = 'active';

-- ── invite_links — new columns ────────────────────────────────────────────────

ALTER TABLE "invite_links"
  ADD COLUMN IF NOT EXISTS "requires_approval" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS "is_primary"        BOOLEAN NOT NULL DEFAULT false;

-- ── join_requests — new table ─────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS "join_requests" (
  "id"                  TEXT              NOT NULL,
  "chat_id"             TEXT              NOT NULL,
  "user_id"             TEXT              NOT NULL,
  "invite_link_id"      TEXT,
  "status"              "JoinRequestStatus" NOT NULL DEFAULT 'pending',
  "reviewed_by_user_id" TEXT,
  "reviewed_at"         TIMESTAMPTZ,
  "created_at"          TIMESTAMPTZ       NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "join_requests_pkey"             PRIMARY KEY ("id"),
  CONSTRAINT "join_requests_chat_id_fkey"     FOREIGN KEY ("chat_id")        REFERENCES "chats"("id")        ON DELETE CASCADE,
  CONSTRAINT "join_requests_invite_link_fkey" FOREIGN KEY ("invite_link_id") REFERENCES "invite_links"("id")
);

-- Exactly one pending request per (chat, user) at a time
CREATE UNIQUE INDEX IF NOT EXISTS "join_requests_one_pending_per_user"
  ON "join_requests" ("chat_id", "user_id")
  WHERE "status" = 'pending';

CREATE INDEX IF NOT EXISTS "join_requests_chat_status_idx"
  ON "join_requests" ("chat_id", "status");

CREATE INDEX IF NOT EXISTS "join_requests_user_idx"
  ON "join_requests" ("user_id");

-- ── moderation_log — new table ────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS "moderation_log" (
  "id"                   TEXT        NOT NULL,
  "chat_id"              TEXT        NOT NULL,
  "performed_by_user_id" TEXT        NOT NULL,
  "target_user_id"       TEXT,
  "target_message_id"    TEXT,
  "action"               TEXT        NOT NULL,
  "meta"                 JSONB,
  "created_at"           TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "moderation_log_pkey"         PRIMARY KEY ("id"),
  CONSTRAINT "moderation_log_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "chats"("id") ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS "moderation_log_chat_created_idx"
  ON "moderation_log" ("chat_id", "created_at" DESC);

CREATE INDEX IF NOT EXISTS "moderation_log_chat_target_idx"
  ON "moderation_log" ("chat_id", "target_user_id");
