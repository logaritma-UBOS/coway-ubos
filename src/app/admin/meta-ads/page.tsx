import prisma from '@/lib/prisma';
import MetaCampaignManager from './MetaCampaignManager';

export const metadata = {
  title: 'Meta Ads Manager | Admin',
};

export default async function AdminMetaAds() {
  const campaigns = await prisma.metaCampaign.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      agent: true,
      order: true
    }
  });

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900">Manajemen Laporan Iklan</h1>
        <p className="text-slate-500 mt-2">Perbarui status, budget terpakai, dan unggah screenshot performa iklan agen.</p>
      </div>

      <MetaCampaignManager initialCampaigns={campaigns} />
    </div>
  );
}
