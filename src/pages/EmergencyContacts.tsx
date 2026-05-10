// EmergencyContacts.tsx

import {
  ArrowLeft,
  Phone,
  Trash,
} from "lucide-react";

interface EmergencyContactsProps {
  onBack: () => void;
}

export default function EmergencyContacts({
  onBack,
}: EmergencyContactsProps) {
  return (
    <div className="w-full h-screen bg-[#fafafa] flex flex-col">
      <div className="px-5 py-6 flex-1">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center mb-6"
        >
          <ArrowLeft size={20} />
        </button>

        <h1 className="text-2xl font-bold text-[#5d5fef] mb-8">
          Contatos Emergenciais
        </h1>

        <div className="space-y-4">
          <ContactCard name="Mãe" />
          <ContactCard name="João" />
        </div>
      </div>

      <BottomTab />
    </div>
  );
}

function ContactCard({
  name,
}: {
  name: string;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between">
      <div>
        <h2 className="font-semibold text-gray-700">
          {name}
        </h2>

        <p className="text-sm text-gray-400">
          (81) 9 xxxx-xxxx
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button className="w-9 h-9 rounded-full bg-[#ede9ff] flex items-center justify-center">
          <Phone size={16} className="text-[#5d5fef]" />
        </button>

        <button className="w-9 h-9 rounded-full bg-pink-100 flex items-center justify-center">
          <Trash size={16} className="text-pink-500" />
        </button>
      </div>
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