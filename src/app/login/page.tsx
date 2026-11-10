"use client";

import Link from 'next/link';
import { ArrowLeft, Eye, EyeOff, Mail, Lock, ShieldCheck, Sparkles, MessageCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Logo from '@/components/Logo';

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  
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

      router.push('/dashboard');
      router.refresh();
      
    } catch (err: any) {
      setError(err.message || 'Email atau password yang Anda masukkan salah');
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
      <div className="w-full max-w-lg mx-auto flex items-center justify-between relative z-10 mb-6">
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

      {/* Main Login Card Container */}
      <div className="w-full max-w-lg mx-auto relative z-10 my-auto">
        <div className="bg-white rounded-3xl sm:rounded-[32px] p-6 sm:p-10 border border-slate-200/80 shadow-2xl shadow-sky-500/5 backdrop-blur-xl">
          
          {/* Card Header */}
          <div className="text-center mb-7 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-[#00A3E0] text-xs font-bold border border-sky-100">
              <Sparkles size={13} />
              <span>Akses Khusus Health Planner Coway</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Login ke Member Area
            </h1>
            
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Belum terdaftar sebagai agen?{' '}
              <Link href="/register" className="font-bold text-[#00A3E0] hover:underline underline-offset-2">
                Daftar Akun Baru
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

          {/* Form */}
          <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
            
            {/* Email Field */}
            <div className="space-y-1.5 text-left">
              <label htmlFor="email" className="block text-xs sm:text-sm font-bold text-slate-700">
                Alamat Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail size={18} />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="block w-full pl-10 pr-4 py-3 bg-white border border-slate-200 text-slate-900 rounded-xl text-sm font-medium placeholder-slate-400 shadow-2xs hover:border-slate-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#00A3E0]/15 focus:border-[#00A3E0] transition-all"
                  placeholder="budi@example.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5 text-left">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-xs sm:text-sm font-bold text-slate-700">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowResetModal(true)}
                  className="text-xs font-bold text-[#00A3E0] hover:underline transition"
                >
                  Lupa password?
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock size={18} />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="block w-full pl-10 pr-11 py-3 bg-white border border-slate-200 text-slate-900 rounded-xl text-sm font-medium placeholder-slate-400 shadow-2xs hover:border-slate-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#00A3E0]/15 focus:border-[#00A3E0] transition-all"
                  placeholder="••••••••"
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

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#00A3E0] focus:ring-[#00A3E0]/30 border-slate-300 rounded cursor-pointer accent-[#00A3E0]"
                />
                <span className="text-xs font-semibold text-slate-600">
                  Ingat sesi saya
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 bg-[#00A3E0] hover:bg-[#0092ca] text-white font-extrabold text-sm sm:text-base rounded-full transition shadow-md shadow-sky-500/25 hover:shadow-lg hover:shadow-sky-500/35 active:scale-98 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Memproses Masuk...</span>
                  </>
                ) : (
                  <span>Masuk ke Dashboard</span>
                )}
              </button>
            </div>

          </form>

          {/* Trust Marker Bottom */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-xs font-semibold text-slate-500">
            <ShieldCheck size={16} className="text-emerald-500 shrink-0" />
            <span>Koneksi Terenkripsi SSL • Data Prospek 100% Aman</span>
          </div>

        </div>
      </div>

      {/* Footer Support Info */}
      <div className="w-full max-w-lg mx-auto text-center relative z-10 pt-6">
        <p className="text-xs text-slate-500">
          Mengalami kendala saat login? Hubungi tim support via WhatsApp:{' '}
          <a 
            href="https://wa.me/6285179660408?text=Halo%20Admin%20Coway%20Logaritma,%20saya%20butuh%20bantuan%20login." 
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-[#00A3E0] hover:underline inline-flex items-center gap-1"
          >
            <MessageCircle size={13} />
            <span>0851-7966-0408</span>
          </a>
        </p>
      </div>

      {/* Custom Reset Password Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl p-6 sm:p-8 text-center border border-slate-100 space-y-4">
            <div className="w-14 h-14 bg-sky-50 text-[#00A3E0] rounded-2xl flex items-center justify-center mx-auto shadow-xs border border-sky-100">
              <MessageCircle size={28} />
            </div>
            
            <h3 className="text-xl font-black text-slate-900 tracking-tight">
              Reset Password Akun
            </h3>
            
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Demi keamanan akun Health Planner Anda, proses reset password diverifikasi langsung oleh Admin kami melalui WhatsApp.
            </p>
            
            <div className="flex flex-col gap-2.5 pt-2">
              <a 
                href="https://wa.me/6285179660408?text=Halo%20Admin%20Coway%20Logaritma,%20saya%20lupa%20password%20akun%20saya.%20Mohon%20bantuannya%20untuk%20reset%20password."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowResetModal(false)}
                className="w-full bg-[#00A3E0] hover:bg-[#0092ca] text-white font-bold py-3 px-4 rounded-full transition shadow-md shadow-sky-500/25 flex items-center justify-center gap-2 text-sm"
              >
                <MessageCircle size={16} />
                <span>Hubungi Admin via WhatsApp</span>
              </a>
              
              <button 
                type="button"
                onClick={() => setShowResetModal(false)}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-4 rounded-full transition text-sm"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
