import { useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import SummaryCards from "../../components/dashboard/SummaryCards";
import ChartsSection from "../../components/dashboard/ChartsSection";
import TransactionSection from "../../components/transactions/TransactionSection";
import RewardsSection from "../../components/dashboard/RewardsSection";

const DashboardPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <DashboardLayout>
      <DashboardHeader />
      <SummaryCards />

      <ChartsSection
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <TransactionSection selectedCategory={selectedCategory} />

      <RewardsSection />
    </DashboardLayout>
  );
};

export default DashboardPage;
