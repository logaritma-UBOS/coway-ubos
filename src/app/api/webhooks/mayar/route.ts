import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/auth';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-mayar-signature');

    // Webhook validation if webhook secret is provided
    const WEBHOOK_SECRET = process.env.MAYAR_WEBHOOK_SECRET;
    if (WEBHOOK_SECRET && signature) {
      const expectedSignature = crypto
        .createHmac('sha256', WEBHOOK_SECRET)
        .update(rawBody)
        .digest('hex');

      if (signature !== expectedSignature) {
        console.error('Invalid Webhook Signature');
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      }
    }

    const payload = JSON.parse(rawBody);

    // Mayar webhook structure usually has event type in `event` or `status`
    // Assuming 'payment.success' or similar
    if (payload.status === 'success' || payload.event === 'payment.success') {
      const orderId = payload.data?.reference_id || payload.reference_id;
      
      if (!orderId) {
        return NextResponse.json({ error: 'No reference_id found' }, { status: 400 });
      }

      // Find the order
      const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: { service: true, agent: true }
      });

      if (!order) {
        return NextResponse.json({ error: 'Order not found' }, { status: 404 });
      }

      if (order.status === 'PAID' || order.status === 'COMPLETED') {
        return NextResponse.json({ message: 'Order already processed' }, { status: 200 });
      }

      // 1. Update Order Status
      await prisma.order.update({
        where: { id: order.id },
        data: {
          status: 'PAID',
          paymentRef: payload.data?.id || payload.transaction_id || 'mayar_ref',
        }
      });

      // 2. Automated Provisioning based on Service Title
      const serviceTitle = order.service.title.toLowerCase();

      // If it's the Logaritma System Package, upgrade the user to Premium
      if (serviceTitle.includes('sistem logaritma') || serviceTitle.includes('premium') || serviceTitle.includes('lp') || serviceTitle.includes('landing page')) {
        let updateData: any = { isPremium: true };
        
        if (serviceTitle.includes('produk') || serviceTitle.includes('bundling')) {
          updateData.hasProductLp = true;
        }
        if (serviceTitle.includes('rekrutmen') || serviceTitle.includes('bundling')) {
          updateData.hasRecruitLp = true;
        }
        
        await prisma.user.update({
          where: { id: order.agentId },
          data: updateData
        });
      }

      // If it's a Meta Ads package, create a MetaCampaign entry
      if (serviceTitle.includes('meta ads')) {
        await prisma.metaCampaign.create({
          data: {
            orderId: order.id,
            agentId: order.agentId,
            durationDays: 30, // Default 30 days
            status: 'PENDING', // Admin needs to review and start it
          }
        });
      }

      // 3. Create Notification for the User
      await prisma.notification.create({
        data: {
          userId: order.agentId,
          title: 'Pembayaran Berhasil',
          message: `Pembayaran untuk ${order.service.title} telah berhasil dikonfirmasi. Layanan Anda kini sedang diproses atau sudah aktif.`,
          type: 'SUCCESS',
        }
      });

      return NextResponse.json({ message: 'Webhook processed successfully' }, { status: 200 });
    }

    return NextResponse.json({ message: 'Event ignored' }, { status: 200 });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
