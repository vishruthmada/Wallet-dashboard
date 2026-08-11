import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { categoryData } from "../../../constants/dashboardData";
import "./CategoryChart.css";

const COLORS = ["#2563EB", "#16A34A", "#F59E0B", "#DC2626"];

interface Props {
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}

const CategoryChart = ({ selectedCategory, setSelectedCategory }: Props) => {
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
              const category = String(data?.name ?? "");

              if (selectedCategory === category) {
                setSelectedCategory("");
              } else {
                setSelectedCategory(category);
              }
            }}
          >
            {categoryData.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryChart;
