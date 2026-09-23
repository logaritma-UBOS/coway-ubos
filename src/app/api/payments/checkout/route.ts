import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions, prisma } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { packageId, name, price } = await req.json();

    if (!packageId || !name || !price) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    // Ensure the service exists in the DB
    let service = await prisma.service.findFirst({
      where: { title: name }
    });

    if (!service) {
      service = await prisma.service.create({
        data: {
          title: name,
          description: `Pembelian paket ${name}`,
          price: price,
          isActive: true,
        }
      });
    }

    // Create the order
    const order = await prisma.order.create({
      data: {
        agentId: (session.user as any).id,
        serviceId: service.id,
        amount: price,
        status: 'PENDING',
      }
    });

    const MAYAR_API_KEY = process.env.MAYAR_API_KEY;

    if (!MAYAR_API_KEY) {
      // Mock mode if API key is not set
      console.warn('MAYAR_API_KEY is not set. Simulating Mayar Checkout Link.');
      
      return NextResponse.json({
        link: `/dashboard/store?mock_payment=true&order_id=${order.id}`,
        orderId: order.id
      });
    }

    // Real Mayar API Call
    // Adjust endpoint and payload according to the actual Mayar API documentation
    const mayarResponse = await fetch('https://api.mayar.id/hl/v1/payment/create', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MAYAR_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: session.user.name || 'Agent Coway',
        email: session.user.email,
        amount: price,
        description: `Pembayaran: ${name}`,
        reference_id: order.id, // Important for webhook matching
      })
    });

    if (!mayarResponse.ok) {
      const errData = await mayarResponse.json();
      console.error('Mayar API Error:', errData);
      throw new Error('Gagal menghubungi Payment Gateway Mayar');
    }

    const mayarData = await mayarResponse.json();

    // Assuming Mayar returns the checkout link in `data.link`
    return NextResponse.json({
      link: mayarData.data?.link || mayarData.link,
      orderId: order.id
    });

  } catch (error: any) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
