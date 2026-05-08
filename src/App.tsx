import { useState } from "react";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react";

type Screen = "start" | "login" | "register";

export default function App() {
  const [screen, setScreen] = useState<Screen>("start");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    // O container pai agora é apenas um wrapper que ocupa a tela toda
    <div className="min-h-screen bg-white">
      
      {/* START SCREEN */}
      {screen === "start" && (
        <div className="w-full h-screen bg-white overflow-hidden relative">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop"
              alt="background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#5d5fef]/40 to-[#5d5fef]" />
          </div>

          <div className="relative z-10 h-full flex flex-col justify-end items-center px-6 pb-14">
            <div className="flex items-center gap-3 mb-10">
              <div className="border-2 border-white rounded-2xl p-3">
                <ShieldCheck className="text-white w-10 h-10" />
              </div>
              <div className="text-white leading-none">
                <h1 className="text-4xl font-semibold">Ela</h1>
                <h1 className="text-4xl font-semibold">Segura</h1>
              </div>
            </div>

            <button
              onClick={() => setScreen("login")}
              className="w-full bg-white text-[#5d5fef] font-medium py-3 rounded-md mb-4 hover:bg-gray-100 transition"
            >
              Entrar
            </button>

            <button
              onClick={() => setScreen("register")}
              className="w-full bg-white text-pink-500 font-medium py-3 rounded-md hover:bg-gray-100 transition"
            >
              Cadastrar
            </button>
          </div>
        </div>
      )}

      {/* LOGIN SCREEN */}
      {screen === "login" && (
        <div className="w-full h-screen bg-white px-5 py-6 flex flex-col">
          <button
            onClick={() => setScreen("start")}
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center mb-8 hover:bg-gray-50"
          >
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
                className="w-full mt-2 border border-gray-200 bg-[#f7f7f7] rounded-lg px-4 py-4 text-base outline-none focus:border-[#5d5fef] transition-colors"
              />
            </div>

            <div className="mb-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Senha:</label>
              <div className="relative mt-2">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
                  className="w-full border border-gray-200 bg-[#f7f7f7] rounded-lg px-4 py-4 text-base outline-none focus:border-[#5d5fef] transition-colors"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex justify-end mb-10">
              <button className="text-sm text-gray-500 hover:text-pink-500 font-medium">
                Esqueceu a senha?
              </button>
            </div>
          </div>

          <button className="w-full bg-[#5d5fef] text-white py-4 rounded-xl font-bold text-lg mb-4 shadow-lg active:scale-[0.98] transition-transform">
            Entrar
          </button>

          <p className="text-center text-sm text-gray-500 pb-4">
            Não possui conta?{" "}
            <button
              onClick={() => setScreen("register")}
              className="text-pink-500 font-bold"
            >
              Cadastre-se
            </button>
          </p>
        </div>
      )}

      {/* REGISTER SCREEN */}
      {screen === "register" && (
        <div className="w-full h-screen bg-white px-5 py-6 flex flex-col overflow-y-auto">
          <button
            onClick={() => setScreen("start")}
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center mb-8 hover:bg-gray-50"
          >
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

          <button className="w-full bg-[#5d5fef] text-white py-4 rounded-xl font-bold text-lg mt-10 shadow-lg active:scale-[0.98] transition-transform">
            Cadastrar
          </button>

          <p className="text-center text-sm text-gray-500 mt-6 pb-6">
            Já possui conta?{" "}
            <button
              onClick={() => setScreen("login")}
              className="text-pink-500 font-bold"
            >
              Entrar
            </button>
          </p>
        </div>
      )}
    </div>
  );
}

interface InputProps {
  label: string;
  placeholder: string;
  type?: string;
}

function Input({ label, placeholder, type = "text" }: InputProps) {
  return (
    <div>
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full mt-2 border border-gray-200 bg-[#f7f7f7] rounded-lg px-4 py-4 text-base outline-none focus:border-[#5d5fef] transition-colors"
      />
    </div>
  );
}