import "./TransactionModal.css";

import type { Transaction } from "../../../types/transaction";

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
            <strong>Date:</strong>{" "}
            {new Date(transaction.timestamp).toLocaleString()}
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
            <strong>Currency:</strong> {transaction.currency}
          </p>

          <p>
            <strong>Status:</strong> {transaction.status}
          </p>

          <p>
            <strong>Payment Method:</strong> {transaction.payment_method}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;
