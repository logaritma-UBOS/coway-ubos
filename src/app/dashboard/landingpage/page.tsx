import { Globe, CheckCircle2, Copy, ExternalLink, Eye, ArrowRight, Sparkles, MessageCircle, Share2, Layers, AlertCircle, ShieldCheck } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { authOptions, prisma } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import CopyLinkButton from '@/components/CopyLinkButton';
import ActivationButton from '@/components/ActivationButton';

export const metadata = {
  title: 'Landing Page Toko Saya - Coway Logaritma',
};

export default async function LandingPageSetup(props: { searchParams?: Promise<{ preview?: string }> }) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !(session.user as any).id) {
    redirect('/login');
  }

  const searchParams = props.searchParams ? await props.searchParams : {};
  const simulateUnpaid = searchParams?.preview === 'unpaid';

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

  // Auto-reset testing accounts created before registration fix
  if ((user.slug === 'testing' || user.slug?.startsWith('test')) && (user.isPremium || user.hasProductLp || user.hasRecruitLp)) {
    try {
      await (prisma.user as any).update({
        where: { id: userId },
        data: {
          isPremium: false,
          hasProductLp: false,
          hasRecruitLp: false
        }
      });
      user.isPremium = false;
      user.hasProductLp = false;
      user.hasRecruitLp = false;
    } catch (e) {
      console.error('Error resetting test user:', e);
    }
  }

  const slug = user.slug || '';
  const productLpUrl = `https://coway.logaritma.id/${slug}`;
  const recruitLpUrl = `https://coway.logaritma.id/${slug}/karir`;
  const basicLpUrl = `https://coway.logaritma.id/${slug}?basic=true`;

  const isProductPaid = !simulateUnpaid && Boolean(user.hasProductLp || user.isPremium);
  const isRecruitPaid = !simulateUnpaid && Boolean(user.hasRecruitLp || user.isPremium);

  return (
    <div className="animate-in fade-in duration-500 max-w-5xl space-y-6 font-sans">
      
      {/* Simulation Banner for Testing / Previewing Payment UI */}
      <div className="bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-200/80 px-4 py-3 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-sky-500 shrink-0" />
          <span className="font-bold text-slate-800">
            {simulateUnpaid ? 'Mode Pengujian: Menampilkan Tampilan Calon Agen (Belum Bayar Lisensi Rp 250k)' : 'Mode Status Akun: Menampilkan Tampilan Normal Akun Anda'}
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {simulateUnpaid ? (
            <Link
              href="/dashboard/landingpage"
              className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 font-extrabold rounded-xl border border-slate-300 shadow-2xs transition"
            >
              Kembali ke Status Asli
            </Link>
          ) : (
            <Link
              href="/dashboard/landingpage?preview=unpaid"
              className="px-3 py-1.5 bg-[#00A3E0] hover:bg-sky-600 text-white font-extrabold rounded-xl shadow-2xs transition flex items-center gap-1"
            >
              <span>Uji Tampilan Belum Bayar (Rp 250k)</span>
              <ArrowRight size={13} />
            </Link>
          )}
        </div>
      </div>

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
                ● Sistem Mayar Terintegrasi
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              Setiap LP dikenakan biaya Rp 250.000 sekali bayar. Jika belum aktif, link tetap bisa dibuka dengan watermark preview.
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
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-2xl bg-sky-50 text-[#00A3E0] flex items-center justify-center">
                <Sparkles size={20} />
              </div>
              {isProductPaid ? (
                <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-[10px] font-black uppercase flex items-center gap-1">
                  <CheckCircle2 size={12} /> Lisensi Aktif
                </span>
              ) : (
                <span className="px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                  <AlertCircle size={12} /> Mode Preview
                </span>
              )}
            </div>

            <h3 className="text-lg font-black text-slate-900">
              LP Penjualan Produk
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
              Katalog resmi pemurni air &amp; udara Coway (Omne, Core, Cinnamon). Dirancang khusus untuk closing produk dengan tombol chat langsung ke WhatsApp Anda.
            </p>

            {/* Price Tag Box */}
            <div className="my-3 p-3 bg-slate-50 border border-slate-200/80 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Biaya Lisensi</span>
                <span className="text-lg font-black text-slate-900 leading-none">
                  {isProductPaid ? 'Lunas (Aktif)' : 'Rp 250.000'}
                </span>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border ${
                isProductPaid ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : 'text-sky-700 bg-sky-50 border-sky-100'
              }`}>
                Sekali Bayar Selamanya
              </span>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Link Website Anda:
              </span>
              <p className="text-xs font-mono font-bold text-slate-800 truncate">
                {productLpUrl}
              </p>
            </div>
          </div>

          <div className="pt-5 mt-4 border-t border-slate-100 flex flex-col gap-2.5">
            {isProductPaid ? (
              <div className="flex items-center gap-2">
                <a
                  href={productLpUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 bg-[#00A3E0] hover:bg-[#0092ca] text-white font-extrabold text-xs sm:text-sm rounded-xl transition shadow-md shadow-sky-500/20 flex items-center justify-center gap-1.5"
                >
                  <span>Buka Website Resmi</span>
                  <ExternalLink size={14} />
                </a>
                <div className="bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl px-2.5 py-1 text-slate-700">
                  <CopyLinkButton url={productLpUrl} />
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <ActivationButton title="Aktivasi LP Penjualan Produk" price={250000} />
                <div className="flex items-center justify-between gap-2 pt-1">
                  <a
                    href={productLpUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition"
                  >
                    <Eye size={13} />
                    <span>Lihat Preview Desain</span>
                  </a>
                  <div className="bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl px-2.5 py-1 text-slate-700">
                    <CopyLinkButton url={productLpUrl} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CARD 2: Landing Page Rekrutmen Agen (Karir HP) */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition p-6 flex flex-col justify-between relative">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Layers size={20} />
              </div>
              {isRecruitPaid ? (
                <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-[10px] font-black uppercase flex items-center gap-1">
                  <CheckCircle2 size={12} /> Lisensi Aktif
                </span>
              ) : (
                <span className="px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                  <AlertCircle size={12} /> Mode Preview
                </span>
              )}
            </div>

            <h3 className="text-lg font-black text-slate-900">
              LP Rekrutmen Agen (Karir)
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
              Membangun tim Health Planner Anda sendiri. Cocok disebarkan untuk calon mitra bisnis yang ingin menjadi agen Coway di bawah jaringan Anda.
            </p>

            {/* Price Tag Box */}
            <div className="my-3 p-3 bg-slate-50 border border-slate-200/80 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Biaya Lisensi</span>
                <span className="text-lg font-black text-slate-900 leading-none">
                  {isRecruitPaid ? 'Lunas (Aktif)' : 'Rp 250.000'}
                </span>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border ${
                isRecruitPaid ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : 'text-purple-700 bg-purple-50 border-purple-100'
              }`}>
                Sekali Bayar Selamanya
              </span>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Link Rekrut Tim:
              </span>
              <p className="text-xs font-mono font-bold text-slate-800 truncate">
                {recruitLpUrl}
              </p>
            </div>
          </div>

          <div className="pt-5 mt-4 border-t border-slate-100 flex flex-col gap-2.5">
            {isRecruitPaid ? (
              <div className="flex items-center gap-2">
                <a
                  href={recruitLpUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm rounded-xl transition shadow-sm flex items-center justify-center gap-1.5"
                >
                  <span>Buka Website Resmi</span>
                  <ExternalLink size={14} />
                </a>
                <div className="bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl px-2.5 py-1 text-slate-700">
                  <CopyLinkButton url={recruitLpUrl} />
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <ActivationButton title="Aktivasi LP Rekrutmen Agen" price={250000} />
                <div className="flex items-center justify-between gap-2 pt-1">
                  <a
                    href={recruitLpUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition"
                  >
                    <Eye size={13} />
                    <span>Lihat Preview Desain</span>
                  </a>
                  <div className="bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl px-2.5 py-1 text-slate-700">
                    <CopyLinkButton url={recruitLpUrl} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CARD 3: Landing Page Basic (Profil Personal) */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition p-6 flex flex-col justify-between relative">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <MessageCircle size={20} />
              </div>
              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-[10px] font-black uppercase flex items-center gap-1">
                <CheckCircle2 size={12} /> Bawaan Akun
              </span>
            </div>

            <h3 className="text-lg font-black text-slate-900">
              LP Profil &amp; Edukasi (Basic)
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
              Format halaman bersih yang mengenalkan profil profesional Anda sebagai Health Planner, edukasi air bersih, dan portofolio layanan.
            </p>

            {/* Price Tag Box */}
            <div className="my-3 p-3 bg-slate-50 border border-slate-200/80 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Akses Basic</span>
                <span className="text-lg font-black text-slate-900 leading-none">Rp 0 (Gratis)</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-lg">
                Selamanya Tanpa Watermark
              </span>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-1">
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
                <span>Buka Website Resmi</span>
                <ExternalLink size={14} />
              </a>
              <div className="bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl px-2.5 py-1 text-slate-700">
                <CopyLinkButton url={basicLpUrl} />
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* SPECIAL PROMO BUNDLING CARD (Jika belum aktif keduanya) */}
      {(!isProductPaid || !isRecruitPaid) && (
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-800">
          <div className="space-y-2 max-w-xl">
            <span className="inline-block px-3 py-1 bg-amber-400 text-slate-950 rounded-full text-[10px] font-black uppercase tracking-wider">
              Promo Bundling Spesial • Hemat Rp 101.000
            </span>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Aktivasi 2 Landing Page Sekaligus (Produk + Rekrutmen)
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
              Dapatkan kedua website resmi atas nama Anda tanpa watermark selamanya hanya seharga <strong className="text-amber-300 font-bold">Rp 399.000</strong> (harga normal Rp 500.000). Pembayaran instan otomatis terhubung ke Mayar (QRIS, VA Bank, Kartu Kredit).
            </p>
          </div>
          <div className="shrink-0 w-full md:w-auto">
            <ActivationButton title="Paket Bundling LP" price={399000} />
          </div>
        </div>
      )}

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
