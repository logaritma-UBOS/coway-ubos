'use client';

import { useState, useTransition } from 'react';
import { requestWithdrawal } from './actions';
import { ArrowRightLeft, X, Loader2, CheckCircle2 } from 'lucide-react';

export default function WithdrawalModal({ activeBalance }: { activeBalance: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [successStatus, setSuccessStatus] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const canWithdraw = activeBalance >= 100000;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await requestWithdrawal(formData);
      if (res.success) {
        setSuccessStatus(res.status || 'PENDING');
      } else {
        setErrorMsg(res.error || "Terjadi kesalahan yang tidak diketahui.");
      }
    });
  };

  const closeAndReset = () => {
    setIsOpen(false);
    setTimeout(() => {
      setSuccessStatus(null);
      setErrorMsg(null);
    }, 300);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        disabled={!canWithdraw}
        className="w-full sm:w-auto shrink-0 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-700 disabled:text-slate-400 disabled:shadow-none text-white font-bold py-3 px-6 rounded-xl flex justify-center items-center gap-2 transition shadow-lg shadow-emerald-500/20"
      >
        <ArrowRightLeft size={18} /> Tarik Saldo
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative overflow-hidden animate-in zoom-in-95 duration-200">
            <button 
              onClick={closeAndReset}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition"
            >
              <X size={20} />
            </button>

            {successStatus ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Permintaan Terkirim!</h3>
                <p className="text-slate-500 mb-6">
                  {successStatus === 'PROCESSING' 
                    ? "Sistem sedang memproses pencairan otomatis via Mayar. Dana akan segera masuk ke rekening Anda." 
                    : "Permintaan Anda telah dicatat (PENDING) dan akan diproses manual oleh Admin maksimal 1x24 jam kerja."}
                </p>
                <button 
                  onClick={closeAndReset}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition"
                >
                  Tutup
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold text-slate-900 mb-1">Tarik Saldo Komisi</h3>
                <p className="text-sm text-slate-500 mb-6">Saldo yang dapat ditarik: <strong className="text-slate-800">Rp {activeBalance.toLocaleString('id-ID')}</strong></p>

                {errorMsg && (
                  <div className="bg-rose-50 text-rose-600 text-sm p-3 rounded-lg mb-4 border border-rose-100">
                    {errorMsg}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input type="hidden" name="amount" value={activeBalance} />
                  
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Pilih Bank</label>
                    <select name="bankName" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500 text-slate-900 font-medium">
                      <option value="">-- Pilih Bank --</option>
                      <option value="BCA">BCA</option>
                      <option value="MANDIRI">Mandiri</option>
                      <option value="BNI">BNI</option>
                      <option value="BRI">BRI</option>
                      <option value="BSI">BSI (Bank Syariah Indonesia)</option>
                      <option value="PERMATA">Permata</option>
                      <option value="GOPAY">GoPay</option>
                      <option value="DANA">DANA</option>
                      <option value="OVO">OVO</option>
                      <option value="SHOPEEPAY">ShopeePay</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Nomor Rekening / E-Wallet</label>
                    <input type="text" name="accountNo" required placeholder="Contoh: 1234567890" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500 text-slate-900" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Nama Pemilik Rekening</label>
                    <input type="text" name="accountName" required placeholder="Contoh: Budi Santoso" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500 text-slate-900" />
                  </div>

                  <div className="bg-blue-50 border border-blue-100 p-3 rounded-xl flex gap-2 items-start mt-2">
                    <CheckCircle2 size={16} className="text-blue-500 mt-0.5 shrink-0"/>
                    <p className="text-xs text-blue-800">
                      Seluruh saldo aktif Anda (<strong>Rp {activeBalance.toLocaleString('id-ID')}</strong>) akan ditarik sekaligus.
                    </p>
                  </div>

                  <div className="pt-2">
                    <button 
                      type="submit" 
                      disabled={isPending}
                      className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition flex justify-center items-center gap-2 disabled:opacity-50"
                    >
                      {isPending ? <Loader2 size={18} className="animate-spin" /> : <ArrowRightLeft size={18} />}
                      {isPending ? 'Memproses...' : 'Proses Penarikan'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
