# Infrastructure Bootstrap

`infra/docker-compose.yml` provides the local bootstrap stack for the documented monorepo:

- `postgres` for the local PostgreSQL database
- `api` using the production-oriented API container entrypoint
- `web` serving the built Vite application through Nginx

Use `pnpm db:up` to start the local database only, or `docker compose -f infra/docker-compose.yml up --build` to boot the full stack.
