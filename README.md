# Gastar App

Gastar App is a mobile-first personal finance tracker for a small private group of users. The MVP focuses on fast manual transaction entry, private per-user data, Google sign-in, and an installable PWA with offline read-only access.

## Status

This repository now includes the documented monorepo bootstrap for `apps/web`, `apps/api`, `packages/shared`, `infra`, and `bruno` alongside the durable docs and OpenSpec artifacts. The current codebase is intentionally thin, but it already supports root-level install, lint, format-check, typecheck, build, Docker packaging, and deployment workflow automation.

## MVP Highlights

- Google-only authentication with app-managed sessions
- Private per-user accounts, categories, transactions, and recurring rules
- Support for ARS and USD, including manual exchange rates for transfers
- Credit card purchases with installment support
- Mobile-first Spanish UI
- Installable PWA with offline read-only behavior for previously fetched data

## Stack

- Monorepo with `pnpm` workspaces
- `apps/web`: React, Vite, TypeScript, Tailwind CSS, `shadcn/ui`
- `apps/api`: Node.js, Express, TypeScript, Prisma, PostgreSQL
- `packages/shared`: shared Zod schemas, types, and constants
- `infra`: Docker and deployment configuration
- `bruno`: API collections for manual testing

## Repository Structure

```text
/ 
├── apps/
│   ├── api/
│   └── web/
├── packages/
│   └── shared/
├── infra/
├── docs/
├── openspec/
└── bruno/
```

## Documentation Map

- Product scope: [docs/product/mvp-scope.md](./docs/product/mvp-scope.md)
- User behavior and flows: [docs/product/user-flows.md](./docs/product/user-flows.md)
- Design system: [docs/product/design-system.md](./docs/product/design-system.md)
- Repository structure: [docs/platform/repository-structure.md](./docs/platform/repository-structure.md)
- Data model: [docs/platform/data-model.md](./docs/platform/data-model.md)
- Auth and session: [docs/platform/auth-and-session.md](./docs/platform/auth-and-session.md)
- API contracts: [docs/platform/api-contracts.md](./docs/platform/api-contracts.md)
- PWA strategy: [docs/platform/pwa-strategy.md](./docs/platform/pwa-strategy.md)
- Environments and config: [docs/operations/environments-and-config.md](./docs/operations/environments-and-config.md)
- Git and collaboration: [docs/operations/git-and-collaboration.md](./docs/operations/git-and-collaboration.md)
- CI/CD and deployment: [docs/operations/ci-cd-and-deployment.md](./docs/operations/ci-cd-and-deployment.md)

## Workspace Commands

- `pnpm install`
- `pnpm dev:api`
- `pnpm dev:web`
- `pnpm lint`
- `pnpm format:check`
- `pnpm typecheck`
- `pnpm build`
- `pnpm db:up`
- `pnpm db:down`

Local app startup expects root-level `.env.api.local` and `.env.web.local` files copied from the corresponding `.example` templates.

## Product Direction

Gastar App is intentionally narrow in scope. It is designed to help users record income, expenses, and transfers quickly from mobile, while keeping ownership boundaries, currency handling, and offline behavior explicit from the start.

Out of scope for the MVP are budgeting, bank sync, CSV import/export, shared spaces, multi-language UI, and offline write/sync.

## License

MIT. See [LICENSE](./LICENSE).
