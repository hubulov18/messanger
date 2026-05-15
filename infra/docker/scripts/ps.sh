#!/usr/bin/env zsh
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
ENV_FILE="${ROOT_DIR}/.env"

docker compose \
  --env-file "${ENV_FILE}" \
  -f "${ROOT_DIR}/docker-compose.yml" \
  ps
