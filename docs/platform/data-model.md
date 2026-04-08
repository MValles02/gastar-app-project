# Data Model

## Purpose

This document defines the MVP data model at the architectural level before Prisma schema implementation begins. It locks the core entities, ownership boundaries, and high-level relationships so the initial schema covers the entire MVP domain.

This document does not define exact Prisma syntax, column names, indexes, or migration commands.

## Core Principle

The schema should prioritize correctness, ownership clarity, and support for the MVP rules over premature optimization. The model represents the full product scope early, even if behavior is implemented gradually.

## Core Entities

The initial MVP schema should cover at least these entities:
- `User`
- `RefreshSession`
- `Account`
- `Category`
- `Transaction`
- `RecurringRule`

## Ownership and Isolation Rules

Every core business entity belongs to exactly one user. The model must support strict per-user isolation for accounts, categories, transactions, recurring rules, and refresh sessions.

**See [Core Finance Concepts](../finance/core-concepts.md) for strict multi-tenant isolation rules.**

## Entity Overviews

### User & RefreshSession
- **User:** Represents one authenticated person. Stores internal identity, Google linkage, and basic profile data.
- **RefreshSession:** Tracks the application-managed session for refresh behavior (owning user, refresh token lifecycle, revocation, expiration).
- **See [Auth and Session](./auth-and-session.md) for the auth model details.**

### Finance Entities
- **Account:** User-owned finance container. Must support account types (cash, bank, wallet, credit card), active/inactive states, and currency.
- **Category:** User-owned classification label. Active/inactive states.
- **Transaction:** The central finance record. Supports income, expense, and transfer types. Must enforce single-user ownership, required categories for income/expense, and explicit currencies.
- **RecurringRule:** Template for repeated activity. Generates real transactions over time but is not transaction history itself.

## Business Rule Mapping

The Prisma schema must enforce the business constraints defined in the domain documentation:
- **Integrity & Deletion Rules:** See [Core Finance Concepts](../finance/core-concepts.md) for strict rules on hard-deletion blocks and inactivation rules.
- **Money & Currency Rules:** The model must preserve user-entered financial values. For cross-currency transfers, it must store both source/destination amounts and the manual exchange rate. See [Money and Currency](../finance/money-and-currency.md).
- **Credit Cards & Installments:** Installment purchases are stored as exactly **one** primary transaction row. See [Credit Cards and Installments](../finance/credit-cards-and-installments.md) for architecture rules.
- **Transaction Modeling:** The schema must support single-account linkage for income/expense and dual-account linkage for transfers. See [Transactions](../finance/transactions.md).
- **Recurring Rules:** Editing or deleting a rule must not break existing generated transaction history. See [Recurring Transactions](../finance/recurring-transactions.md).
