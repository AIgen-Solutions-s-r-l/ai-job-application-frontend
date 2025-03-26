'use client';

import { FC } from 'react';
import Image from 'next/image';
import Arrow from '@/components/svgs/Arrow.svg';

type Props = {
  title: string;
  handleApply?: () => void;
  disabled?: boolean;
};

export const ButtonApply: FC<Props> = ({ title, handleApply, disabled }) => (
  <button
    className='my-btn-green gap-8 font-semibold text-sm md:text-[18px] font-jura cursor-pointer'
    onClick={handleApply}
    disabled={disabled}
  >
    <p>{title}</p>
    <Image src={Arrow} alt='Arrow' className='hidden md:block' />
  </button>
);
