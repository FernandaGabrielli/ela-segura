import {
    ArrowLeft,
    MapPin,
    Navigation,
    Users,
    Clock3,
    Shield,
    MapPinned,
    ShieldAlert,
    Check,
  } from "lucide-react";
  
  interface CheckinScreenProps {
    onBack: () => void;
    onMap: () => void;
    onEmergency: () => void;
    onConfirm: () => void;
  }
  
  export default function CheckinScreen({
    onBack,
    onMap,
    onEmergency,
    onConfirm,
  }: CheckinScreenProps) {
    return (
      <div className="w-full h-screen bg-[#fafafa] flex flex-col">
        <div className="flex-1 overflow-y-auto px-6 pt-8">
          <button
            onClick={onBack}
            className="w-12 h-12 rounded-2xl border border-[#e7e7e7] bg-white flex items-center justify-center mb-8"
          >
            <ArrowLeft size={22} />
          </button>
  
          <h1 className="text-[36px] font-bold text-[#5e56e8] leading-none">
            Check-in de Segurança
          </h1>
  
          <p className="text-gray-500 text-[17px] leading-7 mt-5">
            Avise seus contatos quando estiver a caminho
            de um local
          </p>
  
          {/* destino */}
          <SectionCard>
            <SectionTitle
              icon={<MapPin size={20} />}
              title="Local de Destino"
            />
  
            <div className="mt-5 h-14 rounded-2xl bg-[#f2f2f4] flex items-center px-5 text-gray-400">
              Buscar endereço...
            </div>
  
            <button className="mt-5 flex items-center gap-3 text-[#7265f4] font-medium">
              <Navigation size={18} />
              Usar localização atual
            </button>
          </SectionCard>
  
          {/* contatos */}
          <SectionCard>
            <SectionTitle
              icon={<Users size={20} />}
              title="Contatos"
            />
  
            <div className="space-y-4 mt-5">
              <Contact selected={false} name="Mãe" />
              <Contact selected name="João" />
            </div>
          </SectionCard>
  
          {/* timer */}
          <SectionCard>
            <SectionTitle
              icon={<Clock3 size={20} />}
              title="Avisar se eu não chegar em:"
            />
  
            <div className="grid grid-cols-2 gap-4 mt-5">
              <TimeButton label="15 min" />
              <TimeButton label="30 min" />
              <TimeButton label="1 hora" active />
              <TimeButton label="2 horas" />
            </div>
          </SectionCard>
  
          <button
            onClick={onConfirm}
            className="w-full h-16 rounded-2xl bg-[#5c57e8] text-white font-semibold text-lg mt-8 shadow-lg"
            >
            Confirmar Check-in
            </button>
        </div>
  
        {/* bottom */}
        <div className="h-24 bg-white border-t border-[#ececec] flex items-center justify-around px-6">
          <TabItem
            icon={<MapPinned size={23} />}
            label="Mapa"
            onClick={onMap}
          />
  
          <button
            onClick={onEmergency}
            className="w-20 h-20 rounded-full bg-[#ff2f5e] flex items-center justify-center shadow-2xl -mt-12"
          >
            <ShieldAlert size={34} className="text-white" />
          </button>
  
          <TabItem
            icon={<Shield size={23} />}
            label="Check-in"
            active
          />
        </div>
      </div>
    );
  }
  
  function SectionCard({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="bg-white border border-[#ececec] rounded-[28px] p-5 mt-6">
        {children}
      </div>
    );
  }
  
  function SectionTitle({
    icon,
    title,
  }: {
    icon: React.ReactNode;
    title: string;
  }) {
    return (
      <div className="flex items-center gap-3 text-[#6b60f2]">
        {icon}
        <h2 className="text-xl font-semibold text-gray-700">
          {title}
        </h2>
      </div>
    );
  }
  
  function Contact({
    name,
    selected,
  }: {
    name: string;
    selected?: boolean;
  }) {
    return (
      <div
        className={`h-20 rounded-2xl border flex items-center px-4 ${
          selected
            ? "border-[#6d42f8] bg-[#f5efff]"
            : "border-transparent bg-[#f5f1f7]"
        }`}
      >
        <div
          className={`w-11 h-11 rounded-full flex items-center justify-center ${
            selected ? "bg-[#6d42f8]" : "bg-[#ddd7df]"
          }`}
        >
          {selected && <Check className="text-white" size={18} />}
        </div>
  
        <div className="ml-4">
          <h3 className="font-semibold text-gray-700">
            {name}
          </h3>
  
          <p className="text-sm text-gray-400">
            (81) 9-1234-6789
          </p>
        </div>
      </div>
    );
  }
  
  function TimeButton({
    label,
    active,
  }: {
    label: string;
    active?: boolean;
  }) {
    return (
      <button
        className={`h-14 rounded-xl text-sm font-medium ${
          active
            ? "border-2 border-[#6d42f8] text-[#6d42f8] bg-[#f5efff]"
            : "bg-[#f1eef3] text-gray-500"
        }`}
      >
        {label}
      </button>
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