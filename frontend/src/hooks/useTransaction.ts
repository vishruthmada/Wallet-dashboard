import { useQuery } from "@tanstack/react-query";
import type { Transaction } from "../types/transaction";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const fetchTransactions = async (): Promise<Transaction[]> => {
  const response = await fetch(`${API_URL}/api/transactions`);

  if (!response.ok) {
    throw new Error("Failed to fetch transactions");
  }

  const result = await response.json();

  return result.data;
};

export const useTransactions = () => {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
  });
};
