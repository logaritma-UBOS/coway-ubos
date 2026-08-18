import LandingPageUI from '@/components/LandingPageUI';
import { notFound } from 'next/navigation';

export default async function DynamicLandingPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  // Mock data for prototype
  // In production, this would be: await prisma.agent.findUnique({ where: { slug } })
  const mockAgent = {
    id: 'agent-123',
    fullName: slug ? slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Agent',
    whatsappNumber: '081234567890',
    profileImageUrl: null,
    bio: 'Health Planner Coway resmi yang siap membantu Anda menemukan produk pemurni air dan udara terbaik untuk rumah Anda.',
  };

  // Simulate 404 for unknown slugs
  if (!slug) {
    notFound();
  }

  return (
    <main>
      <LandingPageUI agent={mockAgent} />
    </main>
  );
}
