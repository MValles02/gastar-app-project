## 1. Branch and repository baseline

- [x] 1.1 Create `main` from the current `master`, create `develop` from `main`, and switch the repository default branch to `main`
- [x] 1.2 Configure GitHub repository merge settings for squash-only merges and automatic branch deletion after merge
- [x] 1.3 Add repository rulesets or branch protections for `main` and `develop` that require pull requests and block direct pushes

## 2. Workspace and package bootstrap

- [x] 2.1 Add the root workspace files for `pnpm`, TypeScript, ESLint, Prettier, and shared validation/build scripts
- [x] 2.2 Create a minimal `apps/web` package using the documented React, Vite, TypeScript, and Tailwind baseline with a structure compatible with `shadcn/ui`
- [x] 2.3 Create a minimal `apps/api` package using the documented Node.js, Express, TypeScript, Prisma, and PostgreSQL baseline
- [x] 2.4 Create a minimal `packages/shared` package with only the TypeScript and Zod-based surface actually shared by `web` and `api`
- [x] 2.5 Add the documented top-level support directories and starter content for `infra` and `bruno`
- [x] 2.6 Add non-secret example environment files and contributor-facing repo templates required for safe setup

## 3. Build and deployment foundation

- [x] 3.1 Add production-oriented Dockerfiles for `apps/web` and `apps/api`
- [x] 3.2 Add local infrastructure bootstrap files for the documented development stack, including database support
- [x] 3.3 Add the Prisma schema, tracked baseline migration assets, and API migration/deploy command contract needed for automated deploy-time schema application
- [x] 3.4 Wire the API startup or deployment path so `prisma migrate deploy` runs before the API begins serving traffic

## 4. GitHub Actions automation

- [x] 4.1 Add a pull request validation workflow for `develop` and `main` that installs dependencies and runs lint, format check, typecheck, and build
- [x] 4.2 Add a `develop` push workflow that builds and publishes `web` and `api` images with SHA and `development` tags and triggers development deployment
- [x] 4.3 Add a `main` push workflow that builds and publishes `web` and `api` images with SHA and `production` tags and triggers production deployment
- [x] 4.4 Wire the protected-branch required status checks to the validation workflow names used in GitHub Actions

## 5. Durable docs and verification

- [x] 5.1 Update durable operations and repository docs where executable workflow details need to match the implemented setup exactly
- [x] 5.2 Verify the workspace locally by running install, lint, format check, typecheck, and build from the repository root
- [x] 5.3 Verify the migration path and deployment contract ensure `prisma migrate deploy` runs before API startup in development and production
- [x] 5.4 Verify the repository settings, branch model, and workflow files together satisfy the documented `develop` -> `main` promotion flow
- [x] 5.5 Remove `master` after confirming the new default branch, protections, and automation all target `main` and `develop`
