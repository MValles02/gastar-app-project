# User Flows

## Purpose

This document describes the primary user flows for the Gastar App MVP. Its goal is to define the expected product behavior from the user's perspective. For the specific business rules driving these flows, see the respective documentation linked below.

## Product Flow Principles

- Minimize friction for frequent transaction entry.
- Optimize most common flows for mobile use.
- Users should understand what to do without training.
- Favor clarity and speed over advanced configuration.

## Primary Flows

1. **Sign in with Google:** User selects Google sign-in and lands in the authenticated app experience. (See [Auth and Session](../platform/auth-and-session.md))
2. **Create and manage accounts:** User defines accounts (Cash, Bank, Wallet, Credit card) with associated currencies. (See [Accounts](../finance/accounts.md))
3. **Quick Add Expense:** From home, user selects expense, enters amount, account, category, and optionally notes. (See [Transactions](../finance/transactions.md))
4. **Quick Add Income:** Similar to expense flow, requiring a destination account and category.
5. **Transfer Between Accounts:** User moves money between own accounts. If crossing currencies, user enters both amounts and a manual exchange rate. (See [Money and Currency](../finance/money-and-currency.md))
6. **Credit Card Purchase with Installments:** User starts an expense using a credit card, indicates installments, and defines the count. The full amount impacts the card immediately. (See [Credit Cards and Installments](../finance/credit-cards-and-installments.md))
7. **Configure and Manage Recurring Transactions:** User creates a rule defining type, amount, account, category, and recurrence pattern. (See [Recurring Transactions](../finance/recurring-transactions.md))
8. **Load Default Categories:** If a user skipped defaults and has no categories, the categories page offers a button to load them. (See [Categories](../finance/categories.md))
9. **Review Current Information:** User reviews recent activity and balances by account and currency without a dashboard-heavy interface.
10. **Offline Read-Only Access:** User opens installed PWA offline to review previously loaded data. Write actions are visibly disabled. (See [PWA Strategy](../platform/pwa-strategy.md))

## Design Implications

These flows prioritize the quickest path to create a transaction. The home screen is an action entry point. Common transaction actions share consistent patterns.

## Out of Scope Flows

- Sharing data, importing/exporting, offline sync, full statement-cycle management. (See [MVP Scope](./mvp-scope.md))
