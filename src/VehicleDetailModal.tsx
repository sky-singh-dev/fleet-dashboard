import { Dialog, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PersonIcon from "@mui/icons-material/Person";
import SpeedIcon from "@mui/icons-material/Speed";
import PhoneIcon from "@mui/icons-material/Phone";
import PlaceIcon from "@mui/icons-material/Place";
import NavigationIcon from "@mui/icons-material/Navigation";
import BatteryStdIcon from "@mui/icons-material/BatteryStd";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useVehicleStore } from "./store/vehicle";

function Card({
  name,
  value,
  icon,
  isStatus = false,
}: Readonly<{
  name: string;
  value?: string | number;
  icon: React.ReactNode;
  isStatus?: boolean;
}>) {
  return (
    <div className="bg-slate-50/80 border-l-[3.5px] border-blue-600 rounded-r-xl rounded-l-sm p-3.5 flex flex-col gap-2 min-h-[70px]">
      <div className="flex items-center gap-[2px] text-[10px] font-bold text-slate-400 tracking-wider uppercase">
        {icon}
        <span>{name}</span>
      </div>
      {isStatus ? (
        <span className="inline-flex items-center gap-1 bg-green-100/60 text-green-700 text-[10px] font-extrabold px-2 py-0.5 rounded-md border border-green-200 uppercase tracking-wide">
          <CheckCircleIcon className="!text-xs" />
          {value ?? "--"}
        </span>
      ) : (
        <span className="text-xs font-extrabold text-slate-900 whitespace-nowrap">
          {value ?? "--"}
        </span>
      )}
    </div>
  );
}

export function VehicleDetailModal() {
  const vehicle = useVehicleStore((state) => state.selectedVehicle);
  const setSelectedVehicle = useVehicleStore(
    (state) => state.setSelectedVehicle,
  );

  const open = Boolean(vehicle);

  const handleClose = () => {
    setSelectedVehicle(undefined);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          className:
            "!rounded-[24px] !p-2 !shadow-2xl border border-slate-100 font-sans max-w-[520px]",
        },
      }}
    >
      {/* Top Right Close Button */}
      <div className="absolute right-5 top-5 z-10">
        <IconButton
          onClick={handleClose}
          size="small"
          className="!bg-slate-50 hover:!bg-slate-100 !border !border-slate-100"
        >
          <CloseIcon className="!text-xs text-slate-500" />
        </IconButton>
      </div>

      <DialogContent className="!p-6">
        {/* Modal Main Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xl font-extrabold text-slate-900 tracking-tight">
            <LocalShippingIcon className="text-slate-800 !text-xl" />
            <span>{vehicle?.vehicleNumber}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-400 font-medium mt-1">
            <PersonIcon className="!text-sm text-slate-400" />
            <span>{vehicle?.driverName}</span>
            <span className="mx-1 text-slate-300">•</span>
            <span className="uppercase font-semibold tracking-wider text-[10px] text-slate-500">
              {vehicle?.status}
            </span>
          </div>
        </div>

        {/* 2-Column Info Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* 1. STATUS CARD */}
          <Card
            name="Status"
            value={vehicle?.status}
            icon={<NavigationIcon className="!text-xs rotate-45" />}
            isStatus
          />

          {/* 2. CURRENT SPEED CARD */}

          <Card
            name="Current Speed"
            value={vehicle?.speed}
            icon={<SpeedIcon className="!text-xs" />}
          />

          {/* 3. DRIVER CARD */}
          <Card
            name="Driver"
            value={vehicle?.driverName}
            icon={<PersonIcon className="!text-xs" />}
          />

          {/* 4. PHONE CARD */}
          <Card
            name="Phone"
            value={vehicle?.driverPhone}
            icon={<PhoneIcon className="!text-xs" />}
          />

          {/* 5. DESTINATION CARD */}

          <Card
            name="Destination"
            value={vehicle?.destination}
            icon={<PlaceIcon className="!text-xs" />}
          />

          {/* 6. LOCATION CARD (Coordinates with inner sub-container box) */}

          <Card
            name="Location"
            value={vehicle?.location}
            icon={<NavigationIcon className="!text-xs rotate-45" />}
          />

          {/* 7. BATTERY LEVEL CARD (With Red Progress Bar) */}
          <div className="bg-slate-50/80 border-l-[3.5px] border-blue-600 rounded-r-xl rounded-l-sm p-3.5 flex flex-col justify-between min-h-[76px]">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 tracking-wider uppercase">
              <BatteryStdIcon className="!text-[11px]" />
              <span>Battery Level</span>
            </div>
            <div className="mt-2 w-full">
              <span className="text-sm font-extrabold text-slate-900 block mb-1">
                {vehicle?.batteryLevel}%
              </span>
              <div className="w-full bg-slate-200/70 h-1 rounded-full overflow-hidden">
                <div
                  className="bg-red-500 h-full rounded-full"
                  style={{ width: `${vehicle?.batteryLevel}%` }}
                />
              </div>
            </div>
          </div>

          {/* 8. FUEL LEVEL CARD (With Orange Progress Bar) */}
          <div className="bg-slate-50/80 border-l-[3.5px] border-blue-600 rounded-r-xl rounded-l-sm p-3.5 flex flex-col justify-between min-h-[76px]">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 tracking-wider uppercase">
              <LocalGasStationIcon className="!text-[11px]" />
              <span>Fuel Level</span>
            </div>
            <div className="mt-2 w-full">
              <span className="text-sm font-extrabold text-slate-900 block mb-1">
                {vehicle?.fuelLevel}%
              </span>
              <div className="w-full bg-slate-200/70 h-1 rounded-full overflow-hidden">
                <div
                  className="bg-orange-500 h-full rounded-full"
                  style={{ width: `${vehicle?.fuelLevel}%` }}
                />
              </div>
            </div>
          </div>

          {/* 9. LAST UPDATED CARD */}
          {/* <div className="bg-slate-50/80 border-l-[3.5px] border-blue-600 rounded-r-xl rounded-l-sm p-3.5 flex flex-col justify-between min-h-[76px]">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 tracking-wider uppercase">
              <AccessTimeIcon className="!text-[11px]" />
              <span>Last Updated</span>
            </div>
            <span className="text-xs font-extrabold text-slate-900 mt-2 whitespace-nowrap">
              {vehicle?.lastUpdated}
            </span>
          </div> */}
          <Card
            name="Last Updated"
            value={vehicle?.lastUpdated}
            icon={<AccessTimeIcon className="!text-xs" />}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
