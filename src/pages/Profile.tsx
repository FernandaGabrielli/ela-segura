import { ArrowLeft, Mail, Phone, Lock, Pencil, Menu, Check } from "lucide-react";
import { useState } from "react";
import BottomTab from "../components/Bottomtab";

interface ProfileProps {
  onBack: () => void;
  onMenu: () => void;
  onEmergency: () => void;
  onCheckIn: () => void;
}

export default function Profile({ onBack, onMenu, onEmergency, onCheckIn }: ProfileProps) {
  return (
    <div className="w-full h-screen bg-[#fafafa] flex flex-col">
      <div className="px-5 py-6 flex-1 overflow-auto">
        <div className="flex items-center justify-between mb-8">
          <button onClick={onBack} className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center active:scale-95 transition-transform">
            <ArrowLeft size={20} />
          </button>
          <button onClick={onMenu} className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center active:scale-95 transition-transform">
            <Menu size={20} />
          </button>
        </div>

        <div className="flex flex-col items-center mb-8">
          <img src="https://i.pravatar.cc/150?img=47" alt="profile" className="w-28 h-28 rounded-full object-cover" />
          <h1 className="mt-4 text-2xl font-bold text-gray-700">Camila Oliveira</h1>
          <p className="text-green-500 text-sm mt-1">Conta Verificada</p>
        </div>

        <div className="space-y-5">
          <ProfileField icon={<Mail size={18} />} label="Email" initialValue="camilaoliveira@gmail.com" />
          <ProfileField icon={<Phone size={18} />} label="Telefone" initialValue="(81) 9 1234-5678" />
          <ProfileField icon={<Lock size={18} />} label="Senha" initialValue="********" isPassword />
        </div>

        <button onClick={onBack} className="w-full bg-[#5d5fef] text-white py-4 rounded-xl font-semibold mt-10 active:scale-[0.99] transition-transform">
          Voltar ao Mapa
        </button>
      </div>

      <BottomTab 
        currentScreen="profile"
        onMap={onBack} 
        onEmergency={onEmergency}
        onCheckIn={onCheckIn}
      />
    </div>
  );
}

function ProfileField({ 
  icon, 
  label, 
  initialValue, 
  isPassword 
}: { 
  icon: React.ReactNode; 
  label: string; 
  initialValue: string;
  isPassword?: boolean;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);

  return (
    <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-xs">
      <p className="text-xs text-gray-400 mb-2">{label}</p>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-gray-600 flex-1">
          {icon}
          {isEditing ? (
            <input
              type={isPassword ? "password" : "text"}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="text-sm bg-gray-50 border border-gray-200 rounded-md px-2 py-1 w-full outline-none focus:border-purple-400"
              autoFocus
            />
          ) : (
            <span className="text-sm">{value}</span>
          )}
        </div>
        
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all active:scale-95 ${
            isEditing ? "bg-green-100 text-green-600" : "bg-pink-100 text-pink-500"
          }`}
        >
          {isEditing ? <Check size={16} /> : <Pencil size={14} />}
        </button>
      </div>
    </div>
  );
}