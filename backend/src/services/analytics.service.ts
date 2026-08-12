import pool from "../db/database";

export const getAnalytics = async () => {
  const summaryResult = await pool.query(`
    SELECT
      COUNT(*)::int AS total_transactions,
      COUNT(*) FILTER (
        WHERE status = 'SUCCESS'
      )::int AS successful_transactions,
      COALESCE(
        SUM(amount) FILTER (
          WHERE status = 'SUCCESS'
        ),
        0
      ) AS total_spent
    FROM transactions
  `);

  const categoryResult = await pool.query(`
    SELECT
      category AS name,
      ROUND(
        SUM(amount) FILTER (
          WHERE status = 'SUCCESS'
        ),
        2
      ) AS value
    FROM transactions
    GROUP BY category
    ORDER BY value DESC
  `);

  const monthlyResult = await pool.query(`
    SELECT
      TO_CHAR(
        DATE_TRUNC('month', timestamp),
        'YYYY-MM'
      ) AS month,
      ROUND(
        SUM(amount) FILTER (
          WHERE status = 'SUCCESS'
        ),
        2
      ) AS amount
    FROM transactions
    GROUP BY DATE_TRUNC('month', timestamp)
    ORDER BY DATE_TRUNC('month', timestamp)
  `);

  const summary = summaryResult.rows[0];

  const totalTransactions = Number(summary.total_transactions);

  const successfulTransactions = Number(summary.successful_transactions);

  const totalSpent = Number(summary.total_spent);

  const successRate =
    totalTransactions === 0
      ? 0
      : (successfulTransactions / totalTransactions) * 100;

  return {
    totalTransactions,
    successfulTransactions,
    totalSpent,
    successRate: Number(successRate.toFixed(2)),
    categoryData: categoryResult.rows.map((item) => ({
      name: item.name,
      value: Number(item.value),
    })),
    spendingTrendData: monthlyResult.rows.map((item) => ({
      month: item.month,
      amount: Number(item.amount),
    })),
  };
};
