'use client';
import { Activity, Clock, Users, DollarSign, Megaphone, Image as ImageIcon } from 'lucide-react';

export default function MetaAdsLiveReport({ campaign }: { campaign: any }) {
  
  const calculateProgress = () => {
    if (!campaign.startDate) return 0;
    const start = new Date(campaign.startDate).getTime();
    const end = campaign.endDate ? new Date(campaign.endDate).getTime() : start + (campaign.durationDays * 24 * 60 * 60 * 1000);
    const now = new Date().getTime();
    
    if (now < start) return 0;
    if (now > end) return 100;
    
    return Math.round(((now - start) / (end - start)) * 100);
  };

  const progress = calculateProgress();

  return (
    <div className="animate-in fade-in duration-500 max-w-5xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
          <Activity size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-black text-slate-900">Dashboard Live Ads</h1>
          <p className="text-slate-500">Pemantauan progres kampanye Meta Ads Anda.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 text-blue-500 rounded-xl"><Megaphone size={20} /></div>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              campaign.status === 'PENDING' ? 'bg-amber-100 text-amber-700' :
              campaign.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-700' :
              'bg-slate-100 text-slate-700'
            }`}>
              {campaign.status === 'PENDING' ? 'MENUNGGU SETUP' : campaign.status === 'ACTIVE' ? 'SEDANG TAYANG' : 'SELESAI'}
            </span>
          </div>
          <div className="text-sm text-slate-500 font-bold mb-1">Durasi Kampanye</div>
          <div className="text-2xl font-black text-slate-900">{campaign.durationDays} Hari</div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-pink-50 text-pink-500 rounded-xl"><DollarSign size={20} /></div>
          </div>
          <div className="text-sm text-slate-500 font-bold mb-1">Budget Terpakai (Spent)</div>
          <div className="text-2xl font-black text-slate-900">Rp {campaign.spentBudget?.toLocaleString('id-ID') || 0}</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-purple-50 text-purple-500 rounded-xl"><Users size={20} /></div>
          </div>
          <div className="text-sm text-slate-500 font-bold mb-1">Leads Masuk</div>
          <div className="text-2xl font-black text-slate-900">{campaign.leadsGenerated || 0} Prospek</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-lg text-slate-900 mb-6 flex items-center gap-2"><Clock size={18}/> Progres Waktu</h3>
          
          <div className="w-full bg-slate-100 rounded-full h-4 mb-4 overflow-hidden">
            <div className="bg-indigo-500 h-4 rounded-full transition-all duration-1000" style={{ width: `${progress}%` }}></div>
          </div>
          
          <div className="flex justify-between text-sm font-bold">
            <span className="text-slate-400">Hari ke-{Math.round((progress/100) * campaign.durationDays)}</span>
            <span className="text-indigo-600">{progress}% Selesai</span>
          </div>

          {campaign.status === 'PENDING' && (
            <div className="mt-8 p-4 bg-amber-50 text-amber-800 rounded-xl text-sm border border-amber-200">
              <strong>Mohon Tunggu:</strong> Tim kami sedang meracik strategi dan melakukan setup kampanye iklan Anda di Facebook Ads Manager. Dashboard ini akan aktif setelah iklan mulai berjalan.
            </div>
          )}
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col">
          <h3 className="font-bold text-lg text-slate-900 mb-6 flex items-center gap-2"><ImageIcon size={18}/> Bukti Laporan (Screenshot)</h3>
          
          {campaign.reportImageUrl ? (
            <div className="flex-1 rounded-xl overflow-hidden border border-slate-200 bg-slate-50 relative group cursor-pointer" onClick={() => window.open(campaign.reportImageUrl, '_blank')}>
              <img src={campaign.reportImageUrl} alt="Laporan Iklan" className="w-full h-full object-contain absolute inset-0" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 bg-white text-slate-900 px-4 py-2 rounded-full font-bold text-sm shadow-lg transition-opacity">Perbesar</span>
              </div>
            </div>
          ) : (
            <div className="flex-1 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center text-slate-400 min-h-[200px]">
              <ImageIcon size={32} className="mb-2 opacity-50" />
              <span className="text-sm">Belum ada screenshot laporan</span>
            </div>
          )}

          {campaign.reportNotes && (
            <div className="mt-4 p-4 bg-slate-50 rounded-xl text-sm text-slate-600 italic border border-slate-100">
              "{campaign.reportNotes}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
