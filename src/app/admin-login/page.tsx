"use client";

import Link from 'next/link';
import { ArrowLeft, Eye, EyeOff, ShieldAlert } from 'lucide-react';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password
      });

      if (res?.error) {
        throw new Error(res.error);
      }

      router.push('/admin-logaritma');
      router.refresh();
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
        <div className="w-16 h-16 bg-rose-500 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-rose-500/20">
          <ShieldAlert size={32} />
        </div>
        <h2 className="text-center text-3xl font-black tracking-tight text-white">
          Admin Portal Login
        </h2>
        <p className="mt-2 text-center text-sm text-slate-400">
          Hanya untuk Administrator Sistem
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-800 py-8 px-4 shadow-2xl sm:rounded-3xl sm:px-10 border border-slate-700">
          {error && (
            <div className="mb-4 bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm font-medium">
              {error}
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-slate-300 mb-1.5">
                Email Admin
              </label>
              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="appearance-none block w-full px-4 py-3 bg-slate-900/50 border border-slate-700 text-white rounded-xl shadow-sm placeholder-slate-500 focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all"
                  placeholder="admin@logaritma.id"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold text-slate-300 mb-1.5">
                Password
              </label>
              <div>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="appearance-none block w-full px-4 py-3 bg-slate-900/50 border border-slate-700 text-white rounded-xl shadow-sm placeholder-slate-500 focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all pr-12"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-500 hover:text-slate-300 transition"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <button type="submit" disabled={loading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-rose-600 hover:bg-rose-500 focus:outline-none disabled:opacity-50 transition">
                {loading ? 'Memverifikasi...' : 'Akses Admin Panel'}
              </button>
            </div>
            
            <div className="text-center mt-6">
                <Link href="/" className="text-xs text-slate-500 hover:text-slate-300 transition">
                  ← Kembali ke Website Utama
                </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
