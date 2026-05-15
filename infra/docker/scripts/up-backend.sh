#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
DOCKER_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"

if [ ! -f "${DOCKER_DIR}/.env" ]; then
  cp "${DOCKER_DIR}/.env.example" "${DOCKER_DIR}/.env"
fi

cd "${DOCKER_DIR}"
docker compose up --build -d

docker compose ps
