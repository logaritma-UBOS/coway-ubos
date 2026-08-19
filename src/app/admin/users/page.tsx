import prisma from "@/lib/prisma";
import UserClientManager from "./UserClientManager";

export default async function AdminUsers() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <h1 className="text-3xl font-black text-slate-900 mb-8">Data Agen</h1>
      <UserClientManager initialUsers={users} />
    </div>
  );
}
