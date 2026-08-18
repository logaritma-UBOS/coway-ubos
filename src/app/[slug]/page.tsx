import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import LandingPageUI from '@/components/LandingPageUI';
import PageViewTracker from '@/components/PageViewTracker';
import { Metadata } from 'next';
import { Lock } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = await params;
  const agent = await prisma.user.findUnique({ where: { slug }, select: { name: true, isPremium: true } });
  
  if (!agent?.isPremium) {
    return { title: 'Halaman Belum Aktif - Coway UBOS' };
  }
  
  const agentName = agent?.name || 'Agen Resmi';
  const title = `Promo Water Purifier Coway Terbaik - ${agentName}`;
  const description = `Dapatkan penawaran promo water purifier dan air purifier Coway terbaik dari ${agentName}, Agen Resmi Coway. Bebas biaya pasang & servis berkala!`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      images: ['https://member.smartmillionaire.co.id/wp-content/uploads/2026/07/coway-new-logo-2020.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    }
  };
}

export default async function LandingPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  
  const agentData = await prisma.user.findUnique({
    where: { slug }
  });

  if (!agentData) {
    notFound();
  }

  if (!agentData.isPremium) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6 font-sans antialiased">
        <div className="text-center max-w-md bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
          <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6 text-rose-500">
            <Lock size={32} />
          </div>
          <h1 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">Halaman Belum Aktif</h1>
          <p className="text-slate-500 mb-8 font-medium leading-relaxed">Pemilik Landing Page ini belum melakukan aktivasi atau masa aktif telah habis. Silakan hubungi agen yang bersangkutan.</p>
          <a href="/" className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl w-full">
            Kembali ke Beranda
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageViewTracker agentId={agentData.id} />
      <LandingPageUI 
        agent={{
          id: agentData.id,
          fullName: agentData.name || 'Agen Coway',
          whatsappNumber: agentData.whatsappNumber || '',
          profileImageUrl: agentData.image || null,
          bio: agentData.bio || 'Hubungi saya untuk konsultasi gratis produk unggulan Coway untuk keluarga Anda.'
        }}
      />
    </>
  );
}
