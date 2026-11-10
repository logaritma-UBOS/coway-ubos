"use client";

import Link from 'next/link';
import { 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  ShieldCheck, 
  Sparkles, 
  MessageCircle, 
  AlertCircle, 
  Loader2, 
  TrendingUp, 
  CheckCircle2, 
  Smartphone 
} from 'lucide-react';
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
    <div className="min-h-screen bg-[#EBF5FF] flex items-center justify-center p-3 sm:p-6 lg:p-10 font-sans text-slate-900 selection:bg-[#00A3E0]/20 selection:text-[#00A3E0]">
      
      {/* Outer Floating Split-Screen Modal Card */}
      <div className="w-full max-w-md lg:max-w-5xl bg-white rounded-[24px] sm:rounded-[32px] lg:rounded-[36px] shadow-xl lg:shadow-2xl shadow-sky-950/10 border border-slate-100 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-0 lg:min-h-[620px]">
        
        {/* COMPACT TOP HEADER FOR MOBILE ONLY (Clean, compact, no huge mockup pushing form down) */}
        <div className="lg:hidden bg-gradient-to-r from-[#00A3E0] via-[#0298d4] to-blue-600 px-5 py-4 text-white flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white text-[#00A3E0] flex items-center justify-center shadow-xs">
              <Logo className="w-4 h-4 text-[#00A3E0]" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-extrabold text-sm tracking-tight leading-none text-white">
                COWAY LOGARITMA
              </span>
              <span className="text-[9px] font-bold text-sky-100 tracking-wider uppercase mt-0.5">
                Support System Agen
              </span>
            </div>
          </Link>

          <Link 
            href="/" 
            className="inline-flex items-center gap-1 text-xs font-bold text-sky-100 hover:text-white bg-white/15 px-2.5 py-1 rounded-lg transition"
          >
            <ArrowLeft size={13} />
            <span>Beranda</span>
          </Link>
        </div>

        {/* LEFT COLUMN: Coway Sky-Blue Visual Showcase Panel (Shown on Desktop only: hidden on mobile) */}
        <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-br from-[#00A3E0] via-[#0298d4] to-blue-600 p-8 lg:p-10 text-white flex-col justify-between relative overflow-hidden">
          
          {/* Subtle Ambient Shapes Inside Blue Panel */}
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-10 -left-10 w-40 h-40 bg-sky-300/20 rounded-full blur-xl pointer-events-none" />

          {/* Top: Brand Header */}
          <div className="relative z-10 space-y-2">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-white text-[#00A3E0] flex items-center justify-center shadow-md shadow-sky-950/10 group-hover:scale-105 transition-transform">
                <Logo className="w-5 h-5 text-[#00A3E0]" />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-extrabold text-base sm:text-lg tracking-tight leading-none text-white">
                  COWAY LOGARITMA
                </span>
                <span className="text-[10px] font-bold text-sky-100 tracking-wider uppercase mt-0.5">
                  Support System Agen
                </span>
              </div>
            </Link>
            
            <p className="text-xs text-sky-100 font-medium leading-relaxed pt-1 max-w-xs">
              Platform akselerasi closing khusus Health Planner &amp; Team Leader Coway Indonesia.
            </p>
          </div>

          {/* Center: 3D / Isometric Style Coway Feature Mockup */}
          <div className="relative z-10 my-8 flex flex-col items-center justify-center">
            
            <div className="relative w-full max-w-[300px]">
              
              {/* Central Card Mockup */}
              <div className="bg-white/15 backdrop-blur-md border border-white/25 rounded-3xl p-5 shadow-xl text-left space-y-3.5">
                <div className="flex items-center justify-between border-b border-white/20 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-white text-[#00A3E0] flex items-center justify-center font-black text-xs">
                      HP
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white leading-none">Dashboard Member</div>
                      <div className="text-[9px] text-sky-100 mt-0.5">Live Agent Sync</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-400 text-slate-950 text-[9px] font-black rounded-full">
                    ● AKTIF
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="text-[10px] text-sky-100 font-semibold">Komisi &amp; Unit Bulan Ini</div>
                  <div className="text-xl font-black text-white tracking-tight">Rp 28.750.000</div>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-300">
                    <TrendingUp size={11} />
                    <span>+38% vs target unit</span>
                  </div>
                </div>

                {/* Simulated Notification Badge */}
                <div className="bg-white text-slate-900 rounded-xl p-2.5 shadow-sm text-xs font-medium space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-bold text-[#00A3E0]">
                    <span className="flex items-center gap-1">
                      <MessageCircle size={11} /> Prospek WhatsApp Baru:
                    </span>
                    <span className="text-[9px] text-slate-400 font-normal">Baru saja</span>
                  </div>
                  <div className="text-[11px] text-slate-700 italic truncate">
                    &quot;Mau tanya promo sewa Coway OMNE...&quot;
                  </div>
                </div>
              </div>

              {/* Decorative Floating Badges */}
              <div className="absolute -top-3 -right-2 bg-amber-300 text-slate-950 font-black text-[10px] px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                <span>💧 100% Khusus Coway</span>
              </div>

              <div className="absolute -bottom-3 -left-2 bg-white text-slate-900 font-bold text-[10px] px-3 py-1.5 rounded-xl shadow-lg border border-slate-100 flex items-center gap-1.5">
                <CheckCircle2 size={12} className="text-emerald-500" />
                <span>Leads Masuk ke WA Pribadi</span>
              </div>

            </div>

          </div>

          {/* Bottom: Switch to Register Link */}
          <div className="relative z-10 pt-4 border-t border-white/20 text-left">
            <span className="text-xs text-sky-100 font-medium">
              Belum terdaftar sebagai agen?{' '}
            </span>
            <Link 
              href="/register" 
              className="text-xs font-extrabold text-white underline underline-offset-4 hover:text-amber-200 transition-colors inline-block ml-1"
            >
              Daftar Sekarang →
            </Link>
          </div>

        </div>

        {/* RIGHT COLUMN: Modern White Form Panel */}
        <div className="lg:col-span-7 p-6 sm:p-8 lg:p-12 flex flex-col justify-between bg-white">
          
          {/* Top Header Row with Return Link (Visible on Desktop only; mobile already has header) */}
          <div className="hidden lg:flex items-center justify-between mb-8">
            <Link 
              href="/" 
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft size={15} />
              <span>Kembali ke Beranda</span>
            </Link>

            <span className="text-xs font-bold text-[#00A3E0] bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
              Member Area
            </span>
          </div>

          {/* Form Content */}
          <div className="max-w-md w-full mx-auto space-y-5 sm:space-y-6">
            
            {/* Heading */}
            <div className="text-left space-y-1 sm:space-y-1.5">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Masuk ke Dashboard
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-normal">
                Kelola landing page pribadi, pantau calon prospek, dan akses materi promosi resmi Coway.
              </p>
            </div>

            {/* Error Notification */}
            {error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl text-xs sm:text-sm font-medium flex items-start gap-2.5 animate-in fade-in">
                <AlertCircle size={17} className="shrink-0 text-rose-500 mt-0.5" />
                <div className="leading-relaxed">{error}</div>
              </div>
            )}

            {/* Login Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              
              {/* Email Address */}
              <div className="space-y-1.5 text-left">
                <label htmlFor="email" className="block text-xs sm:text-sm font-bold text-slate-700">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail size={17} />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="block w-full pl-10 pr-4 py-3 bg-white border border-slate-200 text-slate-900 rounded-xl text-sm font-medium placeholder-slate-400 shadow-2xs hover:border-slate-300 focus:outline-none focus:ring-4 focus:ring-[#00A3E0]/15 focus:border-[#00A3E0] transition-all"
                    placeholder="budi@example.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5 text-left">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-xs sm:text-sm font-bold text-slate-700">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowResetModal(true)}
                    className="text-xs font-semibold text-[#00A3E0] hover:underline transition"
                  >
                    Lupa password?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock size={17} />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="block w-full pl-10 pr-11 py-3 bg-white border border-slate-200 text-slate-900 rounded-xl text-sm font-medium placeholder-slate-400 shadow-2xs hover:border-slate-300 focus:outline-none focus:ring-4 focus:ring-[#00A3E0]/15 focus:border-[#00A3E0] transition-all"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition cursor-pointer"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
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

              {/* Primary Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-4 bg-[#00A3E0] hover:bg-[#0092ca] text-white font-extrabold text-sm sm:text-base rounded-xl sm:rounded-2xl transition shadow-lg shadow-sky-500/25 hover:shadow-xl hover:shadow-sky-500/35 active:scale-98 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
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

            {/* Mobile-Only Switch Link to Register */}
            <div className="lg:hidden text-center pt-2 text-xs text-slate-500 font-medium">
              Belum terdaftar sebagai agen?{' '}
              <Link 
                href="/register" 
                className="font-extrabold text-[#00A3E0] hover:underline underline-offset-2 ml-0.5"
              >
                Daftar Sekarang →
              </Link>
            </div>

          </div>

          {/* Bottom Security / Trust Footer */}
          <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-emerald-500 shrink-0" />
              <span>Enkripsi SSL 256-Bit</span>
            </span>
            <span>Coway Logaritma © {new Date().getFullYear()}</span>
          </div>

        </div>

      </div>

      {/* Custom Reset Password Modal via WhatsApp */}
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
                className="w-full bg-[#00A3E0] hover:bg-[#0092ca] text-white font-bold py-3 px-4 rounded-xl transition shadow-md shadow-sky-500/25 flex items-center justify-center gap-2 text-sm"
              >
                <MessageCircle size={16} />
                <span>Hubungi Admin via WhatsApp</span>
              </a>
              
              <button 
                type="button"
                onClick={() => setShowResetModal(false)}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-4 rounded-xl transition text-sm cursor-pointer"
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
