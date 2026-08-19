'use client';

import React, { useState } from 'react';
import { ArrowRight, Sparkles, CheckCircle2, ChevronRight, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FreeTrialFunnel({ agentName, whatsapp }: { agentName: string, whatsapp: string }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    product: '',
    city: '',
    name: ''
  });

  const handleNext = () => setStep(step + 1);

  const handleConsultation = () => {
    const message = `Halo ${agentName}, saya tertarik mencoba Free Trial Coway untuk tipe ${formData.product === 'water' ? 'Water Purifier' : 'Air Purifier'} di kota ${formData.city}. Boleh tahu syarat dan ketentuannya?`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsapp.replace(/^0/, '62')}?text=${encoded}`, '_blank');
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-xl border border-indigo-100 overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white text-center relative overflow-hidden">
        <Sparkles size={48} className="mx-auto mb-4 opacity-80" />
        <h2 className="text-2xl md:text-3xl font-black mb-2 relative z-10">Coba Gratis Coway di Rumah Anda</h2>
        <p className="text-indigo-100 font-medium relative z-10">Tanpa komitmen. Rasakan sendiri kualitasnya.</p>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
      </div>

      <div className="p-8">
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-4">Produk apa yang ingin Anda coba?</label>
              <div className="grid grid-cols-2 gap-4">
                <div 
                  onClick={() => setFormData({...formData, product: 'water'})}
                  className={`border-2 rounded-xl p-4 text-center cursor-pointer transition ${
                    formData.product === 'water' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-200 text-slate-500 hover:border-indigo-300'
                  }`}
                >
                  <div className="text-3xl mb-2">💧</div>
                  <div className="font-bold">Water Purifier</div>
                </div>
                <div 
                  onClick={() => setFormData({...formData, product: 'air'})}
                  className={`border-2 rounded-xl p-4 text-center cursor-pointer transition ${
                    formData.product === 'air' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-200 text-slate-500 hover:border-indigo-300'
                  }`}
                >
                  <div className="text-3xl mb-2">💨</div>
                  <div className="font-bold">Air Purifier</div>
                </div>
              </div>
            </div>
            
            <button 
              onClick={handleNext}
              disabled={!formData.product}
              className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition disabled:opacity-50 mt-6"
            >
              Lanjutkan <ChevronRight size={20} />
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-2xl mb-6">
              <h3 className="font-bold text-indigo-900 mb-3 flex items-center gap-2">
                <CheckCircle2 size={18} className="text-indigo-600" /> Syarat Free Trial
              </h3>
              <ul className="text-sm text-indigo-800 space-y-2 font-medium">
                <li className="flex items-start gap-2"><span>•</span> Hanya berlaku di area cakupan servis teknisi Coway.</li>
                <li className="flex items-start gap-2"><span>•</span> Unit trial diantar dan dipasang gratis.</li>
                <li className="flex items-start gap-2"><span>•</span> Jika tidak cocok, unit akan ditarik kembali (tanpa biaya).</li>
              </ul>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Nama Anda</label>
              <input 
                type="text"
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-medium mb-4"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
              <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-1">
                <MapPin size={16} /> Kota Domisili
              </label>
              <input 
                type="text"
                placeholder="Contoh: Jakarta Selatan"
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
              />
            </div>

            <button 
              onClick={handleConsultation}
              disabled={!formData.name || !formData.city}
              className="w-full py-4 bg-[#25D366] hover:bg-[#1ebd5c] text-white font-bold rounded-xl flex items-center justify-center gap-2 transition shadow-lg shadow-green-500/20 disabled:opacity-50"
            >
              Cek Ketersediaan Trial <ArrowRight size={20} />
            </button>
            <p className="text-xs text-center text-slate-500 font-medium mt-3">
              Anda akan chat dengan {agentName} (Health Planner) untuk mengecek ketersediaan unit trial di kota Anda.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
