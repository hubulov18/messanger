# notification-service

Delivers mobile push notifications and incoming call alerts for iOS and Android.

## Current Scope

- NestJS bootstrap
- configuration validation
- health endpoint
- JWT auth guard and current-user extraction
- Prisma-backed device registration storage
- APNs standard push for iOS message notifications
- VoIP APNs for iOS incoming calls
- FCM for Android message notifications and incoming call alerts

## Implemented Endpoints

- `POST /v1/notifications/devices`
- `POST /v1/internal/notifications/message`
- `POST /v1/internal/notifications/voip/incoming`

## Notes

- Android push requires Firebase Admin credentials:
  - `FCM_PROVIDER_MODE=enabled`
  - `FCM_SERVICE_ACCOUNT_PATH=/abs/path/firebase-service-account.json`
  - or `FCM_SERVICE_ACCOUNT_JSON=...`
- iOS push remains APNs-based and unchanged

## Next Implementation Steps

- add outbox writes for message lifecycle events
- replace internal HTTP check with a typed service client abstraction if shared infra is introduced
- enforce richer edit/delete authorization rules
- add reaction idempotency and conflict handling
