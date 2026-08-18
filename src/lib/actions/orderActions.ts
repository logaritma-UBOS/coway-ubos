'use server';

import { getServerSession } from 'next-auth';
import { authOptions, prisma } from '@/lib/auth';

export async function orderService(serviceName: string, amount: number) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user || !(session.user as any).id) {
      return { error: 'Unauthorized' };
    }

    const userId = (session.user as any).id;

    // Temukan atau buat layanan (MVP workaround)
    let service = await prisma.service.findFirst({
      where: { title: serviceName }
    });

    if (!service) {
      service = await prisma.service.create({
        data: {
          title: serviceName,
          description: `Pemesanan layanan ${serviceName}`,
          price: amount,
        }
      });
    }

    // Buat pesanan baru
    const newOrder = await prisma.order.create({
      data: {
        agentId: userId,
        serviceId: service.id,
        amount: amount,
        status: 'PENDING',
      }
    });

    // Dalam implementasi nyata, di sinilah Anda melakukan API Call ke Mayar.id
    // untuk mengenerate link pembayaran (Payment Link).
    // Sementara ini, kita akan return link statis ke katalog atau payment form Mayar Anda.
    
    // TODO: Ganti URL ini dengan link Mayar.id asli Anda
    const mayarCheckoutUrl = "https://logaritma-pay.myr.id/"; 

    return { 
      success: true, 
      redirectUrl: mayarCheckoutUrl,
      message: 'Mengarahkan ke pembayaran...'
    };
  } catch (error: any) {
    console.error('Failed to create order:', error);
    return { error: 'Terjadi kesalahan saat membuat pesanan' };
  }
}
