---
description: Apply the Gastar App Git workflow for branches, commits, pull requests, and release promotion
---

Apply the Gastar App Git workflow for this repository.

Use the project rules defined in:

- `docs/operations/git-and-collaboration.md`
- `docs/operations/ci-cd-and-deployment.md`
- `docs/operations/environments-and-config.md`

Behavior to follow:

- treat `develop` and `main` as protected branches
- choose the correct branch family: `feature/*`, `fix/*`, `docs/*`, `chore/*`, `hotfix/*`
- base regular work on `develop`
- base hotfixes on `main`
- use Conventional Commits when asked to commit
- keep PRs scoped to one coherent change
- prefer squash merge
- follow the promotion flow `feature/fix/docs/chore -> develop -> main`
- follow the hotfix flow `hotfix/* -> main -> back-merge into develop`

If the user's request conflicts with the documented workflow, explain the mismatch and ask for confirmation before proceeding.
