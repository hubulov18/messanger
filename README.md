# Telegram Messenger Monorepo

This repository is structured around the architecture documents in `docs/architecture`.

## Layout

- `apps/mobile-ios` React Native iOS-first client
- `apps/api-gateway` client-facing API gateway
- `apps/services/*` backend microservice entrypoints
- `packages/contracts` shared API and event contracts
- `packages/shared` shared non-domain-specific utilities
- `packages/config` shared tooling configuration
- `packages/tsconfig` shared TypeScript presets
- `infra/docker` local infrastructure definitions
- `scripts` workspace automation scripts

## Service Scope

Initial service folders created:

- `identity-service`
- `profile-service`
- `chat-service`
- `message-service`
- `realtime-service`
- `media-service`
- `notification-service`

Deferred services should be added only when implementation scope reaches them.
