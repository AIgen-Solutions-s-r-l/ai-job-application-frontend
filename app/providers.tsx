'use client';

import { ReactNode } from 'react';
import ClientLayout from '@/components/LayoutClient';
import { ThemeProvider } from '@/components/theme-provider';
import UserContextProvider from "@/contexts/user-context";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <UserContextProvider>
      <ThemeProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
        enableColorScheme
      >
        <ClientLayout>{children}</ClientLayout>
      </ThemeProvider>
    </UserContextProvider>
  );
};
