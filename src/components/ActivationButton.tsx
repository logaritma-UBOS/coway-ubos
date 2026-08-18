'use client';
import { useState } from 'react';
import { activateLandingPage } from '@/lib/actions/userActions';

export default function ActivationButton() {
  const [isPending, setIsPending] = useState(false);

  const handleActivate = async () => {
    setIsPending(true);
    await activateLandingPage();
    setIsPending(false);
  };

  return (
    <button 
      onClick={handleActivate}
      disabled={isPending}
      className={`bg-[#00A3E0] hover:bg-sky-600 text-white font-bold py-4 px-8 rounded-xl sm:rounded-full shadow-lg transition-transform ${isPending ? 'opacity-70 cursor-not-allowed scale-100' : 'hover:scale-105'}`}
    >
      {isPending ? (
        <><i className="fa-solid fa-circle-notch fa-spin mr-2"></i> Mengaktifkan...</>
      ) : (
        "Aktifkan Sekarang (MVP Demo)"
      )}
    </button>
  );
}
