'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface Agent {
  id: string;
  fullName: string;
  whatsappNumber: string;
  profileImageUrl: string | null;
  bio: string;
}

interface LandingPageUIProps {
  agent: Agent;
}

export default function LandingPageUI({ agent }: LandingPageUIProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [monthlyGallons, setMonthlyGallons] = useState(15);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const pricePerGallon = 20000;
  const cowayMonthlyNeoPlus = 270000;
  const monthlyGallonCost = monthlyGallons * pricePerGallon;
  const diff = monthlyGallonCost - cowayMonthlyNeoPlus;

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleWaSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          agentId: agent.id,
          targetProduct: 'Konsultasi Promo',
        }),
      });
      
      const data = await response.json();
      
      if (data.redirectUrl) {
        window.open(data.redirectUrl, '_blank');
      } else {
        // Fallback if no redirect URL is returned
        const targetPhone = agent.whatsappNumber || "62817777616";
        const cleanPhone = targetPhone.replace(/\D/g, '').replace(/^0/, '62');
        const fallbackMsg = encodeURIComponent(`Halo, saya ${name}. Saya ingin konsultasi mengenai promo pemurni air Coway.`);
        window.open(`https://wa.me/${cleanPhone}?text=${fallbackMsg}`, '_blank');
      }
    } catch (error) {
      console.error('Submit lead error:', error);
      alert('Maaf, terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
      closeModal();
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <div className="bg-slate-50 text-slate-800 antialiased font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-slate-100 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#" className="flex items-center gap-2">
            <img src="https://member.smartmillionaire.co.id/wp-content/uploads/2026/07/coway-new-logo-2020.png" alt="Coway Logo" className="h-8 md:h-10" />
          </a>
          <nav className="hidden md:flex gap-6">
            <a href="#perbandingan" className="font-semibold text-slate-700 hover:text-primary transition-colors">Perbandingan Harga</a>
            <a href="#kesehatan" className="font-semibold text-slate-700 hover:text-primary transition-colors">Kesehatan</a>
            <a href="#ibu-bayi" className="font-semibold text-slate-700 hover:text-primary transition-colors">Ibu & Bayi</a>
            <a href="#bebas-bpa" className="font-semibold text-slate-700 hover:text-primary transition-colors">Bebas BPA</a>
            <a href="#katalog" className="font-semibold text-slate-700 hover:text-primary transition-colors">Katalog</a>
          </nav>
          
          {/* Agent Profile Header */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3">
              <div className="text-right">
                <p className="text-xs text-slate-500 font-medium">Health Planner</p>
                <p className="text-sm font-bold text-slate-900">{agent.fullName || 'Coway Agent'}</p>
              </div>
              {agent.profileImageUrl ? (
                <img src={agent.profileImageUrl} alt={agent.fullName || 'Agent'} className="w-10 h-10 rounded-full object-cover border-2 border-primary/20" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-primary-light text-primary flex items-center justify-center font-bold border-2 border-primary/20">
                  {getInitials(agent.fullName || 'Coway Agent')}
                </div>
              )}
            </div>
            <button onClick={openModal} className="inline-flex items-center gap-2 bg-[#0084ff] hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-lg shadow-lg shadow-primary/30 transition-all transform hover:-translate-y-0.5 text-sm">
              <i className="fa-brands fa-whatsapp"></i> <span className="hidden md:inline">Hubungi</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-36 pb-20 px-6 bg-gradient-to-br from-primary-light to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10 text-center md:text-left">
          <div>
            <span className="inline-flex items-center gap-2 bg-[#eef7ff] text-[#0084ff] font-bold text-[11px] py-1.5 px-3 rounded-full mb-6 uppercase tracking-wider mx-auto md:mx-0">
              <span className="animate-pulse-blue w-2 h-2 rounded-full bg-[#0084ff] block"></span> Pilihan Cerdas Air Minum
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-4 tracking-tight">
              Beralih ke Air Murni Steril, <span className="text-[#0084ff]">Bebas Repot</span> Angkat Galon
            </h1>
            <p className="text-[15px] md:text-lg text-slate-500 mb-8 leading-relaxed px-2 md:px-0">
              Solusi pemurni air RO teknologi tinggi nomor 1 dari Korea Selatan. Menyediakan air panas, dingin, dan normal di rumah Anda dengan biaya bulanan yang sangat hemat.
            </p>
            <div className="flex flex-row justify-center md:justify-start gap-3 w-full px-2 md:px-0">
              <button onClick={openModal} className="flex-1 md:flex-none inline-flex justify-center items-center gap-1.5 bg-[#0084ff] hover:bg-primary-dark text-white font-bold py-3 px-4 rounded-xl shadow-[0_4px_12px_rgba(0,132,255,0.3)] transition-all text-sm">
                <i className="fa-brands fa-whatsapp text-sm"></i> Konsultasi Sekarang
              </button>
              <a href="#perbandingan" className="flex-1 md:flex-none inline-flex justify-center items-center gap-1.5 bg-white hover:bg-slate-50 text-slate-700 font-bold py-3 px-4 rounded-xl border border-slate-200 shadow-sm transition-all text-sm">
                Lihat Hitungan Hemat
              </a>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl relative aspect-video bg-slate-900">
            <iframe src="https://www.youtube.com/embed/XyfvZDW125k?iv_load_policy=3&modestbranding=1&playsinline=1&showinfo=0&rel=0&enablejsapi=1" className="w-full h-full border-none" allowFullScreen allow="autoplay"></iframe>
          </div>
        </div>
      </section>

      {/* Kalkulator & Perbandingan */}
      <section id="perbandingan" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Solusi Cerdas Air Minum : Tanpa Repot Beli & Angkat Galon</h2>
            <p className="text-lg text-slate-600">Dengan harga yang setara membeli air galon bulanan, Anda bisa menikmati aliran air murni langsung dari Pemurni Air Coway Neo Plus.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Kalkulator */}
            <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100">
              <h3 className="text-2xl font-extrabold text-slate-900 mb-8 flex items-center gap-3">
                <i className="fa-solid fa-calculator text-slate-900"></i> Kalkulator Hemat Galon
              </h3>
              
              <div className="mb-10 mt-4">
                <label className="block text-sm font-bold text-slate-700 mb-6">Konsumsi Galon Keluarga Anda (Per Bulan):</label>
                <input 
                  type="range" 
                  min="15" 
                  max="45" 
                  value={monthlyGallons} 
                  onChange={(e) => setMonthlyGallons(parseInt(e.target.value))}
                  className="w-full cursor-pointer accent-[#0084ff]" 
                />
                <div className="flex justify-between text-sm font-bold text-[#0084ff] mt-4">
                  <span>15 Galon</span>
                  <span>{monthlyGallons} Galon</span>
                  <span>45 Galon</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6">
                <div className="bg-[#fff1f2] rounded-xl p-4 sm:p-6 border border-[#ffe4e6] text-center flex flex-col justify-center">
                  <span className="block text-xs font-bold text-[#e11d48] uppercase tracking-wide mb-2">Beli Air Galon</span>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#e11d48] mb-2">
                    Rp {monthlyGallonCost.toLocaleString('id-ID')}
                  </div>
                  <span className="text-[11px] md:text-xs text-slate-400">Per Bulan (Estimasi<br className="md:hidden" /> Rp20.000/galon)</span>
                </div>
                <div className="bg-[#f0fdf4] rounded-xl p-4 sm:p-6 border border-[#dcfce7] text-center flex flex-col justify-center">
                  <span className="block text-xs font-bold text-[#16a34a] uppercase tracking-wide mb-2">Coway Neo Plus</span>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#16a34a] mb-2">
                    Rp {cowayMonthlyNeoPlus.toLocaleString('id-ID')}
                  </div>
                  <span className="text-[11px] md:text-xs text-slate-400 block mb-1">Per Bulan (Sudah Ganti Filter & Servis)</span>
                  <span className="text-[11px] md:text-xs text-[#16a34a] font-bold block">Paket 7 Tahun</span>
                </div>
              </div>

              <div className={diff > 0 
                ? "bg-[#f0fdf4] border-2 border-dashed border-[#86efac] rounded-xl p-5 text-center mt-6" 
                : "bg-blue-50 border-2 border-dashed border-blue-300 rounded-xl p-5 text-center mt-6"}>
                <span className={diff > 0 ? "font-bold text-[#16a34a] text-xl md:text-2xl" : "font-bold text-blue-600 text-xl md:text-2xl"}>
                  {diff > 0 ? `Hemat Rp ${diff.toLocaleString('id-ID')} / Bulan` : "Air Panas & Dingin Sepuasnya Bebas Repot!"}
                </span>
              </div>
            </div>

            {/* Text Copy */}
            <div className="p-4">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Bayar Nominal yang Sama, Dapatkan Kualitas & Kuantitas Berlipat</h3>
              <p className="text-slate-600 mb-6">Membeli air galon eceran sering kali membuat kita membatasi konsumsi air karena takut cepat habis dan boros. Ditambah lagi dengan risiko air galon palsu serta debu gudang pada kemasannya.</p>
              
              <ul className="space-y-4">
                <li className="flex gap-4 items-start">
                  <i className="fa-solid fa-circle-check text-accentGreen mt-1 text-lg"></i>
                  <div>
                    <span className="font-bold text-slate-900 block">Pure Water</span>
                    <span className="text-slate-600 text-sm">Aliran air murni untuk minum, memasak nasi, sup, dll.</span>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <i className="fa-solid fa-circle-check text-accentGreen mt-1 text-lg"></i>
                  <div>
                    <span className="font-bold text-slate-900 block">Suhu Instan</span>
                    <span className="text-slate-600 text-sm">Air panas & dingin tersedia 24 jam tanpa kulkas atau dispenser berisik.</span>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <i className="fa-solid fa-circle-check text-accentGreen mt-1 text-lg"></i>
                  <div>
                    <span className="font-bold text-slate-900 block">Free Servis Cody</span>
                    <span className="text-slate-600 text-sm">Kunjungan servis steril & penggantian filter rutin setiap 2 bulan tanpa tambahan biaya.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Emosional 1: Kesehatan Ortu */}
      <section id="kesehatan" className="py-20 px-6 bg-darkCard text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Tega lihat Ortu Angkat Galon 19kg?</h2>
            <p className="text-lg text-slate-400">Jangan sampai orang tua Anda mengalami cedera pinggang atau terjatuh karena angkat galon</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h3 className="text-2xl font-bold mb-4">Melindungi Tulang Belakang & Sendi Orang Tua Kita</h3>
              <p className="text-slate-300 mb-4">Setiap galon air memiliki berat hampir 20 Kilogram. Bagi orang tua lanjut usia yang fisiknya mulai menurun, mengangkat beban seberat ini secara terus-menerus adalah ancaman serius bagi keselamatan sendi dan tulang belakang mereka.</p>
              <p className="text-slate-300 mb-8">Cedera saraf kejepit atau terpeleset di dapur saat mengganti galon air bisa berakibat fatal. Menghadirkan dispenser pemurni air Coway di dapur mereka adalah bentuk nyata bakti Anda untuk melindungi kesehatan fisik orang tua tercinta.</p>
              <button onClick={openModal} className="inline-flex items-center gap-2 bg-secondary hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-secondary/30 transition-all transform hover:-translate-y-0.5">
                <i className="fa-brands fa-whatsapp"></i> Bebaskan Ortu dari Galon Sekarang
              </button>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl order-1 md:order-2">
              <img src="https://member.smartmillionaire.co.id/wp-content/plugins/coway-landing/assets/parent_struggling_gallon.jpg" alt="Ortu angkat galon" className="w-full h-auto object-cover" />
              <div className="absolute inset-0 bg-red-500/20 mix-blend-multiply rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Emosional 2: Ibu & Bayi */}
      <section id="ibu-bayi" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Membuat Susu Formula Bayi di Jam 2 Pagi? Hanya Butuh 3 Detik!</h2>
            <p className="text-lg text-slate-600">Lupakan kerepotan merebus air panas, menunggu suhunya turun, atau mencampur air panas & dingin secara menerka-nerka di tengah malam.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img src="https://member.smartmillionaire.co.id/wp-content/plugins/coway-landing/assets/mother_baby_formula.jpg" alt="Ibu bikin susu bayi" className="w-full h-auto object-cover" />
            </div>
            <div>
              <span className="inline-flex items-center gap-2 bg-rose-100 text-rose-600 font-bold text-xs py-1.5 px-3 rounded-full mb-4">
                <i className="fa-solid fa-baby"></i> 40°C - Suhu Susu Ideal
              </span>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Suhu Air Hangat yang Konsisten & Nyaman untuk Si Kecil</h3>
              <p className="text-slate-600 mb-4">Bayi Anda sering menangis kelaparan di tengah malam? Bersama dispenser tipe Coway Ombak, Anda memiliki kontrol penuh atas 4 tingkat suhu air panas instan yang didesain khusus (40°C untuk susu formula, 70°C untuk teh herbal, 80°C untuk kopi, dan 90°C untuk mie instan/keperluan lainnya).</p>
              <p className="text-slate-600 mb-8">Cukup putar dial kontrol, air hangat steril bersuhu tepat 40°C siap mengalir instan ke botol susu anak Anda tanpa merusak kandungan gizi susu formula.</p>
              <button onClick={openModal} className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-primary/30 transition-all transform hover:-translate-y-0.5">
                <i className="fa-brands fa-whatsapp"></i> Info Cicilan Coway Ombak
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Emosional 3: Bahaya Dispenser */}
      <section id="bahaya-dispenser" className="py-20 px-6 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-red-500 mb-4">Yakin Air dari Dispenser Lama Anda Masih Layak Minum?</h2>
            <p className="text-lg text-slate-400">Dispenser galon yang jarang dibersihkan adalah sarang sempurna bagi perkembangbiakan bakteri, jamur, dan lumut yang mengancam pencernaan keluarga.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h3 className="text-2xl font-bold mb-4">Bahaya Tak Kasatmata di Dalam Tangki Air</h3>
              <p className="text-slate-300 mb-4">Faktanya, rongga bagian dalam dispenser tradisional yang tertutup rapat dan lembab sangat rentan ditumbuhi <strong className="text-white">lumut hijau dan bakteri e-Coli</strong>. Area leher galon dan selang air yang jarang dibersihkan memicu kontaminasi setiap kali Anda menekan tombol air.</p>
              <p className="text-slate-300 mb-4">Gejala diare berulang, sakit perut tanpa sebab, hingga penurunan imunitas pada anak bisa jadi berawal dari kotoran di dalam dispenser kesayangan Anda.</p>
              <p className="text-slate-300">Beralih ke pemurni air pintar Coway yang dilengkapi fitur <strong className="text-white">UV Sterilization otomatis</strong> dan layanan pembersihan sanitasi rutin setiap 2 bulan oleh tim profesional (Heart Service / Cody). Tangki selalu steril 100%.</p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-red-900/50 order-1 md:order-2">
              <img src="https://member.smartmillionaire.co.id/wp-content/uploads/2026/07/coway-dirty-dispenser-v2.jpg" alt="Dispenser berlumut" className="w-full h-auto object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Emosional 4: Bebas BPA */}
      <section id="bebas-bpa" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Selamatkan Keluarga dari Bahaya Mikroplastik & BPA Galon Isi Ulang</h2>
            <p className="text-lg text-slate-600">Gaya hidup modern menuntut standar kesehatan yang lebih tinggi, bukan dari air kemasan plastik yang terpapar panas selama distribusi.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img src="https://member.smartmillionaire.co.id/wp-content/uploads/2026/07/coway-pure-water.jpg" alt="Air Murni" className="w-full h-auto object-cover" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Kemurnian Total Tanpa Resiko Plastik</h3>
              <p className="text-slate-600 mb-4">Penelitian terbaru mengungkapkan tingginya partikel mikroplastik dan senyawa <strong className="text-slate-900">BPA (Bisphenol-A)</strong> yang luruh ke dalam air dari galon plastik yang digunakan berulang kali atau sering dibiarkan terpapar sinar matahari di jalanan.</p>
              <p className="text-slate-600 mb-8">BPA dalam jangka panjang terbukti memicu gangguan hormon dan resiko penyakit kronis lainnya. Air murni Coway difilter langsung dari sumber air di rumah Anda, disaring melalui teknologi membran RO berukuran 0.0001 mikron yang mampu memblokir mikroplastik, logam berat, dan virus tanpa persentuhan sedikit pun dengan plastik galon daur ulang.</p>
              <button onClick={openModal} className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-primary/30 transition-all transform hover:-translate-y-0.5">
                <i className="fa-brands fa-whatsapp"></i> Ganti Air Minum Anda Sekarang
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Katalog Produk */}
      <section id="katalog" className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">Produk Kami</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Pilih Unit Coway Terbaik Untuk Kebutuhan Anda</h2>
            <p className="text-lg text-slate-600">Cicilan bulanan kepemilikan sudah termasuk kunjungan servis pembersihan rutin dan penggantian filter gratis.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Neo Plus */}
            <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden flex flex-col relative transition-transform hover:-translate-y-1 hover:shadow-xl">
              <div className="absolute top-4 right-4 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow-md">Terlaris</div>
              <div className="w-full flex justify-center items-center">
                <img src="https://member.smartmillionaire.co.id/wp-content/uploads/2026/07/neo-plus.png" alt="Coway Neo Plus" className="w-full h-auto object-cover" />
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-slate-900 mb-1">Coway Neo Plus</h3>
                <p className="text-sm text-slate-500 mb-6">3 Suhu Utama untuk Keluarga Bahagia</p>
                
                <div className="bg-primary-light rounded-xl p-4 mb-6">
                  <span className="text-xs font-bold text-primary block mb-1">Cicilan Bulanan</span>
                  <div className="text-3xl font-extrabold text-primary-dark">Rp 270.000<span className="text-base font-medium text-slate-500">/bulan</span></div>
                  <span className="text-xs text-slate-500 block mt-1">(Paket 7 Tahun)</span>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  <li className="flex gap-3 text-sm text-slate-700 items-center"><i className="fa-solid fa-check text-accentGreen"></i> Panas, Dingin & Biasa</li>
                  <li className="flex gap-3 text-sm text-slate-700 items-center"><i className="fa-solid fa-check text-accentGreen"></i> Kapasitas Tangki: 5.8 Liter</li>
                  <li className="flex gap-3 text-sm text-slate-700 items-center"><i className="fa-solid fa-check text-accentGreen"></i> Eco Mode Sensor (Hemat Listrik)</li>
                  <li className="flex gap-3 text-sm text-slate-700 items-center"><i className="fa-solid fa-check text-accentGreen"></i> Tombol Pengunci Air Panas</li>
                </ul>
                
                <button onClick={openModal} className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-4 rounded-xl transition-colors">
                  Tanyakan Promo Neo Plus
                </button>
              </div>
            </div>

            {/* Ombak */}
            <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden flex flex-col relative transition-transform hover:-translate-y-1 hover:shadow-xl">
              <div className="absolute top-4 right-4 bg-slate-800 text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow-md">Multi Temp</div>
              <div className="w-full flex justify-center items-center">
                <img src="https://member.smartmillionaire.co.id/wp-content/uploads/2026/07/ombak.png" alt="Coway Ombak" className="w-full h-auto object-cover" />
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-slate-900 mb-1">Coway Ombak</h3>
                <p className="text-sm text-slate-500 mb-6">Khusus Suhu Variatif untuk Ibu & Bayi</p>
                
                <div className="bg-primary-light rounded-xl p-4 mb-6">
                  <span className="text-xs font-bold text-primary block mb-1">Cicilan Bulanan</span>
                  <div className="text-3xl font-extrabold text-primary-dark">Rp 350.000<span className="text-base font-medium text-slate-500">/bulan</span></div>
                  <span className="text-xs text-slate-500 block mt-1">(Paket 7 Tahun)</span>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  <li className="flex gap-3 text-sm text-slate-700 items-center"><i className="fa-solid fa-check text-accentGreen"></i> Panas (Multi-Temp), Dingin & Biasa</li>
                  <li className="flex gap-3 text-sm text-slate-700 items-center"><i className="fa-solid fa-check text-accentGreen"></i> Kapasitas Tangki: 13.5 Liter</li>
                  <li className="flex gap-3 text-sm text-slate-700 items-center"><i className="fa-solid fa-check text-accentGreen"></i> UV Sterilization (Pembasmi Kuman)</li>
                  <li className="flex gap-3 text-sm text-slate-700 items-center"><i className="fa-solid fa-check text-accentGreen"></i> Tombol Sekali Sentuh</li>
                </ul>
                
                <button onClick={openModal} className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-4 rounded-xl transition-colors">
                  Tanyakan Promo Ombak
                </button>
              </div>
            </div>

            {/* Core */}
            <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden flex flex-col relative transition-transform hover:-translate-y-1 hover:shadow-xl">
              <div className="absolute top-4 right-4 bg-slate-800 text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow-md">Floor Standing</div>
              <div className="w-full flex justify-center items-center">
                <img src="https://member.smartmillionaire.co.id/wp-content/uploads/2026/07/core.png" alt="Coway Core" className="w-full h-auto object-cover" />
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-slate-900 mb-1">Coway Core</h3>
                <p className="text-sm text-slate-500 mb-6">Kapasitas Besar untuk Keluarga / Kantor</p>
                
                <div className="bg-primary-light rounded-xl p-4 mb-6">
                  <span className="text-xs font-bold text-primary block mb-1">Cicilan Bulanan</span>
                  <div className="text-3xl font-extrabold text-primary-dark">Rp 370.000<span className="text-base font-medium text-slate-500">/bulan</span></div>
                  <span className="text-xs text-slate-500 block mt-1">(Paket 7 Tahun)</span>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  <li className="flex gap-3 text-sm text-slate-700 items-center"><i className="fa-solid fa-check text-accentGreen"></i> Panas, Dingin & Biasa</li>
                  <li className="flex gap-3 text-sm text-slate-700 items-center"><i className="fa-solid fa-check text-accentGreen"></i> Kapasitas Tangki: 21.1 Liter</li>
                  <li className="flex gap-3 text-sm text-slate-700 items-center"><i className="fa-solid fa-check text-accentGreen"></i> Floor Standing Design</li>
                  <li className="flex gap-3 text-sm text-slate-700 items-center"><i className="fa-solid fa-check text-accentGreen"></i> Sistem Filtrasi RO</li>
                </ul>
                
                <button onClick={openModal} className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-4 rounded-xl transition-colors">
                  Tanyakan Promo Core
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Pertanyaan Yang Sering Diajukan</h2>
            <p className="text-lg text-slate-600">Punya pertanyaan seputar instalasi, pembayaran, atau servis? Temukan jawabannya di sini.</p>
          </div>
          
          <div className="space-y-4">
            <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
              <button 
                className={`w-full px-6 py-4 flex justify-between items-center transition-colors text-left ${openFaqIndex === 0 ? 'bg-slate-100' : 'bg-slate-50 hover:bg-slate-100'}`} 
                onClick={() => toggleFaq(0)}
              >
                <span className="font-bold text-slate-800">Apakah harga cicilan bulanan sudah termasuk biaya instalasi dan filter?</span>
                <i className={`fa-solid fa-chevron-down text-slate-400 transition-transform ${openFaqIndex === 0 ? 'rotate-180' : ''}`}></i>
              </button>
              {openFaqIndex === 0 && (
                <div className="px-6 py-4 text-slate-600 border-t border-slate-100">
                  Ya. Biaya cicilan bulanan yang Anda pilih sudah mencakup seluruh paket pemeliharaan dari Cody (HEART Service) gratis setiap 2 bulan, penggantian filter berkala secara gratis, serta gratis biaya pemasangan unit di rumah Anda.
                </div>
              )}
            </div>
            
            <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
              <button 
                className={`w-full px-6 py-4 flex justify-between items-center transition-colors text-left ${openFaqIndex === 1 ? 'bg-slate-100' : 'bg-slate-50 hover:bg-slate-100'}`} 
                onClick={() => toggleFaq(1)}
              >
                <span className="font-bold text-slate-800">Bagaimana kelanjutan unit setelah masa cicilan paket berakhir?</span>
                <i className={`fa-solid fa-chevron-down text-slate-400 transition-transform ${openFaqIndex === 1 ? 'rotate-180' : ''}`}></i>
              </button>
              {openFaqIndex === 1 && (
                <div className="px-6 py-4 text-slate-600 border-t border-slate-100">
                  Setelah masa cicilan paket selesai (misalnya 7 tahun), unit dispenser pemurni air Coway sepenuhnya menjadi hak milik Anda tanpa perlu melakukan pembayaran cicilan lagi.
                </div>
              )}
            </div>

            <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
              <button 
                className={`w-full px-6 py-4 flex justify-between items-center transition-colors text-left ${openFaqIndex === 2 ? 'bg-slate-100' : 'bg-slate-50 hover:bg-slate-100'}`} 
                onClick={() => toggleFaq(2)}
              >
                <span className="font-bold text-slate-800">Apakah air dari pemurni air Coway langsung aman untuk langsung diminum?</span>
                <i className={`fa-solid fa-chevron-down text-slate-400 transition-transform ${openFaqIndex === 2 ? 'rotate-180' : ''}`}></i>
              </button>
              {openFaqIndex === 2 && (
                <div className="px-6 py-4 text-slate-600 border-t border-slate-100">
                  Sangat aman. Sistem filtrasi Reverse Osmosis (RO) Coway menyaring partikel berbahaya hingga berukuran 0.0001 mikron, menghilangkan virus, bakteri, klorin, karat, logam berat, dan endapan kapur secara total sehingga air langsung higienis siap konsumsi.
                </div>
              )}
            </div>
          </div>
          
          <div className="text-center mt-12">
            <button onClick={openModal} className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-primary/30 transition-all transform hover:-translate-y-0.5">
              <i className="fa-brands fa-whatsapp"></i> Konsultasi Produk Coway Terpercaya
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-12">
          {/* Agent Footer Profile */}
          <div className="col-span-1 md:col-span-1 bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 flex flex-col items-center text-center">
            {agent.profileImageUrl ? (
              <img src={agent.profileImageUrl} alt={agent.fullName || 'Agent'} className="w-20 h-20 rounded-full object-cover border-4 border-primary/20 mb-4" />
            ) : (
              <div className="w-20 h-20 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-2xl border-4 border-primary/20 mb-4">
                {getInitials(agent.fullName || 'Coway Agent')}
              </div>
            )}
            <h4 className="text-white font-bold text-lg">{agent.fullName || 'Official Agent'}</h4>
            <p className="text-sm text-slate-400 mb-4">Health Planner Coway</p>
            <button onClick={openModal} className="w-full bg-green-500 hover:bg-green-600 text-white text-sm font-bold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
              <i className="fa-brands fa-whatsapp"></i> Chat Saya
            </button>
          </div>

          <div className="col-span-1 md:col-span-1">
            <h4 className="text-white font-bold text-lg mb-4">Tentang Coway</h4>
            <p className="text-sm leading-relaxed">Coway adalah produsen pemurni air dan pemurni udara terkemuka nomor 1 dari Korea Selatan. Telah dipercaya oleh jutaan keluarga di Indonesia dan seluruh dunia untuk menyediakan solusi kesehatan mandiri di rumah.</p>
          </div>
          <div className="col-span-1 md:col-span-1">
            <h4 className="text-white font-bold text-lg mb-4">Navigasi</h4>
            <ul className="space-y-2 text-sm flex flex-col">
              <li><a href="#perbandingan" className="hover:text-primary transition-colors">Perbandingan Harga</a></li>
              <li><a href="#kesehatan" className="hover:text-primary transition-colors">Kesehatan Sendi Ortu</a></li>
              <li><a href="#ibu-bayi" className="hover:text-primary transition-colors">Solusi Susu Bayi</a></li>
              <li><a href="#bebas-bpa" className="hover:text-primary transition-colors">Bebas BPA</a></li>
            </ul>
          </div>
          <div className="col-span-1 md:col-span-1">
            <h4 className="text-white font-bold text-lg mb-4">Hubungi Agent</h4>
            <p className="text-sm leading-relaxed">Hubungi HP Health Planner/Agent resmi kami untuk konsultasi unit yang cocok, survei kelayakan air rumah Anda gratis, serta promo menarik resmi dari Coway hari ini.</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto text-center border-t border-slate-800 pt-8 text-xs">
          <p className="mb-2 opacity-70">Website ini bukan website resmi dari Coway. Website ini independent dari Health Planner Resmi Coway</p>
          <p>&copy; {new Date().getFullYear()} Coway Agent Indonesia. All Rights Reserved. Unit dipasang & diservis langsung oleh Coway Indonesia.</p>
        </div>
      </footer>

      {/* Floating WA Widget */}
      <button 
        onClick={openModal} 
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 w-[60px] h-[60px] bg-[#25d366] hover:bg-[#1ebd5a] text-white rounded-full flex items-center justify-center text-[32px] shadow-[0_4px_12px_rgba(0,0,0,0.15)] z-40 transition-transform transform hover:scale-105"
      >
        <i className="fa-brands fa-whatsapp"></i>
      </button>

      {/* Lead Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}>
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden relative animate-in fade-in zoom-in duration-200">
            <button onClick={closeModal} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition-colors">
              <i className="fa-solid fa-xmark"></i>
            </button>
            <div className="bg-gradient-to-r from-primary to-primary-dark p-6 text-white text-center">
              <h3 className="text-xl font-extrabold mb-2">Isi Data Dulu Yuk!</h3>
              <p className="text-sm text-primary-light">Isi data singkat di bawah ini, dan Anda akan otomatis dialihkan ke WhatsApp {agent.fullName || 'Agent Resmi Coway'}.</p>
            </div>
            <div className="p-6">
              <form onSubmit={handleWaSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Nama Lengkap</label>
                  <input type="text" name="name" required placeholder="Cth: Budi Santoso" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Nomor WhatsApp</label>
                  <input type="tel" name="phone" required placeholder="Cth: 08123456789" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                </div>
                <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-green-500/30 transition-all mt-4 flex items-center justify-center gap-2">
                  <i className="fa-brands fa-whatsapp text-xl"></i> Lanjutkan ke WhatsApp
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
