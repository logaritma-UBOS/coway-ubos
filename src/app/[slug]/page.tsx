import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import LandingPageUI from '@/components/LandingPageUI';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// 1. Generate Dynamic OG Meta Tags
export default async function LandingPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  
  // Ambil data agen berdasarkan slug dari parameter URL
  const agentData = await prisma.user.findUnique({
    where: { slug }
  });

  if (!agentData) {
    // Jika agen tidak ditemukan, tampilkan halaman 404
    notFound();
  }

  // Record 1 Page View ke tabel Analytics (hanya sebagai contoh sederhana)
  // Pada implementasi nyata, sebaiknya gunakan API khusus untuk menghindari overhead rendering
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingAnalytics = await prisma.analytic.findUnique({
      where: {
        agentId_date: {
          agentId: agentData.id,
          date: today
        }
      }
    });

    if (existingAnalytics) {
      await prisma.analytic.update({
        where: { id: existingAnalytics.id },
        data: { pageViews: { increment: 1 } }
      });
    } else {
      await prisma.analytic.create({
        data: {
          agentId: agentData.id,
          date: today,
          pageViews: 1
        }
      });
    }
  } catch (error) {
    console.error("Gagal mencatat analytics:", error);
  }

  return (
    <LandingPageUI 
      agent={{
        id: agentData.id,
        fullName: agentData.name || 'Agen Coway',
        whatsappNumber: agentData.whatsappNumber || '',
        profileImageUrl: agentData.image || null,
        bio: agentData.bio || 'Hubungi saya untuk konsultasi gratis produk unggulan Coway untuk keluarga Anda.'
      }}
    />
  );
}
