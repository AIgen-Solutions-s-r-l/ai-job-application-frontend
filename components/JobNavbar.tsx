'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Container } from './Container';
import LaboroSmiley from '@/public/LaboroSmiley.svg';
import { useUserCreditsContext } from '@/contexts/user-credits-context';
import AppButtonAccount from './AppButtonAccount';

export const JobNavbar = () => {
  const { credits } = useUserCreditsContext();
  
  return (
    <Container>
      <div
        role='navigation'
        aria-label='Navbar'
        className='flex items-center justify-between pt-2 pb-1 lg:pt-[55px] lg:pb-[25px]'
      >
        <Link href='/' >
          <Image src='/laboro.png' alt='Logo' width={214} height={58} />
        </Link>
        <div className='flex items-center gap-[30px] font-jura'>
          <div className='flex items-center gap-5 bg-primary-deep-purple rounded-full pl-[2px] pr-[25px] py-[3px]'>
            <Image src={LaboroSmiley} alt='LaboroSmiley' width={40} height={40} />
            <p className='text-white text-right font-jura text-xl font-semibold leading-6 tracking-tight'>
              {credits} Credits
            </p>
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

