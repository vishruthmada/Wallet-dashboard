export interface Transaction {
  id: string;
  timestamp: string;
  merchant: string;
  category: string;
  amount: number;
  currency: string;
  status: string;
  payment_method: string;
}
