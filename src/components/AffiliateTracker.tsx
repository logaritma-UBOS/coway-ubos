'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { trackAffiliateClick } from '@/lib/actions/userActions';

export default function AffiliateTracker() {
  const searchParams = useSearchParams();
  const ref = searchParams.get('ref');
  const hasTracked = useRef(false);

  useEffect(() => {
    if (ref) {
      document.cookie = `affiliate_ref=${ref}; path=/; max-age=${60 * 60 * 24 * 30}`; // 30 hari
      
      if (!hasTracked.current) {
        hasTracked.current = true;
        trackAffiliateClick(ref);
      }
    }
  }, [ref]);

  return null;
}
