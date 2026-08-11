import "./ChartsSection.css";

import SpendingChart from "../SpendingChart";
import CategoryChart from "../CategoryChart";

interface Props {
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}

const ChartsSection = ({ selectedCategory, setSelectedCategory }: Props) => {
  return (
    <section className="charts-section">
      <SpendingChart />

      <CategoryChart
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    </section>
  );
};

export default ChartsSection;
