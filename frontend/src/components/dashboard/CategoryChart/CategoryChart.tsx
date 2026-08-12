import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { useTransactions } from "../../../hooks/useTransaction";
import { getCategoryAnalytics } from "../../../services/dashboard.service";

import "./CategoryChart.css";

const COLORS = [
  "#2563EB",
  "#16A34A",
  "#F59E0B",
  "#DC2626",
  "#9333EA",
  "#0891B2",
  "#EA580C",
  "#4F46E5",
];

interface Props {
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}

const CategoryChart = ({ selectedCategory, setSelectedCategory }: Props) => {
  const { data: transactions = [], isLoading, isError } = useTransactions();

  if (isLoading) {
    return <h3>Loading category analytics...</h3>;
  }

  if (isError) {
    return <h3>Failed to load category analytics.</h3>;
  }

  const categoryData = getCategoryAnalytics(transactions);

  return (
    <div className="category-chart">
      <h3>Category Distribution</h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={categoryData}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
            onClick={(data) => {
              const category = data.name;

              if (!category) return;

              if (selectedCategory === category) {
                setSelectedCategory("");
              } else {
                setSelectedCategory(category);
              }
            }}
          >
            {categoryData.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip
            formatter={(value) => `₹${Number(value).toLocaleString("en-IN")}`}
          />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryChart;
