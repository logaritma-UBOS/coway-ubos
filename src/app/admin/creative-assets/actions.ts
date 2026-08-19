'use server';
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addAsset(data: { title: string, description: string, price: number, type: string, isPopular: boolean, fileUrl?: string | null, coverUrl?: string | null }) {
  await prisma.creativeAsset.create({ data });
  revalidatePath('/dashboard/creative-assets');
  revalidatePath('/admin/creative-assets');
}

export async function editAsset(id: string, data: { title: string, description: string, price: number, type: string, isPopular: boolean, fileUrl?: string | null, coverUrl?: string | null }) {
  await prisma.creativeAsset.update({ where: { id }, data });
  revalidatePath('/dashboard/creative-assets');
  revalidatePath('/admin/creative-assets');
}

export async function deleteAsset(id: string) {
  await prisma.creativeAsset.delete({ where: { id } });
  revalidatePath('/dashboard/creative-assets');
  revalidatePath('/admin/creative-assets');
}
