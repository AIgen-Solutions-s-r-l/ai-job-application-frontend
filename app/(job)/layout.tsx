'use client';

import React, { ReactNode } from 'react';
import RequireLogin from '@/permissions/requireLogin';
import UserCreditsProvider from '@/contexts/user-credits-context';
import { JobNavbar } from '@/components/JobNavbar';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <UserCreditsProvider>
      <div className="w-full h-screen flex flex-col items-center bg-base-100">
        <JobNavbar />
        {children}
      </div>
    </UserCreditsProvider>
  );
};

export default RequireLogin(Layout);
