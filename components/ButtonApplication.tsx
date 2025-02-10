'use client';

import { FC } from 'react';

type Props = {
  title: string;
  handleClick?: () => void;
};

export const ButtonApplication: FC<Props> = ({ title, handleClick }) => (
  <button
    className='my-btn text-white text-[18px] font-semibold'
    type='button'
    onClick={handleClick}
  >
    <p>{title}</p>
  </button>
);
