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
  CheckCircle2,
  MessageCircle,
  ShoppingBag
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
  const [agreeTerms, setAgreeTerms] = useState(true);
  
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
    setError('');

    if (!agreeTerms) {
      setError('Anda harus menyetujui Ketentuan Layanan & Kebijakan Privasi untuk melanjutkan.');
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.slug.trim() || !formData.password) {
      setError('Mohon lengkapi seluruh kolom yang wajib diisi.');
      return;
    }

    setLoading(true);

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
    <div className="min-h-screen bg-[#EBF5FF] flex items-center justify-center p-3 sm:p-6 lg:p-10 font-sans text-slate-900 selection:bg-[#00A3E0]/20 selection:text-[#00A3E0]">
      
      {/* Outer Floating Split-Screen Modal Card (Matching Reference Image) */}
      <div className="w-full max-w-5xl bg-white rounded-[28px] sm:rounded-[36px] shadow-2xl shadow-sky-900/10 border border-slate-100 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        
        {/* LEFT COLUMN: Coway Sky-Blue Visual Showcase Panel */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#00A3E0] via-[#0298d4] to-blue-600 p-6 sm:p-8 lg:p-10 text-white flex flex-col justify-between relative overflow-hidden">
          
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
            
            <p className="text-xs text-sky-100 font-medium leading-relaxed pt-1 max-w-xs hidden sm:block">
              Sistem akselerasi penjualan mandiri &amp; website profesional khusus Health Planner Coway.
            </p>
          </div>

          {/* Center: 3D / Isometric Style Coway Feature Mockup */}
          <div className="relative z-10 my-6 sm:my-8 flex flex-col items-center justify-center">
            
            {/* Visual Graphic Composition */}
            <div className="relative w-full max-w-[280px] sm:max-w-[310px]">
              
              {/* Central Card Mockup simulating personal website store */}
              <div className="bg-white/15 backdrop-blur-md border border-white/25 rounded-3xl p-4 sm:p-5 shadow-xl text-left space-y-3">
                
                {/* Browser bar preview */}
                <div className="flex items-center gap-2 border-b border-white/20 pb-2.5">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-rose-400" />
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  </div>
                  <div className="flex-1 bg-white/20 rounded-md px-2 py-0.5 text-[10px] font-semibold text-white/90 truncate flex items-center gap-1">
                    <Globe size={10} className="text-sky-200 shrink-0" />
                    <span className="truncate">coway.logaritma.id/{formData.slug || 'nama-anda'}</span>
                  </div>
                </div>

                {/* Agent Store Showcase */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-sky-100 uppercase tracking-wide">
                      Landing Page Pribadi
                    </span>
                    <span className="px-2 py-0.5 bg-emerald-400 text-slate-950 text-[9px] font-black rounded-full">
                      ● SIAP AKTIF
                    </span>
                  </div>
                  <div className="text-base sm:text-lg font-black text-white tracking-tight leading-tight">
                    {formData.name || 'Website Toko Agen'}
                  </div>
                  <div className="text-[11px] text-sky-100 font-medium">
                    Katalog Resmi: Omne, Core, Cinnamon &amp; Cartridge
                  </div>
                </div>

                {/* Simulated Notification WhatsApp Direct Leads */}
                <div className="bg-white text-slate-900 rounded-xl p-2.5 shadow-sm text-xs font-medium space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-bold text-[#00A3E0]">
                    <span className="flex items-center gap-1">
                      <MessageCircle size={11} /> Prospek Masuk Otomatis:
                    </span>
                    <span className="text-[9px] text-emerald-600 font-bold">100% Milik Anda</span>
                  </div>
                  <div className="text-[11px] text-slate-700 italic truncate">
                    Tombol WA terhubung ke: {formData.whatsappNumber || '08xxxxxxxxxx'}
                  </div>
                </div>
              </div>

              {/* Decorative Floating Badges matching Reference Style */}
              <div className="absolute -top-3 -right-2 bg-amber-300 text-slate-950 font-black text-[10px] px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                <span>💧 100% Khusus Coway</span>
              </div>

              <div className="absolute -bottom-3 -left-2 bg-white text-slate-900 font-bold text-[10px] px-3 py-1.5 rounded-xl shadow-lg border border-slate-100 flex items-center gap-1.5">
                <CheckCircle2 size={12} className="text-emerald-500" />
                <span>Siap Iklan Meta Ads &amp; Closing</span>
              </div>

            </div>

          </div>

          {/* Bottom: Switch to Login Link (Matching Reference "Already have an account? Login") */}
          <div className="relative z-10 pt-4 border-t border-white/20 text-center sm:text-left">
            <span className="text-xs text-sky-100 font-medium">
              Sudah memiliki akun terdaftar?{' '}
            </span>
            <Link 
              href="/login" 
              className="text-xs font-extrabold text-white underline underline-offset-4 hover:text-amber-200 transition-colors inline-block ml-1"
            >
              Masuk di Sini →
            </Link>
          </div>

        </div>

        {/* RIGHT COLUMN: Modern White Form Panel (Matching Reference Image Right Panel) */}
        <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-white">
          
          {/* Top Header Row with Return Link */}
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <Link 
              href="/" 
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft size={15} />
              <span>Kembali ke Beranda</span>
            </Link>

            <span className="text-xs font-bold text-[#00A3E0] bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
              Registrasi Agen Baru
            </span>
          </div>

          {/* Form Content Container */}
          <div className="w-full max-w-lg mx-auto space-y-5">
            
            {/* Title & Subtitle */}
            <div className="text-left space-y-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Daftar Akun Baru
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-normal">
                Buat landing page pribadi dan mulai dapatkan prospek calon pembeli Coway.
              </p>
            </div>

            {/* Error Notification */}
            {error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium flex items-start gap-2 animate-in fade-in">
                <AlertCircle size={16} className="shrink-0 text-rose-500 mt-0.5" />
                <div className="leading-relaxed">{error}</div>
              </div>
            )}

            {/* Register Form */}
            <form className="space-y-3.5 sm:space-y-4" onSubmit={handleSubmit}>
              
              {/* Nama Lengkap */}
              <div className="space-y-1 text-left">
                <label className="block text-xs font-bold text-slate-700">
                  Nama Lengkap
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User size={16} />
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="block w-full pl-10 pr-4 py-2.5 sm:py-3 bg-white border border-slate-200 text-slate-900 rounded-xl text-sm font-medium placeholder-slate-400 shadow-2xs hover:border-slate-300 focus:outline-none focus:ring-4 focus:ring-[#00A3E0]/15 focus:border-[#00A3E0] transition-all"
                    placeholder="Contoh: Budi Santoso"
                  />
                </div>
              </div>

              {/* 2-Column: Email & WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                
                {/* Email Address */}
                <div className="space-y-1 text-left">
                  <label className="block text-xs font-bold text-slate-700">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail size={16} />
                    </div>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="block w-full pl-10 pr-3 py-2.5 sm:py-3 bg-white border border-slate-200 text-slate-900 rounded-xl text-sm font-medium placeholder-slate-400 shadow-2xs hover:border-slate-300 focus:outline-none focus:ring-4 focus:ring-[#00A3E0]/15 focus:border-[#00A3E0] transition-all"
                      placeholder="budi@example.com"
                    />
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="space-y-1 text-left">
                  <label className="block text-xs font-bold text-slate-700">
                    Nomor WhatsApp Aktif
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Phone size={16} />
                    </div>
                    <input
                      type="tel"
                      required
                      value={formData.whatsappNumber}
                      onChange={(e) => setFormData({...formData, whatsappNumber: e.target.value})}
                      className="block w-full pl-10 pr-3 py-2.5 sm:py-3 bg-white border border-slate-200 text-slate-900 rounded-xl text-sm font-medium placeholder-slate-400 shadow-2xs hover:border-slate-300 focus:outline-none focus:ring-4 focus:ring-[#00A3E0]/15 focus:border-[#00A3E0] transition-all"
                      placeholder="081234567890"
                    />
                  </div>
                </div>

              </div>

              {/* Username (URL Website Toko) */}
              <div className="space-y-1 text-left">
                <label className="block text-xs font-bold text-slate-700">
                  Pilih Username Toko (Link Landing Page Anda)
                </label>
                <div className="flex rounded-xl shadow-2xs border border-slate-200 focus-within:ring-4 focus-within:ring-[#00A3E0]/15 focus-within:border-[#00A3E0] overflow-hidden transition-all">
                  <span className="bg-slate-50 border-r border-slate-200 px-3 py-2.5 sm:py-3 text-slate-500 font-semibold text-xs sm:text-sm flex items-center gap-1 select-none shrink-0">
                    <Globe size={14} className="text-[#00A3E0]" />
                    <span className="hidden sm:inline">coway.logaritma.id/</span>
                    <span className="sm:hidden">/</span>
                  </span>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-')})}
                    className="block w-full px-3 py-2.5 sm:py-3 bg-white text-slate-900 text-xs sm:text-sm font-bold placeholder-slate-400 focus:outline-none"
                    placeholder="budi-santoso"
                  />
                </div>
                <div className="text-[11px] text-slate-500 flex items-center gap-1 pt-0.5">
                  <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />
                  <span>URL Toko Anda: <strong className="text-slate-800">coway.logaritma.id/{formData.slug || 'username'}</strong></span>
                </div>
              </div>

              {/* 2-Column: Password & ID Agen Coway */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                
                {/* Password */}
                <div className="space-y-1 text-left">
                  <label className="block text-xs font-bold text-slate-700">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock size={16} />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="block w-full pl-10 pr-9 py-2.5 sm:py-3 bg-white border border-slate-200 text-slate-900 rounded-xl text-sm font-medium placeholder-slate-400 shadow-2xs hover:border-slate-300 focus:outline-none focus:ring-4 focus:ring-[#00A3E0]/15 focus:border-[#00A3E0] transition-all"
                      placeholder="Min. 6 karakter"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* ID Agen Coway (Opsional) */}
                <div className="space-y-1 text-left">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-700">
                      ID Agen Coway
                    </label>
                    <span className="text-[10px] font-medium text-slate-400 bg-slate-100 px-1.5 py-0.2 rounded">
                      Opsional
                    </span>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Award size={16} />
                    </div>
                    <input
                      type="text"
                      value={formData.cowayId}
                      onChange={(e) => setFormData({...formData, cowayId: e.target.value})}
                      className="block w-full pl-10 pr-3 py-2.5 sm:py-3 bg-white border border-slate-200 text-slate-900 rounded-xl text-sm font-medium placeholder-slate-400 shadow-2xs hover:border-slate-300 focus:outline-none focus:ring-4 focus:ring-[#00A3E0]/15 focus:border-[#00A3E0] transition-all"
                      placeholder="Contoh: CWY-12345"
                    />
                  </div>
                </div>

              </div>

              {/* Agreement Checkbox (Matching Reference Style) */}
              <div className="pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer select-none text-left">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="h-4 w-4 mt-0.5 text-[#00A3E0] focus:ring-[#00A3E0]/30 border-slate-300 rounded cursor-pointer accent-[#00A3E0]"
                  />
                  <span className="text-xs text-slate-600 leading-relaxed font-normal">
                    Dengan mendaftar, Anda menyetujui{' '}
                    <span className="text-[#00A3E0] font-semibold hover:underline cursor-pointer">
                      Ketentuan Layanan
                    </span>
                    {' '}dan{' '}
                    <span className="text-[#00A3E0] font-semibold hover:underline cursor-pointer">
                      Kebijakan Privasi
                    </span>
                    {' '}platform Coway Logaritma.
                  </span>
                </label>
              </div>

              {/* Primary Submit Button (Matching Reference "Create Account") */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-4 bg-[#00A3E0] hover:bg-[#0092ca] text-white font-extrabold text-sm sm:text-base rounded-xl sm:rounded-2xl transition shadow-lg shadow-sky-500/25 hover:shadow-xl hover:shadow-sky-500/35 active:scale-98 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Mendaftarkan &amp; Membuat Website...</span>
                    </>
                  ) : (
                    <span>Daftar Sekarang &amp; Buat Website</span>
                  )}
                </button>
              </div>

            </form>

            {/* Quick Assistance Help */}
            <div className="text-center pt-1">
              <span className="text-xs text-slate-500">
                Butuh bantuan pendaftaran?{' '}
                <a 
                  href="https://wa.me/6285179660408?text=Halo%20Admin%20Coway%20Logaritma,%20saya%20butuh%20panduan%20pendaftaran%20agen."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#00A3E0] hover:underline inline-flex items-center gap-1"
                >
                  <MessageCircle size={13} />
                  <span>Chat CS Support via WhatsApp</span>
                </a>
              </span>
            </div>

          </div>

          {/* Bottom Security / Trust Footer */}
          <div className="pt-4 sm:pt-6 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-emerald-500 shrink-0" />
              <span>Enkripsi SSL 256-Bit • 100% Gratis</span>
            </span>
            <span>Coway Logaritma © {new Date().getFullYear()}</span>
          </div>

        </div>

      </div>

    </div>
  );
}
