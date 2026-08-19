import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function AdminUsers() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <h1 className="text-3xl font-black text-slate-900 mb-8">Data Agen</h1>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-4 font-bold text-slate-700">Nama Agen</th>
              <th className="p-4 font-bold text-slate-700">Email</th>
              <th className="p-4 font-bold text-slate-700">WhatsApp</th>
              <th className="p-4 font-bold text-slate-700">Status</th>
              <th className="p-4 font-bold text-slate-700">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="p-4 font-medium text-slate-900">{user.name || '-'}</td>
                <td className="p-4 text-slate-600">{user.email}</td>
                <td className="p-4 text-slate-600">{user.whatsappNumber || '-'}</td>
                <td className="p-4">
                  {user.isPremium ? (
                    <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">Premium</span>
                  ) : (
                    <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold">Basic</span>
                  )}
                </td>
                <td className="p-4">
                  {user.slug && (
                    <a href={"/${user.slug}"} target="_blank" className="text-[#00A3E0] font-bold hover:underline">Lihat LP</a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
