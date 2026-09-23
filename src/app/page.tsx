'use client';

import Link from 'next/link';
import { ArrowRight, ArrowDown, Globe, Zap, CheckCircle2, Target, MessageSquare, ListTodo, FileText, Focus, BarChart3, Rocket, CreditCard, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import AffiliateTracker from '@/components/AffiliateTracker';
import { Suspense, useState, useEffect } from 'react';

function TypewriterText({ text, delay = 0 }: { text: string, delay?: number }) {
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isWaiting) {
      timeout = setTimeout(() => setIsWaiting(false), delay);
      return () => clearTimeout(timeout);
    }

    if (!isDeleting && displayedText.length < text.length) {
      timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, 100);
    } else if (!isDeleting && displayedText.length === text.length) {
      timeout = setTimeout(() => setIsDeleting(true), 3000); // Wait before deleting
    } else if (isDeleting && displayedText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length - 1));
      }, 50);
    } else if (isDeleting && displayedText.length === 0) {
      setIsDeleting(false);
      setIsWaiting(true);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, isWaiting, text, delay]);

  return (
    <span className="inline relative">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A3E0] to-indigo-600">
        {displayedText}
      </span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
        className="inline-block w-[4px] h-[1em] bg-indigo-600 align-middle ml-1 relative -top-1"
      />
    </span>
  );
}

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
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-[#00A3E0]/20 selection:text-[#00A3E0] overflow-x-hidden">
      <Suspense fallback={null}>
        <AffiliateTracker />
      </Suspense>
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-sky-100/60 to-transparent"></div>
        <div className="absolute top-[-10%] right-[-10%] md:right-[-5%] w-[400px] md:w-[500px] h-[400px] md:h-[500px] rounded-full bg-[#00A3E0]/10 blur-[100px] md:blur-[120px]"></div>
        <div className="absolute top-[20%] left-[-10%] w-[300px] md:w-[400px] h-[300px] md:h-[400px] rounded-full bg-indigo-500/10 blur-[100px] md:blur-[120px]"></div>
      </div>

      <nav className="bg-white/70 backdrop-blur-xl border-b border-white/50 sticky top-0 z-50 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="font-black text-xl sm:text-2xl tracking-tight flex items-center gap-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-[#00A3E0] to-blue-600 flex items-center justify-center text-white shrink-0">
              <Zap size={16} className="sm:w-[18px] sm:h-[18px]" fill="currentColor" />
            </div>
            <span className="text-[#0F172A]">Coway</span> UBOS
          </div>
          <div className="flex gap-1 sm:gap-3 md:gap-4 items-center">
            <Link href="/login" className="px-2 sm:px-5 py-2.5 text-slate-600 font-bold hover:text-slate-900 transition items-center text-sm sm:text-base whitespace-nowrap">Log In</Link>
            <Link href="/register" className="px-3 py-2 md:px-5 md:py-2.5 bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-sm md:text-base rounded-xl transition shadow-lg shadow-slate-900/20 flex items-center gap-1 sm:gap-2 whitespace-nowrap">
              Daftar <span className="hidden sm:inline">Gratis</span> <ArrowRight size={16} className="hidden sm:block" />
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 pt-12 md:pt-24 pb-20 md:pb-32 text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-5xl mx-auto">
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 font-bold px-4 py-2 rounded-full text-sm sm:text-base mb-6 shadow-sm border border-blue-200">
              <Zap size={16} className="text-[#00A3E0]"/> Agent Operating System Khusus Coway
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-8 leading-[1.1]">
              Pusat Kendali Bisnis Coway Anda:<br className="hidden md:block" />
              Dari Prospek hingga <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A3E0] to-indigo-600">Closing Otomatis.</span>
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-lg md:text-xl text-slate-600 mb-12 leading-relaxed font-medium px-4 md:px-0 max-w-4xl mx-auto">
              Platform support system terpadu untuk Agent & Team Leader Coway. Gabungan Metode Logaritma, Landing Page Penjualan, Jasa Meta Ads Presisi, dan Layanan Pendukung Bisnis dalam Satu Dashboard.
            </motion.p>
            
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link href="/register" className="inline-flex w-full sm:w-auto px-8 py-4 sm:py-5 bg-gradient-to-r from-[#00A3E0] to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-bold text-base sm:text-lg rounded-full transition-all transform hover:scale-105 shadow-xl shadow-sky-500/30 items-center justify-center gap-3">
                Daftar & Masuk ke Dashboard <ArrowRight size={20} />
              </Link>
            </motion.div>
            
            <motion.div variants={fadeIn} className="mt-8 text-slate-500 text-sm font-medium flex items-center justify-center gap-2">
              <ShieldCheck size={18} className="text-emerald-500" />
              Tersedia Layanan Konsultasi Gratis di Dalam Dashboard
            </motion.div>
          </motion.div>
        </section>

        {/* 4 Pilar Section */}
        <section className="py-24 bg-white border-y border-slate-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-slate-50 to-transparent pointer-events-none"></div>
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "0px 0px -100px 0px" }} variants={staggerContainer} className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-black tracking-tight mb-4">4 Pilar Solusi Support System Logaritma</motion.h2>
              <motion.p variants={fadeIn} className="text-lg text-slate-600 max-w-3xl mx-auto font-medium">
                Semua yang Anda butuhkan untuk membangun, mengembangkan, dan menskala bisnis Coway Anda tersedia dalam satu ekosistem.
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {/* Pilar 1 */}
              <motion.div variants={fadeIn} className="bg-slate-50 border border-slate-200 rounded-3xl p-8 hover:shadow-lg transition group">
                <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <BarChart3 size={28} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Metode Logaritma (Smart Analytics)</h3>
                <p className="text-slate-600 leading-relaxed font-medium">
                  Manajemen leads cerdas, prediksi prospek potensial menggunakan algoritma lead scoring, dan pemantauan omzet tim secara real-time.
                </p>
              </motion.div>

              {/* Pilar 2 */}
              <motion.div variants={fadeIn} className="bg-slate-50 border border-slate-200 rounded-3xl p-8 hover:shadow-lg transition group">
                <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Globe size={28} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Landing Page Khusus Coway</h3>
                <p className="text-slate-600 leading-relaxed font-medium">
                  Website personalisasi yang terbukti berkonversi tinggi. Langsung siap pakai, terintegrasi dengan tombol WhatsApp & Form lead generation otomatis.
                </p>
              </motion.div>

              {/* Pilar 3 */}
              <motion.div variants={fadeIn} className="bg-slate-50 border border-slate-200 rounded-3xl p-8 hover:shadow-lg transition group">
                <div className="w-14 h-14 bg-sky-100 text-[#00A3E0] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Target size={28} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Layanan Meta Ads Presisi</h3>
                <p className="text-slate-600 leading-relaxed font-medium">
                  Tidak perlu pusing riset audiens. Serahkan penyiapan & pengisian campaign FB/IG Ads tertarget pada kami untuk memasok prospek harian ke WhatsApp Anda.
                </p>
              </motion.div>

              {/* Pilar 4 */}
              <motion.div variants={fadeIn} className="bg-slate-50 border border-slate-200 rounded-3xl p-8 hover:shadow-lg transition group">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Rocket size={28} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Business Support & Automasi</h3>
                <p className="text-slate-600 leading-relaxed font-medium">
                  Akses instan ke ribuan aset materi promosi, skrip penanganan komplain (objection handling), panduan closing, dan automasi pengingat follow-up harian.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Kemudahan Akses & Transaksi Section */}
        <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]"></div>
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "0px 0px -100px 0px" }} variants={staggerContainer} className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <motion.div variants={fadeIn} className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm border border-white/20">
                <CreditCard size={32} className="text-[#00A3E0]" />
              </motion.div>
              <motion.h2 variants={fadeIn} className="text-3xl md:text-5xl font-black tracking-tight mb-6 leading-tight">
                Marketplace Internal.<br />Aktivasi Serba Instan.
              </motion.h2>
              <motion.p variants={fadeIn} className="text-lg md:text-xl text-slate-300 font-medium leading-relaxed mb-8">
                Tingkatkan skala bisnis Anda kapan saja. Seluruh pembelian paket layanan pendukung, aktivasi Landing Page, maupun pemesanan Jasa Meta Ads diproses secara otomatis melalui Dashboard Anda.
              </motion.p>
              
              <motion.div variants={fadeIn} className="flex flex-wrap items-center gap-4 text-slate-300 font-medium text-sm md:text-base">
                <span className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700"><CheckCircle2 className="text-[#00A3E0]" size={18} /> QRIS Terverifikasi</span>
                <span className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700"><CheckCircle2 className="text-[#00A3E0]" size={18} /> Virtual Account</span>
                <span className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700"><CheckCircle2 className="text-[#00A3E0]" size={18} /> E-Wallet</span>
                <span className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700"><CheckCircle2 className="text-[#00A3E0]" size={18} /> Kartu Kredit</span>
              </motion.div>
            </div>
            
            <motion.div variants={fadeIn} className="flex-1 w-full bg-slate-800 border border-slate-700 p-8 rounded-3xl shadow-2xl relative">
              <div className="absolute -top-4 -right-2 md:-right-4 bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl shadow-lg transform rotate-3 md:rotate-6 text-sm md:text-base">
                Automated Provisioning
              </div>
              <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-3">
                <Zap className="text-[#00A3E0]" /> Alur Kerja Instan
              </h3>
              
              <div className="space-y-6 relative">
                <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-slate-700"></div>
                
                <div className="flex gap-4 relative z-10">
                  <div className="w-8 h-8 rounded-full bg-slate-700 border-2 border-slate-900 flex items-center justify-center font-bold text-sm shrink-0">1</div>
                  <div>
                    <h4 className="font-bold text-white">Pilih Paket Layanan</h4>
                    <p className="text-slate-400 text-sm mt-1">Pilih layanan yang Anda butuhkan langsung dari Dashboard Marketplace.</p>
                  </div>
                </div>
                
                <div className="flex gap-4 relative z-10">
                  <div className="w-8 h-8 rounded-full bg-slate-700 border-2 border-slate-900 flex items-center justify-center font-bold text-sm shrink-0">2</div>
                  <div>
                    <h4 className="font-bold text-white">Pembayaran Aman</h4>
                    <p className="text-slate-400 text-sm mt-1">Selesaikan pembayaran secara online melalui payment gateway terpercaya (Mayar).</p>
                  </div>
                </div>
                
                <div className="flex gap-4 relative z-10">
                  <div className="w-8 h-8 rounded-full bg-[#00A3E0] border-2 border-slate-900 flex items-center justify-center font-bold text-sm shrink-0 shadow-[0_0_15px_rgba(0,163,224,0.5)]">3</div>
                  <div>
                    <h4 className="font-bold text-white">Sistem Langsung Aktif</h4>
                    <p className="text-slate-400 text-sm mt-1">Webhook kami akan menerima konfirmasi dan secara otomatis menyalakan akses/layanan Anda detik itu juga.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32 bg-white text-center px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="max-w-3xl mx-auto">
            <motion.h2 variants={fadeIn} className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-8">Siap Mengendalikan Bisnis Anda?</motion.h2>
            <motion.p variants={fadeIn} className="text-lg md:text-xl text-slate-600 mb-10 font-medium">
              Bergabunglah dengan ekosistem Logaritma sekarang dan jadikan seluruh proses dari pencarian prospek hingga closing berjalan secara otomatis.
            </motion.p>
            <motion.div variants={fadeIn}>
              <Link href="/register" className="inline-flex w-full md:w-auto px-10 py-5 bg-gradient-to-r from-[#00A3E0] to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-bold text-base md:text-xl rounded-full transition-all transform hover:scale-105 shadow-xl shadow-sky-500/30 items-center justify-center gap-3">
                MULAI GUNAKAN UBOS SEKARANG <ArrowRight size={24} />
              </Link>
            </motion.div>
          </motion.div>
        </section>
      </main>

      <footer className="bg-slate-50 py-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00A3E0] to-blue-600 flex items-center justify-center text-white shrink-0">
              <Zap size={18} fill="currentColor" />
            </div>
            <span className="font-black text-xl text-slate-800"><span className="text-[#0F172A]">Coway</span> UBOS</span>
          </div>
          <p className="text-slate-500 text-sm font-medium">© {new Date().getFullYear()} Logaritma UBOS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
