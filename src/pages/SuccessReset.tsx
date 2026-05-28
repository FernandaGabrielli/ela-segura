// SuccessReset.tsx

import { Check } from "lucide-react";

interface SuccessResetProps {
  onContinue: () => void; 
}

export default function SuccessReset({ onContinue }: SuccessResetProps) {
  return (
    <div className="w-full h-screen bg-white px-5 py-6 flex flex-col items-center justify-center">
      <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center mb-8">
        <Check className="text-white" size={40} />
      </div>

      <h1 className="text-xl font-semibold text-gray-700 mb-3">
        Bem-sucedido
      </h1>

      <p className="text-sm text-gray-400 text-center leading-6 mb-10">
        Parabéns! Sua senha foi alterada.
        Clique em Continuar para fazer login.
      </p>

      <button onClick={onContinue} className="w-full bg-[#5d5fef] text-white py-4 rounded-lg font-medium">
        Continuar
      </button>
    </div>
  );
}