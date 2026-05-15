CREATE TABLE "chat_mutes" (
  "id" TEXT NOT NULL,
  "chat_id" TEXT NOT NULL,
  "user_id" TEXT NOT NULL,
  "muted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "chat_mutes_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "chat_mutes_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "chats"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE UNIQUE INDEX "chat_mutes_chat_id_user_id_key" ON "chat_mutes"("chat_id", "user_id");
CREATE INDEX "chat_mutes_user_id_idx" ON "chat_mutes"("user_id");
