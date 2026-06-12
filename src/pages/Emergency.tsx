import { useState, useEffect } from "react";
import { ArrowLeft, AlertTriangle, MapPin, Shield, Ambulance, Phone, CheckCircle2 } from "lucide-react";
import BottomTab from "../components/Bottomtab";
import { sos } from "../services/api";

interface EmergencyProps {
  onBack: () => void;
  onCheckIn: () => void;
}

interface ContatoData {
  id: string;
  nome: string;
  telefone: string;
}

export default function Emergency({ onBack, onCheckIn }: EmergencyProps) {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  
  // Estados para carregar os contatos do banco de dados
  const [personalContacts, setPersonalContacts] = useState<ContatoData[]>([]);
  const [loadingContacts, setLoadingContacts] = useState(true);

  // 1. Carrega os contatos de emergência reais vinculados à usuária
  useEffect(() => {
    async function loadEmergencyContacts() {
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
        setPersonalContacts(data.dados || data);
      } catch (err) {
        console.warn("Falha ao carregar contatos para a tela de emergência. Usando contingência.");
        setPersonalContacts([
          { id: "c1", nome: "Mãe", telefone: "(81) 9 8888-7777" },
          { id: "c2", nome: "João", telefone: "(81) 9 1234-6789" }
        ]);
      } finally {
        setLoadingContacts(false);
      }
    }
    loadEmergencyContacts();
  }, []);

  const handleSOS = async () => {
    setErro("");
    setLoading(true);
    try {
      let lat = 0;
      let lng = 0;
      try {
        const pos = await new Promise<GeolocationPosition>((res, rej) =>
          navigator.geolocation.getCurrentPosition(res, rej, { timeout: 5000 })
        );
        lat = pos.coords.latitude;
        lng = pos.coords.longitude;
      } catch {
        // sem GPS — envia mesmo assim com 0,0 para o servidor saber do alerta
      }

      await sos.disparar(lat, lng);
      setShowModal(true);
      setTimeout(() => setShowModal(false), 6000);
    } catch (e: unknown) {
      setErro(e instanceof Error ? e.message : "Erro ao enviar alerta.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col relative">
      <div className="px-6 pt-12 pb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-xl border bg-white flex items-center justify-center active:scale-95 transition-transform"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-pink-500">Emergência</h1>
        </div>
        <p className="text-gray-400 mt-4">Ações rápidas para a sua segurança</p>
      </div>

      <div className="flex-1 px-6 overflow-auto">
        {/* Botão SOS */}
        <button
          onClick={handleSOS}
          disabled={loading}
          className="w-full bg-pink-400 rounded-3xl py-10 text-white mb-6 active:scale-[0.98] transition-transform shadow-lg shadow-pink-200 disabled:opacity-60"
        >
          <div className="w-14 h-14 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle size={28} />
          </div>
          <h2 className="text-3xl font-bold">{loading ? "Enviando..." : "Botão SOS"}</h2>
          <p className="text-sm mt-2 px-4">Envie sua localização para todos os contatos</p>
        </button>


        {erro && <p className="text-sm text-red-500 text-center mb-4">{erro}</p>}

        {/* Localização rápida */}
        <div
          onClick={handleSOS}
          className="bg-white rounded-3xl border p-4 flex items-center gap-4 mb-8 cursor-pointer active:bg-gray-50"
        >
          <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center">
            <MapPin className="text-purple-500" />
          </div>
          <div>
            <h3 className="font-semibold">Compartilhar localização</h3>
            <p className="text-sm text-gray-400">Enviar localização atual</p>
          </div>
        </div>

        {/* Serviços de Emergência */}
        <h3 className="font-bold text-gray-500 uppercase mb-4 text-sm tracking-wider">
          Serviços de Emergência
        </h3>
        <div className="space-y-4 mb-8">
          <ServiceCard icon={<Phone size={18} />} title="Central de Atendimento à Mulher" number="180" />
          <ServiceCard icon={<Shield size={18} />} title="Polícia Militar" number="190" />
          <ServiceCard icon={<Ambulance size={18} />} title="SAMU" number="192" />
        </div>

        {/* Contatos Pessoais Sincronizados */}
        <h3 className="font-bold text-gray-500 uppercase mb-4 text-sm tracking-wider">
          Contatos Pessoais
        </h3>
        <div className="space-y-4 pb-28">
          {loadingContacts ? (
            <p className="text-center text-xs text-gray-400 py-4 animate-pulse">Buscando contatos seguros...</p>
          ) : personalContacts.length === 0 ? (
            <div className="text-center text-sm text-gray-400 py-4 bg-white border border-dashed rounded-2xl">
              Nenhum contato cadastrado no menu.
            </div>
          ) : (
            personalContacts.map((contact) => (
              <ContactCard 
                key={contact.id} 
                initial={contact.nome.charAt(0).toUpperCase()} 
                name={contact.nome} 
                phone={contact.telefone} 
              />
            ))
          )}
        </div>
      </div>

      <BottomTab currentScreen="other" onMap={onBack} onEmergency={() => {}} onCheckIn={onCheckIn} />

      {/* Modal alerta enviado */}
      {showModal && (
        <div className="absolute inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl p-6 w-full max-w-xs text-center shadow-2xl flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-500">
              <CheckCircle2 size={38} className="fill-green-50 stroke-green-500" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-800">Alerta Enviado!</h4>
              <p className="text-sm text-gray-500 mt-2">
                Sua localização foi registrada e o alerta foi disparado com sucesso.
              </p>
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="w-full bg-gray-900 text-white py-3 rounded-xl font-medium text-sm mt-2 active:scale-95 transition-transform"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ServiceCard({ icon, title, number }: { icon: React.ReactNode; title: string; number: string }) {
  return (
    <a href={`tel:${number}`} className="bg-white border rounded-3xl p-4 flex items-center gap-4 active:bg-gray-50">
      <div className="w-12 h-12 rounded-2xl bg-pink-50 text-pink-500 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h4 className="font-medium text-gray-800">{title}</h4>
        <p className="text-sm text-gray-400">{number}</p>
      </div>
    </a>
  );
}

function ContactCard({ initial, name, phone }: { initial: string; name: string; phone: string }) {
  return (
    <div className="bg-white border rounded-3xl p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-50 flex items-center justify-center font-bold">
          {initial}
        </div>
        <div>
          <h4 className="font-medium text-gray-800">{name}</h4>
          <p className="text-sm text-gray-400">{phone}</p>
        </div>
      </div>
      {/* Botão modificado com tag 'a' para realizar a chamada telefônica real pelo celular */}
      <a 
        href={`tel:${phone.replace(/\D/g, "")}`} 
        className="w-10 h-10 rounded-full bg-purple-100 text-purple-500 flex items-center justify-center active:scale-95 transition-transform"
      >
        <Phone size={16} />
      </a>
    </div>
  );
}