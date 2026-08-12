import { useQuery } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const fetchAnalytics = async () => {
  const response = await fetch(`${API_URL}/api/analytics`);

  if (!response.ok) {
    throw new Error("Failed to fetch analytics");
  }

  const result = await response.json();

  return result.data;
};

export const useAnalytics = () => {
  return useQuery({
    queryKey: ["analytics"],
    queryFn: fetchAnalytics,
  });
};
