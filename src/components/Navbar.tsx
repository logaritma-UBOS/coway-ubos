'use client';
import { Bell, LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

export default function Navbar({ session, userDb }: { session?: any, userDb?: any }) {
  const name = userDb?.name || session?.user?.name || 'Budi Santoso';
  const initials = name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase();
  const cowayId = userDb?.cowayId || session?.user?.cowayId || 'CWY-99812';
  const imageUrl = userDb?.image;

  return (
    <header className="bg-white border-b border-slate-200 h-20 flex items-center justify-between px-8 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold text-slate-800 hidden md:block">Dashboard</h1>
        <div className="md:hidden font-black text-xl tracking-tight flex items-center gap-1">
          <span className="text-[#00A3E0]">Coway</span> UBOS
        </div>
      </div>
      <div className="flex items-center gap-6">
        <button className="relative p-2 text-slate-400 hover:text-[#00A3E0] transition">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <div className="flex items-center gap-3 border-l border-slate-200 pl-6">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-800">{name}</p>
            <p className="text-xs text-slate-500">Coway ID: {cowayId}</p>
          </div>
          {imageUrl ? (
            <img src={imageUrl} alt={name} className="w-10 h-10 rounded-full object-cover border-2 border-[#00A3E0]/20" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-[#00A3E0]/10 text-[#00A3E0] flex items-center justify-center font-bold">
              {initials}
            </div>
          )}
          <button onClick={() => signOut({ callbackUrl: '/login' })} className="ml-2 p-2 text-slate-400 hover:text-red-500 transition" title="Logout">
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
