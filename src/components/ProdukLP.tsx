'use client';

import React, { useState } from 'react';
import Head from 'next/head';

export default function ProdukLP({ agent }: { agent: any }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('Coway');

  const openModal = (product = 'Coway') => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const handleWaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const phone = (form.elements.namedItem('phone') as HTMLInputElement).value;
    
    fetch('/api/leads/capture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        agentId: agent.id,
        customerName: name,
        whatsappNumber: phone,
        targetProduct: selectedProduct
      })
    });
    
    const waText = `Halo Kak ${agent.fullName || ''}, nama saya ${name}. Saya tertarik dengan produk ${selectedProduct} dan ingin tanya-tanya promo terbarunya. Bisa bantu jelaskan?`;
    let waPhone = agent.phone || '';
    if (waPhone.startsWith('0')) waPhone = '62' + waPhone.substring(1);
    
    window.location.href = `https://wa.me/${waPhone}?text=${encodeURIComponent(waText)}`;
  };

  const products = [
    { name: 'CINNAMON', img: 'https://cowayagent.id/wp-content/uploads/2026/07/cinnamon.png' },
    { name: 'NEO PLUS', img: 'https://cowayagent.id/wp-content/uploads/2026/07/neo-plus.png' },
    { name: 'OMBAK', img: 'https://cowayagent.id/wp-content/uploads/2026/07/ombak.png' },
    { name: 'VILLAEM II', img: 'https://cowayagent.id/wp-content/uploads/2026/07/villaem-II.png' },
    { name: 'VILLAEM III', img: 'https://cowayagent.id/wp-content/uploads/2026/07/villaem-III.png' },
    { name: 'CORE', img: 'https://cowayagent.id/wp-content/uploads/2026/07/core.png' },
    { name: 'KRISTAL ICE', img: 'https://cowayagent.id/wp-content/uploads/2026/07/kristal-ice.png' },
    { name: 'SQUAREFIT', img: 'https://cowayagent.id/wp-content/uploads/2026/07/squarefit.png' },
    { name: 'SQUAREBIG', img: 'https://cowayagent.id/wp-content/uploads/2026/07/squarebig.png' },
    { name: 'POE-23A', img: 'https://cowayagent.id/wp-content/uploads/2026/07/poe-23a.png' },
    { name: 'STORM', img: 'https://cowayagent.id/wp-content/uploads/2026/07/strom.png' },
    { name: 'NEXT STORM', img: 'https://cowayagent.id/wp-content/uploads/2026/07/next-strom.png' },
    { name: 'BREEZE', img: 'https://cowayagent.id/wp-content/uploads/2026/07/breeze.png' },
    { name: 'LOMBOK', img: 'https://cowayagent.id/wp-content/uploads/2026/07/lombok.png' },
    { name: 'NOBLE 2', img: 'https://cowayagent.id/wp-content/uploads/2026/07/noble-2.png' },
  ];

  return (
    <div className="font-sans bg-white text-gray-800 min-h-screen">
      <Head>
        <title>Coway Agent Official</title>
      </Head>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="font-bold text-2xl tracking-tighter text-[#00A3E0]">COWAY</div>
          <nav className="hidden md:flex gap-6 text-sm font-bold text-gray-600">
            <a href="#" className="hover:text-[#00A3E0]">Home</a>
            <a href="#" className="hover:text-[#00A3E0]">Water Purifier</a>
            <a href="#" className="hover:text-[#00A3E0]">Air Purifier</a>
            <a href="#" className="hover:text-[#00A3E0]">Water Filter</a>
          </nav>
          <button onClick={() => openModal()} className="md:hidden text-gray-600">
            <i className="fa-solid fa-bars text-xl"></i>
          </button>
        </div>
      </header>

      {/* Hero 1 */}
      <section className="bg-gray-50 py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
            Berhenti mengorbankan kesehatan keluarga dan ribetnya angkat galon tiap minggu.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Saatnya produksi air minum murni sendiri dari rumah dengan sistem purifikasi canggih Coway.
          </p>
          <img src="https://cowayagent.id/wp-content/uploads/2026/07/1-scaled.png" alt="Coway Water Purifier" className="w-full h-auto rounded-2xl shadow-xl mb-8" />
          <button onClick={() => openModal('Water Purifier')} className="bg-[#00A3E0] hover:bg-sky-600 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg shadow-sky-500/30 transition-transform hover:scale-105">
            Tanya Promo via WhatsApp
          </button>
        </div>
      </section>

      {/* Hero 2 */}
      <section className="bg-white py-16 px-4 text-center border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
            Air dan udara yang tampak bersih belum tentu bebas dari bakteri dan virus.
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Coway hadir untuk memastikan 99.9% perlindungan maksimal.
          </p>
          <img src="https://cowayagent.id/wp-content/uploads/2026/07/2-scaled.png" alt="Coway Air Purifier" className="w-full h-auto rounded-2xl shadow-xl mb-8" />
          <button onClick={() => openModal('Air Purifier')} className="bg-[#00A3E0] hover:bg-sky-600 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg shadow-sky-500/30 transition-transform hover:scale-105">
            Konsultasi Gratis
          </button>
        </div>
      </section>

      {/* Product Grid */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((p, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-shadow flex flex-col items-center text-center border border-gray-100">
                <img src={p.img} alt={p.name} className="h-64 object-contain mb-6 drop-shadow-md hover:scale-105 transition-transform duration-500" />
                <h3 className="text-2xl font-black text-slate-900 mb-6 tracking-tight uppercase">{p.name}</h3>
                <button onClick={() => openModal(p.name)} className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold py-3 px-6 rounded-full shadow-md transition-colors flex items-center justify-center gap-2">
                  <i className="fa-brands fa-whatsapp text-lg"></i> Tanya Detail
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="bg-[#00A3E0] py-16 px-4 text-center text-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black mb-8 leading-tight">
            Ambil Promonya Lewat {agent.fullName || 'Agen Kami'} Sekarang
          </h2>
          <button onClick={() => openModal()} className="bg-white text-[#00A3E0] hover:bg-gray-50 font-black py-4 px-10 rounded-full text-lg shadow-xl transition-transform hover:scale-105">
            Hubungi Sekarang
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1">
            <h4 className="text-white font-bold text-lg mb-4">Coway Agent</h4>
            <p className="text-sm mb-4">
              Authorized Independent Agent Coway Indonesia. Kami berkomitmen memberikan edukasi, kemudahan administrasi, serta layanan konsultasi terbaik untuk solusi pemurni air dan udara Anda.
            </p>
            <p className="text-xs italic opacity-70">Ini Bukan Website Resmi dari Coway.</p>
          </div>
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Agent Profile</h4>
            <p className="text-sm font-bold text-white">{agent.fullName || 'Official Agent'}</p>
            <p className="text-xs mb-2">ID Agen: {agent.cowayId || 'Menunggu Verifikasi'}</p>
            <p className="text-xs">Health Planner Profesional</p>
          </div>
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Produk Kami</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Water Purifier</a></li>
              <li><a href="#" className="hover:text-white">Air Purifier</a></li>
              <li><a href="#" className="hover:text-white">Promo Bulanan</a></li>
              <li><a href="#" className="hover:text-white">Paket Korporat (Kantor)</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Layanan & Informasi</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Tentang Heart Service (Cody)</a></li>
              <li><a href="#" className="hover:text-white">Teknologi Filter HEPA & RO</a></li>
              <li><a href="#" className="hover:text-white">Syarat & Ketentuan</a></li>
              <li><a href="#" className="hover:text-white">FAQ (Pertanyaan Populer)</a></li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Floating WA */}
      <button 
        onClick={() => openModal()} 
        className="fixed bottom-6 right-6 w-[60px] h-[60px] bg-[#25d366] hover:bg-[#1ebd5a] text-white rounded-full flex items-center justify-center text-[32px] shadow-2xl z-40 transition-transform transform hover:scale-110"
      >
        <i className="fa-brands fa-whatsapp"></i>
      </button>

      {/* Lead Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-gradient-to-r from-[#00A3E0] to-sky-600 p-6 text-white text-center relative">
              <button onClick={closeModal} className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors">
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
              <h3 className="text-2xl font-black mb-1">Tanya Detail {selectedProduct}</h3>
              <p className="text-sky-100 text-sm">Isi data singkat untuk terhubung dengan {agent.fullName || 'Agen'}.</p>
            </div>
            <div className="p-6">
              <form onSubmit={handleWaSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Nama Lengkap</label>
                  <input type="text" name="name" required placeholder="Cth: Budi Santoso" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#00A3E0] outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Nomor WhatsApp Aktif</label>
                  <input type="tel" name="phone" required placeholder="Cth: 08123456789" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#00A3E0] outline-none transition-all" />
                </div>
                <button type="submit" className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold py-4 px-4 rounded-xl shadow-lg transition-transform hover:scale-105 mt-2 flex items-center justify-center gap-2">
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
