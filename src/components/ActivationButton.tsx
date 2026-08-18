'use client';
import { useState } from 'react';
import { orderService } from '@/lib/actions/orderActions';

export default function ActivationButton() {
  const [isPending, setIsPending] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleActivate = async () => {
    setIsPending(true);
    setErrorMsg('');
    const result = await orderService('Aktivasi Landing Page', 99000);
    
    if (result.success && result.redirectUrl) {
      window.location.href = result.redirectUrl;
    } else {
      setErrorMsg(result.error || 'Terjadi kesalahan saat memproses pembayaran');
      setIsPending(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button 
        onClick={handleActivate}
        disabled={isPending}
        className={`bg-[#00A3E0] hover:bg-sky-600 text-white font-bold py-4 px-8 rounded-xl sm:rounded-full shadow-lg transition-transform ${isPending ? 'opacity-70 cursor-not-allowed scale-100' : 'hover:scale-105'}`}
      >
        {isPending ? (
          <><i className="fa-solid fa-circle-notch fa-spin mr-2"></i> Mengarahkan ke Mayar...</>
        ) : (
          "Bayar & Aktifkan (Rp 99.000)"
        )}
      </button>
      {errorMsg && (
        <p className="text-red-500 text-sm mt-3 max-w-xs text-center">{errorMsg}</p>
      )}
    </div>
  );
}
