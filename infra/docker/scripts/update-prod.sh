#!/usr/bin/env bash
# =============================================================================
# update-prod.sh — деплой обновлений (пересборка + zero-downtime restart)
#
# Использование (с VPS):
#   cd /opt/telegram && git pull && bash infra/docker/scripts/update-prod.sh
# =============================================================================
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "$0")/../../.." && pwd)"
cd "$PROJECT_ROOT"

echo "🏗️   Пересобираю образы..."
docker compose \
  -f infra/docker/docker-compose.yml \
  -f infra/docker/docker-compose.prod.yml \
  --env-file infra/docker/.env.prod \
  build

echo "🔄  Перезапускаю сервисы..."
docker compose \
  -f infra/docker/docker-compose.yml \
  -f infra/docker/docker-compose.prod.yml \
  --env-file infra/docker/.env.prod \
  up -d --remove-orphans

echo "✅  Обновление завершено."
