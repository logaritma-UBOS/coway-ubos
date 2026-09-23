'use client';

import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

export default function InstallPwaButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [showIosPrompt, setShowIosPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Register Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(() => console.log('SW registered'))
        .catch((err) => console.error('SW registration failed', err));
    }

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true) {
      setIsInstalled(true);
      return;
    }

    // Handle beforeinstallprompt (Android / Desktop Chrome)
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Detect iOS (Safari)
    const ua = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(ua);
    const isSafari = /safari/.test(ua) && !/chrome|crios|fxios/.test(ua);
    
    if (isIosDevice && isSafari && !isInstalled) {
      setIsIos(true);
      setIsInstallable(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, [isInstalled]);

  const handleInstallClick = async () => {
    if (isIos) {
      setShowIosPrompt(true);
      return;
    }

    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstallable(false);
      }
      setDeferredPrompt(null);
    }
  };

  if (isInstalled || !isInstallable) return null;

  return (
    <>
      <button 
        onClick={handleInstallClick}
        className="fixed bottom-6 right-6 z-50 bg-[#00A3E0] hover:bg-sky-600 text-white shadow-xl shadow-sky-500/30 rounded-full px-5 py-3 font-bold flex items-center gap-2 transition-transform transform hover:-translate-y-1 animate-bounce"
      >
        <Download size={20} />
        <span className="hidden md:inline">Download Aplikasi</span>
        <span className="md:hidden">Download</span>
      </button>

      {/* iOS Instruction Modal */}
      {showIosPrompt && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-end justify-center sm:items-center p-4 pb-12 animate-in fade-in zoom-in duration-300">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl relative">
            <button onClick={() => setShowIosPrompt(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700">
              <X size={24} />
            </button>
            <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight">Instal di iPhone/iPad</h3>
            <p className="text-slate-600 text-sm mb-4 leading-relaxed">
              Untuk menginstal aplikasi ini ke layar utama (Home Screen) iPhone Anda:
            </p>
            <ol className="text-sm text-slate-700 space-y-3 font-medium">
              <li className="flex items-start gap-3">
                <span className="bg-slate-100 px-2 py-1 rounded text-slate-900">1</span>
                <span>Ketuk ikon <b>Share</b> <i className="fa-solid fa-arrow-up-from-bracket ml-1 opacity-50"></i> di menu navigasi bawah Safari.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-slate-100 px-2 py-1 rounded text-slate-900">2</span>
                <span>Geser ke atas dan pilih <b>Add to Home Screen</b> <i className="fa-regular fa-square-plus ml-1 opacity-50"></i></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-slate-100 px-2 py-1 rounded text-slate-900">3</span>
                <span>Ketuk <b>Add</b> di pojok kanan atas.</span>
              </li>
            </ol>
            <button onClick={() => setShowIosPrompt(false)} className="w-full mt-6 bg-slate-900 text-white font-bold py-3 rounded-xl">
              Mengerti
            </button>
          </div>
        </div>
      )}
    </>
  );
}
