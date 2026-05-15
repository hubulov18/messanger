# services

This directory contains backend microservice entrypoints.

Each service should own:

- application layer
- infrastructure adapters
- service-local configuration
- service-local database schema and migrations

Services must not share database writes.
