import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { auth } from "../services/api";
import { Input } from "../components/Input";

interface RegisterProps {
  onBack: () => void;
  onGoToLogin: () => void;
}

export function Register({ onBack, onGoToLogin }: RegisterProps) {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCadastro = async () => {
    if (!nome || !email || !telefone || !senha) {
      setErro("Preencha todos os campos.");
      return;
    }
    setErro("");
    setLoading(true);
    try {
      await auth.cadastrar({ nome, email, telefone, senha });
      onGoToLogin(); // após cadastro, vai para login (ou mude para onLogin() se quiser entrar direto)
    } catch (e: unknown) {
      setErro(e instanceof Error ? e.message : "Erro ao cadastrar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-white px-5 py-6 flex flex-col overflow-y-auto">
      <button
        onClick={onBack}
        className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center mb-8"
      >
        <ArrowLeft size={20} />
      </button>

      <h1 className="text-[30px] font-bold text-pink-500 leading-tight mb-8">
        Comece agora com segurança!
      </h1>

      <div className="space-y-5 flex-1">
        <Input label="Nome Completo" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
        <Input label="Telefone" placeholder="(00) 00000-0000" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
        <Input label="Email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input label="Senha" placeholder="Crie uma senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
      </div>

      {erro && <p className="text-sm text-red-500 mt-4 text-center">{erro}</p>}

      <button
        onClick={handleCadastro}
        disabled={loading}
        className="w-full bg-[#5d5fef] text-white py-4 rounded-xl font-bold text-lg mt-10 shadow-lg disabled:opacity-60"
      >
        {loading ? "Cadastrando..." : "Cadastrar"}
      </button>

      <p className="text-center text-sm text-gray-500 mt-6 pb-6">
        Já possui conta?{" "}
        <button onClick={onGoToLogin} className="text-pink-500 font-bold">
          Entrar
        </button>
      </p>
    </div>
  );
}