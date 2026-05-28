// ForgotPassword.tsx

import { ArrowLeft } from "lucide-react";

interface ForgotPasswordProps {
  onBack: () => void;
  onNext: () => void; // Adicione isso
}

export default function ForgotPassword({
  onBack,
  onNext
}: ForgotPasswordProps) {
  return (
    <div className="w-full h-screen bg-white px-5 py-6 flex flex-col">
      <button
        onClick={onBack}
        className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center mb-8"
      >
        <ArrowLeft size={20} />
      </button>

      <h1 className="text-[28px] font-bold text-pink-500 mb-4">
        Esqueceu sua senha?
      </h1>

      <p className="text-sm text-gray-400 mb-8 leading-6">
        Por favor, informe seu email para resetar a senha
      </p>

      <div className="mb-8">
        <label className="text-xs text-gray-500 font-semibold uppercase">
          Email ou CPF
        </label>

        <input
          type="text"
          placeholder="Digite seu email ou CPF"
          className="w-full mt-2 border border-gray-200 bg-[#f7f7f7] rounded-lg px-4 py-4 outline-none"
        />
      </div>

      <button onClick={onNext} className="w-full bg-[#5d5fef] text-white py-4 rounded-lg font-medium">
        Resetar Senha
      </button>
    </div>
  );
}