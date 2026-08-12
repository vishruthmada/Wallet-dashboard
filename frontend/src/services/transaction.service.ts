import type { Transaction } from "../types/transaction";

export const getTransactions = async (): Promise<Transaction[]> => {
  const response = await fetch("/transactions.json");

  if (!response.ok) {
    throw new Error("Failed to load transactions");
  }

  return response.json();
};
