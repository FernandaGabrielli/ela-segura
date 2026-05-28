// MyReports.tsx

import { ArrowLeft } from "lucide-react";

interface MyReportsProps {
  onBack: () => void;
  onNewReport: () => void;
}

export default function MyReports({
  onBack,
  onNewReport,
}: MyReportsProps) {
  return (
    <div className="w-full h-screen bg-[#fafafa] flex flex-col">
      <div className="px-5 py-6 flex-1 overflow-y-auto">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center mb-6"
        >
          <ArrowLeft size={20} />
        </button>

        <h1 className="text-2xl font-bold text-[#5d5fef] mb-6">
          Minhas Ocorrências
        </h1>

        <button
          onClick={onNewReport}
          className="w-full bg-pink-500 text-white py-4 rounded-xl font-semibold mb-6"
        >
          Registrar Nova Ocorrência
        </button>

        <div className="space-y-4">
          <ReportCard
            type="Roubo/Furto"
            location="Boa Viagem, Recife"
          />

          <ReportCard
            type="Perseguição"
            location="Centro, Recife"
          />
        </div>
      </div>

      <BottomTab />
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
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <span className="text-xs bg-pink-100 text-pink-500 px-3 py-1 rounded-full">
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