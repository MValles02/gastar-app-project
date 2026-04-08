---
name: gastar-definition-of-done
description: Check whether a Gastar App change is actually ready to hand off, merge, or archive.
license: MIT
metadata:
  author: gastar-app
  version: "0.1"
  derivedFrom:
    - docs/operations/git-and-collaboration.md
    - docs/operations/ci-cd-and-deployment.md
    - docs/platform/repository-structure.md
    - docs/product/mvp-scope.md
---

Use this skill near the end of a task or change to decide whether the work is truly complete.

## Purpose

Avoid the common failure mode where code exists, but the change is not actually ready for review, promotion, or archive.

## Completion Checklist

Verify the items that are relevant to the work:

1. The requested behavior is implemented.
2. The active OpenSpec tasks are updated to reflect the completed work.
3. Durable docs are updated if long-term project rules or architecture changed.
4. Relevant validation was run:
   - lint
   - typecheck
   - tests
   - build
5. The branch purpose still matches the actual change.
6. The work remains scoped to one coherent concern.
7. The next workflow step is clear:
   - continue implementation
   - open PR
   - archive the change

## Review Questions

Ask and answer:

- Is the implemented behavior consistent with the documented MVP and domain rules?
- Are there unfinished tasks or follow-ups that should stay out of this change?
- Are there missing docs or validation steps blocking handoff?
- Is this ready for PR under the documented Git workflow?
- If the change is complete, is it also ready for `openspec-archive-change`?

## Output Format

```text
## Definition Of Done

Status: ready for PR | ready to archive | not done yet

Checks:
- behavior: pass
- tasks: pass
- docs: pass
- validation: pass

Open items:
- <if any>

Next step:
- create PR into develop
```

## Guardrails

- Do not mark work done if key validation or docs updates are missing.
- Do not require irrelevant checks just to satisfy the template.
- Keep follow-up work out of the current change unless it is necessary for correctness.
