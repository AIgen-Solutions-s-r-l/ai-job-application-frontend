import { FC } from 'react';
import { LandingContainer } from './LandingContainer';
import Link from 'next/link';
import Image from 'next/image';
import { InstagramIcon, LinkedinIcon } from '../AppIcons';

export const Footer: FC = () => {
  return (
    <footer className='bg-my-neutral-7 pt-[37px] pb-[45px] xl:pt-[47px] xl:pb-[53px]'>
      <LandingContainer className='xl:px-[10vw] md:px-[10vw] px-[5vw]'>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 justify-center text-center">
          <div className="py-[12px] xl:py-[36px] px-[32px] xl:px-[60px] flex flex-col gap-[40px] xl:border-r border-primary-light-purple items-center">
            <Link href='/about-us' className='footer-link' >About Us</Link>
            <a
              href='https://drive.google.com/file/d/1M7AMuOOO6OAIXViYxY5gCVcnhYx6xQEB/view'
              className='footer-link'
              target='_blank'
              rel='noopener noreferrer'
            >
              Privacy & Cookie Policy
            </a>

            <a
              href='https://drive.google.com/file/d/1GJZ2moJmJ8KBSrzVPcD9Slg6Kx_gTDSM/view'
              className='footer-link'
              target='_blank'
              rel='noopener noreferrer'
            >
              Terms of Use
            </a>
            <Link href='mailto:info@laboro.co' className='footer-link' >Contact Us</Link>
            <div className="flex xl:mt-[20px] gap-6 text-white">
              <a
                href='https://www.instagram.com/interview_scouter/'
                className='footer-social-container'
                target='_blank'
                rel='noopener noreferrer'
              >
                <InstagramIcon classname='footer-social-icon' />
              </a>

              <a
                href='https://www.linkedin.com/company/joinlaboro/posts/'
                className='footer-social-container'
                target='_blank'
                rel='noopener noreferrer'
              >
                <LinkedinIcon classname='footer-social-icon' />
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 py-[12px] px-[12px] md:py-[24px] xl:px-[62px] xl:border-r border-primary-light-purple order-first md:order-none">
            <Link
              href="/"
            >
              <Image src="/landing/logo.png" alt="Logo" width={428} height={110} className='w-[200px] md:w-[250px] xl:w-[400px] h-auto' />
            </Link>
            <p className="text-[16px] md:text-[20px] xl:text-[24px] font-medium text-white font-montserrat">AI-automated Job Applications</p>
          </div>

          <div className=" py-[36px] px-[12px] xl:px-[60px] flex flex-col gap-[32px] ">
            <p className="text-[8px] md:text-[12px] xl:text-[16px] font-small text-white font-montserrat md:ml-[10px] xl:ml-[24px] mt-[12px] xl:mt-[22px]">Via Guglielmo Marconi, 45, 40122 Bologna BO</p>
            <p className="text-[8px] md:text-[12px] xl:text-[16px] font-small text-white font-montserrat md:ml-[10px] xl:ml-[24px] mt-[12px] xl:mt-[22px]">P.IVA: 04284191204</p>
          </div>

        </div>
        <p className="mt-[40px] xl:mt-[40px] px-[12px] md:text-center font-jura text-[12px] font-semibold text-my-neutral-4">All Rights Reserved. LABORO © 2025</p>
      </LandingContainer>
    </footer>
  );
};