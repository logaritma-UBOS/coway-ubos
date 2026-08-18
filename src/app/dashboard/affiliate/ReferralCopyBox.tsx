'use client';
import { useState } from 'react';
import { Copy, CheckCircle2 } from 'lucide-react';

export default function ReferralCopyBox({ referralLink }: { referralLink: string }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 overflow-hidden w-full">
      <h3 className="font-bold text-slate-900 mb-4 text-lg">Link Referral Anda</h3>
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <div className="flex-1 min-w-0 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 font-medium font-mono text-sm overflow-hidden flex items-center">
          <span className="truncate w-full block">{referralLink}</span>
        </div>
        <button 
          onClick={copyToClipboard}
          className="w-full sm:w-auto shrink-0 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition"
        >
          {copied ? <CheckCircle2 size={18} className="text-emerald-400" /> : <Copy size={18} />} 
          {copied ? 'Tersalin!' : 'Salin Link'}
        </button>
      </div>
    </div>
  );
}
