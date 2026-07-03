import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { Statistics } from "../types/statistics";

type StatisticsState = {
  isLoading: boolean;
  statistics?: Statistics;
  isError?: boolean;
};

type StatisticsAction = {
  setLoading: (isLoading: boolean) => void;
  setStatistics: (statistics: Statistics) => void;
  setError: (isError: boolean) => void;
};

const defaultState: StatisticsState = {
  isLoading: false,
  statistics: undefined,
  isError: false,
};

export const useStatisticsStore = create<StatisticsState & StatisticsAction>()(
  devtools(
    immer((set) => ({
      ...defaultState,
      setLoading(isLoading) {
        set((state) => {
          state.isLoading = isLoading;
        });
      },
      setStatistics(statistics) {
        set((state) => {
          state.statistics = statistics;
        });
      },
      setError(isError) {
        set((state) => {
          state.isError = isError;
        });
      },
    })),
    {
      name: "Statistics Store",
      enabled: true,
    },
  ),
);
