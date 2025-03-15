'use client';

import { ReactNode } from 'react';
import AppNavbar from '@/components/AppNavbar';
import AppSidenav from '@/components/AppSidenav';
import RequireLogin from '@/permissions/requireLogin';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='lg:px-[80px] h-screen min-w-80 flex flex-col'>
      <div className='pl-20 md:pl-5'>
        <AppNavbar />
      </div>
      <div className='flex gap-5 md:overflow-hidden ml-0 md:ml-5'>
        <AppSidenav />
        <div className='md:scrollable grow rounded-xl bg-base-100 px-3 md:px-0'>
          {children}
        </div>
      </div>
    </div>
  );
};

export default RequireLogin(Layout, true);
