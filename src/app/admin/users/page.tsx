import prisma from "@/lib/prisma";
import UserClientManager from "./UserClientManager";
import BroadcastManager from "./BroadcastManager";

export const metadata = {
  title: 'Data Agen | Admin',
};

export default async function AdminUsers() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-black text-slate-900">Data Agen</h1>
        <BroadcastManager />
      </div>
      <UserClientManager initialUsers={users} />
    </div>
  );
}
