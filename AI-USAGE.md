# AI-USAGE

## Tool used

**OpenAI ChatGPT**

AI assistance was used during implementation for:

- interpreting the assignment requirements
- frontend component structure and TypeScript patterns
- CSS responsiveness
- debugging TypeScript/build errors
- PostgreSQL import logic
- API/service/controller structure
- deployment troubleshooting
- documentation drafting

All generated suggestions were reviewed, executed, and validated locally or against the deployed application. The final implementation was not accepted blindly.

## Example 1 — Timestamp importer

An initial importer assumed timestamps would arrive in a single format. The actual dataset contained multiple timestamp representations, including Unix millisecond values and `DD/MM/YYYY HH:mm:ss`.

The first implementation failed with PostgreSQL date parsing errors.

**What was changed:** the timestamp normalization function was expanded to recognize the formats encountered in the dataset and convert them to ISO timestamps before COPY import.

**Why the original output was discarded:** it did not match the actual source data and caused the database import to fail.

## Example 2 — Missing categories

The initial import path assumed every transaction had a category because the TypeScript interface required one.

The real dataset contained transactions with empty categories, causing PostgreSQL's NOT NULL constraint to fail.

**What was changed:** the importer was updated to normalize missing categories using merchant-based fallback mapping and `Other` when no mapping was available.

**Why the original output was discarded:** the database rejected the source row and the implementation needed to reflect the actual dataset.

## Example 3 — Duplicate transaction IDs

The initial bulk import attempted to insert every row directly into a table whose transaction ID is the primary key.

The dataset contained duplicate IDs, causing PostgreSQL's unique constraint to reject the import.

**What was changed:** the importer tracks IDs already processed during the import and skips duplicate IDs.

**Why the original output was discarded:** importing duplicate primary keys cannot produce a valid transaction table.

## Example 4 — Vercel TypeScript build

The Vercel build failed because `ReactNode` was imported as a runtime value while `verbatimModuleSyntax` required a type-only import.

**What was changed:**

```ts
import type { ReactNode } from "react";
```

**Why:** `ReactNode` is a TypeScript type and should not be emitted as a runtime import.

## AI usage boundary

AI was used as an implementation and debugging assistant. I reviewed the resulting code, ran the commands, inspected compiler/runtime errors, and made the final decisions about scope and behavior.
