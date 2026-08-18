'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyLinkButtonProps {
  url: string;
}

export default function CopyLinkButton({ url }: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link', err);
    }
  };

  return (
    <button 
      onClick={handleCopy}
      className="text-slate-400 hover:text-white transition p-1" 
      title="Copy Link"
    >
      {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
    </button>
  );
}
