import { MapPin, AlertTriangle, Shield } from "lucide-react";

interface BottomTabProps {
  currentScreen: "map" | "profile" | "checkin" | "other";
  onMap: () => void;
  onEmergency: () => void;
  onCheckIn: () => void;
}

export default function BottomTab({
  currentScreen,
  onMap,
  onEmergency,
  onCheckIn,
}: BottomTabProps) {
  return (
    <div className="h-20 bg-white border-t border-gray-200 flex items-center justify-around w-full">
      {/* Botão Mapa */}
      <button 
        onClick={onMap}
        className={`flex flex-col items-center transition-colors ${
          currentScreen === "map" ? "text-pink-500 font-medium" : "text-gray-400"
        }`}
      >
        <MapPin size={22} />
        <span className="text-xs mt-1">Mapa</span>
      </button>

      {/* Botão de Emergência (Centro) */}
      <button
        onClick={onEmergency}
        className="w-16 h-16 bg-pink-500 rounded-full text-white flex items-center justify-center -mt-8 shadow-lg active:scale-95 transition-transform"
      >
        <AlertTriangle size={28} />
      </button>

      {/* Botão Check-in */}
      <button
        onClick={onCheckIn}
        className={`flex flex-col items-center transition-colors ${
          currentScreen === "checkin" ? "text-pink-500 font-medium" : "text-gray-400"
        }`}
      >
        <Shield size={22} />
        <span className="text-xs mt-1">Check-in</span>
      </button>
    </div>
  );
}