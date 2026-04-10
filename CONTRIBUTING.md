# Contributing

## Branching

- Create `feature/*`, `fix/*`, `docs/*`, and `chore/*` branches from `develop`.
- Create `hotfix/*` branches from `main`.
- Open pull requests into `develop` for regular work and from `develop` into `main` for production promotion.
- Protected branches accept squash merges only.

## Local setup

1. Install Node.js `18.19+`.
2. Install dependencies with `pnpm install`.
3. Copy `.env.api.local.example` to `.env.api.local` and `.env.web.local.example` to `.env.web.local` for local app startup.
4. Start PostgreSQL with `pnpm db:up` or boot the full local stack with `docker compose -f infra/docker-compose.yml up --build`.
5. Run the apps with `pnpm dev:api` and `pnpm dev:web` when working outside Docker.

## Required checks

Run these commands from the repository root before opening a PR:

- `pnpm lint`
- `pnpm format:check`
- `pnpm typecheck`
- `pnpm build`

## Configuration inputs

- Web examples live in `.env.web.*.example`.
- API examples live in `.env.api.*.example`.
- Deployment workflows expect GitHub variables for per-environment web build inputs and secrets for Dokploy webhook URLs.
- Runtime secrets stay outside the repository.
