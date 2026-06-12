import { useState } from "react";
import { ArrowLeft, MapPin, CheckCircle2 } from "lucide-react";

interface ReportIncidentProps {
  onBack: () => void;
  onNext: () => void;
  onSave: (report: {
    type: string;
    location: string;
    description: string;
  }) => void;
}

export default function ReportIncident({ onBack, onNext, onSave }: ReportIncidentProps) {
  const [selectedType, setSelectedType] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const types = [
    "Assédio",
    "Agressão",
    "Roubo/Furto",
    "Importunação",
    "Perseguição",
    "Outro",
  ];

  const handleConfirm = () => {
    onSave({
      type: selectedType,
      location,
      description,
    });

    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    onNext(); // Avança para a próxima tela ("my_reports") após fechar o popup
  };

  return (
    <div className="w-full h-screen bg-[#fafafa] flex flex-col relative">
      <div className="px-5 py-6 flex-1 overflow-y-auto">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center mb-6 active:scale-95 transition-transform bg-white"
        >
          <ArrowLeft size={20} />
        </button>

        <h1 className="text-2xl font-bold text-pink-500 mb-6">
          Reportar Incidente
        </h1>

        {/* Tipo de Ocorrência */}
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-3">
            Tipo de Ocorrência
          </p>

          <div className="flex flex-wrap gap-3">
            {types.map((item) => (
              <button
                key={item}
                onClick={() => setSelectedType(item)}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all active:scale-95 ${
                  selectedType === item
                    ? "border-pink-500 bg-pink-50 text-pink-600"
                    : "border-gray-200 bg-white text-gray-600"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Endereço */}
        <div className="border border-gray-200 rounded-xl p-4 bg-white mb-6">
          <div className="flex items-center gap-2 text-gray-500 mb-3">
            <MapPin size={18} />
            <span className="text-sm">
              Endereço da Ocorrência
            </span>
          </div>

          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Buscar endereço..."
            className="w-full bg-[#f5f5f5] rounded-lg px-4 py-3 outline-none"
          />
        </div>

        {/* Descrição */}
        <div className="border border-gray-200 rounded-xl p-4 bg-white mb-8">
          <p className="text-sm text-gray-500 mb-3">
            Descrição
          </p>

          <textarea
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descreva aqui o ocorrido..."
            className="w-full bg-[#f5f5f5] rounded-lg px-4 py-3 outline-none resize-none"
          />
        </div>

        {/* Botão de Envio */}
        <button
          onClick={handleConfirm}
          className="w-full bg-pink-500 text-white py-4 rounded-xl font-semibold active:scale-[0.99] transition-transform shadow-lg shadow-pink-100"
        >
          Confirmar Ocorrência
        </button>
      </div>

      {/* POPUP DE SUCESSO */}
      {showModal && (
        <div className="absolute inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl p-6 w-full max-w-xs text-center shadow-2xl flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-500">
              <CheckCircle2 size={38} className="fill-green-50 stroke-green-500" />
            </div>
            
            <div>
              <h4 className="text-xl font-bold text-gray-800">Ocorrência Salva!</h4>
              <p className="text-sm text-gray-500 mt-2">
                O incidente foi registrado anonimamente no mapa para alertar outros usuários.
              </p>
            </div>

            <button 
              onClick={handleModalClose}
              className="w-full bg-gray-900 text-white py-3 rounded-xl font-medium text-sm mt-2 active:scale-95 transition-transform"
            >
              Visualizar Relatórios
            </button>
          </div>
        </div>
      )}
    </div>
  );
}