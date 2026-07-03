import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Backdrop,
  Alert,
} from "@mui/material";
import type { VehicleStatus } from "./types/vehicle";
import { useVehicleStore } from "./store/vehicle";
import { VehicleDetailModal } from "./VehicleDetailModal";

export default function VehicleTable() {
  const data = useVehicleStore((state) => state.vehicles);
  const isLoading = useVehicleStore((state) => state.isLoading);
  const isError = useVehicleStore((state) => state.isError);
  const setSelectedVehicle = useVehicleStore(
    (state) => state.setSelectedVehicle,
  );

  // Dynamic style engine mapping for status pills
  const getStatusStyles = (status: VehicleStatus) => {
    switch (status) {
      case "DELIVERED":
        return "bg-emerald-50 text-emerald-600 border-emerald-200";
      case "IDLE":
        return "bg-slate-100 text-slate-600 border-slate-200";
      case "EN ROUTE":
        return "bg-blue-50 text-blue-600 border-blue-200";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="relative">
      <TableContainer
        component={Paper}
        className="!shadow-none !border-0 font-sans"
        sx={{ position: "relative" }}
      >
        <Table className="min-w-full" size="small">
          {/* Table Header Row Layout */}
          <TableHead className="bg-slate-50/70">
            <TableRow>
              {[
                "Vehicle",
                "Driver",
                "Status",
                "Speed",
                "Destination",
                "ETA",
                "Last Update",
                "Location",
              ].map((head) => (
                <TableCell
                  key={head}
                  className="!text-slate-500 !font-bold !text-xs !py-3 !border-b !border-slate-100"
                >
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* Table Content Body */}
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.id}
                className="hover:bg-slate-50/50 transition-colors group"
              >
                {/* Vehicle Link ID */}
                <TableCell className="!py-3.5 !border-b !border-slate-100">
                  <button
                    onClick={() => setSelectedVehicle(row)}
                    className="text-blue-600 font-semibold hover:underline cursor-pointer text-xs focus:outline-none"
                  >
                    {row.vehicleNumber}
                  </button>
                </TableCell>

                {/* Driver Name */}
                <TableCell className="!text-slate-700 !font-medium !text-xs !py-3.5 !border-b !border-slate-100">
                  {row.driverName}
                </TableCell>

                {/* Status Pill Badge */}
                <TableCell className="!py-3.5 !border-b !border-slate-100">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold border tracking-wide uppercase ${getStatusStyles(row.status)}`}
                  >
                    {row.status}
                  </span>
                </TableCell>

                {/* Speed Metric Capsule */}
                <TableCell className="!py-3.5 !border-b !border-slate-100">
                  <span className="inline-block bg-slate-100 text-slate-800 text-[10px] font-extrabold px-1.5 py-0.5 rounded">
                    {row.speed}
                  </span>
                </TableCell>

                {/* Destination */}
                <TableCell className="!text-slate-600 !text-xs !py-3.5 !border-b !border-slate-100 max-w-[180px] truncate">
                  {row.destination}
                </TableCell>

                {/* ETA */}
                <TableCell className="!text-slate-400 !text-xs !py-3.5 !border-b !border-slate-100">
                  {row.estimatedArrival}
                </TableCell>

                {/* Last Update Date/Time */}
                <TableCell className="!text-slate-600 !text-xs !py-3.5 !border-b !border-slate-100 whitespace-nowrap">
                  {row.lastUpdated}
                </TableCell>

                {/* GPS Coordinates Geolocation */}
                <TableCell className="!text-slate-500 !font-mono !text-[11px] !py-3.5 !border-b !border-slate-100 whitespace-nowrap">
                  {row.location}
                </TableCell>
              </TableRow>
            ))}

            {/* Empty fallback state handler */}
            {data.length === 0 && !isError && (
              <TableRow sx={{ minHeight: "400px" }}>
                <TableCell
                  colSpan={8}
                  className="text-center !py-8 !text-slate-400 !text-xs italic"
                >
                  No vehicles matching this status filter found.
                </TableCell>
              </TableRow>
            )}

            {/* Empty fallback state handler */}
            {isError && (
              <TableRow sx={{ minHeight: "400px" }}>
                <TableCell
                  colSpan={8}
                  className="text-center !py-8 !text-slate-400 !text-xs italic"
                >
                  <Alert severity="error">
                    This is an error while fetching vehicle data.
                  </Alert>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Backdrop
        sx={(theme) => ({
          position: "absolute",
          color: "#fff",
          zIndex: theme.zIndex.drawer + 1,
          backgroundColor: "rgba(255, 255, 255, 0.6)",
        })}
        open={isLoading}
      >
        <CircularProgress color="primary" />
      </Backdrop>
      <VehicleDetailModal />
    </div>
  );
}
