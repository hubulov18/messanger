# docker

Local development infrastructure for the Telegram analogue lives here.

## Services

`docker-compose.yml` starts:
- PostgreSQL
- RabbitMQ
- Redis
- MinIO
- MinIO bootstrap job for the default bucket

PostgreSQL is initialized with these databases:
- `telegram_identity`
- `telegram_chat`
- `telegram_message`
- `telegram_media`
- `telegram_notification`

## Quick Start

1. Copy the env template if you want custom ports or credentials:
```bash
cp infra/docker/.env.example infra/docker/.env
```
2. Start the stack:
```bash
infra/docker/scripts/up.sh
```
3. Check container status:
```bash
infra/docker/scripts/ps.sh
```
4. Apply the core service migrations:
```bash
infra/docker/scripts/migrate-core.sh
```

## Helper Scripts

- `infra/docker/scripts/up.sh`: start all containers
- `infra/docker/scripts/down.sh`: stop containers
- `infra/docker/scripts/logs.sh`: follow logs for all or selected services
- `infra/docker/scripts/ps.sh`: show compose service status
- `infra/docker/scripts/reset.sh`: delete containers and volumes
- `infra/docker/scripts/migrate-core.sh`: apply Prisma migrations for `identity`, `chat`, and `message`

## Default Endpoints

- PostgreSQL: `localhost:5432`
- RabbitMQ AMQP: `localhost:5672`
- RabbitMQ Management: `http://localhost:15672`
- Redis: `localhost:6379`
- MinIO API: `http://localhost:9000`
- MinIO Console: `http://localhost:9001`

## Notes

- The scripts use `docker compose`, not legacy `docker-compose`.
- The migration helper uses `npm` workspaces.
- The database init SQL only runs on first volume creation.
- If you need a clean database bootstrap, run `infra/docker/scripts/reset.sh` and then `infra/docker/scripts/up.sh` again.
