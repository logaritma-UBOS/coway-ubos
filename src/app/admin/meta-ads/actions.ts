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
  
  let service = await prisma.service.findFirst({ where: { title: 'Meta Ads Management (7 Hari)' } });
  if (!service) {
    service = await prisma.service.create({
      data: { title: 'Meta Ads Management (7 Hari)', description: 'Mock', price: 350000 }
    });
  }

  await prisma.order.create({
    data: {
      agentId: (session.user as any).id,
      serviceId: service.id,
      status: 'PAID',
      amount: 350000
    }
  });

  revalidatePath('/dashboard/meta-ads');
  revalidatePath('/admin/meta-ads');
}
