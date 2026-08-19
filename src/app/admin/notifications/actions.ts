'use server';

import { prisma } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function sendNotification(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const message = formData.get("message") as string;
    const type = formData.get("type") as string;
    const target = formData.get("target") as string;

    if (!title || !message) {
      throw new Error("Judul dan pesan tidak boleh kosong.");
    }

    // Determine target users
    let users: { id: string }[] = [];
    if (target === "ALL") {
      users = await prisma.user.findMany({ select: { id: true } });
    } else if (target === "BASIC") {
      users = await prisma.user.findMany({ where: { isPremium: false }, select: { id: true } });
    } else if (target === "PREMIUM") {
      users = await prisma.user.findMany({ where: { isPremium: true }, select: { id: true } });
    }

    if (users.length === 0) {
      throw new Error("Tidak ada agen yang sesuai dengan kriteria target.");
    }

    // Insert notifications in bulk
    const data = users.map(user => ({
      userId: user.id,
      title,
      message,
      type
    }));

    await prisma.notification.createMany({
      data
    });

    revalidatePath('/admin/notifications');
    return { success: true, count: users.length };
  } catch (error: any) {
    return { success: false, error: error.message || "Gagal mengirim notifikasi." };
  }
}

export async function deleteNotificationByTitle(title: string) {
  try {
    // Admin might want to delete a broadcast. We delete by exact title for simplicity here.
    await prisma.notification.deleteMany({
      where: { title }
    });
    revalidatePath('/admin/notifications');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: "Gagal menghapus notifikasi." };
  }
}
