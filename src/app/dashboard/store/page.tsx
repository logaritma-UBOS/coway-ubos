'use client';

import { useState } from 'react';
import { ShoppingCart, CheckCircle2, Zap, Rocket, Globe, Target } from 'lucide-react';
import { motion } from 'framer-motion';

export default function StorePage() {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleCheckout = async (packageId: string, name: string, price: number) => {
    try {
      setLoadingId(packageId);
      
      const response = await fetch('/api/payments/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          packageId,
          name,
          price,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Terjadi kesalahan saat memproses pembayaran');
      }

      // Redirect to Mayar checkout link
      if (data.link) {
        window.location.href = data.link;
      } else {
        throw new Error('Link pembayaran tidak ditemukan');
      }
    } catch (error: any) {
      alert(error.message || 'Gagal memproses pembayaran. Coba lagi nanti.');
    } finally {
      setLoadingId(null);
    }
  };

  const packages = [
    {
      id: 'pkg_premium_system',
      name: 'Akses Sistem Logaritma Premium',
      description: 'Buka semua fitur terkunci, dapatkan lead scoring otomatis, dan skrip follow-up tak terbatas.',
      price: 150000,
      icon: <Zap size={24} className="text-amber-500" />,
      features: ['Lead Scoring Analytics', 'Follow-up Assistant', 'Sales Kit Lengkap', 'Prioritas Support'],
      popular: true,
    },
    {
      id: 'pkg_custom_landing',
      name: 'Custom Landing Page Khusus',
      description: 'Dibuatkan landing page personal dengan copywriting yang terbukti menghasilkan konversi tinggi.',
      price: 250000,
      icon: <Globe size={24} className="text-[#00A3E0]" />,
      features: ['Domain logaritma.id/nama-anda', 'Terintegrasi Form WhatsApp', 'Desain Premium', 'Revisi 1x'],
      popular: false,
    },
    {
      id: 'pkg_meta_starter',
      name: 'Paket Meta Ads (Starter)',
      description: 'Layanan jasa pembuatan dan manajemen iklan Meta Ads untuk mendatangkan 10-20 prospek baru.',
      price: 500000,
      icon: <Target size={24} className="text-rose-500" />,
      features: ['Termasuk Budget Iklan', 'Riset Audiens', 'Copywriting & Gambar', 'Laporan Harian'],
      popular: false,
    },
    {
      id: 'pkg_meta_growth',
      name: 'Paket Meta Ads (Growth)',
      description: 'Scale up bisnis Anda dengan manajemen iklan intensif untuk mendatangkan 30-50 prospek.',
      price: 1000000,
      icon: <Rocket size={24} className="text-indigo-500" />,
      features: ['Termasuk Budget Iklan', 'A/B Testing Lengkap', 'Retargeting Pixel', 'Konsultasi Strategi'],
      popular: true,
    }
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
          <ShoppingCart className="text-[#00A3E0]" /> Internal Marketplace
        </h1>
        <p className="text-slate-500 mt-2">
          Tingkatkan skala bisnis Anda. Seluruh layanan yang Anda beli di sini akan otomatis diaktifkan oleh sistem.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {packages.map((pkg) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={pkg.id} 
            className={`bg-white rounded-3xl border ${pkg.popular ? 'border-[#00A3E0] shadow-lg shadow-[#00A3E0]/10' : 'border-slate-200 shadow-sm'} p-6 sm:p-8 relative overflow-hidden flex flex-col`}
          >
            {pkg.popular && (
              <div className="absolute top-4 right-4 bg-gradient-to-r from-[#00A3E0] to-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                Paling Laris
              </div>
            )}
            
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 shrink-0">
                {pkg.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 pr-20">{pkg.name}</h3>
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">{pkg.description}</p>
              </div>
            </div>

            <div className="mt-4 mb-6 flex-1">
              <ul className="space-y-3">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-700 font-medium">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Total Biaya</p>
                <p className="text-2xl font-black text-slate-900">
                  Rp {pkg.price.toLocaleString('id-ID')}
                </p>
              </div>
              <button 
                onClick={() => handleCheckout(pkg.id, pkg.name, pkg.price)}
                disabled={loadingId === pkg.id}
                className="px-6 py-3 bg-[#0F172A] hover:bg-slate-800 text-white font-bold rounded-xl transition shadow-lg shadow-slate-900/20 disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {loadingId === pkg.id ? 'Memproses...' : 'Beli Sekarang'}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-12 bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center">
        <h4 className="font-bold text-blue-900 mb-2">Automated Provisioning Aktif</h4>
        <p className="text-sm text-blue-700">Pembayaran didukung oleh Mayar. Setelah pembayaran berhasil, sistem Webhook kami akan otomatis membaca mutasi dan langsung menyalakan akses atau membuat tiket pengerjaan untuk tim admin tanpa perlu konfirmasi manual.</p>
      </div>
    </div>
  );
}
