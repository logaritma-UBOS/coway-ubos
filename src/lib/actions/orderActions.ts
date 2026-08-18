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
    
    return { success: true, orderId: newOrder.id, message: 'Pesanan berhasil dibuat. Tim kami akan segera menghubungi Anda melalui WhatsApp.' };
  } catch (error: any) {
    console.error('Failed to create order:', error);
    return { error: 'Terjadi kesalahan saat membuat pesanan' };
  }
}
