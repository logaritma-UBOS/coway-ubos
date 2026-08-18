'use client';

import React, { useState } from 'react';

interface ImageUploadProps {
  onUploadSuccess: (url: string) => void;
  onUploadError?: (error: string) => void;
  buttonText?: string;
  className?: string;
}

export default function ImageUpload({ onUploadSuccess, onUploadError, buttonText = 'Unggah Foto', className = '' }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (e.g. max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      if (onUploadError) onUploadError("Ukuran file maksimal 5MB");
      return;
    }

    setIsUploading(true);

    try {
      // 1. Get Signature from backend
      const sigRes = await fetch('/api/cloudinary/sign', { method: 'POST' });
      const sigData = await sigRes.json();

      if (!sigRes.ok) throw new Error(sigData.error || 'Failed to get signature');

      const { timestamp, signature, folder, apiKey, cloudName } = sigData;

      // 2. Upload to Cloudinary using FormData
      const formData = new FormData();
      formData.append('file', file);
      formData.append('api_key', apiKey);
      formData.append('timestamp', timestamp.toString());
      formData.append('signature', signature);
      formData.append('folder', folder);

      const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      });

      const uploadData = await uploadRes.json();

      if (!uploadRes.ok) {
        throw new Error(uploadData.error?.message || 'Failed to upload to Cloudinary');
      }

      // 3. Pass the secure_url back to parent component
      onUploadSuccess(uploadData.secure_url);
    } catch (error: any) {
      console.error("Upload error:", error);
      if (onUploadError) onUploadError(error.message || "Terjadi kesalahan saat mengunggah foto.");
    } finally {
      setIsUploading(false);
      // Reset input
      e.target.value = '';
    }
  };

  return (
    <div className={className}>
      <label className={`relative flex cursor-pointer items-center justify-center rounded-xl bg-white border border-slate-200 px-4 py-3 shadow-sm font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all ${isUploading ? 'opacity-70 pointer-events-none' : ''}`}>
        <span className="flex items-center gap-2">
          {isUploading ? (
            <>
              <i className="fa-solid fa-circle-notch fa-spin text-primary"></i> Mengunggah...
            </>
          ) : (
            <>
              <i className="fa-solid fa-cloud-arrow-up text-primary"></i> {buttonText}
            </>
          )}
        </span>
        <input 
          type="file" 
          accept="image/*" 
          className="sr-only" 
          onChange={handleFileChange}
          disabled={isUploading}
        />
      </label>
    </div>
  );
}
