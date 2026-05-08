// VerifyCode.tsx

import { ArrowLeft } from "lucide-react";

interface VerifyCodeProps {
  onBack: () => void;
  onNext: () => void; // Adicione esta linha
}

export default function VerifyCode({
  onBack,
  onNext
}: VerifyCodeProps) {
  return (
    <div className="w-full h-screen bg-white px-5 py-6 flex flex-col">
      <button
        onClick={onBack}
        className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center mb-8"
      >
        <ArrowLeft size={20} />
      </button>

      <h1 className="text-[28px] font-bold text-pink-500 mb-3">
        Verifique seu email
      </h1>

      <p className="text-sm text-gray-400 leading-6 mb-2">
        Enviamos um link de redefinição para:
      </p>

      <p className="text-sm text-gray-600 mb-4">
        anam@gmail.com
      </p>

      <p className="text-sm text-gray-400 mb-8">
        Digite o código de 5 dígitos mencionado no e-mail
      </p>

      <div className="flex justify-between gap-3 mb-8">
        {[1, 2, 3, 4, 5].map((item) => (
          <input
            key={item}
            maxLength={1}
            className="w-14 h-14 border border-gray-200 rounded-lg text-center text-xl outline-none"
          />
        ))}
      </div>

      <button onClick={onNext} className="w-full bg-[#5d5fef] text-white py-4 rounded-lg font-medium">
        Verificar Código
      </button>

      <p className="text-sm text-center text-gray-400 mt-5">
        Não recebeu o email ainda?{" "}
        <button className="text-pink-500 font-medium">
          Reenviar
        </button>
      </p>
    </div>
  );
}