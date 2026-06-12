import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { denuncias } from "../services/api";
import type { Denuncia } from "../services/api";

const STATUS_LABEL: Record<string, string> = {
  pendente: "Pendente",
  em_analise: "Em análise",
  resolvido: "Resolvido",
  arquivado: "Arquivado",
};

const STATUS_COLOR: Record<string, string> = {
  pendente: "bg-yellow-100 text-yellow-600",
  em_analise: "bg-blue-100 text-blue-600",
  resolvido: "bg-green-100 text-green-600",
  arquivado: "bg-gray-100 text-gray-500",
};

interface MyReportsProps {
  onBack: () => void;
  onNewReport: () => void;
}

export default function MyReports({ onBack, onNewReport }: MyReportsProps) {
  const [reports, setReports] = useState<Denuncia[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    denuncias
      .minhas()
      .then(setReports)
      .catch((e: unknown) => setErro(e instanceof Error ? e.message : "Erro ao carregar."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="w-full h-screen bg-[#fafafa] flex flex-col">
      <div className="px-5 py-6 flex-1 overflow-y-auto">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center mb-6 bg-white active:scale-95 transition-transform"
        >
          <ArrowLeft size={20} />
        </button>

        <h1 className="text-2xl font-bold text-[#5d5fef] mb-6">Minhas Ocorrências</h1>

        <button
          onClick={onNewReport}
          className="w-full bg-pink-500 text-white py-4 rounded-xl font-semibold mb-6 active:scale-[0.99] transition-transform"
        >
          Registrar Nova Ocorrência
        </button>

        {loading && (
          <p className="text-center text-gray-400 py-8">Carregando...</p>
        )}

        {erro && (
          <p className="text-center text-red-500 py-4">{erro}</p>
        )}

        <div className="space-y-4">
          {!loading && reports.length === 0 && !erro && (
            <div className="bg-white p-6 rounded-xl text-center text-gray-400 border border-gray-100">
              Nenhuma ocorrência registrada.
            </div>
          )}

          {reports.map((r) => (
            <div key={r.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs bg-pink-100 text-pink-500 px-3 py-1 rounded-full font-medium capitalize">
                  {r.tipo.replace("_", " ")}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${STATUS_COLOR[r.status] ?? "bg-gray-100 text-gray-500"}`}>
                  {STATUS_LABEL[r.status] ?? r.status}
                </span>
              </div>

              {r.bairro && (
                <h2 className="font-semibold text-gray-700 mt-2">{r.bairro}{r.cidade ? `, ${r.cidade}` : ""}</h2>
              )}

              <p className="text-sm text-gray-400 mt-1 line-clamp-2">{r.descricao}</p>

              <p className="text-xs text-gray-300 mt-2">
                {new Date(r.criado_em).toLocaleDateString("pt-BR")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}