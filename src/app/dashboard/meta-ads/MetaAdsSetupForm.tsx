'use client';
import { useState } from 'react';
import { Megaphone, Calculator, ArrowRight, ShieldCheck } from 'lucide-react';
import OrderButton from '@/components/OrderButton';

export default function MetaAdsSetup() {
  const [duration, setDuration] = useState(7);
  const dailyBudget = 25000;
  const managementFee = duration === 7 ? 175000 : duration === 14 ? 299000 : 699000;

  const totalBudget = dailyBudget * duration;
  const grandTotal = totalBudget + managementFee;

  return (
    <div className="animate-in fade-in duration-500 max-w-5xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
          <Megaphone size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-black text-slate-900">Setup Meta Ads</h1>
          <p className="text-slate-500">Terima beres, kami yang jalankan iklan Facebook & Instagram Anda.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Formulir Setup Iklan</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block font-bold text-slate-700 mb-2">Durasi Iklan</label>
                <div className="grid grid-cols-3 gap-3">
                  {[7, 14, 30].map(days => (
                    <button 
                      key={days}
                      onClick={() => setDuration(days)}
                      className={`py-3 rounded-xl border-2 font-bold transition-all ${
                        duration === days 
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-700' 
                          : 'border-slate-200 text-slate-500 hover:border-slate-300'
                      }`}
                    >
                      {days} Hari
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-2">Target Kota / Wilayah</label>
                <input type="text" placeholder="Contoh: Jakarta Selatan, Depok, Tangerang" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 outline-none focus:border-indigo-600 transition" />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-2">Produk Unggulan Utama</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 outline-none focus:border-indigo-600 transition">
                  <option>Semua Produk (Katalog Umum)</option>
                  <option>Coway Ombak (Fokus Air Minum Panas/Dingin)</option>
                  <option>Coway Neo Plus (Fokus Pemurni Air Standar)</option>
                  <option>Coway Storm (Fokus Pemurni Udara)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-2">Catatan Target Audience</label>
                <textarea rows={3} placeholder="Contoh: Targetkan ibu rumah tangga muda, atau pekerja kantoran." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 outline-none focus:border-indigo-600 transition"></textarea>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex gap-4">
            <div className="text-blue-500 mt-1"><ShieldCheck size={24} /></div>
            <div>
              <h4 className="font-bold text-blue-900 mb-1">Garansi Pemasangan Transparan</h4>
              <p className="text-blue-800 text-sm">Dashboard Meta Ads dapat diakses transparan. Leads yang masuk akan langsung diarahkan 100% ke nomor WhatsApp Anda tanpa perantara.</p>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-slate-900 rounded-2xl p-6 md:p-8 text-white sticky top-24 shadow-xl">
            <div className="flex items-center gap-2 mb-6 text-slate-300">
              <Calculator size={20} />
              <h4 className="font-bold">Estimasi Biaya</h4>
            </div>

            <div className="space-y-4 text-sm mb-6 pb-6 border-b border-slate-700">
              <div className="flex justify-between gap-2">
                <span className="text-slate-400">Budget Iklan ({duration} hari)</span>
                <span className="font-medium whitespace-nowrap">Rp {totalBudget.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-slate-400">Management Fee ({duration} hari)</span>
                <span className="font-medium whitespace-nowrap">Rp {managementFee.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-500 pt-2">
                <span>{duration === 7 ? '(Bdg harian Rp25.000 + Fee Rp25.000)' : '(Harga Paket Diskon khusus!)'}</span>
              </div>
            </div>

            <div className="mb-8">
              <span className="block text-slate-400 font-medium mb-1">Total Biaya</span>
              <span className="block text-2xl xl:text-3xl 2xl:text-4xl font-black text-[#00A3E0] leading-none tracking-tighter whitespace-nowrap">Rp {grandTotal.toLocaleString('id-ID')}</span>
            </div>

            <OrderButton 
              serviceName={`Meta Ads Management (${duration} Hari)`} 
              amount={grandTotal} 
              buttonText="Pesan & Lanjut Pembayaran" 
            />
            
            <p className="text-xs text-slate-500 text-center mt-4">
              Pembayaran aman menggunakan QRIS / Virtual Account
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
