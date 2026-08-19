import prisma from "@/lib/prisma";

export default async function AdminDashboard() {
  const totalAgents = await prisma.user.count({ where: { isAdmin: undefined } as any });
  const premiumAgents = await prisma.user.count({ where: { isPremium: true } });
  const totalLeads = await prisma.lead.count();
  const totalOrders = await prisma.order.count();

  return (
    <div>
      <h1 className="text-3xl font-black text-slate-900 mb-8">Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <p className="text-sm font-bold text-slate-500 mb-1">Total Agen</p>
          <p className="text-3xl font-black text-slate-900">{totalAgents}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <p className="text-sm font-bold text-slate-500 mb-1">Agen Premium</p>
          <p className="text-3xl font-black text-[#00A3E0]">{premiumAgents}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <p className="text-sm font-bold text-slate-500 mb-1">Total Leads</p>
          <p className="text-3xl font-black text-rose-500">{totalLeads}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <p className="text-sm font-bold text-slate-500 mb-1">Total Transaksi</p>
          <p className="text-3xl font-black text-emerald-500">{totalOrders}</p>
        </div>
      </div>
    </div>
  );
}
