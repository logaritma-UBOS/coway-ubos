'use server';
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addMenu(data: { name: string, href: string, iconName: string, order: number }) {
  await prisma.featureMenu.create({ data: { ...data, isActive: true } });
  revalidatePath('/dashboard');
  revalidatePath('/admin/menus');
}

export async function editMenu(id: string, data: { name: string, href: string, iconName: string, order: number, isActive: boolean }) {
  await prisma.featureMenu.update({ where: { id }, data });
  revalidatePath('/dashboard');
  revalidatePath('/admin/menus');
}

export async function deleteMenu(id: string) {
  await prisma.featureMenu.delete({ where: { id } });
  revalidatePath('/dashboard');
  revalidatePath('/admin/menus');
}
