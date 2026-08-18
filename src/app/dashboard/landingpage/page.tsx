import { Globe, CheckCircle2, Copy, ExternalLink, Eye, ArrowRight } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { authOptions, prisma } from '@/lib/auth';
import { redirect } from 'next/navigation';
import ActivationButton from '@/components/ActivationButton';
import Link from 'next/link';

import CopyLinkButton from '@/components/CopyLinkButton';

export const metadata = {
  title: 'Landing Page Setup - Coway UBOS',
};

export default async function LandingPageSetup() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !(session.user as any).id) {
    redirect('/login');
  }

  const userId = (session.user as any).id;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      isPremium: true,
      slug: true,
    }
  });

  if (!user) {
    redirect('/login');
  }

  const isActive = user.isPremium;
  const slug = user.slug || '';

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
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 text-center mb-8">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
            <Globe size={40} />
          </div>
          <h2 className="text-2xl font-bold mb-3 text-slate-900 tracking-tight">Landing Page Belum Aktif</h2>
          <p className="text-slate-500 mb-8 max-w-md mx-auto font-medium">
            Miliki Landing Page Coway profesional atas nama Anda sendiri. Terintegrasi dengan form konversi langsung ke WhatsApp Anda.
          </p>
          <div className="bg-slate-50 rounded-2xl p-6 max-w-sm mx-auto mb-8 border border-slate-100">
            <p className="text-sm text-slate-500 uppercase font-bold mb-1">Lisensi Sekali Bayar</p>
            <p className="text-4xl font-black text-slate-900 tracking-tight">Rp99.000</p>
            <p className="text-xs text-green-600 font-bold mt-2 bg-green-100 py-1 px-3 rounded-full inline-block">Masa Promo: Gratis (MVP)</p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <a 
              href={`/${slug}?preview=true`}
              target="_blank"
              className="bg-white border-2 border-slate-200 hover:border-[#00A3E0] hover:text-[#00A3E0] text-slate-600 font-bold py-4 px-6 rounded-xl sm:rounded-full shadow-sm transition flex items-center justify-center gap-2"
            >
              <Eye size={20} /> Preview Desain
            </a>
            <ActivationButton />
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
                  Landing page Anda sudah aktif dan bisa diakses oleh pelanggan potensial.
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
          
          <div className="md:col-span-2">
            <div className="bg-slate-900 rounded-2xl p-6 text-white sticky top-24 shadow-xl">
              <h4 className="font-bold mb-4 tracking-tight">Link Anda</h4>
              <div className="bg-slate-800 rounded-xl p-3 flex items-center justify-between mb-6 border border-slate-700">
                <span className="text-slate-300 text-sm truncate font-medium">coway.logaritma.id/{slug}</span>
                <CopyLinkButton url={`https://coway.logaritma.id/${slug}`} />
              </div>
              
              <a href={`/${slug}`} target="_blank" className="w-full bg-[#00A3E0] hover:bg-sky-600 text-white font-bold py-3 px-4 rounded-xl flex justify-center items-center gap-2 transition">
                <ExternalLink size={18} /> Buka Halaman
              </a>
              
              <div className="mt-8">
                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-3">Live Preview</p>
                <div className="w-full aspect-[9/16] bg-slate-800 rounded-xl overflow-hidden border border-slate-700 pointer-events-none opacity-80">
                  <iframe src={`/${slug}`} className="w-full h-full border-none" title="Live Preview" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
