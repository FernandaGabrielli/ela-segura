import { ArrowLeft } from "lucide-react";

interface Report {
  id: number;
  type: string;
  location: string;
  description: string;
}

interface MyReportsProps {
  onBack: () => void;
  onNewReport: () => void;
  reports: Report[];
}

// CORREÇÃO AQUI: Adicionado ", reports" dentro das chaves para receber a propriedade
export default function MyReports({
  onBack,
  onNewReport,
  reports, 
}: MyReportsProps) {
  return (
    <div className="w-full h-screen bg-[#fafafa] flex flex-col">
      <div className="px-5 py-6 flex-1 overflow-y-auto">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center mb-6 bg-white active:scale-95 transition-transform"
        >
          <ArrowLeft size={20} />
        </button>

        <h1 className="text-2xl font-bold text-[#5d5fef] mb-6">
          Minhas Ocorrências
        </h1>

        <button
          onClick={onNewReport}
          className="w-full bg-pink-500 text-white py-4 rounded-xl font-semibold mb-6 active:scale-[0.99] transition-transform"
        >
          Registrar Nova Ocorrência
        </button>

        <div className="space-y-4">
          {reports.length === 0 ? (
            <div className="bg-white p-6 rounded-xl text-center text-gray-400 border border-gray-100">
              Nenhuma ocorrência registrada.
            </div>
          ) : (
            reports.map((report) => (
              <ReportCard
                key={report.id}
                type={report.type}
                location={report.location}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function ReportCard({
  type,
  location,
}: {
  type: string;
  location: string;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
      <span className="text-xs bg-pink-100 text-pink-500 px-3 py-1 rounded-full font-medium">
        {type}
      </span>

      <h2 className="font-semibold text-gray-700 mt-3">
        {location}
      </h2>

      <p className="text-sm text-gray-400 mt-2">
        Ocorrência registrada recentemente.
      </p>
    </div>
  );
}