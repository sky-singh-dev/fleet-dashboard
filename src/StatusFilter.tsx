import TuneIcon from "@mui/icons-material/Tune";
import { useVehicleStore } from "./store/vehicle";
import { useStatisticsStore } from "./store/statistics";
import { Alert, Skeleton } from "@mui/material";

// Define the strict types for our possible filters
export type StatusFilterType = "all" | "idle" | "en_route" | "delivered";

type FilterOption = {
  id: StatusFilterType;
  label: string;
  count: number;
  dotClass: string; // Tailwind color matching the dashboard dots
};

export default function StatusFilter() {
  const selectedFilter = useVehicleStore((state) => state.selectedFilter);
  const setSelectedFilter = useVehicleStore((state) => state.setSelectedFilter);
  const statistics = useStatisticsStore((state) => state.statistics);
  const isLoading = useStatisticsStore((state) => state.isLoading);
  const isError = useStatisticsStore((state) => state.isError);

  // Config array matching your exact dashboard UI items
  const filterOptions: FilterOption[] = [
    {
      id: "all",
      label: "All",
      count: statistics ? statistics.total : 0,
      dotClass: "bg-blue-500",
    },
    {
      id: "idle",
      label: "Idle",
      count: statistics ? statistics.idle : 0,
      dotClass: "bg-gray-400",
    },
    {
      id: "en_route",
      label: "En Route",
      count: statistics ? statistics.en_route : 0,
      dotClass: "bg-sky-400",
    },
    {
      id: "delivered",
      label: "Delivered",
      count: statistics ? statistics.delivered : 0,
      dotClass: "bg-green-500",
    },
  ];

  return (
    <div className="w-full">
      {/* Header Label with Icon */}
      <div className="flex items-center gap-2 text-slate-900 font-bold text-sm mb-3">
        <TuneIcon className="text-slate-700 !text-lg" />
        <span>Filter by Status</span>
      </div>
      {isError && (
        <div className="mb-3">
          <Alert severity="error" className="!text-xs !py-1 !px-2">
            Error fetching statistics data.
          </Alert>
        </div>
      )}
      {/* 2-Column Grid for Filter Pills */}
      <div className="grid grid-cols-2 gap-2">
        {filterOptions.map((option) => {
          const isActive = selectedFilter === option.id;

          return (
            <button
              key={option.id}
              onClick={() => setSelectedFilter(option.id)}
              className={`
                flex items-center gap-2 px-3 py-2.5 rounded-lg border text-xs font-medium transition-all duration-150 cursor-pointer w-full
                ${
                  isActive
                    ? "border-blue-600 bg-blue-50/40 text-blue-600 font-semibold shadow-sm"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                }
              `}
            >
              {/* Status Dot Indicator */}
              <span
                className={`w-2 h-2 rounded-full shrink-0 ${option.dotClass}`}
              />

              {/* Status Label & Count formatted exactly like the mockup */}
              <span className="truncate">
                {option.label}{" "}
                <span
                  className={
                    isActive
                      ? "text-blue-600 font-bold ml-1"
                      : "text-slate-900 font-bold ml-1"
                  }
                >
                  ({" "}
                  {isLoading ? (
                    <Skeleton
                      variant="text"
                      width={20}
                      sx={{ fontSize: "1rem", display: "inline-block" }}
                    />
                  ) : (
                    option.count
                  )}
                  )
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
