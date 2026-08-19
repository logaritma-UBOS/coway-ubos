'use client';
import { useState, useTransition } from 'react';
import { addMenu, editMenu, deleteMenu } from './actions';
import { Edit, Trash2, Plus, GripVertical, ExternalLink } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

export default function MenuClientManager({ initialMenus }: { initialMenus: any[] }) {
  const [menus, setMenus] = useState(initialMenus);
  const [isPending, startTransition] = useTransition();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<any>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as any;
    const data = {
      name: target.name.value,
      href: target.href.value,
      iconName: target.iconName.value,
      order: parseInt(target.order.value, 10),
      isActive: target.isActive ? target.isActive.checked : true,
    };

    startTransition(async () => {
      if (formData?.id) {
        await editMenu(formData.id, data);
      } else {
        await addMenu(data);
      }
      setShowForm(false);
      setFormData(null);
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Yakin ingin menghapus menu ini?')) {
      startTransition(async () => {
        await deleteMenu(id);
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
          <Plus size={16}/> Tambah Menu Baru
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-4 font-bold text-slate-700 w-16 text-center">Urutan</th>
              <th className="p-4 font-bold text-slate-700">Nama Menu</th>
              <th className="p-4 font-bold text-slate-700">Tautan (URL)</th>
              <th className="p-4 font-bold text-slate-700">Ikon</th>
              <th className="p-4 font-bold text-slate-700">Status</th>
              <th className="p-4 font-bold text-slate-700 w-32">Aksi</th>
            </tr>
          </thead>
          <tbody className={isPending ? 'opacity-50 pointer-events-none' : ''}>
            {initialMenus.map((m) => {
              const Icon = (LucideIcons as any)[m.iconName] || LucideIcons.Circle;
              return (
                <tr key={m.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                  <td className="p-4 text-center font-bold text-slate-400">{m.order}</td>
                  <td className="p-4 font-medium text-slate-900">{m.name}</td>
                  <td className="p-4 text-slate-600 font-mono text-xs max-w-[200px] truncate">
                    {m.href.startsWith('http') && <ExternalLink size={12} className="inline mr-1 text-slate-400"/>}
                    {m.href}
                  </td>
                  <td className="p-4 text-slate-500"><Icon size={20}/></td>
                  <td className="p-4">
                    {m.isActive ? (
                       <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wide">Aktif</span>
                    ) : (
                       <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wide">Mati</span>
                    )}
                  </td>
                  <td className="p-4 flex gap-2">
                    <button onClick={() => { setFormData(m); setShowForm(true); }} className="p-2 text-slate-400 hover:text-[#00A3E0] hover:bg-blue-50 rounded-lg transition"><Edit size={16}/></button>
                    <button onClick={() => handleDelete(m.id)} className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition"><Trash2 size={16}/></button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4">{formData ? 'Edit Menu' : 'Tambah Menu Baru'}</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Nama Menu</label>
                <input required type="text" name="name" defaultValue={formData?.name} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#00A3E0] text-slate-900" placeholder="Misal: Modul Canva"/>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Tautan URL</label>
                <input required type="text" name="href" defaultValue={formData?.href} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#00A3E0] text-slate-900" placeholder="https:// atau /dashboard/..."/>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Nama Ikon (Lucide React)</label>
                <input required type="text" name="iconName" defaultValue={formData?.iconName || 'Link'} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#00A3E0] text-slate-900" placeholder="Misal: Globe, Link, Image"/>
                <p className="text-xs text-slate-400 mt-1">Referensi ikon: <a href="https://lucide.dev/icons" target="_blank" className="text-blue-500 hover:underline">lucide.dev</a></p>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-bold text-slate-700 mb-1">Urutan</label>
                  <input required type="number" name="order" defaultValue={formData?.order || initialMenus.length + 1} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#00A3E0] text-slate-900"/>
                </div>
                {formData && (
                  <div className="flex-1 flex flex-col justify-end">
                    <label className="flex items-center gap-2 mb-3 cursor-pointer">
                      <input type="checkbox" name="isActive" defaultChecked={formData?.isActive} className="w-4 h-4 text-[#00A3E0] rounded border-slate-300"/>
                      <span className="text-sm font-bold text-slate-700">Status Aktif</span>
                    </label>
                  </div>
                )}
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
