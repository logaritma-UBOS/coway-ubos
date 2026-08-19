'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as LucideIcons from 'lucide-react';
import { signOut } from 'next-auth/react';

export default function Sidebar({ isAdmin = false, dynamicMenus = [] }: { isAdmin?: boolean, dynamicMenus?: any[] }) {
  const pathname = usePathname();
  
  const navItems: any[] = dynamicMenus.length > 0 ? dynamicMenus.map(m => ({
    name: m.name,
    href: m.href,
    icon: (LucideIcons as any)[m.iconName] || LucideIcons.Circle,
    isExternal: m.href.startsWith('http')
  })) : [
    { name: 'Overview', href: '/dashboard', icon: LucideIcons.LayoutDashboard },
    { name: 'Daftar Leads', href: '/dashboard/leads', icon: LucideIcons.Users },
  ]; // fallback

  if (isAdmin) {
    navItems.push({ name: 'Super Admin', href: '/admin', icon: LucideIcons.ShieldAlert as any });
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-72 bg-[#0F172A] text-slate-300 flex-col h-screen sticky top-0 z-50 shadow-2xl">
        <div className="p-6">
          <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span className="text-[#00A3E0]">Coway</span> UBOS
          </h2>
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">Agent Member Area</p>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link 
                key={item.name} 
                href={item.href} 
                target={item.isExternal ? '_blank' : undefined}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium ${
                  isActive 
                    ? 'bg-[#00A3E0]/10 text-[#00A3E0]' 
                    : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon size={20} className={isActive ? 'text-[#00A3E0]' : 'text-slate-400'} />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button onClick={() => signOut({ callbackUrl: '/login' })} className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-slate-800 rounded-xl transition font-medium text-left">
            <LucideIcons.LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-[#0F172A] border-t border-slate-800 flex justify-between px-2 py-2 z-50 pb-safe overflow-x-auto">
        <div className="flex gap-2 min-w-max">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link 
              key={item.name} 
              href={item.href} 
              target={item.isExternal ? '_blank' : undefined}
              className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all w-20 ${
                isActive ? 'text-[#00A3E0]' : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              <div className={`p-1.5 rounded-lg mb-1 ${isActive ? 'bg-[#00A3E0]/20' : ''}`}>
                <Icon size={20} className={isActive ? 'text-[#00A3E0]' : 'text-slate-400'} />
              </div>
              <span className="text-[10px] font-medium text-center leading-tight whitespace-nowrap overflow-hidden text-ellipsis w-full">
                {item.name}
              </span>
            </Link>
          );
        })}
        </div>
      </nav>
    </>
  );
}
