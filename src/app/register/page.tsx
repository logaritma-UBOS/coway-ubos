"use client";

import Link from 'next/link';
import { 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  User, 
  Mail, 
  Phone, 
  Award, 
  Globe, 
  Lock, 
  ShieldCheck, 
  Sparkles, 
  AlertCircle, 
  Loader2, 
  CheckCircle2 
} from 'lucide-react';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Logo from '@/components/Logo';

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
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
        throw new Error(data.error || 'Gagal mendaftar akun');
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
      setError(err.message || 'Terjadi kesalahan saat pendaftaran');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-sky-50/20 to-slate-50 flex flex-col justify-between py-8 sm:py-12 px-4 sm:px-6 lg:px-8 font-sans text-slate-900 relative overflow-hidden">
      
      {/* Subtle Ambient Background Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-32 right-1/4 w-[500px] h-[500px] bg-sky-100/50 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-blue-100/40 rounded-full blur-[120px]" />
      </div>

      {/* Top Navigation Bar */}
      <div className="w-full max-w-xl mx-auto flex items-center justify-between relative z-10 mb-6">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-950 transition-colors bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200/80 shadow-xs hover:shadow-sm"
        >
          <ArrowLeft size={15} />
          <span>Kembali ke Beranda</span>
        </Link>

        {/* Brand Logo Mini */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-[#00A3E0] to-blue-600 flex items-center justify-center shadow-xs">
            <Logo className="w-4 h-4 text-white" />
          </div>
          <span className="font-extrabold text-sm text-slate-900">
            <span className="text-[#00A3E0]">Coway</span> Logaritma
          </span>
        </Link>
      </div>

      {/* Main Register Card Container */}
      <div className="w-full max-w-xl mx-auto relative z-10 my-auto">
        <div className="bg-white rounded-3xl sm:rounded-[32px] p-6 sm:p-10 border border-slate-200/80 shadow-2xl shadow-sky-500/5 backdrop-blur-xl">
          
          {/* Card Header */}
          <div className="text-center mb-7 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-[#00A3E0] text-xs font-bold border border-sky-100">
              <Sparkles size={13} />
              <span>Aktivasi Support System Mandiri</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Daftar Akun Agen Coway
            </h1>
            
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Sudah memiliki akun terdaftar?{' '}
              <Link href="/login" className="font-bold text-[#00A3E0] hover:underline underline-offset-2">
                Login di Sini
              </Link>
            </p>
          </div>

          {/* Error Alert Box */}
          {error && (
            <div className="mb-6 bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle size={18} className="shrink-0 text-rose-500 mt-0.5" />
              <div className="leading-relaxed">{error}</div>
            </div>
          )}

          {/* Register Form */}
          <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
            
            {/* Nama Lengkap */}
            <div className="space-y-1.5 text-left">
              <label className="block text-xs sm:text-sm font-bold text-slate-700">
                Nama Lengkap
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="block w-full pl-10 pr-4 py-3 bg-white border border-slate-200 text-slate-900 rounded-xl text-sm font-medium placeholder-slate-400 shadow-2xs hover:border-slate-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#00A3E0]/15 focus:border-[#00A3E0] transition-all"
                  placeholder="Budi Santoso"
                />
              </div>
            </div>

            {/* Email & WhatsApp (2-col on desktop, stacked on mobile) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Email */}
              <div className="space-y-1.5 text-left">
                <label className="block text-xs sm:text-sm font-bold text-slate-700">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="block w-full pl-10 pr-4 py-3 bg-white border border-slate-200 text-slate-900 rounded-xl text-sm font-medium placeholder-slate-400 shadow-2xs hover:border-slate-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#00A3E0]/15 focus:border-[#00A3E0] transition-all"
                    placeholder="budi@example.com"
                  />
                </div>
              </div>

              {/* WhatsApp */}
              <div className="space-y-1.5 text-left">
                <label className="block text-xs sm:text-sm font-bold text-slate-700">
                  Nomor WhatsApp Aktif
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Phone size={18} />
                  </div>
                  <input
                    type="tel"
                    required
                    value={formData.whatsappNumber}
                    onChange={(e) => setFormData({...formData, whatsappNumber: e.target.value})}
                    className="block w-full pl-10 pr-4 py-3 bg-white border border-slate-200 text-slate-900 rounded-xl text-sm font-medium placeholder-slate-400 shadow-2xs hover:border-slate-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#00A3E0]/15 focus:border-[#00A3E0] transition-all"
                    placeholder="081234567890"
                  />
                </div>
              </div>

            </div>

            {/* ID Agen Coway (Opsional) */}
            <div className="space-y-1.5 text-left">
              <div className="flex items-center justify-between">
                <label className="block text-xs sm:text-sm font-bold text-slate-700">
                  ID Agen Coway Resmi
                </label>
                <span className="text-[11px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                  Opsional
                </span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Award size={18} />
                </div>
                <input
                  type="text"
                  value={formData.cowayId}
                  onChange={(e) => setFormData({...formData, cowayId: e.target.value})}
                  className="block w-full pl-10 pr-4 py-3 bg-white border border-slate-200 text-slate-900 rounded-xl text-sm font-medium placeholder-slate-400 shadow-2xs hover:border-slate-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#00A3E0]/15 focus:border-[#00A3E0] transition-all"
                  placeholder="Contoh: CWY-12345 (atau kosongkan)"
                />
              </div>
            </div>

            {/* Pilih Username / URL Toko */}
            <div className="space-y-1.5 text-left">
              <label className="block text-xs sm:text-sm font-bold text-slate-700">
                Pilih Username (URL Website Toko Anda)
              </label>
              <div className="flex rounded-xl shadow-2xs border border-slate-200 focus-within:ring-4 focus-within:ring-[#00A3E0]/15 focus-within:border-[#00A3E0] overflow-hidden transition-all">
                <span className="bg-slate-50 border-r border-slate-200 px-3 sm:px-3.5 py-3 text-slate-500 font-semibold text-xs sm:text-sm flex items-center gap-1.5 select-none shrink-0">
                  <Globe size={15} className="text-[#00A3E0]" />
                  <span>coway.logaritma.id/</span>
                </span>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-')})}
                  className="block w-full px-3 py-3 bg-white text-slate-900 text-xs sm:text-sm font-bold placeholder-slate-400 focus:outline-none"
                  placeholder="budi-santoso"
                />
              </div>
              <p className="text-[11px] text-slate-500 flex items-center gap-1 pt-0.5">
                <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                <span>Link toko Anda: <strong>coway.logaritma.id/{formData.slug || 'username'}</strong></span>
              </p>
            </div>

            {/* Password */}
            <div className="space-y-1.5 text-left">
              <label className="block text-xs sm:text-sm font-bold text-slate-700">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="block w-full pl-10 pr-11 py-3 bg-white border border-slate-200 text-slate-900 rounded-xl text-sm font-medium placeholder-slate-400 shadow-2xs hover:border-slate-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#00A3E0]/15 focus:border-[#00A3E0] transition-all"
                  placeholder="Minimal 6 karakter"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-4 bg-[#00A3E0] hover:bg-[#0092ca] text-white font-extrabold text-sm sm:text-base rounded-full transition shadow-md shadow-sky-500/25 hover:shadow-lg hover:shadow-sky-500/35 active:scale-98 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Mendaftarkan Akun Anda...</span>
                  </>
                ) : (
                  <span>Daftar &amp; Aktifkan Website Saya</span>
                )}
              </button>
            </div>

          </form>

          {/* Trust Marker Bottom */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-xs font-semibold text-slate-500">
            <ShieldCheck size={16} className="text-emerald-500 shrink-0" />
            <span>100% Bebas Biaya Pendaftaran • Chat Prospek Langsung ke WA</span>
          </div>

        </div>
      </div>

      {/* Footer Info */}
      <div className="w-full max-w-xl mx-auto text-center relative z-10 pt-6">
        <p className="text-xs text-slate-500">
          Dengan mendaftar, Anda menyetujui ketentuan layanan dan privasi data platform Coway Logaritma.
        </p>
      </div>

    </div>
  );
}
