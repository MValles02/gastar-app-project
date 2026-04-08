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

### API Configuration
- Server port and current application environment
- Database connection string (PostgreSQL URL)
- Frontend origin allowed for CORS
- Google OAuth client configuration for token verification
- Access token and refresh token signing secrets
- Cookie security behavior suitable for the environment

### Google OAuth Setup
- Local client for local development
- Development client for `dev-app.gastar.app`
- Production client for `app.gastar.app`

For deployment pipeline and workflow rules mapping these environments, see [CI/CD and Deployment](./ci-cd-and-deployment.md).
