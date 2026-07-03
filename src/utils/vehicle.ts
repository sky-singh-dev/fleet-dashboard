import dayjs from "dayjs";
import type { Vehicle, VehicleRes, VehicleStatus } from "../types/vehicle";

export function normalizedVehicleData(rawVehicles: VehicleRes[]): Vehicle[] {
  const vehicles: Vehicle[] = rawVehicles.map((v) => {
    // Standardize status strings to uppercase to match our TypeScript union types safely
    const normalizedStatus = (
      v.status || "IDLE"
    ).toUpperCase() as VehicleStatus;

    return {
      ...v,
      status: normalizedStatus,
      speed: v.speed ? `${v.speed} mph` : "0 mph",
      destination: v.destination || "No Destination Assigned",
      estimatedArrival: v.estimatedArrival
        ? dayjs(v.estimatedArrival).format("L LT")
        : "--",
      lastUpdated: v.lastUpdated ? dayjs(v.lastUpdated).format("L LT") : "--",
      location: `${v.currentLocation.lat.toFixed(6) || 0}, ${v.currentLocation.lng.toFixed(6) || 0}`,
      batteryLevel: typeof v.batteryLevel === "number" ? v.batteryLevel : 100,
      fuelLevel: typeof v.fuelLevel === "number" ? v.fuelLevel : 100,
    };
  });
  return vehicles;
}
