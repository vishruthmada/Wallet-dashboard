import { useMemo, useState } from "react";

import "./TransactionSection.css";

import SearchBar from "../SearchBar";
import FilterBar from "../FilterBar";
import TransactionModal from "../TransactionModal";
import TransactionTable from "../TransactionTable";
import Pagination from "../Pagination";

import { useTransactions } from "../../../hooks/useTransaction";
import type { Transaction } from "../../../types/transaction";

interface Props {
  selectedCategory: string;
}

const TransactionSection = ({ selectedCategory }: Props) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const rowsPerPage = 5;

  const { data: transactions = [], isLoading, isError } = useTransactions();

  // Use chart category if selected, otherwise use dropdown category
  const activeCategory = selectedCategory || category;

  // Filter transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesSearch = transaction.merchant
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        activeCategory === "" || transaction.category === activeCategory;

      const matchesStatus = status === "" || transaction.status === status;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [transactions, search, activeCategory, status]);

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / rowsPerPage);

  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  // Loading state
  if (isLoading) {
    return <h2>Loading transactions...</h2>;
  }

  // Error state
  if (isError) {
    return <h2>Failed to load transactions.</h2>;
  }

  return (
    <section className="transaction-section">
      <SearchBar search={search} setSearch={setSearch} />

      <FilterBar
        category={category}
        setCategory={setCategory}
        status={status}
        setStatus={setStatus}
      />

      <TransactionTable
        transactions={paginatedTransactions}
        onTransactionClick={setSelectedTransaction}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <TransactionModal
        transaction={selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
      />
    </section>
  );
};

export default TransactionSection;
