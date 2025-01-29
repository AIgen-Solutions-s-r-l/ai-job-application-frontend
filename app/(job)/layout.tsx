'use client';

import Link from 'next/link';
import React, { ReactNode } from 'react';
import AppNavbar from '@/components/AppNavbar';
import RequireLogin from '@/permissions/requireLogin';
import { Container } from '@/components/Container';

const Layout = ({ children }: { children: ReactNode }) => {
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
    <div className="w-full h-screen flex flex-col items-center bg-base-100">
      <div className='w-[1440px] mx-auto'>
        <AppNavbar slot={navbarMenu} />
      </div>
      {children}
    </div>
  );
};

export default RequireLogin(Layout);
