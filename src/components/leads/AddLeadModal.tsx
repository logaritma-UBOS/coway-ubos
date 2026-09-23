'use client';

import React, { useState } from 'react';
import { Plus, X, Upload, Users } from 'lucide-react';
import { addManualLeads } from '@/lib/actions/leadActions';

export default function AddLeadModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'single' | 'bulk'>('single');
  const [isPending, setIsPending] = useState(false);
  
  // Single form state
  const [singleName, setSingleName] = useState('');
  const [singlePhone, setSinglePhone] = useState('');
  const [singleCity, setSingleCity] = useState('');
  const [singleProduct, setSingleProduct] = useState('');

  // Bulk form state
  const [bulkText, setBulkText] = useState('');

  const resetForm = () => {
    setSingleName('');
    setSinglePhone('');
    setSingleCity('');
    setSingleProduct('');
    setBulkText('');
    setMode('single');
  };

  const handleSubmitSingle = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    
    const result = await addManualLeads([{
      name: singleName,
      phone: singlePhone,
      city: singleCity,
      product: singleProduct
    }]);

    if (result.success) {
      alert(result.message);
      setIsOpen(false);
      resetForm();
    } else {
      alert(result.error);
    }
    
    setIsPending(false);
  };

  const handleSubmitBulk = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    
    // Parse bulk text: "Nama - 08123 - Kota - Produk" or just "Nama - 08123"
    const lines = bulkText.split('\n').filter(line => line.trim() !== '');
    const leads = lines.map(line => {
      // Split by tab, comma, or dash
      const parts = line.split(/[\t,-]+/).map(p => p.trim());
      return {
        name: parts[0] || 'Tanpa Nama',
        phone: parts[1] || '000',
        city: parts[2] || 'Tidak diketahui',
        product: parts[3] || 'Umum'
      };
    });

    if (leads.length === 0) {
      alert("Format tidak valid atau kosong.");
      setIsPending(false);
      return;
    }

    const result = await addManualLeads(leads);

    if (result.success) {
      alert(result.message);
      setIsOpen(false);
      resetForm();
    } else {
      alert(result.error);
    }
    
    setIsPending(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="bg-[#00A3E0] hover:bg-sky-600 text-white font-bold py-2.5 px-4 rounded-xl shadow-sm transition flex items-center gap-2"
      >
        <Plus size={18} /> Tambah Lead
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Users size={20} className="text-[#00A3E0]" /> Input Lead Baru
              </h3>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600 transition">
                <X size={24} />
              </button>
            </div>

            <div className="flex border-b border-slate-100">
              <button 
                onClick={() => setMode('single')}
                className={`flex-1 py-3 text-sm font-bold transition ${mode === 'single' ? 'text-[#00A3E0] border-b-2 border-[#00A3E0]' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Input Manual (Satu)
              </button>
              <button 
                onClick={() => setMode('bulk')}
                className={`flex-1 py-3 text-sm font-bold transition flex justify-center items-center gap-2 ${mode === 'bulk' ? 'text-[#00A3E0] border-b-2 border-[#00A3E0]' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <Upload size={16} /> Input Massal
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              {mode === 'single' ? (
                <form onSubmit={handleSubmitSingle} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Nama Calon Pelanggan</label>
                    <input type="text" required value={singleName} onChange={e => setSingleName(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-[#00A3E0] transition" placeholder="Cth: Budi Santoso" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Nomor WhatsApp</label>
                    <input type="text" required value={singlePhone} onChange={e => setSinglePhone(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-[#00A3E0] transition" placeholder="Cth: 081234567890" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Kota (Opsional)</label>
                      <input type="text" value={singleCity} onChange={e => setSingleCity(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-[#00A3E0] transition" placeholder="Cth: Jakarta" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Produk (Opsional)</label>
                      <input type="text" value={singleProduct} onChange={e => setSingleProduct(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-[#00A3E0] transition" placeholder="Cth: Ombak" />
                    </div>
                  </div>
                  <button type="submit" disabled={isPending} className="w-full bg-[#00A3E0] hover:bg-sky-600 disabled:opacity-70 text-white font-bold py-3.5 rounded-xl transition mt-2">
                    {isPending ? 'Menyimpan...' : 'Simpan Lead'}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleSubmitBulk} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Copy-Paste Data (Per Baris)</label>
                    <p className="text-xs text-slate-500 mb-3">Format: <b>Nama - Nomor WA - Kota - Produk</b> (Gunakan tanda strip, koma, atau tab sebagai pemisah).</p>
                    <textarea 
                      required 
                      rows={6}
                      value={bulkText} 
                      onChange={e => setBulkText(e.target.value)} 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-[#00A3E0] transition text-sm font-mono" 
                      placeholder="Budi - 08123456789 - Jakarta - Ombak&#10;Siti - 08198765432 - Bandung&#10;Andi - 08112233445" 
                    />
                  </div>
                  <button type="submit" disabled={isPending} className="w-full bg-[#00A3E0] hover:bg-sky-600 disabled:opacity-70 text-white font-bold py-3.5 rounded-xl transition mt-2">
                    {isPending ? 'Menyimpan...' : 'Simpan Semua Lead'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
