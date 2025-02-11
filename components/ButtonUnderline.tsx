'use client';

import { FC } from 'react';

type Props = {
  title: string;
  handleClick?: () => void;
};

export const ButtonUnderline: FC<Props> = ({ title, handleClick }) => (
  <div
    className='underline decoration-white flex items-center font-jura rounded-full cursor-pointer text-md text-white text-[18px] hover:text-neutral'
    onClick={handleClick}
  >
    <p>{title}</p>
  </div>
);
