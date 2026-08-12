import pool from "../db/database";

export const getTransactions = async () => {
  const result = await pool.query(`
    SELECT
      id,
      timestamp,
      merchant,
      category,
      amount,
      currency,
      status,
      payment_method
    FROM transactions
    ORDER BY timestamp DESC
  `);

  return result.rows;
};
