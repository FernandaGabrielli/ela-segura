import { useState } from "react";
import { ArrowLeft, Check, MapPin, Clock3, Users, Navigation } from "lucide-react";
import BottomTab from "../components/Bottomtab";

interface CheckInProps {
  onBack: () => void;
  onConfirm: () => void;
  onEmergency: () => void;
}

export default function CheckIn({ onBack, onConfirm, onEmergency }: CheckInProps) {
  // 1. Estados dinâmicos para os campos preenchíveis
  const [destination, setDestination] = useState("");
  const [selectedTime, setSelectedType] = useState("1 hora");
  const [selectedContacts, setSelectedContacts] = useState<number[]>([2]); // João (ID 2) começa selecionado

  // Lista fixa de contatos para simulação
  const contactList = [
    { id: 1, name: "Mãe", phone: "(81) 9 8888-7777" },
    { id: 2, name: "João", phone: "(81) 9 1234-6789" },
  ];

  const times = ["15 min", "30 min", "1 hora", "2 horas"];

    // Alterna a seleção de contatos (permite selecionar múltiplos)
    const toggleContact = (id: number) => {
    setSelectedContacts((prev) =>
        prev.includes(id) 
        ? prev.filter((contactId) => contactId !== id) // Corrigido para contactId aqui
        : [...prev, id]
    );
    };

  const handleUseCurrentLocation = () => {
    setDestination("Minha localização atual");
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col justify-between">
      <div className="flex-1 px-6 pt-12 pb-6 overflow-auto">
        
        {/* Header */}
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="w-10 h-10 rounded-xl border bg-white flex items-center justify-center active:scale-95 transition-transform">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-indigo-500">Check-in de Segurança</h1>
        </div>
        <p className="text-gray-400 mt-4">Avise seus contatos quando estiver a caminho de um local</p>

        {/* Destino (Input Dinâmico) */}
        <div className="bg-white border border-gray-100 rounded-3xl p-5 mt-5 mb-5 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <MapPin size={18} className="text-purple-500" />
            <span className="font-medium text-gray-700">Local de Destino</span>
          </div>
          <input 
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Buscar endereço..." 
            className="w-full bg-gray-100 rounded-xl p-4 outline-none text-sm text-gray-700 focus:bg-gray-50 border border-transparent focus:border-purple-300 transition-all" 
          />
          <button 
            onClick={handleUseCurrentLocation}
            className="flex items-center gap-2 mt-4 text-sm text-gray-500 hover:text-purple-500 active:scale-95 transition-transform"
          >
            <Navigation size={16} /> Usar localização atual
          </button>
        </div>

        {/* Contatos (Lista Dinâmica com cliques) */}
        <div className="bg-white border border-gray-100 rounded-3xl p-5 mb-5 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <Users size={18} className="text-purple-500" />
            <span className="font-medium text-gray-700">Contatos</span>
          </div>
          <div className="space-y-3">
            {contactList.map((contact) => (
              <Contact
                key={contact.id}
                name={contact.name}
                phone={contact.phone}
                selected={selectedContacts.includes(contact.id)}
                onClick={() => toggleContact(contact.id)}
              />
            ))}
          </div>
        </div>

        {/* Tempo (Grid Dinâmico com cliques) */}
        <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <Clock3 size={18} className="text-purple-500" />
            <span className="font-medium text-gray-700">Avisar se eu não chegar em:</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {times.map((time) => (
              <TimeButton
                key={time}
                text={time}
                active={selectedTime === time}
                onClick={() => setSelectedType(time)}
              />
            ))}
          </div>
        </div>

        {/* Botão de Confirmação */}
        <button 
          onClick={onConfirm} 
          disabled={!destination || selectedContacts.length === 0}
          className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-300 text-white py-4 rounded-xl font-medium mt-8 mb-8 active:scale-[0.99] transition-transform shadow-md shadow-indigo-100"
        >
          Confirmar Check-in
        </button>
      </div>

      {/* Rodapé Padrão */}
      <BottomTab 
        currentScreen="checkin"
        onMap={onBack} 
        onEmergency={onEmergency}
        onCheckIn={() => {}}
      />
    </div>
  );
}

// Componente Contact interno ajustado para interações
function Contact({ 
  name, 
  phone, 
  selected, 
  onClick 
}: { 
  name: string; 
  phone: string; 
  selected: boolean; 
  onClick: () => void; 
}) {
  return (
    <div 
      onClick={onClick}
      className={`rounded-2xl p-4 flex items-center gap-3 border cursor-pointer transition-all active:scale-[0.99] ${
        selected ? "border-purple-500 bg-purple-50/60" : "bg-gray-50 border-transparent hover:bg-gray-100"
      }`}
    >
      <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
        selected ? "bg-purple-500 text-white" : "bg-gray-300"
      }`}>
        {selected && <Check size={14} />}
      </div>
      <div>
        <h4 className="font-medium text-gray-700 text-sm">{name}</h4>
        <p className="text-xs text-gray-400 mt-0.5">{phone}</p>
      </div>
    </div>
  );
}

// Componente TimeButton interno ajustado para cliques
function TimeButton({ 
  text, 
  active, 
  onClick 
}: { 
  text: string; 
  active: boolean; 
  onClick: () => void; 
}) {
  return (
    <button 
      onClick={onClick}
      className={`rounded-xl py-3 border font-medium text-sm transition-all active:scale-95 ${
        active
          ? "border-purple-500 bg-purple-100 text-purple-700 shadow-xs"
          : "bg-gray-100 border-transparent text-gray-600 hover:bg-gray-200"
      }`}
    >
      {text}
    </button>
  );
}