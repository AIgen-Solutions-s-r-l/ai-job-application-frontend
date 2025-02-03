import * as React from 'react';
import { Skeleton } from '../Skeleton';

export const FormInputSkeleton: React.FC<
  React.InputHTMLAttributes<HTMLInputElement>
> = ({ className }) => (
  <div className={className}>
    <Skeleton className='mb-3 w-32 h-4' />
    <Skeleton className='rounded-md h-10' />
  </div>
);
