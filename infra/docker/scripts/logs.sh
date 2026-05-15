#!/usr/bin/env zsh
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
ENV_FILE="${ROOT_DIR}/.env"

if [[ $# -gt 0 ]]; then
  docker compose \
    --env-file "${ENV_FILE}" \
    -f "${ROOT_DIR}/docker-compose.yml" \
    logs -f "$@"
else
  docker compose \
    --env-file "${ENV_FILE}" \
    -f "${ROOT_DIR}/docker-compose.yml" \
    logs -f
fi
