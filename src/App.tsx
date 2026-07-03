import { useCallback, useEffect } from "react";
import StatusFilter from "./StatusFilter";
import FleetStatistics from "./FleetStatistics";
import VehicleTable from "./VehicleTable";
import { fetchFleetData } from "./api/fleetApi";
import { useVehicleStore } from "./store/vehicle";
import { useStatisticsStore } from "./store/statistics";
import { fetchStatisticsData } from "./api/statisticsApi";
import WifiOutlinedIcon from "@mui/icons-material/WifiOutlined";
import { Divider } from "@mui/material";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import useWebSocket from "./hooks/useWebSoket";
import type { WebSocketMessage } from "./types/vehicle";
import { getTimeElapsedBetweenDates } from "./utils/date";

dayjs.extend(localizedFormat);

export default function App() {
  const setLoading = useVehicleStore((state) => state.setLoading);
  const setVehicles = useVehicleStore((state) => state.setVehicles);
  const setVehicleError = useVehicleStore((state) => state.setError);
  const setTimestamp = useVehicleStore((state) => state.setTimestamp);
  const selectedFilter = useVehicleStore((state) => state.selectedFilter);
  const setStatisticsLoading = useStatisticsStore((state) => state.setLoading);
  const setStatistics = useStatisticsStore((state) => state.setStatistics);
  const statistics = useStatisticsStore((state) => state.statistics);
  const setStatisticsError = useStatisticsStore((state) => state.setError);

  useWebSocket<WebSocketMessage>({
    url: "wss://case-study-26cf.onrender.com",
    onMessage: (data) => {
      //Updates every 3 minutes
      const lastUpdated = useVehicleStore.getState().timestamp;
      if (
        !lastUpdated ||
        getTimeElapsedBetweenDates(lastUpdated, data.timestamp, "minutes") > 3
      ) {
        console.log("Updating vehicle data received from web socket");
        setTimestamp(data.timestamp);
        setVehicles(data.data);
      }
    },
  });

  const getStatistics = useCallback(async () => {
    try {
      setStatisticsLoading(true);
      const statisticsData = await fetchStatisticsData();
      setStatistics(statisticsData);
    } catch (error) {
      setStatisticsError(true);
      console.error("Error fetching statistics data:", error);
    } finally {
      setStatisticsLoading(false);
    }
  }, [setStatistics, setStatisticsLoading, setStatisticsError]);

  const getFleetData = useCallback(async () => {
    try {
      setLoading(true);
      const fleetData = await fetchFleetData(selectedFilter);
      setVehicles(fleetData.data);
      setTimestamp(fleetData.timestamp);
    } catch (error) {
      setVehicleError(true);
      console.error("Error fetching fleet data:", error);
    } finally {
      setLoading(false);
    }
  }, [setLoading, selectedFilter, setVehicles, setTimestamp, setVehicleError]);

  useEffect(() => {
    getStatistics();
  }, [getStatistics]);

  useEffect(() => {
    getFleetData();
  }, [getFleetData]);

  return (
    <div className="min-h-screen bg-slate-50 p-6 flex-col md:flex-row flex gap-6 antialiased">
      {/* Sidebar Navigation Grid */}
      <aside className="w-full md:w-85 bg-white border border-slate-200 rounded-2xl p-4 flex flex-col gap-5 h-fit shadow-sm shrink-0">
        <div className="text-center py-2.5 text-[16px] text-green-600 border border-slate-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-2">
          <WifiOutlinedIcon className="w-4 h-4" />
          Live Updates Active
        </div>

        <StatusFilter />
        <Divider />
        <FleetStatistics />
      </aside>

      {/* Main Panel Content Window Viewport */}
      <main className="flex-1 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col h-fit">
        {/* Table Viewport Dynamic Header Controls */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 bg-white">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            Vehicles{" "}
            <span className="text-slate-600 font-medium text-sm">
              ({statistics?.total ?? 0})
            </span>
          </h2>
          <span className="text-[11px] px-2.5 py-0.5 bg-emerald-50 text-emerald-700 font-bold rounded-full border border-emerald-200 uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
            Live
          </span>
        </div>

        {/* The Live Data Grid Stream */}
        <div className="p-2 overflow-x-auto">
          <VehicleTable />
        </div>
      </main>
    </div>
  );
}
