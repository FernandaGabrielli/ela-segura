import {
    ArrowLeft,
    AlertTriangle,
    MapPinned,
    Shield,
    Phone,
    ShieldAlert,
    Ambulance,
    MapPin,
  } from "lucide-react";
  
  interface EmergencyScreenProps {
    onBack: () => void;
    onMap: () => void;
    onCheckin: () => void;
  }
  
  export default function EmergencyScreen({
    onBack,
    onMap,
    onCheckin,
  }: EmergencyScreenProps) {
    return (
      <div className="w-full h-screen bg-[#fafafa] flex flex-col">
        <div className="flex-1 overflow-y-auto px-6 pt-8">
          <button
            onClick={onBack}
            className="w-12 h-12 rounded-2xl border border-[#e7e7e7] bg-white flex items-center justify-center mb-8"
          >
            <ArrowLeft size={22} />
          </button>
  
          <h1 className="text-[38px] font-bold text-[#ff2f5e] leading-none">
            Emergência
          </h1>
  
          <p className="text-gray-500 text-[17px] mt-5">
            Ações rápidas para a sua segurança
          </p>
  
          {/* SOS */}
          <button className="w-full rounded-[30px] bg-[#f86f8e] py-10 mt-8 flex flex-col items-center shadow-lg">
            <div className="w-20 h-20 rounded-full bg-[#ef4d58] flex items-center justify-center">
              <AlertTriangle className="text-white" size={36} />
            </div>
  
            <h2 className="text-white font-bold text-4xl mt-5">
              Botão SOS
            </h2>
  
            <p className="text-white/90 mt-2 text-lg">
              Envie sua localização para todos os contatos
            </p>
          </button>
  
          {/* compartilhar */}
          <div className="mt-8 bg-white border border-[#ececec] rounded-[28px] p-5 flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-[#f4e9ff] flex items-center justify-center">
              <MapPin className="text-[#6d42f8]" size={28} />
            </div>
  
            <div>
              <h3 className="font-semibold text-gray-700 text-xl">
                Compartilhar localização
              </h3>
  
              <p className="text-gray-400">
                Enviar localização atual
              </p>
            </div>
          </div>
  
          {/* serviços */}
          <h3 className="mt-10 text-[#7d7398] font-bold tracking-wide text-xl">
            SERVIÇOS DE EMERGÊNCIA
          </h3>
  
          <div className="space-y-4 mt-5">
            <ServiceCard
              icon={<Phone className="text-[#ff4a67]" size={22} />}
              title="Central de Atendimento à Mulher"
              number="180"
            />
  
            <ServiceCard
              icon={<ShieldAlert className="text-[#ff4a67]" size={22} />}
              title="Polícia Militar"
              number="190"
            />
  
            <ServiceCard
              icon={<Ambulance className="text-[#ff4a67]" size={22} />}
              title="Samu"
              number="192"
            />
          </div>
  
          {/* contatos */}
          <h3 className="mt-10 text-[#7d7398] font-bold tracking-wide text-xl">
            CONTATOS PESSOAIS
          </h3>
  
          <div className="space-y-4 mt-5 mb-10">
            <PersonalContact name="Mãe" />
            <PersonalContact name="João" />
          </div>
        </div>
  
        {/* bottom */}
        <div className="h-24 bg-white border-t border-[#ececec] flex items-center justify-around px-6">
          <TabItem
            icon={<MapPinned size={23} />}
            label="Mapa"
            onClick={onMap}
          />
  
          <button className="w-20 h-20 rounded-full bg-[#ff2f5e] flex items-center justify-center shadow-2xl -mt-12">
            <ShieldAlert size={34} className="text-white" />
          </button>
  
          <TabItem
            icon={<Shield size={23} />}
            label="Check-in"
            onClick={onCheckin}
          />
        </div>
      </div>
    );
  }
  
  function ServiceCard({
    icon,
    title,
    number,
  }: {
    icon: React.ReactNode;
    title: string;
    number: string;
  }) {
    return (
      <div className="bg-white border border-[#ececec] rounded-[24px] p-5 flex items-center gap-5">
        <div className="w-14 h-14 rounded-2xl bg-[#fff1f4] flex items-center justify-center">
          {icon}
        </div>
  
        <div>
          <h3 className="font-semibold text-gray-700 text-lg">
            {title}
          </h3>
  
          <p className="text-gray-400">
            {number}
          </p>
        </div>
      </div>
    );
  }
  
  function PersonalContact({
    name,
  }: {
    name: string;
  }) {
    return (
      <div className="bg-white border border-[#ececec] rounded-[24px] p-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#eddcff] flex items-center justify-center text-[#7a4df4] font-bold text-2xl">
            {name.charAt(0)}
          </div>
  
          <div>
            <h3 className="font-semibold text-gray-700 text-lg">
              {name}
            </h3>
  
            <p className="text-gray-400">
              (81) 9 xxxx-xxxx
            </p>
          </div>
        </div>
  
        <button className="w-11 h-11 rounded-full bg-[#f1ddff] flex items-center justify-center">
          <Phone className="text-[#7a4df4]" size={18} />
        </button>
      </div>
    );
  }
  
  function TabItem({
    icon,
    label,
    active,
    onClick,
  }: {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    onClick?: () => void;
  }) {
    return (
      <button
        onClick={onClick}
        className={`flex flex-col items-center gap-1 ${
          active ? "text-[#6d42f8]" : "text-gray-400"
        }`}
      >
        {icon}
  
        <span className="text-sm font-medium">{label}</span>
  
        {active && (
          <div className="w-6 h-[3px] rounded-full bg-[#6d42f8]" />
        )}
      </button>
    );
  }