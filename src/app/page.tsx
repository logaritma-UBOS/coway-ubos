'use client';

import Link from 'next/link';
import { ArrowRight, Globe, Zap, Users, ShieldCheck, CheckCircle2, TrendingUp, BarChart3, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-[#00A3E0]/20 selection:text-[#00A3E0]">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-sky-100/60 to-transparent"></div>
        <div className="absolute top-[-10%] right-[-10%] md:right-[-5%] w-[400px] md:w-[500px] h-[400px] md:h-[500px] rounded-full bg-[#00A3E0]/10 blur-[100px] md:blur-[120px]"></div>
        <div className="absolute top-[20%] left-[-10%] w-[300px] md:w-[400px] h-[300px] md:h-[400px] rounded-full bg-indigo-500/10 blur-[100px] md:blur-[120px]"></div>
      </div>

      <nav className="bg-white/70 backdrop-blur-xl border-b border-white/50 sticky top-0 z-50 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="font-black text-2xl tracking-tight flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00A3E0] to-blue-600 flex items-center justify-center text-white">
              <Zap size={18} fill="currentColor" />
            </div>
            <span className="text-[#0F172A]">Coway</span> UBOS
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-600">
            <a href="#fitur" className="hover:text-[#00A3E0] transition">Fitur</a>
            <a href="#testimoni" className="hover:text-[#00A3E0] transition">Testimoni</a>
            <a href="#harga" className="hover:text-[#00A3E0] transition">Harga</a>
          </div>
          <div className="flex gap-2 sm:gap-3 md:gap-4 items-center">
            <Link href="/login" className="px-2 sm:px-5 py-2.5 text-slate-600 font-bold hover:text-slate-900 transition items-center text-sm sm:text-base whitespace-nowrap">Log In</Link>
            <Link href="/register" className="px-4 py-2 md:px-5 md:py-2.5 bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-sm md:text-base rounded-xl transition shadow-lg shadow-slate-900/20 flex items-center gap-2 whitespace-nowrap">
              Daftar <span className="hidden sm:inline">Agen</span> <ArrowRight size={16} className="hidden sm:block" />
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 pt-4 md:pt-6 pb-20 md:pb-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <motion.div 
              initial="hidden" animate="visible" variants={staggerContainer}
              className="text-center lg:text-left"
            >
              <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50/80 backdrop-blur-sm text-blue-600 font-bold text-sm mb-6 border border-blue-200 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Platform Digital Marketing Coway #1
              </motion.div>
              
              <motion.h1 variants={fadeIn} className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-[1.1]">
                Jualan Coway Lebih Mudah, <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A3E0] to-indigo-600">Banjir Leads Setiap Hari.</span>
              </motion.h1>
              
              <motion.p variants={fadeIn} className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Sistem automasi lengkap untuk Health Planner Coway. Miliki Landing Page sendiri, jalankan Meta Ads otomatis, dan dapatkan prospek langsung ke WhatsApp Anda.
              </motion.p>
              
              <motion.div variants={fadeIn} className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <Link href="/register" className="px-8 py-4 bg-gradient-to-r from-[#00A3E0] to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-bold text-lg rounded-2xl transition-all transform hover:scale-105 shadow-xl shadow-sky-500/30 flex items-center justify-center gap-2">
                  Mulai Sekarang Gratis <ArrowRight size={20} />
                </Link>
                <a href="#fitur" className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 font-bold text-lg rounded-2xl border border-slate-200 transition flex items-center justify-center shadow-sm">
                  Pelajari Sistemnya
                </a>
              </motion.div>

              <motion.div variants={fadeIn} className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-sm font-bold text-slate-500">
                <div className="flex items-center gap-2"><CheckCircle2 size={18} className="text-green-500" /> Tanpa Coding</div>
                <div className="flex items-center gap-2"><CheckCircle2 size={18} className="text-green-500" /> Setup 2 Menit</div>
              </motion.div>
            </motion.div>

            {/* Hero Visual Mockup */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
              className="relative mt-8 lg:mt-0"
            >
              <div className="relative w-full aspect-square md:aspect-[4/3] bg-slate-900 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden border-4 md:border-8 border-slate-800 flex flex-col">
                {/* Mockup Header */}
                <div className="h-6 w-full bg-slate-800 flex items-center px-4 gap-2 border-b border-slate-700/50">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                </div>
                {/* Mockup Body */}
                <div className="flex-1 bg-slate-50 flex">
                  {/* Sidebar Mock */}
                  <div className="w-1/4 bg-white border-r border-slate-200 p-4 space-y-4">
                    <div className="h-6 bg-slate-200 rounded-md w-3/4 mb-8"></div>
                    <div className="h-4 bg-blue-100 rounded-md w-full"></div>
                    <div className="h-4 bg-slate-100 rounded-md w-5/6"></div>
                    <div className="h-4 bg-slate-100 rounded-md w-full"></div>
                  </div>
                  {/* Content Mock */}
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-center mb-6">
                      <div className="h-6 bg-slate-200 rounded-md w-1/3"></div>
                      <div className="h-8 w-8 bg-slate-200 rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                        <div className="h-4 bg-slate-100 rounded-md w-1/2 mb-3"></div>
                        <div className="h-8 bg-green-100 rounded-md w-3/4"></div>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                        <div className="h-4 bg-slate-100 rounded-md w-1/2 mb-3"></div>
                        <div className="h-8 bg-blue-100 rounded-md w-3/4"></div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm h-32 flex items-end gap-2">
                      <div className="w-1/6 bg-indigo-200 rounded-t-sm h-1/3"></div>
                      <div className="w-1/6 bg-indigo-300 rounded-t-sm h-1/2"></div>
                      <div className="w-1/6 bg-indigo-400 rounded-t-sm h-full"></div>
                      <div className="w-1/6 bg-indigo-300 rounded-t-sm h-2/3"></div>
                      <div className="w-1/6 bg-indigo-500 rounded-t-sm h-full"></div>
                      <div className="w-1/6 bg-indigo-600 rounded-t-sm h-5/6"></div>
                    </div>
                  </div>
                </div>

                {/* Floating Notification Mock */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.5 }}
                  className="absolute bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-200 flex items-center gap-4 w-64"
                >
                  <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase">Lead Baru Masuk!</p>
                    <p className="text-sm font-black text-slate-900">+628123456...</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="fitur" className="py-24 bg-white border-y border-slate-200 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">Mengapa Agen Top Pindah ke UBOS?</h2>
              <p className="text-slate-500 text-lg">Platform kami dirancang khusus menghilangkan ribetnya teknologi, agar Anda bisa fokus closing dan jualan.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div 
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "0px 0px -100px 0px" }} variants={fadeIn}
                className="bg-slate-50 p-8 rounded-[2rem] border border-slate-200 hover:shadow-2xl hover:shadow-[#00A3E0]/10 transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-white text-sky-500 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                  <Globe size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-slate-900">Landing Page Sekali Klik</h3>
                <p className="text-slate-500 leading-relaxed">Punya website profesional nama Anda sendiri (cth: coway.logaritma.id/nama-anda). Desain premium & elegan yang bikin pelanggan langsung percaya.</p>
              </motion.div>
              
              <motion.div 
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "0px 0px -100px 0px" }} variants={fadeIn} transition={{ delay: 0.2 }}
                className="bg-slate-50 p-8 rounded-[2rem] border border-slate-200 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-white text-indigo-500 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                  <TrendingUp size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-slate-900">Automasi Meta Ads (FB/IG)</h3>
                <p className="text-slate-500 leading-relaxed">Pusing urus pixel dan targeting? Pesan paket Ads di dashboard, tim ahli kami yang jalankan iklannya. Anda cukup balas chat WA dari pembeli.</p>
              </motion.div>

              <motion.div 
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "0px 0px -100px 0px" }} variants={fadeIn} transition={{ delay: 0.4 }}
                className="bg-slate-50 p-8 rounded-[2rem] border border-slate-200 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-white text-green-500 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                  <ShieldCheck size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-slate-900">100% Leads Milik Anda</h3>
                <p className="text-slate-500 leading-relaxed">Berbeda dengan iklan pusat, di sini leads yang masuk akan langsung masuk ke WhatsApp Anda pribadi tanpa perantara. Privasi data terjamin.</p>
              </motion.div>
            </div>
          </div>
        </section>
        {/* Testimonial Section */}
        <section id="testimoni" className="py-24 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">Kata Mereka yang Sudah Bergabung</h2>
            <p className="text-slate-500 text-lg">Bukti nyata dari para Health Planner yang berhasil meningkatkan penjualannya.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "0px 0px -100px 0px" }} variants={fadeIn} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative mt-4 md:mt-0">
              <div className="absolute -top-8 left-6 text-7xl text-sky-200 font-serif leading-none">"</div>
              <p className="text-slate-600 mb-8 relative z-10 pt-4">Semenjak pakai UBOS, saya gak perlu pusing mikirin cara bikin website. Tinggal masukin nama, website langsung jadi dan leads WA langsung masuk kencang dari iklan!</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center font-bold text-sky-600">AR</div>
                <div>
                  <h4 className="font-bold text-slate-900">Ahmad R.</h4>
                  <p className="text-sm text-slate-500">Health Planner, Jakarta</p>
                </div>
              </div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "0px 0px -100px 0px" }} variants={fadeIn} transition={{ delay: 0.2 }} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative mt-4 md:mt-0">
              <div className="absolute -top-8 left-6 text-7xl text-indigo-200 font-serif leading-none">"</div>
              <p className="text-slate-600 mb-8 relative z-10 pt-4">Fitur Meta Ads-nya juara! Dulu habis budget banyak buat coba-coba ngiklan sendiri. Sekarang terima beres, tiap hari ada yang nanya harga Ombak.</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center font-bold text-indigo-600">SD</div>
                <div>
                  <h4 className="font-bold text-slate-900">Siti D.</h4>
                  <p className="text-sm text-slate-500">Health Planner, Bandung</p>
                </div>
              </div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "0px 0px -100px 0px" }} variants={fadeIn} transition={{ delay: 0.4 }} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative mt-4 md:mt-0">
              <div className="absolute -top-8 left-6 text-7xl text-green-200 font-serif leading-none">"</div>
              <p className="text-slate-600 mb-8 relative z-10 pt-4">Paling suka transparansinya. Leads masuk WA pribadi, gak lewat orang ketiga. Closing rate saya naik drastis bulan ini berkat Landing Page UBOS.</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center font-bold text-green-600">BW</div>
                <div>
                  <h4 className="font-bold text-slate-900">Budi W.</h4>
                  <p className="text-sm text-slate-500">Health Planner, Surabaya</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="harga" className="py-24 bg-slate-100 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">Investasi Sekali, Untung Berkali-kali</h2>
              <p className="text-slate-500 text-lg">Pilih layanan yang Anda butuhkan untuk mendongkrak penjualan Coway Anda.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
              {/* Card 1: Gratis */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "0px 0px -100px 0px" }} variants={fadeIn} className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm relative">
                <div className="text-center mb-8 pt-4">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Akses Basic</h3>
                  <div className="flex justify-center items-end gap-1 mb-4">
                    <span className="text-4xl sm:text-5xl font-black text-slate-900 leading-none">Rp0</span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-slate-500 bg-slate-100 py-2 px-3 rounded-xl border border-slate-200 inline-block">Gratis Selamanya</p>
                </div>
                
                <ul className="space-y-4 mb-10">
                  <li className="flex items-start gap-3 text-slate-600 font-medium text-sm"><CheckCircle2 className="text-slate-400 shrink-0" size={20} /> <span>Akses penuh ke Dashboard UBOS</span></li>
                  <li className="flex items-start gap-3 text-slate-600 font-medium text-sm"><CheckCircle2 className="text-slate-400 shrink-0" size={20} /> <span>Akses Pembelian Jasa Meta Ads (mulai Rp25rb/hari)</span></li>
                  <li className="flex items-start gap-3 text-slate-400 font-medium text-sm"><span className="w-5 h-5 flex items-center justify-center shrink-0">-</span> <span>Tanpa Landing Page Pribadi</span></li>
                  <li className="flex items-start gap-3 text-slate-400 font-medium text-sm"><span className="w-5 h-5 flex items-center justify-center shrink-0">-</span> <span>Tanpa Form Leads WA Otomatis</span></li>
                </ul>
                
                <Link href="/register" className="w-full block text-center py-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl transition">
                  Daftar Gratis
                </Link>
              </motion.div>

              {/* Card 2: Landing Page Pro (Highlighted) */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "0px 0px -100px 0px" }} variants={fadeIn} transition={{ delay: 0.2 }} className="bg-white rounded-[2rem] p-8 border-2 border-[#00A3E0] shadow-2xl shadow-[#00A3E0]/10 relative md:-mt-8 md:mb-8 z-10">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#00A3E0] text-white font-bold px-4 py-1 rounded-full text-sm whitespace-nowrap shadow-sm">
                  Paling Direkomendasikan
                </div>
                <div className="text-center mb-8 pt-4">
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">Aktivasi Landing Page</h3>
                  <div className="flex flex-col sm:flex-row justify-center items-center sm:items-end gap-1 sm:gap-2 mb-4">
                    <span className="text-slate-400 line-through font-medium text-base sm:text-lg">Rp299.000</span>
                    <span className="text-4xl sm:text-5xl font-black text-slate-900 leading-none">Rp99.000</span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-[#00A3E0] bg-sky-50 py-2 px-3 rounded-xl border border-sky-100 inline-block">Lisensi Selamanya (Sekali Bayar)</p>
                </div>
                
                <ul className="space-y-4 mb-10">
                  <li className="flex items-start gap-3 text-slate-600 font-medium text-sm sm:text-base"><CheckCircle2 className="text-green-500 shrink-0" size={24} /> <span>Semua fitur Akses Basic</span></li>
                  <li className="flex items-start gap-3 text-slate-600 font-medium text-sm sm:text-base"><CheckCircle2 className="text-green-500 shrink-0" size={24} /> <span>Domain & Hosting ditanggung UBOS</span></li>
                  <li className="flex items-start gap-3 text-slate-600 font-medium text-sm sm:text-base"><CheckCircle2 className="text-green-500 shrink-0" size={24} /> <span>URL Custom (coway.logaritma.id/nama)</span></li>
                  <li className="flex items-start gap-3 text-slate-600 font-medium text-sm sm:text-base"><CheckCircle2 className="text-green-500 shrink-0" size={24} /> <span>Form Leads Langsung ke WhatsApp</span></li>
                </ul>
                
                <Link href="/register" className="w-full block text-center py-4 bg-[#0F172A] hover:bg-slate-800 text-white font-bold rounded-xl transition shadow-lg shadow-slate-900/20">
                  Aktifkan Landing Page
                </Link>
              </motion.div>

              {/* Card 3: Manajemen Meta Ads */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "0px 0px -100px 0px" }} variants={fadeIn} transition={{ delay: 0.4 }} className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm relative">
                <div className="text-center mb-8 pt-4">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Manajemen Meta Ads</h3>
                  <div className="flex justify-center items-end gap-1 mb-4">
                    <span className="text-4xl sm:text-5xl font-black text-slate-900 leading-none">25rb</span>
                    <span className="text-slate-500 font-bold mb-1">/hari</span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-indigo-600 bg-indigo-50 py-2 px-3 rounded-xl border border-indigo-100 inline-block">Mulai dari (Budget Iklan)</p>
                </div>
                
                <ul className="space-y-4 mb-10">
                  <li className="flex items-start gap-3 text-slate-600 font-medium text-sm"><CheckCircle2 className="text-indigo-500 shrink-0" size={20} /> <span>Terima beres, kami yang jalankan iklan</span></li>
                  <li className="flex items-start gap-3 text-slate-600 font-medium text-sm"><CheckCircle2 className="text-indigo-500 shrink-0" size={20} /> <span>Target audiens spesifik pembeli Coway</span></li>
                  <li className="flex items-start gap-3 text-slate-600 font-medium text-sm"><CheckCircle2 className="text-indigo-500 shrink-0" size={20} /> <span>Leads masuk 100% ke WA Pribadi Anda</span></li>
                  <li className="flex items-start gap-3 text-slate-600 font-medium text-sm"><CheckCircle2 className="text-indigo-500 shrink-0" size={20} /> <span>Laporan performa harian transparan</span></li>
                </ul>
                
                <Link href="/register" className="w-full block text-center py-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-xl transition border border-indigo-200">
                  Jalankan Iklan
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 max-w-5xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            className="bg-[#0F172A] rounded-[3rem] p-10 md:p-16 text-center text-white shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-2xl bg-[#00A3E0] rounded-full blur-[150px] opacity-20 pointer-events-none"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-black mb-6">Siap Meroketkan Sales Anda?</h2>
              <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">Bergabunglah dengan ratusan Health Planner lainnya yang sudah beralih menggunakan platform cerdas UBOS.</p>
              <Link href="/register" className="inline-flex items-center gap-2 px-10 py-5 bg-[#00A3E0] hover:bg-sky-500 text-white font-bold text-xl rounded-full transition-transform transform hover:scale-105 shadow-xl shadow-sky-500/30">
                Buat Akun Gratis Sekarang
              </Link>
            </div>
          </motion.div>
        </section>
      </main>
      
      <footer className="bg-white border-t border-slate-200 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 font-black text-xl text-slate-900">
            <div className="w-6 h-6 rounded bg-slate-900 flex items-center justify-center text-white">
              <Zap size={14} />
            </div>
            Coway UBOS
          </div>
          <p className="text-sm text-slate-500 font-medium text-center md:text-left">
            © {new Date().getFullYear()} Logaritma Digital. Bukan aplikasi resmi Coway pusat.<br className="hidden md:block" /> Dibangun khusus untuk membantu mobilitas mandiri Health Planners.
          </p>
        </div>
      </footer>
    </div>
  );
}
