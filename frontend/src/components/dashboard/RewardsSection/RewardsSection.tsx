import "./RewardsSection.css";

import RewardCard from "../RewardCard";

const RewardsSection = () => {
  return (
    <section className="rewards-section">
      <h2>Rewards</h2>

      <div className="rewards-grid">
        <RewardCard title="Total Coins" value="1250" />

        <RewardCard title="Monthly Earned" value="+320" />

        <RewardCard title="Available Rewards" value="8" />

        <RewardCard title="Redeemed" value="5" />
      </div>

      <button className="redeem-btn">Redeem Rewards</button>
    </section>
  );
};

export default RewardsSection;
