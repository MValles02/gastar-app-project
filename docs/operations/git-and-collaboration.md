# Git and Collaboration

## Purpose

This document defines the Git and collaboration conventions for Gastar App.

Its purpose is to make branch naming, commit style, pull request expectations, merge behavior, and protected-branch collaboration rules explicit before implementation begins.

## Scope

This document covers:

- branch naming conventions
- commit message conventions
- pull request expectations
- merge strategy conventions
- protected branch collaboration rules

This document does not define the release promotion flow, deployment triggers, or environment mapping.

Those are defined in [docs/operations/ci-cd-and-deployment.md](./ci-cd-and-deployment.md).

## Core Principle

Changes should be easy to review, easy to trace, and safe to promote.

The Git workflow should favor small branches, clear commit intent, and predictable PR-based collaboration.

## Branch Naming

Branches should be short, descriptive, and scoped to one piece of work.

Allowed branch families:

- `feature/*` for new work
- `fix/*` for bug fixes that are not urgent production hotfixes
- `docs/*` for documentation-only changes
- `chore/*` for maintenance and tooling work
- `hotfix/*` for urgent production fixes

Branch names should use kebab-case after the prefix.

Examples:

- `feature/bootstrap-monorepo`
- `feature/add-google-session-flow`
- `fix/refresh-token-cookie-domain`
- `docs/refactor-operations-docs`
- `chore/setup-eslint-config`
- `hotfix/fix-production-auth-callback`

## Protected Branches

The long-lived protected branches are:

- `develop`
- `main`

Rules:

- do not commit directly to `develop`
- do not commit directly to `main`
- use a pull request to move code into a protected branch
- keep feature work on short-lived branches

Starting point rules:

- create `feature/*`, `fix/*`, `docs/*`, and `chore/*` branches from `develop`
- create `hotfix/*` branches from `main`

The role of each protected branch and how code moves between them is defined in [docs/operations/ci-cd-and-deployment.md](./ci-cd-and-deployment.md).

## Commit Message Convention

Commit messages should follow Conventional Commits.

Preferred format:

```text
type: short summary
```

Optional extended format:

```text
type: short summary

Longer explanation of why the change exists.
```

Recommended types:

- `feat` for new functionality
- `fix` for bug fixes
- `docs` for documentation-only changes
- `refactor` for code restructuring without behavior change
- `test` for tests
- `chore` for maintenance or tooling changes

Examples:

- `feat: add Google session bootstrap endpoint`
- `fix: correct refresh cookie host handling`
- `docs: clarify recurring transaction rules`
- `chore: add root prettier configuration`

Commit messages should describe intent clearly and remain concise.

## Pull Request Expectations

Every pull request should be easy to review and scoped to a coherent unit of change.

Pull requests should:

- focus on one concern or one coherent slice of work
- use a clear title consistent with the change
- include a short description of what changed and why
- mention any important follow-up work or limitations when relevant
- avoid mixing unrelated refactors with feature work

When applicable, a pull request should also mention:

- the related issue
- the related OpenSpec change
- any affected docs
- any required smoke-test notes

## Merge Strategy

Short-lived work branches should normally use squash merge into protected branches.

Pull requests that synchronize the long-lived protected branches must use merge commits so `develop` and `main` keep shared ancestry.

Guidelines:

- use squash merge for `feature/*`, `fix/*`, `docs/*`, `chore/*`, and `hotfix/*` pull requests into a protected branch
- use merge commits for `develop` -> `main` promotion pull requests
- use merge commits for `main` -> `develop` back-merge pull requests
- keep squash commit messages clean and intentional
- keep protected-branch sync merge commits explicit and easy to trace

The exact promotion path between `develop` and `main` is defined in [docs/operations/ci-cd-and-deployment.md](./ci-cd-and-deployment.md).

## Branch Hygiene

Branch management should stay lightweight.

Guidelines:

- create branches from the correct starting branch for the intended work
- regular work should branch from `develop`
- urgent production hotfix work should branch from `main`
- keep branches short-lived
- avoid letting feature branches drift for long periods without rebasing or merging current integration state when needed
- delete merged branches after they are no longer needed

## Collaboration Expectations

Collaboration should optimize for clarity and low-risk integration.

This means:

- prefer small, reviewable changes over large batches
- keep naming descriptive and consistent
- update durable docs when a decision becomes part of the long-term project rules
- avoid hidden manual changes in shared environments
- keep implementation aligned with the documented source of truth

## Relationship To Other Docs

- [docs/operations/ci-cd-and-deployment.md](./ci-cd-and-deployment.md) owns release promotion and deploy behavior
- [docs/operations/environments-and-config.md](./environments-and-config.md) owns environment roles and isolation
- [docs/platform/repository-structure.md](../platform/repository-structure.md) owns repository boundaries and package responsibilities

## Non-Goals For This Document

This document does not define:

- CI job configuration
- GitHub branch protection UI setup steps
- deployment pipeline details
- provider-specific repository settings

Those belong in deployment or operational documentation.
