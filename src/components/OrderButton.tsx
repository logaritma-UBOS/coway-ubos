'use client';
import { useState } from 'react';
import { orderService } from '@/lib/actions/orderActions';

interface OrderButtonProps {
  serviceName: string;
  amount: number;
  buttonText: string;
  icon?: React.ReactNode;
}

export default function OrderButton({ serviceName, amount, buttonText, icon }: OrderButtonProps) {
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleOrder = async () => {
    setIsPending(true);
    setMessage(null);
    
    const result = await orderService(serviceName, amount);
    
    if (result.error) {
      setMessage({ text: result.error, type: 'error' });
    } else if (result.success) {
      setMessage({ text: result.message || 'Berhasil', type: 'success' });
    }
    
    setIsPending(false);
  };

  return (
    <div className="w-full">
      {message && (
        <div className={`mb-4 p-4 rounded-xl text-sm font-bold ${message.type === 'error' ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}`}>
          {message.text}
        </div>
      )}
      <button 
        onClick={handleOrder}
        disabled={isPending || message?.type === 'success'}
        className={`w-full bg-[#00A3E0] hover:bg-sky-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition flex items-center justify-center gap-2 ${isPending || message?.type === 'success' ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105'}`}
      >
        {isPending ? (
          <><i className="fa-solid fa-circle-notch fa-spin mr-2"></i> Memproses...</>
        ) : message?.type === 'success' ? (
          <><i className="fa-solid fa-check"></i> Pesanan Diterima</>
        ) : (
          <>
            {icon} {buttonText}
          </>
        )}
      </button>
    </div>
  );
}
