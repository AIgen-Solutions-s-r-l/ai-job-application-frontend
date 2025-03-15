'use client';

import { FC, ReactNode } from 'react';
import Image from 'next/image';
import CloseButton from '@/components/svgs/CloseBtn.svg';

type Props = {
  children?: ReactNode;
  onClose?: () => void;
};

export const Alert: FC<Props> = ({ children, onClose }) => (
  <div className='relative bg-primary-light-purple-gray rounded-xl p-5'>
    <button className='outline-none absolute top-4 right-4' onClick={onClose}>
      <Image src={CloseButton} width={14} height={14} alt='close button' />
    </button>
    <div className='pr-4'>{children}</div>
  </div>
);
