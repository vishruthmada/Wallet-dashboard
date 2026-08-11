import "./TransactionModal.css";

interface Transaction {
  id: number;
  date: string;
  merchant: string;
  category: string;
  amount: number;
  status: string;
  rewardCoins: number;
}

interface Props {
  transaction: Transaction | null;
  onClose: () => void;
}

const TransactionModal = ({ transaction, onClose }: Props) => {
  if (!transaction) return null;

  return (
    <div className="modal-overlay">
      <div className="transaction-modal">
        <div className="modal-header">
          <h2>Transaction Details</h2>

          <button onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <p>
            <strong>ID:</strong> {transaction.id}
          </p>
          <p>
            <strong>Date:</strong> {transaction.date}
          </p>
          <p>
            <strong>Merchant:</strong> {transaction.merchant}
          </p>
          <p>
            <strong>Category:</strong> {transaction.category}
          </p>
          <p>
            <strong>Amount:</strong> ₹{transaction.amount}
          </p>
          <p>
            <strong>Status:</strong> {transaction.status}
          </p>
          <p>
            <strong>Reward Coins:</strong> {transaction.rewardCoins}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;
