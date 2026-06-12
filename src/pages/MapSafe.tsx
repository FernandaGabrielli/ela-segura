import { useState, useEffect } from "react";
import { AlertTriangle, List, LocateFixed, Target } from "lucide-react";
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";
import BottomTab from "../components/Bottomtab";

interface MapSafeProps {
  onMenu: () => void;
  onEmergency: () => void;
  onCheckIn: () => void;
  onProfile: () => void;
}

interface DenunciaData {
  id: string;
  tipo: string;
  bairro: string;
  status: string;
  latitude: number;
  longitude: number;
}

// Sub-componente para redefinir o centro do mapa quando o usuário clica no GPS
function ChangeMapCenter({ center }: { center: [number, number] }) {
  const map = useMap();
  map.setView(center, map.getZoom());
  return null;
}

export default function MapSafe({ onMenu, onEmergency, onCheckIn, onProfile }: MapSafeProps) {
  // Centro inicial padrão (Recife - Centro)
  const [userLocation, setUserLocation] = useState<[number, number]>([-8.0476, -34.8770]);
  const [denuncias, setDenuncias] = useState<DenunciaData[]>([]);
  const [proximaDeRisco, setProximaDeRisco] = useState(false);

  // 1. Captura a geolocalização real do celular da usuária
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => console.error("Erro ao obter GPS:", error),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  // 2. Busca as denúncias reais salvas no SQLite do seu Backend
  useEffect(() => {
    async function fetchDenuncias() {
      try {
        const response = await fetch("http://localhost:3000/api/denuncias?limit=100");
        if (!response.ok) throw new Error();
        const resJson = await response.json();
        
        // Trata os dados caso venham envelopados em "dados" devido à paginação
        const listaOcorrencias = resJson.dados || resJson;
        
        // Filtra apenas registros que contenham coordenadas válidas
        const validas = listaOcorrencias.filter((d: DenunciaData) => d.latitude && d.longitude);
        setDenuncias(validas);

        // 3. Verifica se alguma área de risco está a menos de ~500 metros da usuária
        const detectaRisco = validas.some((d: DenunciaData) => {
          const m = calcularDistancia(userLocation[0], userLocation[1], d.latitude, d.longitude);
          return m < 0.5; // Menos de 500 metros
        });
        setProximaDeRisco(detectaRisco);

      } catch (err) {
        console.error("Erro ao carregar pontos do mapa:", err);
      }
    }
    fetchDenuncias();
  }, [userLocation]);

  // Função matemática simples para calcular distância entre coordenadas (Haversine)
  function calcularDistancia(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371; // Raio da Terra em km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
  }

  // Define a cor do marcador baseado no tipo ou criticidade do status
  const obterCorRisco = (status: string) => {
    if (status === "pendente") return "#ef4444";     // Vermelho - Alto risco recente
    if (status === "em_analise") return "#ec4899";   // Rosa - Médio risco sob investigação
    return "#fbbf24";                               // Amarelo - Baixo/Resolvido
  };

  // Recarrega o GPS manualmente ao clicar no botão do Alvo
  const resetarParaGpsAtual = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setUserLocation([pos.coords.latitude, pos.coords.longitude]);
    });
  };

  return (
    <div className="relative h-screen w-full bg-gray-100 flex flex-col justify-between overflow-hidden">
      
      {/* 1. MAPA INTERATIVO REAL (LEAFLET) */}
      <div className="absolute inset-0 z-0">
        <MapContainer 
          center={userLocation} 
          zoom={14} 
          className="h-full w-full" 
          zoomControl={false}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          />
          <ChangeMapCenter center={userLocation} />

          {/* Marcador azul da posição real da usuária */}
          <CircleMarker center={userLocation} radius={10} pathOptions={{ color: '#5d5fef', fillColor: '#3b82f6', fillOpacity: 0.6 }}>
            <Popup><span className="font-semibold text-xs">Você está aqui</span></Popup>
          </CircleMarker>

          {/* Renderização dinâmica dos marcadores do banco SQLite */}
          {denuncias.map((denuncia) => (
            <CircleMarker
              key={denuncia.id}
              center={[denuncia.latitude, denuncia.longitude]}
              radius={22}
              pathOptions={{
                color: obterCorRisco(denuncia.status),
                fillColor: obterCorRisco(denuncia.status),
                fillOpacity: 0.25,
                weight: 2
              }}
            >
              <Popup>
                <div className="p-1">
                  <h4 className="font-bold text-gray-800 capitalize">{denuncia.tipo.replace('_', ' ')}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Bairro: {denuncia.bairro || "Não informado"}</p>
                  <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-full font-medium inline-block mt-1 uppercase">
                    Status: {denuncia.status}
                  </span>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>

      {/* 2. TOP OVERLAYS (Menu e Alerta Proativo Condicional) */}
      <div className="absolute top-0 left-0 right-0 z-10 p-6 flex flex-col gap-4">
        <button 
          onClick={onMenu}
          className="w-12 h-12 bg-white rounded-2xl shadow-md flex items-center justify-center active:scale-95 transition-transform"
        >
          <List size={22} className="text-purple-600" />
        </button>

        {/* O Banner só aparece se o algoritmo de distância detectar risco próximo */}
        {proximaDeRisco && (
          <div className="w-full bg-[#FF3B5C] text-white px-5 py-3.5 rounded-2xl shadow-lg flex items-center gap-3 mt-2 animate-bounce">
            <AlertTriangle size={18} className="shrink-0" />
            <span className="font-medium text-sm">Cuidado! Área de risco próxima</span>
          </div>
        )}
      </div>

      {/* 3. FLOATING WIDGETS (Legenda e Centralizador de GPS) */}
      <div className="absolute bottom-24 left-6 right-6 z-10 flex items-end justify-between pointer-events-none">
        <div className="bg-white/95 backdrop-blur-xs p-4 rounded-3xl shadow-xl w-32 pointer-events-auto">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">Risco</span>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2"><span className="w-3 h-3 bg-red-500 rounded-full" /><span className="text-xs text-gray-600 font-medium">Alto</span></div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 bg-pink-500 rounded-full" /><span className="text-xs text-gray-600 font-medium">Médio</span></div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 bg-amber-400 rounded-full" /><span className="text-xs text-gray-600 font-medium">Baixo</span></div>
          </div>
        </div>

        <button 
          onClick={resetarParaGpsAtual}
          className="w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-purple-600 active:scale-95 transition-transform pointer-events-auto"
        >
          <LocateFixed size={22} />
        </button>
      </div>

      {/* 4. BOTTOM NAVIGATION */}
      <div className="mt-auto w-full z-10">
        <BottomTab 
          currentScreen="map"
          onMap={() => {}} 
          onEmergency={onEmergency}
          onCheckIn={onCheckIn}
        />
      </div>
    </div>
  );
}