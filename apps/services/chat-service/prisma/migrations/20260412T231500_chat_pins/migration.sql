CREATE TABLE "chat_pins" (
  "id" TEXT NOT NULL,
  "chat_id" TEXT NOT NULL,
  "user_id" TEXT NOT NULL,
  "pinned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "chat_pins_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "chat_pins_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "chats"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE UNIQUE INDEX "chat_pins_chat_id_user_id_key" ON "chat_pins"("chat_id", "user_id");
CREATE INDEX "chat_pins_user_id_pinned_at_idx" ON "chat_pins"("user_id", "pinned_at");
