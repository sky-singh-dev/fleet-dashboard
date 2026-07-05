import React, { useMemo } from "react";
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
import type { VehicleStatus, Vehicle } from "./types/vehicle"; // Assuming Vehicle type exists here
import { useVehicleStore } from "./store/vehicle";
import { VehicleDetailModal } from "./VehicleDetailModal";

// 1. Maintainable object dictionary mapping statuses to Tailwind configurations
const STATUS_MAP: Record<VehicleStatus, string> = {
  DELIVERED: "bg-emerald-50 text-emerald-600 border-emerald-200",
  IDLE: "bg-slate-100 text-slate-600 border-slate-200",
  "EN ROUTE": "bg-blue-50 text-blue-600 border-blue-200",
};

// 2. Base structural utility class applied uniformly across cells
const CELL_BASE_CLASS = "!py-3.5 !border-b !border-slate-100";

export default function VehicleTable() {
  const data = useVehicleStore((state) => state.vehicles);
  const isLoading = useVehicleStore((state) => state.isLoading);
  const isError = useVehicleStore((state) => state.isError);
  const setSelectedVehicle = useVehicleStore(
    (state) => state.setSelectedVehicle,
  );

  // 3. Centralized Column Definition Schema Configuration
  const columns = useMemo(
    () => [
      {
        id: "vehicle",
        label: "Vehicle",
        render: (row: Vehicle) => (
          <button
            onClick={() => setSelectedVehicle(row)}
            className="text-blue-600 font-semibold hover:underline cursor-pointer text-xs focus:outline-none"
          >
            {row.vehicleNumber}
          </button>
        ),
      },
      {
        id: "driver",
        label: "Driver",
        className: "!text-slate-700 !font-medium !text-xs",
        render: (row: Vehicle) => row.driverName,
      },
      {
        id: "status",
        label: "Status",
        render: (row: Vehicle) => (
          <span
            className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold border tracking-wide uppercase ${
              STATUS_MAP[row.status] || "bg-gray-100 text-gray-600"
            }`}
          >
            {row.status}
          </span>
        ),
      },
      {
        id: "speed",
        label: "Speed",
        render: (row: Vehicle) => (
          <span className="inline-block bg-slate-100 text-slate-800 text-[10px] font-extrabold px-1.5 py-0.5 rounded">
            {row.speed}
          </span>
        ),
      },
      {
        id: "destination",
        label: "Destination",
        className: "!text-slate-600 !text-xs max-w-[180px] truncate",
        render: (row: Vehicle) => row.destination,
      },
      {
        id: "eta",
        label: "ETA",
        className: "!text-slate-400 !text-xs",
        render: (row: Vehicle) => row.estimatedArrival,
      },
      {
        id: "lastUpdate",
        label: "Last Update",
        className: "!text-slate-600 !text-xs whitespace-nowrap",
        render: (row: Vehicle) => row.lastUpdated,
      },
      {
        id: "location",
        label: "Location",
        className: "!text-slate-500 !font-mono !text-[11px] whitespace-nowrap",
        render: (row: Vehicle) => row.location,
      },
    ],
    [setSelectedVehicle],
  );

  // Reusable sub-renderer for cleaner state fallbacks (Empty and Error views)
  const renderFeedbackRow = (content: React.ReactNode) => (
    <TableRow sx={{ minHeight: "400px" }}>
      <TableCell
        colSpan={columns.length}
        className="text-center !py-8 !text-slate-400 !text-xs italic"
      >
        {content}
      </TableCell>
    </TableRow>
  );

  return (
    <div className="relative">
      <TableContainer
        component={Paper}
        className="!shadow-none !border-0 font-sans"
        sx={{ position: "relative" }}
      >
        <Table className="min-w-full" size="small">
          {/* Loop over schemas dynamically to render headers */}
          <TableHead className="bg-slate-50/70">
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.id}
                  className="!text-slate-500 !font-bold !text-xs !py-3 !border-b !border-slate-100"
                >
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {/* Main Dynamic Telemetry Row Stream Mapping */}
            {data.map((row) => (
              <TableRow
                key={row.id}
                className="hover:bg-slate-50/50 transition-colors group"
              >
                {columns.map((col) => (
                  <TableCell
                    key={col.id}
                    className={`${CELL_BASE_CLASS} ${col.className || ""}`}
                  >
                    {col.render(row)}
                  </TableCell>
                ))}
              </TableRow>
            ))}

            {/* Empty fallback state handler */}
            {data.length === 0 &&
              !isError &&
              renderFeedbackRow(
                "No vehicles matching this status filter found.",
              )}

            {/* Error fallback state handler */}
            {isError &&
              renderFeedbackRow(
                <Alert severity="error" className="inline-flex">
                  This is an error while fetching vehicle data.
                </Alert>,
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
