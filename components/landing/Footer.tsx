import React from 'react';
import { LandingContainer } from './LandingContainer';
import Link from 'next/link';
import Image from 'next/image';
import { InstagramIcon, LinkedinIcon, TwitterIcon } from '../AppIcons';

export const Footer: React.FC = () => {
  return (
    <footer className='bg-my-neutral-7 pt-[47px] pb-[53px]'>
      <LandingContainer>
        <div className="w-full h-[264px] grid grid-cols-11">
          <div className="col-span-2 py-[36px] px-[60px] flex flex-col gap-[32px] border-r border-primary-light-purple">
            <Link href='/' className='footer-link' >About Us</Link>
            <Link href='/' className='footer-link' >Our Team</Link>
            <Link href='/' className='footer-link' >Legal Center</Link>
          </div>
          <div className="col-span-2 py-[36px] px-[60px] flex flex-col gap-[32px] border-r border-primary-light-purple">
            <Link href='/' className='footer-link' >How it works</Link>
            <Link href='/' className='footer-link' >Pricing</Link>
            <Link href='/' className='footer-link' >Resources</Link>
          </div>
          <div className="col-span-3 py-[36px] px-[60px] flex flex-col gap-[32px] border-r border-primary-light-purple">
            <Link href='/' className='footer-link' >Contact Us</Link>
            <Link href='/' className='footer-link' >Join our Discord</Link>
            <div className="flex gap-4 text-white">
              <Link href='' className="w-12 h-12 rounded-full bg-my-neutral-2 flex items-center justify-center">
                <TwitterIcon classname='w-7 h-7 fill-my-neutral-7' />
              </Link>
              <Link href='' className="w-12 h-12 rounded-full bg-my-neutral-2 flex items-center justify-center">
                <InstagramIcon classname='w-7 h-7 fill-my-neutral-7' />
              </Link>
              <Link href='' className="w-12 h-12 rounded-full bg-my-neutral-2 flex items-center justify-center">
                <LinkedinIcon classname='w-7 h-7 fill-my-neutral-7' />
              </Link>
            </div>
          </div>
          <div className="col-span-4 py-[12px] px-[62px]">
            <Link
              href="/"
            >
              <Image src="/landing/logo.png" alt="Logo" width={428} height={110} />
            </Link>
            <p className="text-[24px] font-medium text-white font-montserrat ml-[24px] mt-[22px]">AI-automated Job Applications</p>
          </div>
        </div>

        <p className="mt-[104px] text-center font-jura text-[12px] font-semibold text-my-neutral-4">All Rights Reserved. Copyrights 2025</p>
      </LandingContainer>
    </footer>
  );
};