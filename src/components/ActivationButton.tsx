'use client';
import { useState } from 'react';
import { orderService } from '@/lib/actions/orderActions';

interface ActivationButtonProps {
  title: string;
  price: number;
}

export default function ActivationButton({ title, price }: ActivationButtonProps) {
  const [isPending, setIsPending] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleActivate = async () => {
    setIsPending(true);
    setErrorMsg('');
    const result = await orderService(title, price);
    
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
        className={`w-full bg-[#00A3E0] hover:bg-sky-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-transform ${isPending ? 'opacity-70 cursor-not-allowed scale-100' : 'hover:scale-105'}`}
      >
        {isPending ? (
          "Mengarahkan ke Mayar..."
        ) : (
          `Beli Sekarang (Rp ${price.toLocaleString('id-ID')})`
        )}
      </button>
      {errorMsg && (
        <p className="text-red-500 text-sm mt-3 max-w-xs text-center">{errorMsg}</p>
      )}
    </div>
  );
}
