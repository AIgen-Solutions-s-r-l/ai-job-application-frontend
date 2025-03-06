'use client';

import { FC } from 'react';

type Props = {
  title: string;
  handleClick?: () => void;
};

export const ButtonUnderline: FC<Props> = ({ title, handleClick }) => (
  <button
    className='text-white text-sm md:text-base lg:text-[18px] font-medium lg:font-semibold underline font-jura cursor-pointer hover:text-my-neutral-5 text-left'
    type='button'
    onClick={handleClick}
  >
    <p>{title}</p>
  </button>
);
