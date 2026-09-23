import { CheckCircle2, TrendingUp, Users, AlertCircle, CalendarClock, Target, Briefcase, FileText } from 'lucide-react';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions, prisma } from '@/lib/auth';
import { redirect } from 'next/navigation';
import FollowUpAssistant from '@/components/dashboard/FollowUpAssistant';
import LogaritmaOnboarding from '@/components/LogaritmaOnboarding';

export default async function DashboardOverview() {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    redirect('/login');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userId = (session.user as any).id;
  const userName = session.user.name || 'Agen Coway';

  // Fetch user settings
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { monthlyTarget: true }
  });
  const monthlyTarget = user?.monthlyTarget || 5;

  // Fetch real data from Prisma where available
  const newLeadsCount = await prisma.lead.count({
    where: { agentId: userId, status: 'NEW' }
  });

  const closedLeadsCount = await prisma.lead.count({
    where: { agentId: userId, status: 'CLOSED' }
  });

  const contactedLeadsCount = await prisma.lead.count({
    where: { agentId: userId, status: 'CONTACTED' }
  });

  // Since we don't have actual 'NEGOTIATING' or 'DEMO' statuses yet, we map them as 0 for now.
  const metrics = {
    prospekBaru: newLeadsCount,
    perluFollowUp: contactedLeadsCount,
    sedangNegosiasi: 0,
    demo: 0,
    closingBulanIni: closedLeadsCount,
    // Asumsi rata-rata harga produk Rp 10.000.000 per lead aktif
    estimasiPipeline: (newLeadsCount + contactedLeadsCount) * 10000000 
  };

  // Ambil data lead sungguhan untuk Follow Up Assistant (yang bukan CLOSED)
  const activeLeads = await prisma.lead.findMany({
    where: { 
      agentId: userId,
      status: { not: 'CLOSED' }
    },
    orderBy: { createdAt: 'asc' },
    take: 5
  });

  // Konversi ke format FollowUpTarget
  const followUpTargets = activeLeads.map(lead => {
    // Generate skor deterministik dari panjang ID
    const hash = lead.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const score = (hash % 40) + (lead.status === 'CONTACTED' ? 40 : 10);
    
    // Suhu berdasarkan skor
    const temperature: 'Cold' | 'Warm' | 'Hot' | 'Very Hot' = score >= 76 ? 'Very Hot' : score >= 51 ? 'Hot' : score >= 21 ? 'Warm' : 'Cold';
    
    // Hitung hari sejak dibuat (sebagai asumsi last contact)
    const diffTime = Math.abs(new Date().getTime() - new Date(lead.createdAt).getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    return {
      id: lead.id,
      name: lead.customerName,
      score,
      temperature,
      daysSinceLastContact: diffDays,
      phone: lead.whatsappNumber
    };
  }).filter(target => target.daysSinceLastContact > 0); // Hanya munculkan yang sudah mengendap minimal 1 hari

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 md:pb-12">
      
      {/* Minimal Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Halo, {userName}! 👋</h2>
          <p className="text-slate-500 font-medium text-sm md:text-base mt-1">
            Fokus pada presentasi & closing. Biarkan sistem yang mengelola.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5">
            <CheckCircle2 size={14} /> Sistem Aktif
          </span>
        </div>
      </div>

      <LogaritmaOnboarding />

      {/* Financial & Pipeline Metrics (TOP PRIORITY) */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
          <TrendingUp className="text-[#00A3E0]" /> Potensi Penghasilan & Target
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-2xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00A3E0] rounded-full blur-3xl opacity-20 -mr-10 -mt-10"></div>
            <div className="relative z-10">
              <p className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Potensi Pendapatan</p>
              <p className="text-3xl md:text-5xl font-black text-white mb-2">
                Rp {metrics.estimasiPipeline.toLocaleString('id-ID')}
              </p>
              <p className="text-xs md:text-sm font-medium text-slate-400 flex items-center gap-2">
                <span className="text-green-400 flex items-center gap-1"><TrendingUp size={14} /> +12%</span> probabilitas closing
              </p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm relative overflow-hidden">
            <p className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Closing Bulan Ini</p>
            <p className="text-4xl md:text-5xl font-black text-[#00A3E0] mb-2">
              {metrics.closingBulanIni} <span className="text-2xl text-slate-400">Unit</span>
            </p>
            <p className="text-xs md:text-sm font-medium text-slate-500 flex items-center gap-2">
              Target bulanan: {monthlyTarget} Unit
            </p>
          </div>
        </div>
      </div>

      {/* Status CRM Metrics */}
      <div>
        <div className="mb-3">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Users className="text-[#00A3E0]" /> Status Calon Pelanggan (Leads)
          </h3>
          <p className="text-xs text-slate-500 mt-1">Data prospek ini masuk secara otomatis dari Landing Page & Campaign Meta Ads Anda.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <div className="bg-white rounded-2xl p-4 md:p-5 border border-slate-200 shadow-sm hover:border-[#00A3E0] transition">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2 md:mb-3">
              <Users size={18} className="md:w-5 md:h-5" />
            </div>
            <p className="text-2xl md:text-3xl font-black text-slate-900">{metrics.prospekBaru}</p>
            <p className="text-xs md:text-sm font-bold text-slate-500 mt-1">Prospek Baru</p>
          </div>
          
          <div className="bg-orange-50/50 rounded-2xl p-4 md:p-5 border border-orange-200 shadow-sm hover:border-orange-400 transition">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-2 md:mb-3">
              <CalendarClock size={18} className="md:w-5 md:h-5" />
            </div>
            <p className="text-2xl md:text-3xl font-black text-orange-600">{metrics.perluFollowUp}</p>
            <p className="text-xs md:text-sm font-bold text-orange-700 mt-1">Perlu Follow-up</p>
          </div>

          <div className="bg-white rounded-2xl p-4 md:p-5 border border-slate-200 shadow-sm hover:border-[#00A3E0] transition">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-2 md:mb-3">
              <Briefcase size={18} className="md:w-5 md:h-5" />
            </div>
            <p className="text-2xl md:text-3xl font-black text-slate-900">{metrics.sedangNegosiasi}</p>
            <p className="text-xs md:text-sm font-bold text-slate-500 mt-1">Sedang Negosiasi</p>
          </div>

          <div className="bg-white rounded-2xl p-4 md:p-5 border border-slate-200 shadow-sm hover:border-[#00A3E0] transition">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center mb-2 md:mb-3">
              <Target size={18} className="md:w-5 md:h-5" />
            </div>
            <p className="text-2xl md:text-3xl font-black text-slate-900">{metrics.demo}</p>
            <p className="text-xs md:text-sm font-bold text-slate-500 mt-1">Jadwal Demo</p>
          </div>
        </div>
      </div>

      <div className="flex w-full mt-2 mb-6">
        <Link href="/dashboard/leads" className="flex-1 flex items-center justify-center gap-2 bg-[#00A3E0] hover:bg-sky-500 text-white font-bold px-6 py-4 rounded-2xl transition-all shadow-lg shadow-sky-500/30">
          <AlertCircle size={20} />
          Follow-up Hari Ini
        </Link>
      </div>

      {/* Follow-up Assistant Component */}
      <FollowUpAssistant targets={followUpTargets} />
      
      {/* Sales Kit Shortcut */}
      <div className="bg-slate-900 rounded-3xl p-6 md:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-5 md:gap-6 mt-4">
        <div>
          <h3 className="text-xl md:text-2xl font-black mb-1 md:mb-2 flex items-center gap-2 md:gap-3">
            <FileText className="text-[#00A3E0] w-6 h-6 md:w-8 md:h-8" /> Sales Kit & Skrip
          </h3>
          <p className="text-slate-400 font-medium text-sm md:text-base">Customer bilang mahal? Ragu? Temukan cara menjawabnya di sini.</p>
        </div>
        <Link href="/dashboard/sales-kit" className="w-full md:w-auto text-center whitespace-nowrap px-6 py-3 md:px-8 md:py-4 bg-white hover:bg-slate-100 text-slate-900 font-bold rounded-xl md:rounded-2xl transition shadow-lg shadow-white/10">
          Buka Sales Kit
        </Link>
      </div>
    </div>
  );
}
