"use client";

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsappNumber: '',
    cowayId: '',
    slug: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. Hit Register API
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Gagal registrasi');
      }

      // 2. Auto Login after success
      const signInRes = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password
      });

      if (signInRes?.error) {
        throw new Error(signInRes.error);
      }

      // 3. Redirect to Dashboard
      router.push('/dashboard');
      router.refresh();
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition mb-6">
          <ArrowLeft size={16} /> Kembali ke Beranda
        </Link>
        <h2 className="text-center text-3xl font-black tracking-tight text-slate-900">
          Daftar Agen UBOS
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Sudah punya akun?{' '}
          <Link href="/login" className="font-bold text-[#00A3E0] hover:text-sky-600">
            Login di sini
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-3xl sm:px-10 border border-slate-100">
          {error && (
            <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium">
              {error}
            </div>
          )}
          
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Nama Lengkap</label>
              <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="block w-full px-4 py-3 bg-slate-50 border border-slate-300 text-slate-900 rounded-xl shadow-sm placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00A3E0]/50 focus:border-[#00A3E0] transition-all" placeholder="Budi Santoso" />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Email</label>
              <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="block w-full px-4 py-3 bg-slate-50 border border-slate-300 text-slate-900 rounded-xl shadow-sm placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00A3E0]/50 focus:border-[#00A3E0] transition-all" placeholder="budi@example.com" />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Nomor WhatsApp Aktif</label>
              <input type="text" required value={formData.whatsappNumber} onChange={(e) => setFormData({...formData, whatsappNumber: e.target.value})} className="block w-full px-4 py-3 bg-slate-50 border border-slate-300 text-slate-900 rounded-xl shadow-sm placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00A3E0]/50 focus:border-[#00A3E0] transition-all" placeholder="081234567890" />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">ID Agen Coway Resmi (Jika Ada)</label>
              <input type="text" value={formData.cowayId} onChange={(e) => setFormData({...formData, cowayId: e.target.value})} className="block w-full px-4 py-3 bg-slate-50 border border-slate-300 text-slate-900 rounded-xl shadow-sm placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00A3E0]/50 focus:border-[#00A3E0] transition-all" placeholder="CWY-12345" />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Pilih Username (Untuk URL Landing Page)</label>
              <div className="flex">
                <span className="bg-slate-100 border border-slate-300 border-r-0 rounded-l-xl px-3 py-3 text-slate-600 font-medium select-none text-sm flex items-center">
                  coway.logaritma.id/
                </span>
                <input type="text" required value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-')})} className="block w-full px-4 py-3 bg-slate-50 border border-slate-300 text-slate-900 rounded-r-xl shadow-sm placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00A3E0]/50 focus:border-[#00A3E0] transition-all" placeholder="budi-santoso" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Password</label>
              <input type="password" required value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="block w-full px-4 py-3 bg-slate-50 border border-slate-300 text-slate-900 rounded-xl shadow-sm placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00A3E0]/50 focus:border-[#00A3E0] transition-all" placeholder="••••••••" />
            </div>

            <div className="pt-2">
              <button type="submit" disabled={loading} className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-[#00A3E0] hover:bg-sky-600 focus:outline-none disabled:opacity-50 transition">
                {loading ? 'Memproses...' : 'Buat Akun Sekarang'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
