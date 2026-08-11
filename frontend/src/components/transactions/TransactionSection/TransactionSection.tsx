import { useMemo, useState } from "react";

import "./TransactionSection.css";

import SearchBar from "../SearchBar";
import FilterBar from "../FilterBar";
import TransactionModal from "../TransactionModal";
import TransactionTable from "../TransactionTable";
import Pagination from "../Pagination";

import { transactionData } from "../../../constants/transactionData";

interface Props {
  selectedCategory: string;
}

const TransactionSection = ({ selectedCategory }: Props) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 5;
  const [selectedTransaction, setSelectedTransaction] = useState<
    (typeof transactionData)[number] | null
  >(null);

  // Use chart category if selected, otherwise use dropdown category
  const activeCategory = selectedCategory || category;

  // Filter transactions
  const filteredTransactions = useMemo(() => {
    return transactionData.filter((transaction) => {
      const matchesSearch = transaction.merchant
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        activeCategory === "" || transaction.category === activeCategory;

      const matchesStatus = status === "" || transaction.status === status;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [search, activeCategory, status]);

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / rowsPerPage);

  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

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
