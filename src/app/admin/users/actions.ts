'use server';
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";

export async function updateUserPassword(id: string, newPassword: string) {
  const passwordHash = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({ where: { id }, data: { passwordHash } });
  revalidatePath('/admin/users');
}

export async function deleteUser(id: string) {
  await prisma.user.delete({ where: { id } });
  revalidatePath('/admin/users');
}

export async function generateGeminiCopy(prompt: string, apiKey: string, targetType: string) {
  try {
    const audience = targetType === 'ALL' ? 'Semua Agen' : targetType === 'PREMIUM' ? 'Agen Premium (sudah berlangganan)' : 'Agen Basic (gratisan)';
    
    const systemPrompt = `Kamu adalah copywriter profesional untuk platform agen Coway. 
Tulis pesan broadcast WhatsApp yang ramah, persuasif, dan menggunakan emoji. 
Target audiens: ${audience}.
Instruksi spesifik: ${prompt}
Jangan gunakan salam pembuka yang aneh, cukup "Halo Agen Coway" atau sapaan hangat lainnya.`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: systemPrompt }]
        }]
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'Gagal menghubungi Gemini API');
    }

    return {
      success: true,
      text: data.candidates[0].content.parts[0].text
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Terjadi kesalahan tidak terduga'
    };
  }
}

export async function sendFonnteBroadcast(message: string, targetType: string, fonnteToken: string) {
  try {
    const whereClause = targetType === 'ALL' ? {} : { isPremium: targetType === 'PREMIUM' };
    
    const users = await prisma.user.findMany({
      where: {
        ...whereClause,
        whatsappNumber: { not: null }
      },
      select: { whatsappNumber: true }
    });

    const numbers = users
      .map(u => u.whatsappNumber)
      .filter(Boolean)
      .map(n => {
        let clean = n!.replace(/\D/g, '');
        if (clean.startsWith('0')) clean = '62' + clean.slice(1);
        return clean;
      })
      .join(',');

    if (!numbers) {
      return { success: false, error: 'Tidak ada nomor WhatsApp agen yang valid untuk target ini.' };
    }

    const formData = new URLSearchParams();
    formData.append('target', numbers);
    formData.append('message', message);
    formData.append('delay', '2');

    const response = await fetch('https://api.fonnte.com/send', {
      method: 'POST',
      headers: {
        'Authorization': fonnteToken,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData.toString()
    });

    const data = await response.json();

    if (!data.status) {
      throw new Error(data.reason || 'Fonnte API menolak permintaan ini.');
    }

    return {
      success: true,
      message: `Pesan sedang dikirim ke ${users.length} agen.`
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Gagal mengirim broadcast'
    };
  }
}
