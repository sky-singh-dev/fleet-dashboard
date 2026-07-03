export type StatisticsResponse = {
  success: boolean;
  data: Statistics;
};

export type Statistics = {
  total: number;
  idle: number;
  en_route: number;
  delivered: number;
  average_speed: number;
  timestamp: string;
};
