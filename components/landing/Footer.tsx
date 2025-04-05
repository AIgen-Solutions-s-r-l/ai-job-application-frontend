import { FC } from 'react';
import { LandingContainer } from './LandingContainer';
import Link from 'next/link';
import Image from 'next/image';
import { InstagramIcon, LinkedinIcon } from '../AppIcons';

export const Footer: FC = () => {
  return (
    <footer className='bg-my-neutral-7 pt-[37px] pb-[45px] xl:pt-[47px] xl:pb-[53px]'>
      <LandingContainer className='xl:px-[10vw] md:px-[10vw] px-[5vw]'>
        <div className="w-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-11">
          <div className="col-span-1 md:col-span-1 xl:col-span-3 py-[12px] xl:py-[36px] px-[32px] xl:px-[60px] flex flex-col gap-[64px] xl:border-r border-primary-light-purple">
            <Link href='/' className='footer-link' >About Us</Link>
            <Link href='/' className='footer-link' >Legal Center</Link>
          </div>
          <div className="col-span-1 md:col-span-1 xl:col-span-4 py-[36px] px-[12px] xl:px-[60px] flex flex-col gap-[32px] xl:border-r border-primary-light-purple">
            <Link href='mailto:interview.scouter@gmail.com' className='footer-link' >Contact Us</Link>
            <div className="flex xl:mt-[20px] gap-6 text-white">
              <Link href='https://www.instagram.com/interview_scouter/' className="footer-social-container">
                <InstagramIcon classname='footer-social-icon' />
              </Link>
              <Link href='https://www.linkedin.com/company/joinlaboro/posts/' className="footer-social-container">
                <LinkedinIcon classname='footer-social-icon' />
              </Link>
            </div>
          </div>

          <div className="col-span-2 xl:col-span-4 py-[12px] px-[12px] md:py-[24px] xl:px-[62px]">
            <Link
              href="/"
            >
              <Image src="/landing/logo.png" alt="Logo" width={428} height={110} className='w-[280px] md:w-[360px] xl:w-[600px] h-auto' />
            </Link>
            <p className="text-[16px] md:text-[20px] xl:text-[24px] font-medium text-white font-montserrat md:ml-[10px] xl:ml-[24px] mt-[12px] xl:mt-[22px]">AI-automated Job Applications</p>
          </div>
        </div>
        <p className="mt-[40px] xl:mt-[80px] px-[12px] md:text-center font-jura text-[14px] font-semibold text-my-neutral-4">Via Guglielmo Marconi, 45, 40122 Bologna BO</p>
        <p className="mt-[40px] xl:mt-[10px] px-[12px] md:text-center font-jura text-[14px] font-semibold text-my-neutral-4">P.IVA: 04284191204</p>
        <p className="mt-[40px] xl:mt-[40px] px-[12px] md:text-center font-jura text-[12px] font-semibold text-my-neutral-4">All Rights Reserved. Copyrights 2025</p>
      </LandingContainer>
    </footer>
  );
};