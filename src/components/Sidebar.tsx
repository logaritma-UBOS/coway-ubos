'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Globe, Megaphone, Clapperboard, LogOut, UserCircle, Users, ShieldAlert, ShoppingCart, Menu, X } from 'lucide-react';
import { signOut } from 'next-auth/react';
import Logo from '@/components/Logo';
import { motion, AnimatePresence } from 'framer-motion';

export default function Sidebar({ isAdmin = false }: { isAdmin?: boolean }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);
  
  const navItems = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Daftar Leads', href: '/dashboard/leads', icon: Users },
    { name: 'Landing Page', href: '/dashboard/landingpage', icon: Globe },
    { name: 'Marketplace', href: '/dashboard/store', icon: ShoppingCart },
    { name: 'Meta Ads', href: '/dashboard/meta-ads', icon: Megaphone },
    { name: 'Creative Assets', href: '/dashboard/creative-assets', icon: Clapperboard },
    { name: 'Profile', href: '/dashboard/profile', icon: UserCircle },
  ];

  if (isAdmin) {
    navItems.push({ name: 'Super Admin', href: '/admin', icon: ShieldAlert as any });
  }

  // Mobile Bottom Nav items (Primary)
  const primaryMobileNav = [
    navItems[0], // Overview
    navItems[1], // Leads
    navItems[2], // Landing Page
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-72 bg-[#0F172A] text-slate-300 flex-col h-screen sticky top-0 z-50 shadow-2xl">
        <div className="p-6">
          <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Logo className="w-8 h-8" />
            <span className="text-[#00A3E0]">Coway</span> Logaritma
          </h2>
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">Agent Operating System</p>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link 
                key={item.name} 
                href={item.href} 
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
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-[#0F172A] border-t border-slate-800 flex justify-around px-2 py-2 z-50 pb-safe">
        {primaryMobileNav.map((item) => {
          const isActive = pathname === item.href && !isMobileMenuOpen;
          const Icon = item.icon;
          return (
            <Link 
              key={item.name} 
              href={item.href} 
              className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all w-full ${
                isActive ? 'text-[#00A3E0]' : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              <div className={`p-1.5 rounded-lg mb-1 ${isActive ? 'bg-[#00A3E0]/20' : ''}`}>
                <Icon size={20} className={isActive ? 'text-[#00A3E0]' : 'text-slate-400'} />
              </div>
              <span className="text-[10px] font-medium text-center leading-tight">
                {item.name}
              </span>
            </Link>
          );
        })}
        {/* Menu Toggle */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all w-full ${
            isMobileMenuOpen ? 'text-[#00A3E0]' : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          <div className={`p-1.5 rounded-lg mb-1 ${isMobileMenuOpen ? 'bg-[#00A3E0]/20' : ''}`}>
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </div>
          <span className="text-[10px] font-medium text-center leading-tight">
            Menu
          </span>
        </button>
      </nav>

      {/* Mobile Full Screen Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className="md:hidden fixed inset-0 z-40 bg-[#0F172A] flex flex-col pb-24 pt-8 px-6 overflow-y-auto"
          >
            <div className="flex items-center gap-2 mb-8 mt-4">
              <Logo className="w-8 h-8" />
              <span className="text-2xl font-black text-white tracking-tight"><span className="text-[#00A3E0]">Coway</span> Logaritma</span>
            </div>
            
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-4">Semua Menu</p>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link 
                    key={item.name} 
                    href={item.href}
                    className={`flex flex-col p-4 rounded-2xl border ${
                      isActive ? 'bg-[#00A3E0]/10 border-[#00A3E0]/30 text-white' : 'bg-slate-800/50 border-slate-700/50 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <Icon size={24} className={`mb-3 ${isActive ? 'text-[#00A3E0]' : 'text-slate-400'}`} />
                    <span className="font-semibold text-sm">{item.name}</span>
                  </Link>
                );
              })}
            </div>

            <button 
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="mt-auto w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-red-500/10 text-red-400 font-bold border border-red-500/20"
            >
              <LogOut size={20} />
              Keluar Akun
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
