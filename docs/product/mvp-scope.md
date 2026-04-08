# MVP Scope

## Purpose

This document defines the exact MVP scope for Gastar App. It keeps product and implementation decisions aligned to avoid scope creep and provides a stable reference for technical documentation and OpenSpec changes.

## Product Goal

The MVP focuses on helping a **small private group** of users build the habit of recording personal finances quickly and consistently.
The primary product objective is fast manual entry with a mobile-first experience.

## Target Users and Platform Scope

- Target: Approximately 10 initial users. Each user manages only their own data (no shared/collaborative spaces).
- Platform: Web application, mobile-first responsive interface, installable PWA with offline read-only support, Spanish-only UI. Code and documentation remain in English.

## Core Product Principles

- Optimized for fast transaction entry
- Private user data by default (see [Core Finance Concepts](../finance/core-concepts.md))
- Narrow, intentional MVP scope
- Manual data entry over external integrations
- Separate handling of ARS and USD (see [Money and Currency](../finance/money-and-currency.md))

## Included in MVP

### Authentication
- Google-only sign in. Open signup for any Google account.
- App-managed authenticated session.
- Private per-user data isolation.
- See [Auth and Session](../platform/auth-and-session.md).

### Accounts
- Supported types: Cash, Bank account, Wallet, Credit card.
- See [Accounts](../finance/accounts.md).

### Transactions
- Supported types: Income, Expense, Transfer.
- Behavior: Manual creation, manual editing, hard delete. No audit trail.
- See [Transactions](../finance/transactions.md).

### Currencies
- Supported: ARS, USD.
- Separate totals by currency. Manual exchange rates for cross-currency transfers.
- See [Money and Currency](../finance/money-and-currency.md).

### Categories
- Optional default categories in Spanish. Required for income/expense.
- See [Categories](../finance/categories.md).

### Credit Cards and Installments
- Purchase-centric installment model. Full purchase affects running balance immediately.
- See [Credit Cards and Installments](../finance/credit-cards-and-installments.md).

### Recurring Transactions
- Support for `daily`, `weekly`, `monthly`, `yearly` frequencies. Catch-up generation for missed dates.
- See [Recurring Transactions](../finance/recurring-transactions.md).

### Home Experience & Offline Read-Only
- Quick-add prioritized over analytics.
- Offline read-only applies to previously fetched data. Explicit logout clears cached data.
- See [PWA Strategy](../platform/pwa-strategy.md).

## Explicitly Out of MVP

- Budgeting, shared/family spaces, bank sync, CSV import/export.
- Automatic exchange rates, full audit history, deleted-item recovery.
- Offline write/sync, multi-language UI, investment tracking.
- Statement-centric credit card accounting.

## Scope Boundaries and Acceptance Criteria

The MVP is a finance tracking product, not a complete management suite. It is considered satisfied when a user can:
- Sign in with Google and manage private accounts.
- Register income, expenses, transfers (ARS/USD) with manual exchange rates.
- Use credit cards, installments, and recurring transactions.
- View a mobile-friendly Spanish UI, install as a PWA, and use offline read-only mode.
- Inactivate accounts and categories.

## Future Expansion Candidates (Deferred)

Budget planning, shared spaces, import/export, rate integrations, rich analytics, investment tracking, full statement modeling, offline write/sync.
