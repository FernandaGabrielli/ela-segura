import { ArrowLeft } from "lucide-react";
import { Input } from "../components/Input";

interface RegisterProps {
  onBack: () => void;
  onGoToLogin: () => void;
}

export function Register({ onBack, onGoToLogin }: RegisterProps) {
  return (
    <div className="w-full h-screen bg-white px-5 py-6 flex flex-col overflow-y-auto">
      <button onClick={onBack} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center mb-8">
        <ArrowLeft size={20} />
      </button>

      <h1 className="text-[30px] font-bold text-pink-500 leading-tight mb-8">
        Comece agora com segurança!
      </h1>

      <div className="space-y-5 flex-1">
        <Input label="Nome Completo" placeholder="Nome" />
        <Input label="CPF" placeholder="000.000.000-00" />
        <Input label="Telefone" placeholder="(00) 00000-0000" />
        <Input label="Email" placeholder="seu@email.com" />
        <Input label="Senha" placeholder="Crie uma senha" type="password" />
      </div>

      <button className="w-full bg-[#5d5fef] text-white py-4 rounded-xl font-bold text-lg mt-10 shadow-lg">
        Cadastrar
      </button>

      <p className="text-center text-sm text-gray-500 mt-6 pb-6">
        Já possui conta? <button onClick={onGoToLogin} className="text-pink-500 font-bold">Entrar</button>
      </p>
    </div>
  );
}