import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import MetaAdsSetupForm from './MetaAdsSetupForm';
import MetaAdsLiveReport from './MetaAdsLiveReport';

export default async function MetaAds() {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) return null;
  const agentId = (session.user as any).id;

  // 1. Cari campaign yang sedang aktif atau pending
  let activeCampaign = await prisma.metaCampaign.findFirst({
    where: { 
      agentId: agentId,
      status: { in: ['PENDING', 'ACTIVE'] } 
    },
    include: { order: true }
  });

  if (activeCampaign) {
    return <MetaAdsLiveReport campaign={activeCampaign} />;
  }

  // 2. Jika tidak ada campaign aktif, cari order Meta Ads yang sudah lunas tapi belum dibuat campaign-nya
  const paidOrders = await prisma.order.findMany({
    where: {
      agentId: agentId,
      status: { in: ['PAID', 'COMPLETED', 'SUCCESS'] },
      service: { title: { contains: 'Meta Ads Management' } },
    },
    include: {
      metaCampaign: true,
      service: true
    }
  });

  // Filter out orders that already have a campaign
  const unassignedOrder = paidOrders.find(o => !o.metaCampaign);

  if (unassignedOrder) {
    let duration = 7;
    if (unassignedOrder.service.title.includes('14 Hari')) duration = 14;
    if (unassignedOrder.service.title.includes('30 Hari')) duration = 30;

    activeCampaign = await prisma.metaCampaign.create({
      data: {
        orderId: unassignedOrder.id,
        agentId: unassignedOrder.agentId,
        durationDays: duration,
        status: 'PENDING'
      },
      include: { order: true }
    });

    return <MetaAdsLiveReport campaign={activeCampaign} />;
  }

  // 3. Jika sama sekali tidak ada yang aktif/lunas, tampilkan form setup
  return <MetaAdsSetupForm />;
}
