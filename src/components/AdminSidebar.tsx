'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShieldCheck, LayoutDashboard, Users, CreditCard, PieChart, Clapperboard, ArrowLeft, Megaphone, Bell, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navItems = [
    { name: 'Dashboard', href: '/admin-logaritma', icon: LayoutDashboard },
    { name: 'Data Agen', href: '/admin-logaritma/users', icon: Users },
    { name: 'Transaksi', href: '/admin-logaritma/orders', icon: CreditCard },
    { name: 'Rekap Leads', href: '/admin-logaritma/leads', icon: PieChart },
    { name: 'Creative Assets', href: '/admin-logaritma/creative-assets', icon: Clapperboard },
    { name: 'Meta Ads', href: '/admin-logaritma/meta-ads', icon: Megaphone },
    { name: 'Notifikasi', href: '/admin-logaritma/notifications', icon: Bell },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white flex-col hidden md:flex shadow-2xl z-20 h-screen sticky top-0">
        <div className="p-6 border-b border-slate-700/50 flex items-center gap-3">
          <ShieldCheck className="text-rose-500 min-w-max" size={28} />
          <h1 className="text-xl font-black text-white tracking-tight leading-none">Logaritma<br/><span className="text-rose-500 text-lg">Admin</span></h1>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map(item => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link 
                key={item.href}
                href={item.href} 
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium ${
                  isActive ? 'bg-rose-500/20 text-rose-400' : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon size={18}/> {item.name}
              </Link>
            )
          })}
        </nav>
        <div className="p-4 border-t border-slate-700/50">
          <Link href="/dashboard" className="flex justify-center items-center gap-2 w-full px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl transition font-medium text-sm text-slate-300">
            <ArrowLeft size={16}/> Agen Area
          </Link>
        </div>
      </aside>

      {/* Mobile Top Navbar (Replaces the flex header somewhat) */}
      <div className="md:hidden flex items-center justify-between bg-slate-900 text-white h-16 px-4 sticky top-0 z-40 shadow-md">
        <div className="flex items-center gap-2">
          <ShieldCheck className="text-rose-500" size={24} />
          <h1 className="text-lg font-black tracking-tight">Logaritma<span className="text-rose-500">Admin</span></h1>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Full Screen Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className="md:hidden fixed inset-0 z-50 bg-slate-900 flex flex-col h-screen overflow-hidden"
          >
            <div className="h-16 border-b border-slate-800 flex items-center justify-between px-4 shrink-0">
               <div className="flex items-center gap-2">
                <ShieldCheck className="text-rose-500" size={24} />
                <h1 className="text-lg font-black tracking-tight text-white">Logaritma<span className="text-rose-500">Admin</span></h1>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition">
                <X size={24} />
              </button>
            </div>
            
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              {navItems.map(item => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link 
                    key={item.href}
                    href={item.href} 
                    className={`flex items-center gap-3 px-4 py-4 rounded-xl transition font-medium ${
                      isActive ? 'bg-rose-500/20 text-rose-400 border border-rose-500/20' : 'text-slate-300 bg-slate-800/50 hover:bg-slate-800'
                    }`}
                  >
                    <Icon size={20}/> {item.name}
                  </Link>
                )
              })}
            </nav>

            <div className="p-6 border-t border-slate-800 shrink-0 bg-slate-900">
               <Link href="/dashboard" className="flex justify-center items-center gap-2 w-full px-4 py-4 bg-slate-800 hover:bg-slate-700 rounded-xl transition font-bold text-white shadow-lg">
                <ArrowLeft size={18}/> Kembali ke Agen Area
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
