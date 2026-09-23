'use server';

import { getServerSession } from 'next-auth';
import { authOptions, prisma } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function addManualLeads(leads: { name: string, phone: string, city: string, product: string }[]) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user || !(session.user as any).id) {
      return { error: 'Unauthorized' };
    }

    const userId = (session.user as any).id;

    if (!leads || leads.length === 0) {
      return { error: 'Data lead kosong' };
    }

    // Format WA numbers and prepare data
    const newLeads = leads.map(l => {
      let formattedPhone = l.phone.replace(/\D/g, '');
      if (formattedPhone.startsWith('0')) {
        formattedPhone = '62' + formattedPhone.substring(1);
      }
      return {
        agentId: userId,
        customerName: l.name || 'Tanpa Nama',
        whatsappNumber: formattedPhone || '-',
        city: l.city || 'Tidak diketahui',
        targetProduct: l.product || 'Umum',
        status: 'NEW'
      };
    });

    await prisma.lead.createMany({
      data: newLeads,
    });

    revalidatePath('/dashboard/leads');
    revalidatePath('/dashboard');
    
    return { success: true, message: `${newLeads.length} Lead berhasil ditambahkan!` };
  } catch (error: any) {
    console.error('Failed to add manual leads:', error);
    return { error: 'Terjadi kesalahan pada server saat menambah lead' };
  }
}
