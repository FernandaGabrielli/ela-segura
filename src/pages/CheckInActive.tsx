import { useState, useEffect } from "react";
import { Check, MapPin, Clock3, Users } from "lucide-react";
import BottomTab from "../components/Bottomtab";

interface CheckInActiveProps {
  onConfirmArrival: () => void;
  onCancel: () => void;
  onEmergency: () => void;
  initialMinutes?: number;
}

export default function CheckInActive({
  onConfirmArrival,
  onCancel,
  onEmergency,
  initialMinutes = 30,
}: CheckInActiveProps) {
  // Inicializa buscando se já há um tempo correndo salvo no localStorage
  const [timeLeft, setTimeLeft] = useState<number>(() => {
    const salvo = localStorage.getItem("checkin_segundos_restantes");
    if (salvo) {
      const segundos = parseInt(salvo, 10);
      return segundos > 0 ? segundos : initialMinutes * 60;
    }
    return initialMinutes * 60;
  });

  // Executa o cronômetro e salva o estado atualizado a cada segundo
  useEffect(() => {
    if (timeLeft <= 0) {
      localStorage.removeItem("checkin_segundos_restantes");
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const novoTempo = prev - 1;
        localStorage.setItem("checkin_segundos_restantes", novoTempo.toString());
        return novoTempo;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col justify-between">
      <div className="flex-1 px-6 pt-12 pb-6 overflow-y-auto">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-indigo-500">
            Monitoramento Ativo
          </h1>
        </div>

        <p className="text-gray-400 mt-2">
          Sua rota está sendo supervisionada pelo sistema do Ela Segura.
        </p>

        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-xs mt-6">
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center text-white shadow-lg shadow-green-100 animate-pulse">
              <Check size={38} />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-center mt-6 text-gray-800">
            Check-in Protegido
          </h2>

          <p className="text-center text-gray-400 text-sm mt-3 px-2">
            Seus contatos de emergência serão acionados via SMS caso o cronômetro chegue a zero.
          </p>

          <div className="space-y-4 mt-8">
            <InfoCard icon={<MapPin size={18} />} text="GPS enviando sinal em tempo real" />
            <InfoCard 
              icon={<Clock3 size={18} />} 
              text={`Tempo limite: ${formatTime(timeLeft)}`} 
              highlight={timeLeft < 300} 
            />
            <InfoCard icon={<Users size={18} />} text="Contatos de prontidão" />
          </div>

          <button
            onClick={() => {
              localStorage.removeItem("checkin_segundos_restantes");
              onConfirmArrival();
            }}
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-4 rounded-xl font-medium mt-8 shadow-md shadow-indigo-100 active:scale-[0.99] transition-transform"
          >
            Confirmar chegada no destino
          </button>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("checkin_segundos_restantes");
            onCancel();
          }}
          className="w-full mt-6 border-2 border-red-200 text-red-500 hover:bg-red-50 py-4 rounded-xl font-medium active:scale-[0.99] transition-transform"
        >
          Cancelar Monitoramento
        </button>
      </div>

      <BottomTab 
        currentScreen="checkin"
        onMap={() => {}} 
        onEmergency={onEmergency} 
        onCheckIn={() => {}} 
      />
    </div>
  );
}

function InfoCard({ icon, text, highlight }: { icon: React.ReactNode; text: string; highlight?: boolean }) {
  return (
    <div className={`rounded-xl p-4 flex items-center gap-3 font-medium transition-colors ${
      highlight ? "bg-red-50 text-red-600 border border-red-100" : "bg-purple-50 text-purple-600"
    }`}>
      {icon}
      <span className="text-sm">{text}</span>
    </div>
  );
}