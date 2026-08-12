import type { Transaction } from "../types/transaction";

const COINS_PER_100_RUPEES = 1;
const MAX_COINS_PER_TRANSACTION = 100;

export const calculateRewardCoins = (transactions: Transaction[]): number => {
  return transactions
    .filter((transaction) => transaction.status === "SUCCESS")
    .reduce((total, transaction) => {
      const amount = Number(transaction.amount);

      const coins = Math.floor((amount / 100) * COINS_PER_100_RUPEES);

      return total + Math.min(coins, MAX_COINS_PER_TRANSACTION);
    }, 0);
};
