'use client';

import React, { useState, useRef } from 'react';
import { updateProfile } from '@/lib/actions/userActions';
import ImageUpload from './ImageUpload';

interface ProfileFormProps {
  initialData: {
    name: string;
    slug: string;
    whatsappNumber: string;
    bio: string | null;
    image: string | null;
  };
}

export default function ProfileForm({ initialData }: ProfileFormProps) {
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(initialData.image);
  
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    if (profileImage) {
      formData.append('image', profileImage);
    }

    const result = await updateProfile(formData);

    if (result.error) {
      setMessage({ text: result.error, type: 'error' });
    } else if (result.success) {
      setMessage({ text: result.message || 'Berhasil', type: 'success' });
    }

    setIsPending(false);
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      {message && (
        <div className={`p-4 rounded-lg text-sm font-bold ${message.type === 'error' ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-green-50 text-green-600 border border-green-200'}`}>
          {message.text}
        </div>
      )}

      <div>
        <label className="block text-sm font-bold text-slate-700 mb-2">Foto Profil (Avatar)</label>
        <div className="flex items-center gap-6">
          <div className="shrink-0">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-slate-100 shadow-sm" />
            ) : (
              <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center border-4 border-white shadow-sm">
                <i className="fa-solid fa-user text-3xl text-slate-300"></i>
              </div>
            )}
          </div>
          <div className="flex-1">
            <ImageUpload 
              onUploadSuccess={(url) => setProfileImage(url)} 
              onUploadError={(err) => setMessage({ text: err, type: 'error' })} 
              buttonText={profileImage ? "Ganti Foto" : "Unggah Foto"}
            />
            <p className="text-xs text-slate-500 mt-2 font-medium">Disarankan rasio 1:1 (persegi). Maksimal 5MB.</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Nama Lengkap</label>
          <input 
            type="text" 
            name="name" 
            defaultValue={initialData.name}
            required
            className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition font-medium" 
            placeholder="e.g. Budi Santoso" 
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Nomor WhatsApp</label>
          <input 
            type="text" 
            name="whatsappNumber" 
            defaultValue={initialData.whatsappNumber}
            required
            className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition font-medium" 
            placeholder="e.g. 081234567890" 
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-slate-700 mb-2">Custom Slug (Link URL)</label>
        <div className="flex items-center">
          <span className="bg-slate-100 border border-slate-300 border-r-0 rounded-l-lg px-4 py-3 text-slate-500 text-sm font-bold">coway.logaritma.id/</span>
          <input 
            type="text" 
            name="slug" 
            defaultValue={initialData.slug}
            required
            className="w-full border border-slate-300 rounded-r-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition font-medium" 
            placeholder="budi-santoso" 
          />
        </div>
        <p className="text-xs text-slate-500 mt-2 font-medium">Hanya gunakan huruf kecil dan tanda strip (-). Tanpa spasi.</p>
      </div>

      <div>
        <label className="block text-sm font-bold text-slate-700 mb-2">Bio Singkat (Opsional)</label>
        <textarea 
          name="bio" 
          defaultValue={initialData.bio || ''}
          rows={3}
          className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition font-medium" 
          placeholder="Tuliskan sedikit tentang spesialisasi Anda untuk menarik klien..." 
        ></textarea>
      </div>

      <button 
        type="submit" 
        disabled={isPending}
        className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition mt-4 ${isPending ? 'opacity-70 cursor-not-allowed' : ''}`}
      >
        {isPending ? (
          <><i className="fa-solid fa-circle-notch fa-spin mr-2"></i> Menyimpan...</>
        ) : (
          <><i className="fa-solid fa-floppy-disk mr-2"></i> Simpan Profil</>
        )}
      </button>
    </form>
  );
}
