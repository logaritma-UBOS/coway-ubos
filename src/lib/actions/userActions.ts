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
    const metaPixelId = formData.get('metaPixelId') as string;
    const tiktokPixelId = formData.get('tiktokPixelId') as string;

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
        metaPixelId: metaPixelId || null,
        tiktokPixelId: tiktokPixelId || null,
      }
    });

    revalidatePath('/dashboard/profile');
    
    return { success: true, message: 'Profil dan pengaturan berhasil diperbarui' };
  } catch (error: any) {
    console.error('Failed to update profile:', error);
    return { error: 'Terjadi kesalahan pada server saat memperbarui profil' };
  }
}

export async function activateLandingPage() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user || !(session.user as any).id) {
      return { error: 'Unauthorized' };
    }

    const userId = (session.user as any).id;

    await prisma.user.update({
      where: { id: userId },
      data: { isPremium: true }
    });

    revalidatePath('/dashboard/landingpage');
    revalidatePath('/dashboard');
    
    return { success: true, message: 'Landing Page berhasil diaktifkan!' };
  } catch (error: any) {
    console.error('Failed to activate landing page:', error);
    return { error: 'Terjadi kesalahan saat aktivasi' };
  }
}

export async function trackAffiliateClick(slug: string) {
  try {
    const referrer = await prisma.user.findUnique({ where: { slug } });
    if (!referrer) return;

    const today = new Date();
    today.setUTCHours(0,0,0,0);

    const analytic = await prisma.analytic.findUnique({
      where: { agentId_date: { agentId: referrer.id, date: today } }
    });

    if (analytic) {
      await prisma.analytic.update({
        where: { id: analytic.id },
        data: { affiliateClicks: { increment: 1 } }
      });
    } else {
      await prisma.analytic.create({
        data: {
          agentId: referrer.id,
          date: today,
          affiliateClicks: 1
        }
      });
    }
  } catch (err) {
    console.error("Failed to log affiliate click", err);
  }
}
