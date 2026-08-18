import { NextResponse } from 'next/server';
import { prisma } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { agentId } = body;

    if (!agentId) {
      return NextResponse.json({ error: 'Agent ID is required' }, { status: 400 });
    }

    // Get today's date (midnight UTC to avoid timezone mismatches if DB is UTC)
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    // Upsert analytic record for today
    await prisma.analytic.upsert({
      where: {
        agentId_date: {
          agentId: agentId,
          date: today,
        },
      },
      update: {
        pageViews: {
          increment: 1,
        },
      },
      create: {
        agentId: agentId,
        date: today,
        pageViews: 1,
        whatsappClicks: 0,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics tracking error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
