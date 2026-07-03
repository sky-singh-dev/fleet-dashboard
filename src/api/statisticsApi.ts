import type { Statistics, StatisticsResponse } from "../types/statistics";

export const fetchStatisticsData = async (): Promise<Statistics> => {
  const response = await fetch(
    "https://case-study-26cf.onrender.com/api/statistics",
  );

  if (!response.ok) {
    throw new Error(
      `Network response error: ${response.status} ${response.statusText}`,
    );
  }

  const rawStatistics: StatisticsResponse = await response.json();

  return rawStatistics.data;
};
