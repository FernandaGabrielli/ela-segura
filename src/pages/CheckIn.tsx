import { useState, useEffect } from "react";
import { ArrowLeft, Check, MapPin, Clock3, Users, Navigation } from "lucide-react";
import BottomTab from "../components/Bottomtab";

interface CheckInProps {
  onBack: () => void;
  onConfirm: (payload: { destino: string; tempo: string; contatos: string[]; lat?: number; lng?: number }) => void;
  onEmergency: () => void;
}

interface ContatoData {
  id: string;
  nome: string;
  telefone: string;
}

export default function CheckIn({ onBack, onConfirm, onEmergency }: CheckInProps) {
  const [destination, setDestination] = useState("");
  const [selectedTime, setSelectedTime] = useState("1 hora");
  const [contactList, setContactList] = useState<ContatoData[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [coords, setCoords] = useState<{ lat?: number; lng?: number }>({});
  const [loadingContacts, setLoadingContacts] = useState(true);
  const [sendingCheckin, setSendingCheckin] = useState(false);

  // 1. Carrega os contatos dinâmicos associados ao usuário logado no SQLite
  useEffect(() => {
    async function fetchContatos() {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/api/sos/contatos", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
});

        if (!response.ok) throw new Error();
        const data = await response.json();
        setContactList(data.dados || data);
      } catch (err) {
        console.warn("Falha ao carregar contatos da API. Usando contingência.");
        // Mock de contingência caso a tabela esteja limpa
        setContactList([
          { id: "c1", nome: "Mãe", telefone: "(81) 9 8888-7777" },
          { id: "c2", nome: "João", telefone: "(81) 9 1234-6789" }
        ]);
      } finally {
        setLoadingContacts(false);
      }
    }
    fetchContatos();
  }, []);

  // 2. Captura a geolocalização e preenche o input dinamicamente
  const handleUseCurrentLocation = () => {
    if ("geolocation" in navigator) {
      setDestination("Carregando localização...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoords({ lat: latitude, lng: longitude });
          setDestination(`Minha Localização (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`);
        },
        (error) => {
          console.error(error);
          setDestination("Não foi possível obter a localização.");
        },
        { enableHighAccuracy: true }
      );
    }
  };

  const toggleContact = (id: string) => {
    setSelectedContacts((prev) =>
      prev.includes(id) ? prev.filter((cId) => cId !== id) : [...prev, id]
    );
  };

  // 3. Dispara o POST do Check-in para o Backend
  const handleConfirmCheckIn = async () => {
    try {
      setSendingCheckin(true);
      const token = localStorage.getItem("token");

      const payload = {
        destino: destination,
        tempo_estimado: selectedTime,
        contatos_notificados: selectedContacts,
        latitude: coords.lat || null,
        longitude: coords.lng || null
      };

      // Altere o endpoint de acordo com o nome da rota definida em seu server.js (/api/sos ou similar)
        const response = await fetch("http://localhost:3000/api/sos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
        });

      if (!response.ok) throw new Error("Erro ao criar check-in");

      // Passa as informações adiante para a tela ativa gerenciar o cronômetro
      onConfirm({
        destino: destination,
        tempo: selectedTime,
        contatos: selectedContacts,
        ...coords
      });
    } catch (err) {
      console.error(err);
      alert("Não foi possível salvar o seu Check-in no servidor.");
    } finally {
      setSendingCheckin(false);
    }
    localStorage.removeItem("checkin_segundos_restantes");
  };

  const times = ["15 min", "30 min", "1 hora", "2 horas"];

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

        {/* Destino */}
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
            className="flex items-center gap-2 mt-4 text-sm text-indigo-500 font-semibold hover:text-purple-600 active:scale-95 transition-transform"
          >
            <Navigation size={16} /> Usar localização atual
          </button>
        </div>

        {/* Contatos Dinâmicos */}
        <div className="bg-white border border-gray-100 rounded-3xl p-5 mb-5 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <Users size={18} className="text-purple-500" />
            <span className="font-medium text-gray-700">Contatos Vinculados</span>
          </div>
          <div className="space-y-3">
            {loadingContacts ? (
              <p className="text-xs text-gray-400 animate-pulse">Sincronizando seus contatos...</p>
            ) : (
              contactList.map((contact) => (
                <Contact
                  key={contact.id}
                  name={contact.nome}
                  phone={contact.telefone}
                  selected={selectedContacts.includes(contact.id)}
                  onClick={() => toggleContact(contact.id)}
                />
              ))
            )}
          </div>
        </div>

        {/* Tempo */}
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
                onClick={() => setSelectedTime(time)}
              />
            ))}
          </div>
        </div>

        {/* Botão de Confirmação Conectado */}
        <button 
          onClick={handleConfirmCheckIn} 
          disabled={!destination || selectedContacts.length === 0 || sendingCheckin}
          className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-300 text-white py-4 rounded-xl font-medium mt-8 mb-8 active:scale-[0.99] transition-transform shadow-md shadow-indigo-100"
        >
          {sendingCheckin ? "Processando Check-in..." : "Confirmar Check-in"}
        </button>
      </div>

      <BottomTab 
        currentScreen="checkin"
        onMap={onBack} 
        onEmergency={onEmergency}
        onCheckIn={() => {}}
      />
    </div>
  );
}

function Contact({ name, phone, selected, onClick }: { name: string; phone: string; selected: boolean; onClick: () => void }) {
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

function TimeButton({ text, active, onClick }: { text: string; active: boolean; onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`rounded-xl py-3 border font-medium text-sm transition-all active:scale-95 ${
        active ? "border-purple-500 bg-purple-100 text-purple-700 shadow-xs" : "bg-gray-100 border-transparent text-gray-600 hover:bg-gray-200"
      }`}
    >
      {text}
    </button>
  );
}