'use client';

import Link from 'next/link';
import { 
  ArrowRight, 
  CheckCircle2, 
  Play, 
  X, 
  Menu, 
  Star, 
  Heart, 
  TrendingUp, 
  Rocket, 
  Users, 
  DollarSign, 
  MessageSquare, 
  Briefcase, 
  BarChart3, 
  ShieldCheck, 
  Sparkles, 
  Award,
  Zap,
  PhoneCall,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AffiliateTracker from '@/components/AffiliateTracker';
import { Suspense, useState } from 'react';
import Logo from '@/components/Logo';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-[#00A3E0]/20 selection:text-[#00A3E0] overflow-x-hidden">
      <Suspense fallback={null}>
        <AffiliateTracker />
      </Suspense>

      {/* Modern Pastel Header / Navbar (Mirrors Volume One Studios Navbar) */}
      <header className="bg-white/95 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo Left */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#00A3E0] to-blue-600 flex items-center justify-center shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <Logo className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 leading-none">
                  <span className="text-[#00A3E0]">COWAY</span> LOGARITMA
                </span>
              </div>
              <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mt-0.5">
                AGENT GROWTH SYSTEM
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links Centered */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#beranda" className="hover:text-[#00A3E0] transition-colors">Beranda</a>
            <a href="#fitur" className="hover:text-[#00A3E0] transition-colors">Fitur Unggulan</a>
            <a href="#tentang" className="hover:text-[#00A3E0] transition-colors">Tentang Kami</a>
            <a href="#testimoni" className="hover:text-[#00A3E0] transition-colors">Testimoni</a>
            <a href="#investasi" className="hover:text-[#00A3E0] transition-colors">Paket Akses</a>
            <a href="#faq" className="hover:text-[#00A3E0] transition-colors">FAQ</a>
          </nav>

          {/* Right Action Button Desktop (Blue Rounded Pill) */}
          <div className="hidden sm:flex items-center gap-3">
            <Link 
              href="/login" 
              className="px-4 py-2.5 text-slate-600 hover:text-slate-900 font-bold text-sm transition"
            >
              Masuk
            </Link>
            <Link 
              href="/register" 
              className="px-6 py-2.5 bg-[#00A3E0] hover:bg-[#0092ca] text-white font-bold text-sm rounded-full transition shadow-md shadow-sky-500/20 hover:shadow-lg hover:shadow-sky-500/30 active:scale-95"
            >
              Gabung Sekarang — Rp 299rb
            </Link>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <Link 
              href="/register" 
              className="px-3.5 py-1.5 bg-[#00A3E0] text-white text-xs font-bold rounded-full shadow-sm"
            >
              Daftar
            </Link>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-b border-slate-100 bg-white px-4 py-4 space-y-3"
            >
              <a 
                href="#beranda" 
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-bold text-slate-700 hover:text-[#00A3E0]"
              >
                Beranda
              </a>
              <a 
                href="#fitur" 
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-bold text-slate-700 hover:text-[#00A3E0]"
              >
                Fitur Unggulan
              </a>
              <a 
                href="#tentang" 
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-bold text-slate-700 hover:text-[#00A3E0]"
              >
                Tentang Kami
              </a>
              <a 
                href="#testimoni" 
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-bold text-slate-700 hover:text-[#00A3E0]"
              >
                Testimoni
              </a>
              <a 
                href="#investasi" 
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-bold text-slate-700 hover:text-[#00A3E0]"
              >
                Paket Akses
              </a>
              <a 
                href="#faq" 
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-bold text-slate-700 hover:text-[#00A3E0]"
              >
                FAQ
              </a>
              <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
                <Link 
                  href="/login" 
                  className="w-full text-center py-2.5 text-slate-700 font-bold text-sm bg-slate-50 rounded-xl"
                >
                  Masuk ke Akun
                </Link>
                <Link 
                  href="/register" 
                  className="w-full text-center py-3 bg-[#00A3E0] text-white font-bold text-sm rounded-full shadow-md"
                >
                  Gabung Sekarang — Rp 299rb
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* MAIN CONTENT */}
      <main id="beranda" className="relative">

        {/* HERO SECTION */}
        <section className="relative pt-6 pb-14 sm:pt-10 sm:pb-20 lg:pt-16 lg:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
          
          {/* Playful Pastel Geometric Floating Accents (Matching Reference Image) */}
          <div className="absolute top-10 left-6 sm:left-12 w-10 sm:w-12 h-4 sm:h-5 bg-amber-200/60 rounded-full rotate-45 pointer-events-none" />
          <div className="absolute top-1/2 left-2 sm:left-6 w-4 sm:w-5 h-4 sm:h-5 bg-sky-200/70 rounded-full pointer-events-none" />
          <div className="absolute top-8 right-1/4 w-7 sm:w-8 h-7 sm:h-8 bg-sky-200/50 rounded-full pointer-events-none hidden lg:block" />
          <div className="absolute top-40 right-10 w-10 h-4 bg-orange-200/60 rounded-full -rotate-45 pointer-events-none hidden lg:block" />
          <div className="absolute bottom-12 right-1/3 w-6 h-6 bg-cyan-200/50 rounded-full pointer-events-none hidden sm:block" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-left">
              
              {/* Eyebrow Tag */}
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#00A3E0] tracking-wide">
                <span>The ultimate beginner-friendly platform for Coway agents</span>
              </div>

              {/* Main Bold Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-black text-slate-900 tracking-tight leading-[1.12]">
                The Coway <br />
                Health Planner <br />
                <span className="inline-flex items-center gap-2">
                  <span>Insider</span>
                  <span className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-amber-100 border border-amber-200 text-xl sm:text-2xl shadow-sm">
                    💧
                  </span>
                </span>
              </h1>

              {/* Description Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 font-medium max-w-xl leading-relaxed">
                Pelajari cara membangun bisnis Coway secara digital, mendatangkan prospek siap beli setiap hari, dan ciptakan kebebasan finansial tanpa perlu canvassing melelahkan.
              </p>

              {/* Dual Action Pill Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <Link 
                  href="/register" 
                  className="px-8 py-4 bg-[#00A3E0] hover:bg-[#0092ca] text-white font-extrabold text-base rounded-full transition shadow-lg shadow-sky-500/25 hover:shadow-xl hover:shadow-sky-500/35 text-center flex items-center justify-center gap-2 group active:scale-95"
                >
                  <span>Gabung Sekarang — Rp 299rb</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>

                <button 
                  onClick={() => setDemoModalOpen(true)}
                  className="px-7 py-4 bg-white hover:bg-slate-50 text-slate-700 font-bold text-base rounded-full border border-slate-200 transition shadow-sm hover:shadow text-center flex items-center justify-center gap-2.5 active:scale-95"
                >
                  <div className="w-6 h-6 rounded-full bg-sky-100 text-[#00A3E0] flex items-center justify-center shrink-0">
                    <Play size={12} className="fill-current ml-0.5" />
                  </div>
                  <span>Lihat Demo Website</span>
                </button>
              </div>

              {/* Testimonial / Social Proof Cluster (Matching Avatars + Stars in Reference) */}
              <div className="pt-3 sm:pt-4 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex -space-x-2.5 overflow-hidden">
                  <img 
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover shadow-sm" 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" 
                    alt="Health Planner Coway" 
                  />
                  <img 
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover shadow-sm" 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" 
                    alt="Health Planner Coway" 
                  />
                  <img 
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover shadow-sm" 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80" 
                    alt="Health Planner Coway" 
                  />
                  <img 
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover shadow-sm" 
                    src="https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=150&q=80" 
                    alt="Health Planner Coway" 
                  />
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} className="fill-current text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-slate-600">
                    Bergabung bersama <span className="font-extrabold text-slate-900">500+ Health Planner</span> di seluruh Indonesia
                  </p>
                </div>
              </div>

            </div>

            {/* Right Hero Graphic with Floating Cards (Signature Layout from Reference) */}
            <div className="lg:col-span-5 relative flex justify-center mt-4 lg:mt-0">
              <div className="relative w-full max-w-[380px] sm:max-w-[420px] lg:max-w-[440px]">
                
                {/* Central High-Quality Portrait Photo */}
                <div className="relative rounded-[32px] overflow-hidden bg-gradient-to-b from-sky-100/70 to-slate-100 shadow-xl border-4 border-white">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80" 
                    alt="Coway Health Planner Success" 
                    className="w-full h-[420px] sm:h-[480px] lg:h-[500px] object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/25 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Floating Card 1: Top-Right Freedom Badge */}
                <div className="absolute -top-3 right-2 sm:-top-4 sm:-right-4 bg-white rounded-2xl p-2.5 sm:p-3 shadow-lg shadow-slate-200/60 border border-slate-100 flex items-center gap-2 max-w-[190px] sm:max-w-[210px] z-20">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-sky-50 text-[#00A3E0] flex items-center justify-center shrink-0">
                    <Heart size={15} className="fill-[#00A3E0]" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold text-slate-800 leading-snug">
                    Bangun bisnis yang memberi Anda kebebasan
                  </span>
                </div>

                {/* Floating Card 2: Mid-Right Income Metric & Sparkline Chart */}
                <div className="absolute top-24 sm:top-28 right-2 sm:-right-8 bg-white rounded-2xl p-3.5 sm:p-4 shadow-xl shadow-slate-300/40 border border-slate-100 w-[175px] sm:w-[200px] z-20">
                  <div className="text-[10px] sm:text-[11px] font-semibold text-slate-500">
                    Komisi & Bonus Bulan Ini
                  </div>
                  <div className="text-base sm:text-xl font-black text-slate-900 tracking-tight mt-0.5">
                    Rp 28.750.000
                  </div>
                  <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-emerald-600 mt-0.5 mb-2">
                    <TrendingUp size={12} />
                    <span>+38% vs bulan lalu</span>
                  </div>
                  {/* Mini Smooth Sparkline Line */}
                  <svg className="w-full h-7 sm:h-8 overflow-visible" viewBox="0 0 100 30" fill="none">
                    <path 
                      d="M 0 25 Q 20 18, 40 20 T 70 8 T 100 2" 
                      stroke="#00A3E0" 
                      strokeWidth="2.5" 
                      strokeLinecap="round"
                    />
                    <path 
                      d="M 0 25 Q 20 18, 40 20 T 70 8 T 100 2 L 100 30 L 0 30 Z" 
                      fill="url(#sparklineGrad)" 
                      opacity="0.15" 
                    />
                    <defs>
                      <linearGradient id="sparklineGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00A3E0" />
                        <stop offset="100%" stopColor="#ffffff" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* Floating Card 3: Bottom-Right Testimonial Quote */}
                <div className="absolute -bottom-4 right-2 sm:-bottom-6 sm:-right-4 bg-white rounded-2xl p-3 sm:p-3.5 shadow-xl shadow-slate-300/50 border border-slate-100 max-w-[220px] sm:max-w-[250px] z-20">
                  <div className="flex items-center gap-2 mb-1.5">
                    <img 
                      src="https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=150&q=80" 
                      alt="Health Planner Coway" 
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-[#00A3E0]/30"
                    />
                    <div>
                      <div className="text-[11px] font-bold text-slate-900 leading-tight">Rina Marlina</div>
                      <div className="text-[9px] text-slate-500">Health Planner Coway</div>
                    </div>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-slate-600 leading-relaxed font-medium">
                    &ldquo;Bulan pertama langsung tembus 9 unit tanpa door-to-door!&rdquo;
                  </p>
                  <div className="flex items-center gap-0.5 text-amber-400 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={10} className="fill-current text-amber-400" />
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* TRUST BADGE STRIP (Matches the Logo Strip in Reference) */}
        <section className="py-10 border-y border-slate-100 bg-slate-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <p className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-widest">
              Didukung oleh ekosistem resmi & teknologi pemasaran terdepan
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
              <div className="flex items-center gap-2 font-black text-slate-800 text-base sm:text-lg">
                <span className="text-[#00A3E0]">COWAY</span> ECOSYSTEM
              </div>
              <div className="flex items-center gap-1.5 font-bold text-slate-700 text-sm sm:text-base">
                <span className="text-blue-600 font-extrabold text-lg">∞</span> Meta Ads
              </div>
              <div className="flex items-center gap-1.5 font-bold text-slate-700 text-sm sm:text-base">
                <span className="text-emerald-500 font-extrabold">WhatsApp</span> Business
              </div>
              <div className="flex items-center gap-1 font-bold text-slate-700 text-sm sm:text-base">
                <Award size={18} className="text-amber-500" />
                <span>Halal Indonesia</span>
              </div>
              <div className="flex items-center gap-1 font-bold text-slate-700 text-sm sm:text-base">
                <ShieldCheck size={18} className="text-[#00A3E0]" />
                <span>WQA Gold Seal</span>
              </div>
              <div className="flex items-center gap-1 font-bold text-slate-700 text-sm sm:text-base">
                <Zap size={18} className="text-blue-500" />
                <span>SNI Standar</span>
              </div>
            </div>
          </div>
        </section>

        {/* 6-CARD FEATURE GRID ("What You'll Learn / Everything you need...") */}
        <section id="fitur" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          
          {/* Eyebrow and Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
            <span className="text-xs sm:text-sm font-extrabold text-[#00A3E0] uppercase tracking-wider">
              Akselerasi Bisnis Coway
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Semua yang Anda butuhkan untuk membangun bisnis Coway yang sukses
            </h2>
            <p className="text-slate-600 text-base sm:text-lg font-medium">
              Dirancang khusus oleh para top Health Planner untuk melipatgandakan closing tanpa drama.
            </p>
          </div>

          {/* 6 Cards Grid (3 Columns x 2 Rows) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Card 1: Start Business */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group">
              <div className="w-14 h-14 rounded-2xl bg-sky-50 text-[#00A3E0] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Rocket size={26} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Mulai Bisnis Coway Digital
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Panduan praktis langkah demi langkah membangun personal branding dan kehadiran online bahkan jika Anda baru pertama kali memulai.
              </p>
            </div>

            {/* Card 2: Find & Land Clients */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group">
              <div className="w-14 h-14 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users size={26} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Prospek Siap Beli Tanpa Henti
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Pelajari cara mendatangkan prospek keluarga & perkantoran yang butuh pemurni air & udara tanpa canvassing jalanan.
              </p>
            </div>

            {/* Card 3: Price Your Services / Income */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <DollarSign size={26} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Skema Komisi & Recurring Fee
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Strategi memaksimalkan komisi penjualan langsung, bonus bulanan, dan passive income dari sewa jangka panjang Coway.
              </p>
            </div>

            {/* Card 4: WhatsApp Strategy */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group">
              <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MessageSquare size={26} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Sistem Follow-Up WhatsApp
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Skrip closing dan alur follow-up teruji untuk mengubah leads dingin menjadi customer loyal tanpa terkesan memaksa.
              </p>
            </div>

            {/* Card 5: Workflows & Website Tools */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Briefcase size={26} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Website & Tools Penjualan
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Dapatkan website landing page profesional berdomain resmi atas nama Anda sendiri, langsung terhubung ke nomor WhatsApp Anda.
              </p>
            </div>

            {/* Card 6: Scale Into Agency */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group">
              <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 size={26} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Skalakan Menjadi Team Leader
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Sistem duplikasi dan rekrutmen terstandar untuk memperbesar tim Health Planner Anda dan meraih posisi Agency Manager.
              </p>
            </div>

          </div>
        </section>

        {/* INSTRUCTOR / SUPPORT SPOTLIGHT (The Sky Blue Rounded Banner) */}
        <section id="tentang" className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="bg-[#00A3E0] rounded-[36px] p-7 sm:p-12 lg:p-14 text-white shadow-2xl shadow-sky-500/25 relative overflow-hidden">
            
            {/* Subtle organic light reflections inside the blue card */}
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute top-0 right-1/3 w-60 h-60 bg-sky-300/20 rounded-full blur-2xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
              
              {/* Left Photo Container in White Frame */}
              <div className="lg:col-span-4 flex justify-center">
                <div className="bg-white p-2.5 rounded-3xl shadow-xl w-full max-w-[280px]">
                  <img 
                    src="https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=600&q=80" 
                    alt="Support Lead & Mentor Coway" 
                    className="w-full h-72 sm:h-80 object-cover object-top rounded-2xl"
                  />
                </div>
              </div>

              {/* Center Content */}
              <div className="lg:col-span-5 space-y-4 text-center lg:text-left">
                <div className="text-xs font-extrabold uppercase tracking-widest text-sky-100">
                  Meet Your Support System
                </div>
                <h3 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                  Halo, Rekan Health Planner! 👋
                </h3>
                <p className="text-sky-50 text-sm sm:text-base leading-relaxed font-normal">
                  Kami mendedikasikan platform ini khusus untuk membantu rekan-rekan Health Planner di seluruh Indonesia. Dari yang awalnya kesulitan mencari prospek, kini bisa memiliki sistem digital mandiri dengan closing rutin setiap minggu.
                </p>
                <div className="pt-2">
                  <a 
                    href="#investasi" 
                    className="inline-block px-8 py-3.5 bg-white text-[#00A3E0] hover:bg-slate-50 font-extrabold text-sm rounded-full shadow-md transition active:scale-95"
                  >
                    Pelajari Selengkapnya
                  </a>
                </div>
              </div>

              {/* Right 4 Bullet Stats (Matches 4 Icons in Reference Image) */}
              <div className="lg:col-span-3 space-y-4 border-t lg:border-t-0 lg:border-l border-white/20 pt-6 lg:pt-0 lg:pl-8">
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                    <ShieldCheck size={20} className="text-white" />
                  </div>
                  <div className="text-sm font-bold leading-tight">
                    100% Khusus Ekosistem Coway
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                    <Users size={20} className="text-white" />
                  </div>
                  <div className="text-sm font-bold leading-tight">
                    Ratusan Health Planner Aktif
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                    <Zap size={20} className="text-white" />
                  </div>
                  <div className="text-sm font-bold leading-tight">
                    Skrip & Sistem Lapangan Teruji
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                    <Sparkles size={20} className="text-white" />
                  </div>
                  <div className="text-sm font-bold leading-tight">
                    Pendampingan Komunitas Aktif
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* PRICING & OFFER SECTION ("Join Today / Invest in your freedom") */}
        <section id="investasi" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Value Pitch + Checklist + Speech Bubble */}
            <div className="lg:col-span-7 space-y-7">
              <span className="text-xs sm:text-sm font-extrabold text-[#00A3E0] uppercase tracking-wider">
                Mulai Hari Ini
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                Investasi Terbaik untuk Masa Depan Karir Anda
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                Satu investasi terjangkau yang dapat mengubah produktivitas dan penghasilan bulanan Anda sebagai Health Planner.
              </p>

              {/* Checklist items */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-sky-100 text-[#00A3E0] flex items-center justify-center shrink-0">
                    <Check size={14} className="stroke-[3]" />
                  </div>
                  <span className="text-sm sm:text-base font-bold text-slate-800">
                    Website Toko Resmi Atas Nama & WhatsApp Anda
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-sky-100 text-[#00A3E0] flex items-center justify-center shrink-0">
                    <Check size={14} className="stroke-[3]" />
                  </div>
                  <span className="text-sm sm:text-base font-bold text-slate-800">
                    Template Iklan Meta Ads & Skrip WhatsApp Closing
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-sky-100 text-[#00A3E0] flex items-center justify-center shrink-0">
                    <Check size={14} className="stroke-[3]" />
                  </div>
                  <span className="text-sm sm:text-base font-bold text-slate-800">
                    Akses Komunitas Eksklusif & Sesi Bedah Closing Mingguan
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-sky-100 text-[#00A3E0] flex items-center justify-center shrink-0">
                    <Check size={14} className="stroke-[3]" />
                  </div>
                  <span className="text-sm sm:text-base font-bold text-slate-800">
                    Update Katalog & Promo Coway Otomatis Tanpa Biaya Tambahan
                  </span>
                </div>
              </div>

              {/* The Signature Speech Bubble from Reference Image */}
              <div className="pt-4">
                <div className="relative inline-block bg-amber-50/90 border border-amber-200/70 rounded-2xl p-4 sm:p-5 shadow-sm max-w-sm">
                  <div className="text-sm sm:text-base font-bold text-slate-800 flex items-center gap-2">
                    <span>Diri Anda di masa depan akan berterima kasih.</span>
                    <span className="text-[#00A3E0] text-lg">💧</span>
                  </div>
                  {/* Chat bubble pointer tail */}
                  <div className="absolute -bottom-2 left-6 w-4 h-4 bg-amber-50/90 border-r border-b border-amber-200/70 rotate-45" />
                </div>
              </div>
            </div>

            {/* Right Pricing Card Box (Matches the White Pricing Card in Reference Image) */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-[32px] border border-slate-200/80 p-8 sm:p-10 shadow-2xl shadow-sky-500/10 text-center relative">
                
                {/* Price Display */}
                <div className="space-y-1 mb-6">
                  <div className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
                    Rp 299.000
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-500">
                    Sekali bayar — tanpa iuran bulanan
                  </div>
                  <div className="text-xs text-slate-400 pt-1">
                    atau 2x pembayaran <span className="font-bold text-slate-700">Rp 149.500</span>
                  </div>
                </div>

                {/* Primary CTA Button */}
                <Link 
                  href="/register" 
                  className="w-full py-4 bg-[#00A3E0] hover:bg-[#0092ca] text-white font-extrabold text-base sm:text-lg rounded-full transition shadow-lg shadow-sky-500/30 hover:shadow-xl hover:shadow-sky-500/40 block text-center active:scale-95 mb-4"
                >
                  Gabung Sekarang — Rp 299rb
                </Link>

                {/* Guarantee Note */}
                <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-500">
                  <ShieldCheck size={16} className="text-emerald-500 shrink-0" />
                  <span>Garansi 14 Hari Uang Kembali & Pendampingan Sampai Aktif</span>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* TESTIMONIALS SECTION */}
        <section id="testimoni" className="py-16 bg-slate-50/70 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
              <span className="text-xs font-extrabold text-[#00A3E0] uppercase tracking-wider">
                Kisah Sukses
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Dipercaya Ratusan Health Planner
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              
              <div className="bg-white rounded-3xl p-7 border border-slate-100 shadow-sm space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-current text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                  &ldquo;Dulu sebulan paling closing 1 atau 2 unit karena cuma nawarin ke saudara. Begitu pasang landing page pribadi dan iklankan di IG, bulan pertama langsung masuk 7 unit Core & Neo Plus!&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" 
                    alt="Rina Marlina" 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-sm font-bold text-slate-900">Rina Marlina</div>
                    <div className="text-xs text-slate-500">Health Planner — Bandung</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-7 border border-slate-100 shadow-sm space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-current text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                  &ldquo;Skrip follow-up WA nya bener-bener ampuh! Customer yang tadinya bilang &lsquo;nanti dulu ya mas&rsquo; akhirnya closing sewa bulanan karena cara follow-up nya elegan dan tidak memaksa.&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" 
                    alt="Budi Santoso" 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-sm font-bold text-slate-900">Budi Santoso</div>
                    <div className="text-xs text-slate-500">Sales Manager — Surabaya</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-7 border border-slate-100 shadow-sm space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-current text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                  &ldquo;Paling suka karena link tokonya pakai nomor WA saya sendiri. Prospek yang masuk 100% jadi milik saya, dan saya bisa edukasi mereka langsung sampai deal.&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80" 
                    alt="Dewi Anggraini" 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-sm font-bold text-slate-900">Dewi Anggraini</div>
                    <div className="text-xs text-slate-500">Health Planner — Jakarta</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* FAQ ACCORDION SECTION */}
        <section id="faq" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs sm:text-sm font-extrabold text-[#00A3E0] uppercase tracking-wider">
              Tanya Jawab
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Pertanyaan yang Sering Diajukan
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Apakah website ini aman dan resmi untuk agen Coway?",
                a: "Sangat aman. Platform Coway Logaritma dirancang khusus sebagai Support System independen bagi Health Planner Coway untuk mempermudah penjualan online dengan katalog produk resmi, nomor WhatsApp pribadi Anda, dan privasi data terjamin."
              },
              {
                q: "Apakah saya harus paham teknis atau coding untuk menggunakannya?",
                a: "Sama sekali tidak. Semuanya sudah siap pakai (turn-key). Cukup daftar akun, lengkapi profil dan nomor WhatsApp Anda, maka website toko online atas nama Anda langsung aktif secara instan."
              },
              {
                q: "Ke mana chat calon pembeli akan masuk?",
                a: "Semua pesan dari tombol 'Konsultasi' dan 'Pesan Produk' di website langsung mengarah ke nomor WhatsApp pribadi Anda. Tidak ada perantara dan tidak ada potongan sama sekali."
              },
              {
                q: "Apakah disediakan materi promosi & template iklan?",
                a: "Ya! Di dalam member area, Anda akan mendapatkan akses ke kumpulan banner promosi, copy chat WhatsApp, kalkulator simulasi sewa, dan materi edukasi air murni siap posting."
              },
              {
                q: "Bagaimana jika saya memerlukan bantuan saat pengaturan?",
                a: "Tim support kami siap membantu dan membimbing Anda melalui WhatsApp grup maupun sesi pendampingan sampai website Anda siap digunakan mendatangkan prospek."
              }
            ].map((faq, index) => (
              <div 
                key={index}
                className="border border-slate-200/80 rounded-2xl overflow-hidden bg-white shadow-sm"
              >
                <button 
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between font-bold text-base sm:text-lg text-slate-900 hover:text-[#00A3E0] transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className="text-xl text-slate-400 font-light ml-4">
                    {openFaq === index ? "−" : "+"}
                  </span>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-5 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200/80 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#00A3E0] to-blue-600 flex items-center justify-center">
              <Logo className="w-4 h-4 text-white" />
            </div>
            <span className="font-extrabold text-lg text-slate-900">
              <span className="text-[#00A3E0]">Coway</span> Logaritma
            </span>
          </div>

          <div className="text-xs sm:text-sm text-slate-500 font-medium text-center md:text-right space-y-1">
            <p>© {new Date().getFullYear()} Coway Logaritma. Platform Akselerasi Resmi Health Planner.</p>
            <p className="text-[11px] text-slate-400">
              Bukan website resmi korporasi Coway Co., Ltd. Dikelola sebagai Support System independen agen Indonesia.
            </p>
          </div>
        </div>
      </footer>

      {/* INTERACTIVE DEMO PREVIEW MODAL */}
      <AnimatePresence>
        {demoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button 
                onClick={() => setDemoModalOpen(false)}
                className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 transition"
              >
                <X size={20} />
              </button>

              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-[#00A3E0] text-xs font-bold">
                  <span>Preview Website Profil Agen</span>
                </div>
                <h3 className="text-2xl font-black text-slate-900">
                  Seperti inilah website yang akan menjadi milik Anda:
                </h3>
                
                {/* Mockup Card */}
                <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#00A3E0] text-white flex items-center justify-center font-bold text-xs">
                        HP
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">Ahmad Fauzi</div>
                        <div className="text-[10px] text-slate-500">Official Coway Health Planner • Jakarta</div>
                      </div>
                    </div>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                      ● WhatsApp Aktif
                    </span>
                  </div>

                  {/* Simulated Products */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white p-3 rounded-xl border border-slate-100 text-center space-y-1">
                      <div className="text-xs font-bold text-slate-900">Coway OMNE</div>
                      <div className="text-[10px] text-slate-500">Water Purifier Modern</div>
                      <div className="text-xs font-black text-[#00A3E0]">Mulai Rp 280.000/bln</div>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-100 text-center space-y-1">
                      <div className="text-xs font-bold text-slate-900">Coway CORE</div>
                      <div className="text-[10px] text-slate-500">Kapasitas Besar 21.1 L</div>
                      <div className="text-xs font-black text-[#00A3E0]">Mulai Rp 410.000/bln</div>
                    </div>
                  </div>

                  {/* CTA inside mockup */}
                  <div className="bg-[#00A3E0] text-white text-center py-2.5 rounded-xl font-bold text-xs shadow-sm flex items-center justify-center gap-1.5">
                    <PhoneCall size={14} />
                    <span>Chat WhatsApp Ahmad Sekarang</span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed">
                  Semua nama, foto, kontak WhatsApp, dan domain website akan otomatis disesuaikan dengan data Anda saat mendaftar.
                </p>

                <div className="pt-2 flex justify-end gap-3">
                  <button 
                    onClick={() => setDemoModalOpen(false)}
                    className="px-5 py-2.5 text-slate-600 font-bold text-sm hover:bg-slate-100 rounded-full"
                  >
                    Tutup
                  </button>
                  <Link 
                    href="/register" 
                    className="px-6 py-2.5 bg-[#00A3E0] hover:bg-[#0092ca] text-white font-bold text-sm rounded-full shadow-md transition"
                  >
                    Daftar & Buat Website Saya
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
