---
name: gastar-implementation-guardrails
description: Apply Gastar App product, domain, and repository constraints during implementation work.
license: MIT
metadata:
  author: gastar-app
  version: "0.1"
  derivedFrom:
    - docs/product/mvp-scope.md
    - docs/product/design-system.md
    - docs/finance/core-concepts.md
    - docs/finance/money-and-currency.md
    - docs/finance/credit-cards-and-installments.md
    - docs/platform/repository-structure.md
    - docs/platform/api-contracts.md
---

Use this skill during implementation to keep code changes aligned with Gastar App project rules.

## Purpose

Prevent implementation drift so code work stays narrow, in scope, and consistent with the documented product and platform model.

## Product Guardrails

- Favor the MVP's narrow scope over speculative expansion.
- Optimize for fast manual entry.
- Preserve the mobile-first, Spanish-only UI requirement.
- Keep offline support read-only only.
- Do not add budgeting, bank sync, import/export, multi-language UI, investment tracking, or offline write/sync unless the scope changes explicitly.

## Finance Guardrails

- Preserve strict per-user data isolation.
- Use the date-only financial model with `America/Argentina/Buenos_Aires` semantics.
- Preserve explicit `ARS` and `USD` separation.
- Do not invent automatic exchange rates.
- Keep cross-currency behavior explicit and user-entered.
- Treat credit cards as the currency exception: one card concept may expose optional ARS and USD balance buckets.
- Do not convert credit card modeling into statement-centric accounting.

## Platform Guardrails

- Keep `apps/api` as the source of truth for backend logic.
- Keep `apps/web` responsible for UI and client behavior.
- Move code to `packages/shared` only when it is truly shared across `web` and `api`.
- Keep API contracts predictable under `/api/v1` with standard success and error envelopes.

## Implementation Behavior

- Prefer the smallest coherent slice of code that satisfies the current task.
- Do not add abstractions before they are needed.
- Keep implementation aligned with the active OpenSpec tasks.
- If code reveals a conflict with durable docs, stop and surface it.
- If implementation changes a long-term project rule, update the relevant durable doc.

## Output Expectation

This skill mainly constrains implementation behavior. When useful, summarize the applied constraints briefly before coding or when explaining decisions.

## Guardrails

- Do not silently expand MVP scope.
- Do not collapse currency-specific behavior into synthetic totals.
- Do not add shared packages or worker infrastructure without an explicit need.
- Do not bypass documented API and repository boundaries.
