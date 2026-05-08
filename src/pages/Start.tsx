import { ShieldCheck } from "lucide-react";

interface StartProps {
  onLogin: () => void;
  onRegister: () => void;
}

export function Start({ onLogin, onRegister }: StartProps) {
  return (
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
          onClick={onLogin}
          className="w-full bg-white text-[#5d5fef] font-medium py-3 rounded-md mb-4 hover:bg-gray-100 transition"
        >
          Entrar
        </button>

        <button
          onClick={onRegister}
          className="w-full bg-white text-pink-500 font-medium py-3 rounded-md hover:bg-gray-100 transition"
        >
          Cadastrar
        </button>
      </div>
    </div>
  );
}