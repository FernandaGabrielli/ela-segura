// Menu.tsx

import {
  X,
  User,
  ShieldAlert,
  Phone,
  FileText,
  LogOut,
} from "lucide-react";

interface MenuProps {
  onClose: () => void;
  onProfile: () => void;
  onReport: () => void;
  onContacts: () => void;
  onReports: () => void;
  onLogout: () => void;
}

export default function Menu({
  onClose,
  onProfile,
  onReport,
  onContacts,
  onReports,
  onLogout,
}: MenuProps) {
  return (
    <div className="w-full h-screen bg-[#fafafa] px-5 py-6">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-xl font-bold text-[#5d5fef]">
          Menu
        </h1>

        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
        >
          <X size={18} />
        </button>
      </div>

      <div className="bg-[#f4f1f8] rounded-xl p-4 flex items-center gap-4 mb-8">
        <img
          src="https://i.pravatar.cc/100?img=47"
          alt=""
          className="w-12 h-12 rounded-full"
        />

        <div>
          <h2 className="font-semibold text-gray-700">
            Camila Oliveira
          </h2>

          <p className="text-sm text-gray-400">
            camila@gmail.com
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <MenuButton
          icon={<User size={18} />}
          text="Perfil"
          onClick={onProfile}
        />

        <MenuButton
          icon={<ShieldAlert size={18} />}
          text="Reportar Incidente"
          onClick={onReport}
        />

        <MenuButton
          icon={<Phone size={18} />}
          text="Contatos Emergenciais"
          onClick={onContacts}
        />

        <MenuButton
          icon={<FileText size={18} />}
          text="Minhas Ocorrências"
          onClick={onReports}
        />

        <MenuButton
          icon={<LogOut size={18} />}
          text="Sair"
          onClick={onLogout}
          danger
        />
      </div>
    </div>
  );
}

function MenuButton({
  icon,
  text,
  onClick,
  danger,
}: {
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 p-4 rounded-xl transition ${
        danger
          ? "text-pink-500"
          : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      <div className="w-10 h-10 rounded-lg bg-[#f4f1f8] flex items-center justify-center">
        {icon}
      </div>

      <span className="font-medium">
        {text}
      </span>
    </button>
  );
}