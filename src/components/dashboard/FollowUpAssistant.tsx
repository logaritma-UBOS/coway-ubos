'use client';

import React, { useState } from 'react';
import { AlertCircle, ArrowRight, MessageSquare, Phone, X } from 'lucide-react';
import { getTemperatureColor } from '@/lib/utils/leadScoring';

type FollowUpTarget = {
  id: string;
  name: string;
  score: number;
  temperature: 'Cold' | 'Warm' | 'Hot' | 'Very Hot';
  daysSinceLastContact: number;
  phone: string;
};

export default function FollowUpAssistant({ targets = [] }: { targets?: FollowUpTarget[] }) {
  const [activeTarget, setActiveTarget] = useState<FollowUpTarget | null>(null);
  const [templateMessage, setTemplateMessage] = useState('');

  if (targets.length === 0) return null;

  const handleOpenTarget = (target: FollowUpTarget) => {
    setActiveTarget(target);
    setTemplateMessage(`Halo Pak/Bu ${target.name}, kemarin kita sempat ngobrol mengenai kebutuhan air di rumah. Saya sudah siapkan informasi produk yang paling sesuai dengan kebutuhan Anda. Kalau berkenan, saya bantu jelaskan perbedaannya secara singkat. 😊`);
  };

  const handleSendWhatsApp = () => {
    if (!activeTarget) return;
    const encodedMessage = encodeURIComponent(templateMessage);
    const waUrl = `https://wa.me/${activeTarget.phone.replace(/^0/, '62')}?text=${encodedMessage}`;
    window.open(waUrl, '_blank');
    setActiveTarget(null);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-orange-200 overflow-hidden mb-8">
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AlertCircle className="animate-pulse" />
          <h3 className="font-bold text-lg">Follow-up Assistant</h3>
        </div>
        <div className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
          {targets.length} lead perlu dihubungi hari ini
        </div>
      </div>
      
      <div className="p-4 divide-y divide-slate-100">
        {targets.map(target => (
          <div key={target.id} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 first:pt-2 last:pb-2">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="font-bold text-slate-800 text-lg">{target.name}</span>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${getTemperatureColor(target.temperature)}`}>
                  {target.temperature} Lead
                </span>
              </div>
              <p className="text-slate-500 text-sm">{target.daysSinceLastContact} hari tanpa follow-up</p>
            </div>
            <button 
              onClick={() => handleOpenTarget(target)}
              className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-5 py-2.5 rounded-xl transition shadow-md shadow-slate-900/10"
            >
              Follow-up Sekarang <ArrowRight size={16} />
            </button>
          </div>
        ))}
      </div>

      {activeTarget && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-[2rem] w-full max-w-lg shadow-2xl overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-xl text-slate-900 flex items-center gap-2">
                <MessageSquare className="text-blue-500" />
                Follow-up: {activeTarget.name}
              </h3>
              <button onClick={() => setActiveTarget(null)} className="text-slate-400 hover:text-slate-600 bg-white p-2 rounded-full shadow-sm">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6">
              <label className="block text-sm font-bold text-slate-700 mb-3">Template Pesan WhatsApp</label>
              <textarea 
                className="w-full h-40 p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium leading-relaxed focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none transition"
                value={templateMessage}
                onChange={(e) => setTemplateMessage(e.target.value)}
              />
              <p className="text-xs text-slate-500 mt-3 font-medium">Anda dapat mengedit pesan di atas sebelum mengirimkannya.</p>
            </div>
            
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <button 
                onClick={() => setActiveTarget(null)}
                className="px-6 py-3 font-bold text-slate-600 hover:bg-slate-200 bg-slate-100 rounded-xl transition"
              >
                Batal
              </button>
              <button 
                onClick={handleSendWhatsApp}
                className="px-6 py-3 font-bold text-white bg-[#25D366] hover:bg-[#1ebd5c] rounded-xl flex items-center gap-2 shadow-lg shadow-green-500/20 transition"
              >
                <Phone size={18} />
                Kirim via WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
