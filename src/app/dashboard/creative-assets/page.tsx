import { Clapperboard, ShoppingCart, PlayCircle, Download } from 'lucide-react';
import OrderButton from '@/components/OrderButton';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function CreativeAssets() {
  const session = await getServerSession(authOptions);

  const assets = await prisma.creativeAsset.findMany({
    orderBy: { createdAt: 'desc' }
  });

  const orders = await prisma.order.findMany({
    where: { 
      agentId: (session?.user as any)?.id, 
      status: { in: ['PAID', 'COMPLETED', 'SUCCESS'] }
    },
    include: {
      service: true
    }
  });

  const ownedAssetTitles = orders.map(o => o.service.title);

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-pink-50 text-pink-600 rounded-xl flex items-center justify-center">
          <Clapperboard size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-black text-slate-900">Creative Assets</h1>
          <p className="text-slate-500">Katalog materi promosi profesional siap upload.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assets.map((asset) => (
          <div key={asset.id} className={`bg-white rounded-2xl border ${asset.isPopular ? 'border-pink-500 shadow-pink-100' : 'border-slate-200'} shadow-sm overflow-hidden flex flex-col relative`}>
            {asset.isPopular && (
              <div className="absolute top-4 right-4 bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                Paling Laris
              </div>
            )}
            
            {asset.coverUrl ? (
              <div className="aspect-video relative group flex items-center justify-center border-b border-slate-100 overflow-hidden">
                <img src={asset.coverUrl} alt={asset.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
              </div>
            ) : (
              <div className="aspect-video bg-slate-100 relative group flex items-center justify-center border-b border-slate-100">
                <PlayCircle size={48} className="text-slate-300 group-hover:text-pink-500 transition-colors" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
              </div>
            )}
            
            <div className="p-6 flex-1 flex flex-col">
              <span className="text-xs font-bold text-slate-400 uppercase mb-2">{asset.type}</span>
              <h3 className="font-bold text-slate-900 mb-2 line-clamp-2">{asset.title}</h3>
              <p className="text-slate-500 text-sm mb-6 flex-1">{asset.description}</p>
              
              <div className="mt-auto pt-4 border-t border-slate-100">
                {(asset.price === 0 || ownedAssetTitles.includes(asset.title)) ? (
                  <a href={asset.fileUrl || '#'} target="_blank" className="w-full flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-xl font-bold transition shadow-sm">
                    <Download size={18} /> Akses Materi
                  </a>
                ) : (
                  <OrderButton 
                    serviceName={asset.title}
                    amount={asset.price}
                    buttonText={`Pesan (Rp ${asset.price.toLocaleString('id-ID')})`}
                    icon={<ShoppingCart size={18} />}
                  />
                )}
              </div>
            </div>
          </div>
        ))}

        {assets.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500">
            Belum ada katalog aset yang tersedia.
          </div>
        )}
      </div>
    </div>
  );
}
