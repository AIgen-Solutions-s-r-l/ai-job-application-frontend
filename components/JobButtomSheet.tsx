import { FC, ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  className?: string;
};

export const JobButtomSheet: FC<Props> = ({ children, className }) => (
  <div className='fixed bottom-0 z-10 w-full h-[80px] flex items-center bg-primary shadow-[0px_-4px_4px_rgba(0,0,0,0.25)]'>
    <div className={`w-[1440px] mx-auto flex ${className}`}>{children}</div>
  </div>
);
