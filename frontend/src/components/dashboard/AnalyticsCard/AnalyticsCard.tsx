import "./AnalyticsCard.css";

interface AnalyticsCardProps {
  title: string;
  value: string;
  subtitle: string;
}

const AnalyticsCard = ({ title, value, subtitle }: AnalyticsCardProps) => {
  return (
    <div className="analytics-card">
      <h3 className="analytics-card__title">{title}</h3>

      <h2 className="analytics-card__value">{value}</h2>

      <p className="analytics-card__subtitle">{subtitle}</p>
    </div>
  );
};

export default AnalyticsCard;
