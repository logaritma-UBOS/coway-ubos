'use client';

import Link from 'next/link';
import { 
  ArrowRight, 
  CheckCircle2, 
  Target, 
  MessageSquare, 
  BarChart3, 
  Rocket, 
  ShieldCheck, 
  Smartphone, 
  QrCode, 
  HelpCircle, 
  Sparkles, 
  Users2, 
  AlertCircle,
  TrendingUp,
  Clock,
  Send
} from 'lucide-react';
import { motion } from 'framer-motion';
import AffiliateTracker from '@/components/AffiliateTracker';
import { Suspense, useState } from 'react';
import Logo from '@/components/Logo';

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 selection:bg-[#00A3E0]/20 selection:text-[#00A3E0] overflow-x-hidden">
      <Suspense fallback={null}>
        <AffiliateTracker />
      </Suspense>

      {/* Subtle Ambient Background Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 right-1/4 w-[600px] h-[600px] bg-sky-200/40 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] bg-blue-100/60 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-cyan-100/40 rounded-full blur-[140px]" />
      </div>

      {/* Modern Executive Navbar */}
      <nav className="bg-white/85 backdrop-blur-xl border-b border-slate-200/80 sticky top-0 z-50 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#00A3E0] to-blue-600 flex items-center justify-center shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <Logo className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight leading-none text-slate-900">
                <span className="text-[#00A3E0]">Coway</span> Logaritma
              </span>
              <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase mt-0.5">
                Agent Growth Platform
              </span>
            </div>
          </Link>

          {/* Nav Links Desktop */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#masalah" className="hover:text-[#00A3E0] transition-colors">Tantangan Agen</a>
            <a href="#solusi" className="hover:text-[#00A3E0] transition-colors">4 Senjata Utama</a>
            <a href="#alur-kerja" className="hover:text-[#00A3E0] transition-colors">Alur Kerja</a>
            <a href="#faq" className="hover:text-[#00A3E0] transition-colors">Tanya Jawab</a>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link 
              href="/login" 
              className="px-4 sm:px-5 py-2.5 text-slate-700 font-bold hover:text-slate-950 transition text-sm sm:text-base rounded-xl hover:bg-slate-100/80"
            >
              Masuk
            </Link>
            <Link 
              href="/register" 
              className="px-4 sm:px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm sm:text-base rounded-xl transition shadow-sm hover:shadow-md flex items-center gap-1.5"
            >
              <span>Daftar Akun</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 md:pt-20 pb-16 md:pb-24">
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={staggerContainer} 
            className="text-center max-w-4xl mx-auto"
          >
            {/* Pill Badge */}
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 bg-sky-50 text-[#0084B6] border border-sky-200/80 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold mb-6 shadow-sm">
              <Sparkles size={14} className="text-[#00A3E0]" />
              <span>Eksklusif untuk Health Planner & Team Leader Coway Indonesia</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              variants={fadeIn} 
              className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-950 leading-[1.15] mb-6"
            >
              Buntu Jualan Karena Pasar Teman & Keluarga Mulai Habis?
            </motion.h1>

            {/* Sub-headline */}
            <motion.p 
              variants={fadeIn} 
              className="text-base sm:text-xl text-slate-600 font-medium leading-relaxed mb-10 max-w-3xl mx-auto"
            >
              Amankan target <span className="text-slate-950 font-bold">5–10 Unit Closing tiap bulan</span> dengan support system mandiri: 
              Website Landing Page pribadi atas nama Anda, pasokan prospek harian dari Meta Ads, dan asisten follow-up WhatsApp terarah.
            </motion.p>

            {/* Action Buttons */}
            <motion.div 
              variants={fadeIn} 
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto"
            >
              <Link 
                href="/register" 
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#00A3E0] to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-bold text-base sm:text-lg rounded-2xl transition shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
              >
                <span>Mulai Sekarang (Gratis)</span>
                <ArrowRight size={18} />
              </Link>
              <a 
                href="#solusi" 
                className="w-full sm:w-auto px-7 py-4 bg-white hover:bg-slate-50 text-slate-800 font-bold text-base rounded-2xl border border-slate-200 transition shadow-sm flex items-center justify-center"
              >
                Pelajari Fiturnya
              </a>
            </motion.div>

            {/* Trust Badges Bar */}
            <motion.div 
              variants={fadeIn} 
              className="mt-12 pt-8 border-t border-slate-200/80 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm font-semibold text-slate-600"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-500" />
                <span>Tanpa Ribet Beli Domain / Hosting</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-500" />
                <span>Terhubung Langsung ke WhatsApp Pribadi</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-500" />
                <span>Siap Pakai untuk Iklan Facebook & IG</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Interactive Hero Visual Mockup */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-12 sm:mt-16 max-w-5xl mx-auto"
          >
            <div className="bg-white p-3 sm:p-5 rounded-3xl border border-slate-200/80 shadow-2xl shadow-slate-200/50">
              <div className="bg-slate-900 rounded-2xl p-4 sm:p-8 text-white relative overflow-hidden">
                {/* Decorative background circle */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#00A3E0]/10 rounded-full blur-3xl pointer-events-none" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                  {/* Left explanation */}
                  <div className="lg:col-span-7 text-left space-y-4">
                    <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-semibold">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      Contoh Tampilan Website Agen Anda
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                      Website Toko Coway Profesional Berlisensi Nama Anda Sendiri
                    </h3>
                    <p className="text-slate-300 text-sm sm:text-base font-normal leading-relaxed">
                      Lengkap dengan foto profil, nomor WhatsApp Anda, kalkulator hemat galon interaktif, dan katalog resmi (Neo Plus, Ombak, Core, Storm).
                    </p>
                    <div className="flex items-center gap-3 pt-2">
                      <div className="bg-slate-800/90 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-sky-300 flex items-center gap-2">
                        <Smartphone size={14} />
                        <span>coway.logaritma.id/nama-anda</span>
                      </div>
                      <span className="text-xs text-slate-400 font-medium">Bisa dibuka di semua HP & Tablet</span>
                    </div>
                  </div>

                  {/* Right: Live Card Preview */}
                  <div className="lg:col-span-5 bg-white text-slate-900 rounded-2xl p-5 shadow-xl border border-slate-100 space-y-4 text-left">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-full bg-[#00A3E0] text-white flex items-center justify-center font-black text-sm">
                          HP
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-slate-900 leading-tight">Budi Santoso</h4>
                          <span className="text-xs text-slate-500 font-medium">Official Health Planner Coway</span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[11px] font-bold rounded-md border border-emerald-200">
                        Agen Terverifikasi
                      </span>
                    </div>

                    {/* Simulation lead notification */}
                    <div className="bg-sky-50/70 border border-sky-100 rounded-xl p-3 space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-bold text-[#0084B6]">
                        <span className="flex items-center gap-1.5">
                          <MessageSquare size={13} />
                          Prospek Masuk Otomatis ke WA:
                        </span>
                        <span className="text-[10px] text-slate-400 font-normal">Baru saja</span>
                      </div>
                      <p className="text-xs text-slate-700 font-medium italic">
                        &quot;Halo Mas Budi, saya tertarik promo cicilan Coway Neo Plus 200rb-an untuk pasang di rumah. Bisa bantu cek jadwal survey?&quot;
                      </p>
                    </div>

                    <div className="pt-1 flex items-center justify-between text-xs text-slate-500">
                      <span className="font-semibold text-emerald-600 flex items-center gap-1">
                        <CheckCircle2 size={13} /> Form terhubung ke WA Anda
                      </span>
                      <span className="font-mono text-[11px] bg-slate-100 px-2 py-1 rounded">100% Milik Anda</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Realita Lapangan Section */}
        <section id="masalah" className="py-20 bg-white border-y border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-1.5 text-rose-600 font-bold text-xs sm:text-sm uppercase tracking-widest mb-3">
                <AlertCircle size={15} />
                <span>Realita di Lapangan</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-950 mb-4">
                3 Tantangan yang Sering Menjebak Agen Coway di Bulan ke-2 dan Seterusnya
              </h2>
              <p className="text-slate-600 text-base sm:text-lg font-medium">
                Bulan pertama biasanya semangat karena masih ada teman dan keluarga. Namun saat pasar dekat habis, banyak agen mulai buntu dan berhenti jualan.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {/* Problem 1 */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-8 hover:shadow-md transition">
                <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center font-black text-xl mb-6">
                  1
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Pasar Hangat Habis (Cold Market Buntu)
                </h3>
                <p className="text-slate-600 font-medium text-sm sm:text-base leading-relaxed">
                  Semua kerabat, tetangga, dan teman kantor sudah ditawari. Anda bingung harus mencari calon pembeli baru kemana lagi setiap hari.
                </p>
              </div>

              {/* Problem 2 */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-8 hover:shadow-md transition">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center font-black text-xl mb-6">
                  2
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Gaptek Iklan & Takut Boncos
                </h3>
                <p className="text-slate-600 font-medium text-sm sm:text-base leading-relaxed">
                  Ingin pasang iklan Meta Ads di Facebook & Instagram tapi bingung teknis Ads Manager, riset audiens, dan takut saldo hangus tanpa ada chat masuk.
                </p>
              </div>

              {/* Problem 3 */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-8 hover:shadow-md transition">
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-black text-xl mb-6">
                  3
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Follow-up Prospek Berantakan
                </h3>
                <p className="text-slate-600 font-medium text-sm sm:text-base leading-relaxed">
                  Banyak calon pembeli bertanya harga lalu menghilang dengan alasan &quot;pikir-pikir dulu&quot;. Karena tidak ada sistem pengingat, chat tenggelam dan mereka akhirnya beli di agen lain.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4 Pilar Solusi Section */}
        <section id="solusi" className="py-20 md:py-28 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-[#00A3E0] font-extrabold text-xs sm:text-sm uppercase tracking-widest block mb-3">
                Solusi Nyata Logaritma
              </span>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-950 mb-4">
                4 Senjata Utama untuk Mendongkrak Omzet Unit Anda
              </h2>
              <p className="text-slate-600 text-base sm:text-lg font-medium">
                Didesain khusus untuk alur kerja Health Planner di Indonesia — praktis, teruji, dan tanpa istilah rumit.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {/* Pilar 1 */}
              <div className="bg-white border border-slate-200/80 rounded-3xl p-8 hover:shadow-xl transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-sky-50 text-[#00A3E0] flex items-center justify-center mb-6">
                    <Smartphone size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    1. Website Toko Resmi Atas Nama Anda
                  </h3>
                  <p className="text-slate-600 font-medium leading-relaxed mb-6">
                    Miliki alamat website sendiri (contoh: <span className="font-semibold text-slate-900">coway.logaritma.id/nama-anda</span>). Lengkap dengan kalkulator penghematan galon, foto Anda, dan tombol WhatsApp langsung ke nomor pribadi Anda.
                  </p>
                </div>
                <ul className="space-y-2.5 pt-4 border-t border-slate-100 text-sm font-semibold text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500" /> Desain Korean Clean yang meyakinkan calon pembeli
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500" /> Katalog produk lengkap: Neo Plus, Ombak, Core, Storm
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500" /> Siap dijadikan URL tujuan iklan Meta Ads
                  </li>
                </ul>
              </div>

              {/* Pilar 2 */}
              <div className="bg-white border border-slate-200/80 rounded-3xl p-8 hover:shadow-xl transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                    <Target size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    2. Layanan Iklan Meta Ads (Banjir Chat WA)
                  </h3>
                  <p className="text-slate-600 font-medium leading-relaxed mb-6">
                    Tidak perlu pusing belajar Facebook Ads Manager. Tim spesialis Logaritma yang menyusun materi, menargetkan audiens ibu rumah tangga & pemilik usaha di kota Anda. Anda cukup bersiap menjawab chat calon pembeli yang masuk.
                  </p>
                </div>
                <ul className="space-y-2.5 pt-4 border-t border-slate-100 text-sm font-semibold text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500" /> Target kota bisa disesuaikan dengan jangkauan Anda
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500" /> Materi iklan visual teruji menghasilkan lead berkualitas
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500" /> Biaya transparan langsung dari dashboard Anda
                  </li>
                </ul>
              </div>

              {/* Pilar 3 */}
              <div className="bg-white border border-slate-200/80 rounded-3xl p-8 hover:shadow-xl transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
                    <MessageSquare size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    3. Smart WhatsApp Follow-Up Assistant
                  </h3>
                  <p className="text-slate-600 font-medium leading-relaxed mb-6">
                    90% closing di Coway terjadi pada follow-up ke-2 sampai ke-4. Sistem di dashboard Anda akan mencatat status prospek dan mengingatkan Anda kapan waktu terbaik menyapa mereka kembali beserta template pesannya.
                  </p>
                </div>
                <ul className="space-y-2.5 pt-4 border-t border-slate-100 text-sm font-semibold text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500" /> Tombol 1-klik buka WhatsApp dengan teks draf otomatis
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500" /> Pipeline status: Baru Masuk, Tanya Cicilan, Survey, Closing
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500" /> Mencegah prospek lupa atau diserobot agen kompetitor
                  </li>
                </ul>
              </div>

              {/* Pilar 4 */}
              <div className="bg-white border border-slate-200/80 rounded-3xl p-8 hover:shadow-xl transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6">
                    <Rocket size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    4. Bank Konten & Skrip Closing Lapangan
                  </h3>
                  <p className="text-slate-600 font-medium leading-relaxed mb-6">
                    Akses materi promosi gambar dan video beresolusi tinggi yang siap Anda jadikan status WhatsApp atau postingan media sosial setiap hari, ditambah bank skrip cara menjawab penolakan (*Objection Handling*).
                  </p>
                </div>
                <ul className="space-y-2.5 pt-4 border-t border-slate-100 text-sm font-semibold text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500" /> Jawaban taktis saat prospek bilang &quot;Kemahalan&quot;
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500" /> Cara menjelaskan sewa beli (rental) vs galon harian
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500" /> Selalu diperbarui dengan promo resmi Coway terbaru
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Alur Kerja Section */}
        <section id="alur-kerja" className="py-20 bg-white border-t border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-[#00A3E0] font-bold text-xs sm:text-sm uppercase tracking-widest block mb-2">
                Simpel & Tanpa Pusing
              </span>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-950 mb-4">
                3 Langkah Praktis Menjalankan Bisnis Coway Anda
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Step 1 */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-8 text-center relative">
                <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-lg mx-auto mb-6 shadow-md">
                  1
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Daftar & Atur Link Pribadi</h3>
                <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
                  Buat akun dalam 1 menit. Masukkan nama panggilan dan nomor WhatsApp Anda untuk langsung mendapatkan link toko resmi Anda.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-8 text-center relative">
                <div className="w-12 h-12 rounded-full bg-[#00A3E0] text-white flex items-center justify-center font-bold text-lg mx-auto mb-6 shadow-md shadow-sky-500/30">
                  2
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Pasang Iklan / Bagikan Link</h3>
                <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
                  Bagikan link ke media sosial, buat kartu nama dengan QR code, atau aktifkan pasokan iklan Meta Ads tertarget di kota Anda.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-8 text-center relative">
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-lg mx-auto mb-6 shadow-md shadow-emerald-500/30">
                  3
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Terima Chat & Closing Unit</h3>
                <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
                  Calon pembeli yang berminat akan langsung mengirim chat ke WhatsApp Anda. Gunakan panduan skrip closing kami untuk mengamankan pesanan.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 bg-[#F8FAFC] border-t border-slate-200/80">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-14">
              <span className="text-[#00A3E0] font-bold text-xs sm:text-sm uppercase tracking-widest block mb-2">
                Pertanyaan Populer
              </span>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-950">
                Hal yang Sering Ditanyakan Agen Coway
              </h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: "Apakah saya harus paham coding atau punya laptop untuk memakai ini?",
                  a: "Tidak perlu sama sekali! Seluruh sistem didesain mobile-first agar bisa dioperasikan 100% dari HP Anda. Cukup isi form pendaftaran, link toko Anda langsung aktif dan siap digunakan."
                },
                {
                  q: "Ke mana chat calon pembeli akan masuk?",
                  a: "100% langsung masuk ke nomor WhatsApp pribadi Anda sendiri. Tidak ada potongan, tidak ada perantara, dan prospek tersebut sepenuhnya adalah milik Anda."
                },
                {
                  q: "Apakah ada biaya bulanan wajib untuk menggunakan platform ini?",
                  a: "Pendaftaran akun agen adalah gratis. Anda dapat mengaktifkan lisensi Landing Page atau memesan paket kampanye iklan Meta Ads sesuai dengan kebutuhan pengembangan bisnis Anda."
                },
                {
                  q: "Bolehkah saya menggunakan platform ini untuk merekrut tim Health Planner baru?",
                  a: "Sangat bisa! Selain Landing Page penjualan produk, kami juga menyediakan Landing Page khusus rekrutmen agen (karir) agar calon mitra bisa langsung mendaftar di bawah bimbingan Anda."
                }
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden transition-all shadow-sm"
                >
                  <button 
                    onClick={() => toggleFaq(index)} 
                    className="w-full text-left px-6 py-5 flex items-center justify-between font-bold text-base sm:text-lg text-slate-900 hover:text-[#00A3E0] transition-colors"
                  >
                    <span>{item.q}</span>
                    <span className="text-xl text-slate-400 font-normal ml-4">
                      {openFaq === index ? "−" : "+"}
                    </span>
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-5 pt-1 text-slate-600 font-medium text-sm sm:text-base leading-relaxed border-t border-slate-100">
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Banner */}
        <section className="py-20 md:py-28 bg-white border-t border-slate-200/80 text-center px-4 sm:px-6">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#00A3E0]/20 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <span className="px-3.5 py-1.5 bg-white/10 text-sky-300 rounded-full text-xs font-bold border border-white/15 inline-block">
                Saatnya Scale Up Bisnis Coway Anda
              </span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                Siap Tembus Target Unit & Raih Reward Trip Tahun Ini?
              </h2>
              <p className="text-slate-300 text-sm sm:text-lg font-medium leading-relaxed">
                Bergabunglah dengan sesama Health Planner Coway yang telah mengubah cara mereka berjualan menjadi lebih rapi, terukur, dan konsisten closing.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link 
                  href="/register" 
                  className="w-full sm:w-auto px-9 py-4 bg-[#00A3E0] hover:bg-sky-400 text-white font-bold text-base sm:text-lg rounded-2xl transition shadow-lg shadow-sky-500/30 flex items-center justify-center gap-2"
                >
                  <span>Daftar Akun Agen Sekarang</span>
                  <ArrowRight size={18} />
                </Link>
                <Link 
                  href="/login" 
                  className="w-full sm:w-auto px-7 py-4 bg-white/10 hover:bg-white/15 text-white font-bold text-base rounded-2xl border border-white/20 transition flex items-center justify-center"
                >
                  Sudah Punya Akun? Masuk
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Clean Footer */}
      <footer className="bg-white border-t border-slate-200/80 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#00A3E0] to-blue-600 flex items-center justify-center">
              <Logo className="w-4 h-4 text-white" />
            </div>
            <span className="font-extrabold text-lg text-slate-900">
              <span className="text-[#00A3E0]">Coway</span> Logaritma
            </span>
          </div>

          <div className="text-xs sm:text-sm text-slate-500 font-medium text-center md:text-right">
            <p>© {new Date().getFullYear()} Coway Logaritma. Platform Support System Khusus Agen Coway Indonesia.</p>
            <p className="text-xs text-slate-400 mt-1">Bukan website resmi Coway Co., Ltd. Dikelola mandiri sebagai platform akselerasi penjualan agen.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
