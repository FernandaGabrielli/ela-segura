import { useState } from "react";
import { ArrowLeft, MapPin, CheckCircle2, Navigation } from "lucide-react";
import { denuncias } from "../services/api";

// Mapeamento do label exibido → valor aceito pela API
const TIPOS: Record<string, string> = {
  "Assédio": "assedio",
  "Perseguição": "perseguicao",
  "Agressão": "violencia_fisica",
  "Roubo/Furto": "outro",
  "Importunação": "outro",
  "Outro": "outro",
};

interface ReportIncidentProps {
  onBack: () => void;
  onNext: () => void;
}

export default function ReportIncident({ onBack, onNext }: ReportIncidentProps) {
  const [selectedType, setSelectedType] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [bairro, setBairro] = useState("");
  const [descricao, setDescricao] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const [coords, setCoords] = useState<{ lat?: number; lng?: number }>({});
  const [gpsStatus, setGpsStatus] = useState("");

  // Captura ativa da geolocalização do dispositivo
  const handleGetLocation = () => {
    if (!("geolocation" in navigator)) {
      setGpsStatus("GPS não suportado no navegador.");
      return;
    }

    setGpsStatus("Buscando sua posição...");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setGpsStatus("✓ Posição capturada via GPS");
        if (!bairro) {
          setBairro("Localização atual via GPS");
        }
      },
      (error) => {
        console.error(error);
        setGpsStatus("Não foi possível obter o GPS automaticamente.");
      },
      { enableHighAccuracy: true, timeout: 7000 }
    );
  };

  const handleConfirm = async () => {
    if (!selectedType || !descricao) {
      setErro("Selecione o tipo e descreva o ocorrido.");
      return;
    }
    setErro("");
    setLoading(true);

    try {
      // Se a usuária não clicou no botão do GPS antes, tenta capturar rapidamente agora
      let finalLat = coords.lat;
      let finalLng = coords.lng;

      if (!finalLat || !finalLng) {
        try {
          const pos = await new Promise<GeolocationPosition>((res, rej) =>
            navigator.geolocation.getCurrentPosition(res, rej, { 
              enableHighAccuracy: true, 
              timeout: 4000 
            })
          );
          finalLat = pos.coords.latitude;
          finalLng = pos.coords.longitude;
        } catch {
          // GPS indisponível no momento — assume os valores padrão (ou 0 para não quebrar o Leaflet)
          finalLat = 0;
          finalLng = 0;
        }
      }

      await denuncias.criar({
        tipo: TIPOS[selectedType],
        descricao: descricao.trim(),
        bairro: bairro.trim() || "Bairro não informado",
        latitude: finalLat,
        longitude: finalLng,
        anonima: true,
      });

      setShowModal(true);
    } catch (e: unknown) {
      setErro(e instanceof Error ? e.message : "Erro ao enviar denúncia.");
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    onNext();
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

        <h1 className="text-2xl font-bold text-pink-500 mb-6">Reportar Incidente</h1>

        {/* Tipo */}
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-3">Tipo de Ocorrência</p>
          <div className="flex flex-wrap gap-3">
            {Object.keys(TIPOS).map((item) => (
              <button
                key={item}
                type="button"
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

        {/* Bairro e GPS */}
        <div className="border border-gray-200 rounded-xl p-4 bg-white mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-gray-500">
              <MapPin size={18} />
              <span className="text-sm">Bairro / Endereço</span>
            </div>
            <button
              type="button"
              onClick={handleGetLocation}
              className="flex items-center gap-1 text-xs text-indigo-500 font-semibold active:scale-95 transition-transform"
            >
              <Navigation size={12} /> Puxar GPS
            </button>
          </div>
          
          <input
            type="text"
            value={bairro}
            onChange={(e) => setBairro(e.target.value)}
            placeholder="Ex: Boa Viagem, Recife"
            className="w-full bg-[#f5f5f5] rounded-lg px-4 py-3 outline-none text-sm text-gray-700"
          />
          
          {gpsStatus && (
            <p className="text-[11px] text-gray-400 mt-2 ml-1 animate-pulse">{gpsStatus}</p>
          )}
        </div>

        {/* Descrição */}
        <div className="border border-gray-200 rounded-xl p-4 bg-white mb-4">
          <p className="text-sm text-gray-500 mb-3">Descrição do ocorrido</p>
          <textarea
            rows={4}
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Descreva as características do local ou do suspeito..."
            className="w-full bg-[#f5f5f5] rounded-lg px-4 py-3 outline-none text-sm text-gray-700 resize-none"
          />
        </div>

        {erro && <p className="text-sm text-red-500 mb-4 text-center">{erro}</p>}

        <button
          onClick={handleConfirm}
          disabled={loading}
          className="w-full bg-pink-500 text-white py-4 rounded-xl font-semibold active:scale-[0.99] transition-transform shadow-lg shadow-pink-100 disabled:opacity-60"
        >
          {loading ? "Enviando para o Servidor..." : "Confirmar Ocorrência"}
        </button>
      </div>

      {/* Modal de sucesso */}
      {showModal && (
        <div className="absolute inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl p-6 w-full max-w-xs text-center shadow-2xl flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-500">
              <CheckCircle2 size={38} className="fill-green-50 stroke-green-500" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-800">Ocorrência Salva!</h4>
              <p className="text-sm text-gray-500 mt-2">
                O incidente foi registrado anonimamente no mapa para alertar outras usuárias na Região Metropolitana.
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