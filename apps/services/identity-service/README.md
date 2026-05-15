# identity-service

Owns account identity, OTP verification, sessions, and token lifecycle.

## Current Scope

- NestJS bootstrap
- global configuration validation
- health endpoint
- Prisma module and Prisma service
- repository-backed identity application service
- HS256 JWT access-token issuing
- Prisma schema for identity-owned persistence

## Implemented Endpoints

- `POST /v1/auth/register`
- `POST /v1/auth/verify-otp`
- `POST /v1/auth/refresh`
- `POST /v1/auth/logout`
- `GET /v1/auth/sessions`

## Notes

- OTP verification currently uses a development-only fixed code path
- refresh tokens are opaque placeholders, not rotating JWTs
- `GET /v1/auth/sessions` currently expects `userId` as a query parameter until auth guards are added

## Next Implementation Steps

- add JWT auth guards and current-user context extraction to identity routes that require it
- replace development OTP handling with provider integration
- add outbox publishing for identity events
- add refresh-token reuse detection and stronger session controls
