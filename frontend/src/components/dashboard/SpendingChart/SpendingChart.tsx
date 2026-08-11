import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import { spendingTrendData } from "../../../constants/dashboardData";
import "./SpendingChart.css";

const SpendingChart = () => {
  return (
    <div className="spending-chart">
      <h3>Monthly Spending Trend</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={spendingTrendData}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

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
