import prisma from "@/lib/prisma";
import MenuClientManager from "./MenuClientManager";

export default async function MenusPage() {
  const menus = await prisma.featureMenu.findMany({
    orderBy: { order: 'asc' }
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 mb-2">Manajemen Menu Fitur</h1>
        <p className="text-slate-500">Atur menu fitur yang tampil di bilah sisi (sidebar) dashboard agen. Anda bisa menambahkan tautan eksternal (misal Google Drive, Telegram, Canva) atau fitur internal baru.</p>
      </div>
      <MenuClientManager initialMenus={menus} />
    </div>
  );
}
