// NewPassword.tsx

import { ArrowLeft } from "lucide-react";

interface NewPasswordProps {
  onBack?: () => void;
  onNext: () => void;
}

export default function NewPassword({
  onBack,
  onNext
}: NewPasswordProps) {
  return (
    <div className="w-full h-screen bg-white px-5 py-6 flex flex-col">
      <button
        onClick={onBack}
        className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center mb-8"
      >
        <ArrowLeft size={20} />
      </button>

      <h1 className="text-[28px] font-bold text-pink-500 mb-4">
        Adicione uma nova senha
      </h1>

      <p className="text-sm text-gray-400 leading-6 mb-8">
        Crie uma nova senha. Certifique-se de que ela
        seja diferente das anteriores por motivos de
        segurança.
      </p>

      <div className="mb-5">
        <label className="text-xs font-semibold text-gray-500 uppercase">
          Senha
        </label>

        <input
          type="password"
          placeholder="Digite sua nova senha"
          className="w-full mt-2 border border-gray-200 bg-[#f7f7f7] rounded-lg px-4 py-4 outline-none"
        />
      </div>

      <div className="mb-8">
        <label className="text-xs font-semibold text-gray-500 uppercase">
          Confirmar Senha
        </label>

        <input
          type="password"
          placeholder="Digite novamente a senha"
          className="w-full mt-2 border border-gray-200 bg-[#f7f7f7] rounded-lg px-4 py-4 outline-none"
        />
      </div>

      <button onClick={onNext} className="w-full bg-[#5d5fef] text-white py-4 rounded-lg font-medium">
        Atualizar Senha
      </button>
    </div>
  );
}