import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
  className?: string;
}

export const LandingContainer: React.FC<React.PropsWithChildren<Props>> = ({ className, children }) => {
  return <div className={cn('w-full max-w-[1920px] mx-auto px-[25vw] mb:px-[5vw]', className)}>
    {children}
  </div>;
};
