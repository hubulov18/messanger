# chat-service

Owns chats, memberships, roles, and chat permissions.

## Current Scope

- NestJS bootstrap
- configuration validation
- health endpoint
- JWT auth guard and current-user extraction
- Prisma module and Prisma service
- repository-backed chat application service
- Prisma schema and initial migration
- internal membership access endpoint for service-to-service checks

## Implemented Endpoints

- `POST /v1/chats/direct`
- `POST /v1/chats/group`
- `GET /v1/chats`
- `GET /v1/chats/:chatId`
- `POST /v1/chats/:chatId/members`
- `DELETE /v1/chats/:chatId/members/:userId`
- `GET /v1/internal/chats/:chatId/members/:userId/access`

## Notes

- auth now verifies JWT access tokens signed by `identity-service`
- unread counts and last message previews are not implemented here
- role and permission enforcement are still minimal

## Next Implementation Steps

- add outbox writes for chat and membership events
- enforce admin and role permissions properly
- add invite-link flows and channel-specific behavior later
