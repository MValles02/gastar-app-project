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

Promotion steps:
1. PR from `feature/*` to `develop`.
2. Merge triggers auto-deploy to the `development` environment.
3. Smoke test the `development` deployment.
4. PR from `develop` to `main`.
5. Merge triggers auto-deploy to the `production` environment.

For branch naming and commit conventions, see [Git and Collaboration](./git-and-collaboration.md).

## CI Responsibilities

Every PR into `develop` or `main` must pass CI checks:
- Install dependencies
- Linting and formatting
- Typechecking
- Build the affected applications (web/api)

CI should fail fast on validation errors and block merging. PR workflows validate code only; they do not publish images or trigger deployments.

## Deployment Automation

Post-merge automation runs on pushes to `develop` and `main`:
1. Rebuild the deployable container images (`web` and `api`).
2. Publish images to the container registry (e.g., `ghcr.io`).
   - Image tags include immutable commit SHAs and stable environment tags (`development` or `production`).
3. Trigger Dokploy deployment (via API or webhook) for the matching environment.

Dokploy application services are configured to deploy from these prebuilt Docker images rather than building the source code natively.

## Database Migrations

Database migrations run automatically on every deploy to both development and production.
- `prisma migrate deploy` executes before the API begins serving traffic.
- No deploy relies on manual schema changes.

## Hotfix Flow

For urgent production fixes:
1. Branch `hotfix/*` from `main`.
2. PR and merge into `main` (auto deploys to production).
3. Back-merge the fix from `main` into `develop` to keep branches aligned.
