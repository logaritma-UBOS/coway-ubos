import { 
  CheckCircle2, 
  TrendingUp, 
  Users, 
  AlertCircle, 
  CalendarClock, 
  Target, 
  Briefcase, 
  FileText, 
  Globe, 
  ExternalLink, 
  Sparkles, 
  ArrowUpRight,
  ShoppingBag
} from 'lucide-react';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions, prisma } from '@/lib/auth';
import { redirect } from 'next/navigation';
import FollowUpAssistant from '@/components/dashboard/FollowUpAssistant';
import LogaritmaOnboarding from '@/components/LogaritmaOnboarding';
import CopyLinkButton from '@/components/CopyLinkButton';

export default async function DashboardOverview() {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    redirect('/login');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userId = (session.user as any).id;
  const userName = session.user.name || 'Health Planner';

  // Fetch user data
  const user = await (prisma.user as any).findUnique({
    where: { id: userId },
    select: { 
      monthlyTarget: true,
      slug: true,
      isPremium: true,
      hasProductLp: true,
      hasRecruitLp: true,
    }
  });

  const monthlyTarget = user?.monthlyTarget || 5;
  const slug = user?.slug || '';
  const isPremium = user?.isPremium || false;

  // Real lead counts
  const newLeadsCount = await prisma.lead.count({
    where: { agentId: userId, status: 'NEW' }
  });

  const closedLeadsCount = await prisma.lead.count({
    where: { agentId: userId, status: 'CLOSED' }
  });

  const contactedLeadsCount = await prisma.lead.count({
    where: { agentId: userId, status: 'CONTACTED' }
  });

  const metrics = {
    prospekBaru: newLeadsCount,
    perluFollowUp: contactedLeadsCount,
    sedangNegosiasi: 0,
    demo: 0,
    closingBulanIni: closedLeadsCount,
  };

  // Target progress percentage (max 100%)
  const targetProgress = Math.min(Math.round((metrics.closingBulanIni / monthlyTarget) * 100), 100);
  const unitsRemaining = Math.max(monthlyTarget - metrics.closingBulanIni, 0);

  // Active leads for follow up assistant
  const activeLeads = await prisma.lead.findMany({
    where: { 
      agentId: userId,
      status: { not: 'CLOSED' }
    },
    orderBy: { createdAt: 'asc' },
    take: 5
  });

  const followUpTargets = activeLeads.map(lead => {
    const hash = lead.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const score = (hash % 40) + (lead.status === 'CONTACTED' ? 40 : 10);
    const temperature: 'Cold' | 'Warm' | 'Hot' | 'Very Hot' = score >= 76 ? 'Very Hot' : score >= 51 ? 'Hot' : score >= 21 ? 'Warm' : 'Cold';
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
  }).filter(target => target.daysSinceLastContact > 0);

  const productLpUrl = `https://coway.logaritma.id/${slug}`;
  const recruitLpUrl = `https://coway.logaritma.id/${slug}/karir`;

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 md:pb-12 max-w-7xl">
      
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              Halo, {userName}! 👋
            </h2>
            <span className="px-2.5 py-0.5 bg-sky-50 text-[#0084B6] border border-sky-200 rounded-full text-xs font-bold">
              Health Planner
            </span>
          </div>
          <p className="text-slate-500 font-medium text-sm md:text-base mt-1">
            Pusat kendali harian Anda: kelola prospek masuk, pantau target closing, dan jalankan follow-up terarah.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link 
            href="/dashboard/leads"
            className="px-4 py-2.5 bg-[#00A3E0] hover:bg-sky-500 text-white font-bold text-sm rounded-xl transition shadow-md shadow-sky-500/20 flex items-center gap-2"
          >
            <Users size={16} />
            <span>Lihat Semua Prospek ({metrics.prospekBaru + metrics.perluFollowUp})</span>
          </Link>
        </div>
      </div>

      <LogaritmaOnboarding />

      {/* Top Section: Quick Share Links & Real Target Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Quick Links Card (Paling penting untuk agen) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-7 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-sky-50 text-[#00A3E0] flex items-center justify-center">
                  <Globe size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Toko Online Resmi Anda</h3>
                  <p className="text-xs text-slate-500 font-medium">Bagikan link ini ke calon pembeli atau jadikan tujuan iklan Meta Ads.</p>
                </div>
              </div>
              <Link 
                href="/dashboard/landingpage" 
                className="text-xs font-bold text-[#00A3E0] hover:underline flex items-center gap-1"
              >
                Pengaturan <ArrowUpRight size={14} />
              </Link>
            </div>

            {/* Product LP Bar */}
            <div className="space-y-3 pt-2">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="min-w-0">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                    Landing Page Penjualan (Produk)
                  </span>
                  <p className="text-sm font-mono font-semibold text-slate-800 truncate">
                    {productLpUrl}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <div className="bg-white border border-slate-200 rounded-xl px-2.5 py-1 text-slate-700 hover:text-slate-900">
                    <CopyLinkButton url={productLpUrl} />
                  </div>
                  <a 
                    href={productLpUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-sm"
                  >
                    <span>Buka</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>

              {/* Recruit LP Bar */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="min-w-0">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                    Landing Page Rekrut Tim (Karir HP)
                  </span>
                  <p className="text-sm font-mono font-semibold text-slate-800 truncate">
                    {recruitLpUrl}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <div className="bg-white border border-slate-200 rounded-xl px-2.5 py-1 text-slate-700 hover:text-slate-900">
                    <CopyLinkButton url={recruitLpUrl} />
                  </div>
                  <a 
                    href={recruitLpUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-sm"
                  >
                    <span>Buka</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5 text-emerald-600 font-bold">
              <CheckCircle2 size={14} /> Otomatis terhubung ke nomor WhatsApp Anda
            </span>
            <span>Status: {isPremium ? "Lisensi Aktif" : "Preview"}</span>
          </div>
        </div>

        {/* Real Unit Closing Target Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 text-white rounded-3xl p-6 md:p-7 shadow-lg flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#00A3E0]/15 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-300 flex items-center gap-1.5">
                <Target size={15} /> Target Unit Bulan Ini
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Goal: {monthlyTarget} Unit
              </span>
            </div>

            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                {metrics.closingBulanIni}
              </span>
              <span className="text-xl text-slate-400 font-bold">
                / {monthlyTarget} Unit Terpasang
              </span>
            </div>

            {/* Progress bar */}
            <div className="space-y-2">
              <div className="w-full bg-slate-700/80 rounded-full h-3 overflow-hidden p-0.5">
                <div 
                  className="bg-gradient-to-r from-[#00A3E0] to-emerald-400 h-full rounded-full transition-all duration-700"
                  style={{ width: `${targetProgress}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-xs font-medium text-slate-300">
                <span>Pencapaian: {targetProgress}%</span>
                <span>{unitsRemaining > 0 ? `Sisa ${unitsRemaining} unit lagi` : "🎉 Target tercapai!"}</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-6 mt-6 border-t border-slate-800 flex items-center justify-between">
            <p className="text-xs text-slate-300 font-medium">
              Tembus target membuka peluang kontes reward & kenaikan jenjang karir.
            </p>
            <Link 
              href="/dashboard/target"
              className="text-xs font-bold text-sky-300 hover:text-white whitespace-nowrap ml-3"
            >
              Ubah Target
            </Link>
          </div>
        </div>

      </div>

      {/* Status CRM Pipeline Cards */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Users className="text-[#00A3E0]" size={20} /> Pipeline Calon Pelanggan (Leads)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">
              Data calon pembeli yang masuk dari Website Toko Anda & Iklan Meta Ads.
            </p>
          </div>
          <Link 
            href="/dashboard/leads" 
            className="text-xs font-bold text-[#00A3E0] hover:underline"
          >
            Buka Tabel Leads →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <Link 
            href="/dashboard/leads?status=NEW"
            className="bg-white rounded-2xl p-4 md:p-5 border border-slate-200/80 shadow-sm hover:border-sky-400 hover:shadow-md transition group"
          >
            <div className="w-9 h-9 rounded-xl bg-sky-50 text-[#00A3E0] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Users size={18} />
            </div>
            <p className="text-2xl md:text-3xl font-black text-slate-900">{metrics.prospekBaru}</p>
            <p className="text-xs md:text-sm font-bold text-slate-600 mt-1">Prospek Baru</p>
            <span className="text-[10px] text-slate-400 font-medium">Belum dihubungi</span>
          </Link>
          
          <Link 
            href="/dashboard/leads?status=CONTACTED"
            className="bg-white rounded-2xl p-4 md:p-5 border border-slate-200/80 shadow-sm hover:border-orange-400 hover:shadow-md transition group"
          >
            <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <CalendarClock size={18} />
            </div>
            <p className="text-2xl md:text-3xl font-black text-orange-600">{metrics.perluFollowUp}</p>
            <p className="text-xs md:text-sm font-bold text-slate-600 mt-1">Perlu Follow-up</p>
            <span className="text-[10px] text-slate-400 font-medium">Sudah disapa & kirim info</span>
          </Link>

          <div className="bg-white rounded-2xl p-4 md:p-5 border border-slate-200/80 shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
              <Briefcase size={18} />
            </div>
            <p className="text-2xl md:text-3xl font-black text-slate-900">{metrics.sedangNegosiasi}</p>
            <p className="text-xs md:text-sm font-bold text-slate-600 mt-1">Pilih Model / Cicilan</p>
            <span className="text-[10px] text-slate-400 font-medium">Hitung skema rental</span>
          </div>

          <div className="bg-white rounded-2xl p-4 md:p-5 border border-slate-200/80 shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <CheckCircle2 size={18} />
            </div>
            <p className="text-2xl md:text-3xl font-black text-emerald-600">{metrics.closingBulanIni}</p>
            <p className="text-xs md:text-sm font-bold text-slate-600 mt-1">Unit Closing</p>
            <span className="text-[10px] text-slate-400 font-medium">Terpasang bulan ini</span>
          </div>
        </div>
      </div>

      {/* Follow-up Assistant Component */}
      <FollowUpAssistant targets={followUpTargets} />
      
      {/* Agent Toolkit Shortcuts (2 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        
        {/* Sales Kit Shortcut */}
        <div className="bg-white rounded-3xl p-6 md:p-7 border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
              <FileText size={20} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-1.5">
              Sales Kit & Skrip Lapangan
            </h3>
            <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6">
              Calon pembeli bilang kemahalan? Ragu soal sewa beli? Temukan contekan skrip penanganan komplain (*Objection Handling*) dan brosur resmi di sini.
            </p>
          </div>
          <Link 
            href="/dashboard/sales-kit" 
            className="w-full text-center py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition"
          >
            Buka Sales Kit Coway
          </Link>
        </div>

        {/* Meta Ads Campaign Shortcut */}
        <div className="bg-white rounded-3xl p-6 md:p-7 border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-sky-50 text-[#00A3E0] flex items-center justify-center mb-4">
              <ShoppingBag size={20} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-1.5">
              Layanan Meta Ads (Banjir Lead WA)
            </h3>
            <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6">
              Pasar hangat sudah habis? Pesan paket kampanye iklan Meta Ads di kota Anda. Tim spesialis yang menyetel iklan, Anda tinggal terima chat prospek.
            </p>
          </div>
          <Link 
            href="/dashboard/store" 
            className="w-full text-center py-3 bg-[#00A3E0] hover:bg-sky-500 text-white font-bold text-sm rounded-xl transition shadow-sm"
          >
            Pesan Iklan di Marketplace
          </Link>
        </div>

      </div>

    </div>
  );
}
