import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";

export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session?.user || !(session.user as any).isAdmin) {
    redirect("/admin-login");
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      <AdminSidebar />
      <main className="flex-1 overflow-x-hidden flex flex-col min-w-0">
        <header className="hidden md:flex h-16 bg-white border-b border-slate-200 items-center px-8 shadow-sm justify-between z-10 sticky top-0">
          <h2 className="font-bold text-slate-800">Super Admin Panel</h2>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-500">{session?.user?.name || "Admin"}</span>
            <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 font-bold">SA</div>
          </div>
        </header>
        <div className="p-4 md:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
