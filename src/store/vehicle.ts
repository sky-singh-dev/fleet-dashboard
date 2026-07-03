import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { Vehicle, VehicleRes } from "../types/vehicle";
import type { StatusFilterType } from "../StatusFilter";
import { normalizedVehicleData } from "../utils/vehicle";

type VehicleState = {
  isLoading: boolean;
  vehicles: Vehicle[];
  selectedFilter: StatusFilterType;
  selectedVehicle?: Vehicle;
  timestamp?: string;
  isError?: boolean;
};

type VehicleAction = {
  setLoading: (isLoading: boolean) => void;
  setVehicles: (vehicles: VehicleRes[]) => void;
  setSelectedFilter: (filter: StatusFilterType) => void;
  setSelectedVehicle: (vehicle?: Vehicle) => void;
  setTimestamp: (timestamp: string) => void;
  setError: (isError: boolean) => void;
};

const defaultState: VehicleState = {
  isLoading: false,
  vehicles: [],
  selectedFilter: "all",
  selectedVehicle: undefined,
  timestamp: undefined,
  isError: false,
};

export const useVehicleStore = create<VehicleState & VehicleAction>()(
  devtools(
    immer((set) => ({
      ...defaultState,
      setLoading(isLoading) {
        set((state) => {
          state.isLoading = isLoading;
        });
      },
      setVehicles(vehicles) {
        set((state) => {
          state.vehicles = normalizedVehicleData(vehicles);
        });
      },
      setSelectedFilter(filter) {
        set((state) => {
          state.selectedFilter = filter;
        });
      },
      setSelectedVehicle(vehicle) {
        set((state) => {
          state.selectedVehicle = vehicle;
        });
      },
      setTimestamp(timestamp) {
        set((state) => {
          state.timestamp = timestamp;
        });
      },
      setError(isError) {
        set((state) => {
          state.isError = isError;
        });
      },
    })),
    {
      name: "Vehicle Store",
      enabled: true,
    },
  ),
);
