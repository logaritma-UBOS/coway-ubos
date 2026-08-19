import prisma from "@/lib/prisma";
import { Users, Crown, Target, Banknote } from "lucide-react";

export default async function AdminDashboard() {
  const totalAgents = await prisma.user.count();
  const premiumAgents = await prisma.user.count({ where: { isPremium: true } });
  const totalLeads = await prisma.lead.count();
  const totalOrders = await prisma.order.count();

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
    </div>
  );
}
