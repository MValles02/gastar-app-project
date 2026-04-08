# Repository Structure

This document defines the Gastar App repository layout, project boundaries, and dependency rules.

## Core Philosophy

- **Monorepo**: We use a single Git repository containing all frontend, backend, and documentation code.
- **Package Manager**: `pnpm` workspaces.
- **Language**: TypeScript across the entire stack.
- **Simplicity First**: Do not extract code into a shared package unless it is genuinely used by more than one application.

## Directory Layout

```text
/
├── apps/
│   ├── api/        # Node.js + Express backend
│   └── web/        # React + Vite frontend
├── packages/
│   └── shared/     # Shared Zod schemas and constants
├── infra/          # Docker and deployment configs
├── docs/           # Durable project documentation
├── openspec/       # Active changes, proposals, and tasks
└── bruno/          # API collections for manual testing
```

## `apps/api/`

The backend application.

- **Stack**: Node.js, Express, TypeScript, Prisma, PostgreSQL.
- **Role**: Source of truth for business logic, database access, session management, and Google OAuth verification.
- **Dependencies**: May depend on `packages/shared`. Must not depend on `apps/web`.
- **Bootstrap Contract**: Includes Prisma configuration, tracked migrations, and the production entrypoint that runs `prisma migrate deploy` before the API starts serving traffic.

## `apps/web/`

The frontend application.

- **Stack**: React, Vite, TypeScript, Tailwind CSS, `shadcn/ui`.
- **Role**: User interface, PWA behavior, state management, and API consumption.
- **Dependencies**: May depend on `packages/shared`. Must not depend on `apps/api`.
- **Note on UI Components**: Keep all UI components, including `shadcn/ui` elements, directly inside `apps/web`. Do not create a separate `packages/ui` library for the MVP.
- **Bootstrap Contract**: Includes Tailwind configuration, a `components.json` baseline compatible with `shadcn/ui`, and a production Docker image served through Nginx.

## `packages/shared/`

Shared TypeScript code.

- **Role**: Contains types, Zod schemas, and constants required by *both* `web` and `api`.
- **Contents**: API request/response contracts, domain enums (e.g., currency codes, transaction types), and shared validation logic.
- **Strict Rule**: If code is only used by the frontend, keep it in the frontend. If code is only used by the backend, keep it in the backend. Move it to `shared` only when duplication occurs across the app boundary.

## `infra/`

Infrastructure definition.

- **Role**: Contains `docker-compose.yml` for local PostgreSQL and bootstrap container setup plus any future deployment definition scripts required outside of Dokploy.

## `bruno/`

API testing collections.

- **Role**: Holds the Bruno API collection configurations so that developers can easily make manual API calls during development without needing external tools like Postman.

## `docs/` and `openspec/`

Documentation boundaries.

- **`docs/`**: Durable, long-term documentation describing how the system works (this folder).
- **`openspec/`**: Ephemeral and active work artifacts describing *what* is currently being built or changed.

## Monorepo Tooling Rules

- **Linting & Formatting**: ESLint and Prettier are configured at the root to enforce consistent style across all apps and packages.
- **Dependencies**: Keep shared devDependencies (like TypeScript, ESLint plugins, Prettier) at the workspace root to avoid version mismatches.
- **Build Order**: If `apps/api` or `apps/web` depend on `packages/shared`, ensure `shared` builds first if it requires a build step. (Often, simple TypeScript packages can be imported directly via workspace aliases without a separate build step if configured correctly).
- **Root Validation Contract**: The workspace root owns `pnpm lint`, `pnpm format:check`, `pnpm typecheck`, and `pnpm build`, and CI uses those commands as the required merge gate.
