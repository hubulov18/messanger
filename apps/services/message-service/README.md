# message-service

Owns durable message state, reactions, edits, deletions, and read positions.

## Current Scope

- NestJS bootstrap
- configuration validation
- health endpoint
- JWT auth guard and current-user extraction
- Prisma module and Prisma service
- repository-backed message application service
- chat-service membership enforcement via internal HTTP check
- Prisma schema and initial migration

## Implemented Endpoints

- `POST /v1/messages`
- `PATCH /v1/messages/:messageId`
- `DELETE /v1/messages/:messageId`
- `GET /v1/chats/:chatId/messages`
- `POST /v1/chats/:chatId/read`
- `POST /v1/messages/:messageId/reactions`
- `DELETE /v1/messages/:messageId/reactions/:emoji`

## Notes

- auth now verifies JWT access tokens signed by `identity-service`
- message reads and writes require chat membership via `chat-service`
- delivery and unread projections are still placeholder behavior

## Next Implementation Steps

- add outbox writes for message lifecycle events
- replace internal HTTP check with a typed service client abstraction if shared infra is introduced
- enforce richer edit/delete authorization rules
- add reaction idempotency and conflict handling
