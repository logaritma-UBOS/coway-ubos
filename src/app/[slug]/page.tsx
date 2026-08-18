import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import LandingPageUI from '@/components/LandingPageUI';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// 1. Generate Dynamic OG Meta Tags
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  // Try to find the agent by slug. If not found, we use fallback defaults.
  const agent = await prisma.agent.findUnique({
    where: { slug },
  });

  if (!agent || !agent.isActive) {
    return { title: 'Coway Health Planner' };
  }

  return {
    title: `Coway Water Purifier - ${agent.fullName}`,
    description: `Konsultasi gratis produk Coway dengan ${agent.fullName}. Dapatkan promo khusus cicilan ringan hari ini!`,
    openGraph: {
      title: `Coway x ${agent.fullName}`,
      description: agent.bio || 'Konsultasi gratis produk Coway untuk Anda.',
      images: [agent.profileImageUrl || '/default-og.png'],
    },
  };
}

// 2. Server Component Renderer
export default async function AgentLandingPage({ params }: PageProps) {
  const { slug } = await params;
  
  const agent = await prisma.agent.findUnique({
    where: { slug },
  });

  if (!agent || !agent.isActive) {
    notFound(); // Redirects to Next.js 404 page
  }

  return (
    <main>
      <LandingPageUI agent={agent} />
    </main>
  );
}
