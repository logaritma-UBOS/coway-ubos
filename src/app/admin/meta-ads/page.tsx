import prisma from '@/lib/prisma';
import MetaCampaignManager from './MetaCampaignManager';
import { createMockOrder } from './actions';
import { Plus } from 'lucide-react';

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
      <div className="mb-8 flex justify-between items-start md:items-center flex-col md:flex-row gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Manajemen Laporan Iklan</h1>
          <p className="text-slate-500 mt-2">Perbarui status, budget terpakai, dan unggah screenshot performa iklan agen.</p>
        </div>
        <form action={createMockOrder}>
          <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-indigo-700 transition">
            <Plus size={16}/> Simulasi Order (Dev Mode)
          </button>
        </form>
      </div>

      <MetaCampaignManager initialCampaigns={campaigns} />
    </div>
  );
}
