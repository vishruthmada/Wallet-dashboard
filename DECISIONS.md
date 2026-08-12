# DECISIONS

## 1. React + TypeScript + Vite

**Decision:** React with TypeScript and Vite.

**Why:** React fits the component-oriented dashboard UI, TypeScript improves data-contract safety, and Vite provides a fast development/build workflow.

**Trade-off:** the assignment preferred Next.js, but the implementation uses Vite rather than introducing framework-specific routing/server rendering that was not required for this dashboard.

## 2. Component-based frontend

The UI is split into focused components such as:

- Dashboard header
- Summary cards
- Spending chart
- Category chart
- Search bar
- Filter bar
- Transaction table
- Pagination
- Transaction modal
- Reward cards

**Why:** this keeps the dashboard maintainable and makes individual UI pieces easier to change.

## 3. TanStack Table

**Decision:** use TanStack Table for the transaction table's sorting/table state while keeping the actual table markup and CSS hand-built.

**Why:** the assignment specifically prohibited table component libraries and emphasized table engineering. TanStack Table provides table logic without replacing the HTML/CSS table implementation.

## 4. Client-side pagination

**Decision:** paginate the transaction results in the frontend.

**Why:** the supplied dataset is around 10,000 rows and pagination was explicitly allowed. It was a faster, lower-risk implementation for the 24-hour assignment.

**Trade-off:** server-side pagination/filtering would scale better and is a planned improvement.

## 5. React Query

**Decision:** use TanStack Query for API data fetching.

**Why:** transactions, analytics, and rewards are server-owned data. Query caching/loading/error states are cleaner than manually managing every API request with local effects.

## 6. Local React state

**Decision:** use `useState` for UI state such as search text, filters, pagination, chart selection, and the selected transaction.

**Why:** these states are local to dashboard interactions and do not justify a global state library.

## 7. Recharts

**Decision:** use Recharts for spending and category visualizations.

**Why:** the assignment explicitly allowed Recharts and it provides responsive chart components without requiring custom SVG chart infrastructure.

## 8. PostgreSQL schema

The application stores transactions as structured columns rather than dumping JSON into one column.

Core transaction fields include:

```text
id
timestamp
merchant
category
amount
currency
status
payment_method
```

Rewards and redemptions are separate tables.

**Why:** this makes transactions queryable and keeps reward data independent from raw transaction records.

## 9. Bulk import

**Decision:** use PostgreSQL COPY through `pg-copy-streams` for the transaction seed.

**Why:** the supplied dataset contains roughly 10,000 rows. Bulk loading is simpler and faster than issuing one INSERT query per transaction.

## 10. Express service separation

The backend is separated into:

```text
routes
controllers
services
db
```

**Why:** routes define HTTP endpoints, controllers handle request/response concerns, services contain business logic, and database access stays separate.

## 11. Deployment architecture

**Decision:**

```text
Vercel → frontend
Render → backend
Neon → PostgreSQL
```

**Why:** all three provide straightforward hosted deployments suitable for a small assignment and allow the live frontend to communicate with a real hosted PostgreSQL-backed API.

## 12. Responsive table

**Decision:** horizontally scroll the transaction table on narrow screens.

**Why:** the table contains multiple required columns. Hiding or squeezing columns would make important transaction information difficult to use.

## 13. Redemption validation on backend

**Decision:** the backend checks reward existence and available balance.

**Why:** frontend validation alone is not trustworthy. The server must enforce business rules.

## 14. Error handling

API errors return JSON with a success flag/message and appropriate HTTP failure status where applicable.

**Why:** the frontend needs a predictable failure shape and the assignment explicitly asks for sensible redeem error responses.

## 15. Scope prioritization

The implementation prioritized:

1. Transaction dashboard
2. Spending analytics
3. Rewards/redeem
4. PostgreSQL and seed/import
5. Deployment
6. Responsive polish

**Why:** this follows the assignment's stated priority order and favors a working core over a wider but unfinished feature set.
