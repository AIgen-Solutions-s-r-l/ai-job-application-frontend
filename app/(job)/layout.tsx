'use client';

import Link from 'next/link';
import React, { ReactNode } from 'react';
import AppNavbar from '@/components/AppNavbar';
import RequireLogin from '@/permissions/requireLogin';
import { Container } from '@/components/Container';
import AppButtonAccount from '@/components/AppButtonAccount';

const Layout = ({ children }: { children: ReactNode }) => {
  const navbarMenu = (
    <div className='flex items-center gap-[30px] font-jura'>
      <Link
        key='Dashboard'
        href='/dashboard'
        className='font-semibold text-[18px] hidden md:block'
      >
        <span>Dashboard</span>
      </Link>
      
      {/* <Link
        key='Contacts'
        href='/contacts'
        className='font-semibold text-[18px]'
      >
        <span>Contact</span>
      </Link> */}

      <AppButtonAccount />
    </div>
  );

  return (
    <div className="w-full h-screen flex flex-col items-center bg-base-100">
      <Container>
        <AppNavbar slot={navbarMenu} />
      </Container>
      {children}
    </div>
  );
};

export default RequireLogin(Layout);
