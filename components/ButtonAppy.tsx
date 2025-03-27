'use client';

import { FC } from 'react';
import { ArrowRightIcon } from '@/components/AppIcons';

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
    <ArrowRightIcon classname='fill-black hidden md:block' />
  </button>
);
