import { Globe, CheckCircle2, Copy, ExternalLink, Eye, ArrowRight, Sparkles, MessageCircle, Share2, Layers } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { authOptions, prisma } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import CopyLinkButton from '@/components/CopyLinkButton';

export const metadata = {
  title: 'Landing Page Toko Saya - Coway Logaritma',
};

export default async function LandingPageSetup() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !(session.user as any).id) {
    redirect('/login');
  }

  const userId = (session.user as any).id;

  const user = await (prisma.user as any).findUnique({
    where: { id: userId },
    select: {
      isActive: true,
      isPremium: true,
      hasProductLp: true,
      hasRecruitLp: true,
      slug: true,
      name: true,
      whatsappNumber: true
    }
  });

  if (!user) {
    redirect('/login');
  }

  const slug = user.slug || '';
  const productLpUrl = `https://coway.logaritma.id/${slug}`;
  const recruitLpUrl = `https://coway.logaritma.id/${slug}/karir`;
  const basicLpUrl = `https://coway.logaritma.id/${slug}?basic=true`;

  return (
    <div className="animate-in fade-in duration-500 max-w-5xl space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-sky-50 text-[#00A3E0] rounded-2xl flex items-center justify-center border border-sky-100 shadow-xs">
            <Globe size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Landing Page Toko Anda
              </h1>
              <span className="px-3 py-0.5 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full text-xs font-bold flex items-center gap-1">
                ● Aktif
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              Kelola dan bagikan link website resmi Coway atas nama Anda sendiri.
            </p>
          </div>
        </div>

        <Link
          href="/dashboard/profile"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm rounded-xl transition"
        >
          <span>Ubah Profil &amp; WhatsApp</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      {/* Main 3 Landing Page Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* CARD 1: Landing Page Penjualan Produk (Primary) */}
        <div className="bg-white rounded-3xl border-2 border-[#00A3E0] shadow-xl p-6 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 bg-[#00A3E0] text-white text-[10px] font-black uppercase px-3 py-1 rounded-bl-xl tracking-wider">
            UTAMA (PRODUK)
          </div>

          <div>
            <div className="w-10 h-10 rounded-2xl bg-sky-50 text-[#00A3E0] flex items-center justify-center mb-4">
              <Sparkles size={20} />
            </div>

            <h3 className="text-lg font-black text-slate-900">
              LP Penjualan Produk
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
              Katalog resmi pemurni air &amp; udara Coway (Omne, Core, Cinnamon). Dirancang khusus untuk closing produk dengan tombol chat langsung ke WhatsApp Anda.
            </p>

            <div className="mt-4 p-3 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Link Website Anda:
              </span>
              <p className="text-xs font-mono font-bold text-slate-800 truncate">
                {productLpUrl}
              </p>
            </div>
          </div>

          <div className="pt-5 mt-4 border-t border-slate-100 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <a
                href={productLpUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2.5 bg-[#00A3E0] hover:bg-[#0092ca] text-white font-extrabold text-xs sm:text-sm rounded-xl transition shadow-md shadow-sky-500/20 flex items-center justify-center gap-1.5"
              >
                <span>Buka Website</span>
                <ExternalLink size={14} />
              </a>
              <div className="bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl px-2.5 py-1 text-slate-700">
                <CopyLinkButton url={productLpUrl} />
              </div>
            </div>
          </div>
        </div>

        {/* CARD 2: Landing Page Rekrutmen Agen (Karir HP) */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition p-6 flex flex-col justify-between relative">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
              <Layers size={20} />
            </div>

            <h3 className="text-lg font-black text-slate-900">
              LP Rekrutmen Agen (Karir)
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
              Membangun tim Health Planner Anda sendiri. Cocok disebarkan untuk calon mitra bisnis yang ingin menjadi agen Coway di bawah jaringan Anda.
            </p>

            <div className="mt-4 p-3 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Link Rekrut Tim:
              </span>
              <p className="text-xs font-mono font-bold text-slate-800 truncate">
                {recruitLpUrl}
              </p>
            </div>
          </div>

          <div className="pt-5 mt-4 border-t border-slate-100 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <a
                href={recruitLpUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm rounded-xl transition shadow-sm flex items-center justify-center gap-1.5"
              >
                <span>Buka Website</span>
                <ExternalLink size={14} />
              </a>
              <div className="bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl px-2.5 py-1 text-slate-700">
                <CopyLinkButton url={recruitLpUrl} />
              </div>
            </div>
          </div>
        </div>

        {/* CARD 3: Landing Page Basic (Profil Personal) */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition p-6 flex flex-col justify-between relative">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <MessageCircle size={20} />
            </div>

            <h3 className="text-lg font-black text-slate-900">
              LP Profil &amp; Edukasi (Basic)
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
              Format halaman bersih yang mengenalkan profil profesional Anda sebagai Health Planner, edukasi air bersih, dan portofolio layanan.
            </p>

            <div className="mt-4 p-3 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Link Profil Basic:
              </span>
              <p className="text-xs font-mono font-bold text-slate-800 truncate">
                {basicLpUrl}
              </p>
            </div>
          </div>

          <div className="pt-5 mt-4 border-t border-slate-100 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <a
                href={basicLpUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-extrabold text-xs sm:text-sm rounded-xl transition shadow-sm flex items-center justify-center gap-1.5"
              >
                <span>Buka Website</span>
                <ExternalLink size={14} />
              </a>
              <div className="bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl px-2.5 py-1 text-slate-700">
                <CopyLinkButton url={basicLpUrl} />
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Guide: Cara Promosi Link Website */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#00A3E0] flex items-center justify-center">
            <Share2 size={18} />
          </div>
          <div>
            <h4 className="font-extrabold text-base sm:text-lg text-slate-900">
              Tips Memaksimalkan Landing Page Anda
            </h4>
            <p className="text-xs text-slate-500">
              Gunakan link di atas untuk mendapatkan leads calon pembeli setiap hari.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60">
            <span className="text-xs font-black text-[#00A3E0] block mb-1">1. Bio Instagram &amp; TikTok</span>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Pasang link <strong className="text-slate-800">{productLpUrl}</strong> di profil medsos Anda agar pengunjung bisa langsung membaca katalog &amp; klik WhatsApp.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60">
            <span className="text-xs font-black text-[#00A3E0] block mb-1">2. Iklan Meta Ads (FB &amp; IG)</span>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Gunakan link ini sebagai URL tujuan kampanye iklan berbayar Anda di Meta Ads Manager untuk menyaring calon pembeli yang serius.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60">
            <span className="text-xs font-black text-[#00A3E0] block mb-1">3. Broadcast &amp; Story WhatsApp</span>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Kirimkan link kepada calon prospek saat follow-up agar mereka bisa melihat skema cicilan resmi Coway secara transparan.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
