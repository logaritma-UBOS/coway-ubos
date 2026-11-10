import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import LandingPageUI from '@/components/LandingPageUI';
import ProdukLP from '@/components/ProdukLP';
import PageViewTracker from '@/components/PageViewTracker';
import { Metadata } from 'next';
import { Lock } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const agent = await prisma.user.findUnique({ where: { slug }, select: { name: true, isPremium: true, isActive: true } });
  
  if (!agent) {
    return { title: 'Halaman Tidak Ditemukan - Coway Logaritma' };
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

export default async function LandingPage(props: { params: Promise<{ slug: string }>, searchParams: Promise<{ preview?: string, basic?: string }> }) {
  const { slug } = await props.params;
  const searchParams = await props.searchParams;
  const isPreview = searchParams?.preview === 'true';
  const isBasic = searchParams?.basic === 'true';
  
  const agentData = await prisma.user.findUnique({
    where: { slug }
  });

  if (!agentData) {
    notFound();
  }

  // Auto-reset testing account if it was registered with old hardcoded premium flags
  if ((agentData.slug === 'testing' || agentData.slug?.startsWith('test')) && (agentData.isPremium || (agentData as any).hasProductLp)) {
    try {
      await (prisma.user as any).update({
        where: { id: agentData.id },
        data: { isPremium: false, hasProductLp: false, hasRecruitLp: false }
      });
      agentData.isPremium = false;
      (agentData as any).hasProductLp = false;
      (agentData as any).hasRecruitLp = false;
    } catch (e) {
      console.error('Error resetting test user in LP:', e);
    }
  }

  // LP Basic is free for all registered agents.
  // LP Produk requires hasProductLp or isPremium.
  const isProductPaid = Boolean(agentData.hasProductLp || agentData.isPremium);
  const showWatermark = (!isBasic && !isProductPaid) || isPreview;

  const agent = {
    id: agentData.id,
    fullName: agentData.name || 'Agen Coway',
    whatsappNumber: agentData.whatsappNumber || '081234567890',
    profileImageUrl: agentData.image || null,
    cowayId: (agentData as any).cowayId || null,
    phone: agentData.whatsappNumber || '081234567890',
    bio: agentData.bio || 'Health Planner Coway resmi yang siap membantu Anda menemukan pemurni air dan udara terbaik untuk keluarga Anda.'
  };

  return (
    <>
      <PageViewTracker agentId={agentData.id} />

      {/* Watermark Preview Overlay when Product LP is unpaid */}
      {showWatermark && (
        <div className="fixed inset-0 z-[10000] pointer-events-none flex flex-col items-center justify-center overflow-hidden select-none">
          {/* Subtle repeated diagonal watermark */}
          <div 
            className="absolute inset-0 opacity-[0.09]" 
            style={{ 
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'240\' height=\'240\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ctext x=\'50%25\' y=\'50%25\' font-size=\'20\' font-family=\'sans-serif\' font-weight=\'900\' fill=\'%23000\' text-anchor=\'middle\' transform=\'rotate(-40 120 120)\'%3ECOWAY LOGARITMA PREVIEW%3C/text%3E%3C/svg%3E")', 
              backgroundSize: '240px 240px' 
            }} 
          />

          {/* Floating Warning Banner at Top */}
          <div className="fixed top-4 inset-x-4 max-w-lg mx-auto bg-white/95 backdrop-blur-md px-5 py-3 rounded-2xl border-2 border-amber-400 shadow-2xl pointer-events-auto flex items-center justify-between gap-3 text-left">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse shrink-0" />
              <div className="min-w-0">
                <p className="text-xs font-black text-slate-900 leading-tight truncate">
                  Mode Preview Desain (Belum Aktif)
                </p>
                <p className="text-[10px] text-slate-500 font-semibold mt-0.5 truncate">
                  Aktivasi lisensi resmi Rp250rb untuk hilangkan watermark.
                </p>
              </div>
            </div>
            <a 
              href="/dashboard/landingpage" 
              className="shrink-0 px-3.5 py-1.5 bg-[#00A3E0] hover:bg-sky-600 text-white font-extrabold text-xs rounded-xl shadow-xs transition"
            >
              Aktivasi via Mayar →
            </a>
          </div>
        </div>
      )}

      {/* Render Product LP by default unless basic=true is requested */}
      {(!isBasic) ? (
        <ProdukLP agent={agent} />
      ) : (
        <LandingPageUI agent={agent} isPreviewMode={false} />
      )}
    </>
  );
}
