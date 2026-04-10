# CI/CD and Deployment

## Purpose

This document defines the release pipeline, automated validation, deployment strategy, and hotfix handling for Gastar App.

## Core Principle

Every production deploy must pass through local validation and development deployment. GitHub Actions enforces quality before merge and builds/publishes deployable images after merge. Dokploy pulls these images and runs the application.

## Branch and Promotion Flow

The intended path is: `LOCAL TEST -> DEVELOPMENT DEPLOY -> MAIN DEPLOY`

Branches used:
- `feature/*`, `fix/*`, `chore/*`, `docs/*`: Work branches.
- `develop`: Integration branch mapped to the **development** environment.
- `main`: Production branch mapped to the **production** environment.
- `hotfix/*`: Urgent fixes from `main`.

Regular work branches (`feature/*`, `fix/*`, `chore/*`, `docs/*`) are created from `develop`.

The repository validation workflow enforces this promotion path for protected branches:
- pull requests into `develop` may come from normal work branches
- pull requests into `main` must come from `develop` or `hotfix/*`

Merge behavior for this flow:
- pull requests from short-lived work branches into a protected branch should use squash merge
- pull requests that synchronize `develop` and `main` (`develop` -> `main` promotions and `main` -> `develop` back-merges) must use merge commits so the protected branches keep shared ancestry

Promotion steps:
1. Create a `feature/*`, `fix/*`, `chore/*`, or `docs/*` branch from `develop`.
2. PR from that work branch to `develop`.
3. Squash merge triggers auto-deploy to the `development` environment.
4. Smoke test the `development` deployment.
5. PR from `develop` to `main`.
6. Merge the promotion PR with a merge commit to trigger auto-deploy to the `production` environment.

For branch naming and commit conventions, see [Git and Collaboration](./git-and-collaboration.md).

## CI Responsibilities

Every PR into `develop` or `main` must pass the `validate` GitHub Actions workflow.

For PRs targeting `main`, `validate` also rejects any source branch other than `develop` or `hotfix/*`.

The workflow runs these root workspace commands:
- `pnpm install --frozen-lockfile`
- `pnpm lint`
- `pnpm format:check`
- `pnpm typecheck`
- `pnpm build`

Protected branch rules require the `validate` check to pass before merge. PR workflows validate code only; they do not publish images or trigger deployments.

Repository settings must allow both squash merges and merge commits.

Protected branch rules for `develop` and `main` must not require linear history, because protected-branch synchronization relies on merge commits.

## Deployment Automation

Post-merge automation runs on pushes to `develop` and `main`:
1. `deploy-development` runs on `develop` and `deploy-production` runs on `main`.
2. Each workflow rebuilds the deployable `web` and `api` container images.
3. Images are published to GHCR using deterministic names:
   - `ghcr.io/<owner>/<repo>-web:<sha>`
   - `ghcr.io/<owner>/<repo>-web:development|production`
   - `ghcr.io/<owner>/<repo>-api:<sha>`
   - `ghcr.io/<owner>/<repo>-api:development|production`
4. The workflow triggers the matching Dokploy webhook after the image publish succeeds.

Dokploy application services are configured to deploy from these prebuilt Docker images rather than building the source code natively.

### Deployment Inputs

GitHub Actions uses environment-specific repository configuration:

- Development variables:
  - `WEB_DEVELOPMENT_API_BASE_URL`
  - `WEB_DEVELOPMENT_GOOGLE_CLIENT_ID`
- Production variables:
  - `WEB_PRODUCTION_API_BASE_URL`
  - `WEB_PRODUCTION_GOOGLE_CLIENT_ID`
- Development secrets:
  - `DOKPLOY_DEVELOPMENT_WEBHOOK_URL`
- Production secrets:
  - `DOKPLOY_PRODUCTION_WEBHOOK_URL`

Repository Actions workflow permissions must allow write access so the deploy workflows can publish GHCR packages with `GITHUB_TOKEN`.

## Database Migrations

Database migrations run automatically on every deploy to both development and production.
- `prisma migrate deploy` executes before the API begins serving traffic.
- The API container entrypoint is `apps/api/scripts/start-production.sh`, which runs the migration command before `node dist/index.js`.
- Prisma configuration lives in `apps/api/prisma.config.ts` with tracked migrations committed under `apps/api/prisma/migrations/`.
- No deploy relies on manual schema changes.

## Hotfix Flow

For urgent production fixes:
1. Branch `hotfix/*` from `main`.
2. PR and merge the `hotfix/*` branch into `main` (auto deploys to production).
3. Open a `main` -> `develop` back-merge PR.
4. Merge the back-merge PR with a merge commit to keep the protected branches aligned.
