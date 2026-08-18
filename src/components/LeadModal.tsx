'use client';
import { useState } from 'react';
import { X, Send } from 'lucide-react';

export default function LeadModal({ isOpen, onClose, agentName, productName }: { isOpen: boolean, onClose: () => void, agentName: string, productName?: string }) {
  const [formData, setFormData] = useState({ name: '', phone: '', city: '' });
  
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Normally this would submit to the API, then open WhatsApp
    const text = productName 
      ? `Halo Kak ${agentName}, nama saya ${formData.name} dari ${formData.city}. Saya tertarik untuk berlangganan produk Coway ${productName}.`
      : `Halo Kak ${agentName}, nama saya ${formData.name} dari ${formData.city}. Saya ingin konsultasi produk Coway.`;
      
    alert('Lead Data Disimpan! Mengarahkan ke WhatsApp...');
    console.log("Lead captured:", formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
        <div className="bg-[#00A3E0] p-6 text-white relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-white/80 hover:text-white transition">
            <X size={24} />
          </button>
          <h3 className="text-2xl font-black mb-1">Konsultasi Gratis</h3>
          <p className="text-sky-100 text-sm">Isi data di bawah untuk terhubung langsung dengan {agentName}.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Nama Lengkap</label>
            <input 
              type="text" 
              required
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-[#00A3E0] transition" 
              placeholder="Cth: Siti Aminah" 
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Nomor WhatsApp Aktif</label>
            <input 
              type="text" 
              required
              value={formData.phone}
              onChange={e => setFormData({...formData, phone: e.target.value})}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-[#00A3E0] transition" 
              placeholder="0812..." 
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Domisili Kota</label>
            <input 
              type="text" 
              required
              value={formData.city}
              onChange={e => setFormData({...formData, city: e.target.value})}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-[#00A3E0] transition" 
              placeholder="Cth: Jakarta Selatan" 
            />
          </div>
          
          <button type="submit" className="w-full bg-[#00A3E0] hover:bg-sky-600 text-white font-bold py-4 px-4 rounded-xl flex justify-center items-center gap-2 transition-transform transform hover:scale-105 mt-4">
            Mulai Chat WhatsApp <Send size={18} />
          </button>
          <p className="text-xs text-center text-slate-400 mt-4">Data Anda aman dan tidak akan disebarluaskan.</p>
        </form>
      </div>
    </div>
  );
}
