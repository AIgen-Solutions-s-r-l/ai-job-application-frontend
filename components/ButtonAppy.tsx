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
    className='bg-secondary rounded-full text-black px-4 py-3 flex items-center gap-8 justify-between hover:bg-base-100 hover:text-black cursor-pointer'
    onClick={handleApply}
    disabled={disabled}
  >
    <p className='leading-none font-jura font-semibold text-[18px]'>{title}</p>
    <Image src={Arrow} alt='Arrow' />
  </button>
);
