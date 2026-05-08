interface InputProps {
  label: string;
  placeholder: string;
  type?: string;
}

export function Input({ label, placeholder, type = "text" }: InputProps) {
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