---
name: gastar-git-workflow
description: Follow Gastar App Git workflow and promotion rules for branches, commits, pull requests, and hotfixes.
license: MIT
metadata:
  author: gastar-app
  version: "0.1"
  derivedFrom:
    - docs/operations/git-and-collaboration.md
    - docs/operations/ci-cd-and-deployment.md
    - docs/operations/environments-and-config.md
---

Follow the Gastar App Git workflow whenever the task involves branch selection, branch creation, commits, pull requests, merge strategy, release promotion, or hotfix handling.

## Source Of Truth

- `docs/operations/git-and-collaboration.md`
- `docs/operations/ci-cd-and-deployment.md`
- `docs/operations/environments-and-config.md`
- `docs/platform/repository-structure.md`

If a request conflicts with these docs, treat the docs as the project baseline and call out the mismatch.

## Core Rules

- `develop` and `main` are protected branches.
- Do not commit directly to `develop` or `main`.
- Use short-lived branches for work.
- Keep each branch scoped to one coherent concern.
- Prefer pull-request based collaboration over direct branch promotion.

## Branch Selection

Choose the branch family that matches the work:

- `feature/*` for new functionality
- `fix/*` for bug fixes that are not urgent production hotfixes
- `docs/*` for documentation-only changes
- `chore/*` for maintenance and tooling work
- `hotfix/*` for urgent production fixes from `main`

Branch names should use kebab-case after the prefix.

Examples:

- `feature/bootstrap-monorepo`
- `fix/refresh-token-cookie-domain`
- `docs/refactor-operations-docs`
- `chore/setup-eslint-config`
- `hotfix/fix-production-auth-callback`

## Starting Point Rules

- Regular feature, fix, docs, and chore branches should start from `develop`.
- Hotfix branches should start from `main`.
- If the user is already on a sensible branch for the requested work, continue there unless they ask to change it.
- If the correct base branch is unclear, ask one short question before creating or switching branches.

## Commit Rules

- Do not create a commit unless the user explicitly asks for one.
- Follow Conventional Commits.
- Keep the subject concise and intent-focused.
- Pick the type that matches the change:
  - `feat`
  - `fix`
  - `docs`
  - `refactor`
  - `test`
  - `chore`
- Stage only files relevant to the requested change.
- Do not mix unrelated refactors with the requested work.
- If the work changes durable project rules, update the relevant docs before the commit when appropriate.

Preferred format:

```text
type: short summary
```

Optional extended format:

```text
type: short summary

Why the change exists.
```

## Pull Request Rules

- PRs should stay scoped to one coherent unit of change.
- Use a clear title aligned with the branch purpose and commit intent.
- Include a short summary of what changed and why.
- Mention related issue, OpenSpec change, affected docs, and smoke-test notes when relevant.
- Avoid bundling unrelated work into the same PR.
- Default merge strategy is squash merge.

## Promotion Flow

Follow the documented promotion path:

1. Work on `feature/*`, `fix/*`, `docs/*`, or `chore/*`.
2. Open a PR into `develop`.
3. Let CI validate the change.
4. Merge to trigger deployment to the development environment.
5. Smoke test in development.
6. Open a PR from `develop` to `main`.
7. Merge to trigger production deployment.

## Hotfix Flow

For urgent production fixes:

1. Branch `hotfix/*` from `main`.
2. Open and merge the PR into `main`.
3. Allow production deployment to run.
4. Back-merge the fix from `main` into `develop`.

## Deployment Awareness

- PR workflows validate code but do not deploy.
- Pushes merged into `develop` deploy to the development environment.
- Pushes merged into `main` deploy to production.
- Database migrations run automatically on deploy via `prisma migrate deploy`.
- Development and production are isolated environments and must not share secrets, OAuth config, or data.

## Operational Behavior For The Assistant

When a user asks for git help in this repository:

1. Check the current branch and worktree state before proposing branch or PR actions.
2. Keep recommendations aligned with the allowed branch families and promotion flow.
3. Warn before bypassing the documented workflow.
4. Preserve unrelated user changes in the worktree.
5. Prefer the smallest reviewable unit of work.
6. Suggest durable doc updates when long-term process or architecture rules change.

## Guardrails

- Never normalize direct commits to `develop` or `main`.
- Never assume production hotfixes should start from `develop`.
- Never treat deployment as manual-only; merges drive deployment.
- Never collapse development and production environment concerns.
- Never override explicit user instructions silently; if they want to diverge from the workflow, explain the tradeoff and confirm.
