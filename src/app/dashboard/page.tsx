import { CheckCircle2, TrendingUp, Users, AlertCircle, CalendarClock, Target, Briefcase, FileText } from 'lucide-react';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions, prisma } from '@/lib/auth';
import { redirect } from 'next/navigation';
import FollowUpAssistant from '@/components/dashboard/FollowUpAssistant';

export default async function DashboardOverview() {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    redirect('/login');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userId = (session.user as any).id;
  const userName = session.user.name || 'Agen Coway';

  // Fetch real data from Prisma where available
  const newLeadsCount = await prisma.lead.count({
    where: { agentId: userId, status: 'NEW' }
  });

  const closedLeadsCount = await prisma.lead.count({
    where: { agentId: userId, status: 'CLOSED' }
  });

  // Mocking detailed CRM data until schema is updated
  const metrics = {
    prospekBaru: newLeadsCount,
    perluFollowUp: 8,
    sedangNegosiasi: 4,
    demo: 3,
    closingBulanIni: closedLeadsCount,
    estimasiPipeline: 24500000 // Rp 24.500.000
  };

  const followUpTargets = [
    {
      id: '1',
      name: 'Andi Pratama',
      score: 80,
      temperature: 'Very Hot' as const,
      daysSinceLastContact: 3,
      phone: '081234567890'
    },
    {
      id: '2',
      name: 'Budi Santoso',
      score: 65,
      temperature: 'Hot' as const,
      daysSinceLastContact: 5,
      phone: '081298765432'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-[2rem] p-8 md:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#00A3E0] rounded-full blur-3xl opacity-20 -mr-20 -mt-20"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                <CheckCircle2 size={14} /> Akun Aktif
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black mb-2">Selamat Datang, {userName}!</h2>
            <p className="text-slate-300 text-lg max-w-xl">
              Fokus pada konsultasi dan closing. Biarkan sistem membantu mengelola prospek Anda hari ini.
            </p>
          </div>
          <div>
            <Link href="/dashboard/leads" className="inline-flex items-center justify-center gap-2 bg-[#00A3E0] hover:bg-sky-500 text-white font-bold px-8 py-4 rounded-xl transition shadow-lg shadow-sky-500/20">
              <AlertCircle size={20} />
              Follow-up Hari Ini
            </Link>
          </div>
        </div>
      </div>

      {/* Follow-up Assistant Component */}
      <FollowUpAssistant targets={followUpTargets} />

      {/* Financial & Pipeline Metrics */}
      <div>
        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <TrendingUp className="text-[#00A3E0]" /> Pipeline & Konversi
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm">
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Estimasi Pipeline</p>
            <p className="text-4xl md:text-5xl font-black text-slate-900 mb-2">
              Rp {metrics.estimasiPipeline.toLocaleString('id-ID')}
            </p>
            <p className="text-sm font-medium text-slate-500 flex items-center gap-2">
              <span className="text-green-500 flex items-center gap-1"><TrendingUp size={14} /> +12%</span> dari bulan lalu
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm">
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Closing Bulan Ini</p>
            <p className="text-4xl md:text-5xl font-black text-[#00A3E0] mb-2">
              {metrics.closingBulanIni} <span className="text-2xl text-slate-400">Unit</span>
            </p>
            <p className="text-sm font-medium text-slate-500 flex items-center gap-2">
              Target bulanan: 5 Unit
            </p>
          </div>
        </div>
      </div>

      {/* Status CRM Metrics */}
      <div>
        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Users className="text-[#00A3E0]" /> Status Prospek
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:border-[#00A3E0] transition">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
              <Users size={20} />
            </div>
            <p className="text-3xl font-black text-slate-900">{metrics.prospekBaru}</p>
            <p className="text-sm font-bold text-slate-500 mt-1">Prospek Baru</p>
          </div>
          
          <div className="bg-white rounded-2xl p-5 border border-orange-200 shadow-sm hover:border-orange-400 transition bg-orange-50/30">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-3">
              <CalendarClock size={20} />
            </div>
            <p className="text-3xl font-black text-orange-600">{metrics.perluFollowUp}</p>
            <p className="text-sm font-bold text-orange-700 mt-1">Perlu Follow-up</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:border-[#00A3E0] transition">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
              <Briefcase size={20} />
            </div>
            <p className="text-3xl font-black text-slate-900">{metrics.sedangNegosiasi}</p>
            <p className="text-sm font-bold text-slate-500 mt-1">Sedang Negosiasi</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:border-[#00A3E0] transition">
            <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center mb-3">
              <Target size={20} />
            </div>
            <p className="text-3xl font-black text-slate-900">{metrics.demo}</p>
            <p className="text-sm font-bold text-slate-500 mt-1">Jadwal Demo</p>
          </div>
        </div>
      </div>
      
      {/* Sales Kit Shortcut */}
      <div className="bg-slate-900 rounded-[2rem] p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl font-black mb-2 flex items-center gap-3">
            <FileText className="text-[#00A3E0]" /> Sales Kit & Skrip
          </h3>
          <p className="text-slate-400 font-medium">Customer bilang mahal? Ragu? Temukan cara menjawabnya di sini.</p>
        </div>
        <Link href="/dashboard/sales-kit" className="whitespace-nowrap px-8 py-4 bg-white hover:bg-slate-100 text-slate-900 font-bold rounded-xl transition shadow-lg shadow-white/10">
          Buka Sales Kit
        </Link>
      </div>
    </div>
  );
}
