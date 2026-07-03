import type { StatusFilterType } from "../StatusFilter";
import type { VehicleRes } from "../types/vehicle";

type Response = {
  data: VehicleRes[];
  success: boolean;
  total: number;
  timestamp: string;
};

export const fetchFleetData = async (
  selectedFilter: StatusFilterType,
): Promise<Response> => {
  const filterParam =
    selectedFilter === "all" ? "" : `?status=${selectedFilter}`;
  const response = await fetch(
    `https://case-study-26cf.onrender.com/api/vehicles${filterParam}`,
  );

  if (!response.ok) {
    throw new Error(
      `Network response error: ${response.status} ${response.statusText}`,
    );
  }

  return await response.json();
};
