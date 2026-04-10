# Environments and Configuration

## Purpose

This document defines the environment model and configuration strategy for Gastar App across local development, Dokploy development deployment, and production deployment.

## Environment Model

Gastar App uses three execution contexts:

1. **Local**: For day-to-day development and validation on the developer machine.
2. **Development**: The deployed integration environment tied to the `develop` branch. Used for smoke testing before release. Not public.
3. **Production**: The real user environment tied to the `main` branch.

## Environment Isolation Rules

Each environment must be independently runnable and must have its own:

- Database instance and volume
- Environment variables and application secrets
- Google OAuth client configuration
- Allowed origins and redirect URIs

**Development and production must never share:**

- Postgres instances
- JWT / refresh token secrets
- User data
- OAuth credentials

## Dokploy Structure & Domains

**Dokploy Project Name:** `Gastar App`
**Services per environment:** `web`, `api`, `postgres`

**Recommended Domain Layout:**
- Production web: `app.gastar.app` (Apex `gastar.app` redirects here)
- Production API: `api.gastar.app`
- Development web: `dev-app.gastar.app`
- Development API: `dev-api.gastar.app`

## Configuration Requirements

Configuration must support the correct allowed origins and redirect behavior for each environment. Secret values must not be committed to the repository.

### Web Configuration
- Public API base URL
- Current application environment
- Google OAuth client identifier appropriate for that environment
- Repository examples: `.env.web.local.example`, `.env.web.development.example`, `.env.web.production.example`
- Local runtime file: copy `.env.web.local.example` to `.env.web.local`; the `apps/web` dev server loads it from the repository root

### API Configuration
- Server port and current application environment
- Database connection string (PostgreSQL URL)
- Frontend origin allowed for CORS
- Google OAuth client configuration for token verification
- Access token and refresh token signing secrets
- Cookie security behavior suitable for the environment
- Repository examples: `.env.api.local.example`, `.env.api.development.example`, `.env.api.production.example`
- Local runtime file: copy `.env.api.local.example` to `.env.api.local`; the API loads it from the repository root before parsing env vars

### Google OAuth Setup
- Local client for local development
- Development client for `dev-app.gastar.app`
- Production client for `app.gastar.app`

## Automation Inputs

The repository keeps runtime secrets outside version control and documents them through example files, GitHub variables, and GitHub secrets.

Current GitHub Actions inputs:

- Development web build variables: `WEB_DEVELOPMENT_API_BASE_URL`, `WEB_DEVELOPMENT_GOOGLE_CLIENT_ID`
- Production web build variables: `WEB_PRODUCTION_API_BASE_URL`, `WEB_PRODUCTION_GOOGLE_CLIENT_ID`
- Development deployment secrets: `DOKPLOY_DEVELOPMENT_WEB_WEBHOOK_URL`, `DOKPLOY_DEVELOPMENT_API_WEBHOOK_URL`
- Production deployment secrets: `DOKPLOY_PRODUCTION_WEB_WEBHOOK_URL`, `DOKPLOY_PRODUCTION_API_WEBHOOK_URL`

For deployment pipeline and workflow rules mapping these environments, see [CI/CD and Deployment](./ci-cd-and-deployment.md).
