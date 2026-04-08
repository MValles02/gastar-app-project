## Context

The current repository is documentation-first. The durable docs already define a `develop` to `main` promotion path, protected branches, squash-merge collaboration, PR validation, image publishing, Dokploy deployments, and a TypeScript monorepo structure, but the repository still consists mostly of documentation on a single unprotected `master` branch.

This change is cross-cutting because it touches repository topology, workspace tooling, application scaffolding, GitHub repository settings, CI/CD automation, and deployment integration. The design needs to make the documented workflow executable without overbuilding product logic before feature work starts.

## Goals / Non-Goals

**Goals:**
- Align the remote branch model with the documented `main` and `develop` workflow.
- Enforce squash-only PR-based collaboration on protected branches.
- Bootstrap a minimal but real monorepo with buildable `web`, `api`, and `shared` packages plus `infra` and `bruno` directories.
- Provide root validation commands that GitHub Actions can use as required checks.
- Separate PR validation from post-merge publish/deploy automation.
- Prepare GHCR image publishing and Dokploy deployment hooks for development and production.
- Add repository-level templates, examples, and durable doc updates needed to remove workflow ambiguity.

**Non-Goals:**
- Implement user-facing finance or authentication features.
- Finalize the long-term production infrastructure outside the repository-managed workflow baseline.
- Introduce extra packages or abstractions beyond the documented MVP monorepo shape.
- Expand the MVP scope or redefine existing product and finance rules.

## Decisions

### 1. Adopt the documented protected-branch model now

The repository will migrate from `master` to `main`, create `develop` from `main`, and update GitHub so `main` is the default branch. Both `main` and `develop` will be protected using repository rulesets, with direct pushes blocked and pull requests required.

Why this over alternatives:
- Keeping `master` would conflict with the durable docs and create workflow drift before implementation even starts.
- Using only `main` would remove the documented development smoke-test stage.
- Rulesets are preferred over ad hoc branch-only settings because they centralize enforcement and make future changes easier to audit.

### 2. Enforce linear protected-branch history with squash merges only

GitHub will allow squash merges and disable merge commits and rebase merges for the repository. Protected branches will require PR merges, and merged branches will be deleted automatically.

Why this over alternatives:
- The user explicitly wants squash-only merges.
- Allowing multiple merge strategies weakens the documented linear-history goal and makes protected-branch history less predictable.

### 3. Bootstrap the documented stacks now, but keep them intentionally thin

The repository will add the documented workspace directories and root tooling so `pnpm install`, `pnpm lint`, `pnpm format:check`, `pnpm typecheck`, and `pnpm build` succeed against actual packages. The bootstrap will use the documented stack choices rather than generic placeholders:

- `apps/web`: React, Vite, TypeScript, Tailwind CSS, and the baseline configuration needed to add `shadcn/ui` components without restructuring later.
- `apps/api`: Node.js, Express, TypeScript, Prisma, and PostgreSQL connectivity.
- `packages/shared`: the minimum shared TypeScript and Zod-based surface actually needed by both applications.

Each package will remain intentionally thin and avoid product behavior, but the stack contract itself will be real from the start.

Why this over alternatives:
- Docs-only or empty-directory scaffolding would not support real CI checks, Docker builds, or deployment validation.
- A minimal working baseline preserves momentum without forcing premature product architecture.

### 4. Use root-owned validation commands as the CI contract

GitHub Actions will call root scripts rather than duplicating package-specific commands inside workflows. Root scripts will orchestrate the workspace so required checks remain stable even as packages evolve.

Why this over alternatives:
- Hard-coding package commands in workflows creates drift and repeated maintenance.
- A single workspace contract makes branch protection checks easier to manage.

### 5. Split automation into PR validation and post-merge release workflows

Pull request workflows targeting `develop` and `main` will install dependencies and run lint, format, typecheck, and build. Push workflows on `develop` and `main` will build and publish container images for `web` and `api`, tag them with both commit SHA and environment tags, and then trigger the matching Dokploy deployment.

Why this over alternatives:
- The durable docs explicitly separate validation from deployment.
- Deploying from pull requests would violate the documented promotion flow.
- Letting Dokploy build from source would conflict with the documented image-based deployment model.

### 6. Use GHCR with deterministic image naming and environment tags

The workflows will publish `web` and `api` images to `ghcr.io` using deterministic names derived from the repository and service name. Each publish will include an immutable SHA tag and one stable environment tag: `development` for `develop`, `production` for `main`.

Why this over alternatives:
- SHA tags support traceability and rollback.
- Stable environment tags let Dokploy follow a predictable deploy target.

### 7. Prefer webhook-based Dokploy triggers with secrets-backed configuration

Deployment workflows will trigger Dokploy using per-environment secrets rather than hard-coded endpoints. The repo will document the expected secret names and variables but will not commit secret values.

Why this over alternatives:
- Webhooks are simpler to bootstrap than a larger API integration and fit the current documented requirement.
- Secrets-backed configuration keeps environment isolation intact.

### 8. Make deploy-time Prisma migrations part of the bootstrap contract

The API package will include Prisma configuration, a minimal tracked migration baseline, and a dedicated deploy-time migration command. The deployment path for both development and production will execute `prisma migrate deploy` before the API begins serving traffic.

If there is no meaningful domain schema yet, the bootstrap may still use a minimal migration whose purpose is to establish the migration workflow itself, but the repository will not leave migration behavior undefined.

Why this over alternatives:
- The durable deployment docs already require automated migrations.
- Deferring the contract entirely would leave the production path structurally incomplete.

## Risks / Trade-offs

- [Branch migration disrupts existing references] -> Update the default branch first, create `main` and `develop` explicitly, and only remove `master` after protections and workflows are in place.
- [Bootstrap code becomes accidental architecture] -> Keep apps intentionally thin, avoid extra packages, and only add the minimum dependencies required for validation and deployment.
- [GitHub settings drift from docs] -> Encode as much policy as possible in rulesets, workflow files, templates, and durable doc updates.
- [Deployment workflow depends on provider secrets not present in local development] -> Keep deploy secrets external, validate workflow structure in CI, and document required secrets/variables clearly.
- [Migration workflow overcommits before the data model exists] -> Limit the bootstrap to a minimal Prisma schema and migration contract and avoid inventing product tables or domain logic.

## Migration Plan

1. Create `main` from current `master` and create `develop` from `main`.
2. Change the repository default branch to `main`.
3. Add monorepo scaffolding, tooling, and workflow files on a `chore/*` branch.
4. Configure squash-only merge settings and protected-branch rulesets for `main` and `develop`.
5. Merge the bootstrap change through the documented PR path.
6. Remove `master` after verifying no repository automation still targets it.

Rollback approach:
- Repoint the default branch if the migration fails before merge.
- Disable or adjust workflows/rulesets through GitHub settings if an automation misconfiguration blocks recovery.
- Because this change is infrastructure and tooling focused, rollback is primarily repository-setting reversal plus reverting the bootstrap PR.

## Open Questions

- None that block proposal readiness. The implementation will default to webhook-based Dokploy triggers and deterministic GHCR naming unless a repository constraint is discovered during setup.
