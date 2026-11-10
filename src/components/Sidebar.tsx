'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Globe, 
  Megaphone, 
  Clapperboard, 
  LogOut, 
  UserCircle, 
  Users, 
  FileText,
  MessageCircle,
  Menu, 
  X,
  Sparkles,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { signOut } from 'next-auth/react';
import Logo from '@/components/Logo';
import { motion, AnimatePresence } from 'framer-motion';

export default function Sidebar({ isAdmin = false }: { isAdmin?: boolean }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const menuSections = [
    {
      title: 'MENU UTAMA',
      items: [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Landing Page', href: '/dashboard/landingpage', icon: Globe },
        { name: 'Daftar Leads', href: '/dashboard/leads', icon: Users },
        { name: 'Sales Kit & Skrip', href: '/dashboard/sales-kit', icon: FileText },
      ]
    },
    {
      title: 'MARKETING & IKLAN',
      items: [
        { name: 'Meta Ads', href: '/dashboard/meta-ads', icon: Megaphone },
        { name: 'Creative Assets', href: '/dashboard/creative-assets', icon: Clapperboard },
      ]
    },
    {
      title: 'PENGATURAN',
      items: [
        { name: 'Profil & WhatsApp', href: '/dashboard/profile', icon: UserCircle },
      ]
    }
  ];

  return (
    <>
      {/* Desktop Sidebar (Clean White Style Matching Reference Image 2) */}
      <aside className="hidden md:flex w-68 bg-white border-r border-slate-200/80 text-slate-600 flex-col h-screen sticky top-0 z-40 select-none shadow-xs">
        
        {/* Brand Header */}
        <div className="p-6 pb-4">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#00A3E0] to-blue-600 flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <Logo className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-lg tracking-tight leading-none text-slate-900">
                <span className="text-[#00A3E0]">Coway</span> Logaritma
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                AGENT OPERATING SYSTEM
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Categories */}
        <div className="flex-1 px-4 py-2 space-y-6 overflow-y-auto">
          {menuSections.map((section, idx) => (
            <div key={idx} className="space-y-1">
              <p className="px-3 text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">
                {section.title}
              </p>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl transition-all font-bold text-sm ${
                        isActive
                          ? 'bg-[#00A3E0] text-white shadow-md shadow-sky-500/25'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      <Icon size={18} className={isActive ? 'text-white' : 'text-slate-400'} />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section: VIP Support Card (Matching "Upgrade Pro" card in Image 2) */}
        <div className="p-4 border-t border-slate-100 space-y-3">
          <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 rounded-2xl p-4 text-white shadow-lg shadow-slate-900/10 relative overflow-hidden">
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-[#00A3E0]/20 rounded-full blur-xl pointer-events-none" />
            
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-[#00A3E0] flex items-center justify-center text-white">
                <Sparkles size={14} />
              </div>
              <span className="text-xs font-black uppercase tracking-wider text-sky-300">
                Support VIP
              </span>
            </div>

            <p className="text-[11px] text-slate-300 leading-relaxed font-medium mb-3">
              Konsultasi closing &amp; optimasi iklan Meta Ads bersama Mentor.
            </p>

            <a
              href="https://wa.me/6285179660408?text=Halo%20Mentor%20Coway%20Logaritma,%20saya%20ingin%20konsultasi%20strategi%20closing%20dan%20iklan."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 bg-[#00A3E0] hover:bg-sky-400 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-1.5 transition shadow-sm"
            >
              <MessageCircle size={13} />
              <span>Chat Mentor WA</span>
            </a>
          </div>

          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="flex items-center gap-2.5 w-full px-3 py-2 text-rose-500 hover:bg-rose-50 rounded-xl transition text-xs font-bold"
          >
            <LogOut size={16} />
            <span>Keluar Akun (Logout)</span>
          </button>
        </div>

      </aside>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200/80 flex justify-around px-2 py-1.5 z-50 shadow-lg">
        <Link
          href="/dashboard"
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition ${
            pathname === '/dashboard' ? 'text-[#00A3E0]' : 'text-slate-400'
          }`}
        >
          <LayoutDashboard size={20} />
          <span className="text-[10px] font-bold mt-1">Dashboard</span>
        </Link>

        <Link
          href="/dashboard/landingpage"
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition ${
            pathname === '/dashboard/landingpage' ? 'text-[#00A3E0]' : 'text-slate-400'
          }`}
        >
          <Globe size={20} />
          <span className="text-[10px] font-bold mt-1">Toko Saya</span>
        </Link>

        <Link
          href="/dashboard/leads"
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition ${
            pathname === '/dashboard/leads' ? 'text-[#00A3E0]' : 'text-slate-400'
          }`}
        >
          <Users size={20} />
          <span className="text-[10px] font-bold mt-1">Prospek</span>
        </Link>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition ${
            isMobileMenuOpen ? 'text-[#00A3E0]' : 'text-slate-400'
          }`}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          <span className="text-[10px] font-bold mt-1">Menu</span>
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
            className="md:hidden fixed inset-0 z-40 bg-white flex flex-col pb-24 pt-6 px-6 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Logo className="w-7 h-7 text-[#00A3E0]" />
                <span className="text-xl font-black text-slate-900 tracking-tight">
                  <span className="text-[#00A3E0]">Coway</span> Logaritma
                </span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-xl bg-slate-100 text-slate-600"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-6">
              {menuSections.map((section, idx) => (
                <div key={idx} className="space-y-2">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                    {section.title}
                  </p>
                  <div className="grid grid-cols-2 gap-2.5">
                    {section.items.map((item) => {
                      const isActive = pathname === item.href;
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={`flex items-center gap-2.5 p-3 rounded-2xl border text-xs font-bold ${
                            isActive
                              ? 'bg-[#00A3E0] text-white border-[#00A3E0]'
                              : 'bg-slate-50 border-slate-200 text-slate-700'
                          }`}
                        >
                          <Icon size={16} />
                          <span>{item.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <button
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="w-full py-3 bg-rose-50 text-rose-600 font-bold text-sm rounded-2xl flex items-center justify-center gap-2"
              >
                <LogOut size={16} />
                <span>Keluar Akun</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
