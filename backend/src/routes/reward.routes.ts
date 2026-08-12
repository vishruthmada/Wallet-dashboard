import { Router } from "express";

import {
  getAllRewards,
  redeemRewardController,
} from "../controllers/reward.controller";

const router = Router();

router.get("/", getAllRewards);

router.post("/redeem", redeemRewardController);

export default router;
