import React, { FC } from 'react';
import Credits from '../svgs/Credits.svg';
import Image from 'next/image';

type Props = {
  count: number;
};

export const ApplicationsPill: FC<Props> = ({ count }) => (
  <div className='flex items-center justify-between bg-primary-deep-purple font-jura text-white gap-6 pl-2 pr-5 py-[6px] rounded-full'>
    <Image src={Credits} alt='credits' />
    <span className='font-jura font-normal text-[16px]'>
      {count} Applications
    </span>
  </div>
);
