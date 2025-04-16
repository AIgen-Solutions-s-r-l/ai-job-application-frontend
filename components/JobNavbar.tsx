'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/Container';
import { LaboroSmileyIcon } from '@/components/AppIcons';
import { useUserCreditsContext } from '@/contexts/user-credits-context';
import AppButtonAccount from '@/components/AppButtonAccount';

export const JobNavbar = () => {
  const { credits } = useUserCreditsContext();
  
  return (
    <Container>
      <div
        role='navigation'
        aria-label='Navbar'
        className='flex items-center justify-between pt-2 pb-1 lg:pt-[55px] lg:pb-[25px]'
      >
        <Link href='/dashboard' >
          <Image src='/laboro.png' alt='Logo' width={214} height={58} />
        </Link>
        <div className='flex items-center gap-[10px] lg:gap-[30px] font-jura'>
          <div className='flex items-center gap-1 lg:gap-5 bg-primary-deep-purple rounded-full ml-2 md:ml-0 pl-[2px] pr-[10px] lg:pr-[25px] py-[1px] lg:py-[3px]'>
            <LaboroSmileyIcon />
            <Link href='/dashboard/subscription' className='text-white text-right font-jura text-sm lg:text-xl font-semibold leading-none tracking-tight'>
              {credits} Credits
            </Link>
          </div>
          
          <Link
            key='Dashboard'
            href='/dashboard'
            className='font-semibold text-[18px] hidden md:block'
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

