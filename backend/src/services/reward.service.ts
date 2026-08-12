import pool from "../db/database";

export const getRewards = async () => {
  const result = await pool.query(`
    SELECT
      id,
      title,
      description,
      coins
    FROM rewards
    ORDER BY coins ASC
  `);

  return result.rows;
};

export const getRewardBalance = async () => {
  const result = await pool.query(`
    SELECT COALESCE(
      SUM(FLOOR(amount / 100))
      FILTER (WHERE status = 'SUCCESS'),
      0
    ) AS coins
    FROM transactions
  `);

  return Number(result.rows[0].coins);
};

export const redeemReward = async (rewardId: number) => {
  const rewardResult = await pool.query(
    `
    SELECT id, title, description, coins
    FROM rewards
    WHERE id = $1
    `,
    [rewardId],
  );

  if (rewardResult.rows.length === 0) {
    throw new Error("Reward not found");
  }

  const reward = rewardResult.rows[0];

  const currentBalance = await getRewardBalance();

  if (currentBalance < Number(reward.coins)) {
    throw new Error("Insufficient reward coins");
  }

  const result = await pool.query(
    `
    INSERT INTO redemptions
      (reward_id, coins_used)
    VALUES
      ($1, $2)
    RETURNING
      id,
      reward_id,
      coins_used,
      redeemed_at
    `,
    [reward.id, reward.coins],
  );

  return {
    reward,
    redemption: result.rows[0],
    remainingCoins: currentBalance - Number(reward.coins),
  };
};
