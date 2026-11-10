'use client';
import { LogOut, Search, Bell, Menu, X } from 'lucide-react';
import { signOut } from 'next-auth/react';
import NotificationBell from './NotificationBell';
import Logo from '@/components/Logo';
import { useDashboardNav } from './dashboard/DashboardNavContext';

export default function Navbar({ session, userDb }: { session?: any, userDb?: any }) {
  const { isMobileMenuOpen, toggleMobileMenu } = useDashboardNav();
  const name = userDb?.name || session?.user?.name || 'Logaritma Admin';
  const initials = name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase();
  const cowayId = userDb?.cowayId || session?.user?.cowayId || 'CWY-99812';
  const imageUrl = userDb?.image;

  // Format today's date in Indonesian like reference image "Friday, December 15th 2023"
  const today = new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date());

  return (
    <header className="bg-[#F4F6FA]/95 backdrop-blur-md border-b border-slate-200/80 h-20 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-30 transition-all shadow-2xs">
      
      {/* Left: Mobile Hamburger & Title & Date */}
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? 'Tutup Menu' : 'Buka Menu'}
          className="md:hidden w-10 h-10 rounded-full bg-white border border-slate-200/80 shadow-2xs hover:bg-slate-50 text-slate-700 flex items-center justify-center transition cursor-pointer"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div>
          <div className="flex items-center gap-2 sm:gap-3">
            <h1 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight leading-none">
              Dashboard Performa
            </h1>
            <span className="hidden sm:inline-block px-2.5 py-0.5 bg-sky-50 text-[#00A3E0] border border-sky-200 rounded-full text-[11px] font-black uppercase tracking-wider">
              Health Planner
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium capitalize mt-1 hidden sm:block">
            {today}
          </p>
        </div>
      </div>

      {/* Right: Quick Tools & Profile Card (Matching Reference Image 2 Top-Right) */}
      <div className="flex items-center gap-2 sm:gap-4">
        
        {/* Search Circular Button */}
        <button 
          type="button"
          onClick={() => {
            const input = document.getElementById('dashboard-search-trigger');
            if (input) input.focus();
          }}
          className="w-10 h-10 rounded-full bg-white border border-slate-200/80 shadow-2xs hover:shadow-sm text-slate-500 hover:text-slate-900 flex items-center justify-center transition cursor-pointer"
          title="Pencarian"
        >
          <Search size={18} />
        </button>

        {/* Notification Bell */}
        <div className="w-10 h-10 rounded-full bg-white border border-slate-200/80 shadow-2xs hover:shadow-sm flex items-center justify-center transition">
          <NotificationBell />
        </div>

        {/* User Profile Pill (Matching Reference Profile Card) */}
        <div className="flex items-center gap-2.5 sm:gap-3 bg-white border border-slate-200/80 shadow-2xs py-1.5 px-2.5 sm:px-3 rounded-full">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={name} 
              className="w-8 h-8 rounded-full object-cover border border-[#00A3E0]/30" 
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#00A3E0] to-blue-600 text-white flex items-center justify-center font-black text-xs shadow-xs">
              {initials}
            </div>
          )}

          <div className="text-left hidden md:block">
            <p className="text-xs font-black text-slate-900 leading-tight">
              {name}
            </p>
            <p className="text-[10px] text-slate-400 font-semibold leading-none mt-0.5">
              Coway ID: {cowayId}
            </p>
          </div>

          <button 
            onClick={() => signOut({ callbackUrl: '/login' })} 
            className="p-1 text-slate-400 hover:text-rose-500 transition cursor-pointer" 
            title="Keluar"
          >
            <LogOut size={16} />
          </button>
        </div>

      </div>

    </header>
  );
}
