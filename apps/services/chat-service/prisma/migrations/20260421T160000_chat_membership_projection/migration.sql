CREATE TABLE "chat_membership_projection" (
    "chat_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "role" "ChatMemberRole" NOT NULL,
    "status" "ChatMemberStatus" NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chat_membership_projection_pkey" PRIMARY KEY ("chat_id","user_id")
);

CREATE TABLE "chat_membership_projection_events" (
    "event_id" TEXT NOT NULL,
    "event_type" TEXT NOT NULL,
    "occurred_at" TIMESTAMP(3) NOT NULL,
    "processed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "chat_id" TEXT,
    "user_id" TEXT,

    CONSTRAINT "chat_membership_projection_events_pkey" PRIMARY KEY ("event_id")
);

CREATE TABLE "chat_membership_projection_offsets" (
    "consumer" TEXT NOT NULL,
    "last_event_id" TEXT,
    "last_occurred_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chat_membership_projection_offsets_pkey" PRIMARY KEY ("consumer")
);

CREATE INDEX "chat_membership_projection_chat_id_status_idx"
  ON "chat_membership_projection"("chat_id", "status");

CREATE INDEX "chat_membership_projection_user_id_status_idx"
  ON "chat_membership_projection"("user_id", "status");

CREATE INDEX "chat_membership_projection_events_occurred_at_idx"
  ON "chat_membership_projection_events"("occurred_at");

CREATE INDEX "chat_membership_projection_events_chat_id_user_id_idx"
  ON "chat_membership_projection_events"("chat_id", "user_id");
