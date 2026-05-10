import {
  ArrowLeft,
  MapPin,
} from "lucide-react";

interface ReportIncidentProps {
  onBack: () => void;
  onNext: () => void;
}

export default function ReportIncident({
  onBack,
  onNext,
}: ReportIncidentProps) {
  const types = [
    "Assédio",
    "Agressão",
    "Roubo/Furto",
    "Importunação",
    "Perseguição",
    "Outro",
  ];

  return (
    <div className="w-full h-screen bg-[#fafafa] flex flex-col">
      <div className="px-5 py-6 flex-1 overflow-y-auto">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center mb-6"
        >
          <ArrowLeft size={20} />
        </button>

        <h1 className="text-2xl font-bold text-pink-500 mb-6">
          Reportar Incidente
        </h1>

        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-3">
            Tipo de Ocorrência
          </p>

          <div className="flex flex-wrap gap-3">
            {types.map((item) => (
              <button
                key={item}
                className="px-4 py-2 rounded-lg border border-gray-200 text-sm"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="border border-gray-200 rounded-xl p-4 bg-white mb-6">
          <div className="flex items-center gap-2 text-gray-500 mb-3">
            <MapPin size={18} />
            <span className="text-sm">
              Endereço da Ocorrência
            </span>
          </div>

          <input
            type="text"
            placeholder="Buscar endereço..."
            className="w-full bg-[#f5f5f5] rounded-lg px-4 py-3 outline-none"
          />
        </div>

        <div className="border border-gray-200 rounded-xl p-4 bg-white mb-8">
          <p className="text-sm text-gray-500 mb-3">
            Descrição
          </p>

          <textarea
            rows={5}
            placeholder="Descreva aqui o ocorrido..."
            className="w-full bg-[#f5f5f5] rounded-lg px-4 py-3 outline-none resize-none"
          />
        </div>

        <button
          onClick={onNext}
          className="w-full bg-pink-500 text-white py-4 rounded-xl font-semibold"
        >
          Confirmar Ocorrência
        </button>
      </div>

      <BottomTab />
    </div>
  );
}

function BottomTab() {
  return (
    <div className="h-20 bg-white border-t border-gray-200 flex items-center justify-around">
      <button className="text-gray-400 text-sm">
        Mapa
      </button>

      <button className="w-16 h-16 bg-pink-500 rounded-full text-white -mt-8">
        !
      </button>

      <button className="text-gray-400 text-sm">
        Check-in
      </button>
    </div>
  );
}