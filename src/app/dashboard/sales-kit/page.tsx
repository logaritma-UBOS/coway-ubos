'use client';

import React, { useState } from 'react';
import { FileText, ChevronDown, ChevronUp, Copy, CheckCircle2 } from 'lucide-react';

const OBJECTION_SCRIPTS = [
  {
    id: 'mahal',
    title: 'Customer bilang mahal',
    category: 'Harga',
    script: 'Halo Pak/Bu, saya sangat mengerti jika harganya terkesan tinggi di awal. Namun kalau kita hitung ulang, biaya cicilan Coway per hari sebenarnya hanya sekitar Rp10.000, lebih murah dari beli kopi atau jajan harian. Dan yang terpenting, Bapak/Ibu mendapatkan jaminan air bersih tanpa batas, bebas angkat galon, dan servis rutin gratis setiap 2 bulan. Boleh saya bantu hitungkan perbandingannya dengan pengeluaran galon Bapak/Ibu saat ini?'
  },
  {
    id: 'pikir-pikir',
    title: 'Customer mau pikir-pikir dulu',
    category: 'Penundaan',
    script: 'Baik Pak/Bu, silakan didiskusikan dulu dengan keluarga. Memilih sumber air minum memang butuh pertimbangan matang. Boleh saya tahu apa hal utama yang masih menjadi keraguan? Siapa tahu saya bisa memberikan informasi tambahan atau mencari solusi yang lebih pas dengan kebutuhan di rumah.'
  },
  {
    id: 'banding-galon',
    title: 'Customer membandingkan dengan galon',
    category: 'Kompetisi',
    script: 'Betul Pak/Bu, galon memang sudah jadi kebiasaan kita. Tapi pernahkah Bapak/Ibu merasa repot saat kehabisan air di malam hari atau capek harus angkat galon? Dengan Coway, air minum mengalir langsung dan difilter dengan teknologi RO. Selain jauh lebih praktis, Bapak/Ibu juga terbebas dari risiko mikroplastik dan BPA dari botol plastik yang terpapar panas matahari saat pengiriman. Mau saya tunjukkan video perbandingan kualitas filternya?'
  },
  {
    id: 'tanya-cicilan',
    title: 'Customer tanya cicilan',
    category: 'Pembayaran',
    script: 'Tentu bisa cicilan Pak/Bu! Kami menyediakan program cicilan ringan 0% dengan kartu kredit, atau cicilan tanpa kartu kredit melalui leasing rekanan kami. Untuk tipe [Nama Produk], cicilannya mulai dari Rp [Nominal]/bulan selama 36 bulan. Menariknya, selama masa cicilan, Bapak/Ibu sudah mendapatkan gratis servis, pergantian filter, dan garansi penuh. Apakah Bapak/Ibu lebih nyaman menggunakan kartu kredit atau tanpa kartu kredit?'
  },
  {
    id: 'cocok-mana',
    title: 'Customer bingung pilih tipe yang cocok',
    category: 'Konsultasi',
    script: 'Tenang Pak/Bu, wajar kalau bingung karena pilihannya banyak. Biar saya bantu rekomendasikan. Boleh saya tahu, ada berapa orang yang tinggal di rumah? Apakah sering butuh air panas untuk bikin kopi/susu bayi, atau lebih sering minum air dingin biasa? Jawaban Bapak/Ibu akan sangat membantu saya memilihkan tipe yang paling efisien dan pas harganya.'
  },
  {
    id: 'tidak-balas-1',
    title: 'Customer tidak balas (Follow-up H+1)',
    category: 'Follow-up',
    script: 'Halo Pak/Bu [Nama], selamat pagi! Kemarin kita sempat diskusi tentang Coway. Apakah ada informasi tambahan yang Bapak/Ibu butuhkan? Kalau ada yang masih belum jelas, jangan sungkan untuk tanya saya ya Pak/Bu. 😊'
  },
  {
    id: 'tidak-balas-3',
    title: 'Customer tidak balas (Follow-up H+3)',
    category: 'Follow-up',
    script: 'Halo Pak/Bu [Nama], apa kabar? Saya mau info kebetulan bulan ini Coway sedang ada promo free biaya registrasi Rp500.000 khusus untuk pemasangan baru. Sayang banget kalau dilewatkan. Kira-kira apakah Bapak/Ibu masih mempertimbangkan untuk pasang Coway?'
  }
];

export default function SalesKitPage() {
  const [expandedId, setExpandedId] = useState<string | null>('mahal');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="animate-in fade-in duration-500 pb-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-[#00A3E0]/10 text-[#00A3E0] rounded-xl flex items-center justify-center">
          <FileText size={24} />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight tracking-tight">Sales Kit & Skrip</h1>
          <p className="text-sm md:text-base text-slate-500 mt-1 font-medium">Buku panduan saku untuk menaklukkan setiap keberatan pelanggan.</p>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden p-6 md:p-10">
        <h2 className="text-xl font-bold text-slate-900 mb-6">Objection Handling (Penanganan Penolakan)</h2>
        
        <div className="space-y-4">
          {OBJECTION_SCRIPTS.map((item) => (
            <div 
              key={item.id} 
              className={`border rounded-2xl overflow-hidden transition-all duration-300 ${expandedId === item.id ? 'border-[#00A3E0] shadow-md shadow-sky-100' : 'border-slate-200 hover:border-slate-300'}`}
            >
              <button 
                onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                className="w-full px-6 py-4 flex items-center justify-between bg-white text-left focus:outline-none"
              >
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                    item.category === 'Follow-up' ? 'bg-orange-100 text-orange-600' :
                    item.category === 'Harga' ? 'bg-red-100 text-red-600' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {item.category}
                  </span>
                  <span className="font-bold text-slate-800 text-lg">{item.title}</span>
                </div>
                {expandedId === item.id ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
              </button>
              
              {expandedId === item.id && (
                <div className="px-6 pb-6 pt-2 bg-slate-50/50">
                  <div className="bg-white border border-slate-100 rounded-xl p-4 mb-3">
                    <p className="text-slate-700 font-medium leading-relaxed">
                      {item.script}
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <button 
                      onClick={() => handleCopy(item.id, item.script)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition ${
                        copiedId === item.id 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {copiedId === item.id ? (
                        <><CheckCircle2 size={16} /> Tersalin</>
                      ) : (
                        <><Copy size={16} /> Salin Skrip</>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
