'use client';
import { useState } from 'react';
import { Globe, Save, CheckCircle2, Copy, ExternalLink, Eye, X } from 'lucide-react';

export default function LandingPageSetup() {
  const [isActive, setIsActive] = useState(false);
  const [slug, setSlug] = useState('budi-santoso');
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="animate-in fade-in duration-500 max-w-4xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-[#00A3E0]/10 text-[#00A3E0] rounded-xl flex items-center justify-center">
          <Globe size={24} />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">Landing Page Setup</h1>
          <p className="text-sm md:text-base text-slate-500 mt-1">Kustomisasi halaman profil profesional Coway Anda.</p>
        </div>
      </div>

      {!isActive ? (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 text-center mb-8">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
            <Globe size={40} />
          </div>
          <h2 className="text-2xl font-bold mb-3 text-slate-900">Landing Page Belum Aktif</h2>
          <p className="text-slate-500 mb-8 max-w-md mx-auto">
            Miliki Landing Page Coway profesional atas nama Anda sendiri. Terintegrasi dengan form konversi langsung ke WhatsApp Anda.
          </p>
          <div className="bg-slate-50 rounded-2xl p-6 max-w-sm mx-auto mb-8 border border-slate-100">
            <p className="text-sm text-slate-500 uppercase font-bold mb-1">Lisensi Sekali Bayar</p>
            <p className="text-4xl font-black text-slate-900">Rp99.000</p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <button 
              onClick={() => setShowPreview(true)}
              className="bg-white border-2 border-slate-200 hover:border-[#00A3E0] hover:text-[#00A3E0] text-slate-600 font-bold py-4 px-6 rounded-xl sm:rounded-full shadow-sm transition flex items-center justify-center gap-2"
            >
              <Eye size={20} /> Preview Desain
            </button>
            <button 
              onClick={() => setIsActive(true)}
              className="bg-[#00A3E0] hover:bg-sky-600 text-white font-bold py-4 px-8 rounded-xl sm:rounded-full shadow-lg transition-transform hover:scale-105"
            >
              Aktifkan Sekarang
            </button>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-3 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <CheckCircle2 className="text-green-500" size={20} /> Status: Aktif
              </h3>
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Nama Tampil (Di Landing Page)</label>
                  <input type="text" defaultValue="Budi Santoso" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 outline-none focus:border-[#00A3E0] transition" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Username / Slug URL</label>
                  <div className="flex flex-col sm:flex-row">
                    <span className="bg-slate-100 border border-slate-200 sm:border-r-0 rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none px-4 py-3 text-slate-500 font-medium select-none text-sm">
                      coway.logaritma.id/
                    </span>
                    <input 
                      type="text" 
                      value={slug} 
                      onChange={(e) => setSlug(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 border-t-0 sm:border-t sm:border-l-0 rounded-b-xl sm:rounded-r-xl sm:rounded-bl-none px-4 py-3 text-slate-900 outline-none focus:border-[#00A3E0] transition" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Nomor WhatsApp Penerima Leads</label>
                  <input type="text" defaultValue="081234567890" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 outline-none focus:border-[#00A3E0] transition" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Bio Profile (Opsional)</label>
                  <textarea rows={3} defaultValue="Saya Health Planner resmi Coway siap bantu kebutuhan air bersih di rumah Anda." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 outline-none focus:border-[#00A3E0] transition"></textarea>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Meta Pixel ID (Untuk Iklan)</label>
                  <input type="text" placeholder="Masukkan Pixel ID" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 outline-none focus:border-[#00A3E0] transition" />
                </div>
                
                <button className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 transition">
                  <Save size={18} /> Simpan Perubahan
                </button>
              </form>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <div className="bg-slate-900 rounded-2xl p-6 text-white sticky top-24 shadow-xl">
              <h4 className="font-bold mb-4">Link Anda</h4>
              <div className="bg-slate-800 rounded-xl p-3 flex items-center justify-between mb-6 border border-slate-700">
                <span className="text-slate-300 text-sm truncate">coway.logaritma.id/{slug}</span>
                <button className="text-slate-400 hover:text-white transition"><Copy size={18} /></button>
              </div>
              
              <a href={`/preview.html`} target="_blank" className="w-full bg-[#00A3E0] hover:bg-sky-600 text-white font-bold py-3 px-4 rounded-xl flex justify-center items-center gap-2 transition">
                <ExternalLink size={18} /> Lihat Live Preview
              </a>
              
              <div className="mt-8">
                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-3">Live Preview Render</p>
                <div className="w-full aspect-[9/16] bg-slate-800 rounded-xl overflow-hidden border border-slate-700">
                  <iframe src={`/preview.html`} className="w-full h-full border-none" title="Live Preview" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-6xl h-full md:h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-700">
            <div className="flex items-center justify-between p-4 px-6 border-b border-slate-200 bg-white">
              <div>
                <h3 className="font-bold text-slate-900 flex items-center gap-2"><Globe size={18} className="text-[#00A3E0]" /> Master Template Preview</h3>
                <p className="text-xs text-slate-500 mt-1">Preview desain interaktif sebelum aktivasi.</p>
              </div>
              <button onClick={() => setShowPreview(false)} className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-red-100 hover:text-red-600 transition shadow-sm">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 bg-slate-100 relative">
              <iframe src="/preview.html" className="w-full h-full border-none" title="Landing Page Preview"></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
