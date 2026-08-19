import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, LayoutDashboard, Users, CreditCard, PieChart, Clapperboard, ArrowLeft, Megaphone, Bell } from "lucide-react";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session?.user || !(session.user as any).isAdmin) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white flex flex-col hidden md:flex shadow-2xl z-20">
        <div className="p-6 border-b border-slate-700/50 flex items-center gap-3">
          <ShieldCheck className="text-rose-500" size={28} />
          <h1 className="text-xl font-black text-white tracking-tight">UBOS<span className="text-rose-500">Admin</span></h1>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition font-medium text-slate-300 hover:text-white"><LayoutDashboard size={18}/> Dashboard</Link>
          <Link href="/admin/users" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition font-medium text-slate-300 hover:text-white"><Users size={18}/> Data Agen</Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition font-medium text-slate-300 hover:text-white"><CreditCard size={18}/> Transaksi</Link>
          <Link href="/admin/leads" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition font-medium text-slate-300 hover:text-white"><PieChart size={18}/> Rekap Leads</Link>
          <Link href="/admin/creative-assets" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition font-medium text-slate-300 hover:text-white"><Clapperboard size={18}/> Creative Assets</Link>
          <Link href="/admin/meta-ads" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition font-medium text-slate-300 hover:text-white"><Megaphone size={18}/> Manajemen Meta Ads</Link>
          <Link href="/admin/notifications" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition font-medium text-slate-300 hover:text-white"><Bell size={18}/> Notifikasi</Link>
        </nav>
        <div className="p-4 border-t border-slate-700/50">
          <Link href="/dashboard" className="flex justify-center items-center gap-2 w-full px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl transition font-medium text-sm text-slate-300">
            <ArrowLeft size={16}/> Kembali ke Agen Area
          </Link>
        </div>
      </aside>
      <main className="flex-1 overflow-auto flex flex-col">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-8 shadow-sm justify-between z-10">
          <h2 className="font-bold text-slate-800">Super Admin Panel</h2>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-500">{session?.user?.name || "Admin"}</span>
            <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 font-bold">SA</div>
          </div>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
