'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/Container';
import { BrandSmileyIcon } from '@/components/AppIcons';
import { useUserCreditsContext } from '@/contexts/user-credits-context';
import AppButtonAccount from '@/components/AppButtonAccount';

export const JobNavbar = () => {
  const { credits } = useUserCreditsContext();

  return (
    <Container>
      <div
        role='navigation'
        aria-label='Navbar'
        className='flex items-center justify-between gap-5 pt-2 pb-1 lg:pt-[55px] lg:pb-[25px]'
      >
        <Link href='/dashboard' >
          <Image src='/logo.png' alt='Logo' width={214} height={58} />
        </Link>
        <div className='flex items-center gap-[10px] lg:gap-[20px] xl:gap-[30px] font-jura'>
            <Link href='/dashboard/subscription' className='flex items-center gap-1 lg:gap-5 bg-primary-deep-purple rounded-full ml-2 md:ml-0 pl-[2px] pr-[10px] lg:pr-[25px] py-[1px] lg:py-[3px] transform transition-transform duration-300 hover:scale-105 text-white text-right font-jura text-[12px] lg:text-xl font-semibold leading-none tracking-tight whitespace-nowrap'>
            <BrandSmileyIcon />
            <span>{credits} Credits</span>
            </Link>

          <Link
            key='Dashboard'
            href='/dashboard'
            className='hidden md:flex my-btn-ghost text-[18px] font-semibold'
          >
            <span>Dashboard</span>
          </Link>

          {/* <Link
            key='Contacts'
            href='/contacts'
            className='font-semibold text-[18px]'
          >
            <span>Contact</span>
          </Link> */}

          <AppButtonAccount />
        </div>
      </div>
    </Container>
  );
};

