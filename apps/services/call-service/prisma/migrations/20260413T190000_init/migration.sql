CREATE TYPE "CallState" AS ENUM ('initiated', 'ringing', 'accepted', 'active', 'ended', 'declined', 'missed', 'canceled', 'failed');
CREATE TYPE "CallParticipantRole" AS ENUM ('caller', 'callee');
CREATE TYPE "CallParticipantState" AS ENUM ('invited', 'ringing', 'joined', 'accepted', 'active', 'left', 'declined', 'missed', 'ended', 'failed');
CREATE TYPE "OutboxEventStatus" AS ENUM ('pending', 'published', 'failed');

CREATE TABLE "call_sessions" (
  "id" TEXT NOT NULL,
  "chat_id" TEXT NOT NULL,
  "initiator_user_id" TEXT NOT NULL,
  "receiver_user_id" TEXT NOT NULL,
  "state" "CallState" NOT NULL,
  "started_at" TIMESTAMP(3) NOT NULL,
  "ringing_at" TIMESTAMP(3),
  "accepted_at" TIMESTAMP(3),
  "active_at" TIMESTAMP(3),
  "ended_at" TIMESTAMP(3),
  "end_reason" TEXT,
  "timeline_message_id" TEXT,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "call_sessions_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "call_participants" (
  "id" TEXT NOT NULL,
  "call_id" TEXT NOT NULL,
  "user_id" TEXT NOT NULL,
  "role" "CallParticipantRole" NOT NULL,
  "state" "CallParticipantState" NOT NULL,
  "joined_at" TIMESTAMP(3),
  "left_at" TIMESTAMP(3),
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "call_participants_pkey" PRIMARY KEY ("id")
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

CREATE UNIQUE INDEX "call_participants_call_id_user_id_key" ON "call_participants"("call_id", "user_id");
CREATE INDEX "call_sessions_chat_id_created_at_idx" ON "call_sessions"("chat_id", "created_at" DESC);
CREATE INDEX "call_sessions_initiator_user_id_state_idx" ON "call_sessions"("initiator_user_id", "state");
CREATE INDEX "call_sessions_receiver_user_id_state_idx" ON "call_sessions"("receiver_user_id", "state");
CREATE INDEX "call_participants_user_id_state_idx" ON "call_participants"("user_id", "state");
CREATE INDEX "outbox_events_status_locked_at_occurred_at_idx" ON "outbox_events"("status", "locked_at", "occurred_at");
CREATE INDEX "outbox_events_locked_by_idx" ON "outbox_events"("locked_by");

ALTER TABLE "call_participants"
  ADD CONSTRAINT "call_participants_call_id_fkey"
  FOREIGN KEY ("call_id") REFERENCES "call_sessions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
