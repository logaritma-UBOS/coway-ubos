'use client';
import { useState, useTransition } from 'react';
import { updateUserPassword, deleteUser, togglePremiumStatus, toggleProductLp, toggleRecruitLp } from './actions';
import { KeyRound, Trash2, ExternalLink, Crown } from 'lucide-react';

export default function UserClientManager({ initialUsers }: { initialUsers: any[] }) {
  const [isPending, startTransition] = useTransition();
  const [passwordModal, setPasswordModal] = useState<any>(null);
  
  const handleEditPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const newPass = (e.target as any).newPassword.value;
    startTransition(async () => {
      await updateUserPassword(passwordModal.id, newPass);
      setPasswordModal(null);
    });
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Peringatan Keras!\nApakah Anda yakin ingin menghapus akun agen ${name} secara permanen? Seluruh data Leads dan Transaksinya akan ikut terhapus!`)) {
      startTransition(async () => {
        const res = await deleteUser(id);
        if (res && !res.success) {
          alert(res.error);
        }
      });
    }
  };

  const handleTogglePremium = (id: string, name: string, currentStatus: boolean) => {
    if (confirm(`Apakah Anda yakin ingin mengubah status Premium (Basic LP) agen ${name} menjadi ${currentStatus ? 'Tidak Aktif' : 'Aktif'}?`)) {
      startTransition(async () => {
        await togglePremiumStatus(id, !currentStatus);
      });
    }
  };

  const handleToggleProduct = (id: string, name: string, currentStatus: boolean) => {
    if (confirm(`Apakah Anda yakin ingin mengubah status LP Produk agen ${name} menjadi ${currentStatus ? 'Tidak Aktif' : 'Aktif'}?`)) {
      startTransition(async () => {
        await toggleProductLp(id, !currentStatus);
      });
    }
  };

  const handleToggleRecruit = (id: string, name: string, currentStatus: boolean) => {
    if (confirm(`Apakah Anda yakin ingin mengubah status LP Rekrutmen agen ${name} menjadi ${currentStatus ? 'Tidak Aktif' : 'Aktif'}?`)) {
      startTransition(async () => {
        await toggleRecruitLp(id, !currentStatus);
      });
    }
  };

  return (
    <div>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap md:whitespace-normal">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-4 font-bold text-slate-700">Nama Agen</th>
              <th className="p-4 font-bold text-slate-700">Email & WA</th>
              <th className="p-4 font-bold text-slate-700">LP & Status (Klik untuk Ubah)</th>
              <th className="p-4 font-bold text-slate-700 w-32 text-center">Aksi Detail</th>
            </tr>
          </thead>
          <tbody className={isPending ? 'opacity-50 pointer-events-none' : ''}>
            {initialUsers.map((user) => (
              <tr key={user.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                <td className="p-4 font-bold text-slate-900">{user.name || '-'}</td>
                <td className="p-4">
                  <div className="text-slate-900 font-medium">{user.email}</div>
                  <div className="text-slate-500 text-xs mt-1">{user.whatsappNumber || '-'}</div>
                </td>
                <td className="p-4">
                  <div className="mb-2 flex flex-wrap gap-1">
                    <button 
                      onClick={() => handleTogglePremium(user.id, user.name, user.isPremium)}
                      className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wide transition-colors ${user.isPremium ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : 'bg-slate-100 text-slate-400 hover:bg-slate-200 line-through'}`}
                    >
                      Basic
                    </button>
                    <button 
                      onClick={() => handleToggleProduct(user.id, user.name, (user as any).hasProductLp)}
                      className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wide transition-colors ${(user as any).hasProductLp ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' : 'bg-slate-100 text-slate-400 hover:bg-slate-200 line-through'}`}
                    >
                      Produk
                    </button>
                    <button 
                      onClick={() => handleToggleRecruit(user.id, user.name, (user as any).hasRecruitLp)}
                      className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wide transition-colors ${(user as any).hasRecruitLp ? 'bg-fuchsia-100 text-fuchsia-700 hover:bg-fuchsia-200' : 'bg-slate-100 text-slate-400 hover:bg-slate-200 line-through'}`}
                    >
                      Rekrut
                    </button>
                  </div>
                  {user.slug && (
                    <a href={`/${user.slug}`} target="_blank" className="text-[#00A3E0] font-bold hover:underline flex items-center gap-1 text-xs">
                      Buka LP <ExternalLink size={12}/>
                    </a>
                  )}
                </td>
                <td className="p-4 flex gap-2 justify-center">
                  <button onClick={() => handleTogglePremium(user.id, user.name, user.isPremium)} title={user.isPremium ? 'Ubah ke Basic' : 'Ubah ke Premium'} className={`p-2 rounded-lg transition ${user.isPremium ? 'text-emerald-500 hover:bg-emerald-50' : 'text-slate-400 hover:text-emerald-500 hover:bg-emerald-50'}`}><Crown size={18}/></button>
                  <button onClick={() => setPasswordModal(user)} title="Ubah Password" className="p-2 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition"><KeyRound size={18}/></button>
                  <button onClick={() => handleDelete(user.id, user.name)} title="Hapus Akun Permanen" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition"><Trash2 size={18}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {passwordModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Ubah Password Agen</h3>
            <p className="text-sm text-slate-500 mb-6">Mengubah password untuk akun <strong>{passwordModal.email}</strong>.</p>
            <form onSubmit={handleEditPassword} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Password Baru</label>
                <input required type="text" name="newPassword" minLength={6} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-amber-500 text-slate-900" placeholder="Minimal 6 karakter"/>
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setPasswordModal(null)} className="flex-1 px-4 py-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold transition">Batal</button>
                <button type="submit" disabled={isPending} className="flex-1 px-4 py-2 text-white bg-amber-500 hover:bg-amber-600 rounded-xl font-bold transition disabled:opacity-50">
                  {isPending ? 'Menyimpan...' : 'Simpan Sandi'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
