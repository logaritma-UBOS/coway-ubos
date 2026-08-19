'use client';
import { useState, useTransition } from 'react';
import { addAsset, editAsset, deleteAsset } from './actions';
import { Edit, Trash2, Plus, Clapperboard, Star } from 'lucide-react';

export default function AssetClientManager({ initialAssets }: { initialAssets: any[] }) {
  const [isPending, startTransition] = useTransition();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<any>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as any;
    const data = {
      title: target.title.value,
      description: target.description.value,
      price: parseInt(target.price.value, 10) || 0,
      type: target.type.value,
      isPopular: target.isPopular ? target.isPopular.checked : false,
    };

    startTransition(async () => {
      if (formData?.id) {
        await editAsset(formData.id, data);
      } else {
        await addAsset(data);
      }
      setShowForm(false);
      setFormData(null);
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Yakin ingin menghapus aset ini?')) {
      startTransition(async () => {
        await deleteAsset(id);
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button 
          onClick={() => { setFormData(null); setShowForm(true); }}
          className="bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-slate-800 transition"
        >
          <Plus size={16}/> Tambah Aset Baru
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-4 font-bold text-slate-700">Nama Aset & Deskripsi</th>
              <th className="p-4 font-bold text-slate-700">Jenis</th>
              <th className="p-4 font-bold text-slate-700">Harga</th>
              <th className="p-4 font-bold text-slate-700 w-32">Aksi</th>
            </tr>
          </thead>
          <tbody className={isPending ? 'opacity-50 pointer-events-none' : ''}>
            {initialAssets.map((a) => (
              <tr key={a.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                <td className="p-4">
                  <div className="font-bold text-slate-900 mb-1 flex items-center gap-2">
                    {a.title}
                    {a.isPopular && <Star size={12} className="text-pink-500 fill-pink-500"/>}
                  </div>
                  <div className="text-slate-500 text-xs line-clamp-1">{a.description}</div>
                </td>
                <td className="p-4">
                  <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wide">{a.type}</span>
                </td>
                <td className="p-4 font-mono font-medium text-slate-600">
                  Rp {a.price.toLocaleString('id-ID')}
                </td>
                <td className="p-4 flex gap-2">
                  <button onClick={() => { setFormData(a); setShowForm(true); }} className="p-2 text-slate-400 hover:text-[#00A3E0] hover:bg-blue-50 rounded-lg transition"><Edit size={16}/></button>
                  <button onClick={() => handleDelete(a.id)} className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition"><Trash2 size={16}/></button>
                </td>
              </tr>
            ))}
            {initialAssets.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-slate-500">Belum ada aset promosi.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4">{formData ? 'Edit Aset' : 'Tambah Aset Baru'}</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Judul Aset</label>
                <input required type="text" name="title" defaultValue={formData?.title} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#00A3E0] text-slate-900" placeholder="Misal: Paket 5 Video UGC"/>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Deskripsi Pendek</label>
                <textarea required name="description" rows={3} defaultValue={formData?.description} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#00A3E0] text-slate-900" placeholder="Jelaskan detail dari aset ini..."></textarea>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-bold text-slate-700 mb-1">Harga (Rp)</label>
                  <input required type="number" name="price" defaultValue={formData?.price || 0} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#00A3E0] text-slate-900"/>
                  <p className="text-xs text-slate-400 mt-1">Isi 0 jika gratis.</p>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-bold text-slate-700 mb-1">Jenis Format</label>
                  <select name="type" defaultValue={formData?.type || 'Video'} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#00A3E0] text-slate-900">
                    <option value="Video">Video</option>
                    <option value="Image">Image (Gambar)</option>
                    <option value="Bundle">Bundle (Kumpulan)</option>
                    <option value="Document">Dokumen/PDF</option>
                  </select>
                </div>
              </div>
              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer w-fit">
                  <input type="checkbox" name="isPopular" defaultChecked={formData?.isPopular} className="w-4 h-4 text-[#00A3E0] rounded border-slate-300"/>
                  <span className="text-sm font-bold text-slate-700">Tandai "Paling Laris"</span>
                </label>
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 px-4 py-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold transition">Batal</button>
                <button type="submit" disabled={isPending} className="flex-1 px-4 py-2 text-white bg-[#00A3E0] hover:bg-[#0090c7] rounded-xl font-bold transition disabled:opacity-50">
                  {isPending ? 'Menyimpan...' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
