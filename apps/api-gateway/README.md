# api-gateway

NestJS API gateway for client-facing HTTP routes.

Current scope:
- auth proxy routes to `identity-service`
- chat proxy routes to `chat-service`
- message proxy routes to `message-service`
- shared header forwarding for auth/device/request metadata

Env:
- `IDENTITY_SERVICE_URL`
- `CHAT_SERVICE_URL`
- `MESSAGE_SERVICE_URL`
