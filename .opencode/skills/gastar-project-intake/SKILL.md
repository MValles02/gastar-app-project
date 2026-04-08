---
name: gastar-project-intake
description: Classify new Gastar App work, check scope and docs impact, and route it into the correct next workflow step.
license: MIT
metadata:
  author: gastar-app
  version: "0.1"
  derivedFrom:
    - docs/product/mvp-scope.md
    - docs/product/user-flows.md
    - docs/operations/git-and-collaboration.md
    - docs/platform/repository-structure.md
---

Use this skill at the start of new work to turn a raw request into a clear next step.

## Purpose

Keep the project moving linearly by answering the questions that usually cause churn later:

- What kind of work is this?
- Is it in MVP scope?
- Which project domains does it touch?
- Does durable documentation need to change?
- Should the next step be exploration, proposal, docs-only work, or implementation of an existing change?

## Source Of Truth

- `docs/product/mvp-scope.md`
- `docs/product/user-flows.md`
- `docs/finance/core-concepts.md`
- `docs/platform/repository-structure.md`
- `docs/operations/git-and-collaboration.md`

## Intake Checklist

For each new request, determine:

1. **Work type**
   - `feature`
   - `fix`
   - `docs`
   - `chore`
   - `exploration`

2. **MVP fit**
   - clearly in MVP
   - ambiguous and needs clarification
   - out of MVP and should be treated as deferred or explicitly approved expansion

3. **Affected domains**
   - `product`
   - `finance`
   - `platform`
   - `operations`

4. **Documentation impact**
   - no durable doc change needed
   - durable docs should be updated
   - active OpenSpec artifacts should be created or updated

5. **Likely branch family**
   - `feature/*`
   - `fix/*`
   - `docs/*`
   - `chore/*`

## Routing Rules

- If the user is still shaping the problem or comparing approaches, route to `openspec-explore`.
- If the user wants to build or change behavior and no active change exists yet, route to `openspec-propose`.
- If the request is docs-only and does not need an OpenSpec change, proceed as docs work.
- If there is already an active change that clearly matches the request, route to `openspec-apply-change`.
- If the request conflicts with MVP scope or documented rules, call out the conflict before proceeding.

## Output Format

Provide a short intake summary with:

- work type
- MVP assessment
- affected domains
- docs impact
- recommended branch family
- recommended next step

Example shape:

```text
## Intake Summary

Work type: feature
MVP fit: in scope
Domains: finance, platform
Docs impact: update OpenSpec now, durable docs likely later
Branch family: feature/*
Next step: /opsx-propose add-recurring-transactions
```

## Guardrails

- Do not jump straight into implementation if the request is still ambiguous.
- Do not normalize out-of-scope work as MVP by default.
- Do not skip the docs impact assessment.
- Keep the summary short and decision-oriented.
