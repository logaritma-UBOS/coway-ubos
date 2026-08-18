import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import LogoutButton from '@/components/LogoutButton';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white tracking-tight">Coway UBOS</h2>
          <p className="text-xs text-slate-500 mt-1">Agent Member Area</p>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <Link href="/dashboard" className="block px-4 py-2 rounded-lg hover:bg-slate-800 hover:text-white transition">Overview</Link>
          <Link href="/profile" className="block px-4 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 hover:text-white transition">Profile & Link</Link>
          <Link href="/analytics" className="block px-4 py-2 rounded-lg hover:bg-slate-800 hover:text-white transition">Analytics</Link>
          <Link href="/services" className="block px-4 py-2 rounded-lg hover:bg-slate-800 hover:text-white transition">Marketing Services</Link>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
