import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-300 flex flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white tracking-tight">Coway UBOS</h2>
          <p className="text-xs text-slate-500 mt-1">Agent Member Area</p>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <Link href="/dashboard" className="block px-4 py-2 rounded-lg hover:bg-slate-800 hover:text-white transition">Overview</Link>
          <Link href="/profile" className="block px-4 py-2 rounded-lg hover:bg-slate-800 hover:text-white transition">Profile & Link</Link>
          <Link href="/analytics" className="block px-4 py-2 rounded-lg hover:bg-slate-800 hover:text-white transition">Analytics</Link>
          <Link href="/services" className="block px-4 py-2 rounded-lg hover:bg-slate-800 hover:text-white transition">Marketing Services</Link>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button className="w-full text-left px-4 py-2 text-red-400 hover:bg-slate-800 rounded-lg transition">Logout</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
