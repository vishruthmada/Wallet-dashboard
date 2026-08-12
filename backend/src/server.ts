import express from "express";
import cors from "cors";

import transactionRoutes from "./routes/transaction.routes";
import analyticsRoutes from "./routes/analytics.routes";
import rewardRoutes from "./routes/reward.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "Wallet Dashboard API is running",
  });
});

app.use("/api/transactions", transactionRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/rewards", rewardRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
