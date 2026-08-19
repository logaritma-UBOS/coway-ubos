'use server';
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateCampaign(id: string, data: { status: string, spentBudget: number, leadsGenerated: number, reportNotes?: string | null, reportImageUrl?: string | null, startDate?: Date | null, endDate?: Date | null }) {
  await prisma.metaCampaign.update({ where: { id }, data });
  revalidatePath('/dashboard/meta-ads');
  revalidatePath('/admin/meta-ads');
}
