import WhatsAppCTA from './WhatsAppCTA';

interface Agent {
  id: string;
  fullName: string;
  whatsappNumber: string;
  profileImageUrl: string | null;
  bio: string | null;
}

export default function LandingPageUI({ agent }: { agent: Agent }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100">
      {/* Navbar Placeholder */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="font-bold text-blue-600 text-xl tracking-tight">Coway.</div>
          <div className="flex items-center gap-3">
            {agent.profileImageUrl ? (
              <img src={agent.profileImageUrl} alt={agent.fullName} className="w-8 h-8 rounded-full border border-slate-200 object-cover" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                {agent.fullName.charAt(0)}
              </div>
            )}
            <span className="text-sm font-medium text-slate-600 hidden sm:block">By {agent.fullName}</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-4 py-16 md:py-24 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
          Air Bersih & Murni untuk Keluarga Anda
        </h1>
        <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
          {agent.bio || "Tingkatkan kualitas hidup keluarga dengan pemurni air berteknologi RO terbaik dari Coway. Konsultasi gratis sekarang."}
        </p>
        
        <div className="max-w-md mx-auto">
          <WhatsAppCTA 
            agentId={agent.id}
            agentName={agent.fullName}
            whatsappNumber={agent.whatsappNumber}
          />
          <p className="text-xs text-slate-500 mt-4">Respon cepat dalam 5 menit. Konsultasi 100% Gratis.</p>
        </div>
      </section>

      {/* Products Showcase Placeholder */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Produk Unggulan Coway</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Product 1 */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:shadow-xl transition-shadow">
              <div className="aspect-square bg-slate-200 rounded-xl mb-6 flex items-center justify-center text-slate-400">
                [Gambar Coway Ombak]
              </div>
              <h3 className="text-xl font-bold mb-2">Coway Ombak (CHP-7310R)</h3>
              <p className="text-slate-600 mb-6 text-sm">Pemurni air inovatif dengan 50 kombinasi suhu & volume air. Ideal untuk berbagai kebutuhan minuman.</p>
              <WhatsAppCTA 
                agentId={agent.id}
                agentName={agent.fullName}
                whatsappNumber={agent.whatsappNumber}
                productName="Ombak"
              />
            </div>
            {/* Product 2 */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:shadow-xl transition-shadow">
              <div className="aspect-square bg-slate-200 rounded-xl mb-6 flex items-center justify-center text-slate-400">
                [Gambar Coway Neo Plus]
              </div>
              <h3 className="text-xl font-bold mb-2">Coway Neo Plus (CHP-264L)</h3>
              <p className="text-slate-600 mb-6 text-sm">Pemurni air minimalis terlaris untuk rumah modern. Kapasitas besar dengan desain yang elegan.</p>
              <WhatsAppCTA 
                agentId={agent.id}
                agentName={agent.fullName}
                whatsappNumber={agent.whatsappNumber}
                productName="Neo Plus"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-4 text-center">
        <p className="mb-2">© {new Date().getFullYear()} Coway Health Planner - {agent.fullName}.</p>
        <p className="text-sm">Powered by Logaritma UBOS.</p>
      </footer>
    </div>
  );
}
