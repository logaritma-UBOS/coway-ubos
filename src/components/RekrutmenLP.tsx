'use client';

import React, { useState } from 'react';
import Head from 'next/head';

export default function RekrutmenLP({ agent }: { agent: any }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleWaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const phone = (form.elements.namedItem('phone') as HTMLInputElement).value;
    const city = (form.elements.namedItem('city') as HTMLInputElement).value;
    
    fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        agentId: agent.id,
        customerName: name,
        whatsappNumber: phone,
        city: city,
        targetProduct: 'Rekrutmen Agen'
      })
    });
    
    const waText = `Halo Kak ${agent.fullName || ''}, nama saya ${name} dari kota ${city}. Saya tertarik untuk bergabung menjadi Agen Coway dan ingin dibimbing langsung oleh Kakak. Bisa jelaskan persyaratannya?`;
    let waPhone = agent.phone || '';
    if (waPhone.startsWith('0')) waPhone = '62' + waPhone.substring(1);
    
    window.location.href = `https://wa.me/${waPhone}?text=${encodeURIComponent(waText)}`;
  };

  return (
    <div className="font-sans bg-slate-50 text-slate-800 min-h-screen">
      <Head>
        <title>Gabung Jadi Agen Coway</title>
      </Head>

      <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center sticky top-0 z-50">
        <div className="font-black text-2xl text-[#00A3E0] tracking-tighter">COWAY CAREER</div>
        <button onClick={openModal} className="bg-[#00A3E0] hover:bg-sky-600 text-white font-bold py-2 px-6 rounded-full text-sm transition shadow-md">
          Gabung Sekarang
        </button>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://cowayagent.id/wp-content/uploads/2026/07/2-scaled.png')] bg-cover bg-center"></div>
        <div className="max-w-3xl mx-auto relative z-10">
          <span className="bg-[#00A3E0] text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider mb-6 inline-block shadow-lg">Peluang Karir 2026</span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tight">
            Ubah Waktu Luang Anda Menjadi <span className="text-[#00A3E0]">Penghasilan Tanpa Batas</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto">
            Bergabunglah menjadi Health Planner Coway resmi hari ini. Dibimbing langsung sampai closing pertama Anda. Tidak perlu stok barang, tidak ada target mengikat.
          </p>
          <button onClick={openModal} className="bg-[#25D366] hover:bg-[#1EBE5D] text-white font-black py-4 px-10 rounded-full text-lg shadow-xl shadow-[#25D366]/20 transition-transform transform hover:scale-105 flex items-center justify-center gap-2 mx-auto">
            <i className="fa-brands fa-whatsapp text-2xl"></i> Daftar via WhatsApp
          </button>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-slate-900 mb-4">Kenapa Memilih Coway?</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">Berbeda dengan MLM konvensional, Coway menggunakan sistem Direct Selling murni yang menguntungkan agen di garis depan.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-shadow text-center">
            <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center text-2xl mx-auto mb-6">
              <i className="fa-solid fa-money-bill-wave"></i>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Komisi Besar</h3>
            <p className="text-slate-500 text-sm">Dapatkan komisi hingga jutaan rupiah hanya dari 1 closing unit penjualan. Pencairan cepat dan transparan.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-shadow text-center">
            <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center text-2xl mx-auto mb-6">
              <i className="fa-solid fa-box-open"></i>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Tanpa Modal Stok</h3>
            <p className="text-slate-500 text-sm">Anda tidak perlu menyetok produk. Semua pengiriman, instalasi, dan teknisi dikerjakan 100% oleh tim pusat Coway.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-shadow text-center">
            <div className="w-16 h-16 bg-purple-50 text-purple-500 rounded-full flex items-center justify-center text-2xl mx-auto mb-6">
              <i className="fa-solid fa-graduation-cap"></i>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Mentoring Eksklusif</h3>
            <p className="text-slate-500 text-sm">Bimbingan intensif strategi jualan online, meta ads, hingga teknik closing langsung dari ahlinya.</p>
          </div>
        </div>
      </section>

      {/* Mentor Profile */}
      <section className="bg-white py-20 px-6 border-y border-slate-100">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/3 text-center md:text-left">
            {agent.profileImageUrl ? (
              <img src={agent.profileImageUrl} alt={agent.fullName} className="w-48 h-48 rounded-full object-cover shadow-2xl mx-auto md:mx-0 border-4 border-slate-50" />
            ) : (
              <div className="w-48 h-48 rounded-full bg-slate-100 text-slate-300 flex items-center justify-center text-6xl shadow-2xl mx-auto md:mx-0 border-4 border-slate-50">
                <i className="fa-solid fa-user"></i>
              </div>
            )}
          </div>
          <div className="md:w-2/3 text-center md:text-left">
            <h2 className="text-3xl font-black text-slate-900 mb-4">Belajar Langsung dari <span className="text-[#00A3E0]">{agent.fullName}</span></h2>
            <p className="text-slate-600 mb-6 leading-relaxed text-lg">
              Halo! Saya adalah Health Planner resmi Coway (ID: {agent.cowayId || 'Menunggu Verifikasi'}). Saya mengundang Anda yang memiliki semangat sukses untuk bergabung di tim saya. Saya akan membimbing Anda langkah demi langkah.
            </p>
            <button onClick={openModal} className="bg-[#00A3E0] hover:bg-sky-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:-translate-y-1">
              Chat Mentor Sekarang
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6 text-center text-sm">
        <p className="mb-2">&copy; {new Date().getFullYear()} Coway Independent Agent Team.</p>
        <p className="opacity-60 text-xs">Website ini digunakan khusus untuk rekrutmen tim independen dan bukan situs korporat resmi.</p>
      </footer>

      {/* Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white text-center relative">
              <button onClick={closeModal} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors">
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
              <h3 className="text-2xl font-black mb-2">Form Pendaftaran</h3>
              <p className="text-slate-400 text-sm">Isi data di bawah untuk pengajuan wawancara via WhatsApp.</p>
            </div>
            <div className="p-8">
              <form onSubmit={handleWaSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Nama Lengkap</label>
                  <input type="text" name="name" required placeholder="Cth: Budi Santoso" className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-slate-400 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Nomor WhatsApp Aktif</label>
                  <input type="tel" name="phone" required placeholder="Cth: 08123456789" className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-slate-400 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Domisili Kota</label>
                  <input type="text" name="city" required placeholder="Cth: Jakarta Selatan" className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-slate-400 outline-none transition-all" />
                </div>
                <button type="submit" className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold py-4 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 mt-4 flex items-center justify-center gap-2">
                  <i className="fa-brands fa-whatsapp text-xl"></i> Kirim & Lanjut ke WA
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
