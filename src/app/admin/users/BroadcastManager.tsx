'use client';
import { useState, useEffect } from 'react';
import { MessageSquare, Settings, Sparkles, Send, Loader2, X } from 'lucide-react';
import { generateGeminiCopy, sendFonnteBroadcast } from './actions';

export default function BroadcastManager() {
  const [showModal, setShowModal] = useState(false);
  const [targetType, setTargetType] = useState('ALL');
  const [prompt, setPrompt] = useState('');
  const [message, setMessage] = useState('');
  const [fonnteToken, setFonnteToken] = useState('');
  const [geminiKey, setGeminiKey] = useState('');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const savedFonnte = localStorage.getItem('UBOS_FONNTE_TOKEN');
    const savedGemini = localStorage.getItem('UBOS_GEMINI_KEY');
    if (savedFonnte) setFonnteToken(savedFonnte);
    if (savedGemini) setGeminiKey(savedGemini);
  }, []);

  const saveSettings = () => {
    localStorage.setItem('UBOS_FONNTE_TOKEN', fonnteToken);
    localStorage.setItem('UBOS_GEMINI_KEY', geminiKey);
    setShowSettings(false);
  };

  const handleGenerate = async () => {
    if (!geminiKey) {
      alert("Mohon masukkan Gemini API Key di menu Pengaturan ⚙️");
      setShowSettings(true);
      return;
    }
    if (!prompt) {
      alert("Mohon masukkan instruksi untuk Gemini.");
      return;
    }

    setIsGenerating(true);
    const res = await generateGeminiCopy(prompt, geminiKey, targetType);
    setIsGenerating(false);

    if (res.success) {
      setMessage(res.text || '');
    } else {
      alert(res.error);
    }
  };

  const handleSend = async () => {
    if (!fonnteToken) {
      alert("Mohon masukkan Fonnte Token di menu Pengaturan ⚙️");
      setShowSettings(true);
      return;
    }
    if (!message) {
      alert("Pesan tidak boleh kosong.");
      return;
    }

    if (!confirm(`Yakin ingin mengirim pesan ini ke ${targetType === 'ALL' ? 'Semua Agen' : targetType === 'PREMIUM' ? 'Agen Premium' : 'Agen Basic'}?`)) return;

    setIsSending(true);
    const res = await sendFonnteBroadcast(message, targetType, fonnteToken);
    setIsSending(false);

    if (res.success) {
      alert(res.message);
      setShowModal(false);
    } else {
      alert(res.error);
    }
  };

  return (
    <>
      <button 
        onClick={() => setShowModal(true)}
        className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition"
      >
        <MessageSquare size={16}/> Broadcast WA
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            
            {/* Header */}
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <MessageSquare size={24} className="text-emerald-600"/> Broadcast WhatsApp
                </h3>
                <p className="text-sm text-slate-500 mt-1">Gunakan Gemini AI untuk copywriting yang lebih baik.</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setShowSettings(!showSettings)} className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 rounded-lg transition" title="Pengaturan API">
                  <Settings size={20}/>
                </button>
                <button onClick={() => setShowModal(false)} className="p-2 text-slate-400 hover:bg-slate-100 hover:text-rose-500 rounded-lg transition">
                  <X size={20}/>
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              
              {/* Settings Panel */}
              {showSettings && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-4">
                  <h4 className="font-bold text-slate-800 flex items-center gap-2"><Settings size={16}/> Pengaturan API (Tersimpan Lokal)</h4>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Fonnte API Token</label>
                    <input type="password" value={fonnteToken} onChange={e => setFonnteToken(e.target.value)} className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl outline-none focus:border-emerald-500" placeholder="Token dari api.fonnte.com"/>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Gemini API Key</label>
                    <input type="password" value={geminiKey} onChange={e => setGeminiKey(e.target.value)} className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl outline-none focus:border-emerald-500" placeholder="Key dari Google AI Studio"/>
                  </div>
                  <button onClick={saveSettings} className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-slate-800 transition">Simpan Pengaturan</button>
                </div>
              )}

              {/* Target & AI Generation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="min-w-0">
                  <label className="block text-sm font-bold text-slate-700 mb-1">Pilih Target Agen</label>
                  <select value={targetType} onChange={e => setTargetType(e.target.value)} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500 font-medium">
                    <option value="ALL">Semua Agen (Basic & Premium)</option>
                    <option value="BASIC">Hanya Agen Basic</option>
                    <option value="PREMIUM">Hanya Agen Premium</option>
                  </select>
                </div>
                <div className="min-w-0">
                  <label className="block text-sm font-bold text-slate-700 mb-1 truncate">Instruksi Copywriting AI</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={prompt} 
                      onChange={e => setPrompt(e.target.value)} 
                      placeholder="Promo upgrade diskon..." 
                      className="flex-1 min-w-0 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500"
                    />
                    <button 
                      onClick={handleGenerate}
                      disabled={isGenerating || !prompt}
                      className="shrink-0 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition disabled:opacity-50 flex items-center gap-2 font-bold"
                    >
                      {isGenerating ? <Loader2 size={16} className="animate-spin"/> : <Sparkles size={16}/>}
                      Buat
                    </button>
                  </div>
                </div>
              </div>

              {/* Message Editor */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1 flex items-center justify-between">
                  <span>Isi Pesan WhatsApp</span>
                  <span className="text-xs font-normal text-slate-400">Gunakan spasi untuk paragraf baru.</span>
                </label>
                <textarea 
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  rows={8}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500"
                  placeholder="Ketik manual pesan Anda di sini atau gunakan AI untuk membuatnya..."
                ></textarea>
              </div>

            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-200 flex gap-3">
              <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-3 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold transition">Batal</button>
              <button 
                onClick={handleSend}
                disabled={isSending || !message}
                className="flex-[2] px-4 py-3 text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl font-bold transition flex justify-center items-center gap-2 disabled:opacity-50"
              >
                {isSending ? <Loader2 size={18} className="animate-spin"/> : <Send size={18}/>}
                {isSending ? 'Mengirim ke Fonnte...' : 'Kirim Broadcast Sekarang'}
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
