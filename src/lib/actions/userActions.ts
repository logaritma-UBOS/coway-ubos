'use server';

import { getServerSession } from 'next-auth';
import { authOptions, prisma } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function updateProfile(formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user || !(session.user as any).id) {
      return { error: 'Unauthorized' };
    }

    const userId = (session.user as any).id;
    
    const name = formData.get('name') as string;
    let slug = formData.get('slug') as string;
    const whatsappNumber = formData.get('whatsappNumber') as string;
    const bio = formData.get('bio') as string;
    const image = formData.get('image') as string;

    if (!name || !slug || !whatsappNumber) {
      return { error: 'Nama, Slug, dan WhatsApp wajib diisi' };
    }

    // Format slug (lowercase, replace spaces with hyphens, remove special chars)
    slug = slug.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    // Check slug uniqueness (if changed)
    const existingUserWithSlug = await prisma.user.findUnique({
      where: { slug }
    });

    if (existingUserWithSlug && existingUserWithSlug.id !== userId) {
      return { error: 'Slug / URL tersebut sudah digunakan oleh agen lain. Silakan pilih yang lain.' };
    }

    // Format WhatsApp number
    let formattedPhone = whatsappNumber.replace(/\D/g, '');
    if (formattedPhone.startsWith('0')) {
      formattedPhone = '62' + formattedPhone.substring(1);
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        slug,
        whatsappNumber: formattedPhone,
        bio: bio || null,
        image: image || null,
      }
    });

    revalidatePath('/profile');
    
    return { success: true, message: 'Profil berhasil diperbarui' };
  } catch (error: any) {
    console.error('Failed to update profile:', error);
    return { error: 'Terjadi kesalahan pada server saat memperbarui profil' };
  }
}
