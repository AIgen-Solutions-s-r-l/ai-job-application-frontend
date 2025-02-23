'use client';

import { FC } from 'react';

type Props = {
  title: string;
  handleClick?: () => void;
};

export const ButtonUnderline: FC<Props> = ({ title, handleClick }) => (
  <button
    className='text-white text-[18px] font-semibold underline font-jura cursor-pointer hover:text-my-neutral-5'
    type='button'
    onClick={handleClick}
  >
    <p>{title}</p>
  </button>
);
