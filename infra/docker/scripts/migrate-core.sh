#!/usr/bin/env zsh
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "$0")/../../.." && pwd)"

export IDENTITY_DATABASE_URL="${IDENTITY_DATABASE_URL:-postgresql://postgres:postgres@localhost:5432/telegram_identity}"
export CHAT_DATABASE_URL="${CHAT_DATABASE_URL:-postgresql://postgres:postgres@localhost:5432/telegram_chat}"
export MESSAGE_DATABASE_URL="${MESSAGE_DATABASE_URL:-postgresql://postgres:postgres@localhost:5432/telegram_message}"

cd "${PROJECT_ROOT}"

npm exec --workspace=@telegram/identity-service prisma migrate deploy
npm exec --workspace=@telegram/chat-service prisma migrate deploy
npm exec --workspace=@telegram/message-service prisma migrate deploy
