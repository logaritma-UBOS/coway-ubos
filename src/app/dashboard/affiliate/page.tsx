import { Wallet, Users, MousePointerClick, CheckCircle2, AlertCircle, ArrowRightLeft, UserCircle2 } from 'lucide-react';
import ReferralCopyBox from './ReferralCopyBox';
import WithdrawalModal from './WithdrawalModal';
import { getServerSession } from 'next-auth';
import { authOptions, prisma } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AffiliatePage() {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    redirect('/login');
  }

  const userId = (session.user as any).id;
  const userSlug = (session.user as any).slug || 'agen';
  const referralLink = `https://coway.logaritma.id/?ref=${userSlug}`;

  // Fetch real affiliate data from Prisma
  const [commissions, referrals, analytics, withdrawals] = await Promise.all([
    prisma.commission.findMany({
      where: { earnerId: userId },
      include: {
        order: {
          include: { service: true, agent: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    }),
    prisma.user.findMany({
      where: { referredById: userId },
      orderBy: { createdAt: 'desc' }
    }),
    prisma.analytic.findMany({
      where: { agentId: userId }
    }),
    prisma.withdrawal.findMany({
      where: { agentId: userId },
      orderBy: { createdAt: 'desc' }
    })
  ]);

  const totalCommissions = commissions.reduce((sum, c) => sum + Number(c.amount), 0);
  const totalWithdrawn = withdrawals.reduce((sum, w) => sum + Number(w.amount), 0);
  const activeBalance = totalCommissions - totalWithdrawn;
  
  const totalReferrals = referrals.length;
  const totalSales = commissions.length;
  const totalClicks = analytics.reduce((sum, a) => sum + (a.affiliateClicks || 0), 0);

  return (
    <div className="animate-in fade-in duration-500 max-w-5xl w-full overflow-x-hidden">
      <div className="flex items-center gap-3 mb-8 w-full">
        <div className="w-12 h-12 shrink-0 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
          <Wallet size={24} />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">Program Affiliate</h1>
          <p className="text-sm md:text-base text-slate-500 mt-1">Ajak mitra Anda bergabung dan dapatkan komisi pasif 35%.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8 w-full min-w-0">
        <div className="md:col-span-2 space-y-6 w-full min-w-0">
          {/* Main Info Card */}
          <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-[2rem] p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full blur-3xl opacity-20 -mr-20 -mt-20"></div>
            <div className="relative z-10">
              <p className="text-emerald-400 font-bold text-sm mb-2 uppercase tracking-wider">Saldo Komisi Aktif</p>
              <h2 className="text-4xl md:text-5xl font-black mb-6 break-all">Rp {activeBalance.toLocaleString('id-ID')}</h2>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <WithdrawalModal activeBalance={activeBalance} />
                <p className="text-slate-400 text-xs">Penarikan minimal Rp 100.000. Proses 1x24 jam ke rekening Anda.</p>
              </div>
            </div>
          </div>

          {/* Referral Link Box */}
          <ReferralCopyBox referralLink={referralLink} />
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full min-w-0">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5 min-w-0 w-full overflow-hidden">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-3">
                <MousePointerClick size={20} />
              </div>
              <p className="text-slate-500 text-[10px] sm:text-xs font-bold uppercase mb-1 truncate">Klik Link</p>
              <p className="text-2xl font-black text-slate-900">{totalClicks}</p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5 min-w-0 w-full overflow-hidden">
              <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center mb-3">
                <Users size={20} />
              </div>
              <p className="text-slate-500 text-[10px] sm:text-xs font-bold uppercase mb-1 truncate">Pendaftar</p>
              <p className="text-2xl font-black text-slate-900">{totalReferrals}</p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5 col-span-2 md:col-span-1 min-w-0 w-full overflow-hidden">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center mb-3">
                <Wallet size={20} />
              </div>
              <p className="text-slate-500 text-[10px] sm:text-xs font-bold uppercase mb-1 truncate">Konversi Sukses</p>
              <p className="text-2xl font-black text-slate-900">{totalSales} <span className="text-xs sm:text-sm font-medium text-slate-500">Sales</span></p>
            </div>
          </div>

          {/* Daftar Referral */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 overflow-hidden w-full">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><Users size={18} className="text-blue-500"/> Daftar Pendaftar (Referral)</h3>
            <div className="space-y-4">
              {referrals.length === 0 ? (
                <div className="text-center py-8 text-slate-500 text-sm bg-slate-50 rounded-xl border border-slate-100">
                  <UserCircle2 size={32} className="mx-auto mb-2 opacity-50" />
                  Belum ada yang mendaftar melalui link Anda.
                </div>
              ) : (
                referrals.map((user) => (
                  <div key={user.id} className="flex justify-between items-center border-b border-slate-100 pb-3 last:border-0 last:pb-0 gap-2 w-full">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-slate-800 truncate">{user.name || 'Agen Tanpa Nama'}</p>
                      <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    </div>
                    <div className="text-right shrink-0">
                      {user.isPremium ? (
                        <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-[10px] font-black uppercase tracking-wide">Premium</span>
                      ) : (
                        <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-[10px] font-black uppercase tracking-wide">Basic</span>
                      )}
                      <p className="text-[10px] text-slate-400 mt-1">{user.createdAt.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6 w-full min-w-0">
          {/* Rules / Terms */}
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 sm:p-6 relative overflow-hidden w-full">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Wallet size={100} />
            </div>
            <h3 className="font-bold text-emerald-900 mb-4 text-lg relative z-10">Aturan Komisi 35%</h3>
            <ul className="space-y-4 relative z-10">
              <li className="flex items-start gap-3 text-emerald-800 text-sm">
                <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={18} /> 
                <span>Anda berhak mendapat komisi <strong>35%</strong> dari total transaksi mitra yang mendaftar lewat link Anda.</span>
              </li>
              <li className="flex items-start gap-3 text-emerald-800 text-sm">
                <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={18} /> 
                <span>Berlaku untuk <strong>Semua Layanan</strong> (Aktivasi Landing Page, Jasa Meta Ads, dll).</span>
              </li>
              <li className="flex items-start gap-3 text-red-700 text-sm bg-red-100/50 p-3 rounded-xl border border-red-200/50">
                <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={18} /> 
                <span><strong>PENTING:</strong> Komisi dibayarkan <strong>sekali saja</strong> pada saat pembelian atau pembayaran layanan <strong>PERTAMA</strong> oleh mitra tersebut.</span>
              </li>
            </ul>
          </div>

          {/* Recent Referrals -> Actually Recent Commissions */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 overflow-hidden w-full">
            <h3 className="font-bold text-slate-900 mb-4">Riwayat Komisi Terakhir</h3>
            <div className="space-y-4">
              {commissions.length === 0 ? (
                <div className="text-center py-6 text-slate-500 text-sm">Belum ada riwayat komisi.</div>
              ) : (
                commissions.slice(0, 5).map((item) => (
                  <div key={item.id} className="flex justify-between items-center border-b border-slate-100 pb-3 last:border-0 last:pb-0 gap-2 w-full">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-slate-800 truncate">{item.order?.agent?.name || 'Agen'}</p>
                      <p className="text-xs text-slate-500 truncate">{item.order?.service?.title || 'Layanan'}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-emerald-600">+ Rp{Number(item.amount).toLocaleString('id-ID')}</p>
                      <p className="text-xs text-slate-400">{item.createdAt.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
            {commissions.length > 5 && (
              <button className="w-full mt-4 text-xs font-bold text-slate-500 hover:text-[#00A3E0] transition uppercase tracking-wider py-2">Lihat Semua Riwayat</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
