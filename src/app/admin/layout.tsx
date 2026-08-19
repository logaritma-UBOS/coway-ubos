import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session || !(session.user as any).isAdmin) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="w-64 bg-slate-900 text-white flex flex-col hidden md:flex">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-black text-white tracking-tight">UBOS<span className="text-[#00A3E0]">Admin</span></h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="block px-4 py-3 rounded-xl hover:bg-slate-800 transition font-medium">Dashboard</Link>
          <Link href="/admin/users" className="block px-4 py-3 rounded-xl hover:bg-slate-800 transition font-medium">Data Agen</Link>
          <Link href="/admin/orders" className="block px-4 py-3 rounded-xl hover:bg-slate-800 transition font-medium">Transaksi</Link>
          <Link href="/admin/leads" className="block px-4 py-3 rounded-xl hover:bg-slate-800 transition font-medium">Rekap Leads</Link>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <Link href="/dashboard" className="block text-center text-sm text-slate-400 hover:text-white transition">Kembali ke Agen Area</Link>
        </div>
      </aside>
      <main className="flex-1 overflow-auto p-8">
        {children}
      </main>
    </div>
  );
}
