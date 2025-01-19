'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import config from '@/config';
import { getServerCookie } from '@/libs/cookies';
import AppNavbar from '@/components/AppNavbar';
import SelectedJobsProvider from '@/contexts/selected-jobs-context';

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

  const navbarMenu = (
    <Link
      key='Dashboard'
      href='/dashboard'
      className='flex items-center text-md leading-none border-2 border-black px-8 py-3 rounded-full font-semibold'
    >
      <span>Dashboard</span>
    </Link>
  );

  return (
    <div className='w-full flex flex-col items-center bg-base-100'>
      <SelectedJobsProvider>
        <div className='w-[1440px]'>
          <AppNavbar slot={navbarMenu} />
        </div>
        {children}
      </SelectedJobsProvider>
    </div>
  );
}
