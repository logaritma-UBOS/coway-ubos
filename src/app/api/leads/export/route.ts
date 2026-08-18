import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions, prisma } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !(session.user as any).id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const userId = (session.user as any).id;

    // Fetch all leads for this agent
    const leads = await prisma.lead.findMany({
      where: { agentId: userId },
      orderBy: { createdAt: 'desc' },
    });

    // Generate CSV string
    const headers = ['Tanggal', 'Nama Calon', 'Nomor WA', 'Kota', 'Produk', 'Status'];
    const rows = leads.map((lead) => {
      return [
        new Date(lead.createdAt).toISOString(),
        lead.customerName,
        lead.whatsappNumber,
        lead.city || '-',
        lead.targetProduct || 'Umum',
        lead.status,
      ].map(val => `"${val}"`).join(',');
    });

    const csvContent = [headers.join(','), ...rows].join('\n');

    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="leads_coway_ubos.csv"',
      },
    });
  } catch (error) {
    console.error('Export CSV error:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}
