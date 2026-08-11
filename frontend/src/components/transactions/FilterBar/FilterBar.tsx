import "./FilterBar.css";

interface FilterBarProps {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}

const FilterBar = ({
  category,
  setCategory,
  status,
  setStatus,
}: FilterBarProps) => {
  return (
    <div className="filter-bar">
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">All Categories</option>
        <option value="Shopping">Shopping</option>
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Bills">Bills</option>
      </select>

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">All Status</option>
        <option value="Completed">Completed</option>
        <option value="Pending">Pending</option>
      </select>
    </div>
  );
};

export default FilterBar;
