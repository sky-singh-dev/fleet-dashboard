// src/types/vehicle.ts
export type VehicleStatus = "DELIVERED" | "IDLE" | "EN ROUTE";

export type VehicleData = {
  id: string;
  vehicleNumber: string;
  driverName: string;
  driverPhone: string;
  destination: string;
  currentLocation: CurrentLocation;

  lastUpdated: string;
  estimatedArrival: string;
  batteryLevel: number;
  fuelLevel: number;
};

export type VehicleRes = {
  status: string;
  speed: number;
} & VehicleData;

export type Vehicle = {
  status: VehicleStatus;
  speed: string;
  location: string; // Concatenated lat,lng for display
} & VehicleData;

export type WebSocketMessage = {
  timestamp: string;
  data: VehicleRes[];
  message: string;
  type: string;
};

export type CurrentLocation = {
  lat: number;
  lng: number;
};
