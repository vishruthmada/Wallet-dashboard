# ASSUMPTIONS

This document records product decisions made where the assignment left the behavior open.

## 1. Project identity

The project is presented as **WalletWise**, a consumer wallet dashboard.

## 2. Transaction pagination

The transaction dataset is loaded from the API and the UI paginates the visible results.

**Reason:** the supplied dataset is around 10,000 rows and the assignment explicitly allowed pagination. Rendering only the current page keeps the table UI manageable without introducing virtualization complexity during the 24-hour scope.

## 3. Search behavior

Merchant search is case-insensitive and matches merchants whose names contain the entered search text.

**Reason:** this is the most natural behavior for a transaction search box.

## 4. Filters are combinable

Category, status, date range, and amount range are treated as AND conditions.

**Example:** selecting `Food` + `SUCCESS` returns only successful Food transactions.

## 5. Chart category interaction

Clicking a category slice applies that category to the transaction table.

Clicking the same selected category again clears the chart selection.

**Reason:** this provides a simple discoverable one-way chart-to-table interaction within the time limit.

## 6. Spending analytics

Spending analytics use successful transactions for spend totals.

**Reason:** failed payments should not be treated as completed spending.

## 7. Reward calculation

A successful transaction earns:

```text
floor(amount / 100)
```

coins.

**Reason:** the assignment specifies one coin per ₹100 spent and says the reward is capped per transaction. The implementation uses the integer number of complete ₹100 units.

## 8. Reward catalogue

Six rewards were defined for the demonstration catalogue.

**Reason:** the assignment requested a small catalogue of four to six rewards and left the actual rewards open.

## 9. Reward redemption

A redemption requires a valid reward ID and sufficient coins.

Invalid or unaffordable requests are rejected by the backend.

**Reason:** the assignment explicitly requires backend validation rather than relying on frontend checks.

## 10. Missing transaction categories

Some source transactions have an empty category. The import process assigns a fallback category based on available merchant information and uses `Other` when no suitable mapping is available.

**Reason:** the database schema treats category as required, while the supplied dataset contains missing values.

## 11. Duplicate transaction IDs

Duplicate IDs in the supplied dataset are skipped during import because transaction ID is the PostgreSQL primary key.

**Reason:** inserting duplicate primary keys would make the seed/import fail. Keeping the first occurrence preserves a unique transaction identity.

## 12. Timestamp normalization

The import process accepts the timestamp formats encountered in the supplied data, including ISO timestamps, Unix milliseconds, date-only values, and `DD/MM/YYYY HH:mm:ss`.

**Reason:** the supplied dataset contains more than one timestamp representation.

## 13. Authentication

Authentication and multiple user accounts are not implemented.

**Reason:** the assignment focuses on a single consumer dashboard and explicitly prioritizes the transaction, analytics, rewards, database, and deployment core.

## 14. Responsive behavior

On narrow screens, the transaction table remains horizontally scrollable rather than hiding required transaction columns.

**Reason:** preserving transaction information is preferable to making columns unreadably narrow.

## 15. Backend technology

The assignment suggested Python with FastAPI or Flask. The implementation uses Node.js + Express + TypeScript.

**Reason:** the project was implemented with a TypeScript end-to-end stack to keep the frontend/backend data types and development workflow consistent within the available time.

## 16. Hosted database

Neon PostgreSQL is used for the deployed database.

**Reason:** it provides hosted PostgreSQL suitable for the assignment's deployment requirement.
