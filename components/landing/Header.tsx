import React from 'react';
import Image from 'next/image';
import { LandingContainer } from './LandingContainer';
import navLeftArrow from '@/public/landing/nav-left-arrow.svg';
import navRightArrow from '@/public/landing/nav-right-arrow.svg';
import Link from 'next/link';

export const Header: React.FC = () => {
  return (
    <header className='bg-primary-light-purple font-montserrat pt-[50px]'>
      <LandingContainer className='flex justify-between'>
        <div>
          <Link
            href="/"
          >
            <Image src="/landing/logo.png" alt="Logo" width={428} height={110} />
          </Link>
          <p className="text-[21px] font-medium text-splash-green ml-[7px] mt-[10px]">Revolutionizing the job market with AI</p>
        </div>
        <div className="flex gap-5 font-k2d mt-5">
          <Link className='h-[56px] px-5 flex items-center justify-between border border-white rounded-[20px] gap-2' href='/'>
            <Image src={navLeftArrow} alt="Arrow" className='mt-0.5' />
            <p className='text-[18px] font-light text-white leading-none'>Employers</p>
          </Link>
          <Link className='my-btn-green gap-2' href='/signin'>
            <p className='text-[18px] font-light text-my-neutral-7 leading-none'>Sign in / Sign up</p>
            <Image src={navRightArrow} alt="Arrow" className='mt-0.5' />
          </Link>
        </div>
      </LandingContainer>
    </header>
  );
};