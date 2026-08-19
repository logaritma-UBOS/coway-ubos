'use client';
import { useState, useTransition } from 'react';
import { updateCampaign } from './actions';
import { Edit, Image as ImageIcon, ExternalLink, Calendar, Users, DollarSign } from 'lucide-react';
import ImageUpload from '@/components/ImageUpload';

export default function MetaCampaignManager({ initialCampaigns }: { initialCampaigns: any[] }) {
  const [isPending, startTransition] = useTransition();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<any>(null);
  const [reportImageUrl, setReportImageUrl] = useState<string | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as any;
    
    let startDate = target.startDate?.value ? new Date(target.startDate.value) : formData.startDate;
    let endDate = target.endDate?.value ? new Date(target.endDate.value) : formData.endDate;
    
    // Auto-set if changing status and dates are empty
    if (target.status.value === 'ACTIVE' && !startDate) {
      startDate = new Date();
    }
    if (target.status.value === 'COMPLETED' && !endDate) {
      endDate = new Date();
    }

    const data = {
      status: target.status.value,
      spentBudget: parseInt(target.spentBudget.value, 10) || 0,
      leadsGenerated: parseInt(target.leadsGenerated.value, 10) || 0,
      reportNotes: target.reportNotes.value || null,
      reportImageUrl: reportImageUrl,
      startDate,
      endDate
    };

    startTransition(async () => {
      if (formData?.id) {
        await updateCampaign(formData.id, data);
      }
      setShowForm(false);
      setFormData(null);
      setReportImageUrl(null);
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-4 font-bold text-slate-700">Agen & Durasi</th>
              <th className="p-4 font-bold text-slate-700">Status</th>
              <th className="p-4 font-bold text-slate-700">Performa (Spent / Leads)</th>
              <th className="p-4 font-bold text-slate-700">Screenshot Laporan</th>
              <th className="p-4 font-bold text-slate-700 w-24">Aksi</th>
            </tr>
          </thead>
          <tbody className={isPending ? 'opacity-50 pointer-events-none' : ''}>
            {initialCampaigns.map((c) => (
              <tr key={c.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                <td className="p-4">
                  <div className="font-bold text-slate-900 mb-1">{c.agent.name || 'Agen'}</div>
                  <div className="text-slate-500 text-xs flex items-center gap-1"><Calendar size={12}/> Paket {c.durationDays} Hari</div>
                </td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wide ${
                    c.status === 'PENDING' ? 'bg-amber-100 text-amber-700' :
                    c.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-700' :
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {c.status}
                  </span>
                </td>
                <td className="p-4 font-mono font-medium text-slate-600">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-pink-600"><DollarSign size={12}/> {c.spentBudget.toLocaleString('id-ID')}</span>
                    <span className="flex items-center gap-1 text-purple-600"><Users size={12}/> {c.leadsGenerated}</span>
                  </div>
                </td>
                <td className="p-4">
                  {c.reportImageUrl ? (
                    <a href={c.reportImageUrl} target="_blank" className="text-blue-500 hover:underline text-xs flex items-center gap-1"><ImageIcon size={12}/> Lihat Gambar</a>
                  ) : (
                    <span className="text-slate-400 text-xs italic">Belum ada</span>
                  )}
                </td>
                <td className="p-4">
                  <button onClick={() => { setFormData(c); setReportImageUrl(c.reportImageUrl || null); setShowForm(true); }} className="px-3 py-2 text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition text-xs font-bold w-full text-center">Update</button>
                </td>
              </tr>
            ))}
            {initialCampaigns.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500">Belum ada agen yang mengaktifkan paket iklan.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Update Laporan Iklan</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Status Kampanye</label>
                <select name="status" defaultValue={formData?.status} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#00A3E0] text-slate-900 font-bold">
                  <option value="PENDING">PENDING (Menunggu Setup)</option>
                  <option value="ACTIVE">ACTIVE (Sedang Tayang)</option>
                  <option value="COMPLETED">COMPLETED (Selesai)</option>
                </select>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-bold text-slate-700 mb-1">Budget Terpakai (Rp)</label>
                  <input required type="number" name="spentBudget" defaultValue={formData?.spentBudget || 0} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#00A3E0] text-slate-900 font-mono"/>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-bold text-slate-700 mb-1">Leads Masuk</label>
                  <input required type="number" name="leadsGenerated" defaultValue={formData?.leadsGenerated || 0} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#00A3E0] text-slate-900 font-mono"/>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-bold text-slate-700 mb-1">Tanggal Mulai (Opsional)</label>
                  <input type="date" name="startDate" defaultValue={formData?.startDate ? new Date(formData.startDate).toISOString().split('T')[0] : ''} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#00A3E0] text-slate-900"/>
                  <p className="text-[10px] text-slate-400 mt-1">Kosongkan jika baru mulai hari ini.</p>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-bold text-slate-700 mb-1">Tanggal Selesai (Opsional)</label>
                  <input type="date" name="endDate" defaultValue={formData?.endDate ? new Date(formData.endDate).toISOString().split('T')[0] : ''} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#00A3E0] text-slate-900"/>
                </div>
              </div>
              
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <label className="block text-sm font-bold text-slate-700 mb-1">Screenshot Ads Manager (Opsional)</label>
                  {reportImageUrl ? (
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-slate-200 bg-black">
                      <img src={reportImageUrl} alt="Laporan" className="w-full h-full object-contain" />
                      <button 
                        type="button"
                        onClick={() => setReportImageUrl(null)} 
                        className="absolute top-2 right-2 bg-slate-900/50 hover:bg-rose-500 text-white p-2 rounded-lg transition backdrop-blur-sm"
                      >
                        <i className="fa-solid fa-trash text-sm"></i>
                      </button>
                    </div>
                  ) : (
                    <div className="w-full aspect-video rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center">
                      <ImageUpload 
                        onUploadSuccess={(url) => setReportImageUrl(url)}
                        onUploadError={(err) => alert(err)}
                        buttonText="Pilih Screenshot"
                      />
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Catatan Laporan (Opsional)</label>
                <textarea name="reportNotes" rows={3} defaultValue={formData?.reportNotes} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#00A3E0] text-slate-900" placeholder="Iklan hari ini stabil, CPC di angka 2000 perak..."></textarea>
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 px-4 py-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold transition">Batal</button>
                <button type="submit" disabled={isPending} className="flex-1 px-4 py-2 text-white bg-[#00A3E0] hover:bg-[#0090c7] rounded-xl font-bold transition disabled:opacity-50">
                  {isPending ? 'Menyimpan...' : 'Simpan Laporan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
