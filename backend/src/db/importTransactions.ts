import fs from "fs";
import path from "path";
import { Client } from "pg";
import { from } from "pg-copy-streams";
import dotenv from "dotenv";

dotenv.config();

interface Transaction {
  id: string;
  timestamp: string | number;
  merchant: string;
  category: string | null;
  amount: number;
  currency: string;
  status: string;
  payment_method: string;
}

const filePath = path.join(process.cwd(), "transactions.json");

const escapeCsv = (value: string | number) => {
  const stringValue = String(value);

  if (
    stringValue.includes(",") ||
    stringValue.includes('"') ||
    stringValue.includes("\n")
  ) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }

  return stringValue;
};

const normalizeTimestamp = (timestamp: string | number): string => {
  // Unix timestamp in milliseconds
  if (typeof timestamp === "number") {
    const date = new Date(timestamp);

    if (!Number.isNaN(date.getTime())) {
      return date.toISOString();
    }

    throw new Error(`Invalid timestamp found: ${timestamp}`);
  }

  const value = timestamp.trim();

  // DD/MM/YYYY HH:mm:ss
  const ddmmyyyyMatch = value.match(
    /^(\d{2})\/(\d{2})\/(\d{4})\s+(\d{2}):(\d{2}):(\d{2})$/,
  );

  if (ddmmyyyyMatch) {
    const [, day, month, year, hour, minute, second] = ddmmyyyyMatch;

    const date = new Date(
      Date.UTC(
        Number(year),
        Number(month) - 1,
        Number(day),
        Number(hour),
        Number(minute),
        Number(second),
      ),
    );

    if (!Number.isNaN(date.getTime())) {
      return date.toISOString();
    }

    throw new Error(`Invalid timestamp found: ${timestamp}`);
  }

  // YYYY-MM-DD
  const dateOnlyMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);

  if (dateOnlyMatch) {
    const [, year, month, day] = dateOnlyMatch;

    const date = new Date(
      Date.UTC(Number(year), Number(month) - 1, Number(day)),
    );

    if (!Number.isNaN(date.getTime())) {
      return date.toISOString();
    }

    throw new Error(`Invalid timestamp found: ${timestamp}`);
  }

  // ISO 8601
  const date = new Date(value);

  if (!Number.isNaN(date.getTime())) {
    return date.toISOString();
  }

  throw new Error(`Invalid timestamp found: ${timestamp}`);
};

const normalizeCategory = (
  category: string | null,
  merchant: string,
): string => {
  if (category && category.trim()) {
    return category.trim();
  }

  const merchantLower = merchant.toLowerCase();

  if (
    merchantLower.includes("indigo") ||
    merchantLower.includes("irctc") ||
    merchantLower.includes("uber") ||
    merchantLower.includes("ola") ||
    merchantLower.includes("rapido") ||
    merchantLower.includes("makemytrip")
  ) {
    return "Travel";
  }

  if (
    merchantLower.includes("swiggy") ||
    merchantLower.includes("zomato") ||
    merchantLower.includes("domino") ||
    merchantLower.includes("starbucks") ||
    merchantLower.includes("mcdonald")
  ) {
    return "Food & Dining";
  }

  if (
    merchantLower.includes("croma") ||
    merchantLower.includes("myntra") ||
    merchantLower.includes("flipkart") ||
    merchantLower.includes("ajio")
  ) {
    return "Shopping";
  }

  if (
    merchantLower.includes("zepto") ||
    merchantLower.includes("blinkit") ||
    merchantLower.includes("bigbasket") ||
    merchantLower.includes("dmart") ||
    merchantLower.includes("jiomart")
  ) {
    return "Groceries";
  }

  if (
    merchantLower.includes("practo") ||
    merchantLower.includes("pharmeasy") ||
    merchantLower.includes("apollo") ||
    merchantLower.includes("1mg") ||
    merchantLower.includes("cult.fit")
  ) {
    return "Health";
  }

  if (
    merchantLower.includes("bpcl") ||
    merchantLower.includes("hp petrol") ||
    merchantLower.includes("indian oil") ||
    merchantLower.includes("shell")
  ) {
    return "Fuel";
  }

  if (
    merchantLower.includes("coursera") ||
    merchantLower.includes("unacademy") ||
    merchantLower.includes("udemy") ||
    merchantLower.includes("upgrad") ||
    merchantLower.includes("byju")
  ) {
    return "Education";
  }

  if (
    merchantLower.includes("netflix") ||
    merchantLower.includes("hotstar") ||
    merchantLower.includes("youtube premium") ||
    merchantLower.includes("bookmyshow")
  ) {
    return "Entertainment";
  }

  if (
    merchantLower.includes("airtel") ||
    merchantLower.includes("jio") ||
    merchantLower.includes("tata power") ||
    merchantLower.includes("act fibernet") ||
    merchantLower.includes("bses")
  ) {
    return "Utilities";
  }

  if (
    merchantLower.includes("lic") ||
    merchantLower.includes("policybazaar") ||
    merchantLower.includes("hdfc ergo")
  ) {
    return "Insurance";
  }

  return "Other";
};

const main = async () => {
  console.log("Reading transactions.json...");

  const file = fs.readFileSync(filePath, "utf-8");

  const transactions: Transaction[] = JSON.parse(file);

  console.log(`Found ${transactions.length.toLocaleString()} transactions.`);

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  await client.connect();

  console.log("Connected to PostgreSQL.");

  console.log("Clearing existing transactions...");

  await client.query("TRUNCATE TABLE transactions;");

  console.log("Starting bulk import...");

  const copyQuery = `
    COPY transactions
    (
      id,
      timestamp,
      merchant,
      category,
      amount,
      currency,
      status,
      payment_method
    )
    FROM STDIN WITH (FORMAT csv)
  `;

  const copyStream = client.query(from(copyQuery) as any) as any;

  const processedIds = new Set<string>();

  let imported = 0;
  let duplicates = 0;

  for (const transaction of transactions) {
    // Skip duplicate transaction IDs
    if (processedIds.has(transaction.id)) {
      duplicates++;

      continue;
    }

    processedIds.add(transaction.id);

    const normalizedTimestamp = normalizeTimestamp(transaction.timestamp);

    const normalizedCategory = normalizeCategory(
      transaction.category,
      transaction.merchant,
    );

    const row = [
      transaction.id,
      normalizedTimestamp,
      transaction.merchant,
      normalizedCategory,
      transaction.amount,
      transaction.currency,
      transaction.status,
      transaction.payment_method,
    ]
      .map(escapeCsv)
      .join(",");

    copyStream.write(`${row}\n`);

    imported++;

    if (imported % 1000 === 0) {
      console.log(
        `Imported ${imported.toLocaleString()} / ${transactions.length.toLocaleString()}`,
      );
    }
  }

  copyStream.end();

  await new Promise<void>((resolve, reject) => {
    copyStream.on("finish", resolve);
    copyStream.on("error", reject);
  });

  console.log("Import completed successfully.");

  console.log(`Duplicate IDs skipped: ${duplicates.toLocaleString()}`);

  const result = await client.query("SELECT COUNT(*) FROM transactions;");

  console.log(
    `Database now contains ${Number(
      result.rows[0].count,
    ).toLocaleString()} transactions.`,
  );

  await client.end();

  console.log("Database connection closed.");
};

main().catch((error) => {
  console.error("Import failed:", error);

  process.exit(1);
});
