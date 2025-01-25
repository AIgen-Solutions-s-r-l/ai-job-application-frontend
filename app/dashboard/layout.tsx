'use client';

import { ReactNode } from 'react';
import AppNavbar from '@/components/AppNavbar';
import AppSidenav from '@/components/AppSidenav';
import RequireLogin from "@/permissions/requireLogin";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='lg:px-[80px] min-w-80'>
      <AppNavbar />
      <div className='flex'>
        <AppSidenav />
        <div className='grow bg-base-100'>
          <div className='overflow-y-auto h-[calc(100vh-112px)] p-5 bg-base-200'>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequireLogin(Layout, true);
