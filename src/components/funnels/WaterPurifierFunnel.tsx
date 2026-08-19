'use client';

import React, { useState } from 'react';
import { ArrowRight, Droplets, Calculator, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WaterPurifierFunnel({ agentName, whatsapp }: { agentName: string, whatsapp: string }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    familySize: '',
    gallonsPerWeek: '',
    city: '',
    name: '',
    phone: ''
  });

  const handleNext = () => setStep(step + 1);

  const calculateCost = () => {
    const gallons = parseInt(formData.gallonsPerWeek) || 0;
    const weeklyCost = gallons * 22000; // Assuming Rp 22.000 per gallon
    return (weeklyCost * 4).toLocaleString('id-ID');
  };

  const handleConsultation = () => {
    const message = `Halo ${agentName}, saya sudah mengisi kalkulator air minum. Pengeluaran saya sekitar Rp ${calculateCost()}/bulan. Saya ingin berkonsultasi mengenai solusi yang lebih hemat.`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsapp.replace(/^0/, '62')}?text=${encoded}`, '_blank');
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-xl border border-sky-100 overflow-hidden">
      <div className="bg-[#00A3E0] p-8 text-white text-center">
        <Droplets size={48} className="mx-auto mb-4 opacity-80" />
        <h2 className="text-2xl md:text-3xl font-black mb-2">Berapa Biaya Air Minum Keluarga Anda?</h2>
        <p className="text-sky-100 font-medium">Hitung dan temukan solusi yang jauh lebih hemat.</p>
      </div>

      <div className="p-8">
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Jumlah Anggota Keluarga?</label>
              <select 
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-[#00A3E0] focus:border-[#00A3E0] outline-none"
                value={formData.familySize}
                onChange={(e) => setFormData({...formData, familySize: e.target.value})}
              >
                <option value="">Pilih...</option>
                <option value="1-2">1-2 Orang</option>
                <option value="3-4">3-4 Orang</option>
                <option value="5+">Lebih dari 5 Orang</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Konsumsi Galon per Minggu?</label>
              <input 
                type="number"
                placeholder="Contoh: 3"
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-[#00A3E0] focus:border-[#00A3E0] outline-none"
                value={formData.gallonsPerWeek}
                onChange={(e) => setFormData({...formData, gallonsPerWeek: e.target.value})}
              />
            </div>
            <button 
              onClick={handleNext}
              disabled={!formData.familySize || !formData.gallonsPerWeek}
              className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition disabled:opacity-50"
            >
              Lanjutkan <ChevronRight size={20} />
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="bg-sky-50 border border-sky-100 p-6 rounded-2xl text-center mb-6">
              <Calculator className="mx-auto text-[#00A3E0] mb-2" size={32} />
              <p className="text-sm font-bold text-slate-500 uppercase">Estimasi Pengeluaran Anda</p>
              <p className="text-4xl font-black text-[#00A3E0] mt-1">Rp {calculateCost()}<span className="text-lg text-slate-500 font-medium">/bln</span></p>
            </div>
            
            <div className="text-center">
              <h3 className="font-bold text-xl text-slate-900 mb-2">Anda Bisa Jauh Lebih Hemat!</h3>
              <p className="text-slate-600 mb-6">Tinggalkan kerepotan angkat galon dan dapatkan air bersih tanpa batas dengan cicilan yang lebih murah dari pengeluaran galon Anda.</p>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Nama Anda</label>
              <input 
                type="text"
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-medium mb-4"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
              <label className="block text-sm font-bold text-slate-700 mb-2">Kota</label>
              <input 
                type="text"
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
              Konsultasi Solusi Terbaik <ArrowRight size={20} />
            </button>
            <p className="text-xs text-center text-slate-500 font-medium mt-3">
              Data Anda aman. Anda akan diarahkan ke WhatsApp untuk ngobrol langsung dengan {agentName} (Health Planner Resmi).
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
