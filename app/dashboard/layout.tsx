'use client';

import { ReactNode } from 'react';
import AppNavbar from '@/components/AppNavbar';
import AppSidenav from '@/components/AppSidenav';
import RequireLogin from '@/permissions/requireLogin';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='lg:px-[80px] h-screen min-w-80 flex flex-col overflow-auto md:overflow-hidden'>
      <div className=' pl-5'>
        <AppNavbar />
      </div>
      <div className='flex gap-10 md:overflow-hidden ml-0 md:ml-5'>
        <AppSidenav />
        <div className='md:scrollable grow rounded-xl bg-base-100'>
          {children}
        </div>
      </div>
    </div>
  );
};

export default RequireLogin(Layout, true);
