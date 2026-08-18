'use client';
import { useState } from 'react';
import { CreditCard, QrCode, ArrowRight, ShieldCheck, FileText } from 'lucide-react';

export default function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState<'qris' | 'va'>('qris');

  return (
    <div className="animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-8 justify-center text-center flex-col">
        <div className="w-16 h-16 bg-slate-100 text-slate-900 rounded-full flex items-center justify-center mb-2 shadow-sm border border-slate-200">
          <CreditCard size={32} />
        </div>
        <h1 className="text-3xl font-black text-slate-900">Checkout Aman</h1>
        <p className="text-slate-500">Selesaikan pembayaran untuk mengaktifkan layanan digital Anda.</p>
      </div>

      <div className="grid md:grid-cols-5 gap-8">
        <div className="md:col-span-3 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Pilih Metode Pembayaran</h3>
            
            <div className="space-y-4">
              <label className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === 'qris' ? 'border-[#00A3E0] bg-[#00A3E0]/5' : 'border-slate-200 hover:border-slate-300'}`}>
                <input type="radio" name="payment" className="hidden" checked={paymentMethod === 'qris'} onChange={() => setPaymentMethod('qris')} />
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 bg-white rounded-lg border border-slate-200 flex items-center justify-center text-pink-500 shadow-sm"><QrCode size={24} /></div>
                  <div>
                    <h4 className="font-bold text-slate-900">QRIS (Otomatis)</h4>
                    <p className="text-xs text-slate-500">Gopay, OVO, Dana, ShopeePay, BCA Mobile</p>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'qris' ? 'border-[#00A3E0]' : 'border-slate-300'}`}>
                  {paymentMethod === 'qris' && <div className="w-3 h-3 bg-[#00A3E0] rounded-full"></div>}
                </div>
              </label>

              <label className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === 'va' ? 'border-[#00A3E0] bg-[#00A3E0]/5' : 'border-slate-200 hover:border-slate-300'}`}>
                <input type="radio" name="payment" className="hidden" checked={paymentMethod === 'va'} onChange={() => setPaymentMethod('va')} />
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 bg-white rounded-lg border border-slate-200 flex items-center justify-center text-blue-600 shadow-sm"><CreditCard size={24} /></div>
                  <div>
                    <h4 className="font-bold text-slate-900">Virtual Account (Otomatis)</h4>
                    <p className="text-xs text-slate-500">BCA, Mandiri, BNI, BRI</p>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'va' ? 'border-[#00A3E0]' : 'border-slate-300'}`}>
                  {paymentMethod === 'va' && <div className="w-3 h-3 bg-[#00A3E0] rounded-full"></div>}
                </div>
              </label>
            </div>
            
            <div className="mt-8 bg-blue-50 border border-blue-100 rounded-2xl p-4 flex gap-3 text-blue-800 text-sm">
              <ShieldCheck size={20} className="shrink-0 text-blue-500" />
              <p>Transaksi dilindungi dengan enkripsi tingkat bank. Layanan Anda akan aktif secara otomatis (maks 5 menit) setelah pembayaran dikonfirmasi.</p>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-slate-900 rounded-2xl p-6 text-white sticky top-24 shadow-xl">
            <div className="flex items-center gap-2 mb-6 text-slate-300 border-b border-slate-700 pb-4">
              <FileText size={20} />
              <h4 className="font-bold text-lg">Ringkasan Order</h4>
            </div>

            <div className="space-y-4 text-sm mb-6 pb-6 border-b border-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-400 font-medium">1x Aktivasi Landing Page</span>
                <span className="font-bold">Rp 99.000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-medium">Biaya Platform (Admin)</span>
                <span className="font-bold">Rp 1.500</span>
              </div>
            </div>

            <div className="flex justify-between items-end mb-8">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-xs">Total Pembayaran</span>
              <span className="text-3xl font-black text-[#00A3E0]">Rp 100.500</span>
            </div>

            <button className="w-full bg-[#00A3E0] hover:bg-sky-600 text-white font-bold py-4 px-4 rounded-xl flex justify-center items-center gap-2 transition-all transform hover:scale-105 mb-4 shadow-lg shadow-sky-500/20">
              Bayar Sekarang <ArrowRight size={20} />
            </button>
            <p className="text-xs text-slate-500 text-center">Invoice akan dikirim otomatis ke WhatsApp Anda.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
