import "./SummaryCards.css";
import AnalyticsCard from "../AnalyticsCard";

const SummaryCards = () => {
  return (
    <section className="summary-cards">
      <AnalyticsCard
        title="Total Spend"
        value="₹1,24,580"
        subtitle="+12% from last month"
      />

      <AnalyticsCard title="Transactions" value="284" subtitle="+15 today" />

      <AnalyticsCard title="Coins Earned" value="145" subtitle="+8 today" />

      <AnalyticsCard
        title="Success Rate"
        value="96%"
        subtitle="+2% this week"
      />
    </section>
  );
};

export default SummaryCards;
