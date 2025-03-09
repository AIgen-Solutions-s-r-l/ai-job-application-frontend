'use client';

import { ReactNode } from 'react';
import ClientLayout from '@/components/LayoutClient';
import { ThemeProvider } from '@/components/theme-provider';
import UserContextProvider from '@/contexts/user-context';
import SidenavContextProvider from '@/contexts/sidenav-context';

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <UserContextProvider>
      <SidenavContextProvider>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          enableColorScheme
        >
          <ClientLayout>{children}</ClientLayout>
        </ThemeProvider>
      </SidenavContextProvider>
    </UserContextProvider>
  );
};
