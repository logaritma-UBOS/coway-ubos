'use client';

import { useState, useTransition } from 'react';
import { sendNotification } from './actions';
import { Send, Loader2, CheckCircle2 } from 'lucide-react';

export default function NotificationForm() {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await sendNotification(formData);
      if (res.success) {
        setStatus({ type: 'success', msg: `Notifikasi berhasil dikirim ke ${res.count} agen!` });
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus({ type: 'error', msg: res.error || "Gagal mengirim notifikasi." });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {status && (
        <div className={`p-4 rounded-xl text-sm font-bold flex items-center gap-2 ${status.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}`}>
          {status.type === 'success' && <CheckCircle2 size={18}/>}
          {status.msg}
        </div>
      )}

      <div>
        <label className="block text-sm font-bold text-slate-700 mb-1">Target Audiens</label>
        <select name="target" required className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500 font-medium text-slate-900">
          <option value="ALL">Semua Agen (Basic & Premium)</option>
          <option value="BASIC">Hanya Agen Basic</option>
          <option value="PREMIUM">Hanya Agen Premium</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Tipe / Warna</label>
          <select name="type" required className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500 font-medium text-slate-900">
            <option value="INFO">Info (Biru)</option>
            <option value="SUCCESS">Sukses (Hijau)</option>
            <option value="WARNING">Peringatan (Kuning)</option>
            <option value="PROMO">Promo (Ungu)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Judul Singkat</label>
          <input type="text" name="title" required placeholder="Cth: Promo Diskon 50%!" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500 text-slate-900 placeholder-slate-400" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-slate-700 mb-1">Isi Pesan Notifikasi</label>
        <textarea name="message" required rows={3} placeholder="Detail pesan Anda..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500 text-slate-900 placeholder-slate-400"></textarea>
      </div>

      <button 
        type="submit" 
        disabled={isPending}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition disabled:opacity-50"
      >
        {isPending ? <Loader2 size={18} className="animate-spin"/> : <Send size={18}/>}
        {isPending ? 'Mengirim Broadcast...' : 'Kirim Notifikasi Sekarang'}
      </button>
    </form>
  );
}
