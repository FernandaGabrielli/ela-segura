import { useState, useEffect } from "react";
import { ArrowLeft, Check, MapPin, Clock3, Users } from "lucide-react";
import BottomTab from "../components/Bottomtab";

interface CheckInActiveProps {
  onBack: () => void;
  onConfirmArrival: () => void;
  onCancel: () => void;
  onEmergency: () => void;
  initialMinutes?: number; // Permite passar o tempo dinamicamente (padrão: 30)
}

export default function CheckInActive({
  onBack,
  onConfirmArrival,
  onCancel,
  onEmergency,
  initialMinutes = 30,
}: CheckInActiveProps) {
  // Estado para armazenar o tempo restante em segundos
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);

  // Efeito para rodar o cronômetro em tempo real
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Formata os segundos em MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col justify-between">
      
      {/* Container Principal */}
      <div className="flex-1 px-6 pt-12 pb-6 overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-xl border bg-white flex items-center justify-center active:scale-95 transition-transform"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>

          <h1 className="text-2xl font-bold text-indigo-500">
            Check-in de Segurança
          </h1>
        </div>

        <p className="text-gray-400 mt-4">
          Avise seus contatos quando estiver a caminho de um local
        </p>

        {/* Card de Status Central */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-xs mt-6">
          
          {/* Ícone Animado de Sucesso */}
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center text-white shadow-lg shadow-green-100 animate-pulse">
              <Check size={38} />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-center mt-6 text-gray-800">
            Check-in ativado!
          </h2>

          <p className="text-center text-gray-400 text-sm mt-3 px-2">
            Seus contatos serão notificados se você não confirmar chegada antes do tempo acabar.
          </p>

          {/* Cards com Informações Dinâmicas */}
          <div className="space-y-4 mt-8">
            <InfoCard
              icon={<MapPin size={18} />}
              text="Rota monitorada em tempo real"
            />

            <InfoCard
              icon={<Clock3 size={18} />}
              text={`Tempo restante: ${formatTime(timeLeft)}`}
              highlight={timeLeft < 300} // Fica vermelho se faltar menos de 5 minutos
            />

            <InfoCard
              icon={<Users size={18} />}
              text="Contatos de emergência prontos"
            />
          </div>

          {/* Botão Concluir Chegada */}
          <button
            onClick={onConfirmArrival}
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-4 rounded-xl font-medium mt-8 shadow-md shadow-indigo-100 active:scale-[0.99] transition-transform"
          >
            Confirmar chegada
          </button>
        </div>

        {/* Botão Desativar/Cancelar */}
        <button
          onClick={onCancel}
          className="w-full mt-6 border-2 border-red-200 text-red-500 hover:bg-red-50 py-4 rounded-xl font-medium active:scale-[0.99] transition-transform"
        >
          Cancelar Check-in
        </button>
      </div>

      {/* Barra de Navegação Reutilizável */}
      <BottomTab 
        currentScreen="checkin"
        onMap={onBack}
        onEmergency={onEmergency}
        onCheckIn={() => {}}
      />
    </div>
  );
}

function InfoCard({
  icon,
  text,
  highlight,
}: {
  icon: React.ReactNode;
  text: string;
  highlight?: boolean;
}) {
  return (
    <div className={`rounded-xl p-4 flex items-center gap-3 font-medium transition-colors ${
      highlight 
        ? "bg-red-50 text-red-600 border border-red-100" 
        : "bg-purple-50 text-purple-600"
    }`}>
      {icon}
      <span className="text-sm">{text}</span>
    </div>
  );
}