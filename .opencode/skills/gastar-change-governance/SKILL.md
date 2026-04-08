---
name: gastar-change-governance
description: Validate that an OpenSpec change is aligned with Gastar App durable docs before implementation starts.
license: MIT
metadata:
  author: gastar-app
  version: "0.1"
  derivedFrom:
    - docs/product/mvp-scope.md
    - docs/finance/core-concepts.md
    - docs/platform/auth-and-session.md
    - docs/platform/repository-structure.md
    - docs/operations/ci-cd-and-deployment.md
---

Use this skill after a change is proposed and before implementation begins, or whenever a change may have drifted from the documented project rules.

## Purpose

Keep planning linear by making sure active change artifacts are compatible with the durable project docs before code work begins.

## What To Check

Review the relevant durable docs and compare them to the active change artifacts.

Check for mismatches in:

- MVP scope
- user flows
- finance domain rules
- auth/session model
- data ownership and isolation
- repository boundaries
- deployment and promotion assumptions

## Required Questions

For the target change, answer:

1. Does the proposal stay within the documented MVP?
2. Does the design respect the finance and platform rules already documented?
3. Do the tasks reflect the actual work needed, without skipping unresolved design decisions?
4. Should any durable doc be updated before or during implementation?
5. Is the change ready for `openspec-apply-change`, or should planning continue first?

## Recommended Behavior

- Read the change artifacts first.
- Read only the durable docs relevant to that change.
- Surface mismatches as concrete findings, not vague concerns.
- If the change is not ready, recommend the exact artifact to update:
  - `proposal.md` for scope
  - `design.md` for architecture or behavioral decisions
  - `specs/*` for capability requirements
  - `tasks.md` for execution gaps

## Output Format

Use a concise governance review:

```text
## Change Governance

Change: <name>
Status: ready for implementation | needs artifact updates

Findings:
- <mismatch or risk>
- <missing decision>

Required updates:
- update design.md to clarify ...
- update tasks.md to include ...

Next step:
- /opsx-apply <name>
```

If there are no findings, state that clearly.

## Guardrails

- Do not invent new product rules if the docs are already clear.
- Do not start implementation from this skill.
- Do not require every durable doc to change; only the relevant ones.
- Prefer concrete mismatches over broad speculation.
