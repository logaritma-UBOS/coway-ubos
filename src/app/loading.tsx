export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center">
      <div className="relative w-32 h-12 mb-4 animate-bounce">
        <img 
          src="https://member.smartmillionaire.co.id/wp-content/uploads/2026/07/coway-new-logo-2020.png" 
          alt="Loading..." 
          className="w-full h-full object-contain"
        />
      </div>
      <div className="flex items-center gap-2 text-[#00A3E0] font-bold text-sm tracking-widest uppercase">
        <i className="fa-solid fa-circle-notch fa-spin"></i> Memuat...
      </div>
    </div>
  );
}
