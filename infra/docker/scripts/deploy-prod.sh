#!/usr/bin/env bash
# =============================================================================
# deploy-prod.sh — первоначальный деплой на чистый VPS (Ubuntu 22/24)
#
# Запускается ОДИН РАЗ на сервере от имени root или sudo-пользователя.
# После этого используй update-prod.sh для обновлений.
#
# Использование:
#   scp -r . user@your-vps:/opt/telegram
#   ssh user@your-vps "cd /opt/telegram && bash infra/docker/scripts/deploy-prod.sh"
# =============================================================================
set -euo pipefail

COMPOSE_DIR="$(cd "$(dirname "$0")/.." && pwd)"
PROJECT_ROOT="$(cd "$COMPOSE_DIR/../.." && pwd)"
ENV_FILE="$COMPOSE_DIR/.env.prod"

# --- Проверки ---
if [ ! -f "$ENV_FILE" ]; then
  echo "❌  Файл $ENV_FILE не найден."
  echo "    Скопируй .env.prod.example → .env.prod и заполни значения."
  exit 1
fi

source "$ENV_FILE"

if [ -z "${SERVER_HOST:-}" ]; then
  echo "❌  SERVER_HOST не задан в .env.prod"
  exit 1
fi

# --- Docker ---
if ! command -v docker &>/dev/null; then
  echo "📦  Устанавливаю Docker..."
  curl -fsSL https://get.docker.com | sh
  systemctl enable --now docker
fi

# --- Открываем нужные порты ---
# Oracle Cloud Ubuntu имеет жёсткие iptables-правила по умолчанию,
# которые блокируют трафик даже если Security List в VCN открыт.
# Полностью заменяем их на минимально необходимые.
echo "🔒  Настраиваю firewall..."

if command -v ufw &>/dev/null; then
  # ufw (стандартный путь для Ubuntu)
  ufw allow 22/tcp
  ufw allow 3000/tcp  # api-gateway
  ufw allow 3007/tcp  # call-service WebSocket
  ufw allow 9000/tcp  # MinIO presigned uploads
  ufw allow 9001/tcp  # MinIO console (можно закрыть после настройки)
  ufw allow 3478/tcp  # coturn
  ufw allow 3478/udp
  ufw allow 49152:49200/udp  # coturn relay
  ufw --force enable
fi

# Oracle Cloud специфика: сбрасываем iptables-правила которые блокируют
# входящий трафик на уровне ОС (REJECT в цепочке INPUT)
if iptables -L INPUT | grep -q "REJECT\|DROP"; then
  echo "   Убираю iptables REJECT-правила Oracle..."
  iptables -D INPUT -j REJECT --reject-with icmp-host-prohibited 2>/dev/null || true
  iptables -D FORWARD -j REJECT --reject-with icmp-host-prohibited 2>/dev/null || true
  # Сохраняем чтобы правила выжили после перезагрузки
  if command -v netfilter-persistent &>/dev/null; then
    netfilter-persistent save
  elif command -v iptables-save &>/dev/null; then
    iptables-save > /etc/iptables/rules.v4 2>/dev/null || true
  fi
fi

# --- Сборка и запуск ---
echo "🏗️   Собираю образы (это займёт несколько минут)..."
cd "$PROJECT_ROOT"

docker compose \
  -f infra/docker/docker-compose.yml \
  -f infra/docker/docker-compose.prod.yml \
  --env-file infra/docker/.env.prod \
  build --no-cache

echo "🚀  Запускаю сервисы..."
docker compose \
  -f infra/docker/docker-compose.yml \
  -f infra/docker/docker-compose.prod.yml \
  --env-file infra/docker/.env.prod \
  up -d

echo ""
echo "✅  Готово! Сервисы запущены."
echo ""
echo "   API Gateway:        http://${SERVER_HOST}:3000/v1"
echo "   Call Signaling WS:  http://${SERVER_HOST}:3007/calls"
echo "   MinIO Console:      http://${SERVER_HOST}:9001  (закрой после настройки)"
echo ""
echo "   Логи:   docker compose -f infra/docker/docker-compose.yml -f infra/docker/docker-compose.prod.yml logs -f"
echo "   Статус: docker compose -f infra/docker/docker-compose.yml -f infra/docker/docker-compose.prod.yml ps"
