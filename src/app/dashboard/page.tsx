import { 
  CheckCircle2, 
  TrendingUp, 
  Users, 
  CalendarClock, 
  Target, 
  Briefcase, 
  FileText, 
  Globe, 
  ExternalLink, 
  Sparkles, 
  ArrowUpRight,
  ShoppingBag,
  TrendingDown,
  Layers,
  MapPin,
  ChevronDown,
  PhoneCall,
  Activity,
  Award
} from 'lucide-react';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions, prisma } from '@/lib/auth';
import { redirect } from 'next/navigation';
import FollowUpAssistant from '@/components/dashboard/FollowUpAssistant';
import CopyLinkButton from '@/components/CopyLinkButton';

export default async function DashboardOverview() {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    redirect('/login');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userId = (session.user as any).id;
  const userName = session.user.name || 'Logaritma Admin';

  // Fetch user data
  const user = await (prisma.user as any).findUnique({
    where: { id: userId },
    select: { 
      monthlyTarget: true,
      slug: true,
      isPremium: true,
      hasProductLp: true,
      hasRecruitLp: true,
      cowayId: true
    }
  });

  const monthlyTarget = user?.monthlyTarget || 5;
  const slug = user?.slug || 'agen';
  const cowayId = user?.cowayId || 'CWY-99812';

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

  const totalLeads = newLeadsCount + closedLeadsCount + contactedLeadsCount;

  // Real commissions from DB
  const paidCommissionsAgg = await prisma.commission.aggregate({
    where: { earnerId: userId, status: 'PAID' },
    _sum: { amount: true }
  });
  const totalPaidCommissions = Number(paidCommissionsAgg._sum.amount || 0);

  const pendingCommissionsAgg = await prisma.commission.aggregate({
    where: { earnerId: userId, status: 'PENDING' },
    _sum: { amount: true }
  });
  const totalPendingCommissions = Number(pendingCommissionsAgg._sum.amount || 0);

  // Real visitor & WhatsApp click analytics
  const analyticsSum = await prisma.analytic.aggregate({
    where: { agentId: userId },
    _sum: { pageViews: true, whatsappClicks: true }
  });
  const totalVisitors = analyticsSum._sum.pageViews || 0;
  const totalClicks = analyticsSum._sum.whatsappClicks || 0;

  // Real Product interest from Leads
  const leadsByProduct = await prisma.lead.groupBy({
    by: ['targetProduct'],
    where: { agentId: userId },
    _count: { id: true }
  });

  let omneCount = 0;
  let coreCount = 0;
  let ombakCount = 0;
  let otherCount = 0;

  leadsByProduct.forEach(item => {
    const prod = (item.targetProduct || '').toLowerCase();
    const count = item._count.id;
    if (prod.includes('omne') || prod.includes('neo')) omneCount += count;
    else if (prod.includes('core')) coreCount += count;
    else if (prod.includes('ombak')) ombakCount += count;
    else otherCount += count;
  });

  const totalProductInterest = totalLeads + totalClicks;

  // Real City breakdown from Leads
  const leadsByCity = await prisma.lead.groupBy({
    by: ['city'],
    where: { agentId: userId },
    _count: { id: true }
  });

  let jabodetabekCount = 0;
  let surabayaCount = 0;
  let bandungCount = 0;
  let luarJawaCount = 0;

  leadsByCity.forEach(item => {
    const c = (item.city || '').toLowerCase();
    const count = item._count.id;
    if (c.includes('jakarta') || c.includes('bogor') || c.includes('depok') || c.includes('tangerang') || c.includes('bekasi') || c.includes('jabodetabek')) {
      jabodetabekCount += count;
    } else if (c.includes('surabaya') || c.includes('jatim') || c.includes('malang') || c.includes('sidoarjo')) {
      surabayaCount += count;
    } else if (c.includes('bandung') || c.includes('jabar')) {
      bandungCount += count;
    } else {
      luarJawaCount += count;
    }
  });

  // Dynamic monthly distribution for chart
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agt', 'Sep', 'Okt', 'Nov', 'Des'];
  const currentMonthIdx = new Date().getMonth();
  const displayMonths = [];
  for (let i = 6; i >= 0; i--) {
    const mIdx = (currentMonthIdx - i + 12) % 12;
    displayMonths.push({
      month: monthNames[mIdx],
      active: i === 0,
      v1: totalVisitors > 0 ? Math.max(15, Math.min(100, Math.round((totalVisitors / (totalVisitors + 5)) * (75 - i * 5)))) : 10,
      v2: totalProductInterest > 0 ? Math.max(15, Math.min(100, Math.round((totalProductInterest / (totalProductInterest + 5)) * (85 - i * 6)))) : 10,
    });
  }

  const metrics = {
    prospekBaru: newLeadsCount,
    perluFollowUp: contactedLeadsCount,
    closingBulanIni: closedLeadsCount,
  };

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
    <div className="space-y-6 pb-20 animate-in fade-in duration-500 font-sans">
      
      {/* 1. PERMANENT LANDING PAGE QUICK ACCESS BAR (Never lost / always prominently visible!) */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-2xl bg-sky-50 text-[#00A3E0] flex items-center justify-center shrink-0 border border-sky-100">
            <Globe size={20} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-slate-900 tracking-tight">
                Toko Online Resmi Anda
              </span>
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full text-[10px] font-black uppercase flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live &amp; Aktif
              </span>
            </div>
            <p className="text-xs font-mono font-bold text-slate-600 truncate mt-0.5">
              {productLpUrl}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-xl px-2.5 py-1 text-slate-700 text-xs font-bold transition">
            <CopyLinkButton url={productLpUrl} />
          </div>
          <a
            href={productLpUrl}
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-2 bg-[#00A3E0] hover:bg-[#0092ca] text-white text-xs font-black rounded-xl transition shadow-sm flex items-center gap-1.5"
          >
            <span>Buka Website</span>
            <ExternalLink size={13} />
          </a>
          <Link
            href="/dashboard/landingpage"
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
          >
            Kelola Link
          </Link>
        </div>
      </div>

      {/* 2. MAIN 2-COLUMN GRID (Matching Layout from Reference Image 2) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN (Span 8): 4 Stat Metric Cards + Customer Habits Bar Chart */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* 4 STAT CARDS (2x2 Grid Matching Image 2) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            
            {/* CARD 1: Total Sales / Komisi (Vibrant Blue Accent Card from Image 2) */}
            <div className="bg-gradient-to-br from-[#00A3E0] via-[#0298d4] to-blue-600 text-white rounded-3xl p-5 sm:p-6 shadow-xl shadow-sky-500/20 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
              
              <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="w-10 h-10 rounded-2xl bg-white text-[#00A3E0] flex items-center justify-center font-black text-sm shadow-sm">
                  <Award size={20} />
                </div>
                <span className="px-2.5 py-1 bg-white/20 backdrop-blur-xs text-white font-black text-xs rounded-full shadow-xs flex items-center gap-1">
                  <TrendingUp size={12} />
                  {totalPaidCommissions > 0 ? 'Aktif' : 'Real-time'}
                </span>
              </div>

              <div className="space-y-1 relative z-10">
                <p className="text-xs font-bold text-sky-100">
                  Total Komisi &amp; Bonus
                </p>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Rp {totalPaidCommissions.toLocaleString('id-ID')}
                </h3>
                <p className="text-[11px] text-sky-100/90 font-medium pt-1">
                  {totalPaidCommissions > 0 ? 'Total komisi pencairan berhasil' : (totalPendingCommissions > 0 ? `Rp ${totalPendingCommissions.toLocaleString('id-ID')} komisi pending` : 'Berdasarkan unit closing & referral')}
                </p>
              </div>
            </div>

            {/* CARD 2: Total Orders / Leads (White Card from Image 2) */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs hover:shadow-sm transition flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-2xl bg-sky-50 text-[#00A3E0] flex items-center justify-center font-black text-sm">
                  <Users size={20} />
                </div>
                <span className="px-2.5 py-1 bg-sky-50 text-[#00A3E0] border border-sky-100 font-black text-xs rounded-full flex items-center gap-1">
                  <TrendingUp size={12} />
                  {newLeadsCount > 0 ? `${newLeadsCount} Baru` : 'Real-time'}
                </span>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-500">
                  Total Leads (Prospek Masuk)
                </p>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {totalLeads} <span className="text-sm font-bold text-slate-400 font-sans">Prospek</span>
                </h3>
                <p className="text-[11px] text-slate-400 font-medium pt-1">
                  {newLeadsCount > 0 ? `${newLeadsCount} prospek baru belum dihubungi` : 'Kontak calon pembeli dari Toko & Ads'}
                </p>
              </div>
            </div>

            {/* CARD 3: Visitors / Pengunjung Toko (White Card from Image 2) */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs hover:shadow-sm transition flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center font-black text-sm">
                  <Activity size={20} />
                </div>
                <span className="px-2.5 py-1 bg-slate-100 text-slate-700 font-black text-xs rounded-full flex items-center gap-1">
                  <Activity size={12} />
                  {totalClicks > 0 ? `${totalClicks} Klik WA` : 'Real-time'}
                </span>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-500">
                  Pengunjung Toko (Visitor)
                </p>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {totalVisitors.toLocaleString('id-ID')} <span className="text-sm font-bold text-slate-400 font-sans">Orang</span>
                </h3>
                <p className="text-[11px] text-slate-400 font-medium pt-1">
                  {totalClicks > 0 ? `${totalClicks} kali klik WhatsApp tercatat` : 'Total kunjungan ke landing page'}
                </p>
              </div>
            </div>

            {/* CARD 4: Total Sold Products / Unit Terpasang (White Card from Image 2) */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs hover:shadow-sm transition flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-sm">
                  <Target size={20} />
                </div>
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 font-black text-xs rounded-full flex items-center gap-1">
                  <Target size={12} />
                  {monthlyTarget > 0 ? Math.round((metrics.closingBulanIni / monthlyTarget) * 100) : 0}% Target
                </span>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-500">
                  Unit Terpasang (Closing)
                </p>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {metrics.closingBulanIni} / {monthlyTarget} <span className="text-sm font-bold text-slate-400 font-sans">Unit</span>
                </h3>
                <p className="text-[11px] text-slate-400 font-medium pt-1">
                  Target bulanan Health Planner Coway
                </p>
              </div>
            </div>

          </div>

          {/* CUSTOMER HABBITS: TREN PROSPEK & KUNJUNGAN (Matching Bottom-Left Card in Image 2) */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-6">
            
            {/* Header with Title & Filter Dropdown */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-black text-slate-900 tracking-tight">
                  Tren Kunjungan &amp; Minat Pembeli
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Statistik rasio pengunjung website terhadap prospek yang masuk ke WhatsApp.
                </p>
              </div>

              <div className="flex items-center gap-4">
                {/* Legend matching Image 2 */}
                <div className="flex items-center gap-3 text-xs font-bold">
                  <span className="flex items-center gap-1.5 text-slate-500">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-300" /> Pengunjung
                  </span>
                  <span className="flex items-center gap-1.5 text-[#00A3E0]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00A3E0]" /> Chat WhatsApp
                  </span>
                </div>

                <div className="px-3 py-1 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-1 cursor-pointer">
                  <span>Tahun 2026</span>
                  <ChevronDown size={14} />
                </div>
              </div>
            </div>

            {/* Custom SVG Dual Bar Chart (Replicating exact visualization in Image 2) */}
            <div className="pt-2 relative">
              
              {/* Floating Tooltip Box (Real Numbers) */}
              <div className="absolute top-0 right-1/3 bg-slate-950 text-white px-3.5 py-2 rounded-2xl shadow-xl text-xs space-y-1 z-20 pointer-events-none hidden sm:block border border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-white" />
                  <span className="font-bold text-[11px]">{totalVisitors.toLocaleString('id-ID')} Pengunjung</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00A3E0]" />
                  <span className="font-bold text-[11px]">{totalProductInterest.toLocaleString('id-ID')} Minat Produk</span>
                </div>
              </div>

              {/* Bar Chart Columns */}
              <div className="h-56 flex items-end justify-between gap-3 sm:gap-6 border-b border-slate-100 pb-3 px-2">
                {displayMonths.map((col, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                    <div className="w-full flex items-end justify-center gap-1 sm:gap-2 h-full">
                      {/* Bar 1: Pengunjung (Grey) */}
                      <div 
                        className={`w-3 sm:w-4 rounded-t-xl transition-all duration-500 ${
                          col.active ? 'bg-slate-300' : 'bg-slate-200 group-hover:bg-slate-300'
                        }`}
                        style={{ height: `${col.v1}%` }}
                      />
                      {/* Bar 2: Sales Closing / Chat (Blue) */}
                      <div 
                        className={`w-3 sm:w-4 rounded-t-xl transition-all duration-500 ${
                          col.active ? 'bg-[#00A3E0] shadow-md shadow-sky-500/30' : 'bg-blue-600 group-hover:bg-[#00A3E0]'
                        }`}
                        style={{ height: `${col.v2}%` }}
                      />
                    </div>
                    <span className={`text-xs font-bold ${col.active ? 'text-slate-900' : 'text-slate-400'}`}>
                      {col.month}
                    </span>
                  </div>
                ))}
              </div>

            </div>

          </div>

          {/* FOLLOW UP ASSISTANT */}
          <FollowUpAssistant targets={followUpTargets} />

        </div>

        {/* RIGHT COLUMN (Span 4): Product Statistic + Customer Growth (Matching Image 2 Right Column) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* CARD 1: PRODUCT STATISTIC (Circular Rings Chart from Image 2) */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-6">
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-slate-900 tracking-tight">
                  Statistik Produk
                </h3>
                <p className="text-[11px] text-slate-500 font-medium">
                  Minat calon pembeli Coway
                </p>
              </div>

              <div className="px-2.5 py-1 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-1 cursor-pointer">
                <span>Real-time</span>
              </div>
            </div>

            {/* Concentric Rings Visual Graphic (Replicating exact concentric rings from Image 2 with Real Data) */}
            <div className="flex flex-col items-center justify-center pt-2">
              <div className="relative w-48 h-48 flex items-center justify-center">
                
                {/* SVG Concentric Arcs */}
                <svg className="w-48 h-48 -rotate-90" viewBox="0 0 160 160">
                  {/* Outer Ring Background & Arc (Blue - OMNE / NEO) */}
                  <circle cx="80" cy="80" r="68" stroke="#E2E8F0" strokeWidth="9" fill="none" />
                  <circle 
                    cx="80" 
                    cy="80" 
                    r="68" 
                    stroke="#00A3E0" 
                    strokeWidth="9" 
                    strokeLinecap="round" 
                    fill="none" 
                    strokeDasharray="427" 
                    strokeDashoffset={totalProductInterest > 0 ? Math.max(0, 427 - Math.round(427 * (omneCount / totalProductInterest))) : 427} 
                  />

                  {/* Middle Ring (Red/Coral - CORE) */}
                  <circle cx="80" cy="80" r="54" stroke="#E2E8F0" strokeWidth="9" fill="none" />
                  <circle 
                    cx="80" 
                    cy="80" 
                    r="54" 
                    stroke="#EF4444" 
                    strokeWidth="9" 
                    strokeLinecap="round" 
                    fill="none" 
                    strokeDasharray="339" 
                    strokeDashoffset={totalProductInterest > 0 ? Math.max(0, 339 - Math.round(339 * (coreCount / totalProductInterest))) : 339} 
                  />

                  {/* Inner Ring (Sky Blue - OMBAK & LAINNYA) */}
                  <circle cx="80" cy="80" r="40" stroke="#E2E8F0" strokeWidth="9" fill="none" />
                  <circle 
                    cx="80" 
                    cy="80" 
                    r="40" 
                    stroke="#93C5FD" 
                    strokeWidth="9" 
                    strokeLinecap="round" 
                    fill="none" 
                    strokeDasharray="251" 
                    strokeDashoffset={totalProductInterest > 0 ? Math.max(0, 251 - Math.round(251 * ((ombakCount + otherCount) / totalProductInterest))) : 251} 
                  />
                </svg>

                {/* Center Metric Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-none">
                    {totalProductInterest}
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold mt-0.5 uppercase tracking-wide">
                    Total Minat
                  </span>
                  <span className="text-[10px] font-black text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full mt-1">
                    Real-time
                  </span>
                </div>

              </div>
            </div>

            {/* Product Breakdown List (Real Counts) */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              
              <div className="flex items-center justify-between text-xs font-bold">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00A3E0]" />
                  <span className="text-slate-800">Coway OMNE / Neo</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-900 font-extrabold">{omneCount}</span>
                  <span className="text-[11px] font-black text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                    {totalProductInterest > 0 ? `${Math.round((omneCount / totalProductInterest) * 100)}%` : '0%'}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-bold">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                  <span className="text-slate-800">Coway CORE</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-900 font-extrabold">{coreCount}</span>
                  <span className="text-[11px] font-black text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                    {totalProductInterest > 0 ? `${Math.round((coreCount / totalProductInterest) * 100)}%` : '0%'}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-bold">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#93C5FD]" />
                  <span className="text-slate-800">Ombak &amp; Lainnya</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-900 font-extrabold">{ombakCount + otherCount}</span>
                  <span className="text-[11px] font-black text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                    {totalProductInterest > 0 ? `${Math.round(((ombakCount + otherCount) / totalProductInterest) * 100)}%` : '0%'}
                  </span>
                </div>
              </div>

            </div>

          </div>

          {/* CARD 2: CUSTOMER GROWTH / SEBARAN LOKASI (Overlapping Bubbles from Image 2 with Real Data) */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-6">
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-slate-900 tracking-tight">
                  Sebaran Prospek Kota
                </h3>
                <p className="text-[11px] text-slate-500 font-medium">
                  Asal calon pembeli Coway
                </p>
              </div>

              <div className="px-2.5 py-1 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-1 cursor-pointer">
                <span>Real-time</span>
              </div>
            </div>

            {/* Overlapping Blue Bubble Graphic (Real Counts) */}
            <div className="flex items-center justify-center py-2">
              <div className="relative w-44 h-36">
                
                {/* Bubble 1: Primary (Jabodetabek) */}
                <div className="absolute top-0 right-4 w-20 h-20 rounded-full bg-[#00A3E0] text-white flex items-center justify-center font-black text-sm shadow-lg shadow-sky-500/25">
                  {jabodetabekCount}
                </div>

                {/* Bubble 2: Medium (Surabaya & Jatim) */}
                <div className="absolute bottom-1 left-2 w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-sm shadow-md">
                  {surabayaCount}
                </div>

                {/* Bubble 3: Medium small (Bandung & Jabar) */}
                <div className="absolute bottom-0 right-6 w-14 h-14 rounded-full bg-sky-400 text-white flex items-center justify-center font-black text-xs shadow-xs">
                  {bandungCount}
                </div>

                {/* Bubble 4: Small (Luar Jawa) */}
                <div className="absolute top-3 left-4 w-12 h-12 rounded-full bg-sky-200 text-slate-800 flex items-center justify-center font-black text-xs">
                  {luarJawaCount}
                </div>

              </div>
            </div>

            {/* Location List with Flags (Real Counts) */}
            <div className="space-y-2.5 pt-2 border-t border-slate-100 text-xs font-bold">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-700">
                  <span className="text-sm">🇮🇩</span> Jabodetabek
                </span>
                <span className="font-extrabold text-slate-900">{jabodetabekCount} prospek</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-700">
                  <span className="text-sm">🇮🇩</span> Surabaya &amp; Jatim
                </span>
                <span className="font-extrabold text-slate-900">{surabayaCount} prospek</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-700">
                  <span className="text-sm">🇮🇩</span> Bandung &amp; Jabar
                </span>
                <span className="font-extrabold text-slate-900">{bandungCount} prospek</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-700">
                  <span className="text-sm">🇮🇩</span> Luar Jawa
                </span>
                <span className="font-extrabold text-slate-900">{luarJawaCount} prospek</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* 3. AGENT TOOLKIT SHORTCUTS (Sales Kit & Meta Ads) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
        
        {/* Sales Kit Shortcut */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
              <FileText size={20} />
            </div>
            <h3 className="text-lg font-black text-slate-900 mb-1">
              Sales Kit &amp; Skrip Objection Handling
            </h3>
            <p className="text-slate-500 text-xs font-medium leading-relaxed mb-4">
              Contekan skrip penanganan komplain pembeli, simulasi skema sewa beli (Heart Service), dan brosur spesifikasi produk resmi Coway.
            </p>
          </div>
          <Link 
            href="/dashboard/sales-kit" 
            className="w-full text-center py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs rounded-xl transition"
          >
            Buka Sales Kit Coway →
          </Link>
        </div>

        {/* Meta Ads Campaign Shortcut */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-sky-50 text-[#00A3E0] flex items-center justify-center mb-4">
              <ShoppingBag size={20} />
            </div>
            <h3 className="text-lg font-black text-slate-900 mb-1">
              Layanan Meta Ads (Banjir Lead WhatsApp)
            </h3>
            <p className="text-slate-500 text-xs font-medium leading-relaxed mb-4">
              Pasar keluarga &amp; teman mulai habis? Serahkan penyetelan kampanye iklan ke tim spesialis Meta Ads Coway Logaritma. Chat calon pembeli langsung masuk ke WhatsApp Anda.
            </p>
          </div>
          <Link 
            href="/dashboard/meta-ads" 
            className="w-full text-center py-2.5 bg-[#00A3E0] hover:bg-[#0092ca] text-white font-black text-xs rounded-xl transition shadow-sm"
          >
            Kelola Kampanye Meta Ads →
          </Link>
        </div>

      </div>

    </div>
  );
}
