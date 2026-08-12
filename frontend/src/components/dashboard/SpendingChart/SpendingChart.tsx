import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import { useTransactions } from "../../../hooks/useTransaction";
import { getSpendingTrendAnalytics } from "../../../services/dashboard.service";

import "./SpendingChart.css";

const SpendingChart = () => {
  const { data: transactions = [], isLoading, isError } = useTransactions();

  if (isLoading) {
    return <h3>Loading spending analytics...</h3>;
  }

  if (isError) {
    return <h3>Failed to load spending analytics.</h3>;
  }

  const spendingTrendData = getSpendingTrendAnalytics(transactions);

  return (
    <div className="spending-chart">
      <h3>Monthly Spending Trend</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={spendingTrendData}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip
            formatter={(value) => `₹${Number(value).toLocaleString("en-IN")}`}
          />

          <Line
            type="monotone"
            dataKey="amount"
            stroke="#2563EB"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpendingChart;
