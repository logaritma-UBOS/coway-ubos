'use client';

import Link from 'next/link';
import { ArrowRight, Globe, Zap, Users, ShieldCheck, CheckCircle2, TrendingUp, BarChart3, MessageCircle, MonitorSmartphone, Target, MessageSquare, ListTodo, FileText, Focus } from 'lucide-react';
import { motion } from 'framer-motion';
import AffiliateTracker from '@/components/AffiliateTracker';
import { Suspense } from 'react';

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

  const typewriterContainer = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.4 }
    }
  };
  
  const typewriterChar = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 12, stiffness: 200 } }
  };

  const targetWord = "Health Planner";

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-[#00A3E0]/20 selection:text-[#00A3E0]">
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
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="font-black text-2xl tracking-tight flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00A3E0] to-blue-600 flex items-center justify-center text-white">
              <Zap size={18} fill="currentColor" />
            </div>
            <span className="text-[#0F172A]">Coway</span> UBOS
          </div>
          <div className="flex gap-2 sm:gap-3 md:gap-4 items-center">
            <Link href="/login" className="px-2 sm:px-5 py-2.5 text-slate-600 font-bold hover:text-slate-900 transition items-center text-sm sm:text-base whitespace-nowrap">Log In</Link>
            <Link href="/register" className="px-4 py-2 md:px-5 md:py-2.5 bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-sm md:text-base rounded-xl transition shadow-lg shadow-slate-900/20 flex items-center gap-2 whitespace-nowrap">
              Daftar <span className="hidden sm:inline">Gratis</span> <ArrowRight size={16} className="hidden sm:block" />
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 pt-12 md:pt-20 pb-20 md:pb-32 text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-4xl mx-auto">
            <motion.h1 variants={fadeIn} className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-[1.1]">
              Mesin Marketing Pribadi untuk <br className="hidden md:block" />
              <motion.span variants={typewriterContainer} className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#00A3E0] to-indigo-600">
                {targetWord.split('').map((char, index) => (
                  <motion.span key={index} variants={typewriterChar} className="inline-block">
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </motion.span>
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed font-medium">
              Jangan habiskan waktu mencari customer dari nol.<br className="hidden md:block" />
              Bangun sistem marketing Anda sendiri untuk mendapatkan prospek, mengarahkan mereka ke WhatsApp, dan membantu Anda mengelola follow-up sampai closing.
            </motion.p>

            <motion.div variants={fadeIn} className="flex flex-col md:flex-row justify-center items-center gap-6 mb-10 text-slate-600 font-medium">
              <div className="flex items-center gap-2"><XCircleIcon className="text-red-400" /> Tanpa perlu membuat website sendiri</div>
              <div className="flex items-center gap-2"><XCircleIcon className="text-red-400" /> Tanpa perlu belajar teknis iklan dari nol</div>
              <div className="flex items-center gap-2"><XCircleIcon className="text-red-400" /> Tanpa perlu membangun sistem digital sendiri</div>
            </motion.div>
            
            <motion.div variants={fadeIn}>
              <Link href="/register" className="inline-flex px-10 py-5 bg-gradient-to-r from-[#00A3E0] to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-bold text-xl rounded-full transition-all transform hover:scale-105 shadow-xl shadow-sky-500/30 items-center justify-center gap-3">
                BUAT SISTEM MARKETING SAYA <ArrowRight size={24} />
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* Problem Section */}
        <section className="py-24 bg-white border-y border-slate-200">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "0px 0px -100px 0px" }} variants={staggerContainer} className="max-w-4xl mx-auto px-6 text-center">
            <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-black tracking-tight mb-8">Masalah Health Planner Bukan Produk</motion.h2>
            <motion.p variants={fadeIn} className="text-xl text-slate-600 mb-12">Produk Coway sudah tersedia.<br />Materi penjualan juga tersedia.</p>
            
            <motion.div variants={fadeIn} className="text-lg font-medium text-slate-700 space-y-6 mb-16">
              <p>Yang sering menjadi tantangan adalah:</p>
              <div className="space-y-4 text-2xl font-bold text-slate-900 italic">
                <p>“Customer baru saya dapat dari mana?”</p>
                <p>“Bagaimana membuat orang tertarik konsultasi?”</p>
                <p>“Bagaimana saya follow-up puluhan calon customer?”</p>
                <p>“Bagaimana saya tahu siapa yang paling siap membeli?”</p>
                <p>“Bagaimana saya tetap prospecting saat sedang sibuk closing?”</p>
              </div>
            </motion.div>
            
            <motion.div variants={fadeIn} className="inline-block bg-blue-50 text-blue-700 font-bold px-6 py-4 rounded-2xl text-xl">
              UBOS membantu Anda membangun sistem untuk menjawab masalah tersebut.
            </motion.div>
          </motion.div>
        </section>

        {/* Flow Section */}
        <section className="py-24 max-w-5xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "0px 0px -100px 0px" }} variants={staggerContainer}>
            <motion.div variants={fadeIn} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Satu Sistem. Dari Prospek Sampai Follow-up.</h2>
            </motion.div>
            
            <motion.div variants={fadeIn} className="flex flex-col md:flex-row items-center justify-center gap-4 text-center text-sm md:text-base font-bold text-slate-700">
              <FlowItem>Traffic</FlowItem> <FlowArrow />
              <FlowItem>Landing Page Pribadi</FlowItem> <FlowArrow />
              <FlowItem>Calon Customer</FlowItem> <FlowArrow />
              <FlowItem bg="bg-[#25D366] text-white border-[#25D366]">WhatsApp</FlowItem> <FlowArrow />
              <FlowItem>Follow-up</FlowItem> <FlowArrow />
              <FlowItem>Konsultasi</FlowItem> <FlowArrow />
              <FlowItem>Demo</FlowItem> <FlowArrow />
              <FlowItem bg="bg-[#00A3E0] text-white border-[#00A3E0]">Closing</FlowItem>
            </motion.div>

            <motion.div variants={fadeIn} className="mt-16 text-center">
              <p className="text-xl font-medium text-slate-600">Anda tetap menjadi Health Planner.<br /><span className="font-bold text-slate-900">UBOS membantu pekerjaan marketing di belakangnya.</span></p>
            </motion.div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-slate-900 text-white border-y border-slate-800">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "0px 0px -100px 0px" }} variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div variants={fadeIn}>
                <FeatureCard 
                  num="1" 
                  icon={<Globe size={32} />} 
                  title="Punya Landing Page Atas Nama Anda" 
                  desc="Tidak perlu membuat website dari nol. Aktifkan halaman pribadi Anda. Contoh: coway.logaritma.id/nama-anda. Isi halaman dapat menampilkan profil Anda, informasi produk, manfaat, FAQ, CTA konsultasi, dan tombol WhatsApp. Customer datang ke halaman Anda. Bukan ke halaman agent lain." 
                />
              </motion.div>
              <motion.div variants={fadeIn}>
                <FeatureCard 
                  num="2" 
                  icon={<Target size={32} />} 
                  title="Datangkan Prospek dari Meta Ads" 
                  desc="Tidak perlu belajar pixel, targeting, campaign structure, dan optimasi iklan dari nol. Anda menentukan budget. Tim UBOS membantu menjalankan campaign. Prospek diarahkan ke sistem Anda dan dapat masuk ke WhatsApp pribadi Anda. Anda fokus menangani calon customer." 
                />
              </motion.div>
              <motion.div variants={fadeIn}>
                <FeatureCard 
                  num="3" 
                  icon={<MessageSquare size={32} />} 
                  title="Jangan Biarkan Lead Hilang di WhatsApp" 
                  desc="Lead yang masuk hari ini belum tentu membeli hari ini. Siapa lead baru? Siapa yang sudah dihubungi? Siapa yang tertarik? UBOS dirancang untuk membantu Anda melihat perjalanan setiap prospek." 
                />
              </motion.div>
              <motion.div variants={fadeIn}>
                <FeatureCard 
                  num="4" 
                  icon={<ListTodo size={32} />} 
                  title="Follow-up Lebih Terarah" 
                  desc="Jangan lagi mengandalkan ingatan. Gunakan status: New Lead, Contacted, Interested, Follow-up, Demo, Negotiation, Closing, Lost. Dengan begitu Anda tahu siapa yang harus dihubungi hari ini." 
                />
              </motion.div>
              <motion.div variants={fadeIn}>
                <FeatureCard 
                  num="5" 
                  icon={<FileText size={32} />} 
                  title="Siapkan Materi Sebelum Customer Bertanya" 
                  desc="“Bedanya produk A dan B apa?” “Berapa cicilannya?” UBOS dapat menjadi pusat materi penjualan yang membantu Anda menjawab pertanyaan tersebut lebih cepat." 
                />
              </motion.div>
              <motion.div variants={fadeIn}>
                <FeatureCard 
                  num="6" 
                  icon={<Focus size={32} />} 
                  title="Anda Fokus pada Hal yang Menghasilkan Komisi" 
                  desc="Cari prospek. Konsultasi. Presentasi. Demo. Follow-up. Closing. Biarkan sistem menangani bagian digital yang berulang." 
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Disclaimer Section */}
        <section className="py-24 max-w-4xl mx-auto px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "0px 0px -100px 0px" }} variants={staggerContainer}>
            <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-black tracking-tight mb-8">Bukan Pengganti Health Planner</motion.h2>
            <motion.div variants={fadeIn} className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl border border-slate-200">
              <p className="text-xl font-medium text-slate-600 mb-6">
                UBOS tidak menggantikan Anda.<br />
                UBOS tidak melakukan closing untuk Anda.<br />
                UBOS membantu Anda mendapatkan dan mengelola peluang penjualan.
              </p>
              <div className="inline-block text-left text-lg font-bold text-slate-800 space-y-3">
                <p className="flex items-center gap-3"><CheckCircle2 className="text-green-500" /> Anda tetap memegang hubungan dengan customer.</p>
                <p className="flex items-center gap-3"><CheckCircle2 className="text-green-500" /> Anda tetap melakukan konsultasi.</p>
                <p className="flex items-center gap-3"><CheckCircle2 className="text-green-500" /> Anda tetap melakukan presentasi.</p>
                <p className="flex items-center gap-3"><CheckCircle2 className="text-green-500" /> Anda tetap melakukan closing.</p>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Mini CTA */}
        <section className="py-12 max-w-4xl mx-auto px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "0px 0px -100px 0px" }} variants={fadeIn} className="bg-sky-50 border border-sky-100 p-10 rounded-[2rem]">
            <h3 className="text-2xl font-black mb-4">Mulai dari Gratis</h3>
            <p className="text-slate-600 mb-8">Akses dashboard UBOS. Bangun sistem marketing Anda. Aktifkan landing page ketika sudah siap. Gunakan layanan iklan ketika Anda ingin mulai mencari prospek.</p>
            <Link href="/register" className="inline-flex px-8 py-4 bg-[#00A3E0] hover:bg-sky-500 text-white font-bold rounded-xl transition">
              DAFTAR GRATIS
            </Link>
          </motion.div>
        </section>

        {/* Pricing Section */}
        <section className="py-24 bg-slate-100 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">Pilih Cara Kerja Anda</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
              {/* BASIC */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "0px 0px -100px 0px" }} variants={fadeIn} className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm text-center">
                <h3 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-wide">Basic</h3>
                <div className="text-4xl font-black text-slate-900 mb-4">Rp0</div>
                <p className="text-sm text-slate-500 mb-8 h-10">Untuk Health Planner yang ingin mulai membangun sistem digital.</p>
                <ul className="space-y-4 mb-10 text-left text-sm font-medium text-slate-600">
                  <li className="flex items-start gap-3"><CheckCircle2 className="text-green-500 shrink-0" size={20} /> <span>Dashboard UBOS</span></li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="text-green-500 shrink-0" size={20} /> <span>Akses tools marketing</span></li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="text-green-500 shrink-0" size={20} /> <span>Akses layanan Meta Ads</span></li>
                </ul>
                <Link href="/register" className="w-full block py-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl transition">DAFTAR GRATIS</Link>
              </motion.div>

              {/* PERSONAL LANDING PAGE */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "0px 0px -100px 0px" }} variants={fadeIn} transition={{ delay: 0.2 }} className="bg-[#0F172A] text-white rounded-[2rem] p-8 border border-slate-700 shadow-2xl md:-mt-8 md:mb-8 z-10 text-center relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#00A3E0] text-white font-bold px-4 py-1 rounded-full text-xs uppercase tracking-wider whitespace-nowrap">Sekali Bayar</div>
                <h3 className="text-xl font-black mb-2 uppercase tracking-wide pt-2">Personal Landing Page</h3>
                <div className="text-4xl font-black mb-4">Rp99.000</div>
                <p className="text-sm text-slate-400 mb-8 h-10">Lisensi selamanya untuk website atas nama Anda.</p>
                <ul className="space-y-4 mb-10 text-left text-sm font-medium text-slate-300">
                  <li className="flex items-start gap-3"><CheckCircle2 className="text-[#00A3E0] shrink-0" size={20} /> <span>Landing page pribadi</span></li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="text-[#00A3E0] shrink-0" size={20} /> <span>URL custom</span></li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="text-[#00A3E0] shrink-0" size={20} /> <span>Domain dan hosting</span></li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="text-[#00A3E0] shrink-0" size={20} /> <span>Form lead</span></li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="text-[#00A3E0] shrink-0" size={20} /> <span>Integrasi WhatsApp</span></li>
                </ul>
                <Link href="/register" className="w-full block py-4 bg-[#00A3E0] hover:bg-sky-500 text-white font-bold rounded-xl transition">AKTIFKAN LANDING PAGE</Link>
              </motion.div>

              {/* LEAD GENERATION */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "0px 0px -100px 0px" }} variants={fadeIn} transition={{ delay: 0.4 }} className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm text-center">
                <h3 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-wide">Lead Generation</h3>
                <div className="text-3xl font-black text-slate-900 mb-4">Mulai Rp25.000<span className="text-base text-slate-500 font-medium">/hari</span></div>
                <p className="text-sm text-slate-500 mb-8 h-10">Untuk Health Planner yang ingin mulai mendatangkan traffic.</p>
                <ul className="space-y-4 mb-10 text-left text-sm font-medium text-slate-600">
                  <li className="flex items-start gap-3"><CheckCircle2 className="text-indigo-500 shrink-0" size={20} /> <span>Meta Ads</span></li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="text-indigo-500 shrink-0" size={20} /> <span>Targeting</span></li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="text-indigo-500 shrink-0" size={20} /> <span>Campaign management</span></li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="text-indigo-500 shrink-0" size={20} /> <span>Lead masuk ke WhatsApp</span></li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="text-indigo-500 shrink-0" size={20} /> <span>Laporan performa</span></li>
                </ul>
                <Link href="/register" className="w-full block py-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-xl transition">MULAI CARI PROSPEK</Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 max-w-4xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            className="bg-[#00A3E0] rounded-[3rem] p-10 md:p-16 text-center text-white shadow-2xl relative overflow-hidden"
          >
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-black mb-6">Mulai Bangun Mesin Marketing Anda</h2>
              <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto font-medium">
                Jangan hanya mengandalkan broadcast, status WhatsApp, atau mencari customer satu per satu.<br /><br />
                Bangun aset digital yang bisa terus Anda gunakan sebagai Health Planner.<br /><br />
                Buat halaman Anda. Datangkan traffic. Terima prospek. Follow-up. Closing.
              </p>
              <Link href="/register" className="inline-flex px-10 py-5 bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-xl rounded-full transition-transform transform hover:scale-105 shadow-xl shadow-slate-900/30">
                BUAT AKUN GRATIS
              </Link>
            </div>
          </motion.div>
        </section>
      </main>
      
      <footer className="bg-slate-900 border-t border-slate-800 py-12 px-6 text-slate-400">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm font-medium leading-relaxed">
            Coway UBOS adalah platform independen dari Logaritma Digital untuk membantu aktivitas marketing Health Planner.<br />
            Bukan aplikasi resmi Coway Indonesia.
          </p>
        </div>
      </footer>
    </div>
  );
}

function XCircleIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </svg>
  );
}

function FlowItem({ children, bg = "bg-white border-slate-200" }: { children: React.ReactNode, bg?: string }) {
  return (
    <div className={`px-4 py-3 rounded-xl border shadow-sm ${bg}`}>
      {children}
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="hidden md:block">
      <ArrowRight className="text-slate-300" size={20} />
    </div>
  );
}

function FeatureCard({ num, title, desc, icon }: { num: string, title: string, desc: string, icon: React.ReactNode }) {
  return (
    <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-3xl hover:bg-slate-800 transition">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-2xl bg-[#00A3E0]/10 text-[#00A3E0] flex items-center justify-center shrink-0">
          {icon}
        </div>
        <div className="text-5xl font-black text-slate-700/50 leading-none">{num}</div>
      </div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-slate-400 leading-relaxed text-sm">{desc}</p>
    </div>
  );
}
