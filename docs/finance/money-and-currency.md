# Money and Currency

## Purpose

This document defines the money and currency rules for the MVP, ensuring accounts, transactions, and reporting use consistent financial language without hiding currency differences.

## Supported Currencies

The MVP supports exactly two currencies: `ARS` and `USD`.

## Core Principle

An amount is only meaningful together with its currency. The MVP must **preserve the money values the user actually entered**. The product should not hide currency differences by automatically collapsing everything into one synthetic reporting total.

## Single-Currency Behavior

- Every account has a defined currency (`ARS` or `USD`).
- **Income** and **Expense** transactions use one amount in one currency, which must match the selected account currency.
- **Same-currency transfers** move the exact monetary amount between accounts without requiring an exchange rate.

## Cross-Currency Behavior

When a movement involves both `ARS` and `USD` (e.g., cross-currency transfers):

- The app **does not** invent or fetch automatic exchange rates.
- The **user provides a manual exchange rate**.
- The app stores **both** the source amount/currency and the destination amount/currency, plus the manual exchange rate used at entry time.
- The exchange rate is treated as transaction context, not a globally authoritative truth source. Older records are never recalculated if market rates change.

## Balance Interpretation and Reporting

- Balances are understandable in the currency in which the user tracks the account.
- The MVP keeps reporting separated by actual currency.
- The product **does not** present a mixed-currency account balance as if it were a unified value.

For exceptions regarding credit cards that hold dual balances, see [Credit Cards and Installments](./credit-cards-and-installments.md).
