import "./SummaryCards.css";

import AnalyticsCard from "../AnalyticsCard";

import { useTransactions } from "../../../hooks/useTransaction";
import { getDashboardAnalytics } from "../../../services/dashboard.service";

const SummaryCards = () => {
  const { data: transactions = [], isLoading, isError } = useTransactions();

  if (isLoading) {
    return <h2>Loading summary...</h2>;
  }

  if (isError) {
    return <h2>Failed to load summary.</h2>;
  }

  const analytics = getDashboardAnalytics(transactions);

  const successRate =
    analytics.totalTransactions === 0
      ? 0
      : (
          (analytics.successfulTransactions / analytics.totalTransactions) *
          100
        ).toFixed(1);

  return (
    <section className="summary-cards">
      <AnalyticsCard
        title="Total Spend"
        value={`₹${analytics.totalSpent.toLocaleString("en-IN", {
          maximumFractionDigits: 2,
        })}`}
        subtitle="Successful transactions"
      />

      <AnalyticsCard
        title="Transactions"
        value={analytics.totalTransactions}
        subtitle={`${analytics.successfulTransactions} successful`}
      />

      <AnalyticsCard
        title="Coins Earned"
        value={analytics.totalCoins}
        subtitle="1 coin per ₹100 spent"
      />

      <AnalyticsCard
        title="Success Rate"
        value={`${successRate}%`}
        subtitle="Overall success rate"
      />
    </section>
  );
};

export default SummaryCards;
