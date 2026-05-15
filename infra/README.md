# infra

Infrastructure assets for local development and deployment support.

## Local Docker Stack

Use the Docker assets under [`infra/docker`](/Users/judyannmartos/Movies/telegram/infra/docker).

Typical flow:
```bash
cp infra/docker/.env.example infra/docker/.env
infra/docker/scripts/up.sh
infra/docker/scripts/migrate-core.sh
```

Current local stack includes:
- PostgreSQL with per-service databases
- RabbitMQ
- Redis
- MinIO
