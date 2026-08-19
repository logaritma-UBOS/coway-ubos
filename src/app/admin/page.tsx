import prisma from "@/lib/prisma";
import { Users, Crown, Target, Banknote } from "lucide-react";

export default async function AdminDashboard() {
  const totalAgents = await prisma.user.count();
  const premiumAgents = await prisma.user.count({ where: { isPremium: true } });
  const totalLeads = await prisma.lead.count();
  const totalOrders = await prisma.order.count();

  const recentUsers = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5
  });

  const recentOrders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: { agent: true, service: true },
    take: 5
  });
  return (
    <div>
      <h1 className="text-3xl font-black text-slate-900 mb-2">Overview</h1>
      <p className="text-slate-500 mb-8">Pantau seluruh aktivitas platform agen Coway Anda.</p>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition border border-slate-200 flex items-start gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Users size={24}/></div>
          <div>
            <p className="text-sm font-bold text-slate-500 mb-1">Total Agen</p>
            <p className="text-3xl font-black text-slate-900">{totalAgents}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition border border-slate-200 flex items-start gap-4">
          <div className="p-3 bg-rose-50 text-rose-600 rounded-xl"><Crown size={24}/></div>
          <div>
            <p className="text-sm font-bold text-slate-500 mb-1">Agen Premium</p>
            <p className="text-3xl font-black text-slate-900">{premiumAgents}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition border border-slate-200 flex items-start gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><Target size={24}/></div>
          <div>
            <p className="text-sm font-bold text-slate-500 mb-1">Total Leads</p>
            <p className="text-3xl font-black text-slate-900">{totalLeads}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition border border-slate-200 flex items-start gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><Banknote size={24}/></div>
          <div>
            <p className="text-sm font-bold text-slate-500 mb-1">Transaksi</p>
            <p className="text-3xl font-black text-slate-900">{totalOrders}</p>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Agen Pendaftar Terbaru</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-slate-500">
                  <th className="pb-3 font-medium">Nama</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium text-right">Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map(user => (
                  <tr key={user.id} className="border-b border-slate-50 last:border-0">
                    <td className="py-3 font-medium text-slate-900">{user.name || user.email}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold ${user.isPremium ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>
                        {user.isPremium ? 'PREMIUM' : 'BASIC'}
                      </span>
                    </td>
                    <td className="py-3 text-right text-slate-500">
                      {new Date(user.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                    </td>
                  </tr>
                ))}
                {recentUsers.length === 0 && <tr><td colSpan={3} className="py-4 text-center text-slate-500">Belum ada agen</td></tr>}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Transaksi Terbaru</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-slate-500">
                  <th className="pb-3 font-medium">Agen</th>
                  <th className="pb-3 font-medium">Layanan</th>
                  <th className="pb-3 font-medium text-right">Nominal</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(order => (
                  <tr key={order.id} className="border-b border-slate-50 last:border-0">
                    <td className="py-3 font-medium text-slate-900">{order.agent.name || 'Agen'}</td>
                    <td className="py-3 text-slate-600 truncate max-w-[150px]">{order.service.title}</td>
                    <td className="py-3 text-right font-mono font-bold text-slate-900">
                      Rp {Number(order.amount).toLocaleString('id-ID')}
                    </td>
                  </tr>
                ))}
                {recentOrders.length === 0 && <tr><td colSpan={3} className="py-4 text-center text-slate-500">Belum ada transaksi</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
