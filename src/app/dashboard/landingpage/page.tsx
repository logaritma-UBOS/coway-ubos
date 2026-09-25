import { Globe, CheckCircle2, Copy, ExternalLink, Eye, ArrowRight } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { authOptions, prisma } from '@/lib/auth';
import { redirect } from 'next/navigation';
import ActivationButton from '@/components/ActivationButton';
import Link from 'next/link';

import CopyLinkButton from '@/components/CopyLinkButton';

export const metadata = {
  title: 'Landing Page Setup - Coway Logaritma',
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
      isPremium: true,
      hasProductLp: true,
      hasRecruitLp: true,
      slug: true,
    }
  });

  if (!user) {
    redirect('/login');
  }

  const isActive = user.isPremium;
  const slug = user.slug || '';
  
  // Backwards compatibility: if they are premium but don't have the new flags, assume they have product LP
  const hasProductLp = user.hasProductLp || (user.isPremium && !user.hasProductLp && !user.hasRecruitLp);
  const hasRecruitLp = user.hasRecruitLp;

  return (
    <div className="animate-in fade-in duration-500 max-w-4xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-[#00A3E0]/10 text-[#00A3E0] rounded-xl flex items-center justify-center">
          <Globe size={24} />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight tracking-tight">Landing Page Setup</h1>
          <p className="text-sm md:text-base text-slate-500 mt-1 font-medium">Kustomisasi halaman profil profesional Coway Anda.</p>
        </div>
      </div>

      {!isActive ? (
        <div className="mb-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
              <Globe size={40} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-slate-900 tracking-tight">Pilih Paket Landing Page Anda</h2>
            <p className="text-slate-500 max-w-2xl mx-auto font-medium">
              Miliki Landing Page Coway profesional atas nama Anda sendiri. Terintegrasi dengan form konversi langsung ke WhatsApp Anda.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Paket Basic */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 flex flex-col hover:border-[#00A3E0] hover:shadow-md transition">
              <h3 className="text-lg font-bold text-slate-900 mb-2">LP Basic</h3>
              <p className="text-sm text-slate-500 mb-6 flex-1">Landing page sederhana dengan informasi kontak dan pengenalan layanan.</p>
              <div className="mb-6">
                <p className="text-3xl font-black text-slate-900">Rp99.000</p>
                <p className="text-xs font-bold text-slate-400 mt-1 uppercase">Lisensi Sekali Bayar</p>
              </div>
              <ActivationButton title="LP Basic" price={99000} />
              
              <a href={`/${slug}?preview=true&basic=true`} target="_blank" className="mt-3 text-center text-[#00A3E0] text-sm font-bold flex items-center justify-center gap-1 hover:underline">
                <Eye size={16} /> Preview
              </a>
            </div>

            {/* Paket 1 */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 flex flex-col hover:border-[#00A3E0] hover:shadow-md transition">
              <h3 className="text-lg font-bold text-slate-900 mb-2">LP Penjualan Produk</h3>
              <p className="text-sm text-slate-500 mb-6 flex-1">Landing page yang didesain khusus untuk mengkonversi pengunjung menjadi pembeli produk Coway Anda.</p>
              <div className="mb-6">
                <p className="text-3xl font-black text-slate-900">Rp250.000</p>
                <p className="text-xs font-bold text-slate-400 mt-1 uppercase">Lisensi Sekali Bayar</p>
              </div>
              <ActivationButton title="LP Penjualan Produk" price={250000} />
              
              <a href={`/${slug}?preview=true`} target="_blank" className="mt-3 text-center text-[#00A3E0] text-sm font-bold flex items-center justify-center gap-1 hover:underline">
                <Eye size={16} /> Preview
              </a>
            </div>

            {/* Paket 2 */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 flex flex-col hover:border-[#00A3E0] hover:shadow-md transition">
              <h3 className="text-lg font-bold text-slate-900 mb-2">LP Rekrutmen Agen</h3>
              <p className="text-sm text-slate-500 mb-6 flex-1">Landing page khusus untuk membangun tim agen Coway Anda sendiri dengan mudah.</p>
              <div className="mb-6">
                <p className="text-3xl font-black text-slate-900">Rp250.000</p>
                <p className="text-xs font-bold text-slate-400 mt-1 uppercase">Lisensi Sekali Bayar</p>
              </div>
              <ActivationButton title="LP Rekrutmen Agen" price={250000} />
              
              <a href={`/${slug}/karir?preview=true`} target="_blank" className="mt-3 text-center text-[#00A3E0] text-sm font-bold flex items-center justify-center gap-1 hover:underline">
                <Eye size={16} /> Preview
              </a>
            </div>

            {/* Paket 3: Bundling */}
            <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-xl p-6 flex flex-col relative transform md:-translate-y-4">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-400 text-yellow-950 px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-sm">
                Paling Hemat
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Paket Bundling Lengkap</h3>
              <p className="text-sm text-slate-400 mb-6 flex-1">Dapatkan ketiga Landing Page (Basic, Produk & Rekrutmen) sekaligus dengan harga yang jauh lebih murah.</p>
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm text-slate-500 line-through">Rp599.000</span>
                  <span className="text-xs bg-red-500/20 text-red-400 font-bold px-2 py-0.5 rounded">Hemat Rp200.000</span>
                </div>
                <p className="text-3xl font-black text-white">Rp399.000</p>
                <p className="text-xs font-bold text-slate-500 mt-1 uppercase">Lisensi Sekali Bayar</p>
              </div>
              <ActivationButton title="Paket Bundling LP" price={399000} />
            </div>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-3 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">Status Landing Page</h3>
                <span className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2">
                  <CheckCircle2 size={18} /> Aktif
                </span>
              </div>
              
              <div className="space-y-4 mb-8">
                <p className="text-slate-600 font-medium">
                  Lisensi Landing Page Anda sudah aktif dan bisa diakses oleh pelanggan potensial.
                </p>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-2">Ingin Mengubah Data?</h4>
                <p className="text-sm text-slate-500 mb-4 font-medium">
                  Untuk mengubah Foto, Nama, Nomor WhatsApp, atau Tracking Pixel, silakan masuk ke menu Profile & Settings.
                </p>
                <Link href="/dashboard/profile" className="text-[#00A3E0] font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                  Ke Profile & Settings <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2 space-y-6">
            {isActive && (
              <div className="bg-slate-800 rounded-2xl p-6 text-white shadow-xl border border-slate-700">
                <h4 className="font-bold mb-4 tracking-tight">LP Basic Anda</h4>
                <div className="bg-slate-900 rounded-xl p-3 flex items-center justify-between mb-6 border border-slate-700">
                  <span className="text-slate-300 text-sm truncate font-medium">coway.logaritma.id/{slug}{hasProductLp ? '?basic=true' : ''}</span>
                  <CopyLinkButton url={`https://coway.logaritma.id/${slug}${hasProductLp ? '?basic=true' : ''}`} />
                </div>
                
                <a href={`/${slug}${hasProductLp ? '?basic=true' : ''}`} target="_blank" className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-4 rounded-xl flex justify-center items-center gap-2 transition">
                  <ExternalLink size={18} /> Buka LP Basic
                </a>
              </div>
            )}
            {hasProductLp && (
              <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl">
                <h4 className="font-bold mb-4 tracking-tight">LP Produk Anda</h4>
                <div className="bg-slate-800 rounded-xl p-3 flex items-center justify-between mb-6 border border-slate-700">
                  <span className="text-slate-300 text-sm truncate font-medium">coway.logaritma.id/{slug}</span>
                  <CopyLinkButton url={`https://coway.logaritma.id/${slug}`} />
                </div>
                
                <a href={`/${slug}`} target="_blank" className="w-full bg-[#00A3E0] hover:bg-sky-600 text-white font-bold py-3 px-4 rounded-xl flex justify-center items-center gap-2 transition">
                  <ExternalLink size={18} /> Buka LP Produk
                </a>
              </div>
            )}

            {hasRecruitLp && (
              <div className="bg-slate-800 rounded-2xl p-6 text-white shadow-xl border border-slate-700">
                <h4 className="font-bold mb-4 tracking-tight">LP Rekrutmen Anda</h4>
                <div className="bg-slate-900 rounded-xl p-3 flex items-center justify-between mb-6 border border-slate-700">
                  <span className="text-slate-300 text-sm truncate font-medium">coway.logaritma.id/{slug}/karir</span>
                  <CopyLinkButton url={`https://coway.logaritma.id/${slug}/karir`} />
                </div>
                
                <a href={`/${slug}/karir`} target="_blank" className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-4 rounded-xl flex justify-center items-center gap-2 transition">
                  <ExternalLink size={18} /> Buka LP Rekrutmen
                </a>
              </div>
            )}

            {(!hasProductLp || !hasRecruitLp) && (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <h4 className="font-bold text-slate-900 mb-2">Upgrade Tersedia!</h4>
                <p className="text-sm text-slate-500 mb-4">
                  {!hasProductLp ? "Anda belum memiliki Landing Page Penjualan Produk." : "Tingkatkan jaringan Anda dengan memiliki Landing Page Rekrutmen Agen khusus."}
                </p>
                <ActivationButton 
                  title={!hasProductLp ? "LP Penjualan Produk" : "LP Rekrutmen Agen"} 
                  price={250000} 
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
