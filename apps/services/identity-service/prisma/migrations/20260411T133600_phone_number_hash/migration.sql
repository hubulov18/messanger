ALTER TABLE "user_accounts" ADD COLUMN "phone_number_hash" TEXT;
CREATE UNIQUE INDEX "user_accounts_phone_number_hash_key" ON "user_accounts"("phone_number_hash");
CREATE INDEX "user_accounts_phone_number_hash_idx" ON "user_accounts"("phone_number_hash");
