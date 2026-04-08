## Why

The repository documents a `develop` -> `main` promotion flow, protected branches, squash-only merges, CI validation, container publishing, and Dokploy deployments, but the repository is not configured to enforce or run any of those rules yet. This change prepares the repo for production-oriented implementation work by turning the documented workflow into executable repository structure, automation, and GitHub settings.

This work is in MVP scope because it establishes the operational baseline required before feature implementation begins and reduces the risk of workflow drift between the docs and the actual repository.

## What Changes

- Bootstrap the planned monorepo structure with minimal real packages for `apps/web`, `apps/api`, `packages/shared`, `infra`, and `bruno`.
- Add root workspace tooling for `pnpm`, TypeScript, ESLint, Prettier, and shared validation/build commands.
- Define the documented protected-branch model by moving from `master` to `main`, creating `develop`, and configuring squash-only PR-based collaboration.
- Add GitHub Actions for PR validation on `develop` and `main` using workspace lint, format, typecheck, and build checks.
- Add post-merge automation for image publishing and environment deployments for `develop` and `main`.
- Add repository templates and environment examples so contributors can follow the documented workflow consistently.
- Update durable operations docs where executable automation details need to be made explicit.

Non-goals:

- Implementing product features beyond the minimal runnable bootstrap applications.
- Introducing production business logic, finance behavior, or user-facing flows.
- Expanding MVP scope beyond the existing documented platform and operations baseline.

## Capabilities

### New Capabilities
- `repository-bootstrap`: Define the minimal monorepo structure, root tooling, and runnable application/package placeholders required for validation and deployment workflows.
- `workflow-automation`: Define the GitHub branch model, squash-only protected-branch collaboration, CI validation, image publishing, and deployment automation behavior.

### Modified Capabilities
- None.

## Impact

- Affected code: root workspace configuration, `apps/web`, `apps/api`, `packages/shared`, `infra`, `.github`, and repo metadata/templates.
- Affected systems: GitHub repository settings, GitHub Actions, GHCR image publishing, and Dokploy deployment integration.
- Affected docs: `docs/operations/git-and-collaboration.md`, `docs/operations/ci-cd-and-deployment.md`, `docs/operations/environments-and-config.md`, and `docs/platform/repository-structure.md` may need small updates to match the executable setup exactly.
