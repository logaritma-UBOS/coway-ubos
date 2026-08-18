import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import LandingPageUI from '@/components/LandingPageUI';
import PageViewTracker from '@/components/PageViewTracker';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = await params;
  const agent = await prisma.user.findUnique({ where: { slug }, select: { name: true } });
  
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
