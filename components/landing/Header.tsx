import React from 'react';
import Image from 'next/image';
import { LandingContainer } from './LandingContainer';
import navLeftArrow from '@/public/landing/nav-left-arrow.svg';
import navRightArrow from '@/public/landing/nav-right-arrow.svg';
import Link from 'next/link';

export const Header: React.FC = () => {
  return (
    <header className='bg-primary-light-purple font-montserrat pt-4 md:pt-[30px] 2xl:pt-[50px]'>
      <LandingContainer className='flex gap-10 px-[5vw] md:px-[10vw] justify-between'>
        <div>
          <Link
            href="/"
          >
            <Image src="/landing/logo.png" alt="Logo" width={300} height={110} />
          </Link>
          <p className="text-[11px] md:text-[16px] 2xl:text-[15px] font-medium text-splash-green ml-1 md:ml-[7px] mt-1 2xl:mt-[10px]">Revolutionizing the job market with AI</p>
        </div>
        <div className="flex flex-col md:flex-row gap-2 2xl:gap-5 font-k2d mt-2 md:mt-5">
          <Link className='order-1 md:-order-1 h-[30px] md:h-[50px] px-5 flex items-center justify-center md:justify-between border border-white rounded-[8px] md:rounded-[20px] gap-2' href='/'>
            <Image src={navLeftArrow} alt="Arrow" className='hidden lg:block mt-0.5' />
            <p className='text-[14px] 2xl:text-[18px] font-light text-white leading-none'>Employers</p>
          </Link>
          <Link className='h-[30px] md:h-[50px] px-5 flex items-center justify-center md:justify-between bg-splash-green rounded-[8px] md:rounded-[20px] gap-2' href='/signin'>
            <p className='text-[14px] 2xl:text-[18px] font-light text-my-neutral-7 leading-none'>Sign in</p>
            <Image src={navRightArrow} alt="Arrow" className='hidden lg:block mt-0.5' />
          </Link>
        </div>
      </LandingContainer>
    </header>
  );
};