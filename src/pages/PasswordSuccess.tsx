// PasswordSuccess.tsx

import { ArrowLeft } from "lucide-react";

interface PasswordSuccessProps {
  onBack?: () => void;
  onNext: () => void;
}

export default function PasswordSuccess({
  onBack,
  onNext
}: PasswordSuccessProps) {
  return (
    <div className="w-full h-screen bg-white px-5 py-6 flex flex-col">
      <button
        onClick={onBack}
        className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center mb-8"
      >
        <ArrowLeft size={20} />
      </button>

      <h1 className="text-[28px] font-bold text-pink-500 mb-4">
        Senha redefinida
      </h1>

      <p className="text-sm text-gray-400 leading-6 mb-10">
        Sua senha foi redefinida com sucesso.
        Clique em confirmar para definir uma nova senha.
      </p>

      <button onClick={onNext} className="w-full bg-[#5d5fef] text-white py-4 rounded-lg font-medium">
        Confirmar
      </button>
    </div>
  );
}