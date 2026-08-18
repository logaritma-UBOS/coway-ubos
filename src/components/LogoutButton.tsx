'use client';

import { signOut } from 'next-auth/react';

export default function LogoutButton() {
  return (
    <button 
      onClick={() => signOut({ callbackUrl: '/login' })}
      className="w-full text-left px-4 py-2 text-red-400 hover:bg-slate-800 rounded-lg transition"
    >
      <i className="fa-solid fa-arrow-right-from-bracket mr-2"></i> Logout
    </button>
  );
}
