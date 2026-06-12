import { useState } from "react";
import { X } from "lucide-react";

interface AddContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (contact: { name: string; phone: string }) => void;
}

export default function AddContactModal({ isOpen, onClose, onSave }: AddContactModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  if (!isOpen) return null;

  const handleSave = () => {
    if (!name || !phone) return;
    onSave({ name, phone });
    setName("");
    setPhone("");
    onClose();
  };

  return (
    // Fundo escurecido com opacidade (Equivalente ao rect fill #7B738C 0.5)
    <div className="absolute inset-0 z-50 bg-[#7B738C]/50 backdrop-blur-xs flex items-center justify-center p-8 animate-fade-in">
      
      {/* Card Branco do Modal (rx=30) */}
      <div className="w-full max-w-[340px] bg-white rounded-[30px] border border-[#7B738C]/14 shadow-2xl p-6 relative flex flex-col animate-scale-up">
        
        {/* Botão Fechar (X) no topo direito */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 w-7 h-7 rounded-full bg-[#F2F0F4] flex items-center justify-center text-[#7B738C] hover:bg-gray-200 transition-colors active:scale-95"
        >
          <X size={15} />
        </button>

        {/* Título: "Novo Contato" */}
        <h2 className="text-base font-semibold text-[#676C71] mb-5 tracking-wide mt-1">
          Novo Contato
        </h2>

        {/* Campo: Nome */}
        <div className="flex flex-col gap-1.5 mb-4">
          <label className="text-xs font-medium text-[#676C71]">Nome</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome do contato"
            className="w-full h-[46px] bg-[#F7F8F9] border border-[#E8ECF4] rounded-[8px] px-4 text-sm text-[#8391A1] outline-none focus:border-purple-400 transition-colors"
          />
        </div>

        {/* Campo: Telefone */}
        <div className="flex flex-col gap-1.5 mb-6">
          <label className="text-xs font-medium text-[#676C71]">Telefone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="(81) 9 xxxx-xxxx"
            className="w-full h-[46px] bg-[#F7F8F9] border border-[#E8ECF4] rounded-[8px] px-4 text-sm text-[#8391A1] outline-none focus:border-purple-400 transition-colors"
          />
        </div>

        {/* Botão: Salvar Contato (fill=#5856D6) */}
        <button
          onClick={handleSave}
          disabled={!name || !phone}
          className="w-full h-[40px] bg-[#5856D6] hover:bg-[#4745c4] disabled:bg-gray-300 text-white font-medium text-sm rounded-[8px] flex items-center justify-center transition-all active:scale-[0.98] shadow-md shadow-purple-200"
        >
          Salvar Contato
        </button>

      </div>
    </div>
  );
}