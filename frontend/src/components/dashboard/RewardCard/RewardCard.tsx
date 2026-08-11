import "./RewardCard.css";

interface RewardCardProps {
  title: string;
  value: string | number;
}

const RewardCard = ({ title, value }: RewardCardProps) => {
  return (
    <div className="reward-card">
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
};

export default RewardCard;
