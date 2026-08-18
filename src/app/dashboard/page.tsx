import { ArrowRight, Users, Eye, TrendingUp, CheckCircle2, Globe, Megaphone, Clapperboard } from 'lucide-react';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions, prisma } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function DashboardOverview() {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    redirect('/login');
  }

  const userId = (session.user as any).id;
  const userName = session.user.name || 'Agen Coway';

  // Fetch real data from Prisma
  const leadsCount = await prisma.lead.count({
    where: { agentId: userId }
  });

  const analytics = await prisma.analytic.aggregate({
    _sum: {
      pageViews: true
    },
    where: { agentId: userId }
  });

  const totalPageViews = analytics._sum.pageViews || 0;
  const conversionRate = totalPageViews > 0 ? ((leadsCount / totalPageViews) * 100).toFixed(1) : "0.0";

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-3xl p-8 md:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#00A3E0] rounded-full blur-3xl opacity-20 -mr-20 -mt-20"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <CheckCircle2 size={14} /> Akun Aktif
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-2">Selamat Datang, {userName}!</h2>
          <p className="text-slate-300 text-lg max-w-xl">Siap tingkatkan penjualan Coway hari ini? Pantau performa landing page dan jalankan iklan untuk mendapatkan prospek lebih banyak.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Eye size={28} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500 uppercase">Pengunjung Link</p>
            <p className="text-3xl font-black text-slate-900">{totalPageViews.toLocaleString('id-ID')}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center">
            <Users size={28} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500 uppercase">Total Leads WA</p>
            <p className="text-3xl font-black text-slate-900">{leadsCount.toLocaleString('id-ID')}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center">
            <TrendingUp size={28} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500 uppercase">Konversi</p>
            <p className="text-3xl font-black text-slate-900">{conversionRate}%</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-xl font-bold text-slate-900 mb-4">Layanan Digital Marketing</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <Link href="/dashboard/landingpage" className="group bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg transition-all hover:border-[#00A3E0]">
            <div className="w-12 h-12 bg-[#00A3E0]/10 text-[#00A3E0] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Globe size={24} />
            </div>
            <h4 className="font-bold text-lg mb-2 text-slate-900">Aktivasi Landing Page</h4>
            <p className="text-slate-500 text-sm mb-4">Miliki link profesional dengan katalog Coway dan tombol konversi WA langsung.</p>
            <span className="text-[#00A3E0] font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">Lihat Detail <ArrowRight size={16} /></span>
          </Link>
          
          <Link href="/dashboard/meta-ads" className="group bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg transition-all hover:border-[#00A3E0]">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Megaphone size={24} />
            </div>
            <h4 className="font-bold text-lg mb-2 text-slate-900">Manajemen Meta Ads</h4>
            <p className="text-slate-500 text-sm mb-4">Terima beres! Kami jalankan iklan FB/IG untuk datangkan leads pembeli ke WA Anda.</p>
            <span className="text-indigo-600 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">Lihat Detail <ArrowRight size={16} /></span>
          </Link>

          <Link href="/dashboard/creative-assets" className="group bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg transition-all hover:border-[#00A3E0]">
            <div className="w-12 h-12 bg-pink-50 text-pink-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Clapperboard size={24} />
            </div>
            <h4 className="font-bold text-lg mb-2 text-slate-900">Video Promo Siap Pakai</h4>
            <p className="text-slate-500 text-sm mb-4">Beli aset video format TikTok/Reels kualitas tinggi untuk senjata promosi Anda.</p>
            <span className="text-pink-600 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">Lihat Katalog <ArrowRight size={16} /></span>
          </Link>
        </div>
      </div>
    </div>
  );
}
