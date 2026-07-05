import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import BoltIcon from "@mui/icons-material/Bolt";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useStatisticsStore } from "./store/statistics";
import { Alert, Skeleton } from "@mui/material";
import dayjs from "dayjs";
import { useMemo } from "react";
import { getFormattedTimeElapsed } from "./utils/date";
import { useVehicleStore } from "./store/vehicle";

function StatisticCard({
  label,
  value,
  icon,
  isLoading,
}: Readonly<{
  label: string;
  value: number | string;
  icon: React.ReactNode;
  isLoading: boolean;
}>) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-3 flex flex-col items-center justify-center text-center shadow-sm">
      {isLoading ? (
        <Skeleton variant="text" width={40} sx={{ fontSize: "1rem", mb: 1 }} />
      ) : (
        <span className="text-2xl font-extrabold text-slate-900 leading-none mb-1">
          {value}
        </span>
      )}
      <div className="flex items-center justify-center gap-[2px] text-[12px] text-slate-400 uppercase">
        {icon}
        <span>{label}</span>
      </div>
    </div>
  );
}

export default function FleetStatistics() {
  const stats = useStatisticsStore((state) => state.statistics);
  const isLoading = useStatisticsStore((state) => state.isLoading);
  const isError = useStatisticsStore((state) => state.isError);
  const lastUpdated = useVehicleStore((state) => state.timestamp);

  const lastUpdateTime = useMemo(() => {
    if (!lastUpdated) return "--";
    return getFormattedTimeElapsed(lastUpdated);
  }, [lastUpdated]);

  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="flex items-center gap-2 text-slate-900 font-bold text-sm mb-3">
        <AssessmentOutlinedIcon className="text-slate-700 !text-lg" />
        <span>Fleet Statistics</span>
      </div>

      {isError && (
        <div className="mb-3">
          <Alert severity="error" className="!text-xs !py-1 !px-2">
            Error fetching statistics data.
          </Alert>
        </div>
      )}

      {/* 2x2 Grid Layout for Metrics */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        {/* Total Fleet Item */}
        <StatisticCard
          label="Total Fleet"
          value={stats?.total ?? 0}
          icon={<GroupOutlinedIcon fontSize="small" />}
          isLoading={isLoading}
        />

        {/* Avg Speed Item */}

        <StatisticCard
          label="Avg Speed"
          value={stats?.average_speed ?? 0}
          icon={<ShowChartIcon fontSize="small" />}
          isLoading={isLoading}
        />

        {/* Moving Item */}
        <StatisticCard
          label="Moving"
          value={stats?.en_route ?? 0}
          icon={<BoltIcon fontSize="small" />}
          isLoading={isLoading}
        />

        {/* Last Update Item */}
        <StatisticCard
          label="Last Update"
          value={stats?.timestamp ? dayjs(stats.timestamp).format("LT") : "--"}
          icon={<AccessTimeIcon fontSize="small" />}
          isLoading={isLoading}
        />
      </div>

      {/* Footer Banner - Dynamic Time Ticker */}
      <div className="flex items-center gap-1.5 px-2.5 py-2 bg-slate-50 rounded-lg border border-slate-100 text-[10px] font-medium text-slate-500">
        <InfoOutlinedIcon className="!text-xs text-slate-400 shrink-0" />
        {isLoading ? (
          <Skeleton variant="text" width={100} sx={{ fontSize: "0.625rem" }} />
        ) : (
          <span className="truncate">
            Updated {lastUpdateTime} • Next update in ~{3} minutes
          </span>
        )}
      </div>
    </div>
  );
}
