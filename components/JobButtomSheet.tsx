import { FC, ReactNode } from 'react';
import { Container } from './Container';

type Props = {
  children?: ReactNode;
  className?: string;
};

export const JobButtomSheet: FC<Props> = ({ children, className }) => (
  <div className='fixed bottom-0 z-10 w-full h-[60px] flex items-center bg-primary'>
    <Container className={`flex ${className}`}>{children}</Container>
  </div>
);
