CREATE TYPE "DevicePlatform" AS ENUM ('ios', 'android', 'web');
CREATE TYPE "NotificationDeliveryStatus" AS ENUM ('pending', 'sent', 'failed');

CREATE TABLE "device_registrations" (
  "id" TEXT NOT NULL,
  "user_id" TEXT NOT NULL,
  "platform" "DevicePlatform" NOT NULL,
  "device_id" TEXT NOT NULL,
  "push_token" TEXT,
  "voip_push_token" TEXT,
  "app_version" TEXT,
  "last_registered_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "revoked_at" TIMESTAMP(3),
  CONSTRAINT "device_registrations_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "notification_preferences" (
  "id" TEXT NOT NULL,
  "user_id" TEXT NOT NULL,
  "chat_id" TEXT,
  "is_muted" BOOLEAN NOT NULL DEFAULT false,
  "mute_until" TIMESTAMP(3),
  "show_preview" BOOLEAN NOT NULL DEFAULT true,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "notification_preferences_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "notification_delivery_log" (
  "id" TEXT NOT NULL,
  "user_id" TEXT NOT NULL,
  "source_event_id" TEXT NOT NULL,
  "provider" TEXT NOT NULL,
  "status" "NotificationDeliveryStatus" NOT NULL,
  "reason_code" TEXT,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "notification_delivery_log_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "device_registrations_user_id_device_id_key" ON "device_registrations"("user_id", "device_id");
CREATE INDEX "device_registrations_push_token_idx" ON "device_registrations"("push_token");
CREATE INDEX "device_registrations_voip_push_token_idx" ON "device_registrations"("voip_push_token");
CREATE INDEX "device_registrations_revoked_at_idx" ON "device_registrations"("revoked_at");
CREATE UNIQUE INDEX "notification_preferences_user_id_chat_id_key" ON "notification_preferences"("user_id", "chat_id");
CREATE INDEX "notification_preferences_user_id_idx" ON "notification_preferences"("user_id");
CREATE INDEX "notification_delivery_log_user_id_idx" ON "notification_delivery_log"("user_id");
CREATE INDEX "notification_delivery_log_source_event_id_idx" ON "notification_delivery_log"("source_event_id");
CREATE INDEX "notification_delivery_log_status_idx" ON "notification_delivery_log"("status");
