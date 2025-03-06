import { cn } from '@/lib/utils';
import { FC, PropsWithChildren } from 'react';

interface Props {
  className?: string;
}

export const Container: FC<PropsWithChildren<Props>> = ({ className, children }) => {
  return <div className={cn('w-full max-w-[1440px] px-4 md:px-8 2xl:px-0 mx-auto', className)}>
    {children}
  </div>;
};
