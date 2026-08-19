'use server';
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function updateCampaign(id: string, data: { status: string, spentBudget: number, leadsGenerated: number, reportNotes?: string | null, reportImageUrl?: string | null, startDate?: Date | null, endDate?: Date | null }) {
  await prisma.metaCampaign.update({ where: { id }, data });
  revalidatePath('/dashboard/meta-ads');
  revalidatePath('/admin/meta-ads');
}

export async function createMockOrder() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return;
  
  const adminId = (session.user as any).id;

  let service = await prisma.service.findFirst({ where: { title: 'Meta Ads Management (7 Hari)' } });
  if (!service) {
    service = await prisma.service.create({
      data: { title: 'Meta Ads Management (7 Hari)', description: 'Mock', price: 350000 }
    });
  }

  // Create Order
  const order = await prisma.order.create({
    data: {
      agentId: adminId,
      serviceId: service.id,
      status: 'PAID',
      amount: 350000
    }
  });

  // Automatically create the MetaCampaign so it appears in Admin immediately
  await prisma.metaCampaign.create({
    data: {
      orderId: order.id,
      agentId: adminId,
      durationDays: 7,
      status: 'PENDING'
    }
  });

  revalidatePath('/dashboard/meta-ads');
  revalidatePath('/admin/meta-ads');
}
