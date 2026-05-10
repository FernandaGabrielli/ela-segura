// Profile.tsx

import {
  ArrowLeft,
  Mail,
  Phone,
  Lock,
  Pencil,
} from "lucide-react";

interface ProfileProps {
  onBack: () => void;
  onMenu: () => void;
}

export default function Profile({
  onBack,
  onMenu,
}: ProfileProps) {
  return (
    <div className="w-full h-screen bg-[#fafafa] flex flex-col">
      <div className="px-5 py-6 flex-1">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center"
          >
            <ArrowLeft size={20} />
          </button>

          <button
            onClick={onMenu}
            className="text-[#5d5fef] font-semibold"
          >
            Perfil
          </button>
        </div>

        <div className="flex flex-col items-center mb-8">
          <img
            src="https://i.pravatar.cc/150?img=47"
            alt="profile"
            className="w-28 h-28 rounded-full object-cover"
          />

          <h1 className="mt-4 text-2xl font-bold text-gray-700">
            Camila Oliveira
          </h1>

          <p className="text-green-500 text-sm mt-1">
            Conta Verificada
          </p>
        </div>

        <div className="space-y-5">
          <ProfileField
            icon={<Mail size={18} />}
            label="Email"
            value="camilaoliveira@gmail.com"
          />

          <ProfileField
            icon={<Phone size={18} />}
            label="Telefone"
            value="(81) 9 xxxx-xxxx"
          />

          <ProfileField
            icon={<Lock size={18} />}
            label="Senha"
            value="********"
          />
        </div>

        <button className="w-full bg-[#5d5fef] text-white py-4 rounded-xl font-semibold mt-10">
          Editar Perfil
        </button>
      </div>

      <BottomTab />
    </div>
  );
}

function ProfileField({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="border border-gray-200 rounded-xl p-4 bg-white">
      <p className="text-xs text-gray-400 mb-2">{label}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-gray-600">
          {icon}
          <span className="text-sm">{value}</span>
        </div>

        <button className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
          <Pencil size={14} className="text-pink-500" />
        </button>
      </div>
    </div>
  );
}

function BottomTab() {
  return (
    <div className="h-20 bg-white border-t border-gray-200 flex items-center justify-around">
      <button className="text-gray-400 text-sm">
        Mapa
      </button>

      <button className="w-16 h-16 bg-pink-500 rounded-full text-white -mt-8">
        !
      </button>

      <button className="text-gray-400 text-sm">
        Check-in
      </button>
    </div>
  );
}