'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import config from '@/config';
import { getServerCookie } from '@/libs/cookies';
import AppNavbar from '@/components/AppNavbar';
import AppSidenav from '@/components/AppSidenav';

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    getServerCookie('accessToken').then((accessToken) => {
      if (!accessToken) {
        router.replace(`${config.auth.loginUrl}/?r=${pathname}`);
      }
    });
  }, [pathname, router]);

  return (
    <div className='lg:px-[80px] min-w-80'>
      <AppNavbar />
      <div className='flex'>
        <div className='nav fixed md:static top-0 z-10 h-full max-h-screen'>
          <AppSidenav />
        </div>
        <div className='grow bg-base-100'>
          <div className='overflow-y-auto h-[calc(100vh-112px)] p-5 bg-base-200'>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
