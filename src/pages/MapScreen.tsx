import {
    AlertTriangle,
    List,
    ShieldAlert,
    MapPinned,
    Shield,
    LocateFixed,
  } from "lucide-react";
  
  interface MapScreenProps {
    onEmergency: () => void;
    onCheckin: () => void;
  }
  
  export default function MapScreen({
    onEmergency,
    onCheckin,
  }: MapScreenProps) {
    return (
      <div className="w-full h-screen bg-[#efefef] relative overflow-hidden flex flex-col">
        {/* Fake map */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[#ececec]" />
  
          {/* river */}
          <div className="absolute top-0 right-20 w-[2px] h-full bg-[#86c7ff]" />
  
          {/* streets */}
          <div className="absolute inset-0 opacity-70">
            {[...Array(18)].map((_, i) => (
              <div
                key={i}
                className="absolute h-[2px] bg-white rounded-full"
                style={{
                  width: `${120 + i * 8}px`,
                  left: `${(i * 17) % 90}%`,
                  top: `${(i * 5.5) % 100}%`,
                  transform: `rotate(${i % 2 === 0 ? -32 : 28}deg)`,
                }}
              />
            ))}
          </div>
        </div>
  
        {/* top actions */}
        <div className="relative z-10 px-6 pt-8">
          <button className="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center">
            <List className="text-[#6d42f8]" size={24} />
          </button>
  
          <div className="mt-5 w-full bg-[#ff2f5e] rounded-2xl py-4 flex items-center justify-center gap-3 shadow-lg">
            <AlertTriangle className="text-white" size={20} />
            <span className="text-white font-semibold text-[15px]">
              Cuidado! Área de risco próxima
            </span>
          </div>
        </div>
  
        {/* risk markers */}
        <RiskMarker
          color="bg-red-500"
          ring="bg-red-400/40"
          className="top-[28%] left-[24%]"
        />
  
        <RiskMarker
          color="bg-yellow-400"
          ring="bg-yellow-300/40"
          className="top-[35%] right-[16%]"
        />
  
        <RiskMarker
          color="bg-pink-400"
          ring="bg-pink-300/40"
          className="top-[58%] left-[35%]"
        />
  
        {/* legend */}
        <div className="absolute left-5 bottom-28 bg-white/90 backdrop-blur-md rounded-3xl p-4 shadow-lg z-10 w-32">
          <h3 className="text-[11px] tracking-wide text-gray-500 mb-3 uppercase">
            Nível de Risco
          </h3>
  
          <div className="space-y-2 text-sm">
            <LegendItem color="bg-red-500" label="Alto" />
            <LegendItem color="bg-pink-500" label="Médio" />
            <LegendItem color="bg-yellow-400" label="Baixo" />
          </div>
        </div>
  
        {/* gps */}
        <button className="absolute right-5 bottom-28 w-14 h-14 rounded-2xl bg-white shadow-lg flex items-center justify-center z-10">
          <LocateFixed className="text-[#6d42f8]" size={24} />
        </button>
  
        {/* bottom tab */}
        <div className="mt-auto relative z-10 h-24 bg-white border-t border-[#ececec] flex items-center justify-around px-6">
          <TabItem
            icon={<MapPinned size={23} />}
            label="Mapa"
            active
          />
  
          <button
            onClick={onEmergency}
            className="w-20 h-20 rounded-full bg-[#ff2f5e] flex items-center justify-center shadow-2xl -mt-12"
          >
            <ShieldAlert size={34} className="text-white" />
          </button>
  
          <TabItem
            icon={<Shield size={23} />}
            label="Check-in"
            onClick={onCheckin}
          />
        </div>
      </div>
    );
  }
  
  function RiskMarker({
    color,
    ring,
    className,
  }: {
    color: string;
    ring: string;
    className: string;
  }) {
    return (
      <div className={`absolute ${className}`}>
        <div className={`w-24 h-24 rounded-full ${ring} flex items-center justify-center`}>
          <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center`}>
            <div className="w-3 h-3 rounded-full border-2 border-white" />
          </div>
        </div>
      </div>
    );
  }
  
  function LegendItem({
    color,
    label,
  }: {
    color: string;
    label: string;
  }) {
    return (
      <div className="flex items-center gap-3">
        <div className={`w-3 h-3 rounded-full ${color}`} />
        <span className="text-sm text-gray-700">{label}</span>
      </div>
    );
  }
  
  function TabItem({
    icon,
    label,
    active,
    onClick,
  }: {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    onClick?: () => void;
  }) {
    return (
      <button
        onClick={onClick}
        className={`flex flex-col items-center gap-1 ${
          active ? "text-[#6d42f8]" : "text-gray-400"
        }`}
      >
        {icon}
  
        <span className="text-sm font-medium">{label}</span>
  
        {active && (
          <div className="w-6 h-[3px] rounded-full bg-[#6d42f8]" />
        )}
      </button>
    );
  }