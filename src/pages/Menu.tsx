import { X, User, ShieldAlert, Phone, FileText, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { auth } from "../services/api";

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
  const [userData, setUserData] = useState<{ nome: string; email: string } | null>(null);

  useEffect(() => {
    async function loadMenuUser() {
      try {
        // Busca o token que você salvou no login/registro (geralmente sob a chave 'token')
        const token = localStorage.getItem('token'); 
        
        const response = await fetch('http://localhost:3000/api/auth/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/center',
            'Authorization': `Bearer ${token}` // Envia o token para passar pelo middleware 'autenticar' do backend
          }
        });

        if (!response.ok) throw new Error('Falha ao autenticar');

        const data = await response.json();
        setUserData(data);
      } catch (err) {
        console.error("Erro ao carregar dados resumidos no menu:", err);
      }
    }
    loadMenuUser();
  }, []);

  return (
    <div className="w-full h-screen bg-[#fafafa] px-5 py-6">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-xl font-bold text-[#5d5fef]">Menu</h1>
        <button onClick={onClose} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
          <X size={18} />
        </button>
      </div>

      <div className="bg-[#f4f1f8] rounded-xl p-4 flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-full bg-[#5d5fef] text-white font-semibold flex items-center justify-center">
          {userData?.nome ? userData.nome.charAt(0).toUpperCase() : "U"}
        </div>

        <div>
          <h2 className="font-semibold text-gray-700">
            {userData?.nome || "Carregando..."}
          </h2>
          <p className="text-sm text-gray-400">
            {userData?.email || ""}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <MenuButton icon={<User size={18} />} text="Perfil" onClick={onProfile} />
        <MenuButton icon={<ShieldAlert size={18} />} text="Reportar Incidente" onClick={onReport} />
        <MenuButton icon={<Phone size={18} />} text="Contatos Emergenciais" onClick={onContacts} />
        <MenuButton icon={<FileText size={18} />} text="Minhas Ocorrências" onClick={onReports} />
        <MenuButton icon={<LogOut size={18} />} text="Sair" onClick={onLogout} danger />
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
        danger ? "text-pink-500" : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      <div className="w-10 h-10 rounded-lg bg-[#f4f1f8] flex items-center justify-center">
        {icon}
      </div>
      <span className="font-medium">{text}</span>
    </button>
  );
}