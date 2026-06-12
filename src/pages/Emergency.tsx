import { useState } from "react";
import {
  ArrowLeft,
  AlertTriangle,
  MapPin,
  Shield,
  Ambulance,
  Phone,
  CheckCircle2,
} from "lucide-react";
import BottomTab from "../components/Bottomtab";

interface EmergencyProps {
  onBack: () => void;
  onCheckIn: () => void;
}

export default function Emergency({ onBack, onCheckIn }: EmergencyProps) {
  const [showModal, setShowModal] = useState(false);

  const handleSOS = () => {
    setShowModal(true);
    // Fecha o modal automaticamente após 4 segundos se o usuário não fechar manualmente
    setTimeout(() => {
      setShowModal(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col relative">
      
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-xl border bg-white flex items-center justify-center active:scale-95 transition-transform"
          >
            <ArrowLeft size={20} />
          </button>

          <h1 className="text-2xl font-bold text-pink-500">
            Emergência
          </h1>
        </div>

        <p className="text-gray-400 mt-4">
          Ações rápidas para a sua segurança
        </p>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 px-6 overflow-auto">
        {/* Botão SOS */}
        <button 
          onClick={handleSOS}
          className="w-full bg-pink-400 rounded-3xl py-10 text-white mb-6 active:scale-[0.98] transition-transform shadow-lg shadow-pink-200"
        >
          <div className="w-14 h-14 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle size={28} />
          </div>

          <h2 className="text-3xl font-bold">
            Botão SOS
          </h2>

          <p className="text-sm mt-2 px-4">
            Envie sua localização para todos os contatos
          </p>
        </button>

        {/* Localização */}
        <div 
          onClick={handleSOS}
          className="bg-white rounded-3xl border p-4 flex items-center gap-4 mb-8 cursor-pointer active:bg-gray-50"
        >
          <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center">
            <MapPin className="text-purple-500" />
          </div>

          <div>
            <h3 className="font-semibold">
              Compartilhar localização
            </h3>
            <p className="text-sm text-gray-400">
              Enviar localização atual
            </p>
          </div>
        </div>

        {/* Serviços de Emergência */}
        <h3 className="font-bold text-gray-500 uppercase mb-4 text-sm tracking-wider">
          Serviços de Emergência
        </h3>

        <div className="space-y-4 mb-8">
          <ServiceCard
            icon={<Phone size={18} />}
            title="Central de Atendimento à Mulher"
            number="180"
          />
          <ServiceCard
            icon={<Shield size={18} />}
            title="Polícia Militar"
            number="190"
          />
          <ServiceCard
            icon={<Ambulance size={18} />}
            title="SAMU"
            number="192"
          />
        </div>

        {/* Contatos */}
        <h3 className="font-bold text-gray-500 uppercase mb-4 text-sm tracking-wider">
          Contatos Pessoais
        </h3>

        <div className="space-y-4 pb-28">
          <ContactCard initial="M" name="Mãe" />
          <ContactCard initial="J" name="João" />
        </div>
      </div>

      {/* Bottom Nav Reutilizável */}
      <BottomTab 
        currentScreen="other"
        onMap={onBack}
        onEmergency={() => {}}
        onCheckIn={onCheckIn}
      />

      {/* MODAL DE ALERTA ENVIADO */}
      {showModal && (
        <div className="absolute inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-6 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 w-full max-w-xs text-center shadow-2xl flex flex-col items-center gap-4 animate-scale-up">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-500">
              <CheckCircle2 size={38} className="fill-green-50 stroke-green-500" />
            </div>
            
            <div>
              <h4 className="text-xl font-bold text-gray-800">Alerta Enviado!</h4>
              <p className="text-sm text-gray-500 mt-2">
                Sua localização atual foi enviada com sucesso para todos os seus contatos de emergência.
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

function ServiceCard({
  icon,
  title,
  number,
}: {
  icon: React.ReactNode;
  title: string;
  number: string;
}) {
  return (
    <div className="bg-white border rounded-3xl p-4 flex items-center gap-4">
      <div className="w-12 h-12 rounded-2xl bg-pink-50 text-pink-500 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h4 className="font-medium text-gray-800">{title}</h4>
        <p className="text-sm text-gray-400">{number}</p>
      </div>
    </div>
  );
}

function ContactCard({
  initial,
  name,
}: {
  initial: string;
  name: string;
}) {
  return (
    <div className="bg-white border rounded-3xl p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-500 flex items-center justify-center font-bold">
          {initial}
        </div>
        <div>
          <h4 className="font-medium text-gray-800">{name}</h4>
          <p className="text-sm text-gray-400">(81) 9 xxxx-xxxx</p>
        </div>
      </div>
      <button className="w-10 h-10 rounded-full bg-purple-100 text-purple-500 flex items-center justify-center active:scale-95 transition-transform">
        <Phone size={16} />
      </button>
    </div>
  );
}