import { Request, Response } from "express";
import { getTransactions } from "../services/transaction.service";

export const getAllTransactions = async (_req: Request, res: Response) => {
  try {
    const transactions = await getTransactions();

    res.json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (error) {
    console.error("Transaction API error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load transactions",
    });
  }
};
