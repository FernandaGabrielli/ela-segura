import { ArrowLeft, Phone, Trash2, User, Shield, Ambulance } from "lucide-react";
import { useState, useEffect } from "react";
import AddContactModal from "../components/AddContactModal"; 

interface Contact {
  id: string; // Alterado para string para bater com o UUID do backend
  name: string;
  phone: string;
  initial: string;
}

interface EmergencyContactsProps {
  onBack: () => void;
}

export default function EmergencyContacts({ onBack }: EmergencyContactsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. LISTAR: Busca os contatos reais no banco de dados
  const loadContacts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/sos/contatos", {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (!response.ok) throw new Error();
      const data = await response.json();
      
      // Formata os dados vindos do SQLite para o padrão do componente
      const formatted = data.map((c: any) => ({
        id: c.id,
        name: c.nome,
        phone: c.telefone,
        initial: c.nome.charAt(0).toUpperCase()
      }));
      setContacts(formatted);
    } catch (err) {
      console.error("Erro ao carregar contatos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  // 2. CRIAR: Envia o contato criado no Modal direto para o banco de dados
  const handleAddContact = async (newContact: { name: string; phone: string }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/sos/contatos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          nome: newContact.name,
          telefone: newContact.phone
        })
      });

      if (!response.ok) throw new Error();
      
      // Recarrega a lista atualizada vinda do servidor
      loadContacts();
      setIsModalOpen(false);
    } catch (err) {
      console.error("Erro ao adicionar contato:", err);
      alert("Não foi possível salvar o contato.");
    }
  };

  // 3. DELETAR: Remove do banco de dados usando o ID único
  const handleDeleteContact = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3000/api/sos/contatos/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (!response.ok) throw new Error();
      
      // Remove do estado local para dar feedback imediato
      setContacts((prev) => prev.filter((contact) => contact.id !== id));
    } catch (err) {
      console.error("Erro ao deletar contato:", err);
      alert("Não foi possível remover o contato.");
    }
  };

  return (
    <div className="w-full h-screen bg-[#fafafa] flex flex-col relative">
      <div className="px-5 py-6 flex-1 overflow-y-auto">
        
        {/* Botão Voltar */}
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-xl border border-gray-200 bg-white flex items-center justify-center mb-6 active:scale-95 transition-transform"
        >
          <ArrowLeft size={20} className="text-gray-600" />
        </button>

        {/* Título Principal */}
        <h1 className="text-2xl font-bold text-[#5d5fef] mb-6">
          Contatos Emergenciais
        </h1>

        {/* SEÇÃO 1: SERVIÇOS DE EMERGÊNCIA */}
        <div className="mb-8">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
            Serviços de Emergência
          </h3>
          
          <div className="space-y-3">
            <PublicServiceCard icon={<User size={20} className="text-pink-500" />} title="Central de Atendimento à Mulher" number="180" />
            <PublicServiceCard icon={<Shield size={20} className="text-pink-500" />} title="Polícia Militar" number="190" />
            <PublicServiceCard icon={<Ambulance size={20} className="text-pink-500" />} title="Samu" number="192" />
          </div>
        </div>

        {/* SEÇÃO 2: CONTATOS PESSOAIS DINÂMICOS */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Contatos Pessoais
            </h3>
            <button 
              onClick={() => setIsModalOpen(true)} 
              className="text-xs font-semibold text-[#5d5fef] hover:underline"
            >
              + Adicionar
            </button>
          </div>

          <div className="space-y-3">
            {loading ? (
              <p className="text-center text-xs text-gray-400 py-4 animate-pulse">Sincronizando sua agenda segura...</p>
            ) : contacts.length === 0 ? (
              <div className="text-center text-sm text-gray-400 py-6 bg-white border border-dashed rounded-2xl">
                Nenhum contato pessoal salvo.
              </div>
            ) : (
              contacts.map((contact) => (
                <PersonalContactCard 
                  key={contact.id}
                  initial={contact.initial} 
                  name={contact.name} 
                  phone={contact.phone}
                  onDelete={() => handleDeleteContact(contact.id)}
                />
              ))
            )}
          </div>
        </div>

      </div>

      {/* Modal de Adicionar Contato */}
      <AddContactModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddContact}
      />
    </div>
  );
}

function PublicServiceCard({ icon, title, number }: { icon: React.ReactNode; title: string; number: string }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center gap-4 shadow-sm">
      <div className="w-12 h-12 rounded-xl bg-pink-50 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="font-semibold text-gray-700 text-sm">{title}</h4>
        <p className="text-xs text-gray-400 mt-0.5">{number}</p>
      </div>
    </div>
  );
}

function PersonalContactCard({ initial, name, phone, onDelete }: { initial: string; name: string; phone: string; onDelete: () => void }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-[#f3efff] text-[#5d5fef] flex items-center justify-center font-bold text-lg shrink-0">
          {initial}
        </div>
        <div>
          <h4 className="font-semibold text-gray-700 text-sm">{name}</h4>
          <p className="text-xs text-gray-400 mt-0.5">{phone}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <a href={`tel:${phone.replace(/\D/g, "")}`} className="w-9 h-9 rounded-full bg-[#f3efff] text-[#5d5fef] flex items-center justify-center active:scale-95 transition-transform">
          <Phone size={16} />
        </a>
        <button onClick={onDelete} className="w-9 h-9 rounded-full bg-white text-red-500 flex items-center justify-center active:scale-95 transition-transform hover:bg-red-50">
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}