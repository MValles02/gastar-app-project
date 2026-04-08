# Accounts

## Purpose

Accounts are the user-owned containers tracking where money is held or where a financial obligation is recorded. The product avoids over-modeling financial institutions when a simpler account representation suffices.

## Account Types

The MVP supports exactly these account types:

- Cash
- Bank account
- Wallet
- Credit card

These types define the full account scope for the MVP. See [Credit Cards and Installments](./credit-cards-and-installments.md) for special credit card mechanics.

## Ownership and Identity

- Every account belongs to exactly one authenticated user. See [Core Concepts](./core-concepts.md) for strict isolation rules.
- Minimum data required for creation: Account type, Account name (identifying label), Currency.
- Account editing updates the source of truth without generating a user-facing audit trail.

## Account Currency

Every account must have a defined currency: `ARS` or `USD`.

- The account currency defines the primary monetary unit used to interpret balances and activity.
- Normal account types use one currency (e.g., an ARS cash account, a USD wallet).
- A credit card may require card-specific handling for separate ARS and USD balances under one card concept.
- For detailed cross-currency behavior, see [Money and Currency](./money-and-currency.md).

## Relationship to Transactions

Accounts are required for transaction meaning:
- **Income** increases one destination account.
- **Expense** decreases one source account (including credit cards).
- **Transfer** moves value from one source account to one destination account.

## Balance Expectations

Each account should have a balance understandable in its own currency.
- Mixed-currency account balances are not collapsed into one unified value.
- Credit card balances follow a signed-balance interpretation: card purchases decrease the balance, payments into the card increase it. Negative balances represent debt.

## Account Lifecycle (Inactivation and Deletion)

Accounts support hard deletion and an `isActive` lifecycle state to prevent breaking existing historical finance data.

**See [Core Concepts](./core-concepts.md) for exact rules on when an account can be deleted or marked inactive.**

Accounts with historical or active recurring references cannot be hard-deleted or inactivated if an active recurring rule points to them.
