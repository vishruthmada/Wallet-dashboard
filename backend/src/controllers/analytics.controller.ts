import { Request, Response } from "express";
import { getAnalytics } from "../services/analytics.service";

export const getDashboardAnalytics = async (_req: Request, res: Response) => {
  try {
    const analytics = await getAnalytics();

    res.json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    console.error("Analytics API error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load analytics",
    });
  }
};
