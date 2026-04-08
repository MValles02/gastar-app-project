# Categories

## Purpose

Categories help users classify income and expense activity. They stay practical, optional to initialize, easy to manage, and fully owned by the user after creation.

## Category Meaning

A category is a user-owned label used to classify:
- **Income** transactions
- **Expense** transactions

**Transfers** do not use categories in the MVP.
There is no built-in `Uncategorized` category in the MVP.

## Default Categories and Loading

The MVP includes a default category set in Spanish to reduce setup friction.

**Onboarding Behavior:**
- Loading default categories is optional during first use.
- Skipping defaults must not block use of the product.

**Empty-State Recovery Behavior:**
- If the user has no categories, the categories page shows an action to load the default Spanish categories.
- If the user has no categories, income and expense transactions cannot be saved until at least one category exists.

Once loaded, default categories become normal user-owned categories with no permanent distinction from user-created categories.

## Ownership and Lifecycle Rules

Every category belongs to exactly one user (see [Core Concepts](./core-concepts.md) for strict isolation rules).

Categories follow the same hard deletion and inactivation rules as accounts (see [Core Concepts](./core-concepts.md)):
- Deletion is blocked if referenced by any historical transaction or active recurring rule.
- Inactivation is blocked if referenced by an active recurring rule.
- Inactive categories are hidden from new transaction entry but remain valid for historical viewing.
