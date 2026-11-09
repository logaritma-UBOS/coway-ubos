import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6 font-sans antialiased">
      <div className="text-center max-w-md bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
        <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6 text-rose-500">
          <AlertCircle size={32} />
        </div>
        <h1 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">Halaman Tidak Ditemukan</h1>
        <p className="text-slate-500 mb-8 font-medium leading-relaxed">
          Halaman atau profil agen yang Anda cari tidak ditemukan atau tautan salah.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl w-full"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
