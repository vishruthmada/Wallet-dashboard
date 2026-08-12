import { Request, Response } from "express";

import {
  getRewards,
  getRewardBalance,
  redeemReward,
} from "../services/reward.service";

export const getAllRewards = async (_req: Request, res: Response) => {
  try {
    const rewards = await getRewards();
    const coins = await getRewardBalance();

    res.json({
      success: true,
      data: {
        coins,
        rewards,
      },
    });
  } catch (error) {
    console.error("Rewards API error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load rewards",
    });
  }
};

export const redeemRewardController = async (req: Request, res: Response) => {
  try {
    const rewardId = Number(req.body.rewardId);

    if (!Number.isInteger(rewardId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid rewardId",
      });
    }

    const result = await redeemReward(rewardId);

    res.json({
      success: true,
      message: "Reward redeemed successfully",
      data: result,
    });
  } catch (error) {
    console.error("Reward redemption error:", error);

    const message =
      error instanceof Error ? error.message : "Failed to redeem reward";

    res.status(400).json({
      success: false,
      message,
    });
  }
};
