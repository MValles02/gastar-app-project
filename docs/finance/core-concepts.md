# Core Finance Concepts

## Purpose

This document centralizes cross-cutting rules that apply to the entire finance domain (accounts, transactions, categories, credit cards, recurring rules). By defining these here, other documents avoid repeating the same foundational policies.

## 1. Per-User Data Isolation (Ownership)

The Gastar App MVP is intended for a small private group, but the fundamental data model enforces **strict per-user isolation**.

- Every finance entity (Account, Category, Transaction, Recurring Rule) belongs to exactly one authenticated user.
- A user can only view, create, edit, or delete their own entities.
- Entities are never shared between users (no shared households, shared ledgers, or multi-user ownership).
- A user cannot reference another user's accounts or categories.

## 2. Financial Date Model

Financial meaning in the MVP relies on a **date-only** financial date, rather than a time-of-day timestamp.

- The authoritative timezone for interpreting financial dates is the app-wide `America/Argentina/Buenos_Aires` timezone.
- Internal date-only contracts should use the `YYYY-MM-DD` format.
- User-facing date display should use `DD/MM/YYYY`.
- Users should not see technical creation timestamps (`createdAt`) in normal UI flows.
- Manual income and expense transactions cannot be future-dated in the MVP.
- When multiple transactions share the same financial date, history ordering uses the financial date first and `createdAt` as the tie-breaker.
- Recurring-generated transactions use their scheduled calendar date as their financial date.

## 3. Entity Deletion and Inactivation Policy

The MVP favors data clarity over aggressive destructive behavior. Deletion of metadata entities (Accounts, Categories) must not corrupt the transaction ledger.

**Hard Deletion Rules:**
- A transaction can be hard-deleted by the user, removing it completely. The MVP does not use soft-delete or provide a restore flow for transactions.
- An account or category **cannot** be hard-deleted if any historical transaction references it.
- An account or category **cannot** be hard-deleted if it is referenced by an active recurring rule.
- An unused account or category (no historical or active recurring references) may be hard-deleted.

**Inactivation Rules:**
- Accounts and categories support an `isActive` lifecycle state.
- Inactive entities are hidden from selectors when entering new transactions or creating new recurring rules.
- Inactive entities remain visible in management screens (in a separate inactive section) and can be reactivated.
- An entity **cannot** be marked inactive if it is referenced by an active recurring rule (the rule must be paused or deleted first).
- Existing historical transactions that reference an inactive entity remain completely valid and intact for reporting and viewing.

## 4. Currency Principles

The MVP supports exactly two currencies: `ARS` and `USD`.
The app must preserve the money values the user actually entered and must not hide currency differences by automatically collapsing everything into one synthetic reporting total. Detailed rules are in [Money and Currency](./money-and-currency.md).
