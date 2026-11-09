import Logo from '@/components/Logo';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center">
      <div className="relative mb-4 animate-bounce flex flex-col items-center">
        <Logo className="w-16 h-16 drop-shadow-md" />
        <span className="font-extrabold text-lg text-slate-800 tracking-tight mt-2">
          <span className="text-[#00A3E0]">Coway</span> Logaritma
        </span>
      </div>
      <div className="flex items-center gap-2 text-[#00A3E0] font-bold text-sm tracking-widest uppercase">
        <div className="w-4 h-4 border-2 border-[#00A3E0] border-t-transparent rounded-full animate-spin"></div>
        <span>Memuat...</span>
      </div>
    </div>
  );
}
