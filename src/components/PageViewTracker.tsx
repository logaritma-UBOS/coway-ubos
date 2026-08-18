'use client';

import { useEffect, useRef } from 'react';

interface PageViewTrackerProps {
  agentId: string;
}

export default function PageViewTracker({ agentId }: PageViewTrackerProps) {
  const hasTracked = useRef(false);

  useEffect(() => {
    // Prevent double tracking in React StrictMode
    if (hasTracked.current) return;
    
    if (agentId) {
      hasTracked.current = true;
      fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ agentId }),
      }).catch(err => console.error('Failed to track page view:', err));
    }
  }, [agentId]);

  return null; // This component doesn't render anything
}
