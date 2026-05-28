import {
    ArrowLeft,
    Map,
    Shield,
    ShieldAlert,
    MapPin,
    Clock3,
    Users,
    CheckCircle2,
  } from "lucide-react";
  
  interface CheckinConfirmedProps {
    onBack: () => void;
    onMap: () => void;
    onEmergency: () => void;
    onCancel: () => void;
  }
  
  export default function CheckinConfirmed({
    onBack,
    onMap,
    onEmergency,
    onCancel,
  }: CheckinConfirmedProps) {
    return (
      <div className="w-full h-screen bg-white flex flex-col overflow-hidden">
        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto px-6 pt-12">
          {/* HEADER */}
          <div className="relative flex items-center justify-center">
            <button
              onClick={onBack}
              className="absolute left-0 w-11 h-11 rounded-xl border border-[#E8ECF4] bg-white flex items-center justify-center"
            >
              <ArrowLeft
                size={20}
                className="text-[#1E232C]"
              />
            </button>
  
            <h1 className="text-[22px] font-extrabold text-[#5856D6] tracking-[-0.01em]">
              Olá!
            </h1>
          </div>
  
          {/* DESCRIPTION */}
          <p className="mt-5 text-[14px] leading-[18px] text-[#676C71] max-w-[284px]">
            Avise seus contatos quando estiver a
            caminho de um local
          </p>
  
          {/* CARD */}
          <div className="mt-8 border border-[#7B738C24] rounded-2xl px-6 py-9">
            {/* SUCCESS */}
            <div className="flex flex-col items-center">
              <div className="w-[62px] h-[62px] rounded-full bg-[#18C07A] flex items-center justify-center shadow-sm">
                <CheckCircle2
                  size={34}
                  className="text-white"
                />
              </div>
  
              <h2 className="mt-6 text-[22px] font-semibold text-[#1E1E1E] tracking-[-0.02em]">
                Check-in ativado!
              </h2>
  
              <p className="mt-3 text-center text-[12px] leading-6 text-[#989898] max-w-[268px]">
                Seus contatos serão notificados
                se você não confirmar chegada.
              </p>
            </div>
  
            {/* INFO ITEMS */}
            <div className="mt-8 space-y-3">
              <InfoCard
                icon={<MapPin size={18} />}
                label="Localização atual"
              />
  
              <InfoCard
                icon={<Clock3 size={18} />}
                label="Tempo: 30 min"
              />
  
              <InfoCard
                icon={<Users size={18} />}
                label="1 contato notificado"
              />
            </div>
  
            {/* CONFIRM BUTTON */}
            <button className="w-full h-[47px] mt-8 rounded-lg bg-[#5856D6] text-white text-[13px] font-semibold shadow-sm">
              Confirmar chegada
            </button>
          </div>
  
          {/* CANCEL */}
          <button
            onClick={onCancel}
            className="w-full h-[47px] mt-6 rounded-lg border border-[#FF3A4D] text-[#FF3A4D] text-[13px] font-semibold"
          >
            Cancelar Check-in
          </button>
        </div>
  
        {/* BOTTOM TAB */}
        <div className="relative h-24 border-t border-[#E7E5ED] bg-white flex items-center justify-around px-8">
          <TabItem
            icon={<Map size={22} />}
            label="Mapa"
            onClick={onMap}
          />
  
          {/* CENTER BUTTON */}
          <button
            onClick={onEmergency}
            className="absolute -top-8 left-1/2 -translate-x-1/2 w-[63px] h-[63px] rounded-full bg-[#FF2D55] flex items-center justify-center shadow-xl"
          >
            <ShieldAlert
              size={28}
              className="text-white"
            />
          </button>
  
          <TabItem
            icon={<Shield size={22} />}
            label="Check-in"
            active
          />
        </div>
      </div>
    );
  }
  
  function InfoCard({
    icon,
    label,
  }: {
    icon: React.ReactNode;
    label: string;
  }) {
    return (
      <div className="h-[47px] rounded-lg bg-[#F6F2F8] flex items-center px-4 gap-4">
        <div className="text-[#6938D3]">
          {icon}
        </div>
  
        <span className="text-[14px] font-medium text-[#7B738C]">
          {label}
        </span>
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
        className={`flex flex-col items-center justify-center gap-1 ${
          active
            ? "text-[#6938D3]"
            : "text-[#7B738C]"
        }`}
      >
        {icon}
  
        <span
          className={`text-[12px] ${
            active
              ? "font-medium"
              : "font-light"
          }`}
        >
          {label}
        </span>
  
        {active && (
          <div className="w-6 h-[3px] rounded-full bg-[#6938D3]" />
        )}
      </button>
    );
  }