'use client';
import { Clapperboard, Download, ShoppingCart, PlayCircle } from 'lucide-react';

export default function CreativeAssets() {
  const assets = [
    {
      id: 1,
      title: 'Paket 5 Video UGC Coway Ombak (Format TikTok/Reels)',
      price: 75000,
      description: 'Video review gaya UGC (User Generated Content) yang terbukti converting untuk iklan maupun organik.',
      type: 'Video',
    },
    {
      id: 2,
      title: 'Paket Bundling 10 Video + Copywriting Caption',
      price: 125000,
      description: 'Kumpulan 10 video HD produk Coway berbagai varian, dilengkapi template caption siap post.',
      type: 'Bundle',
      popular: true,
    },
    {
      id: 3,
      title: 'Template Banner Image FB Feed (10 Desain)',
      price: 50000,
      description: 'Banner edukasi air bersih dan spesifikasi produk Coway siap pakai untuk update status WA / Feed FB.',
      type: 'Image',
    }
  ];

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
          <div key={asset.id} className={`bg-white rounded-2xl border ${asset.popular ? 'border-pink-500 shadow-pink-100' : 'border-slate-200'} shadow-sm overflow-hidden flex flex-col relative`}>
            {asset.popular && (
              <div className="absolute top-4 right-4 bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                Paling Laris
              </div>
            )}
            
            <div className="aspect-video bg-slate-100 relative group flex items-center justify-center border-b border-slate-100">
              <PlayCircle size={48} className="text-slate-300 group-hover:text-pink-500 transition-colors" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <span className="text-xs font-bold text-slate-400 uppercase mb-2">{asset.type}</span>
              <h3 className="font-bold text-slate-900 mb-2 line-clamp-2">{asset.title}</h3>
              <p className="text-slate-500 text-sm mb-6 flex-1">{asset.description}</p>
              
              <div className="flex items-center justify-between mt-auto">
                <span className="text-xl font-black text-slate-900">Rp {asset.price.toLocaleString('id-ID')}</span>
                <button className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                  asset.popular ? 'bg-pink-600 hover:bg-pink-700 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}>
                  <ShoppingCart size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
