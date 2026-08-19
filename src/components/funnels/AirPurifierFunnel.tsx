'use client';

import React, { useState } from 'react';
import { ArrowRight, Wind, ChevronRight, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AirPurifierFunnel({ agentName, whatsapp }: { agentName: string, whatsapp: string }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    pets: '',
    allergies: '',
    city: '',
    name: ''
  });

  const handleNext = () => setStep(step + 1);

  const getRiskLevel = () => {
    if (formData.pets === 'ya' && formData.allergies === 'ya') return 'Tinggi';
    if (formData.pets === 'ya' || formData.allergies === 'ya') return 'Sedang';
    return 'Rendah';
  };

  const handleConsultation = () => {
    const risk = getRiskLevel();
    const message = `Halo ${agentName}, saya sudah mengisi asesmen kualitas udara. Hasil risiko udara di rumah saya tergolong ${risk}. Saya ingin berkonsultasi mengenai Air Purifier yang cocok.`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsapp.replace(/^0/, '62')}?text=${encoded}`, '_blank');
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-xl border border-teal-100 overflow-hidden">
      <div className="bg-teal-500 p-8 text-white text-center">
        <Wind size={48} className="mx-auto mb-4 opacity-80" />
        <h2 className="text-2xl md:text-3xl font-black mb-2">Seberapa Bersih Udara di Rumah Anda?</h2>
        <p className="text-teal-100 font-medium">Cek potensi alergen, bulu hewan, dan debu tak terlihat.</p>
      </div>

      <div className="p-8">
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Apakah Anda memelihara hewan (kucing/anjing) di dalam rumah?</label>
              <select 
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                value={formData.pets}
                onChange={(e) => setFormData({...formData, pets: e.target.value})}
              >
                <option value="">Pilih...</option>
                <option value="ya">Ya, pelihara hewan</option>
                <option value="tidak">Tidak pelihara</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Apakah ada anggota keluarga yang memiliki asma/alergi debu/sinus?</label>
              <select 
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                value={formData.allergies}
                onChange={(e) => setFormData({...formData, allergies: e.target.value})}
              >
                <option value="">Pilih...</option>
                <option value="ya">Ya, ada</option>
                <option value="tidak">Tidak ada</option>
              </select>
            </div>
            <button 
              onClick={handleNext}
              disabled={!formData.pets || !formData.allergies}
              className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition disabled:opacity-50"
            >
              Lihat Hasil <ChevronRight size={20} />
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className={`border p-6 rounded-2xl text-center mb-6 ${
              getRiskLevel() === 'Tinggi' ? 'bg-red-50 border-red-200 text-red-600' :
              getRiskLevel() === 'Sedang' ? 'bg-orange-50 border-orange-200 text-orange-600' :
              'bg-teal-50 border-teal-200 text-teal-600'
            }`}>
              <AlertTriangle className="mx-auto mb-2" size={32} />
              <p className="text-sm font-bold uppercase">Risiko Polutan & Alergen</p>
              <p className="text-4xl font-black mt-1">{getRiskLevel()}</p>
            </div>
            
            <div className="text-center">
              <h3 className="font-bold text-xl text-slate-900 mb-2">Lindungi Paru-paru Keluarga Anda</h3>
              <p className="text-slate-600 mb-6">Partikel debu PM2.5, bulu hewan, dan bakteri bisa melayang di udara berjam-jam tanpa terlihat. HEPA filter Coway bisa menyaring hingga 99.99%.</p>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Nama Anda</label>
              <input 
                type="text"
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-medium mb-4"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <button 
              onClick={handleConsultation}
              disabled={!formData.name}
              className="w-full py-4 bg-[#25D366] hover:bg-[#1ebd5c] text-white font-bold rounded-xl flex items-center justify-center gap-2 transition shadow-lg shadow-green-500/20 disabled:opacity-50"
            >
              Konsultasi Coway Air Purifier <ArrowRight size={20} />
            </button>
            <p className="text-xs text-center text-slate-500 font-medium mt-3">
              Konsultasi langsung di WhatsApp bersama {agentName} (Health Planner Resmi).
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
