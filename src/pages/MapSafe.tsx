import { AlertTriangle, Target, List } from "lucide-react";
import BottomTab from "../components/Bottomtab";

interface MapSafeProps {
  onMenu: () => void;
  onEmergency: () => void;
  onCheckIn: () => void;
  onProfile: () => void;
}

export default function MapSafe({ onMenu, onEmergency, onCheckIn, onProfile }: MapSafeProps) {
  return (
    <div className="relative h-screen w-full bg-gray-100 flex flex-col justify-between overflow-hidden">
      
      {/* 1. MAP BACKGROUND STUB */}
      <div className="absolute inset-0 z-0 bg-[#E5E5E5]">
        <div className="absolute top-[20%] left-[-10%] w-[120%] h-2 bg-white rotate-12" />
        <div className="absolute top-[40%] left-[-10%] w-[120%] h-12 bg-white -rotate-12 flex items-center justify-center">
          <span className="text-[10px] text-gray-400 font-medium tracking-wider uppercase">
            Jl. Raya Yeh Gangga
          </span>
        </div>
        <div className="absolute top-[50%] left-[60%] w-2 h-[50%] bg-white rotate-12" />
        <div className="absolute top-0 left-[30%] w-2 h-full bg-white rotate-45" />
        <div className="absolute bottom-[12%] right-[10%] w-32 h-2 bg-white -rotate-12" />

        {/* Zonas de Risco */}
        <div className="absolute top-[25%] left-[28%] flex items-center justify-center">
          <div className="absolute w-24 h-24 bg-red-500/20 rounded-full" />
          <div className="absolute w-14 h-14 bg-red-500/30 rounded-full" />
          <div className="w-2 h-2 bg-red-600 rounded-full border border-white" />
        </div>

        <div className="absolute top-[50%] left-[43%] flex items-center justify-center">
          <div className="absolute w-20 h-20 bg-pink-500/20 rounded-full" />
          <div className="absolute w-12 h-12 bg-pink-500/30 rounded-full" />
          <div className="w-2 h-2 bg-pink-600 rounded-full border border-white" />
        </div>

        <div className="absolute top-[28%] right-[22%] flex items-center justify-center">
          <div className="absolute w-16 h-16 bg-amber-400/20 rounded-full" />
          <div className="absolute w-10 h-10 bg-amber-400/30 rounded-full" />
          <div className="w-2 h-2 bg-amber-500 rounded-full border border-white" />
        </div>
      </div>

      {/* 2. TOP OVERLAYS (Menu e Alerta) */}
      <div className="absolute top-0 left-0 right-0 z-10 p-6 flex flex-col gap-4">
        <button 
          onClick={onMenu}
          className="w-12 h-12 bg-white rounded-2xl shadow-md flex items-center justify-center active:scale-95 transition-transform"
        >
          <List size={22} className="text-purple-600" />
        </button>

        <div className="w-full bg-[#FF3B5C] text-white px-5 py-3.5 rounded-2xl shadow-lg flex items-center gap-3 mt-2">
          <AlertTriangle size={18} className="shrink-0" />
          <span className="font-medium text-sm">Cuidado! Área de risco proxima</span>
        </div>
      </div>

      {/* 3. FLOATING WIDGETS (Legenda e Target) */}
      <div className="absolute bottom-24 left-6 right-6 z-10 flex items-end justify-between">
        <div className="bg-white p-5 rounded-3xl shadow-xl max-w-[140px]">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-3">Nível de Risco</span>
          <div className="space-y-2.5">
            <div className="flex items-center gap-2.5"><span className="w-3 h-3 bg-red-600 rounded-full" /><span className="text-xs font-medium text-gray-600">Alto</span></div>
            <div className="flex items-center gap-2.5"><span className="w-3 h-3 bg-pink-500 rounded-full" /><span className="text-xs font-medium text-gray-600">Médio</span></div>
            <div className="flex items-center gap-2.5"><span className="w-3 h-3 bg-amber-400 rounded-full" /><span className="text-xs font-medium text-gray-600">Baixo</span></div>
          </div>
        </div>

        <button 
          onClick={onProfile}
          className="w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-purple-600 active:scale-95 transition-transform"
        >
          <Target size={22} />
        </button>
      </div>

      {/* 4. BOTTOM NAVIGATION */}
      <div className="mt-auto w-full z-10">
        <BottomTab 
          currentScreen="map"
          onMap={() => {}} 
          onEmergency={onEmergency}
          onCheckIn={onCheckIn}
        />
      </div>
    </div>
  );
}