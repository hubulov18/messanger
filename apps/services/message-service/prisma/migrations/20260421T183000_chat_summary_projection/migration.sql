CREATE TABLE "chat_summary_projection" (
  "chat_id" TEXT NOT NULL,
  "last_message_id" TEXT,
  "last_message_preview" TEXT,
  "last_activity_at" TIMESTAMP(3),
  "last_sender_user_id" TEXT,
  "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "chat_summary_projection_pkey" PRIMARY KEY ("chat_id")
);

CREATE INDEX "chat_summary_projection_last_activity_at_idx"
  ON "chat_summary_projection"("last_activity_at" DESC);

CREATE TABLE "chat_summary_projection_events" (
  "event_id" TEXT NOT NULL,
  "event_type" TEXT NOT NULL,
  "occurred_at" TIMESTAMP(3) NOT NULL,
  "chat_id" TEXT,
  CONSTRAINT "chat_summary_projection_events_pkey" PRIMARY KEY ("event_id")
);

CREATE INDEX "chat_summary_projection_events_occurred_at_idx"
  ON "chat_summary_projection_events"("occurred_at");

CREATE INDEX "chat_summary_projection_events_chat_id_occurred_at_idx"
  ON "chat_summary_projection_events"("chat_id", "occurred_at");

CREATE TABLE "chat_summary_projection_offsets" (
  "consumer" TEXT NOT NULL,
  "last_event_id" TEXT,
  "last_occurred_at" TIMESTAMP(3),
  "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "chat_summary_projection_offsets_pkey" PRIMARY KEY ("consumer")
);
