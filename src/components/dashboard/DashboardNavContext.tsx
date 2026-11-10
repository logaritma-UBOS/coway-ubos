'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface DashboardNavContextType {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
}

const DashboardNavContext = createContext<DashboardNavContextType>({
  isMobileMenuOpen: false,
  setIsMobileMenuOpen: () => {},
  toggleMobileMenu: () => {},
  closeMobileMenu: () => {},
});

export function DashboardNavProvider({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <DashboardNavContext.Provider
      value={{
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        toggleMobileMenu,
        closeMobileMenu,
      }}
    >
      {children}
    </DashboardNavContext.Provider>
  );
}

export function useDashboardNav() {
  const context = useContext(DashboardNavContext);
  if (!context) {
    throw new Error('useDashboardNav must be used within a DashboardNavProvider');
  }
  return context;
}
