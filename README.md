# WalletWise — Full-Stack Wallet Dashboard

A full-stack financial dashboard for exploring credit-card transactions, spending analytics, and reward coins.

## Live

- Frontend: https://wallet-dashboard-one-gamma.vercel.app/
- Backend API: https://wallet-dashboard-api.onrender.com
- GitHub: https://github.com/vishruthmada/Wallet-dashboard

## What it does

WalletWise provides:

- Transaction browsing across the supplied transaction dataset
- Merchant search as the user types
- Transaction filtering by category, payment status, date range, and amount range
- Sorting of transaction columns
- Pagination to keep the table manageable
- Transaction detail modal on row click
- Spending by category
- Monthly spending trend
- Category-to-transaction filtering from the category chart
- Reward coin balance
- Reward catalogue
- Reward redemption with backend validation
- Responsive desktop/tablet/mobile UI

## Architecture

```text
React + TypeScript + Vite
        |
        | HTTP / JSON
        v
Node.js + Express API
        |
        | SQL
        v
PostgreSQL (Neon)
```

The frontend is deployed on Vercel, the backend on Render, and PostgreSQL is hosted on Neon.

## Tech stack

### Frontend

- React
- TypeScript
- Vite
- TanStack Table
- TanStack Query
- Recharts
- CSS

### Backend

- Node.js
- Express
- TypeScript
- PostgreSQL client (`pg`)
- `pg-copy-streams` for bulk transaction import

### Database

- PostgreSQL
- Neon

## Project structure

```text
Wallet-dashboard/
├── frontend/
│   └── src/
│       ├── components/
│       ├── hooks/
│       ├── layouts/
│       ├── pages/
│       ├── services/
│       └── types/
├── backend/
│   └── src/
│       ├── controllers/
│       ├── db/
│       ├── routes/
│       ├── services/
│       └── server.ts
├── transactions.json
├── ASSUMPTIONS.md
├── DECISIONS.md
├── AI-USAGE.md
└── README.md
```

## Local setup

### Prerequisites

- Node.js 20+ recommended
- npm
- PostgreSQL / Neon database

### 1. Clone

```bash
git clone https://github.com/vishruthmada/Wallet-dashboard.git
cd Wallet-dashboard
```

### 2. Backend

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
DATABASE_URL=your_postgresql_connection_string
PORT=5000
```

Build:

```bash
npm run build
```

Start:

```bash
npm run dev
```

### 3. Database seed/import

The supplied `transactions.json` is imported with:

```bash
npm run import-data
```

The importer:

- normalizes supported timestamp formats
- handles missing categories with a fallback category
- skips duplicate transaction IDs
- bulk-loads transactions into PostgreSQL

Rewards and redemption tables are created with the SQL schema/seed commands documented in the project.

### 4. Frontend

Open a second terminal:

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000
```

Run:

```bash
npm run dev
```

The Vite development server will print the local URL.

## API

### Transactions

```http
GET /api/transactions
```

Returns transactions from PostgreSQL.

### Analytics

```http
GET /api/analytics
```

Returns dashboard totals, success rate, category spending, and monthly spending trend.

### Rewards

```http
GET /api/rewards
```

Returns the reward catalogue and current calculated coin balance.

### Redeem reward

```http
POST /api/rewards/redeem
Content-Type: application/json
```

Example:

```json
{
  "rewardId": 1
}
```

The backend validates that the reward exists and that the available balance is sufficient.

## Transaction performance

The assignment provides roughly 10,000 transactions. The implementation uses:

- PostgreSQL for persistence
- A single API fetch for the current transaction dataset
- Client-side filtering/search
- TanStack Table for table rendering/sorting
- Pagination of visible rows

This keeps the rendered table small while avoiding rendering all rows simultaneously.

A future optimization would move pagination, filtering, and sorting to PostgreSQL-backed API parameters for larger datasets.

## Rewards model

Successful payments earn:

```text
floor(amount / 100)
```

coins per transaction.

The catalogue contains six example rewards/benefits defined for the assignment.

## Responsive UI

The dashboard has responsive layouts for:

- desktop
- tablet
- mobile widths down to approximately 360–375px

The transaction table intentionally uses horizontal scrolling on narrow screens rather than compressing all columns into unreadable widths.

## Deployment

### Frontend

Vercel:

- Root directory: `frontend`
- Build command: `npm run build`
- Output directory: `dist`
- Environment variable:

```env
VITE_API_URL=<deployed-backend-url>
```

### Backend

Render:

- Root directory: `backend`
- Build command: `npm install && npm run build`
- Start command: `npm start`
- Environment variable:

```env
DATABASE_URL=<neon-postgresql-url>
```

### Database

Neon PostgreSQL hosts the application data.

## Done

- [x] PostgreSQL-backed transaction storage
- [x] Bulk transaction import
- [x] Transaction API
- [x] Analytics API
- [x] Rewards catalogue API
- [x] Reward redemption API
- [x] Transaction search/filter/sort UI
- [x] Pagination
- [x] Transaction detail modal
- [x] Spending charts
- [x] Chart-to-table category filtering
- [x] Responsive UI
- [x] Frontend deployment
- [x] Backend deployment

## Known limitations / not done

1. Filtering, search, sorting, and pagination are primarily handled in the browser after loading the transaction dataset. Server-side query parameters would be the next scalability improvement.
2. The current redemption implementation validates and records redemptions, but the balance calculation should be extended to subtract persisted redemption records so the balance remains authoritative across refreshes.
3. The assignment preferred Python/FastAPI or Flask for the backend. This implementation uses Node.js + Express + TypeScript instead.
4. A small automated test suite would be a useful follow-up, especially for reward redemption validation.
5. Authentication/user accounts are outside the requested core slice and are not implemented.

## Assignment scope

The implementation intentionally prioritized the assignment's core requirements first: a usable transaction dashboard, spending analytics, rewards/redeem flow, PostgreSQL persistence, and deployment. The remaining limitations are documented rather than hidden.

## License

This project was created as a take-home assignment and portfolio project.
