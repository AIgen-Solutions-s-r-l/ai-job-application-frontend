'use client';

import { ReactNode } from 'react';
import ClientLayout from '@/components/LayoutClient';
import { ThemeProvider } from '@/components/theme-provider';

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      enableColorScheme
    >
      <ClientLayout>{children}</ClientLayout>
    </ThemeProvider>
  );
};
