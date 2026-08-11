import type { ColumnDef } from "@tanstack/react-table";

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from "@tanstack/react-table";

import { useState } from "react";

import "./TransactionTable.css";

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
  transactions: Transaction[];
  onTransactionClick: (transaction: Transaction) => void;
}

const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "date",
    header: "Date",
    enableSorting: true,
  },
  {
    accessorKey: "merchant",
    header: "Merchant",
    enableSorting: true,
  },
  {
    accessorKey: "category",
    header: "Category",
    enableSorting: true,
  },
  {
    accessorKey: "amount",
    header: "Amount",
    enableSorting: true,
    cell: ({ row }) => `₹${row.original.amount}`,
  },
  {
    accessorKey: "status",
    header: "Status",
    enableSorting: true,
  },
  {
    accessorKey: "rewardCoins",
    header: "Reward Coins",
    enableSorting: true,
  },
];

const TransactionTable = ({ transactions, onTransactionClick }: Props) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data: transactions,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="transaction-table-container">
      <h2>Recent Transactions</h2>

      <table className="transaction-table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  style={{ cursor: "pointer" }}
                >
                  <>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}

                    {{
                      asc: " 🔼",
                      desc: " 🔽",
                    }[header.column.getIsSorted() as string] ?? null}
                  </>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              onClick={() => onTransactionClick(row.original)}
              style={{ cursor: "pointer" }}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
