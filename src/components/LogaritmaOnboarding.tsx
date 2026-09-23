import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { ShieldCheck, CheckCircle2, UserCircle, Globe, Megaphone, Target, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default async function LogaritmaOnboarding() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) return null;
  const userId = (session.user as any).id;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      metaCampaigns: true,
      _count: {
        select: { leads: true }
      }
    }
  });

  if (!user) return null;

  const isProfileComplete = !!(user.name && user.whatsappNumber);
  const isLpActive = user.isPremium; // Assuming isPremium controls LP
  const isAdsActive = user.metaCampaigns && user.metaCampaigns.length > 0;
  const hasLeads = user._count.leads > 0;

  // Jika semua sudah selesai, kita bisa menyembunyikan atau mengecilkan roadmap
  const isAllComplete = isProfileComplete && isLpActive && isAdsActive && hasLeads;

  if (isAllComplete) return null;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8 mb-8">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 bg-blue-50 text-[#00A3E0] rounded-xl flex items-center justify-center shrink-0">
          <Target size={24} />
        </div>
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">Roadmap Kesuksesan Agen</h2>
          <p className="text-slate-500 font-medium text-sm mt-1">Selesaikan 4 langkah Metode Logaritma ini agar sistem mulai mendatangkan prospek secara otomatis untuk Anda.</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Step 1: Profil */}
        <div className={`p-4 rounded-2xl border ${isProfileComplete ? 'bg-slate-50 border-slate-200' : 'bg-white border-blue-200 shadow-sm'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isProfileComplete ? (
                <CheckCircle2 className="text-emerald-500" size={20} />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-slate-300"></div>
              )}
              <div className="font-bold text-slate-900 flex items-center gap-2">
                <UserCircle size={16} className="text-slate-400" /> 1. Lengkapi Profil & Kontak WhatsApp
              </div>
            </div>
            {!isProfileComplete && (
              <Link href="/dashboard/profile" className="text-sm font-bold text-[#00A3E0] hover:underline flex items-center gap-1">Setup <ArrowRight size={14}/></Link>
            )}
          </div>
        </div>

        {/* Step 2: Landing Page */}
        <div className={`p-4 rounded-2xl border ${isLpActive ? 'bg-slate-50 border-slate-200' : 'bg-white border-slate-200'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isLpActive ? (
                <CheckCircle2 className="text-emerald-500" size={20} />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-slate-300"></div>
              )}
              <div className={`font-bold flex items-center gap-2 ${isLpActive ? 'text-slate-900' : 'text-slate-600'}`}>
                <Globe size={16} className="text-slate-400" /> 2. Aktifkan Landing Page Khusus Coway
              </div>
            </div>
            {isProfileComplete && !isLpActive && (
              <Link href="/dashboard/landingpage" className="text-sm font-bold text-[#00A3E0] hover:underline flex items-center gap-1">Aktifkan <ArrowRight size={14}/></Link>
            )}
          </div>
        </div>

        {/* Step 3: Meta Ads */}
        <div className={`p-4 rounded-2xl border ${isAdsActive ? 'bg-slate-50 border-slate-200' : 'bg-white border-slate-200'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isAdsActive ? (
                <CheckCircle2 className="text-emerald-500" size={20} />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-slate-300"></div>
              )}
              <div className={`font-bold flex items-center gap-2 ${isAdsActive ? 'text-slate-900' : 'text-slate-600'}`}>
                <Megaphone size={16} className="text-slate-400" /> 3. Jalankan Campaign Meta Ads
              </div>
            </div>
            {isLpActive && !isAdsActive && (
              <Link href="/dashboard/meta-ads" className="text-sm font-bold text-[#00A3E0] hover:underline flex items-center gap-1">Mulai Campaign <ArrowRight size={14}/></Link>
            )}
          </div>
        </div>

        {/* Step 4: CRM */}
        <div className={`p-4 rounded-2xl border ${hasLeads ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-slate-200'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {hasLeads ? (
                <CheckCircle2 className="text-emerald-500" size={20} />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-slate-300"></div>
              )}
              <div className={`font-bold flex items-center gap-2 ${hasLeads ? 'text-emerald-900' : 'text-slate-600'}`}>
                <ShieldCheck size={16} className={hasLeads ? "text-emerald-500" : "text-slate-400"} /> 4. Follow-up & Closing Prospek Pertama!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
