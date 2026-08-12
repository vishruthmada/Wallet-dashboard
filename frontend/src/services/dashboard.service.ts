import type { Transaction } from "../types/transaction";

export const getDashboardAnalytics = (transactions: Transaction[]) => {
  const successfulTransactions = transactions.filter(
    (transaction) => transaction.status === "SUCCESS",
  );

  const totalSpent = successfulTransactions.reduce((sum, transaction) => {
    return sum + Number(transaction.amount);
  }, 0);

  const averageSpent =
    successfulTransactions.length === 0
      ? 0
      : totalSpent / successfulTransactions.length;

  const totalCoins = successfulTransactions.reduce((sum, transaction) => {
    return sum + Math.floor(Number(transaction.amount) / 100);
  }, 0);

  return {
    totalTransactions: transactions.length,
    successfulTransactions: successfulTransactions.length,
    totalSpent,
    averageSpent,
    totalCoins,
  };
};

export const getCategoryAnalytics = (transactions: Transaction[]) => {
  const categoryTotals: Record<string, number> = {};

  transactions
    .filter((transaction) => transaction.status === "SUCCESS")
    .forEach((transaction) => {
      const category = transaction.category;

      if (!categoryTotals[category]) {
        categoryTotals[category] = 0;
      }

      categoryTotals[category] += Number(transaction.amount);
    });

  return Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value: Number(value.toFixed(2)),
  }));
};
export const getSpendingTrendAnalytics = (transactions: Transaction[]) => {
  const monthlyTotals: Record<string, number> = {};

  transactions
    .filter((transaction) => transaction.status === "SUCCESS")
    .forEach((transaction) => {
      const date = new Date(transaction.timestamp);

      const month = date.toLocaleString("en-US", {
        month: "short",
      });

      const year = date.getFullYear();

      const key = `${year}-${month}`;

      if (!monthlyTotals[key]) {
        monthlyTotals[key] = 0;
      }

      monthlyTotals[key] += Number(transaction.amount);
    });

  return Object.entries(monthlyTotals)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, amount]) => ({
      month: key,
      amount: Number(amount.toFixed(2)),
    }));
};