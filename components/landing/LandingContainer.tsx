import { cn } from '@/lib/utils';
import { FC, PropsWithChildren } from 'react';

interface Props {
  className?: string;
}

export const LandingContainer: FC<PropsWithChildren<Props>> = ({ className, children }) => {
  return <div className={cn('w-full max-w-[1920px] mx-auto px-[15vw] mb:px-[5vw]', className)}>
    {children}
  </div>;
};
