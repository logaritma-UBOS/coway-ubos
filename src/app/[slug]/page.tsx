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

export default async function LandingPage(props: { params: Promise<{ slug: string }>, searchParams: Promise<{ preview?: string }> }) {
  const { slug } = await props.params;
  const searchParams = await props.searchParams;
  const isPreview = searchParams?.preview === 'true';
  
  const agentData = await prisma.user.findUnique({
    where: { slug }
  });

  if (!agentData) {
    notFound();
  }

  if (!agentData.isPremium && !isPreview) {
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
      {(!agentData.isPremium && isPreview) && (
        <div className="fixed inset-0 z-[999] pointer-events-none flex flex-col items-center justify-center overflow-hidden">
          {/* Watermark overlay pattern */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'200\' height=\'200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ctext x=\'50%25\' y=\'50%25\' font-size=\'24\' font-family=\'sans-serif\' font-weight=\'bold\' fill=\'%23000\' text-anchor=\'middle\' transform=\'rotate(-45 100 100)\'%3EPREVIEW%3C/text%3E%3C/svg%3E")', backgroundSize: '200px 200px' }}></div>
          
          <div className="bg-white/95 backdrop-blur-md px-10 py-6 rounded-3xl border-2 border-rose-500 shadow-2xl transform -rotate-12 pointer-events-auto">
            <h2 className="text-4xl md:text-5xl font-black text-rose-600 tracking-widest uppercase mb-2">PREVIEW DESAIN</h2>
            <p className="text-center text-slate-800 font-bold text-lg">Silakan lakukan aktivasi untuk menggunakan fitur ini</p>
          </div>
        </div>
      )}
      <LandingPageUI 
        agent={{
          id: agentData.id,
          fullName: agentData.name || 'Agen Coway',
          whatsappNumber: agentData.whatsappNumber || '081234567890',
          profileImageUrl: agentData.image || null,
          bio: 'Saya siap membantu Anda menemukan pemurni air Coway yang tepat untuk keluarga Anda.',
        }}
        isPreviewMode={!agentData.isPremium && isPreview}
      />
    </>
  );
}
