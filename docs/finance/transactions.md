# Transactions

## Purpose

Transactions are the central unit of financial activity in the MVP. Every meaningful balance movement recorded by the user is represented through a transaction.

## Transaction Types

The MVP supports exactly three transaction types:

- **Income**: Increases one user-owned account. Requires a destination account and a category.
- **Expense**: Decreases one user-owned account, or records a purchase against a credit card. Requires a source account and a category.
- **Transfer**: Moves value between two user-owned accounts. Requires different source and destination accounts. Does not use categories.

See [Credit Cards and Installments](./credit-cards-and-installments.md) for installment expenses.
See [Recurring Transactions](./recurring-transactions.md) for repeatable behavior.

## Core Rules and Constraints

- **Ownership:** Every transaction belongs to exactly one authenticated user. See [Core Concepts](./core-concepts.md).
- **Financial Date:** Transactions use a date-only financial date. See [Core Concepts](./core-concepts.md).
- **Deletion:** Transactions support user-initiated hard deletion without soft-delete or restore flows. See [Core Concepts](./core-concepts.md).
- **Editing:** Edited transactions reflect the latest saved state without a user-facing audit history.

## Minimum Required Inputs

**Income:** Transaction type, amount, currency, destination account, category.
**Expense:** Transaction type, amount, currency, source account, category.
**Transfer:** Transaction type, source account, destination account, source amount, source currency.

When a transfer crosses currencies, it must also include the destination amount and a manual exchange rate.

## Currency and Money Behavior

The transaction model preserves the real currency used (`ARS` or `USD`).

**Same-Currency Transactions:**
- Income and expense transactions must match the selected account currency.
- Same-currency transfers move the exact monetary amount without an exchange rate.

**Cross-Currency Behavior:**
- Cross-currency behavior is concentrated in **transfers**.
- The app stores both the source and destination amounts when currencies differ.
- The user provides a **manual exchange rate**; the app does not invent one.

For a full breakdown of currency expectations and reporting behavior, see [Money and Currency](./money-and-currency.md).
