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

    // Integrasi Mayar API (Payment Link)
    let mayarCheckoutUrl = "https://logaritma-pay.myr.id/"; // Fallback URL
    const apiKey = process.env.MAYAR_API_KEY;

    if (apiKey) {
      try {
        const payload = {
          name: session.user.name || 'Agen Coway',
          email: session.user.email,
          mobile: (session.user as any).whatsappNumber || '081111111111',
          amount: amount,
          description: `Pesanan Layanan UBOS: ${serviceName}`,
          redirectURL: `https://coway.logaritma.id/dashboard`
        };

        const response = await fetch('https://api.mayar.id/hl/v1/invoice/create', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const data = await response.json();
        
        if (response.ok && data.link) {
          mayarCheckoutUrl = data.link;
        } else if (response.ok && data.data && data.data.link) {
          mayarCheckoutUrl = data.data.link;
        } else {
          console.error("Mayar API error details:", data);
        }
      } catch (err) {
        console.error("Gagal menghubungi Mayar API:", err);
      }
    } else {
      console.warn("MAYAR_API_KEY tidak ditemukan di environment. Menggunakan fallback URL.");
    }

    return { 
      success: true, 
      redirectUrl: mayarCheckoutUrl,
      message: 'Mengarahkan ke pembayaran otomatis...'
    };
  } catch (error: any) {
    console.error('Failed to create order:', error);
    return { error: 'Terjadi kesalahan saat membuat pesanan' };
  }
}
