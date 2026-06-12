import { ArrowLeft, Mail, Phone, Lock, Pencil, Menu, Check, User } from "lucide-react";
import { useState, useEffect } from "react";
import BottomTab from "../components/Bottomtab";
import { auth } from "../services/api"; // Certifique-se de que o caminho do seu arquivo api está correto

interface ProfileProps {
  onBack: () => void;
  onMenu: () => void;
  onEmergency: () => void;
  onCheckIn: () => void;
}

interface UserData {
  nome: string;
  email: string;
  telefone: string;
}

export default function Profile({ onBack, onMenu, onEmergency, onCheckIn }: ProfileProps) {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

    // Busca os dados do backend ao montar a tela
  useEffect(() => {
    async function loadProfile() {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/api/auth/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Erro');
        const data = await response.json();
        setUser(data);
      } catch (err) {
        console.error("Erro ao carregar perfil:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  // Envia a atualização do campo para o banco de dados
  const handleUpdateField = async (key: keyof UserData, newValue: string) => {
    if (!user) return;
    try {
      const token = localStorage.getItem('token');
      const updatedData = { ...user, [key]: newValue };

      // Dispara a rota PUT /auth/me mapeada no backend
      const response = await fetch('http://localhost:3000/api/auth/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          nome: updatedData.nome,
          telefone: updatedData.telefone
        })
      });

      if (!response.ok) throw new Error('Erro ao salvar');

      const data = await response.json();
      setUser(data); // Atualiza o estado da tela com os dados novos vindos do SQLite
    } catch (err) {
      console.error(`Erro ao atualizar ${key}:`, err);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-screen bg-[#fafafa] flex items-center justify-center">
        <p className="text-gray-500 font-medium animate-pulse">Carregando dados do perfil...</p>
      </div>
    );
  }

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
          <div className="w-28 h-28 rounded-full bg-purple-200 text-[#5d5fef] font-bold text-3xl flex items-center justify-center shadow-sm">
            {user?.nome ? user.nome.charAt(0).toUpperCase() : "U"}
          </div>
          <h1 className="mt-4 text-2xl font-bold text-gray-700">{user?.nome || "Usuária"}</h1>
          <p className="text-green-500 text-sm mt-1">Conta Verificada</p>
        </div>

        <div className="space-y-5">
          <ProfileField 
            icon={<User size={18} />} 
            label="Nome Completo" 
            initialValue={user?.nome || ""} 
            onSave={(val) => handleUpdateField("nome", val)}
          />
          <ProfileField 
            icon={<Mail size={18} />} 
            label="Email" 
            initialValue={user?.email || ""} 
            disabledField // E-mail geralmente não se altera diretamente por segurança
          />
          <ProfileField 
            icon={<Phone size={18} />} 
            label="Telefone" 
            initialValue={user?.telefone || "Não cadastrado"} 
            onSave={(val) => handleUpdateField("telefone", val)}
          />
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
  disabledField,
  onSave 
}: { 
  icon: React.ReactNode; 
  label: string; 
  initialValue: string;
  disabledField?: boolean;
  onSave?: (newValue: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);

  // Sincroniza se o valor inicial mudar após a requisição assíncrona
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const toggleEdit = () => {
    if (isEditing && onSave && value !== initialValue) {
      onSave(value);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-xs">
      <p className="text-xs text-gray-400 mb-2">{label}</p>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-gray-600 flex-1">
          {icon}
          {isEditing ? (
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="text-sm bg-gray-50 border border-gray-200 rounded-md px-2 py-1 w-full outline-none focus:border-purple-400"
              autoFocus
            />
          ) : (
            <span className="text-sm font-medium text-gray-700">{value}</span>
          )}
        </div>
        
        {!disabledField && (
          <button 
            onClick={toggleEdit}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all active:scale-95 ${
              isEditing ? "bg-green-100 text-green-600" : "bg-pink-100 text-pink-500"
            }`}
          >
            {isEditing ? <Check size={16} /> : <Pencil size={14} />}
          </button>
        )}
      </div>
    </div>
  );
}