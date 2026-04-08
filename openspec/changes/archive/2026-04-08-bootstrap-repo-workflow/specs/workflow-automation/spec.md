## ADDED Requirements

### Requirement: The repository SHALL enforce the documented protected-branch model
The repository SHALL use `main` as the default branch and SHALL maintain a protected `develop` integration branch. Regular work SHALL flow through pull requests into `develop`, and promotion to production SHALL flow through pull requests from `develop` into `main`.

#### Scenario: Protected branches match the documented flow
- **WHEN** a contributor views the repository branch configuration
- **THEN** `main` is the default branch and both `main` and `develop` are configured as protected branches

### Requirement: Protected branches SHALL require squash-only pull request merges
The repository SHALL require pull requests for protected branch updates and SHALL allow squash merges only for integrating changes into protected branches. Direct pushes to protected branches SHALL be blocked, and merged branches SHALL be eligible for automatic deletion.

#### Scenario: Protected branch merge options preserve linear history
- **WHEN** a contributor opens a pull request targeting `develop` or `main`
- **THEN** the repository enforces pull-request-based integration and exposes squash merge as the only available merge strategy

### Requirement: Pull requests into protected branches SHALL pass validation checks
Pull requests targeting `develop` or `main` SHALL run repository-managed validation workflows that install dependencies, lint, check formatting, typecheck, and build the workspace. Protected branch rules SHALL require the corresponding checks to pass before merge.

#### Scenario: Validation gates protected-branch merges
- **WHEN** a pull request targets `develop` or `main`
- **THEN** the repository runs the defined validation workflow and blocks merge until the required checks succeed

### Requirement: Merges into environment branches SHALL publish deployable images and trigger deployment
Pushes to `develop` and `main` caused by merged pull requests SHALL build container images for `web` and `api`, publish them to the configured container registry with immutable commit SHA tags and stable environment tags, and trigger deployment for the matching environment.

#### Scenario: Development promotion publishes and deploys development images
- **WHEN** a change is merged into `develop`
- **THEN** the repository publishes `web` and `api` images tagged for the merged commit and the `development` environment and triggers the development deployment workflow

#### Scenario: Production promotion publishes and deploys production images
- **WHEN** a change is merged into `main`
- **THEN** the repository publishes `web` and `api` images tagged for the merged commit and the `production` environment and triggers the production deployment workflow

### Requirement: Deployment automation SHALL execute Prisma migrations before API startup
The deployment process for the API SHALL execute `prisma migrate deploy` before the API begins serving traffic in both development and production environments. The bootstrap repository state SHALL include the minimum Prisma configuration and tracked migration assets needed to support this workflow.

#### Scenario: API deploy path applies tracked migrations before serving traffic
- **WHEN** a deployment workflow prepares the API release for `develop` or `main`
- **THEN** the workflow or container startup path runs `prisma migrate deploy` before the API starts accepting requests

### Requirement: Deployment automation SHALL preserve environment isolation
Automation inputs for development and production SHALL remain isolated, including registry tags, deployment targets, and secret configuration. The repository SHALL not commit environment secrets and SHALL document the required external configuration for each environment.

#### Scenario: Environment-specific automation configuration stays separate
- **WHEN** a maintainer configures GitHub Actions and deployment secrets
- **THEN** development and production use distinct inputs and no shared secret values are stored in the repository
