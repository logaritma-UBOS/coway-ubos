'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function AffiliateTracker() {
  const searchParams = useSearchParams();
  const ref = searchParams.get('ref');

  useEffect(() => {
    if (ref) {
      document.cookie = `affiliate_ref=${ref}; path=/; max-age=${60 * 60 * 24 * 30}`; // 30 hari
    }
  }, [ref]);

  return null; // Komponen tidak me-render apapun
}
