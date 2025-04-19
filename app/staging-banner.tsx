'use client';

import { useEffect, useState } from 'react';

export function StagingBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const siteUrl = window.location.href;
      if (siteUrl.includes('pre')) {
        setShowBanner(true);
      }
    }
  }, []);

  if (!showBanner) return null;

  return (
    <div className='absolute top-4 right-4 bg-my-neutral-7 text-white px-6 py-2 rounded-lg text-2xl font-bold uppercase'>
      STAGING
    </div>
  );
}
