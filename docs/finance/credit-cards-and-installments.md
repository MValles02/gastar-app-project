# Credit Cards and Installments

## Purpose

This document defines how credit card purchases and installments behave in the MVP. The MVP uses a **purchase-centric** credit card model, not a full bank statement accounting model.

## Credit Card Accounts

A credit card is a supported account type (see [Accounts](./accounts.md)). A credit card exists so the user can:
- Select it as the payment source for an expense.
- Understand purchases associated with a specific card.
- Register purchases split into installments.

## Purchases and Balances

A purchase made with a credit card is recorded as an **Expense** transaction.

- **Balances follow a signed-balance model**: Card purchases decrease the balance, and transfer payments into the card increase it. Negative balances represent debt. A balance of `0` means the card is fully paid.
- **Installment distribution affects reporting over time, not the immediate card balance**: The original full purchase amount affects the card balance immediately.
- The MVP does not restrict or enforce a special validation rule preventing positive card balances.

## Paying the Credit Card

Paying a credit card is recorded as a **Transfer**:
- Source: Cash, bank, or wallet account.
- Destination: Credit card account.

## Installment Support

Installment purchases remain a single central transaction record in the MVP database.

- **Purchase-Centric Architecture**: An installment purchase is exactly **one** primary transaction row. The system **does not** generate phantom future transaction rows for unpaid installments.
- The original purchase metadata holds the installment count and total amount.

### Reporting and Allocation
- Installments affect reporting allocation over time.
- Allocation starts in the purchase month.
- Allocation calculations use higher internal precision, rounding only for the UI display.

## Currency Rules

Credit card purchases follow standard transaction currency rules (see [Money and Currency](./money-and-currency.md)).
- If a card concept supports separate ARS and USD balances, the purchase affects the matching currency balance only.
- Balances are not collapsed into a single converted reporting currency.

## Excluded Capabilities

The MVP intentionally does not model:
- Statement opening/closing dates or due dates
- Minimum payment logic or revolving balances
- Card interest or late fees
- Bank statement reconciliation
