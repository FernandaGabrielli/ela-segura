import { useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

interface LoginProps {
  onBack: () => void;
  onGoToRegister: () => void;
  onForgotPassword: () => void; // 1. Adicionado aqui na interface
}

// 2. Adicionado aqui no destructuring (parâmetros)
export function Login({ onBack, onGoToRegister, onForgotPassword }: LoginProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full h-screen bg-white px-5 py-6 flex flex-col">
      <button onClick={onBack} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center mb-8">
        <ArrowLeft size={20} />
      </button>

      <h1 className="text-[32px] font-bold text-pink-500 leading-tight mb-10">
        Bem-vinda! Vamos garantir uma rota tranquila hoje?
      </h1>

      <div className="flex-1">
        <div className="mb-6">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email ou CPF</label>
          <input
            type="text"
            placeholder="Digite seu email ou CPF"
            className="w-full mt-2 border border-gray-200 bg-[#f7f7f7] rounded-lg px-4 py-4 text-base outline-none focus:border-[#5d5fef]"
          />
        </div>

        <div className="mb-2">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Senha:</label>
          <div className="relative mt-2">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Digite sua senha"
              className="w-full border border-gray-200 bg-[#f7f7f7] rounded-lg px-4 py-4 text-base outline-none focus:border-[#5d5fef]"
            />
            <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div className="flex justify-end mb-10">
          {/* Agora o TypeScript reconhece a função abaixo */}
          <button 
            onClick={onForgotPassword} 
            className="text-sm text-gray-500 hover:text-pink-500 font-medium"
          >
            Esqueceu a senha?
          </button>
        </div>
      </div>

      <button className="w-full bg-[#5d5fef] text-white py-4 rounded-xl font-bold text-lg mb-4 shadow-lg">
        Entrar
      </button>

      <p className="text-center text-sm text-gray-500 pb-4">
        Não possui conta? <button onClick={onGoToRegister} className="text-pink-500 font-bold">Cadastre-se</button>
      </p>
    </div>
  );
}